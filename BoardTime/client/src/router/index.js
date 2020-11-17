import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import UserProfile from '@/views/UserProfile.vue'
import Tasks from '@/views/Tasks.vue'

export default [
  { path: '/', component: Home, name:'home' },
  { path: '/login', component: Login, name:'login' },
  { path: '/dashboard/:email', 
    component: DashboardLayout, 
    name: 'dashboard',
    children:[
      {
        path:'profile',
        name:'profile',
        component: UserProfile
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: Tasks
      }
    ]
  }
]