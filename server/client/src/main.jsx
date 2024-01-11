import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
// import './App.css'

import App from './App.jsx'
import SearchNasa from './pages/SearchNasa'
import SavedNasa from './pages/SavedNasa'
// import NotFound from './components/NotFound'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Page Not Found!!!</h1>,
    children: [
      {
        index: true,
        element: <SearchNasa />
      },
      {
        path: '/saved',
        element: <SavedNasa />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/contact',
        element: <ContactPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)