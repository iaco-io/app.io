import { DateTime } from 'luxon'
import { createStore } from 'tinybase'

export const uv_userId = 'userId'
export const uv_userAlias = 'userAlias' // @iaco
export const uv_userName = 'userName'   // john paul
export const uv_userCreatedU = 'userCreatedU'
export const uv_weekStart = 'firstWeekday'
export const uv_weekCareDays = 'weekCareDays'

export const ut_trackers = 'trackers'
export const uc_trackerTitle = 'title'
export const uc_trackerIcon = 'icon'
export const uc_trackerColor = 'color'

export const ut_trackerRecs = 'trackerRecs'
export const uc_trackerRowId = 'trackerId'
export const uc_trackerStartU = 'startU'
export const uc_trackerEndU = 'endU'

export const userStore = createStore()
  .setValuesSchema({
    [uv_userId]: { type: 'string', default: '' },
    [uv_userAlias]: { type: 'string', default: '' },
    [uv_userName]: { type: 'string', default: '' },
    [uv_userCreatedU]: { type: 'number', default: DateTime.local().toMillis() },
    [uv_weekStart]: { type: 'string', default: 'b' },
    [uv_weekCareDays]: { type: 'string', default: 'bd' },
  })
  .setTablesSchema({
    [ut_trackers]: {
      [uc_trackerTitle]: { type: 'string' },
      [uc_trackerIcon]: { type: 'string' },
      [uc_trackerColor]: { type: 'string' },
    },
    [ut_trackerRecs]: {
      [uc_trackerRowId]: { type: 'string' },
      [uc_trackerStartU]: { type: 'number' },
      [uc_trackerEndU]: { type: 'number' }
    }
  })
