import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db'
import { deviceStore } from './deviceStore'
import { userStore } from './userStore'

export const devicePersister = createIndexedDbPersister(
  deviceStore,
  'deviceStore'
)

export const userPersister = createIndexedDbPersister(
  userStore,
  'userStore'
)

let initialized = false

export async function initAllPersisters() {
  if (initialized) return
  initialized = true

  for (const persister of [devicePersister, userPersister]) {
    await persister.startAutoLoad()
    await persister.startAutoSave()
  }
}
