import React from 'react';
import './SideNews.css'


  function SideNews() 
  {
    const urlParams = new URLSearchParams(window.location.search);
const news = urlParams.get('news');
let newsCut = news.split(' ')
const lNews = newsCut[0].toLowerCase()
//let finalNews = lNews + '-' + 'news'
fetch(`http://localhost:1000/${lNews}`)
.then((response) => response.json())
  .then((data) => console.log(data))
/*if(news==='Indian News')
{
  fetch("http://localhost:1000/indian")
  .then((response) => response.json())
  .then((data) => console.log(data))
}
  else if(news==='World News')
  {
    fetch("http://localhost:1000/world")
    .then((response) => response.json())
    .then((data) => console.log(data))
  }
    else if(news==='Business News')
    {
      fetch("http://localhost:1000/business")
      .then((response) => response.json())
      .then((data) => console.log(data))
    }
      else if(news==='Technology News')
      {
        fetch("http://localhost:1000/technology")
        .then((response) => response.json())
        .then((data) => console.log(data))
      }
        else if(news==='Sports News')
        {
          fetch("http://localhost:1000/sports")
          .then((response) => response.json())
          .then((data) => console.log(data))
        }
          else if(news==='Entertainment News')
          {
            fetch("http://localhost:1000/entertainment")
            .then((response) => response.json())
            .then((data) => console.log(data))
          }*/
//let newsCut = news.split(' ')
//const lNews = newsCut[0].toLowerCase()
//let finalNews = lNews + '-' + 'news'

    return (
      <div className='side-container'>
        <h1>{news}</h1>
      </div>
    );
  }
  

export default SideNews;
