import axios from 'axios'
import React from 'react'
import { useState } from 'react'



const AddCommentForm = ({articleName, onCommentUpdated }) => {
    const [name, setName] = useState('')
    const [commentText, setCommentText] = useState('')

    const addComment = async () =>{
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy:name,
            text: commentText
        })
        const updatedComments = response.data
        onCommentUpdated(updatedComments)
        setName('')
        setCommentText('')
    }

  return (
    <div id='add-comment-form'> 
    <h3> Add a Comment </h3>

    <label> 
        Name: 
        <input 
            value={name}
            onChange= {event =>setName(event.target.value) }
        type= "text" />
    </label>

    <label>
        Comments:
        <textarea rows='4' cols='50'
        value={commentText}
        onChange= {event =>setCommentText(event.target.value)} />
    </label>

    <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default AddCommentForm