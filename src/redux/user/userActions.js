import { ADD_USER } from './userTypes'

export const addUserInfo = (user) => {
  return {
    type: ADD_USER,
    payload: user
  }
}