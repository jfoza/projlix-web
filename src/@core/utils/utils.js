import router from '@/router'
// eslint-disable-next-line object-curly-newline
import { reactive, getCurrentInstance, watch, toRefs } from '@vue/composition-api'

export const isObject = obj => typeof obj === 'object' && obj !== null

export const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

const getRandomFromArray = array => array[Math.floor(Math.random() * array.length)]

// ? Light and Dark variant is not included
// prettier-ignore
export const getRandomBsVariant = () => getRandomFromArray(['primary', 'secondary', 'success', 'warning', 'danger', 'info'])

export const isDynamicRouteActive = route => {
  const { route: resolvedRoute } = router.resolve(route)
  return resolvedRoute.path === router.currentRoute.path
}

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const vm = getCurrentInstance().proxy
  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}

export const strClear = str => str.replace(/\D/g, '')

export const getArrayAttr = (array, field) => array.map(item => item[field])

export const randomNumberInterval = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a

export const moneyFormatBRL = value => {
  const zeros = [0.00, 0, '0.00', '0']

  if (zeros.includes(value) || !value) {
    return 'R$ 0,00'
  }

  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export const moneyFormatEN = value => {
  let aux = value

  aux = aux.replace('.', '')

  return aux.replace(',', '.')
}

export const handleMoneyFormat = value => {
  value = `${value}`
  value = parseInt(value.replace(/\D+/g, ''), 10)
  value = `${value}`
  value = value.replace(/([0-9]{2})$/g, ',$1')

  if (value.length > 6) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  if (value === 'NaN') value = ''

  return value
}
