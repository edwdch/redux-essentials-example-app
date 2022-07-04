import { createEntityAdapter } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../../api/client";

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = notificationsAdapter.getInitialState()

export const {
  selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors(state => state.notifications)

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotifications] = allNotifications
    const latestTimestamp = latestNotifications ? latestNotifications.date : ''
    const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true
      })
    }
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read
      })
      notificationsAdapter.upsertMany(state, action.payload)
    },
  }
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer