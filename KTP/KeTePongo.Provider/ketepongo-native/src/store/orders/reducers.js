import {
  LOAD_VALIDATION_ORDER
} from './types';

const order = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_VALIDATION_ORDER:
      return {
        ...state,
        validationOrder: action.payload
      };
    default:
      return state;
  }
};

export default order;

const initialState = {
  validationOrder: undefined,
  inspectClientOrders: [
    {
      tradeName: 'Paquito',
      orderNumber: 123456,
      date: new Date(),
      products: [
        {
          id: 0,
          name: 'Chorizo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 1,
          name: 'Chorizo Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 2,
          name: 'Chorizo Super Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 3,
          name: 'Chorizo del Bueno',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 4,
          name: 'Chorizo del Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 5,
          name: 'Chorizo del Caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      validate: [

      ],
      approved: false,
      finished: false
    },
    {
      tradeName: 'Paquito',
      orderNumber: 123458,
      date: new Date(),
      products: [
        {
          id: 6,
          name: 'Jamon',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 7,
          name: 'Jamon Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 8,
          name: 'Jamon Super Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 9,
          name: 'Jamon del Bueno',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 10,
          name: 'Jamon del Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 11,
          name: 'Jamon del Caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      validate: [
        {
          id: 21,
          name: 'Jamon del Malo Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 22,
          name: 'Jamon del Caro caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      approved: false,
      finished: false,
    },
    {
      tradeName: 'Paquito',
      orderNumber: 123458,
      date: new Date(),
      products: [
        {
          id: 12,
          name: 'Arroz',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 13,
          name: 'Guisantes',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 14,
          name: 'Jamon York',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 15,
          name: 'Sal',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        }
      ],
      approved: true,
      finished: true,
    },
    {
      tradeName: 'Paquito',
      orderNumber: 123456,
      date: new Date(),
      products: [
        {
          id: 0,
          name: 'Chorizo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 1,
          name: 'Chorizo Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 2,
          name: 'Chorizo Super Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 3,
          name: 'Chorizo del Bueno',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 4,
          name: 'Chorizo del Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 5,
          name: 'Chorizo del Caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      validate: [

      ],
      approved: false,
      finished: false
    },
    {
      tradeName: 'Paquito',
      orderNumber: 123458,
      date: new Date(),
      products: [
        {
          id: 6,
          name: 'Jamon',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 7,
          name: 'Jamon Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 8,
          name: 'Jamon Super Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 9,
          name: 'Jamon del Bueno',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 10,
          name: 'Jamon del Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 11,
          name: 'Jamon del Caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      validate: [
        {
          id: 21,
          name: 'Jamon del Malo Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 22,
          name: 'Jamon del Caro caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      approved: false,
      finished: false,
    },
    {
      tradeName: 'Paquito',
      orderNumber: 123458,
      date: new Date(),
      products: [
        {
          id: 12,
          name: 'Arroz',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 13,
          name: 'Guisantes',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 14,
          name: 'Jamon York',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 15,
          name: 'Sal',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        }
      ],
      approved: true,
      finished: true,
    },
  ],
  list: [
    {
      tradeName: 'Paquito',
      orderNumber: 123456,
      date: new Date(),
      products: [
        {
          id: 0,
          name: 'Chorizo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 1,
          name: 'Chorizo Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 2,
          name: 'Chorizo Super Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 3,
          name: 'Chorizo del Bueno',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 4,
          name: 'Chorizo del Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 5,
          name: 'Chorizo del Caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      validate: [

      ],
      approved: false,
      finished: false
    },
    {
      tradeName: 'Bar Manolo',
      orderNumber: 123458,
      date: new Date(),
      products: [
        {
          id: 6,
          name: 'Jamon',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 7,
          name: 'Jamon Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 8,
          name: 'Jamon Super Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 9,
          name: 'Jamon del Bueno',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 10,
          name: 'Jamon del Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 11,
          name: 'Jamon del Caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      validate: [
        {
          id: 21,
          name: 'Jamon del Malo Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 22,
          name: 'Jamon del Caro caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      approved: false,
      finished: false,
    },
    {
      tradeName: 'Restaurante 3 Delicias',
      orderNumber: 123458,
      date: new Date(),
      products: [
        {
          id: 12,
          name: 'Arroz',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 13,
          name: 'Guisantes',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 14,
          name: 'Jamon York',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 15,
          name: 'Sal',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        }
      ],
      approved: true,
      finished: true,
    },
  ],
  pending: [
    {
      tradeName: 'Paquito',
      orderNumber: 123456,
      date: new Date(),
      products: [
        {
          id: 0,
          name: 'Chorizo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 1,
          name: 'Chorizo Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 2,
          name: 'Chorizo Super Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 3,
          name: 'Chorizo del Bueno',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 4,
          name: 'Chorizo del Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 5,
          name: 'Chorizo del Caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      validate: [

      ],
      approved: false,
      finished: false
    },
    {
      tradeName: 'Bar Manolo',
      orderNumber: 123458,
      date: new Date(),
      products: [
        {
          id: 6,
          name: 'Jamon',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 7,
          name: 'Jamon Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 8,
          name: 'Jamon Super Curado',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 9,
          name: 'Jamon del Bueno',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 10,
          name: 'Jamon del Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 11,
          name: 'Jamon del Caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      validate: [
        {
          id: 21,
          name: 'Jamon del Malo Malo',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
        {
          id: 22,
          name: 'Jamon del Caro caro',
          image: '',
          ref: 123456, 
          format: 'Caja 5 uds',
          quantity: 10
        },
      ],
      approved: false,
      finished: false,
    }
  ]
};
