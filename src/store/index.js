import Vue from 'vue'
import Vuex from 'vuex'

import { dataService } from '../shared';
import {
    GET_CATFOODS,
    GET_CATTOWERS,
    GET_CATTOYS,
    GET_CATLITTERS,
} from './mutation-types';

Vue.use(Vuex)

const state = () => ({
    catFoods: [],
    catTowers: [],
    catToys: [],
    catLitters: [],
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
