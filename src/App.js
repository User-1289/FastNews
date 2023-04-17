import React from 'react';
import './App.css';
//import styles from './App.module.css'

function startApp()
{
  alert('you clicked it right')
  window.open("main", "_blank")
}
function App() 
{
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
}

export default App;
