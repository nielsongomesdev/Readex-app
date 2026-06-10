import { createRouter, createWebHistory } from 'vue-router'
import OnboardingView from '../views/OnboardingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import VerifyEmailView from '../views/VerifyEmailView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'

// Logged-in components & layouts
import AppLayout from '../layouts/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import BookshelfView from '../views/BookshelfView.vue'
import ExploreView from '../views/ExploreView.vue'
import CommunityView from '../views/CommunityView.vue'
import ProgressView from '../views/ProgressView.vue'
import ProfileView from '../views/ProfileView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'onboarding',
      component: OnboardingView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmailView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
    },
    // Logged-in pages routes (nested under AppLayout)
    {
      path: '/app',
      component: AppLayout,
      children: [
        {
          path: '',
          redirect: '/app/home',
        },
        {
          path: 'home',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'bookshelf',
          name: 'bookshelf',
          component: BookshelfView,
        },
        {
          path: 'explore',
          name: 'explore',
          component: ExploreView,
        },
        {
          path: 'community',
          name: 'community',
          component: CommunityView,
        },
        {
          path: 'progress',
          name: 'progress',
          component: ProgressView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView,
        },
      ],
    },
  ],
})

export default router
