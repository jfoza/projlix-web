import { extend, localize } from 'vee-validate'
import {
  required as rule_required,
  email as rule_email,
  min as rule_min,
  confirmed as rule_confirmed,
  regex as rule_regex,
  between as rule_between,
  alpha as rule_alpha,
  integer as rule_integer,
  digits as rule_digits,
  alpha_dash as rule_alpha_dash,
  alpha_num as rule_alpha_num,
  length as rule_length,
} from 'vee-validate/dist/rules'

import ptBR from 'vee-validate/dist/locale/pt_BR.json'
import { messages } from '@core/utils/validations/messages'

// eslint-disable-next-line object-curly-newline
import {
  validatorPassword,
  validatorCNPJ,
  validatorCPF,
  validatorCellPhone,
  validatorUrlValidator,
  validateNoSpecialChars,
} from './validators'

// ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

export const required = extend('required', rule_required)

export const email = extend('email', rule_email)

export const min = extend('min', rule_min)

export const confirmed = extend('confirmed', rule_confirmed)

export const regex = extend('regex', rule_regex)

export const between = extend('between', rule_between)

export const alpha = extend('alpha', rule_alpha)

export const integer = extend('integer', rule_integer)

export const digits = extend('digits', rule_digits)

export const alphaDash = extend('alpha-dash', rule_alpha_dash)

export const alphaNum = extend('alpha-num', rule_alpha_num)

export const length = extend('length', rule_length)

export const password = extend('password', {
  validate: validatorPassword,
  message: messages.invalidPassword,
})

export const cnpj = extend('cnpj', {
  validate: validatorCNPJ,
  message: messages.invalidCNPJ,
})

export const cpf = extend('cpf', {
  validate: validatorCPF,
  message: messages.invalidCPF,
})

export const cellPhone = extend('cellPhone', {
  validate: validatorCellPhone,
  message: messages.invalidPhone,
})

export const url = extend('url', {
  validate: validatorUrlValidator,
  message: messages.invalidUrl,
})

export const noSpecialChars = extend('noSpecialChars', {
  validate: (value, [fieldName]) => validateNoSpecialChars(value, fieldName),
  message: fieldName => messages.hasSpecialChars(fieldName),
})

localize({ en: ptBR })
