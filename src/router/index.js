import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { getHomeRouteForLoggedInUser, getUserData, isUserLoggedIn } from '@/auth/utils'
import auth from './routes/auth'
import misc from './routes/misc'
import home from './routes/home'
import projects from './routes/projects'
import notes from './routes/notes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'home' } },
    ...auth,
    ...misc,
    ...home,
    ...projects,
    ...notes,
    {
      path: '*',
      redirect: { name: 'error-404' },
    },
  ],
})

router.beforeEach((to, _, next) => {
  const userData = getUserData()
  const isLoggedIn = isUserLoggedIn()

  if (to.meta.resource === 'AUTH' && isLoggedIn) {
    return next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  if (to.meta.resource === 'ACL') {
    if (!isLoggedIn) return next({ name: 'auth-login' })

    if (!canNavigate(to)) {
      return next({ name: 'misc-not-authorized' })
    }
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
