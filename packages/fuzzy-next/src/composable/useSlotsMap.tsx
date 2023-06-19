import type { Component, Slots } from 'vue'
import { defineComponent } from 'vue'

/**
 *  fuzzy 注入插槽组件
 */
export function useSlotsMap(slots: Slots) {
  const slotsMap = {}
  if (slots?.default) {
    const slotArr = slots.default()
    slotArr.forEach((comp) => {
      if (comp?.props?.name)
        slotsMap[comp.props.name] = comp
    })
  }
  return function injectProps(props: Record<string, Component>) {
    Object.keys(slotsMap).forEach((key) => {
      const SlotComp = slotsMap[key]

      slotsMap[key] = defineComponent({
        setup(selfProps, { attrs }) {
          return () => (
            <SlotComp {...attrs} {...props} {...selfProps} />
          )
        },
      })
    })

    return slotsMap
  }
}
