import { uuidV4Generate } from '@core/utils/validations/uuidv4'

export const statusForm = [
  {
    id: uuidV4Generate(),
    boolValue: true,
    description: 'Ativo',
  },
  {
    id: uuidV4Generate(),
    boolValue: false,
    description: 'Inativo',
  },
]
