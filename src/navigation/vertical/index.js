import home from './menus/home'
import projects from './menus/projects'
import positions from './menus/positions'
import persons from './menus/persons'
import notes from './menus/notes'
import meetings from './menus/meetings'
import adminUsers from './menus/admins'

export default [
  ...home,
  ...projects,
  ...positions,
  ...persons,
  ...meetings,
  ...notes,
  ...adminUsers,
]
