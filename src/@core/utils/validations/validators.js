import { strClear } from '@/@core/utils/utils'

export const validatorEqualDigits = str => new Set(str).size > 1

export const validatorUrlValidator = val => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  /* eslint-enable no-useless-escape */
  return re.test(val)
}

export const validatorCPF = cpf => {
  cpf = strClear(cpf)
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false
  let result = true;
  [9, 10].forEach(j => {
    let soma = 0
    let r
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach((e, i) => {
        soma += parseInt(e) * (j + 2 - (i + 1))
      })
    r = soma % 11
    r = r < 2 ? 0 : 11 - r
    if (r != cpf.substring(j, j + 1)) result = false
  })
  return result
}

export const validatorEmail = email => {
  const re = /\S+@\S+\.\S+/

  return !(!email || !re.test(email))
}

export const validatorCNPJ = doc => {
  doc = strClear(doc)
  if (doc.length !== 14) return false
  if (!doc) return false
  if (doc.length !== 14) return false
  // Elimina docs invalidos conhecidos
  if (
    doc === '00000000000000'
      || doc === '11111111111111'
      || doc === '22222222222222'
      || doc === '33333333333333'
      || doc === '44444444444444'
      || doc === '55555555555555'
      || doc === '66666666666666'
      || doc === '77777777777777'
      || doc === '88888888888888'
      || doc === '99999999999999'
  ) return false
  // Valida DVs
  let size = doc.length - 2
  let nums = doc.substring(0, size)
  const dig = doc.substring(size)
  let sum = 0
  let pos = size - 7
  for (let i = size; i >= 1; i--) {
    sum += nums.charAt(size - i) * pos--
    if (pos < 2) pos = 9
  }
  let res = sum % 11 < 2 ? 0 : 11 - sum % 11
  if (res != dig.charAt(0)) return false
  size += 1
  nums = doc.substring(0, size)
  sum = 0
  pos = size - 7
  for (let i = size; i >= 1; i--) {
    sum += nums.charAt(size - i) * pos--
    if (pos < 2) pos = 9
  }
  res = sum % 11 < 2 ? 0 : 11 - sum % 11
  return res == dig.charAt(1)
}

export const validatorPassword = value => {
  if (value.length < 8 || value.length > 16) {
    return false
  }

  const hasAccents = /[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/.test(value)

  if (hasAccents) {
    return false
  }

  const regLower = /[a-z]+/.test(value)
  const regUpper = /[A-Z]+/.test(value)
  const regNumber = /\d+/.test(value)
  const regSpecial = /[#?!@$%^&*-]+/.test(value)

  const passwordRules = [
    regLower && regUpper,
    regLower && regNumber,
    regLower && regSpecial,
    regUpper && regNumber,
    regNumber && regSpecial,
    regUpper && regSpecial,
    regLower && regUpper && regNumber && regSpecial,
  ]

  return passwordRules.includes(true)
}

export const validatorCellPhone = phone => {
  phone = strClear(phone)

  return validatorEqualDigits(phone)
}

export function validateNoSpecialChars(value, fieldName) {
  const hasSpecialChars = /^[!@#$%^&*(),?":{}|<>]|[^.\w\s]/.test(value)

  return !hasSpecialChars
}
