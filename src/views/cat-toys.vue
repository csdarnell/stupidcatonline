<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Toys</h2>
                    <ul>
                        <li v-for="toy in catToys" :key="toy.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div :key="toy.name" class="name">
                                          <img class="card-image" v-bind:src="toy.image" v-bind:alt="toy.productName">
                                            {{ toy.manufacturer}} {{ toy.productName}}
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <router-link
                                        tag="button"
                                        class="link card-footer-item"
                                        :to="{ name: 'cat-toy-detail', params: {id: toy.id } }"
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
    name: 'CatToysView',
    data() {
        return {
            message: '',
        };
    },
    async created() {
        console.log('created():  starting');
        await this.loadCatToys();
    },
    methods: {
        ...mapActions(['getCatToysAction']),
        async loadCatToys() {
            console.log('loadCatToys():  starting');
            this.message = 'getting the cat Toys, please be patient';
            await this.getCatToysAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catToys']),
    },
};
</script>