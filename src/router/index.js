import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Subscribe from '../views/Subscribe.vue'
import Wallet from '../views/Wallet.vue'
import Asset from '../views/Asset.vue'
import Statistics from '../views/Statistics.vue'
import Premium from '../views/Premium.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet
  },
  {
    path: '/wallet/:id',
    name: 'Asset',
    component: Asset
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/premium',
    name: 'Premium',
    component: Premium
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router