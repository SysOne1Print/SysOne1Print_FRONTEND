/* eslint-disable */
!(function (t) {
  var e = {}
  function r(n) {
    if (e[n]) return e[n].exports
    var a = (e[n] = { i: n, l: !1, exports: {} })
    return t[n].call(a.exports, a, a.exports, r), (a.l = !0), a.exports
  }
  ;(r.m = t),
    (r.c = e),
    (r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n })
    }),
    (r.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 })
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t
      var n = Object.create(null)
      if (
        (r.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var a in t)
          r.d(
            n,
            a,
            function (e) {
              return t[e]
            }.bind(null, a)
          )
      return n
    }),
    (r.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default
            }
          : function () {
              return t
            }
      return r.d(e, 'a', e), e
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (r.p = '/'),
    r((r.s = 521))
})({
  521: function (t, e, r) {
    t.exports = r(522)
  },
  522: function (t, e, r) {
    'use strict'
    r.r(e)
    r(523)
  },
  523: function (t, e) {
    !(function () {
      'use strict'
      function t(t) {
        if (!t.id) return t.text
        var e = $(t.element).data('avatar-src')
        return e
          ? $(
              '<span class="avatar avatar-xs mr-2"><img class="avatar-img rounded-circle" src="' +
                e +
                '" alt="' +
                t.text +
                '"></span><span>' +
                t.text +
                '</span>'
            )
          : t.text
      }
      $.fn.select2.defaults.set('theme', 'bootstrap4'),
        $('[data-toggle="select"]').each(function () {
          var e = $(this),
            r = {
              dropdownParent: e.closest('.modal').length ? e.closest('.modal') : $(document.body),
              minimumResultsForSearch: e.data('minimum-results-for-search'),
              tags: e.data('tags'),
              multiple: e.data('multiple'),
              placeholder: e.data('placeholder'),
              templateResult: t
            }
          e.select2(r)
        })
    })()
  }
})
