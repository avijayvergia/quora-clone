import Feeds from '@/pages/Feeds'
import Profile from '@/pages/Profile'

const routes = [
  {
    path: '/feeds',
    name: 'Feeds',
    component: Feeds
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
];

export default routes;
