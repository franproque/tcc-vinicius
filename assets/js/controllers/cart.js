export default class Cart {
  actionTags
  total
  products

  constructor(actionTags, products) {
    this.actionTags = actionTags
    this.total = 0
    this.products = products ? products : []
  }

  execute() {

  }

  getTotal(){
    return this.products.length ?? 0
  }

  buyCart(){
    
  }

  addToCart(item) {
    this.products.push(item)
    return this.products
  }

  removeToCart(id) {
    this.products = this.products.filter((element) => element.id !== id)
    return this.products
  }

  emptyCart() {
    this.products = []
    return this.products
  }
}