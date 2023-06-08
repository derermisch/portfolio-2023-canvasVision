import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import AppWrapper from './AppWrapper'
import ScrollToTop from './components/general/ScrollToTop'
import './css/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AppWrapper />
    </BrowserRouter>
  // </React.StrictMode>
)
