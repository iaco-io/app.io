import { odayPadded, yearPadded } from '@shared/time'
import { DateTime } from 'luxon'
import { createStore } from 'tinybase'

export const dv_lastOpenU = 'lastOpenU'
export const dv_agendaYD = 'agendaYD'
export const dv_agendaPath = 'agendaPath'
export const dv_lastFolder = 'lastFolder'
export const dv_lastNotebook = 'lastNotebook'

export const dt_agendaSort = 'agendaSort'
export const dc_agendaSortForPath = 'sortForPath'

const today = DateTime.local()
const year = yearPadded(today.year)
const oday = odayPadded(today.ordinal)

export const deviceStore = createStore()
  .setValuesSchema({
    [dv_lastOpenU]: { type: 'number', default: DateTime.local().toMillis() },
    [dv_agendaYD]: { type: 'string', default: year + oday },
    [dv_agendaPath]: { type: 'string', default: '' },
    [dv_lastFolder]: { type: 'string', default: '' },
    [dv_lastNotebook]: { type: 'string', default: '' }
  })
  .setTablesSchema({
    [dt_agendaSort]: {
      [dc_agendaSortForPath]: { type: 'string', default: '' },
    }
  })
