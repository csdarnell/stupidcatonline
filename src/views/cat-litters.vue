<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Cat Litters</h2>
                    <button class="button refresh-button" @click="LoadCatLitters()">
                        <i class="fas fa-sync"></i>Refresh
                    </button>
                    <ul>
                        <li v-for="litter in catLitters" :key="litter.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div :key="litter.name" class="name">
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
        <Modal
            :message="modalMessage"
            :isOpen="showModal"
            @handleNo="closeModal"
            @handleYes="deleteCatLitter"
        >
        </Modal>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from '@/components/modal';

export default {
    name: 'CatLittersView',
    data() {
        return {
            catLitterToDelete: null,
            message: '',
            showModal: false
        };
    },
    components: {
        Modal
    },
    async created() {
        console.log('created():  starting');
        await this.loadCatLitters();
    },
    methods: {
        ...mapActions(['getCatLittersAction', 'deleteCatLitterAction']),
        askToDelete(catLitter) {
            this.catLitterToDelete = catLitter;
            this.showModal = true;
        },
        closeModal() {
            console.log('closeModal():  starting');
            this.showModal = false;
        },
        async deleteCatLitter() {
            this.closeModal();
            if (this.catLitterToDelete) {
                await this.deleteCatLitter(this.catLitterToDelete);
            }
            await this.loadCatLitters();
        },
        async loadCatLitters() {
            console.log('loadCatLitters():  starting');
            this.message = 'getting the cat Litters, please be patient';
            await this.getCatLittersAction();
            this.message = '';
        }
    },
    computed: {
        ...mapState(['catLitters']),
        modalMessage() {
            console.log('modalMessage():  starting');
            const name = 'No Name Provided';
            return `Would you like to delete ${name} ?`;
        },
    },
};
</script>