export default class ShortCut {
  actionTags

  constructor(actionTags) {
    this.actionTags = actionTags
  }

  execute() {
    this.shortcutRegister(this.actionTags.firstAnchorNavigation, '1')
    this.shortcutRegister(this.actionTags.secondAnchorNavigation, '2')
    this.shortcutRegister(this.actionTags.thirdAnchorNavigation, '3')
    this.shortcutRegister(this.actionTags.fourthAnchorNavigation, '4')
    this.shortcutRegister(this.actionTags.fivethAnchorNavigation, '5')
    this.shortcutRegister(this.actionTags.sixthAnchorNavigation, '6')
    this.shortcutRegister(this.actionTags.seventhAnchorNavigation, '7')
  }

  shortcutRegister(action, key) {
    shortcut.add(key, () => {
      const href = action.href
      window.location.href = href

      if (key === '1') {
        const ref = document.querySelector('input')
        ref.focus()
      }


    }, { 'disable_in_input': true, })
  }
}