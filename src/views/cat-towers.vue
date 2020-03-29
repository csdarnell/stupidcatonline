<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Towers</h2>
                    <ul>
                        <li v-for="tower in catTowers" :key="tower.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div :key="tower.name" class="name">
                                          <img class="card-image" v-bind:src="tower.image" v-bind:alt="tower.productName">
                                            {{ tower.manufacturer}} {{ tower.productName}}
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <router-link
                                        tag="button"
                                        class="link card-footer-item"
                                        :to="{ name: 'cat-tower-detail', params: {id: tower.id } }"
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
    name: 'CatTowersView',
    data() {
        return {
            message: '',
        };
    },
    async created() {
        console.log('created():  starting');
        await this.loadCatTowers();
    },
    methods: {
        ...mapActions(['getCatTowersAction']),
        async loadCatTowers() {
            console.log('loadCatTowers():  starting');
            this.message = 'getting the cat Towers, please be patient';
            await this.getCatTowersAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catTowers']),
    },
};
</script>