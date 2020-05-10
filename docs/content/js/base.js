(function (w, d, $) {
  $(d).on('keydown', function (e) {
    switch (e.keyCode) {
      case 37:
        var $prev = $('article a.prev')
        var $prevHidden = $('article a.prev.hidden')

        if ($prev.length && $prevHidden.length === 0) {
          w.location.href = $prev.attr('href')
        }
        break
      case 39:
        var $next = $('article a.next')
        var $nextHidden = $('article a.next.hidden')

        if ($next.length && $nextHidden.length === 0) {
          w.location.href = $next.attr('href')
        }
        break
    }
  })

  $('.share').on('click', function (e) {
    e.preventDefault()

    share.apply(this, ['twitter', 550, 250])
  })
  var share = function (network, width, height) {
    var $this = $(this)

    if ($this.hasClass(network)) {
      w.open($this.attr('href'), 'share-' + network, 'width=' + width + ',height=' + height)
    }
  }

  $('.affiliate')
    .prop('rel', 'nofollow')
    .after(' <a href="/contact/#the-legal-side">Affiliate</a>')

  // dark mode
  const darkModeMediaQuery = w.matchMedia('(prefers-color-scheme: dark)')
  darkModeMediaQuery.addListener(onColorSchemeUpdate)
  onColorSchemeUpdate()

  function onColorSchemeUpdate () {
    // <link rel="alternate icon" class="favicon" type="image/png" href="/content/img/favicon.png" />
    // <link rel="icon" class="favicon" type="image/svg+xml" href="/content/img/favicon.svg" />
    const favicons = d.querySelectorAll('link.favicon')
    const darkModeOn = darkModeMediaQuery.matches

    favicons.forEach((favicon) => {
      if (darkModeOn) {
        favicon.href = favicon.href.replace('/favicon.', '/favicon-dark.')
      } else {
        favicon.href = favicon.href.replace('/favicon-dark.', '/favicon.')
      }
    })
  }

// eslint-disable-next-line no-undef
})(window, document, jQuery)
