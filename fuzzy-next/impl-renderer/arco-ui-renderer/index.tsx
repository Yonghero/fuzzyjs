import type { Renderer } from '../../types'
import { ArcoUIConfirm } from './ArcoUIConfirm'
import { ArcoUIMessage } from './ArcoUIMessage'
import { ArcoUIButton } from './ArcoUIButton'
import { ArcoUIDialog } from './ArcoUIDialog'
import { ArcoUIForm } from './ArcoUIForm'
import { ArcoUIPage } from './ArcoUIPage'
import { ArcoUITab } from './ArcoUITab'
import { ArcoUITable } from './ArcoUITable'

export class ArcoUIRenderer implements Renderer {
  button = new ArcoUIButton()
  dialog = new ArcoUIDialog()
  form = new ArcoUIForm()
  message = new ArcoUIMessage()
  page = new ArcoUIPage()
  tab = new ArcoUITab()
  table = new ArcoUITable()
  confirm = new ArcoUIConfirm()
}
