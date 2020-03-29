import Vue from 'vue'
import Vuex from 'vuex'

import { dataService } from '../shared';
import {
    GET_CATFOODS,
    GET_CATTOWERS,
    GET_CATTOYS,
    GET_CATLITTERS,
    ADD_SHOPPINGCARTITEM,
    UPDATE_SHOPPINGCARTITEM,
    DELETE_SHOPPINGCARTITEM,
} from './mutation-types';

Vue.use(Vuex)

const state = () => ({
    catFoods: [],
    catTowers: [],
    catToys: [],
    catLitters: [],
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
    }
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
    async addShoppingCartItemAction({ commit }) { //, shoppingCartItem) {
        const addedShoppingCartItem = await dataService.addShoppingCartItem(); //shoppingCartItem);
        commit(ADD_SHOPPINGCARTITEM, addedShoppingCartItem);
    },
    async updateShoppingCartItemAction({ commit }) { //, shoppingCartItem) {
        const addedShoppingCartItem = await dataService.updateShoppingCartItem(); //shoppingCartItem);
        commit(ADD_SHOPPINGCARTITEM, addedShoppingCartItem);
    },
    async deleteShoppingCartItemAction({ commit }) { //, shoppingCartItem) {
        const deletedShoppingCartItem = await dataService.deleteShoppingCartItem(); //shoppingCartItem);
        commit(DELETE_SHOPPINGCARTITEM, deletedShoppingCartItem);
    }

};

const getters = {
    getCatFoodById: state => id => state.catFoods.find(h => h.id === id),
    getCatTowerById: state => id => state.catTowers.find(h => h.id === id),
    getCatToyById: state => id => state.catToys.find(h => h.id === id),
    getCatLitterById: state => id => state.catLitters.find(h => h.id === id),
};


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
