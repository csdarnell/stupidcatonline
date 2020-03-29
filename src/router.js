import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/page-not-found';

Vue.use(Router);

const parseProps = r => ({ id: parseInt(r.params.id) });

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
            path: '/cat-foods/:id',
            name: 'cat-food-detail',
            props: parseProps,
            component: () =>
            import(/* webpackChunkName: "bundle-catFoods" */ './views/cat-food-detail.vue'),
        },
        {
            path: '/cat-towers',
            name: 'cat-towers',
            component: () =>
            import(/* webpackChunkName: "bundle-catTowers" */ './views/cat-towers.vue'),
        },
        {
            path: '/cat-towers/:id',
            name: 'cat-tower-detail',
            props: parseProps,
            component: () =>
            import(/* webpackChunkName: "bundle-catTowers" */ './views/cat-tower-detail.vue'),
        },
        {
            path: '/cat-toys',
            name: 'cat-toys',
            component: () =>
            import(/* webpackChunkName: "bundle-catToys" */ './views/cat-toys.vue'),
        },
        {
            path: '/cat-toys/:id',
            name: 'cat-toy-detail',
            props: parseProps,
            component: () =>
            import(/* webpackChunkName: "bundle-catToys" */ './views/cat-toy-detail.vue'),
        },
        {
            path: '/cat-litters',
            name: 'cat-litters',
            component: () =>
            import(/* webpackChunkName: "bundle-catLitters" */ './views/cat-litters.vue'),
        },
        {
            path: '/cat-litters/:id',
            name: 'cat-litter-detail',
            props: parseProps,
            component: () =>
            import(/* webpackChunkName: "bundle-catLitters" */ './views/cat-litter-detail.vue'),
        },
        {
            path: '/shopping-cart',
            name: 'shopping-cart',
            component: () =>
            import(/* webpackChunkName: "bundle-shoppingCart" */ './views/shopping-cart.vue'),
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