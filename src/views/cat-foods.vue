<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Food</h2>
                    <ul>
                        <li v-for="food in catFoods" :key="food.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <router-link
                                            tag="button"
                                            class="link card-footer-item"
                                            :to="{ name: 'cat-food-detail', params: {id: food.id } }"
                                        >
                                            <div :key="food.name" class="name">
                                            <img class="card-image" v-bind:src="food.image" v-bind:alt="food.productName">
                                                {{ food.manufacturer}} 
                                                <br/>
                                                {{ food.productName}}
                                                <br/>
                                                Price(each): ${{ food.pricePerUnit }}
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <footer>
                                    <router-link
                                        tag="button"
                                        class="link card-footer-item"
                                        :to="{ name: 'cat-food-detail', params: {id: food.id } }"
                                    >
                                        <i class="fas fa-check"></i>
                                        <span>View Details</span>
                                    </router-link>
                                </footer>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="notification is-info" v-show="message">{{ message }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'CatFoodsView',
    data() {
        return {
            message: '',
        };
    },
    async created() {
        console.log('created():  starting');
        await this.loadCatFoods();
    },
    methods: {
        ...mapActions(['getCatFoodsAction']),
        async loadCatFoods() {
            console.log('loadCatFoods():  starting');
            this.message = 'getting the cat foods, please be patient';
            await this.getCatFoodsAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catFoods']),
    },
};
</script>