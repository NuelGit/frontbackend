import './App.css';
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'
import NotFoundPage from './pages/NotFoundPage'
import ArticlesListPage from './pages/ArticlesListPage'
import NavBar from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter > 
    <div className="App">
      <NavBar/>
      <div id='page-body'> 
      <Routes> 
        <Route path='/' element={<HomePage/>} />
        <Route path='/articles/:articleId' element={<ArticlePage/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/articles' element={<ArticlesListPage/>} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

