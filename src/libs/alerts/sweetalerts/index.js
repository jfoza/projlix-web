// eslint-disable-next-line import/no-unresolved
import '@/assets/scss/sweetalerts.scss'
import Swal from 'sweetalert2'

export const errorMessage = message => Swal.fire({
  icon: 'error',
  html: `${message || ''}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const successMessage = (message, title) => Swal.fire({
  icon: 'success',
  title: title || '',
  html: `${message || ''}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'success-outline-button-sweet',
  },
})

export const warningMessage = message => Swal.fire({
  icon: 'warning',
  html: `${message || ''}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const warningInfoMessage = (title, message, messageButton) => Swal.fire({
  icon: 'warning',
  title: title || '',
  html: `${message || ''}`,
  confirmButtonText: messageButton || '',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const successMessageAction = message => new Promise(resolve => {
  Swal.fire({
    html: `${message || ''}`,
    icon: 'success',
    confirmButtonText: 'Ok',
    customClass: {
      confirmButton: 'confirm-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    }
  })
})

export const warningMessageBasicAction = message => new Promise(resolve => {
  Swal.fire({
    icon: 'warning',
    html: `${message || ''}`,
    confirmButtonText: 'Ok',
    customClass: {
      confirmButton: 'confirm-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    }
  })
})

export const warningMessageAction = (title, message, confirmButtonMessage) => new Promise(resolve => {
  Swal.fire({
    icon: 'warning',
    title: title || '',
    html: `${message || ''}`,
    showDenyButton: true,
    confirmButtonText: confirmButtonMessage || '',
    denyButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'confirm-button-sweet',
      denyButton: 'cancel-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    }
  })
})

export const confirmAction = message => new Promise((resolve, reject) => {
  Swal.fire({
    icon: 'warning',
    html: `<h6 style="color: #ff9f43">${message}</h6>` || '',
    showDenyButton: true,
    confirmButtonText: 'Sim',
    denyButtonText: 'Não',
    customClass: {
      confirmButton: 'confirm-button-sweet',
    }
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    } else if (result.isDenied) {
      reject()
    }
  })
})

export const warningMessageUpdateStatus = (title, html) => new Promise((resolve, reject) => {
  Swal.fire({
    icon: 'warning',
    title,
    html,
    showDenyButton: true,
    confirmButtonText: 'Sim, alterar',
    denyButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'confirm-button-sweet',
      denyButton: 'cancel-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    } else if (result.isDenied) {
      reject()
    }
  })
})

export const warningMessageRemoveProduct = category => new Promise(resolve => {
  Swal.fire({
    icon: 'warning',
    title: 'Deseja desvincular o produto ?',
    html: `Ao desvincular a categoria <strong>${category}</strong> do(s) produto(s) selecionado(s), os mesmos não farão mais parte do cadastro. Para retornar será necessário vincular novamente.`,
    showDenyButton: true,
    confirmButtonText: 'Desvincular',
    denyButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'confirm-button-sweet',
      denyButton: 'cancel-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    }
  })
})
