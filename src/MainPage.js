import React, { useState } from 'react';
import './Main.css';

export default function Main() {
  const [arr, setArr] = useState([]); // declare arr as a state variable
  
  async function getNews(event) {
    try {
      let news = event.target.innerText;
      let newsCut = news.split(' ');
      const lNews = newsCut[0].toLowerCase();
  
      const response = await fetch(`http://localhost:1000/${lNews}`);
      const data = await response.json();
      console.log(arr)
      setArr(data); // update the arr state variable with fetched data
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
