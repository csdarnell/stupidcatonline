<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">Cat Litter - Detail</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ catLitter.fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
                Manufacturer: {{ catLitter.manufacturer }}
            </div>
            <div class="field">
                Product: {{ catLitter.productName }}
            </div>
            <div class="field">
                Price(each): ${{ catLitter.pricePerUnit }}
            </div>
            <div class="field">
                <img class="image" v-bind:src="catLitter.image" v-bind:alt="catLitter.productName">
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button
            class="link card-footer-item cancel-button"
            @click="returnToList()"
          >
            <i class="fas fa-undo"></i>
            <span>Return</span>
          </button>
          <button class="link card-footer-item" @click="addToCart()">
            <i class="fas fa-save"></i>
            <span>Add To Shopping Cart</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

function S4() {
    // http://guid.us/GUID/JavaScript
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

function newGuid() {
    // http://guid.us/GUID/JavaScript
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}


export default {
  name: 'CatLitterDetailView',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      catLitter: {},
    };
  },
  created() {
    console.log('cat-litter-detail.created(): ');
    console.log(this.id);
    this.catLitter = { ...this.getCatLitterById(this.id) };
  },
  computed: {
    ...mapGetters(['getCatLitterById', 'getShoppingCartItemById', 'getShoppingCartItemByItemId']),
  },
  methods: {
    ...mapActions(['addShoppingCartItemAction', 'updateShoppingCartItemAction']),
    returnToList() {
      this.$router.push({ name: 'cat-litters' });
    },
    async addToCart() {

        var existingShoppingCartItem;
        try {
            existingShoppingCartItem = this.getShoppingCartItemByItemId(this.id);
        } catch (error) {
            console.log('An exception occured while getting a shopping cart item by internal item id:');
            console.log(error);
        }

        if (existingShoppingCartItem)
        {
            existingShoppingCartItem.quantity += 1;
            await this.updateShoppingCartItemAction(existingShoppingCartItem);
        }
        else {
            const newShoppingCartItem = {
                id: newGuid(),
                item: this.catLitter,
                quantity: 1,
            }
            await this.addShoppingCartItemAction(newShoppingCartItem);
        }

        this.$router.push({ name: 'cat-litters' });
    },
  },
};
</script>
