 
/* eslint-disable */
!(function (e) {
  var t = {}
  function n(o) {
    if (t[o]) return t[o].exports
    var r = (t[o] = { i: o, l: !1, exports: {} })
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o })
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
      var o = Object.create(null)
      if (
        (n.r(o),
        Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t]
            }.bind(null, r)
          )
      return o
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
    n((n.s = 442))
})({
  172: function (e, t) {
    domFactory.handler.register('overlay', function () {
      return {
        properties: {
          overlayOnloadShow: { type: Boolean, reflectToAttribute: !0 },
          trigger: { value: 'hover', reflectToAttribute: !0 }
        },
        observers: ['_onChange(shown)'],
        listeners: [
          '_onEnter(mouseenter, touchstart)',
          '_onLeave(mouseleave, touchend)',
          '_onClick(click)'
        ],
        show: function () {
          this.shown = !0
        },
        hide: function () {
          this.shown = !1
        },
        toggle: function () {
          this.shown = !this.shown
        },
        _onChange: function () {
          if (this.shown) return this.element.classList.add('overlay--show')
          this.element.classList.remove('overlay--show')
        },
        _onEnter: function () {
          'hover' === this.trigger && this.show()
        },
        _onLeave: function () {
          'hover' === this.trigger && this.hide()
        },
        _onClick: function () {
          'click' === this.trigger && this.toggle()
        },
        init: function () {
          'ontouchstart' in window && this.element.classList.add('overlay--duserselect')
        },
        _reset: function () {
          this.overlayOnloadShow && !this.shown && this.show()
        }
      }
    })
  },
  442: function (e, t, n) {
    e.exports = n(172)
  }
})
