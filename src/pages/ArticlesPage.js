import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import articles from './articles-content'
import NotFoundPage from './NotFoundPage'

export const ArticlesPage = () => {

  const [articleInfo, setArticleInfo ] = useState({upvotes:0, comments: []})

  useEffect(()=>{
    setArticleInfo({ upvotes:3, comments:[]})
  }, [])

  const { articleId } = useParams()
  const article = articles.find(article =>article.name ===articleId )

  if(!article){
    <NotFoundPage />
  }

  return (
    <> 
    <h1>{article.title} </h1>
    <p> This article has {articleInfo.upvotes} upvote(s) </p>
    {article.content.map((artCont, i) =>(
      <p key={i}> {artCont}</p>
    ))}
    </>
  )
}

export default ArticlesPage
