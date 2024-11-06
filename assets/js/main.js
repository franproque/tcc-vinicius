import FontSize from './controllers/font-size.js'
import ActionTags from './utils/tags.js'

window.addEventListener('DOMContentLoaded', function () {
  /* const toggleButton = document.getElementById('toggle-button');

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  }); */
  const localStorageFont = localStorage.getItem('font-size')

  const fontSize = new FontSize(localStorageFont)
  const actionTags = new ActionTags()

  fontSize.execute()

  actionTags.increaseFontSizeTag.addEventListener('click', function () {
    fontSize.increaseFontSize()
  })
  actionTags.decrementFontSizeTag.addEventListener('click', function () {
    fontSize.increaseFontSize()
  })
})

