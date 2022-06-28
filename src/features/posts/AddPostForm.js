import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { postsAdd } from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch();

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postsAdd({
          id: nanoid(),
          title,
          content,
        })
      )

      setTitle('')
      setContent('')
    }
  }

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor="postTitle">Title: </label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged}>
        </input>

        <label htmlFor="postContent">Content: </label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged}></textarea>

        <button type="button" onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}