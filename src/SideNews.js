import React from 'react';
import './SideNews.css'
  function SideNews() 
  {
const urlParams = new URLSearchParams(window.location.search);
const news = urlParams.get('news');
    return (
      <div>
        <h1>{news}</h1>
        {/* rest of the component */}
      </div>
    );
  }
  

export default SideNews;
