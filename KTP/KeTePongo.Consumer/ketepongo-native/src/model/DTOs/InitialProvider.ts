export interface IInitialProvider {
    name: {
        data: string,
        isValid: boolean
    },
    email: string,
    phone: string
}

export const InitialProvider: IInitialProvider = {
    name: {
        data: '',
        isValid: false,
    },
    email: '',
    phone: '0',
}