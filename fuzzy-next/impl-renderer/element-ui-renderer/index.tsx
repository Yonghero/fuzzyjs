import type { Renderer } from '../../types'
import { ElementUIButton } from './ElementUIButton'
import { ElementUIConfirm } from './ElementUIConfirm'
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
  page = new ElementUIPage()
  tab = new ElementUITab()
  table = new ElementUITable()
  message = new ElementUIMessage()
  confirm = new ElementUIConfirm()
}
