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
    share.apply(this, ['facebook', 550, 300])
    share.apply(this, ['google', 500, 550])
    share.apply(this, ['hackernews', 500, 250])
  })
  var share = function (network, width, height) {
    var $this = $(this)

    if ($this.hasClass(network)) {
      if (typeof w.ga !== 'undefined') {
        w.ga('send', 'event', 'share', network)
      }

      w.open($this.attr('href'), 'share-' + network, 'width=' + width + ',height=' + height)
    }
  }
// eslint-disable-next-line no-undef
})(window, document, jQuery)
