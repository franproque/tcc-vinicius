import { normalizePrice } from '../utils/helpers.js'


export default class Cart {
  actionTags
  total
  products
  cart
  instanceProducts

  constructor(actionTags, products, cart, instanceProducts) {
    this.actionTags = actionTags
    this.total = 0
    this.products = products ? products : []
    this.cart = cart ?? []
    this.instanceProducts = instanceProducts
  }

  execute() {
    const addToCartButtons = Array.from(document.querySelectorAll('.add-to-cart'))
    const path = window.location.pathname

    let value = this.getTotal(this.cart) ?? 0;
    this.actionTags.containerCart.textContent = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
      value
    )

    addToCartButtons.map(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.closest('article').getAttribute('data-id')

        if (path.includes('carrinho')) {
          const thisCart = this.removeToCart(this.products.find(el => el.id == productId).id)

          const paginateCart = Array.from(
            { length: Math.ceil(thisCart.length / 6) },
            (v, i) => thisCart.slice(i * 6, i * 6 + 6))

          this.instanceProducts.products = paginateCart

          this.instanceProducts.render()

          this.instanceProducts.pagination()

          this.execute()
        } else {
          this.addToCart(this.products.find(el => el.id == productId))
        }

        value = this.getTotal(this.cart) ?? 0
        this.actionTags.containerCart.textContent = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
          value
        )
      })
    })



  }

  getTotal(cart) {
    return cart.reduce((acc, cur) => {
      return acc + normalizePrice(cur.price) * cur.quantity
    }, 0)
  }

  buyCart() {

  }

  addToCart(item) {
    const hasExistingItem = this.cart.find(product => product.id === item.id)
    if (hasExistingItem) {
      hasExistingItem.quantity = hasExistingItem.quantity + 1
    } else {
      const product = { ...item, quantity: 1 }
      this.cart.push(product)
    }

    localStorage.setItem('tcc-products-cart', JSON.stringify(this.cart))

    return this.cart
  }

  removeToCart(id) {
    this.cart = this.cart.filter((element) => element.id !== id)
    localStorage.setItem('tcc-products-cart', JSON.stringify(this.cart))

    return this.cart
  }

  emptyCart() {
    this.cart = []
    localStorage.setItem('tcc-products-cart', JSON.stringify(this.cart))

    return this.cart
  }
}