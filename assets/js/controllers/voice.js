export default class Voice {
  actionTags
  spoken

  constructor(actionTags, spoken) {
    this.actionTags = actionTags
    this.spoken = spoken
  }

  execute() {
    this.actionTags.searchMic.addEventListener('click', async () => {
      const availableForSpeak = this.actionTags.searchImage.classList.contains('active')

      if (availableForSpeak) {
        this.toggleSearchSpeak(this.actionTags.searchSpeaking, this.actionTags.searchImage, 'open')

        setTimeout(() => this.toggleSearchSpeak(this.actionTags.searchSpeaking, this.actionTags.searchImage, 'close'), 10000)

        let transcript;

        await this.spoken.say('Fale o que deseja pesquisar').then(async () => {
          await this.spoken.listen().then(ts => {
            transcript = ts
          })
            .catch(e => console.warn(e.message))
        })

        if (transcript) {
          this.actionTags.searchInput.value = transcript
          console.log("Text: " + transcript)
          this.toggleSearchSpeak(this.actionTags.searchSpeaking, this.actionTags.searchImage, 'close')
        }
      }
    })
  }

  toggleSearchSpeak(speak, image, type) {
    if (type === 'close') {
      speak.classList.remove('active')
      image.classList.add('active')
    }

    if (type === 'open') {
      speak.classList.add('active')
      image.classList.remove('active')
    }

  }
}