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
                </div>
                <div class="notification is-info" v-show="message">{{ message }}</div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-8">
                <div class="section content-title-group">
                    <div class="card">
                        <header class="card-header">
                        <p class="card-header-title">Shipping Details</p>
                        </header>
                        <div class="card-content">
                            <div class="field">
                                <label class="label" for="firstName">First Name</label>
                                <input class="input" name="firstName" v-model="shippingDetails.customerNameFirst" required />
                            </div>
                            <div class="field">
                                <label class="label" for="lastName">Last Name</label>
                                <input class="input" name="lastName" v-model="shippingDetails.customerNameLast" required />
                            </div>
                            <div class="field">
                                <label class="label" for="addressStreet">Street Address</label>
                                <input class="input" name="addressStreet" v-model="shippingDetails.customerAddressStreet" required />
                            </div>
                            <div class="field">
                                <label class="label" for="addressCity">City</label>
                                <input class="input" name="addressCity" v-model="shippingDetails.customerAddressCity" required />
                            </div>
                            <div class="field">
                                <label class="label" for="addressState">State</label>
                                <input class="input" name="addressState" v-model="shippingDetails.customerAddressState" required />
                            </div>
                            <div class="field">
                                <label class="label" for="addressZip">Zip</label>
                                <input class="input" name="addressZip" v-model="shippingDetails.customerAddressZipCode" required />
                            </div>
                            <div class="field">
                                <label class="label" for="phone">Phone Number</label>
                                <input class="input" name="phone" v-model="shippingDetails.customerPhoneNumber" />
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                    <button
                        class="link card-footer-item cancel-button"
                        @click="cancelOrder()"
                    >
                        <i class="fas fa-undo"></i>
                        <span>Cancel Order</span>
                    </button>
                    <button class="link card-footer-item" @click="shipOrder()">
                        <i class="fas fa-save"></i>
                        <span>Ship Order</span>
                    </button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'ShoppingCartOrderView',
    data() {
        return {
            shippingDetails: {
                customerNameFirst: '',
                customerNameLast: '',
                customerAddressStreet: '',
                customerAddressCity: '',
                customerAddressState: '',
                customerAddressZipCode: '',
                customerPhoneNumber: '',
            },
            message: '',
            shoppingCartTotalItems: 0,
            shoppingCartTotalCost: 0,
        };
    },
    async created() {
        console.log('created():  starting');
        await this.loadShoppingCartItems();
    },
    methods: {
        ...mapActions(['getShoppingCartItemsAction']),
        cancelOrder() {
            this.$router.push({ name: 'home' });
        },
        async shipOrder() {
            if ((this.shippingDetails.customerNameFirst) &&
                (this.shippingDetails.customerNameLast) &&
                (this.shippingDetails.customerAddressStreet) &&
                (this.shippingDetails.customerAddressCity) &&
                (this.shippingDetails.customerAddressState) &&
                (this.shippingDetails.customerAddressZipCode)) {

                this.$router.push({ name: 'shopping-cart-confirmation' });

            }
            else {
                this.message = 'Not all required fields have been provided';
            }

        },
        async loadShoppingCartItems() {
            console.log('loadShoppingCartItems():  starting');
            this.message = 'getting the shopping cart items, please be patient';
            await this.getShoppingCartItemsAction();
            this.message = '';
            await this.updateShoppingCartTotals();
        },
        async updateShoppingCartTotals() {
            console.log('updateShoppingCartTotals()');
            this.shoppingCartTotalItems = 0;
            this.shoppingCartTotalCost = 0;
            for (var i = 0, len = this.shoppingCartItems.length; i < len; i++) {
                this.shoppingCartTotalItems = this.shoppingCartTotalItems + this.shoppingCartItems[i].quantity;
                this.shoppingCartTotalCost = this.shoppingCartTotalCost + (this.shoppingCartItems[i].quantity * this.shoppingCartItems[i].item.pricePerUnit);
            }
        }
    },
    computed: {
        ...mapState(['shoppingCartItems']),
    },
};
</script>