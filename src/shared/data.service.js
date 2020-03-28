import * as axios from 'axios';

// import { format } from 'date-fns';
// import { inputDateFormat } from './constants';

import { API } from './config';

const getCatFoods = async function() {
    try {
        console.log('data.service.getCatFoods():  Attempting to get Cat Food!!!!');
        console.log(API);
        const response = await axios.get(`${API}/catFood`);

        let data = parseList(response);

        const catFoods = data.map(h => {
            return h;
        });

        return catFoods;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const parseList = response => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') {
      list = [];
    }
    return list;
  };
  
  
  export const dataService = {
      getCatFoods
  };