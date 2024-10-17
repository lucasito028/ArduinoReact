import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TrafficLightApp from './TrafficLightApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrafficLightApp />
  </StrictMode>,
)
