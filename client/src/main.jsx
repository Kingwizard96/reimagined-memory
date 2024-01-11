import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
// import './App.css'

import App from './App.jsx'
import SearchNasa from './pages/SearchNasa'
import SavedNasa from './pages/SavedNasa'
import NotFound from './components/NotFound'
import About from './pages/About'
import Contact from './pages/Contact'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound/>,
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
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)