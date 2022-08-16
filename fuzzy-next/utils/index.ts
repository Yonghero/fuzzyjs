/**
 * 多tab页合并配置
 */
import type { Templates } from '../types'

export function mergeFuzzyOptions(...rest) {
  return rest
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
