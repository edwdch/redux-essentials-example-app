import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postsAdd, addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSavePostClicked = async () => {
    if (CanSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.error('Failed to save the post: ', error)
      } finally {
        setAddRequestStatus('idle')
      }

      dispatch(
        postsAdd(title, content, userId)
      )

      setTitle('')
      setContent('')
    }
  }

  const CanSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor="postTitle">Title: </label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged}>
        </input>

        <label htmlFor="postAuthor">Author: </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content: </label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged}></textarea>

        <button type="button" onClick={onSavePostClicked} disabled={!CanSave}>Save Post</button>
      </form>
    </section>
  )
}