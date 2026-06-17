import { createRouter, createWebHistory } from 'vue-router'
import OnboardingView from '../views/OnboardingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CadastroView from '../views/CadastroView.vue'
import VerifyEmailView from '../views/VerifyEmailView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'

// Logged-in components & layouts
import AppLayout from '../layouts/AppLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import EstanteView from '../views/EstanteView.vue'
import ExploreView from '../views/ExploreView.vue'
import ComunidadeView from '../views/ComunidadeView.vue'
import ProgressoView from '../views/ProgressoView.vue'
import PerfilView from '../views/PerfilView.vue'
import SettingsView from '../views/SettingsView.vue'
import BookDetailsView from '../views/BookDetailsView.vue'
import WriteReviewView from '../views/WriteReviewView.vue'

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
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView,
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
    // Logged-in pages routes (nested under AppLayout at root level)
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'estante',
          name: 'estante',
          component: EstanteView,
        },
        {
          path: 'explorar',
          name: 'explore',
          component: ExploreView,
        },
        {
          path: 'comunidade',
          name: 'community',
          component: ComunidadeView,
        },
        {
          path: 'progresso',
          name: 'progress',
          component: ProgressoView,
        },
        {
          path: 'perfil',
          name: 'profile',
          component: PerfilView,
        },
        {
          path: 'configuracoes',
          name: 'settings',
          component: SettingsView,
        },
        {
          path: 'livro/:id',
          name: 'book-details',
          component: BookDetailsView,
        },
        {
          path: 'livro/:id/resenha',
          name: 'write-review',
          component: WriteReviewView,
        },
      ],
    },
  ],
})

export default router
