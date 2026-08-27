import { createStore } from 'tinybase'

export const store = createStore()
  .setValuesSchema({
    userId: { type: 'string' },
    userName: { type: 'string' },
    userCreatedU: { type: 'number' },
    lastOpenU: { type: 'number' },
  })
  .setTablesSchema({
    trackers: {
      title: { type: 'string' },
      icon: { type: 'string' },
      color: { type: 'string' },
    },
    trackerRecords: {
      trackerId: { type: 'string' },
      startU: { type: 'number' },
      endU: { type: 'number' }
    }
  })