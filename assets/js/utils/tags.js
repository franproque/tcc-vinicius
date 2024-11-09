
export default class ActionTags {

  constructor() {
    this.increaseFontSizeTag = document.querySelector('.button-font-increment')
    this.decrementFontSizeTag = document.querySelector('.button-font-decrement')
    this.searchMic = document.querySelector('.search-mic')
    this.searchImage = this.searchMic.querySelector('.image')
    this.searchSpeaking = this.searchMic.querySelector('.speaking')
    this.searchInput = document.getElementById('search')
    this.firstAnchorNavigation = document.querySelector('.header__navbar-items li:first-of-type > a')
    this.secondAnchorNavigation = document.querySelector('.header__navbar-items li:nth-of-type(2) > a')
    this.thirdAnchorNavigation = document.querySelector('.header__navbar-items li:nth-of-type(3) > a')
    this.fourthAnchorNavigation = document.querySelector('.header__navbar-items li:nth-of-type(4) > a')
    this.fivethAnchorNavigation = document.querySelector('.header__menu-items li:first-of-type > a')
    this.sixthAnchorNavigation = document.querySelector('.header__menu-items li:nth-of-type(2) > a')
    this.seventhAnchorNavigation = document.querySelector('.header__menu-items li:nth-of-type(3) > a')

    this.menuCategory = document.querySelectorAll('.s-category ul li')
    this.containerProducts = document.querySelector('.l-products__cards')
    this.containerPagination = document.querySelector('.l-products__pagination')

    this.containerCart = document.querySelector('.header__cart span')

  }
}