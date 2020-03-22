<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Food</h2>
                    <button class="button refresh-button" @click="LoadCatFood()">
                        <i class="fas fa-sync"></i>
                    </button>
                    <ul>
                        <li v-for="food in catFood" :key="food.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div :key="food.name" class="name">
                                            {{ food.manufacturer}} {{ food.productName}}
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <router-link
                                        tag="button"
                                        class="link card-footer-item"
                                        :to="{ name: 'cat-food-detail', params: {id: food.id } }"
                                    >
                                        <i class="fas fa-check"></i>
                                        <span>Select</span>
                                    </router-link>
                                </footer>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="notification is-info" v-show="message">{{ message }}</div>
            </div>
        </div>
        <Modal
            :message="modalMessage"
            :isOpen="showModal"
            @handleNo="closeModal"
            @handleYes="closeModal"
        >
        </Modal>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from '@/components/modal';

export default {
    name: 'CatFood',
    data() {
        return {
            message: '',
            showModal: false
        };
    },
    components: {
        Modal
    },
    async created() {
        await this.loadCatFood();
    },
    methods: {
        ...mapActions(['getCatFoodAction']),
        closeModal() {
            this.showModal = false;
        },
        async loadCatFood() {
            this.message = 'getting the cat food, please be patient';
            await this.getCatFoodAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catFood'])
    }
}
</script>