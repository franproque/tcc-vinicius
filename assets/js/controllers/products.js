import { observer } from '../entities/Observable.js'
import { formatPagination, normalizePrice } from '../utils/helpers.js'

export default class Products {
  products
  actionTags
  pages
  paged

  constructor(products, actionTags) {
    this.products = formatPagination(products)
    this.actionTags = actionTags
    this.pages = this.products.length ?? 0
    this.paged = 0
  }

  execute() {
    this.render()
    this.pagination()
    this.search()
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
    buttonPagination.ariaLabel = 'Página' + (index + 1)

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
    cardNote.ariaLabel = 'Nota' + product.note.toFixed(1)

    cardContainerCatagoryAndNote.append(cardCategory, cardNote)
    cardContainerCatagoryAndNote.classList.add('card__category-and-note')

    cardCurrentPrice.textContent = product.price
    cardCurrentPrice.ariaLabel = 'Preço Atual ' + product.price
    cardPrice.textContent = product.original_price
    cardPrice.ariaLabel = 'Preço Original ' + product.original_price

    cardPriceAndCurrentPrice.append(cardCurrentPrice, cardPrice)

    cardPromotion.textContent = (((normalizePrice(product.original_price) - normalizePrice(product.price)) / normalizePrice(product.original_price)) * 100).toFixed(0) + '% OFF'
    cardPromotion.ariaLabel = "Desconto de " + (((normalizePrice(product.original_price) - normalizePrice(product.price)) / normalizePrice(product.original_price)) * 100).toFixed(0) + 'porcento'

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
    card.title = product.title

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
    const path = window.location.pathname

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

      heading.textContent = path.includes('carrinho') ? 'Carrinho Vazio' : 'Sem resultados'

      this.actionTags.containerProducts.appendChild(heading)
    }

    this.pages = products.length
  }

  search() {
    const originalProducts = this.products
    this.actionTags.formSearch.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const value = ev.target.querySelector('input').value

      if (value.length ?? 0 > 0) {
        const filteredProducts = originalProducts.flat(1).filter((product) => {
          return product.title.toLowerCase().includes(value.toLowerCase()) || product.description.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(value.toLowerCase()) || product.category.toLowerCase().includes(value.toLowerCase())
        })

        this.products = formatPagination(filteredProducts)
      } else {
        this.products = originalProducts
      }

      this.render()
      this.pagination()
    })
  }
}