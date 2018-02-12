import Feeds from '@/pages/Feeds'
import Profile from '@/pages/Profile'
import LogIn from '@/pages/LogIn'
import SignUp from '@/pages/SignUp'

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/feeds',
    name: 'Feeds',
    component: Feeds,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },

  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
];

export default routes;
