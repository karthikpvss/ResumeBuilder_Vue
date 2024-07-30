import LoginSignup from '@/components/LoginPage.vue'
import SignupPage from '@/components/SignupPage.vue'
import ResumePage from '@/components/ResumePage.vue'
import ResumeEdit from '@/components/ResumeEdit.vue'
import HomePage from '@/components/HomePage.vue'
import {createRouter, createWebHistory} from 'vue-router'
import { components } from 'vuetify/dist/vuetify-labs.js'

const routes = [
    {
        path: '/login',
        component: LoginSignup
    },
    {
        path: '/signup',
        component: SignupPage
    },
    {
        path: '/resume',
        component: ResumePage
    },
    {
        path: '/editresume',
        component: ResumeEdit
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router