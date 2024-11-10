export default class Contrast {
  toggleButton

  constructor(contrast) {
    this.toggleButton = document.querySelector('.button-dark-mode');
    this.contrast = JSON.parse(contrast)
  }

  execute() {
    if (this.contrast && this.contrast.includes('dark-mode')) document.body.classList.add(this.contrast)

    this.toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) localStorage.setItem('tcc-contrast', JSON.stringify('dark-mode'))
      if (!document.body.classList.contains('dark-mode')) localStorage.setItem('tcc-contrast', JSON.stringify(''))
    });
  }
}