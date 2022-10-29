import type { FuzzyPluginOptions } from '../../../../types'
import { globalFormItems, installUIPlugin } from './UIPlugins'

export { globalFormItems }

export function use(installPlugin: (options: FuzzyPluginOptions) => void) {
  installPlugin({
    installUIPlugin,
  })
}
