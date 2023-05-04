import React, { useState, useRef, useEffect } from 'react';
import './category.css';

export default function Category(props) {
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
 // const [spanTxt, setSpanTxt] = useState('');


  useEffect(() => {
    //alert(windowSize.width)
      if (windowSize.width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
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
    let newArr = [...catArr];
    newArr.push(category);
     setCatArr(newArr);
    localStorage.setItem("Categories", JSON.stringify(newArr))
    setCategory('');
    await getSelCat(category);
  };

  async function getSelCat(catVal) {
    try {
      let response = await fetch('/.netlify/functions/getdata', {
        method: 'POST',
        body: JSON.stringify({ newsVar: catVal }),
      });
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const delCategory = () => {
    deleteContainer(true);
  };

  function displayCat(categoryVal) 
  {
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
    setSpanTxt(spanText);
    getSelCat(categoryVal);
  }

  useEffect(() => {
    props.sendNews(newsData);
  }, [newsData, props]);

  return (
    <>
      <div className='category-txt'>
        <div className='input-container'>
        <input id="category-input" onChange={setCatVal} value={category} />
        <span onClick={saveCategory} className="material-symbols-outlined">
          check_circle
        </span>
        </div>
        <div>
          <br />
          {catArr.map((cat, index) => (
            <>
                <div key={index}>
              <span
                val={cat}
                ref={spanRef}
                onClick={() => displayCat(cat)}
                className="cat-txt">
                {cat}
              </span>
              <span className="material-symbols-outlined">delete</span>
            </div><br/>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
