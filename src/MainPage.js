import React from 'react';
import './Main.css';

export default function Main() {

  const goToPag = (event) => 
  {
    let getNewsType = event.target.innerText
   // sessionStorage.setItem("newstype", getNewsType)
    window.open(`content-news?news=${getNewsType}`, "new-Window");
   // alert(event.target.innerText);
  };

  return (
    <>
      <center>
        <h1 id="news-text">News</h1><br/>
        <h1 onClick={(event) => goToPag(event)} className='news-types'>World News</h1>
        <h1 onClick={(event) => goToPag(event)} className='news-types'>Indian News</h1>
        <h1 onClick={(event) => goToPag(event)} className='news-types'>Technology News</h1>
        <h1 onClick={(event) => goToPag(event)} className='news-types'>Business News</h1>
        <h1 onClick={(event) => goToPag(event)} className='news-types'>Sports News</h1>
        <h1 onClick={(event) => goToPag(event)} className='news-types'>Entertainment News</h1>
      </center>
    </>
  );
}
