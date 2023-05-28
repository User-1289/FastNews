import React, { useState, useRef, useEffect } from 'react';
import './category.css';
import './sidebar.css'
import Search from './Search';
export default function Category(props) 
{
  const showCat = () => {
    document.getElementById('category-input').focus()
}
    const [isMobile, setIsMobile] = useState(false);
    const [isDesktop, setIsDeskTop] = useState(false)
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      const spanRef = useRef(null);
      const [category, setCategory] = useState('');//to get the input's value
  const [exlcudeWord, setExcludeWord] = useState('')
  //const [container, deleteContainer] = useState(false);//to delete the container
  const [catArr, setCatArr] = useState([]);//this array contains all the categories user entered
  const [excludeArr,setExcludeArr] = useState([])
  const [newsData, setNewsData] = useState([]);//this is used to send data to the app.js to diisplay news there
  const [excludeInfo, viewExcludeInfo] = useState(false)
  const [loading,setLoading] = useState(false)
  const [excludeTxt, setExcludeTxt] = useState(false)

  function showMobSide()
  {
    let details = document.querySelectorAll('.details-id');
    for(let el of details)
    {
      el.open = false
    }

      document.querySelector(".category-txt").style.visibility = "visible"
      document.querySelector(".menu-cl").style.visibility = "hidden"
      document.querySelector(".cancel-cl").style.visibility = "visible"
      document.querySelector('.news-container').style.opacity = "0.5"
      document.querySelector('.nav-bar').style.opacity = "0.5"
  }
  function closeSidebar() {
   // let summaryTxt = document.querySelector('.summary-txt');
    let details = document.querySelectorAll('.details-id');
    for(let el of details)
    {
      el.open = true
    }
    document.querySelector('.nav-bar').style.opacity = "1";
    document.querySelector('.news-container').style.opacity = "1";
    document.getElementById('root').style.opacity = "1";
    document.querySelector(".category-txt").style.visibility = "hidden";
    document.querySelector(".menu-cl").style.visibility = "visible";
    document.querySelector(".cancel-cl").style.visibility = "hidden";
  }
  
  

  useEffect(() =>
  {
    if(localStorage.getItem("Excluded"))
    {
      setExcludeArr(JSON.parse(localStorage.getItem("Excluded")))
      setExcludeTxt(true)
    }
    else
    {
      setExcludeTxt(false)
    }
  }, [])

//  useEffect(() =>
//  {
//    console.log('nice')
//    props.showLoad(loading)
//  }, [loading])
  const checkDup = useRef(null)
  let isBad;
 // const [spanTxt, setSpanTxt] = useState('');


  useEffect(() => {
    //alert(windowSize.width)
      if (windowSize.width <= 800) 
      {
        setIsMobile(true);
      }
        else 
        {
          setIsDeskTop(true);
        }
}, [])

let defaultCat = ["games", "politics", "health"]
useEffect(() =>
{
  if(localStorage.getItem("Categories")==null)
  {
    localStorage.setItem("Categories", JSON.stringify(defaultCat))
  }
}, [])
  useEffect(() => {
    setCatArr(JSON.parse(localStorage.getItem("Categories")))
  }, []);
//useEffect(() =>
//{
//  if(localStorage.getItem("Excluded"))
//  {
//    setExcludeArr(localStorage.getItem("Excluded"))
//  }
//}, [])
  const setCatVal = (event) => 
  {
    setCategory(event.target.value);
  };

  const saveCategory = async () => 
  {
    props.sendWord(excludeArr)
    setLoading(true)
    const url = 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
		'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
	},
	body: new URLSearchParams({
		content: category,
	})
};

try 
{
	const response = await fetch(url, options);
	const result = await response.text();

  const jsonBad = JSON.parse(result); 
 isBad = jsonBad['is-bad']; 

//console.log(isBad); 
if(isBad===true)
{
  alert("You requested inappropriate category")
  setCategory("")
  return;
}
	//console.log(result);
}
 catch (error) {
	console.error(error);
}
let newArr = [...catArr];

    for(let i = 0; i < newArr.length; i++)
    {
    //  console.log('nice')
      if(newArr[i]===checkDup.current.value)
      {
        checkDup.current.value = ''
      return;
      }
    }

newArr.push(category);
if(newArr.length>10)
{
  alert("You can only create 10 categories")
  setCategory('');
  return;
}
 setCatArr(newArr);
localStorage.setItem("Categories", JSON.stringify(newArr))
setCategory('');
await getSelCat(category);
setLoading(false)
try {
  let response = await fetch('/.netlify/functions/datenews', {
    method: 'POST',
    body: JSON.stringify({ newsVar: category, uniqueKey:process.env.REACT_APP_UNIQUE_KEY}),
  });
  const data = await response.json();
//console.log((data))
}
catch(err)
{
  console.log(err)
}
  }
  async function getSelCat(catVal) 
  {
    try {
      let response = await fetch('/.netlify/functions/getdata', {
        method: 'POST',
        body: JSON.stringify({ newsVar: catVal, uniqueKey:process.env.REACT_APP_UNIQUE_KEY}),
      });
      const data = await response.json();
      setNewsData(data);

    } catch (error) {
      console.log(error);
    }
  }
useEffect(()=>
{
}, [])
   async function displayCat(categoryVal,event) 
  {
  //  window.location.reload()
  props.sendWord(excludeArr)
    setLoading(true)

    document.querySelector('.nav-bar').style.opacity = "1"
    document.querySelector('.news-container').style.opacity = "1"

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    //alert(event.target.innerText)
   // return;
    let defaultNews = document.querySelectorAll('.news-types')
    for(let el of defaultNews)
    {
      el.style.color = 'black'
    }
    let allCats = document.querySelectorAll('.cat-txt')
    for(let cats of allCats)
    {
      cats.style.backgroundColor = 'white'
    }
    event.target.style.backgroundColor = "skyblue"

      props.newsName(categoryVal);
   // alert(isMobile)
    //if(isMobile===true)
    //{

        document.getElementById('root').style.opacity = "1"
       // document.querySelector(".sidebar").style.display = "none"
        document.querySelector(".category-txt").style.visibility = "hidden"    
        document.querySelector(".menu-cl").style.visibility = "visible"
        document.querySelector(".cancel-cl").style.visibility = "hidden"
    //}

    const spanText = spanRef.current.getAttribute('val');
   // setSpanTxt(spanText);
   async function takeData()
   {
    await getSelCat(categoryVal.toLowerCase());
   }
   setLoading(false)
   takeData()
   try {
    let response = await fetch('/.netlify/functions/datenews', {
      method: 'POST',
      body: JSON.stringify({ newsVar: categoryVal, uniqueKey:process.env.REACT_APP_UNIQUE_KEY}),
    });
    const data = await response.json();
  console.log((data))
  }
  catch(err)
  {
    console.log(err)
  }
  }
useEffect(() =>
{
  props.sendWord(excludeArr)
}, [ excludeArr])
  useEffect(() => {
    props.sendNews(newsData);
  }, [newsData, props]);

  function deleteCat(e)
  {
    
    //deleting form frontend
    let orgCat = e.target.parentElement.innerText.replace("delete", "")

    let currentCats = JSON.parse(localStorage.getItem("Categories"))
    for(let i = 0; i < currentCats.length; i++)
    {
     // console.log(currentCats[i].toLowerCase() + ' ' + orgCat.toLowerCase())
      if(currentCats[i].toLowerCase().trim()==orgCat.toLowerCase().trim())
      {
      //  alert(orgCat)
       // deleteData()
        currentCats.splice(i, 1)
        localStorage.setItem("Categories", JSON.stringify(currentCats))
        setCatArr(currentCats)
      //  window.location.reload(); // Reload the entire website
          return;
      }
  }
//deleting from backend

}

function saveExcluded()
{

    let nowArr = [...excludeArr]
    nowArr.push(exlcudeWord)
    setExcludeArr(nowArr)
    localStorage.setItem("Excluded", JSON.stringify(nowArr))
    setExcludeTxt(true)
    setExcludeWord("")
}
function excludeDeleteCat(e)
{
  let orgCat = e.target.parentElement.innerText.replace("delete", "")

   let currentCats = JSON.parse(localStorage.getItem("Excluded"))
   for(let i = 0; i < currentCats.length; i++)
   {
     if(currentCats[i].toLowerCase().trim()==orgCat.toLowerCase().trim())
     {

       currentCats.splice(i, 1)
       localStorage.setItem("Excluded", JSON.stringify(currentCats))
       setExcludeArr(currentCats)
         return;
     }
  }
}
  return (
    <>
            <div className='mobile-sidebar'>
        <span onClick={showMobSide} className="material-symbols-outlined menu-cl">menu</span><br/>
        <span className='txt-indic'>Personalize your<br/>news feed</span>
        <span onMouseLeave={() => {document.querySelector('.info-txt').style.visibility='hidden'}} onMouseEnter={() => {document.querySelector('.info-txt').style.visibility='visible'}} className="material-symbols-outlined">
info
</span><br/><br/>
{ isDesktop && <Search searchArr={props.searchNews}/> }

<span className='info-txt'>
          You can add your interests such as person, topic etc and get articles about it. You can also exclude certain news contents that you don't like. Click the menu 
        </span>
        </div>
      <div className='category-txt'>
      <span onClick={closeSidebar} className="material-symbols-outlined cancel-cl">cancel</span>

      <button >Personalize your news feed</button><br/><br/>

      <details className='details-id'>
        <summary className='summary-txt'>View addded categories</summary>
        <div className='input-container'>
        <input ref={checkDup} placeholder='add your interest' id="category-input" onChange={setCatVal} value={category} />
        <span onClick={saveCategory} className="material-symbols-outlined">
          check_circle
        </span>
        </div>
        <div className='sidebar-txt'>
          <br />
          {catArr.map((cat, index) => (
            <>
                <div key={index}>
              <span
                val={cat}
                ref={spanRef}
                onClick={(e) => displayCat(cat,e)}
                className="cat-txt">
                {cat}
              </span>
              <span onClick={deleteCat} className="material-symbols-outlined del-cl">delete</span>
            </div><br/>
            </>
          ))}
        </div>
        </details><br/>

        <div>
        <span onMouseOver={() => {viewExcludeInfo(true)}} onMouseLeave={() => {viewExcludeInfo(false)}} className="material-symbols-outlined exclude-info">
          info
        </span>
        { excludeInfo && <span className='exclude-info-txt'>
          The changes will take a refresh to take place
        </span>}
        <details className='details-id'>
        <summary className='summary-txt'>View excluded words</summary>
        <div className='whole-exclude'>
      <div className='exclude-container'>
    <input value={exlcudeWord} onChange={(e) => {setExcludeWord(e.target.value)}} className='exclude-input' placeholder='enter excluded words'/>
    <span onClick={saveExcluded} className="material-symbols-outlined exclude-cl">
          check_circle
        </span>
        </div><br/>
        {excludeTxt && excludeArr.map((cat, index) => (
            <>
                <div key={index}>
              <span
                val={cat}
                className="cat-txt">
                {cat}
              </span>
              <span onClick={(e) => {excludeDeleteCat(e)}} className="material-symbols-outlined del-cl">delete</span>
            </div><br/>
            </>
          ))}

      </div>
      </details>
      </div><br/>
      {isMobile && <Search/>}
      </div>
    </>
  );
}