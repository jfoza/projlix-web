import { Ability } from '@casl/ability'
import { getUserData } from '@/auth/utils'
import { initialAbility } from './config'

const userData = getUserData()
const existingAbility = userData ? userData.ability : null

export default new Ability(existingAbility || initialAbility)
