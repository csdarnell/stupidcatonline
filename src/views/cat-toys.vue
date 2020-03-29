<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Toys</h2>
                    <button class="button refresh-button" @click="LoadCatToys()">
                        <i class="fas fa-sync"></i>Refresh
                    </button>
                    <ul>
                        <li v-for="toy in catToys" :key="toy.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div :key="toy.name" class="name">
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
        <Modal
            :message="modalMessage"
            :isOpen="showModal"
            @handleNo="closeModal"
            @handleYes="deleteCatToy"
        >
        </Modal>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from '@/components/modal';

export default {
    name: 'CatToysView',
    data() {
        return {
            catToyToDelete: null,
            message: '',
            showModal: false
        };
    },
    components: {
        Modal
    },
    async created() {
        console.log('created():  starting');
        await this.loadCatToys();
    },
    methods: {
        ...mapActions(['getCatToysAction', 'deleteCatToyAction']),
        askToDelete(catToy) {
            this.catToyToDelete = catToy;
            this.showModal = true;
        },
        closeModal() {
            console.log('closeModal():  starting');
            this.showModal = false;
        },
        async deleteCatToy() {
            this.closeModal();
            if (this.catToyToDelete) {
                await this.deleteCatToy(this.catToyToDelete);
            }
            await this.loadCatToys();
        },
        async loadCatToys() {
            console.log('loadCatToys():  starting');
            this.message = 'getting the cat Toys, please be patient';
            await this.getCatToysAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catToys']),
        modalMessage() {
            console.log('modalMessage():  starting');
            const name = 'No Name Provided';
            return `Would you like to delete ${name} ?`;
        },
    },
};
</script>