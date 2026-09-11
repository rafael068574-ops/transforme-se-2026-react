import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { install } from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwind from '@twind/preset-tailwind'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

install({
  presets: [
    presetAutoprefix(),
    presetTailwind(),
  ],

  theme: {
    extend: {
      colors: {
        primary: '#5782AD',
        secondary: '#B3D9FF',
        red: '#fd0000' ,
        green: '#3be706' ,
        yellow: '#ffd900' ,
        blue: '#003cff' ,
        gray: '#a2a6b3' 
      }
    },
  },
  
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)