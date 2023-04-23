import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainPage from './MainPage';
import SideNews from './SideNews';
import reportWebVitals from './reportWebVitals';
//import { createHashRouter } from 'react-router-dom';
//import { createRouter, RouterProvider } from 'react-router5';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/main",
    element: <MainPage/>
  },
  {
    path: "/content-news",
    element: <SideNews />
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
