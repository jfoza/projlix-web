export const googleAuthResponse = () => {
  const clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID

  const client = google.accounts.oauth2.initCodeClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    ux_mode: 'popup',
  })

  return client.requestCode()
}
