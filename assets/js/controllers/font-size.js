

export default class FontSize {
  _defaultFontSize
  _html

  constructor(fontSize) {

    this._defaultFontSize = fontSize ? Number(fontSize) : 62.5
    this._html = document.querySelector('html')
  }

  execute() {
    this._html.style.fontSize = `${this._defaultFontSize}%`
  }

  increaseFontSize() {

    this._defaultFontSize += 5

    localStorage.setItem('font-size', JSON.stringify(this._defaultFontSize))

    this._html.style.fontSize = `${this._defaultFontSize}%`


  }
}





