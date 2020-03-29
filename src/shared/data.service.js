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

const getShoppingCartItems = async function() {
    try {
        console.log('data.service.getShoppingCartItems():  Atempting to get Shopping Cart Items!!!!');
        console.log(API);
        const response = await axios.get(`${API}/shoppingCart`);

        let data = parseList(response);

        const shoppingCartItems = data.map(h => {
            return h;
        });

        return shoppingCartItems;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const addShoppingCartItem = async function (shoppingCartItem) {
    try {
        console.log('addShoppingCartItem');
        const response = await axios.post(`${API}/shoppingCart`, shoppingCartItem);
        const addedShoppingCartItem = parseItem(response, 201);
        return addedShoppingCartItem;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const updateShoppingCartItem = async function(shoppingCartItem) {
    try {
        console.log('updateShoppingCartItem');
        const response = await axios.put(`${API}/shoppingCart/${shoppingCartItem.id}`, shoppingCartItem);
        const updatedShoppingCartItem = parseItem(response, 200);
        return updatedShoppingCartItem;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const deleteShoppingCartItem = async function(shoppingCartItem) {
     try {
        console.log('deleteShoppingCartItem');
        const response = await axios.delete(`${API}/shoppingCart/${shoppingCartItem.id}`);
        parseItem(response, 200);
        return shoppingCartItem.id;
    } catch (error) {
        console.error(error);
        return null;
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
  
  export const parseItem = (response, code) => {
    if (response.status !== code) throw Error(response.message);
    let item = response.data;
    if (typeof item !== 'object') {
      item = undefined;
    }
    return item;
  };
  
  export const dataService = {
      getCatFoods,
      getCatTowers,
      getCatToys,
      getCatLitters,
      getShoppingCartItems,
      addShoppingCartItem,
      updateShoppingCartItem,
      deleteShoppingCartItem
  };