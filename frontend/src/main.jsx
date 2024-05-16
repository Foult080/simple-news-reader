import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'semantic-ui-css/semantic.min.css'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  import.meta.env.ENV === 'production' ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  )
)
