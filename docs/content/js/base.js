(function (w, d) {
  d.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 37:
        var prev = d.querySelector('article a.prev')
        var prevHidden = d.querySelector('article a.prev.hidden')

        if (!!prev && prevHidden === null) {
          w.location.href = prev.getAttribute('href')
        }
        break
      case 39:
        var next = d.querySelector('article a.next')
        var nextHidden = d.querySelector('article a.next.hidden')

        if (!!next && nextHidden === null) {
          w.location.href = next.getAttribute('href')
        }
        break
    }
  })

  const shares = d.querySelectorAll('.share')
  shares.forEach((share) => {
    share.addEventListener('click', function (e) {
      e.preventDefault()

      popup.apply(this, ['twitter', 550, 250])
    })

    var popup = function (network, width, height) {
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
    // <link rel="alternate icon" class="favicon" type="image/png" href="/content/img/favicon.png" />
    // <link rel="icon" class="favicon" type="image/svg+xml" href="/content/img/favicon.svg" />
    const favicons = d.querySelectorAll('link.favicon')
    favicons.forEach((favicon) => {
      if (darkModeMediaQuery.matches) {
        favicon.href = favicon.href.replace('/favicon.', '/favicon-dark.')
      } else {
        favicon.href = favicon.href.replace('/favicon-dark.', '/favicon.')
      }
    })
  }

// eslint-disable-next-line no-undef
})(window, document)
