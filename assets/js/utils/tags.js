
export default class ActionTags {
  increaseFontSizeTag
  decrementFontSizeTag

  constructor() {
    this.increaseFontSizeTag = document.querySelector('.button-font-increment')
    this.decrementFontSizeTag = document.querySelector('.button-font-decrement')
  }
}