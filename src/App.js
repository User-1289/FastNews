import React, { useState, useEffect } from 'react';
import './Main.css';
import Sidebar from './Sidebar'
import Category from './Category';

//import { useRoute } from 'react-router5';
//import styles from './App.module.css'

function App(props) 
{
  const [news, setNews] = useState("News");
  const [arr, setArr] = useState([]);
  const [newsType, setNewsType] = useState("World")
  const [catArr, setCatArr] = useState([])

    useEffect(() => {
      if(catArr.length>0)
      {
        setArr(catArr)

      }
  }, [catArr]);

  async function getNews(event) {
    try {
      const news = event.target.innerText;
      const newsCut = news.split(' ');
      if(newsType===newsCut[0])
      {
        return;
      }
      setNewsType(newsCut[0])
      const lNews = newsCut[0].toLowerCase();

     // const response = await fetch(`/.netlify/functions/${lNews}`);
     let responce = await fetch('/.netlify/functions/getdata', {
      method: 'POST',
      body: JSON.stringify({ newsVar: lNews}),
    })
      const data = await responce.json();
     //return
      setNews(news);
      setArr(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='nav-bar'> 
        <button onClick={(event) => getNews(event)} className='news-types'>World News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Indian News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Technology News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Business News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Sports News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Entertainment News</button>
      </div><br/>    
      <h1>{news}</h1>
      <Sidebar/>
      <Category newsName={name=> setNews(name.charAt(0).toUpperCase() + name.slice(1))} sendNews={news => setCatArr(news)}/> 
      <div className='align-news'>
        <center>
      <div className='news-container'>
        {arr.map((obj, index) => (
          <div key={index}>
            <img alt='not found' width='400' height='200' src={obj.urlToImage}/>
            <div className='author-txt'>{obj.author}</div>
             <a rel="noreferrer" target="_blank" href={obj.url} key={index}><h2>{obj.title}</h2></a>
              <hr/>
          </div>
          ))}
      </div>
      </center>
      </div>
    </>
  );
}

export default App;