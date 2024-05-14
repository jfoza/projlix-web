export const getLinkWhatsApp = cellPhone => {
  window.open(
    `https://wa.me/55${cellPhone}`,
    '_blank',
  )
}

export const getLinkWhatsAppWithMessage = (cellPhone, productUniqueName) => {
  const appUrl = process.env.VUE_APP_APP_URL

  window.open(
    `https://wa.me/55${cellPhone}?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20este%20produto:%20${appUrl}/produtos/detalhes/${productUniqueName}`,
    '_blank',
  )
}
