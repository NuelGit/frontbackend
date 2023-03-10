import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import articles from './articles-content'
import NotFoundPage from './NotFoundPage'
import CommentsList from '../components/CommentsList'
import AddCommentForm from '../components/AddCommentForm'
import useUser from '../hooks/useUser'


export const ArticlesPage = () => {

  const [articleInfo, setArticleInfo ] = useState({ upvotes: 0, comments: [] })
  const { articleId } = useParams()

  const {user, isLoading} = useUser()
  
  useEffect(()=>{
    const loadArticleInfo = async () =>{

      const response = await axios.get(`/api/articles/${articleId}`);
      const articleData = response.data
      setArticleInfo(articleData)
    }
    loadArticleInfo()
  }, [])
  
  const article = articles.find(article =>article.name ===articleId )

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`)
    const updatedArticle = response.data
    setArticleInfo(updatedArticle)
  }

  if(!article){
    <NotFoundPage />
  }

  return (
    <> 
    <h1>{article.title} </h1>

   <div className='upvotes-section'> 
    {user ? <button onClick={addUpvote}> Upvote </button> : <button> Log in </button>}
    <p> This article has {articleInfo.upvotes} upvote(s) </p>
    </div>

    {article.content.map((artCont, i) =>(
      <p key={i}> {artCont}</p>
    ))}
    {user ? <AddCommentForm articleName={articleId} 
    onCommentUpdated={updatedCommets =>setArticleInfo(updatedCommets)} />
    : <button> Log in to add comment </button> }
    <CommentsList comments={articleInfo.comments} />
    </>
  )
}

export default ArticlesPage
