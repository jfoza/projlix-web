import { v4 as uuidv4, validate } from 'uuid'

export const uuidV4IsValid = uuid => {
  if (!uuid) {
    return false
  }

  return validate(uuid)
}

export const uuidV4Generate = () => uuidv4()
