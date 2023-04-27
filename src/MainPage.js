import React, { useState, useEffect } from 'react';
import './Main.css';

export default function Main() {
  const [news, setNews] = useState("News");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetch(`https://news-api-ie3w.onrender.com/world`)
      .then(responce => responce.json())
      .then((data) => {
        setArr(data);
      });
  }, []);

  async function getNews(event) {
    try {
      const news = event.target.innerText;
      const newsCut = news.split(' ');
      const lNews = newsCut[0].toLowerCase();

      const response = await fetch(`https://news-api-ie3w.onrender.com/${lNews}`);
      const data = await response.json();
      setNews(news);
      setArr(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='nav-bar'>
        <span onClick={(event) => getNews(event)} className='news-types'>World News</span>
        <span onClick={(event) => getNews(event)} className='news-types'>Indian News</span>
        <span onClick={(event) => getNews(event)} className='news-types'>Technology News</span>
        <span onClick={(event) => getNews(event)} className='news-types'>Business News</span>
        <span onClick={(event) => getNews(event)} className='news-types'>Sports News</span>
        <span onClick={(event) => getNews(event)} className='news-types'>Entertainment News</span>
      </div><br/>
      <h1>{news}</h1>
      <center>
      <div className='news-container'>
        {arr.map((obj, index) => (
          <div key={index}>
            <img alt='text' width='400' height='200' src={obj.urlToImage}/>
            <div className='author-txt'>{obj.author}</div>
             <a rel="noreferrer" target="_blank" href={obj.url} key={index}><h2>{obj.title}</h2></a>
              <hr/>
          </div>
          ))}
      </div>
      </center>
    </>
  );
}