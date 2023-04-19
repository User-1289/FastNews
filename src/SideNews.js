import React from 'react';
import './SideNews.css'
  function SideNews() 
  {
const urlParams = new URLSearchParams(window.location.search);
const news = urlParams.get('news');
let catGory = ''


if(news==="Indian News")
{
//  alert(searchTerm)
  fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=eab1631abf374798bc855fffdc90194f`)
  .then(responce => responce.json())
  .then(data=>
  {
    console.log(data)
  })
}
  else if(news==="World News")
  {
      fetch('https://newsapi.org/v2/top-headlines?language=en&apiKey=eab1631abf374798bc855fffdc90194f')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }
      else
      {
        let arr = news.split(' ')
        catGory = arr[0]
        console.log(catGory)
      }

     // fetch(`https://newsapi.org/v2/top-headlines?category=${catGory}&language=en&apiKey=eab1631abf374798bc855fffdc90194f`)
     // .then(response => response.json())
     // .then(data => 
     // {
     //   console.log(data);
     // })
     // .catch(error => 
     // {
     //   console.log(error);
     // });

    return (
      <div className='side-container'>
        <h1>{news}</h1>
      </div>
    );
  }
  

export default SideNews;
