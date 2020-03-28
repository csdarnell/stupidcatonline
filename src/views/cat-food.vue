<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Food</h2>
                    <button class="button refresh-button" @click="LoadCatFood()">
                        <i class="fas fa-sync"></i>Refresh
                    </button>
                    <ul>
                        <li v-for="food in catFood" :key="food.id">
                            <div class="card">
                                <!-- <div class="card-content">
                                    <div class="content">
                                        <div :key="food.name" class="name">
                                            {{ food.manufacturer}} {{ food.productName}}
                                        </div>
                                    </div>
                                </div> -->
                                <!-- <footer>
                                    <router-link
                                        tag="button"
                                        class="link card-footer-item"
                                        :to="{ name: 'cat-food-detail', params: {id: food.id } }"
                                    >
                                        <i class="fas fa-check"></i>
                                        <span>Select</span>
                                    </router-link>
                                </footer> -->
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
            @handleYes="deleteCatFood"
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
            catFoodToDelete: null,
            message: '',
            showModal: false
        };
    },
    components: {
        Modal
    },
    async created() {
        console.log('created():  starting');
        await this.loadCatFood();
    },
    methods: {
        ...mapActions(['getCatFoodAction', 'deleteCatFoodAction']),
        askToDelete(catFood) {
            this.catFoodToDelete = catFood;
            this.showModal = true;
        },
        closeModal() {
            console.log('closeModal():  starting');
            this.showModal = false;
        },
        async deleteCatFood() {
            this.closeModal();
            if (this.catFoodToDelete) {
                await this.deleteCatFood(this.catFoodToDelete);
            }
            await this.loadCatFood();
        },
        async loadCatFood() {
            console.log('loadCatFood():  starting');
            this.message = 'getting the cat food, please be patient';
            this.catFood = await this.getCatFoodAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catFood']),
        modalMessage() {
            console.log('modalMessage():  starting');
            const name = 'No Name Provided';
            return `Would you like to delete ${name} ?`;
        },
    },
};
</script>