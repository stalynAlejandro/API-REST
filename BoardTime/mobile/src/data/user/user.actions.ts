import * as actions from './user.actionTypes'

// Las acciones que llamamos para que modifiquen el estado de la aplicación.

export const loginUserData = (email: string, name:string,  token: string) => ({
    type: actions.USER_LOGIN,
    payload: {
        email, 
        name,
        token,
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

export const userLoadTasks = (_tasks: string[]) => ({
    type: actions.USER_LOAD_TASKS,
    payload:{
        tasks: _tasks
    }
})