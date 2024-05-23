import { actions, subjects } from '@/libs/acl/rules'

export default [
  {
    title: 'Projetos',
    icon: 'LayersIcon',
    route: 'projects-list',
    resource: subjects.PROJECTS,
    action: actions.VIEW,
  },
]
