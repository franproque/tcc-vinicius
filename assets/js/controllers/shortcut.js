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

      if (key === '7' || key === '6') {
        const id = href.slice(href.indexOf("#", 0) + 1)
        const section = document.getElementById(id)
        const header = document.querySelector('.header')

        if (section && header) {
          const sectionRect = section.getBoundingClientRect()
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop
          const targetY =
            sectionRect.top +
            scrollTop -
            (header?.clientHeight - 95)

          window.scrollTo({
            behavior: 'smooth',
            top: targetY,
          })
        }

      }


    }, { 'disable_in_input': true, })
  }
}