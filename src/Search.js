import React, { useEffect, useState } from 'react';
import './search.css';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';

export default function Search(props) 
{
    let searchArr = props.searchArr
    const [textVal,setTextVal] = useState("")
    const [setText, updateSetText] = useState(false)
    //useEffect(() =>
    //{
    //    searchNews()
    //}, [textVal])

    function clearInput()
    {
      let newsTitles = document.querySelectorAll('.news-titles')

      for(let title of newsTitles)
      {
        updateSetText(false)
        title.parentElement.style.backgroundColor='gray'
      }
    }
    function searchNews()
    {
      //document.querySelector('.category-txt').style.visibility='hidden'
      //document.querySelector(".menu-cl").style.visibility = "visible";
      //document.querySelector(".cancel-cl").style.visibility = "hidden";
      //document.querySelector('.nav-bar').style.opacity = "1";
      //document.querySelector('.news-container').style.opacity = "1";
      //document.getElementById('root').style.opacity = "1";
        //console.log(textVal)
        let counter = 0
      //  let newsBoxes = document.querySelectorAll('.news-box')
        let newsTitles = document.querySelectorAll('.news-titles')

      let firstMatch;
          for(let title of newsTitles)
          {
          //  title.parentElement.style.backgroundColor='gray'
            if(title.innerText.toLowerCase().includes(textVal.toLowerCase()))
            {
               if(firstMatch==null)
               {
                firstMatch = title.getBoundingClientRect().top
                title.parentElement.scrollIntoView()
               // console.log(firstMatch)
               }
               counter++
              title.parentElement.style.backgroundColor='white'

            }
          }
        if(counter>1)
        {
          updateSetText(true)
        }
    }
  return (
    <>
    <div className='search-container'>
      <input onKeyDown={(e) => 
            {
            if (e.key === 'Enter') {
              searchNews();
            }
          }} value={textVal} onChange={(e) => {setTextVal(e.target.value); clearInput()}} className='search-box' type='text' placeholder='Search..' />
      <span  onClick={searchNews} className="material-symbols-outlined">search</span><br/><br/>
    </div>
    { setText && <div className='desc-txt'>There are more than one result.<br/>Scroll down to find  more</div>}
    </>
  );
}
