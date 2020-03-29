import * as axios from 'axios';

// import { format } from 'date-fns';
// import { inputDateFormat } from './constants';

import { API } from './config';

const getCatFoods = async function() {
    try {
        console.log('data.service.getCatFoods():  Attempting to get Cat Foods!!!!');
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

const getCatTowers = async function() {
    try {
        console.log('data.service.getCatTowers():  Atempting to get Cat Towers!!!!');
        console.log(API);
        const response = await axios.get(`${API}/catTowers`);

        let data = parseList(response);

        const catTowers = data.map(h => {
            return h;
        });

        return catTowers;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const getCatToys = async function() {
    try {
        console.log('data.service.getCatToys():  Atempting to get Cat Toys!!!!');
        console.log(API);
        const response = await axios.get(`${API}/catToys`);

        let data = parseList(response);

        const catToys = data.map(h => {
            return h;
        });

        return catToys;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const getCatLitters = async function() {
    try {
        console.log('data.service.getCatLitters():  Atempting to get Cat Litters!!!!');
        console.log(API);
        const response = await axios.get(`${API}/catLitter`);

        let data = parseList(response);

        const catLitters = data.map(h => {
            return h;
        });

        return catLitters;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const addShoppingCartItem = async function () {
    console.log('addShoppingCartItem');
    // If product doesn't exist in the Shopping Cart, add it
    // If it does exist in Shopping Cart, increase quantity
    return null;
}

const updateShoppingCartItem = async function() {
    console.log('updateShoppingCartItem');
    // will probably just be updating quantity
    return null;
}

const deleteShoppingCartItem = async function() {
    // try {
        console.log('deleteShoppingCartItem');
        // will remove the entire product from shopping cart
    return null;
    // } catch (error) {
    //     console.error(error);
    //     return null;
    // }
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
      getCatFoods,
      getCatTowers,
      getCatToys,
      getCatLitters,
      addShoppingCartItem,
      updateShoppingCartItem,
      deleteShoppingCartItem
  };