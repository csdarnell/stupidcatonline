<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Litters</h2>
                    <ul>
                        <li v-for="litter in catLitters" :key="litter.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div :key="litter.name" class="name">
                                          <img class="card-image" v-bind:src="litter.image" v-bind:alt="litter.productName">
                                            {{ litter.manufacturer}} {{ litter.productName}}
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <router-link
                                        tag="button"
                                        class="link card-footer-item"
                                        :to="{ name: 'cat-litter-detail', params: {id: litter.id } }"
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
    name: 'CatLittersView',
    data() {
        return {
            message: '',
        };
    },
    async created() {
        console.log('created():  starting');
        await this.loadCatLitters();
    },
    methods: {
        ...mapActions(['getCatLittersAction']),
        async loadCatLitters() {
            console.log('loadCatLitters():  starting');
            this.message = 'getting the cat Litters, please be patient';
            await this.getCatLittersAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catLitters']),
    },
};
</script>