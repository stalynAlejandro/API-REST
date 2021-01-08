import * as actions from './user.actionTypes';

interface ITask{
    id: number,
    name: string,
    description: string
}

interface IUser {
    name: string,
    email: string,
    password: string,
    token: string,
    tasks: ITask[]
}

const initialState: IUser = {
    name: '',
    email: '',
    password: '',
    token: '',
    tasks: []
}

function userReducer(state = initialState, action: any){
    if(!action) return state;
    switch(action.type){
        case actions.USER_LOGIN: return {...state};
        case actions.USER_LOGOUT: return {...state};
        case actions.USER_SINGUP: return {...state};
        default: return state;
    }
}

export default userReducer;