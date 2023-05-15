import React, { useState, useRef, useEffect } from 'react';
import './category.css';
import './sidebar.css'
export default function Category(props) 
{
  function showMobSide()
  {
      document.querySelector(".sidebar").style.display = "inline"
      document.querySelector(".category-txt").style.display = "inline"
      document.querySelector(".menu-cl").style.display = "none"
      document.querySelector(".cancel-cl").style.display = "inline"
      document.getElementById('root').style.opacity = "0.5"
  }
  function closeSidebar()
  {
      document.getElementById('root').style.opacity = "1"
      document.querySelector(".sidebar").style.display = "none"
      document.querySelector(".category-txt").style.display = "none"    
      document.querySelector(".menu-cl").style.display = "inline"
      document.querySelector(".cancel-cl").style.display = "none"
  }
  const showCat = () => {
    document.getElementById('category-input').focus()
}
    const [isMobile, setIsMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
  const spanRef = useRef(null);//to get the spans text that contains categories
  const [category, setCategory] = useState('');//to get the input's value
  //const [container, deleteContainer] = useState(false);//to delete the container
  const [catArr, setCatArr] = useState([]);//this array contains all the categories user entered
  const [newsData, setNewsData] = useState([]);//this is used to send data to the app.js to diisplay news there
  let isBad;
 // const [spanTxt, setSpanTxt] = useState('');


  useEffect(() => {
    //alert(windowSize.width)
      if (windowSize.width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
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

  const setCatVal = (event) => 
  {
    setCategory(event.target.value);
  };

  const saveCategory = async () => 
  {
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

console.log(isBad); 
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
  }
  async function getSelCat(catVal) {
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

  function displayCat(categoryVal,event) 
  {
    //alert(event.target.innerText)
   // return;
    let allCats = document.querySelectorAll('.cat-txt')
    for(let cats of allCats)
    {
      cats.style.backgroundColor = 'white'
    }
    event.target.style.backgroundColor = "skyblue"

      props.newsName(categoryVal);
   // alert(isMobile)
    if(isMobile===true)
    {
        document.getElementById('root').style.opacity = "1"
        document.querySelector(".sidebar").style.display = "none"
        document.querySelector(".category-txt").style.display = "none"    
        document.querySelector(".menu-cl").style.display = "inline"
        document.querySelector(".cancel-cl").style.display = "none"
    }

    const spanText = spanRef.current.getAttribute('val');
   // setSpanTxt(spanText);
   async function takeData()
   {
    await getSelCat(categoryVal.toLowerCase());
   }
   takeData()
  }

  useEffect(() => {
    props.sendNews(newsData);
  }, [newsData, props]);

  function deleteCat(e)
  {
    //deleting form frontend
    let orgCat = e.target.parentElement.innerText.replace("delete", "")
  //  alert(e.target.parentElement.innerText.replace("delete", ""))
    let currentCats = JSON.parse(localStorage.getItem("Categories"))
    for(let i = 0; i < currentCats.length; i++)
    {
      if(currentCats[i]==orgCat)
      {
        deleteData()
        currentCats.splice(i, 1)
        localStorage.setItem("Categories", JSON.stringify(currentCats))
        setCatArr(currentCats)
          return;
      }
  }
//deleting from backend
  async function deleteData()
  {
  let responce = await fetch('/.netlify/functions/delete', {
    method: 'POST',
    body: JSON.stringify({ categoryName: orgCat.toLowerCase(), uniqueKey:process.env.REACT_APP_UNIQUE_KEY}),
  })
    const delData = await responce.json();
    alert('Successfully deleted')
    console.log(delData)
  }
}
  return (
    <>
            <div className='mobile-sidebar'>
        <span onClick={showMobSide} className="material-symbols-outlined menu-cl">menu</span>
        </div>
        <nav className="sidebar">
        </nav>
      <div className='category-txt'>
      <span onClick={closeSidebar} className="material-symbols-outlined cancel-cl">cancel</span><br/>
        <br/>
      <button onClick={showCat}>Personalize your news feed</button><br/>
        <div className='input-container'>
        <input placeholder='add your interest' id="category-input" onChange={setCatVal} value={category} />
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
              <span onClick={deleteCat} className="material-symbols-outlined">delete</span>
            </div><br/>
            </>
          ))}
        </div>
      </div>
    </>
  );
}