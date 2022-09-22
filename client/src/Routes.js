import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';


// Pages
export default [
    // Index page
    {
      path: '/',
      component: Home,
    },
    // About page
    {
      path: '/about/',
      component: About,
    },
    {
      path: '/signup/',
      component: Signup,
    }
]