export default class Contrast {
  toggleButton

  constructor() {
    this.toggleButton = document.querySelector('.button-dark-mode');
  }

  execute() {
    this.toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }
}