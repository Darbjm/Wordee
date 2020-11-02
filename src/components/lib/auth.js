/**Set the users token */
export const setToken = token => {
  localStorage.setItem('token', token)
}
/**Retrieve the users token */
export const getToken = () => localStorage.getItem('token')
/**Logout */
export const logout = () => localStorage.removeItem('token')
/**Get payload */
export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}
/**Check if users token is valid */
export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}
/**Get user */
export const getUser = () => {
  const { sub } = getPayload()
  return sub
}
