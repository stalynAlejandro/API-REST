const ARRAYS = {
  weekdays: [
    {
      name: 'LUNES',
      id: 0
    },
    {
      name: 'MARTES',
      id: 1
    },
    {
      name: 'MIÉRCOLES',
      id: 2
    },
    {
      name: 'JUEVES',
      id: 3
    },
    {
      name: 'VIERNES',
      id: 4
    },
    {
      name: 'SÁBADO',
      id: 5
    },
    {
      name: 'DOMINGO',
      id: 6
    }
  ],
  letterWeekDay: ['L', 'M', 'MI', 'J', 'V', 'S', 'D']
};

function getDictionaryValuesByKeys(dictionary, keys){
  //TODO move to generic stuff
  return Object.keys(dictionary)
    .filter(key => keys.includes(parseInt(key)))
    .reduce((obj, key) => {
      obj[key] = dictionary[key];
      return obj;
    }, {});
};

export { ARRAYS, getDictionaryValuesByKeys };
