/**
 * 多tab页合并配置
 */
import type { TemplateMiddlewareCallback, Templates } from '../types'

export function mergeFuzzyOptions(...rest) {
  return rest
}

export function transferToArray(value, deep = false) {
  if (deep)
    return [unref(value)]

  if (Array.isArray(value) || Array.isArray(value[0]))
    return value.map(v => unref(v))
  if (Array.isArray(value))
    return unref(value)
  return [unref(value)]
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

export function mapTemplatesOptions(templates: Templates[], type) {
  return templates.map((template) => {
    const _template = { ...template }
    if (_template.options && _template.options[type])
      _template.options = _template.options[type]

    return _template
  })
}

// 注入当前生产表单组件类型
export function mapTemplatesInjectType(templates: Templates[], type) {
  return templates.map((template) => {
    const _template = { ...template }
    if (type === 'update' || type === 'create')
      template.noFilter = true

    return _template
  })
}

/**
 * 重新映射默认值
 * @param templates
 * @param type
 * @returns
 */
export function mapTemplateDefaultValue(templates: Templates[], type) {
  return templates.map((templates) => {
    const _template = { ...templates }
    if (_template.defaultValue && _template.defaultValue[type] !== undefined)
      _template.defaultQueryValue = unref(_template.defaultValue[type])

    return _template
  })
}

/**
 * 映射字段展示顺序
 * @param templates
 * @param type
 * @returns
 */
export function mapTemplateOfOrder(templates: Templates[], type) {
  const orderTemplates = templates.map((template, index) => {
    const _template = { order: {}, ...template }

    if (_template.order[type] === undefined)
      _template.order[type] = index

    return _template
  })

  return orderTemplates.sort((t1, t2) => t1.order[type] - t2.order[type])
}

/**
 * 映射字段是否在该展示
 * @param templates
 * @param feature
 * @returns
 */
export function mapTemplateOfFeature(templates: Templates[], feature) {
  return templates.filter((item) => {
    if (!item.visible)
      return true
    return !!(item.visible && (item.visible[feature] || item.visible[feature] === undefined))
  })
}

export function templateMiddleWare(callback: TemplateMiddlewareCallback[]) {
  return (templates, type) => {
    return callback.reduce((templates, callback) => {
      return callback(templates, type)
    }, templates)
  }
}
