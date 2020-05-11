(function (w, d) {
  d.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 37: { // arrow left
        const prev = d.querySelector('article a.prev')
        const prevHidden = d.querySelector('article a.prev.hidden')

        if (!!prev && prevHidden === null) {
          w.location.href = prev.getAttribute('href')
        }
        break
      }
      case 39: { // arrow right
        const next = d.querySelector('article a.next')
        const nextHidden = d.querySelector('article a.next.hidden')

        if (!!next && nextHidden === null) {
          w.location.href = next.getAttribute('href')
        }
        break
      }
    }
  })

  // share
  const shares = d.querySelectorAll('.share')
  shares.forEach((share) => {
    share.addEventListener('click', function (e) {
      e.preventDefault()
      popup.apply(this, ['twitter', 550, 250])
    })

    const popup = function (network, width, height) {
      if (this.classList.contains(network)) {
        w.open(this.getAttribute('href'), 'share-' + network, 'width=' + width + ',height=' + height)
      }
    }
  })

  // dark mode
  const darkModeMediaQuery = w.matchMedia('(prefers-color-scheme: dark)')
  darkModeMediaQuery.addListener(onColorSchemeUpdate)
  onColorSchemeUpdate()

  function onColorSchemeUpdate () {
    // Updates the href attributes for link tags with `class="favicon"` based on the browser's
    // current color schema (light or dark mode), to either `/favicon.png` or `/favicon-dark.png`.
    // Implementation is file extension agnostic to work with `/favicon.png` and `/favicon.svg` etc.
    const favicons = d.querySelectorAll('link.favicon')
    favicons.forEach((favicon) => {
      if (darkModeMediaQuery.matches) {
        favicon.href = favicon.href.replace('/favicon.', '/favicon-dark.')
      } else {
        favicon.href = favicon.href.replace('/favicon-dark.', '/favicon.')
      }
    })
  }
})(window, document)
