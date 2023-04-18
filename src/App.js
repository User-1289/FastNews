import React from 'react';
import './App.css';
//import { useRoute } from 'react-router5';
//import styles from './App.module.css'

function App() 
{
 // fetch("https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=eab1631abf374798bc855fffdc90194f")
 // .then(responce => responce.json())
 // .then(data=>{
 //   console.log(data)
 // })
 // const { route } = useRoute();

  function startApp() {  
    window.open("main", "_blank")
   // route.navigate('main');
  }
  return (
    <>
    <div id="sign-container">
      <span id="sign-up-text">Sign up</span>
      <span id="log-in-text">Log in</span>
    </div>
    <center>
    <h1 id="news-text">News</h1>
    <div id="welcome-text">
    Reading the news can help you stay informed<br/> and gain diverse perspectives, but it's important<br/> to be selective and approach it<br/> with critical thinking.<br/><br/>
    <button onClick={startApp}>Start Exploring</button>
    </div>

    <footer>
      <div id="quote-container">
    <h2 id="quote-text" >"The News is Like Never Ending Story,<br/> But With Real Life Consequences."</h2>
      </div>
    </footer>
    </center>
    </>
  );

//  const styles = {
//    body::before {
//      content: '',
//      position: absolute,
//      top: 0,
//      left: 0,
//      width: 100%,
//      height: 100%,
//      /* Set the background color for the dimming effect */
//      background-color: rgba(0, 0, 0, 0.5),
//      opacity: 0.9,
//    }
//  }
}

export default App;
