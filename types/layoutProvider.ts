import type { SetupContext, VNode } from 'vue'
import type { ExtraRenderer } from './renderer'

export interface LayoutProvider {
  setup(props: Readonly<LayoutProviderProps>, context: SetupContext): () => VNode | Record<string, any>

  render?: (props: Readonly<LayoutProviderProps>) => VNode
}

export interface LayoutProviderProps {
  renderer: LayoutProviderRenderer
}

export interface LayoutProviderRenderer {
  Table: () => VNode<any>
  FilterButton: VNode<any>
  Filter: VNode<any>
  Page: VNode
  Tab: VNode
  Dialog: VNode
  CreateButton: VNode
  ExtraRenderer: ExtraRenderer
}
