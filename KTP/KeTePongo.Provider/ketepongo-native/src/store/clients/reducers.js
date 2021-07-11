import {
  LOAD_CLIENT_REQUEST
} from './types';

const order = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLIENT_REQUEST :
      return {
        ...state,
        selectedClient: action.payload
      };
    default:
      return state;
  }
};

export default order;

const initialState = {
  selectedClient: undefined,
  list: [
    {
      tradeName: 'Restaurante Paquito',
      name: 'Paquito',
      phone: 625598523,
      email: 'paquito@gmail.com',
      address: 'Dirección Larga dos líneas líneas líneas líneas líneas, número, CP',
      employeeList: [
        {
          name: 'Pedro',
          email: 'Pedro@gmail.com',
          phone: 586246325
        },
        {
          name: 'Marta',
          email: 'Marta@gmail.com',
          phone: 586246325
        },
      ]
    },
    {
      tradeName: 'Restaurante Margarita',
      name: 'Margarita',
      phone: 625598521,
      email: 'Margarita@gmail.com',
      address: 'Dirección Larga dos líneas líneas líneas líneas líneas, número, CP',
      employeeList: [
        {
          name: 'Pedro',
          email: 'Pedro@gmail.com',
          phone: 586246325
        },
        {
          name: 'Marta',
          email: 'Marta@gmail.com',
          phone: 586246325
        },
        {
          name: 'Luisa',
          email: 'Luisa@gmail.com',
          phone: 586246325
        }
      ]
    },
    {
      tradeName: 'Restaurante Del Bueno',
      name: 'Sheng',
      phone: 625498523,
      email: 'sheng@gmail.com',
      address: 'Dirección Larga dos líneas líneas líneas líneas líneas, número, CP',
      employeeList: [
        {
          name: 'Pedro',
          email: 'Pedro@gmail.com',
          phone: 586246325
        },
        {
          name: 'Marta',
          email: 'Marta@gmail.com',
          phone: 586246325
        },
        {
          name: 'Luisa',
          email: 'Luisa@gmail.com',
          phone: 586246325
        }
      ]
    },
    {
      tradeName: 'Restaurante Del Caro Caro',
      name: 'Jacinto',
      phone: 625597523,
      email: 'Jacinto@gmail.com',
      address: 'Dirección Larga dos líneas líneas líneas líneas líneas, número, CP',
      employeeList: [
        {
          name: 'Pedro',
          email: 'Pedro@gmail.com',
          phone: 586246325
        },
        {
          name: 'Marta',
          email: 'Marta@gmail.com',
          phone: 586246325
        },
        {
          name: 'Luisa',
          email: 'Luisa@gmail.com',
          phone: 586246325
        }
      ]
    },
  ],
  pendingList: [
    {
      tradeName: 'Restaurante Maria',
      name: 'Maria',
      phone: 625598523,
      email: 'Maria@gmail.com',
      address: 'Dirección Larga dos líneas líneas líneas líneas líneas, número, CP',
      employeeList: [
        {
          name: 'Pedro',
          email: 'Pedro@gmail.com',
          phone: 586246325
        },
        {
          name: 'Marta',
          email: 'Marta@gmail.com',
          phone: 586246325
        },
        {
          name: 'Luisa',
          email: 'Luisa@gmail.com',
          phone: 586246325
        }
      ]
    },
    {
      tradeName: 'Restaurante Chorizos Curados',
      name: 'Jose',
      phone: 625598521,
      email: 'Jose@gmail.com',
      address: 'Dirección Larga dos líneas líneas líneas líneas líneas, número, CP',
      employeeList: [
        {
          name: 'Pepe Juan',
          email: 'PepeJuan@gmail.com',
          phone: 586246325
        },
        {
          name: 'Laura',
          email: 'Laura@gmail.com',
          phone: 586246325
        },
      ]
    },
    {
      tradeName: 'Restaurante De lo Mejorcito',
      name: 'Pepa',
      phone: 625498523,
      email: 'Pepa@gmail.com',      
      address: 'Dirección Larga dos líneas líneas líneas líneas líneas, número, CP',
      employeeList: [
        {
          name: 'Joselito',
          email: 'Joselito@gmail.com',
          phone: 586246325
        },
        {
          name: 'Susana',
          email: 'Susana@gmail.com',
          phone: 586246325
        },
      ]
    },
    {
      tradeName: 'Restaurante De lo mas Caro',
      name: 'Felipe',
      phone: 625597523,
      email: 'Felipe@gmail.com',
      address: 'Dirección Larga dos líneas líneas líneas líneas líneas, número, CP',
      employeeList: []
    },
  ]
};
