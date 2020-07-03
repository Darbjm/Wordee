export const setToken = token => {
  localStorage.setItem('token', token)
}
export const getToken = () => localStorage.getItem('token')
export const logout = () => localStorage.removeItem('token')
export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}
export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

export const getUser = () => {
  const { sub } = getPayload()
  return sub
}
