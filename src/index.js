import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
])
ReactDOM.createRoot(document.getElementById("root")).render(
<App/>
);

reportWebVitals();
