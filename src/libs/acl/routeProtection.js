import ability from './ability'

export const canNavigate = to => to.matched.some(route => ability.can(route.meta.action || 'VIEW', route.meta.subject))

export const _ = undefined
