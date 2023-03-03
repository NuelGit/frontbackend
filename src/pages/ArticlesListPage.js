import React from 'react'
import ArticlesList from '../components/ArticlesList'
import articles from './articles-content'

export const ArticlesListPage = () => {
  return (
    <> 
   <ArticlesList articles={articles} />
    </>
  )
}
export default ArticlesListPage