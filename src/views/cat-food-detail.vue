<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">Cat Food - Detail</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ catFood.fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="manufacturer">Manufacturer</label>
              <input class="input" name="manufacturer" v-model="catFood.manufacturer" readonly="true" />
            </div>
            <div class="field">
              <label class="label" for="productName">Product Name</label>
              <input class="input" name="productName" v-model="catFood.productName"  readonly="true" />
            </div>
            <div>
                <img class="image" v-bind:src="catFood.image" v-bind:alt="catFood.productName">
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

export default {
  name: 'CatFoodDetailView',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      catFood: {},
    };
  },
  created() {
    console.log('cat-food-detail.created(): ');
    console.log(this.id);
    this.catFood = { ...this.getCatFoodById(this.id) };
  },
  computed: {
    ...mapGetters(['getCatFoodById']),
  },
  methods: {
    ...mapActions(['addToCart']),
    returnToList() {
      this.$router.push({ name: 'cat-foods' });
    },
    async addToCart() {
        await this.addToCart(this.CatFood);
    },
  },
};
</script>
