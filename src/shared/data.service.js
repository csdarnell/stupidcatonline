import * as axios from 'axios';

// import { format } from 'date-fns';
// import { inputDateFormat } from './constants';

import { API } from './config';

const getCatFood = async function() {
    try {
        const response = await axios.get(`${API}/catFood`);

        let data = parseList(response);

        const catFood = data.map(h => {
            return h;
        });

        return catFood;

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
      getCatFood
  };