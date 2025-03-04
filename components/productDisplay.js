vueApp.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: 
    /*html*/
    ` <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <a :href="productLink">
              <img v-bind:src="image" alt="Descrizione del prodotto">
            </a>            
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ productDescription }}</p>
            <h3 v-if="inventory > 10">In Stock</h3>
            <h3 v-else-if="inventory <= 10 && inventory > 0">Almost sold Out</h3>
            <h3 v-else>Out of Stock</h3>

            <p>Shipping: {{ shipment }}</p>
            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{ backgroundColor: variant.color }">
            </div>
            <button 
              class="button" 
              :class="{ disabledButton: !inStock }"
              :disabled="!inStock"
              v-on:click="updateCart(true)">
              Add to Cart
            </button>
            <!-- <br>
            <button 
              class="button" 
              v-on:click="updateCart(false)">
              Rmv to Cart
            </button> -->
          </div>
        </div>
      </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            inStock: true,
            productLink: 'https://www.amazon.it/Dedoles-Buonumore-Calzini-Lunghi-Divertenti/dp/B07P2LML66/ref=sr_1_1?dib=eyJ2IjoiMSJ9.mHnwr0LplIaTLsD5zhpi2zsKbYWSYuvdrsrXV5IYzhk0EafiECwDibzbWLxwrlacRQOSEvOf467rhPdH8sIZ9ATkeiDEiQnmmOazXM0OHj1zY1itOz1RF3B_P5CQ_rQljV4QZ9rrohC3jDSc4onFgzCdwiouWCfySOpb_XWBoCdVb0DtLI1PFc0hbOvOSnxJSkMJAM1f1F6bDQFnMpXN7yWifLqTDE2c9UsxnWW9aAQMp58SH5Z9Y_nWCrN9-emWMCwVNdoAK6xz30R5Z7aEIGJuvUMk9ifR92uLYjDFMnHzS3lo3JLqCCve8yqtcWQ9FyrIXCJw2zEAqtFTeJS9Hdd1LQ6n0MhkTF0dVKNf7QGX91Hyem47IPOd01M2156ZyZRsHy-XL_i81IwVDPysUburOrIEnvmO0afLidW8kAgU6_J0f8Xf76cV7ehhBfZW.VsFmvcf1C1bC3mzYFFPjJX6KC4cThEh2wvku4Y3kfmM&dib_tag=se&qid=1741091006&refinements=p_n_size_two_browse-vebin%3A14223348031&s=apparel&sr=1-1',
            selectedVariant: 0,
            details: ['50% Cotton', '30% Wool', '20% Polyester'],
            variants: [
                { id: 1234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 1235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 8 }
            ]
        }
    },
    computed: {
        productDescription() {
            return `Description of ${this.product}`;
        },

        image() {
            return this.variants[this.selectedVariant].image;
        },

        inventory() {
            return this.variants[this.selectedVariant].quantity;
        },

        checkIfInstock() {
            if (this.inventory > 0)
                return this.inStock = true;
            else
                return this.inStock = false;
        },

        title() {
            return `${this.brand} ${this.product}`;
        },
        
        shipment() {
          if(this.premium) {
            return 'Free'
          }
          return 2.99
        }
    },
    methods: {
        updateCart(addOrRemove) {
            this.checkIfInstock;
            if (addOrRemove) {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
                if (this.inStock)
                    this.inventory -= 1
            }
            else {
                this.cart -= 1;
                if (this.cart > 0)
                    this.inventory += 1
            }
        },
        updateVariant(index) {
            this.selectedVariant = index;
        }
    }
})