import Vue from 'vue';
import Vuex from 'vuex';

import { dataService } from '../shared';
import {
    GET_CATFOOD
} from './mutation-types';

Vue.use(Vuex);

const state = () => ({
    catfood: []
});

const mutations = {
    [GET_CATFOOD](state, catfood) {
        console.log('index.js:GET_GATFOOD()');
        state.catfood = catfood;
    }
};

const actions = {
    async getCatFoodAction({ commit }) {
        console.log('index:getCatFoodAction()');
        const catfood = await dataService.getCatFood();
        commit(GET_CATFOOD, catfood);
    }
};

const getters = {
    // parameterized getters are not cached.  so this is just a convenience to get the state.
    getCatFoodById: state => id => state.catfood.find(h => h.id === id)
};

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    mutations,
    actions,
    getters
});

