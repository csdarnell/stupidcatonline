import Vue from 'vue'
import Vuex from 'vuex'

import { dataService } from '../shared';
import {
    GET_CATFOODS
} from './mutation-types';

Vue.use(Vuex)

const state = () => ({
    catFoods: [],
})

const mutations = {
    [GET_CATFOODS](state, catFoods) {
        state.catFoods = catFoods;
    },
};

const actions = {
    async getCatFoodsAction({ commit }) {
        const catFoods = await dataService.getCatFoods();
        commit(GET_CATFOODS, catFoods);
    }
};

const getters = {
    getCatFoodById: state => id => state.catFoods.find(h => h.id === id),
};


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
