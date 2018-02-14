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
    name: 'feeds',
    component: Feeds,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },

  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
];

export default routes;
