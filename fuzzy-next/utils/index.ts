/**
 * 多tab页合并配置
 */
import type { Templates } from '../types'

export function mergeFuzzyOptions(...rest) {
  return rest
}

export function transferToArray(value, deep = false) {
  if (deep)
    return [value]

  if (Array.isArray(value) || Array.isArray(value[0]))
    return value
  if (Array.isArray(value))
    return value
  return [value]
}

/**
 * 根据renderer重新映射自定组件
 * @param templates
 * @param type
 */
export function mapTemplatesRenderer(templates: Templates[], type) {
  return templates.map((template) => {
    const _template = { ...template }
    if (_template.renderer && _template.renderer[type])
      _template.render = _template.renderer[type]

    return _template
  })
}

export function mapTemplateDefaultValue(templates: Templates[], type) {
  return templates.map((templates) => {
    const _template = { ...templates }
    if (_template.defaultValue && _template.defaultValue[type] !== undefined)
      _template.defaultQueryValue = _template.defaultValue[type]

    return _template
  })
}

export interface TemplateMiddlewareCallback {
  (templates: Templates[], type: string): Templates[]
}

export function templateMiddleWare(callback: TemplateMiddlewareCallback[]) {
  return (templates, type) => {
    return callback.reduce((templates, callback) => {
      return callback(templates, type)
    }, templates)
  }
}

/**
 * 返回指定类型的模板
 * @param templates
 * @param feature
 */
export function getTemplatesWithFeature(templates: Templates[], feature: string): Templates[] {
  return templates.filter((item) => {
    return !(item.visible && item.visible[feature] === false)
  })
}
