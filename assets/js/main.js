import FontSize from './controllers/font-size.js'
import Contrast from './controllers/contrast.js';
import ActionTags from './utils/tags.js'
import Voice from './controllers/voice.js';
import ShortCut from './controllers/shortcut.js';
import spoken from '../../node_modules/spoken/build/spoken.js';

window.addEventListener('DOMContentLoaded', function () {
  // Constants
  const localStorageFont = localStorage.getItem('font-size')

  // Classes Instances
  const actionTags = new ActionTags()
  const fontSize = new FontSize(localStorageFont, actionTags)
  const contrast = new Contrast()
  const voice = new Voice(actionTags, spoken)
  const shortcut = new ShortCut(actionTags)

  fontSize.execute()
  contrast.execute()
  shortcut.execute()
  voice.execute()
})

