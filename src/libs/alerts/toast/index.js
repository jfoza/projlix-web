import Vue from 'vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export const toastSuccess = (title, text) => {
  Vue.prototype.$toast({
    component: ToastificationContent,
    props: {
      title,
      icon: 'CheckIcon',
      text,
      variant: 'success',
    },
  })
}

export const toastWarning = (title, text) => {
  Vue.prototype.$toast({
    component: ToastificationContent,
    props: {
      title,
      icon: 'AlertTriangleIcon',
      text,
      variant: 'warning',
    },
  })
}
