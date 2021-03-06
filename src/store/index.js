import Vue from 'vue'
import Vuex from 'vuex'

import { dataService } from '../shared';
import {
    GET_CATFOODS,
    GET_CATTOWERS,
    GET_CATTOYS,
    GET_CATLITTERS,
    GET_SHOPPINGCARTITEMS,
    ADD_SHOPPINGCARTITEM,
    UPDATE_SHOPPINGCARTITEM,
    DELETE_SHOPPINGCARTITEM,
    // EMPTY_SHOPPINGCART,
    // GET_SHIPPINGDETAILS,
    // UPDATE_SHIPPINGDETAILS,
} from './mutation-types';

Vue.use(Vuex)

const state = () => ({
    catFoods: [],
    catTowers: [],
    catToys: [],
    catLitters: [],
    shippingDetails: {},
    shoppingCartItems: [],
})

const mutations = {
    [GET_CATFOODS](state, catFoods) {
        state.catFoods = catFoods;
    },
    [GET_CATTOWERS](state, catTowers) {
        state.catTowers = catTowers;
    },
    [GET_CATTOYS](state, catToys) {
        state.catToys = catToys;
    },
    [GET_CATLITTERS](state, catLitters) {
        state.catLitters = catLitters;
    },
    // [GET_SHIPPINGDETAILS](state, shippingDetails) {
    //     state.shippingDetails = shippingDetails;
    // },
    [GET_SHOPPINGCARTITEMS](state, shoppingCartItems) {
        state.shoppingCartItems = shoppingCartItems;
    },
    [ADD_SHOPPINGCARTITEM](state, shoppingCartItem) {
        state.shoppingCartItems.unshift(shoppingCartItem);
    },
    [UPDATE_SHOPPINGCARTITEM](state, shoppingCartItem) {
        const index = state.shoppingCartItems.findIndex(h => h.id === shoppingCartItem.id);
        state.shoppingCartItems.splice(index, 1, shoppingCartItem);
        state.shoppingCartItems == [...state.shoppingCartItems];
    },
    [DELETE_SHOPPINGCARTITEM](state, shoppingCartItemId) {
        state.shoppingCartItems = [...state.shoppingCartItems.filter(p => p.id !== shoppingCartItemId)];
    },
    // [UPDATE_SHIPPINGDETAILS](state, shippingDetails) {
    //     state.shippingDetails = shippingDetails;
    //     state.shippingDetails == shippingDetails;
    // }
    // [EMPTY_SHOPPINGCART](state) {
    //     state.shoppingCartItems = [];
    // }
};

const actions = {
    async getCatFoodsAction({ commit }) {
        const catFoods = await dataService.getCatFoods();
        commit(GET_CATFOODS, catFoods);
    },
    async getCatTowersAction({ commit }) {
        const catTowers = await dataService.getCatTowers();
        commit(GET_CATTOWERS, catTowers);
    },
    async getCatToysAction({ commit }) {
        const catToys = await dataService.getCatToys();
        commit(GET_CATTOYS, catToys);
    },
    async getCatLittersAction({ commit }) {
        const catLitters = await dataService.getCatLitters();
        commit(GET_CATLITTERS, catLitters);
    },
    async getShoppingCartItemsAction({ commit }) {
        const shoppingCartItems = await dataService.getShoppingCartItems();
        commit(GET_SHOPPINGCARTITEMS, shoppingCartItems);
    },
    async addShoppingCartItemAction({ commit }, shoppingCartItem) {
        const addedShoppingCartItem = await dataService.addShoppingCartItem(shoppingCartItem);
        commit(ADD_SHOPPINGCARTITEM, addedShoppingCartItem);
    },
    async updateShoppingCartItemAction({ commit }, shoppingCartItem) {
        const addedShoppingCartItem = await dataService.updateShoppingCartItem(shoppingCartItem);
        commit(ADD_SHOPPINGCARTITEM, addedShoppingCartItem);
    },
    async deleteShoppingCartItemAction({ commit }, shoppingCartItem) {
        const deletedShoppingCartItem = await dataService.deleteShoppingCartItem(shoppingCartItem);
        commit(DELETE_SHOPPINGCARTITEM, deletedShoppingCartItem);
    },
    async emptyShoppingCartAction() {
        console.log('emptyShoppingCartAction()');

        const shoppingCartItems = await dataService.getShoppingCartItems();
        if (shoppingCartItems) {
            for (var i = 0, len = shoppingCartItems.length; i < len; i++) {
                await dataService.deleteShoppingCartItem(shoppingCartItems[i]);
            }
        }
    }

};

const getters = {
    getCatFoodById: state => id => state.catFoods.find(h => h.id === id),
    getCatTowerById: state => id => state.catTowers.find(h => h.id === id),
    getCatToyById: state => id => state.catToys.find(h => h.id === id),
    getCatLitterById: state => id => state.catLitters.find(h => h.id === id),
    getShoppingCartItemById: state => id => state.shoppingCartItems.find(h => h.id === id),
    getShoppingCartItemByItemId: state => id => state.shoppingCartItems.find(h => h.item.id === id),
};


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
