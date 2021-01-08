const dataUserUrl = 'http://localhost:3000/users';
const dataTasksUrl = 'http://localhost:3000/users/tasks'

// const response = await fetch('http://localhost:3000/users')

// const body = await response.json()
// console.log(body)

export const logginUser = async (username: string, password: string) => {
    const response = await Promise.all([fetch(dataUserUrl)])
    return response;
}