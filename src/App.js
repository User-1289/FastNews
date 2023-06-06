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
  const [excludeWord, setExcludeWord] = useState([])
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
const [descText,showDescText] = useState(false)
  useEffect(()=>
  {
    refreshNews("World")
  }, [])
  useEffect(() =>
  {
    refreshNews(newsType)
  }, [excludeWord])
  const today = new Date();
  const year = today.getFullYear();
const month = today.getMonth() + 1
const day = today.getDate()
let todayDate = year + '-' + month + '-' + day
//  useEffect(()=>
//  {
//    setWindowSize({
//      width:width.innerWidth,
//      height:window.innerHeight
//    })
//  }, [window.innerWidth, window.innerHeight])
  useEffect(() =>
  {
    if(catLoading===true)
    {
    //  alert('nice')
      setLoading(catLoading)
    }
  }, [catLoading])
    useEffect(() => {
      if(catArr.length>0)
      {
        let filteredArr = filterData(catArr)
        setArr(filteredArr)
      }
  }, [catArr]);


async function refreshNews(refreshWord,arr)
{

let orgDate = new Date(todayDate)

  let responce = await fetch('/.netlify/functions/getdata', {
    method: 'POST',
    body: JSON.stringify({ newsVar: refreshWord.toLowerCase(), uniqueKey:process.env.REACT_APP_UNIQUE_KEY}),
  })
    const data = await responce.json();
    //localStorage.setItem(refreshWord.toLowerCase(), JSON.stringify(obj))
    let filteredArr =  filterData(data)
  setArr(filteredArr)
  localStorage.removeItem(refreshWord.toLowerCase())
  let obj = {
    DateNow:todayDate,
    NewsData:filteredArr
  }
  saveToLocal(obj,refreshWord.toLowerCase())
  setLoading(false)

}

function saveToLocal(obj,word)
{
  if(localStorage.getItem(word)==null)
  {
    localStorage.setItem(word, JSON.stringify(obj))
  }
  else if(localStorage.getItem(word)!=null)
  {
    console.log(obj)
  }
  //console.log(obj)
}
  async function defaultNews()
  {

  let responce = await fetch('/.netlify/functions/getdata', {
    method: 'POST',
    body: JSON.stringify({ newsVar: 'world', uniqueKey:process.env.REACT_APP_UNIQUE_KEY}),
  })
    const data = await responce.json();

  let filteredArr =  filterData(data)
//    for(let i = 0; i < excludeWord.length; i++)
//{
//  for(let j = 0; j < data.length; j++)
//  {
//    if(data[j].title.toLowerCase().includes(excludeWord[i].toLowerCase()))
//    {
//      data.splice(j,1)
//      //console.log('it al matches')
//    }
//  }
//}
    setArr(filteredArr);
    setLoading(false)
  }

  async function getNews(event) 
  {
    showDescText(true)
    let inputBox = document.querySelector('.search-box')
    let newsTitles = document.querySelectorAll('.news-titles')
    const descTxtElement = document.querySelector(".desc-txt");
    //inputBox.value=""
    //if(descTxtElement && descTxtElement.style.display=='visible')
    //{
    //  descTxtElement.style.visibility='hidden'
    //}
      // Rest of your code
    
    for(let title of newsTitles)
    {
      title.parentElement.style.backgroundColor='gray'
    }

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
      setLoading(true)
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
    let filteredArr = filterData(data)
    setArr(filteredArr);
    let obj = {
      DateNow:todayDate,
      NewsData:filteredArr
    }
    saveToLocal(obj,lNews)
      setLoading  (false)
    } catch (error) {
      console.log(error);
    }
  }

  function filterData(data)
{
  let delArr = JSON.parse(localStorage.getItem("Excluded"))
  //console.log(delArr)
  //let orgArr = data
    for(let i = 0; i < delArr.length; i++)
  {
    for(let j = 0; j < data.length; j++)
    {
      if(data[j].title.toLowerCase().includes(delArr[i].toLowerCase()))
      {
        data.splice(j,1)
      }
    }
  }

  return data
}
  const shareContent = async (articleUrl) => {
    try {
      await navigator.share({
        url: articleUrl,
      });
     // console.log('Shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  function openLink(url)
  {
    if(windowSize.width<=800)
    {
      window.location.href = url
    }
    else
    window.open(url)
  }
  
  return (
    <div className='whole'>
            <Category showDesc={descText} searchNews={arr} sendWord={word => setExcludeWord(word)} newsName={name=> setNewsType(name.charAt(0).toUpperCase() + name.slice(1))} sendNews={news => setCatArr(news)}  /> 
      <div className='nav-bar'> 
        <button onClick={(event) => getNews(event)} className='news-types world-id'>World News</button>
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
          <div className='news-box' key={index}>
            <img alt='not found' width='400' height='200' src={obj.urlToImage}/>
            <div className='author-txt'>{obj.author}</div>
             <a className='news-titles' rel="noreferrer" target="_blank" href={obj.url} key={index} onClick={() => {openLink(obj.url)}}><h2>{obj.title}</h2></a>
             <span onClick={() => {shareContent(obj.url)}} className="material-symbols-outlined">
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