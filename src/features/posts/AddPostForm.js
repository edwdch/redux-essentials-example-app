import React, { useState } from "react";

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor="postTitle">Title: </label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged}>
        </input>

        <label htmlFor="postContent">Content: </label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged}></textarea>

        <button type="button">Save Post</button>
      </form>
    </section>
  )
}