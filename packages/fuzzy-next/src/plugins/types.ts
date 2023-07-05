import type { Templates } from '../../../../types/options'

export abstract class RestTemplatePlugin {
  abstract install(templates: Templates[]): void

  uuid = ''
}
