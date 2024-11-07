

export default class FontSize {
  _defaultFontSize
  _html
  actionTags

  constructor(fontSize, actionTags) {

    this._defaultFontSize = fontSize ? Number(fontSize) : 62.5
    this._html = document.querySelector('html')
    this.actionTags = actionTags
  }
  increaseFontSize() {

    this._defaultFontSize += 5

    localStorage.setItem('font-size', JSON.stringify(this._defaultFontSize))

    this._html.style.fontSize = `${this._defaultFontSize}%`
  }

  decrementFontSize() {

    this._defaultFontSize -= 5

    localStorage.setItem('font-size', JSON.stringify(this._defaultFontSize))

    this._html.style.fontSize = `${this._defaultFontSize}%`
  }

  execute() {
    this._html.style.fontSize = `${this._defaultFontSize}%`

    this.actionTags.increaseFontSizeTag.addEventListener('click', () => {
      this.increaseFontSize()
    })
    this.actionTags.decrementFontSizeTag.addEventListener('click', () => {
      this.decrementFontSize()
    })
  }
}





