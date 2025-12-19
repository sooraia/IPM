import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ContinentView from '@/views/ContinentView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CompareCitiesView from '@/views/CompareCitiesView.vue'
import SupportView from '@/views/SupportView.vue'
<<<<<<< HEAD
import CreateGraphView from '@/views/CreateGraphView.vue'
=======
import FaqView from '@/views/FaqView.vue'
>>>>>>> fe66aeeedf06f7ff8de4ca3ecbfd31ea789f6b08


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/explore',
      name: 'explore',
      component: ContinentView
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/compareCities',
      name: 'CompareCities',
      component: CompareCitiesView
    },
    {
      path: '/support',
      name: 'support',
      component: SupportView
    },
    {
      path: '/graph',
      name: 'graph',
      component: CreateGraphView
    }
  ],
})

export default router
