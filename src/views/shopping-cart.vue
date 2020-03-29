<template>
    <div class="content-container">
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <h2 class="title">Shopping Cart</h2>
                    <div class="card">
                        <div class="card-content">
                            Shopping Cart items: {{ this.shoppingCartTotalItems }}
                            <br/>
                            Shopping Cart Cost: {{ this.shoppingCartTotalCost }}
                        </div>
                    </div>
                    <ul>
                        <li v-for="cartItem in shoppingCartItems" :key="cartItem.id">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div :key="cartItem.id" class="name">
                                          <img class="card-image" v-bind:src="cartItem.item.image" v-bind:alt="cartItem.item.productName">
                                            <br/>
                                            Manufacturer: {{ cartItem.item.manufacturer }}
                                            Product: {{ cartItem.item.productName }}
                                            Quantity: {{ cartItem.quantity }}
                                            <br/>
                                            Price(each): ${{ cartItem.item.pricePerUnit }}
                                            <br/>
                                            Total Cost: ${{ cartItem.item.pricePerUnit * cartItem.quantity }}
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <button
                                        class="link card-footer-item"
                                        @click="askToDelete(cartItem)"
                                    >
                                        <i class="fas fa-trash"></i>
                                        <span>Remove</span>
                                    </button>
                                    <button
                                        class="link card-footer-item"
                                        @click="decreaseQuantity(cartItem)"
                                    >
                                        <i class="fas fa-check"></i>
                                        <span>Decrease Quantity</span>
                                    </button>
                                    <button
                                        class="link card-footer-item"
                                        @click="increaseQuantity(cartItem)"
                                    >
                                        <i class="fas fa-check"></i>
                                        <span>Increase Quantity</span>
                                    </button>
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
        @handleYes="deleteShoppingCartItem"
        >
        </Modal>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from '@/components/modal';

export default {
    name: 'ShoppingCartView',
    data() {
        return {
            shoppingCartItemToDelete: null,
            message: '',
            showModal: false,
            shoppingCartTotalItems: 0,
            shoppingCartTotalCost: 0,
        };
    },
    components: {
        Modal,
    },
    async created() {
        console.log('created():  starting');
        await this.loadShoppingCartItems();
    },
    methods: {
        ...mapActions(['getShoppingCartItemsAction','updateShoppingCartItemAction','deleteShoppingCartItemAction']),
        askToDelete(item) {
            this.shoppingCartItemToDelete = item;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async deleteShoppingCartItem() {
            this.closeModal();
            if (this.shoppingCartItemToDelete) {
                await this.deleteShoppingCartItemAction(this.shoppingCartItemToDelete);
            }
            await this.loadShoppingCartItems();
        },
        async decreaseQuantity(cartItem) {
            if (cartItem.quantity === 1){
                await this.askToDelete(cartItem);
            }
            else {
                cartItem.quantity -= 1;
                await this.updateShoppingCartItemAction(cartItem);
                await this.loadShoppingCartItems();
            }
        },
        async increaseQuantity(cartItem) {
            cartItem.quantity += 1;
            await this.updateShoppingCartItemAction(cartItem);
            await this.loadShoppingCartItems();
        },
        async loadShoppingCartItems() {
            console.log('loadShoppingCartItems():  starting');
            this.message = 'getting the shopping cart items, please be patient';
            await this.getShoppingCartItemsAction();
            this.message = '';
            this.shoppingCartTotalItems = this.shoppingCartItems.reduce((a,b) => (a.quantity + b.quantity), 0);
            this.shoppingCartTotalCost = this.shoppingCartItems.reduce((a,b) => (a.quantity * a.item.pricePerUnit) + (b.quantity * b.item.pricePerUnit), 0);
        }
    },
    computed: {
        ...mapState(['shoppingCartItems', 'shoppingCartTotalItems','shoppingCartTotalCost']),
        modalMessage() {
            const name =
                this.shoppingCartItemToDelete && this.shoppingCartItemToDelete.item
                ? this.shoppingCartItemToDelete.item.manufacturer + ' ' + this.shoppingCartItemToDelete.item.productName
                : '';
            return `Would you like to delete ${name} ?`;
        }
    },
};
</script>