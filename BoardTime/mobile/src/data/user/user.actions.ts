import * as actions from './user.actionTypes'

export const userLogin = (email: string, password: string) => ({
    type: actions.USER_LOGIN,
    payload: {
        email, 
        password
    }
})

export const userLogout = () => ({
    type: actions.USER_LOGOUT,
    payload: undefined
})

export const userSingup = (email: string, name: string, password: string) => ({
    type: actions.USER_SINGUP,
    payload:{
        email,
        name,
        password
    }
})