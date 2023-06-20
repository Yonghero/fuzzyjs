import type { Renderer, RendererGlobalOptions } from '../../../../types'
import { ElementUIButton } from './ElementUIButton'
import { ElementUIConfirmPlus } from './ElementUIConfirmPlus'
import { ElementUIForm } from './ElementUIForm'
import { ElementUIMessage } from './ElementUIMessage'
import { ElementUIPage } from './ElementUIPage'
import { ElementUITab } from './ElementUITab'
import { ElementUITable } from './ElementUITable'
import { ElementUIDialog } from './ElementUIDialog'

export class ElementUIRenderer implements Renderer {
  button = new ElementUIButton()
  dialog = new ElementUIDialog()
  form = new ElementUIForm()
  tab = new ElementUITab()
  message = new ElementUIMessage()
  confirm = new ElementUIConfirmPlus()
  page = new ElementUIPage()
  table

  constructor(options: RendererGlobalOptions) {
    this.table = new ElementUITable({ ...options.table })
  }
}
