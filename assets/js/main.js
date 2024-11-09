import FontSize from './controllers/font-size.js'
import Contrast from './controllers/contrast.js';
import ActionTags from './utils/tags.js'
import Voice from './controllers/voice.js';
import ShortCut from './controllers/shortcut.js';
import spoken from '../../node_modules/spoken/build/spoken.js';
import Categories from './controllers/categories.js';
import Products from './controllers/products.js';
import listProducts from '../json/cards.json' with { type: "json" };
import Cart from './controllers/cart.js';
import { observer } from './entities/Observable.js';
import Observer from './entities/Observer.js';

window.addEventListener('DOMContentLoaded', function () {
  // Constants
  const localStorageFont = localStorage.getItem('font-size')
  const localStorageCart = localStorage.getItem('tcc-products-cart')
  const parseJSONCart = JSON.parse(localStorageCart)

  const path = window.location.pathname

  // Classes Instances
  const searchParams = new URLSearchParams(window.location.search)
  const actionTags = new ActionTags()
  const fontSize = new FontSize(localStorageFont, actionTags)
  const contrast = new Contrast()
  const voice = new Voice(actionTags, spoken)
  const shortcut = new ShortCut(actionTags)
  const categories = new Categories(searchParams, actionTags)
  const products = new Products(path.includes('carrinho') ? parseJSONCart : listProducts.cards, actionTags)
  const cart = new Cart(actionTags, listProducts.cards, parseJSONCart, products)

  fontSize.execute()
  contrast.execute()
  shortcut.execute()
  voice.execute()
  categories.execute()
  products.execute()
  cart.execute()

  observer.register(new Observer('refreshCart', () => {
    cart.execute()
  }))
})

