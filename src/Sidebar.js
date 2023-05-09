import React, {useState } from 'react';
import './sidebar.css';

function Sidebar(props) {
    const [sidebar, showSidebar] = useState(false)
//    const [news, setNews] = useState([])

   
    const showCat = () => {
        showSidebar(true);
    }
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
    return (
        <>
        <div className='mobile-sidebar'>
        <span onClick={showMobSide} className="material-symbols-outlined menu-cl">menu</span>
        </div>
        <nav className="sidebar">
            <button onClick={showCat}>Personalize your news feed</button>
            <span onClick={closeSidebar} className="material-symbols-outlined cancel-cl">cancel</span><br/>
        </nav>
        </>
    );
}

export default Sidebar;
