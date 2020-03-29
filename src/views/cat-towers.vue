<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Towers</h2>
                    <button class="button refresh-button" @click="LoadCatTowers()">
                        <i class="fas fa-sync"></i>Refresh
                    </button>
                    <ul>
                        <li v-for="tower in catTowers" :key="tower.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div :key="tower.name" class="name">
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
        <Modal
            :message="modalMessage"
            :isOpen="showModal"
            @handleNo="closeModal"
            @handleYes="deleteCatTower"
        >
        </Modal>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from '@/components/modal';

export default {
    name: 'CatTowersView',
    data() {
        return {
            catTowerToDelete: null,
            message: '',
            showModal: false
        };
    },
    components: {
        Modal
    },
    async created() {
        console.log('created():  starting');
        await this.loadCatTowers();
    },
    methods: {
        ...mapActions(['getCatTowersAction', 'deleteCatTowerAction']),
        askToDelete(catTower) {
            this.catTowerToDelete = catTower;
            this.showModal = true;
        },
        closeModal() {
            console.log('closeModal():  starting');
            this.showModal = false;
        },
        async deleteCatTower() {
            this.closeModal();
            if (this.catTowerToDelete) {
                await this.deleteCatTower(this.catTowerToDelete);
            }
            await this.loadCatTowers();
        },
        async loadCatTowers() {
            console.log('loadCatTowers():  starting');
            this.message = 'getting the cat Towers, please be patient';
            await this.getCatTowersAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catTowers']),
        modalMessage() {
            console.log('modalMessage():  starting');
            const name = 'No Name Provided';
            return `Would you like to delete ${name} ?`;
        },
    },
};
</script>