import { uc_trackerColor, uc_trackerEndU, uc_trackerIcon, uc_trackerRowId, uc_trackerStartU, uc_trackerTitle, userStore, ut_trackerRecs, ut_trackers } from '$lib/db/userStore'
import type { CssColor } from '@shared/colors'
import type { IconName } from '@shared/icons'
import { DateTime } from 'luxon'

export function createTracker(title: string, icon: IconName, color: CssColor) {
  userStore.addRow(ut_trackers, {
    [uc_trackerTitle]: title,
    [uc_trackerIcon]: icon,
    [uc_trackerColor]: color
  }, false)
}

export function deleteTracker(trackerId: string) {
  userStore.delRow(ut_trackers, trackerId)
}

export function startTracker(trackerId: string) {
  userStore.addRow(ut_trackerRecs, {
    [uc_trackerRowId]: trackerId,
    [uc_trackerStartU]: DateTime.now().toMillis(),
    [uc_trackerEndU]: null,
  }, false)
}

export function endTracker(trackerId: string) {
  userStore.setCell(ut_trackerRecs, trackerId, uc_trackerEndU, DateTime.now().toMillis())
}
