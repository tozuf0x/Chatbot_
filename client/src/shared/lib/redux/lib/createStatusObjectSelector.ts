import { createSelector } from '@reduxjs/toolkit';
import { APIStatus } from '../../../api';

export const createStatusObjectSelector = (getStatusSelector: (state: State) => APIStatus) => createSelector(
  [getStatusSelector],
  (state) => ({
    isIdle: APIStatus.Idle === state,
    isPending: APIStatus.Pending === state,
    isUncompleted: APIStatus.Idle === state || APIStatus.Pending === state,
    isFulfilled: APIStatus.Fulfilled === state,
    isRejected: APIStatus.Rejected === state,
  })
);
