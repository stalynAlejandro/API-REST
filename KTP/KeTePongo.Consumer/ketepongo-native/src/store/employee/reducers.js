const initialState = [
    {
      id: 1,
      name: 'Manuel',
      email: 'manuel@restauranteloquesea.com',
      telephone:  6000000001,
      role: 'admin',
      isValidated: true
    },
    {
      id: 2,
      name: 'Rocío V.',
      email: 'rocio.v@restauranteloquesea.com',
      telephone:  6000000001,
      role: 'employee',
      isValidated: true
    },
    {
      id: 3,
      name: 'Alfonso Pérez',
      email: 'alfonsoperez@restauranteloquesea.com',
      telephone:  6000000001,
      role: 'employee',
      isValidated: true
    },
    {
      id: 4,
      name: 'María',
      email: 'maria@restauranteloquesea.com',
      telephone:  6000000001,
      role: 'admin',
      isValidated: false
    },
    {
      id: 5,
      name: 'Paquito',
      email: 'paquito@restauranteloquesea.com',
      telephone:  6000000001,
      role: 'employee'
    },
    {
      id: 6,
      name: 'Juaquin',
      email: 'Juanquin@restauranteloquesea.com',
      telephone:  6000000001,
      role: 'employee',
      isValidated: true
    }
];


const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default employeeReducer;