import React, { useState, useEffect } from 'react';
import './Main.css';
import Category from './Category';

function App(props) 
{
  const [news, setNews] = useState("News");
  const [arr, setArr] = useState([]);
  const [newsType, setNewsType] = useState("World")
  const [catArr, setCatArr] = useState([])
  const [clearCatColor, setClearCatColor] = useState(true)
  const [loading,setLoading] = useState(true)
  const [catLoading, setCatLoading] = useState(false)

  useEffect(() =>
  {
    if(catLoading===true)
    {
      alert('nice')
      setLoading(catLoading)
    }
  }, [catLoading])
    useEffect(() => {
      if(catArr.length>0)
      {
        setArr(catArr)
      }
  }, [catArr]);

useEffect(() =>
{
  async function defaultNews()
  {
  let responce = await fetch('/.netlify/functions/getdata', {
    method: 'POST',
    body: JSON.stringify({ newsVar: 'world', uniqueKey:process.env.REACT_APP_UNIQUE_KEY}),
  })
    const data = await responce.json();
   //return
    setArr(data);
    setLoading(false)
  }
  defaultNews()
}, [])
  async function getNews(event) 
  {
    setLoading(true)
    setClearCatColor(false)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    let selCats = document.querySelectorAll('.cat-txt')
    for(let cats of selCats)
    {
      cats.style.backgroundColor = 'white'
    }
    let allCats = document.querySelectorAll('.news-types')
    for(let cats of allCats)
    {
      cats.style.color = 'black'
    }
    event.target.style.color = "blue"
    //return;
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
      body: JSON.stringify({ newsVar: lNews, uniqueKey:process.env.REACT_APP_UNIQUE_KEY}),
    })
      const data = await responce.json();
     //return
      setNews(news);
      setArr(data);
      setLoading  (false)
    } catch (error) {
      console.log(error);
    }
  }
  const shareContent = async (articleUrl) => {
    try {
      await navigator.share({
        url: articleUrl,
      });
      console.log('Shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  
  return (
    <div className='whole'>
            <Category showLoad={load => setCatLoading((load))} newsName={name=> setNews(name.charAt(0).toUpperCase() + name.slice(1))} sendNews={news => setCatArr(news)}  /> 
      <div className='nav-bar'> 
        <button onClick={(event) => getNews(event)} className='news-types'>World News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Indian News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Technology News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Business News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Sports News</button>
        <button onClick={(event) => getNews(event)} className='news-types'>Entertainment News</button>
      </div>    

        <center>
      <div className='news-container'>
        { loading && <h1 className='loading-txt'>Loading</h1>}
      <br/><br/><br/>
        {arr.map((obj, index) => (
          <div key={index}>
            <img alt='not found' width='400' height='200' src={obj.urlToImage}/>
            <div className='author-txt'>{obj.author}</div>
             <a rel="noreferrer" target="_blank" href={obj.url} key={index}><h2>{obj.title}</h2></a>
             <span onClick={() => {shareContent(obj.url)}} class="material-symbols-outlined">
share
</span>
             <span>
             <details>
              <summary>view more</summary>
              <div >{obj.description}</div>
             </details>
             </span>
              <hr/>
              <span className='ad-container'></span>
          </div>
          ))}
      </div>
      </center>
    </div>
  );
}

export default App;