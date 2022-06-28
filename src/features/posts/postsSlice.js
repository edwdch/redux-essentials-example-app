import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!'
  },
  {
    id: '2',
    title: 'Second Post!',
    content: 'More Text!'
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsAdd(state, action) {
      state.push(action.payload)
    }
  }
})

export const { postsAdd } = postsSlice.actions
export default postsSlice.reducer