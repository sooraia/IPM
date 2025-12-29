import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ContinentView from '@/views/ContinentView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CompareCitiesView from '@/views/CompareCitiesView.vue'
import SupportView from '@/views/SupportView.vue'
import FaqView from '@/views/FaqView.vue'
import AlojamentosView from '@/views/AlojamentosView.vue'
import ProfileView from '@/views/ProfileView.vue'
import DashboardCityView from '@/views/DashboardCityView.vue'
import CreateGraphView from '@/views/CreateGraphView.vue'


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
      path: '/profile',
      name: 'profile',
      component: ProfileView,
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
      path: '/alojamentos',
      name: 'alojamentos',
      component: AlojamentosView
    },
    {
      path: '/createGraph',
      name: 'createGraph',
      component: CreateGraphView
    },
    {
      path: '/dashboardCity',
      name: 'dashboardCity',
      component: DashboardCityView
    }
  ],
})

export default router
