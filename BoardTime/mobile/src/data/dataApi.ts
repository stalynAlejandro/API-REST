const dataUserUrl = 'http://localhost:3000/users/';
const dataTasksUrl = 'http://localhost:3000/users/tasks'

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