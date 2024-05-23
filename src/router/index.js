import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { getHomeRouteForLoggedInUser, getUserData, isUserLoggedIn } from '@/auth/utils'
import adminUsers from '@/views/pages/admin-users/routes'
import teamUsers from '@/views/pages/team-users/routes'
import auth from '@/views/pages/authentication/routes'
import notes from '@/views/pages/notes/routes'
import projects from '@/views/pages/projects/routes'
import misc from '@/views/pages/miscellaneous/routes'
import home from '@/views/home/routes'

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
    ...adminUsers,
    ...teamUsers,
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
