import { unref } from 'vue'
import type { TemplateMiddlewareCallback, Templates } from '../../../../types'
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
 * 填充默认值
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
 * 填充排序
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
 * 功能启停
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
