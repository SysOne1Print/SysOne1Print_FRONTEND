/* eslint-disable */
!(function (e) {
  var t = {}
  function n(r) {
    if (t[r]) return t[r].exports
    var i = (t[r] = { i: r, l: !1, exports: {} })
    return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var i in e)
          n.d(
            r,
            i,
            function (t) {
              return e[t]
            }.bind(null, i)
          )
      return r
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = '/'),
    n((n.s = 434))
})({
  174: function (e, t, n) {
    'use strict'
    n.r(t),
      n.d(t, 'imageComponent', function () {
        return r
      })
    var r = function () {
      return {
        properties: {
          position: { reflectToAttribute: !0, value: 'center' },
          height: { reflectToAttribute: !0, value: 'auto' }
        },
        get image() {
          return this.element.querySelector('img')
        },
        _reset: function () {
          this.image &&
            ((this.element.style.display = 'block'),
            (this.element.style.position = 'relative'),
            (this.element.style.overflow = 'hidden'),
            (this.element.style.backgroundImage = 'url('.concat(this.image.src, ')')),
            (this.element.style.backgroundSize = 'cover'),
            (this.element.style.backgroundPosition = this.position),
            (this.element.style.height = ''.concat(
              'auto' === this.height ? this.image.offsetHeight : this.height,
              'px'
            )),
            (this.image.style.visibility = 'hidden'))
        }
      }
    }
    domFactory.handler.register('image', r)
  },
  434: function (e, t, n) {
    e.exports = n(174)
  }
})
