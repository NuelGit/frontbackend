import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import useUser from '../hooks/useUser'



const AddCommentForm = ({articleName, onCommentUpdated }) => {
    // const [name, setName] = useState('')
    const [commentText, setCommentText] = useState('')
    const {user} = useUser()

    const addComment = async () =>{
        const token = user && await user.getIdToken()
    const headers = token ? {authtoken: token}: {}
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            // postedBy: name,
            text: commentText
        }, {headers,})
        const updatedComments = response.data
        onCommentUpdated(updatedComments)
        // setName('')
        setCommentText('')
    }

  return (
    <div id='add-comment-form'> 
    <h3> Add a Comment </h3>

    {user &&<p> You are posting as {user.email} </p> }

        <textarea rows='4' cols='50'
        value={commentText}
        onChange= {event =>setCommentText(event.target.value)} />

    <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default AddCommentForm