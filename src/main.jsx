import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DocProvider } from './contexts/DocContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <DocProvider>
        <App />
      </DocProvider>
    </ToastProvider>
  </StrictMode>,
)
