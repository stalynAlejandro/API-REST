import * as actions from './user.actionTypes';

export interface ITask{
    id: number,
    name: string,
    description: string
}

export interface IUser {
    name: string,
    email: string,
    token: string,
    tasks: ITask[]
}

const initialState: IUser = {
    name: '',
    email: '',
    token: '',
    tasks: []
}

function userReducer(state = initialState, action: any){
    if(!action) return state;
    switch(action.type){
        case actions.USER_LOGIN: 
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            };
        case actions.USER_LOGOUT: return {...state};
        case actions.USER_SINGUP: return {...state};
        default: return state;
    }
}

export default userReducer;