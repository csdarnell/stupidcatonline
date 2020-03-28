import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/page-not-found';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: () =>
            import(/* webpackChunkName: "bundle-home" */ './views/home.vue'),
        },
        {
            path: '/cat-foods',
            name: 'cat-foods',
            component: () =>
            import(/* webpackChunkName: "bundle-catFoods" */ './views/cat-foods.vue'),
        },
        {
            path: '/cat-food/:id',
            name: 'cat-food-detail',
            component: () =>
            import(/* webpackChunkName: "bundle-catFoods" */ './views/cat-food-detail.vue')
        },
        {
            path: '/cat-towers',
            name: 'cat-towers',
            component: () =>
            import(/* webpackChunkName: "bundle-catTowers" */ './views/cat-towers.vue'),
        },
        {
            path: '/cat-toys',
            name: 'cat-toys',
            component: () =>
            import(/* webpackChunkName: "bundle-catToys" */ './views/cat-toys.vue'),
        },
        {
            path: '/cat-litters',
            name: 'cat-litters',
            component: () =>
            import(/* webpackChunkName: "bundle-catlitters" */ './views/cat-litters.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
            import(/* webpackChunkName: "bundle-about" */ './views/about.vue'),
        },
        {
            path: '*',
            component: PageNotFound,
        }

    ]
})