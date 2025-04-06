import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import ReactDOM from  'react-dom/client'
import App from './App.jsx'
import { BadgeProvider } from './BadgesMetaData/BadgeContent.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BadgeProvider>
      <App/>
    </BadgeProvider>
    
  </React.StrictMode>
)
