const baseUrl = 'http://localhost:3000/'
const dataUserUrl = 'http://localhost:3000/users/';

// Estas funciones se encargan de hacer las llamadas al servidor de NodeJs APIREST. 

// Logear un Usuario
export const loginUser = async (_email: string, _password: string) => {
    const response= await fetch(dataUserUrl + 'login', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer my-token"
        },
        body: JSON.stringify({
            email: _email,
            password: _password
        })
    })
    return await response.json();
}

// Dar de alta un usuario
export const singupUser = async (_email: string, _username: string, _password: string) => {
    const response = await fetch(dataUserUrl + 'signin', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: _username,
            email: _email,
            password: _password
        })
    })
    return response;
}

// Recargar las tarea/s de un Usuario
export const loadTask = async (_email: string, _token: string) => {
    const response = await fetch(baseUrl + _email + '/tasks', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${_token}`  
        }
    })
    return await response.json()
}

// Borrar un Tarea
export const deleteTask = async (_idTask: string, _email: string, _token: string) => {
    const response = await fetch(baseUrl + _email + '/tasks/' + _idTask, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${_token}` 
        }
    })
    return await response.json()
}

// Crear una Tarea
export const createTask = async (_email:string, _token:string, _taskName:string, _taskDesc:string) => {
    const response = await fetch(baseUrl + _email + '/tasks', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${_token}`
        },
        body: JSON.stringify({
            name: _taskName.toUpperCase(),
            desc: _taskDesc
        })
    })

    return await response.json()
}