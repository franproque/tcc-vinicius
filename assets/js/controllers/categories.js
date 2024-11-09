export default class Categories {
  searchParams
  actionTags

  constructor(searchParams, actionTags) {
    this.searchParams = searchParams
    this.actionTags = actionTags
  }

  execute() {
    const menuTitles = Array.from(this.actionTags.menuCategory).map(node => node.children[0].children[1].textContent)
    const menuButtons = Array.from(this.actionTags.menuCategory).map(node => node.children[0])

    menuButtons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        menuButtons.forEach(element => {
          element.classList.remove('active')
        })

        btn.classList.add('active')

        if (!this.searchParams.get('category')) {
          this.searchParams.append('category', menuTitles[i])
        }

        if (this.searchParams.get('category')) {
          this.searchParams.set('category', menuTitles[i])
        }

        history.replaceState(null, null, "?" + this.searchParams.toString());

      })
    })

  }


}