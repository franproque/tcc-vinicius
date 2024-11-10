export default class Checkout {
  actionTags
  cart

  constructor(actionTags, cart) {
    this.actionTags = actionTags
    this.cart = cart
  }

  execute() {
    this.actionTags.sendCheckout.addEventListener('submit', (ev) => {
      ev.preventDefault();

      this.buy()

      document.querySelector('.close-modal').addEventListener('click', () => {
        this.destroyModal()
        document.location.href = '/index.html'
      })
    })
  }

  buy() {
    this.showModal()
    this.cart.emptyCart()
  }

  destroyModal() {
    const body = document.body

    if (body.querySelector('.checkout-modal')) {
      const modal = body.querySelector('.checkout-modal')
      modal.open = false
      body.removeChild(modal)
    }

    return body
  }

  showModal() {
    const body = this.destroyModal()

    const modal = this.mountModal()
    modal.open = true

    body.appendChild(modal)
  }

  mountModal() {
    const { containerModal, wrapperModal, titleModal, descriptionModal, buttonModal } = this.structureModal()

    titleModal.textContent = 'Obrigado!'

    const value = this.cart.getTotal() ?? 0
    descriptionModal.textContent = "Compra efetuada no valor de " + new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
      value
    )

    buttonModal.textContent = 'OK'
    buttonModal.classList.add('button')
    buttonModal.classList.add('close-modal')

    wrapperModal.append(titleModal, descriptionModal, buttonModal)
    wrapperModal.classList.add('checkout-modal__wrapper')

    containerModal.appendChild(wrapperModal)
    containerModal.classList.add('checkout-modal')

    return containerModal

  }

  structureModal() {
    const containerModal = document.createElement('dialog')

    const wrapperModal = document.createElement('article')

    const titleModal = document.createElement('h2')

    const descriptionModal = document.createElement('p')

    const buttonModal = document.createElement('button')

    return { containerModal, wrapperModal, titleModal, descriptionModal, buttonModal }
  }
}