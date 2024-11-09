import { observer } from '../entities/Observable.js'
import { normalizePrice } from '../utils/helpers.js'

export default class Products {
  products
  actionTags
  pages
  paged

  constructor(products, actionTags) {
    this.products = Array.from(
      { length: Math.ceil(products.length / 6) },
      (v, i) => products.slice(i * 6, i * 6 + 6)
    )
    this.actionTags = actionTags
    this.pages = this.products.length ?? 0
    this.paged = 0
  }

  execute() {
    this.render()
    this.pagination()
  }

  pagination() {
    const data = this.renderPagination()

    Array.from(data.querySelectorAll('button')).forEach((btn, i, array) => {
      array[0].classList.add('active')

      btn.addEventListener('click', () => {
        array.forEach(element => {
          element.classList.remove('active')
        })

        btn.classList.add('active')
        this.render(i)
        observer.notify('refreshCart')
      })
    })
  }

  renderPagination() {
    this.actionTags.containerPagination.innerHTML = ""

    this.pages > 0 && Array(this.pages).fill(this.pages).forEach((page, index) => {
      const data = this.mountPagination(index)

      this.actionTags.containerPagination.append(data)
    })

    return this.actionTags.containerPagination
  }

  mountPagination(index) {
    const buttonPagination = document.createElement('button')

    buttonPagination.textContent = index + 1
    buttonPagination.type = 'button'

    return buttonPagination
  }

  mount(product) {
    const { card,
      cardContainerImage,
      cardImage,
      cardContainerCatagoryAndNote,
      cardCategory,
      cardNote,
      cardTitle,
      cardContainerPriceAndPromotion,
      cardPriceAndCurrentPrice,
      cardCurrentPrice,
      cardPrice,
      cardPromotion,
      cardContainerCart,
      cardContainerImageCart,
      cardImageCart,
      cardTextCart,
      cardDescription } = this.structure()

    const path = window.location.pathname

    cardImage.src = product.image
    cardImage.alt = product.title

    cardContainerImage.appendChild(cardImage)

    cardCategory.textContent = product.category
    cardNote.textContent = product.note.toFixed(1)

    cardContainerCatagoryAndNote.append(cardCategory, cardNote)
    cardContainerCatagoryAndNote.classList.add('card__category-and-note')

    cardCurrentPrice.textContent = product.price
    cardPrice.textContent = product.original_price

    cardPriceAndCurrentPrice.append(cardCurrentPrice, cardPrice)

    cardPromotion.textContent = (((normalizePrice(product.original_price) - normalizePrice(product.price)) / normalizePrice(product.original_price)) * 100).toFixed(0) + '% OFF'

    cardContainerPriceAndPromotion.append(cardPriceAndCurrentPrice, cardPromotion)
    cardContainerPriceAndPromotion.classList.add('card__price-and-promotion')

    cardImageCart.src = 'assets/svg/cart.svg'
    cardImageCart.alt = 'Carrinho'

    cardContainerImageCart.appendChild(cardImageCart)

    cardTextCart.textContent = path.includes('carrinho') ? 'Remover item' : 'Adicionar a cesta'

    cardContainerCart.append(cardContainerImageCart, cardTextCart)
    cardContainerCart.classList.add('cart')
    cardContainerCart.classList.add('add-to-cart')
    cardContainerCart.type = 'button'

    cardTitle.textContent = product.title
    cardDescription.textContent = product.description

    card.append(cardContainerImage, cardContainerCatagoryAndNote, cardTitle, cardContainerPriceAndPromotion, cardDescription, cardContainerCart)
    card.classList.add('card')
    card.setAttribute('data-id', product.id)

    return card
  }

  structure() {
    const card = document.createElement('article')

    const cardContainerImage = document.createElement('figure')
    const cardImage = document.createElement('img')

    const cardContainerCatagoryAndNote = document.createElement('div')
    const cardCategory = document.createElement('span')
    const cardNote = document.createElement('span')

    const cardTitle = document.createElement('h3')

    const cardContainerPriceAndPromotion = document.createElement('div')
    const cardPriceAndCurrentPrice = document.createElement('h4')
    const cardCurrentPrice = document.createElement('span')
    const cardPrice = document.createElement('span')
    const cardPromotion = document.createElement('span')

    const cardDescription = document.createElement('p')

    const cardContainerCart = document.createElement('button')
    const cardContainerImageCart = document.createElement('figure')
    const cardImageCart = document.createElement('img')
    const cardTextCart = document.createElement('span')

    return {
      card,
      cardContainerImage,
      cardImage,
      cardContainerCatagoryAndNote,
      cardCategory,
      cardNote,
      cardTitle,
      cardContainerPriceAndPromotion,
      cardPriceAndCurrentPrice,
      cardCurrentPrice,
      cardPrice,
      cardPromotion,
      cardDescription,
      cardContainerCart,
      cardContainerImageCart,
      cardImageCart,
      cardTextCart,
    }
  }

  render(paged = 0, products = this.products) {
    this.actionTags.containerProducts.innerHTML = ''

    products[paged]?.length ?? 0 > 0 ? products[paged].forEach((product, index) => {
      const node = this.mount(product)

      this.actionTags.containerProducts.append(node)

      anime({
        targets: node,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: index * 100,
        easing: 'easeOutExpo'
      });
    }) : []

    if (!products[paged]?.length ?? 0 > 0) {
      const heading = document.createElement('h2')

      heading.textContent = 'Carrinho Vazio'

      this.actionTags.containerProducts.appendChild(heading)
    }

    this.pages = products.length
  }
}