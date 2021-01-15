import * as actions from './user.actionTypes';

// El reducer del Usuario. Guarda los datos del usuario. 

//Interfaz para las Tareas
export interface ITask{
    _id: string,
    name: string,
    desc: string
}

//Interfaz para el Usuario
export interface IUser {
    name: string,
    email: string,
    token: string,
    tasks: ITask[]
}

// El estado inicial de un Usuario.
const initialState: IUser = {
    name: '',
    email: '',
    token: '',
    tasks: []
}

// El reducer del usuario. 
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
        case actions.USER_LOGOUT: return {
            name: '',
            email: '',
            token: '',
            tasks: []
        };
        case actions.USER_LOAD_TASKS: return{
            ...state,
            tasks: action.payload.tasks
        }
        default: return state;
    }
}

export default userReducer;