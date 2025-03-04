const vueApp = Vue.createApp({
    data() {
        return {
            product: 'Socks'
        }
    },
    computed: {
        productDescription() {
            return `Description of ${this.product}`;
        }
    }
})
