/* eslint-disable */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], e)
      : e(((t = 'undefined' != typeof globalThis ? globalThis : t || self).domFactory = {}))
})(this, function (t) {
  'use strict'
  var e =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof self
            ? self
            : {}
  function n(t, e, n) {
    return (
      t(
        (n = {
          path: e,
          exports: {},
          require: function (t, e) {
            return (function () {
              throw new Error(
                'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
              )
            })(null == e && n.path)
          }
        }),
        n.exports
      ),
      n.exports
    )
  }
  var r = function (t) {
      return t && t.Math == Math && t
    },
    o =
      r('object' == typeof globalThis && globalThis) ||
      r('object' == typeof window && window) ||
      r('object' == typeof self && self) ||
      r('object' == typeof e && e) ||
      Function('return this')(),
    i = function (t) {
      try {
        return !!t()
      } catch (t) {
        return !0
      }
    },
    a = !i(function () {
      return (
        7 !=
        Object.defineProperty({}, 1, {
          get: function () {
            return 7
          }
        })[1]
      )
    }),
    c = {}.propertyIsEnumerable,
    u = Object.getOwnPropertyDescriptor,
    f = {
      f:
        u && !c.call({ 1: 2 }, 1)
          ? function (t) {
              var e = u(this, t)
              return !!e && e.enumerable
            }
          : c
    },
    l = function (t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e
      }
    },
    s = {}.toString,
    p = function (t) {
      return s.call(t).slice(8, -1)
    },
    d = ''.split,
    h = i(function () {
      return !Object('z').propertyIsEnumerable(0)
    })
      ? function (t) {
          return 'String' == p(t) ? d.call(t, '') : Object(t)
        }
      : Object,
    v = function (t) {
      if (null == t) throw TypeError("Can't call method on " + t)
      return t
    },
    g = function (t) {
      return h(v(t))
    },
    y = function (t) {
      return 'object' == typeof t ? null !== t : 'function' == typeof t
    },
    b = function (t, e) {
      if (!y(t)) return t
      var n, r
      if (e && 'function' == typeof (n = t.toString) && !y((r = n.call(t)))) return r
      if ('function' == typeof (n = t.valueOf) && !y((r = n.call(t)))) return r
      if (!e && 'function' == typeof (n = t.toString) && !y((r = n.call(t)))) return r
      throw TypeError("Can't convert object to primitive value")
    },
    m = {}.hasOwnProperty,
    _ = function (t, e) {
      return m.call(t, e)
    },
    w = o.document,
    E = y(w) && y(w.createElement),
    S = function (t) {
      return E ? w.createElement(t) : {}
    },
    O =
      !a &&
      !i(function () {
        return (
          7 !=
          Object.defineProperty(S('div'), 'a', {
            get: function () {
              return 7
            }
          }).a
        )
      }),
    x = Object.getOwnPropertyDescriptor,
    j = {
      f: a
        ? x
        : function (t, e) {
            if (((t = g(t)), (e = b(e, !0)), O))
              try {
                return x(t, e)
              } catch (t) {}
            if (_(t, e)) return l(!f.f.call(t, e), t[e])
          }
    },
    A = function (t) {
      if (!y(t)) throw TypeError(String(t) + ' is not an object')
      return t
    },
    P = Object.defineProperty,
    T = {
      f: a
        ? P
        : function (t, e, n) {
            if ((A(t), (e = b(e, !0)), A(n), O))
              try {
                return P(t, e, n)
              } catch (t) {}
            if ('get' in n || 'set' in n) throw TypeError('Accessors not supported')
            return 'value' in n && (t[e] = n.value), t
          }
    },
    I = a
      ? function (t, e, n) {
          return T.f(t, e, l(1, n))
        }
      : function (t, e, n) {
          return (t[e] = n), t
        },
    C = function (t, e) {
      try {
        I(o, t, e)
      } catch (n) {
        o[t] = e
      }
      return e
    },
    N = '__core-js_shared__',
    R = o[N] || C(N, {}),
    L = Function.toString
  'function' != typeof R.inspectSource &&
    (R.inspectSource = function (t) {
      return L.call(t)
    })
  var M,
    D,
    k,
    F = R.inspectSource,
    U = o.WeakMap,
    $ = 'function' == typeof U && /native code/.test(F(U)),
    G = n(function (t) {
      ;(t.exports = function (t, e) {
        return R[t] || (R[t] = void 0 !== e ? e : {})
      })('versions', []).push({
        version: '3.6.5',
        mode: 'global',
        copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
      })
    }),
    B = 0,
    V = Math.random(),
    z = function (t) {
      return 'Symbol(' + String(void 0 === t ? '' : t) + ')_' + (++B + V).toString(36)
    },
    W = G('keys'),
    K = function (t) {
      return W[t] || (W[t] = z(t))
    },
    q = {},
    H = o.WeakMap
  if ($) {
    var X = new H(),
      Y = X.get,
      Z = X.has,
      J = X.set
    ;(M = function (t, e) {
      return J.call(X, t, e), e
    }),
      (D = function (t) {
        return Y.call(X, t) || {}
      }),
      (k = function (t) {
        return Z.call(X, t)
      })
  } else {
    var Q = K('state')
    ;(q[Q] = !0),
      (M = function (t, e) {
        return I(t, Q, e), e
      }),
      (D = function (t) {
        return _(t, Q) ? t[Q] : {}
      }),
      (k = function (t) {
        return _(t, Q)
      })
  }
  var tt,
    et,
    nt = {
      set: M,
      get: D,
      has: k,
      enforce: function (t) {
        return k(t) ? D(t) : M(t, {})
      },
      getterFor: function (t) {
        return function (e) {
          var n
          if (!y(e) || (n = D(e)).type !== t)
            throw TypeError('Incompatible receiver, ' + t + ' required')
          return n
        }
      }
    },
    rt = n(function (t) {
      var e = nt.get,
        n = nt.enforce,
        r = String(String).split('String')
      ;(t.exports = function (t, e, i, a) {
        var c = !!a && !!a.unsafe,
          u = !!a && !!a.enumerable,
          f = !!a && !!a.noTargetGet
        'function' == typeof i &&
          ('string' != typeof e || _(i, 'name') || I(i, 'name', e),
          (n(i).source = r.join('string' == typeof e ? e : ''))),
          t !== o
            ? (c ? !f && t[e] && (u = !0) : delete t[e], u ? (t[e] = i) : I(t, e, i))
            : u
              ? (t[e] = i)
              : C(e, i)
      })(Function.prototype, 'toString', function () {
        return ('function' == typeof this && e(this).source) || F(this)
      })
    }),
    ot = o,
    it = function (t) {
      return 'function' == typeof t ? t : void 0
    },
    at = function (t, e) {
      return arguments.length < 2 ? it(ot[t]) || it(o[t]) : (ot[t] && ot[t][e]) || (o[t] && o[t][e])
    },
    ct = Math.ceil,
    ut = Math.floor,
    ft = function (t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? ut : ct)(t)
    },
    lt = Math.min,
    st = function (t) {
      return t > 0 ? lt(ft(t), 9007199254740991) : 0
    },
    pt = Math.max,
    dt = Math.min,
    ht = function (t, e) {
      var n = ft(t)
      return n < 0 ? pt(n + e, 0) : dt(n, e)
    },
    vt = function (t) {
      return function (e, n, r) {
        var o,
          i = g(e),
          a = st(i.length),
          c = ht(r, a)
        if (t && n != n) {
          for (; a > c; ) if ((o = i[c++]) != o) return !0
        } else for (; a > c; c++) if ((t || c in i) && i[c] === n) return t || c || 0
        return !t && -1
      }
    },
    gt = { includes: vt(!0), indexOf: vt(!1) },
    yt = gt.indexOf,
    bt = function (t, e) {
      var n,
        r = g(t),
        o = 0,
        i = []
      for (n in r) !_(q, n) && _(r, n) && i.push(n)
      for (; e.length > o; ) _(r, (n = e[o++])) && (~yt(i, n) || i.push(n))
      return i
    },
    mt = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ],
    _t = mt.concat('length', 'prototype'),
    wt = {
      f:
        Object.getOwnPropertyNames ||
        function (t) {
          return bt(t, _t)
        }
    },
    Et = { f: Object.getOwnPropertySymbols },
    St =
      at('Reflect', 'ownKeys') ||
      function (t) {
        var e = wt.f(A(t)),
          n = Et.f
        return n ? e.concat(n(t)) : e
      },
    Ot = function (t, e) {
      for (var n = St(e), r = T.f, o = j.f, i = 0; i < n.length; i++) {
        var a = n[i]
        _(t, a) || r(t, a, o(e, a))
      }
    },
    xt = /#|\.prototype\./,
    jt = function (t, e) {
      var n = Pt[At(t)]
      return n == It || (n != Tt && ('function' == typeof e ? i(e) : !!e))
    },
    At = (jt.normalize = function (t) {
      return String(t).replace(xt, '.').toLowerCase()
    }),
    Pt = (jt.data = {}),
    Tt = (jt.NATIVE = 'N'),
    It = (jt.POLYFILL = 'P'),
    Ct = jt,
    Nt = j.f,
    Rt = function (t, e) {
      var n,
        r,
        i,
        a,
        c,
        u = t.target,
        f = t.global,
        l = t.stat
      if ((n = f ? o : l ? o[u] || C(u, {}) : (o[u] || {}).prototype))
        for (r in e) {
          if (
            ((a = e[r]),
            (i = t.noTargetGet ? (c = Nt(n, r)) && c.value : n[r]),
            !Ct(f ? r : u + (l ? '.' : '#') + r, t.forced) && void 0 !== i)
          ) {
            if (typeof a == typeof i) continue
            Ot(a, i)
          }
          ;(t.sham || (i && i.sham)) && I(a, 'sham', !0), rt(n, r, a, t)
        }
    },
    Lt = function (t) {
      if ('function' != typeof t) throw TypeError(String(t) + ' is not a function')
      return t
    },
    Mt = function (t) {
      return Object(v(t))
    },
    Dt =
      Array.isArray ||
      function (t) {
        return 'Array' == p(t)
      },
    kt =
      !!Object.getOwnPropertySymbols &&
      !i(function () {
        return !String(Symbol())
      }),
    Ft = kt && !Symbol.sham && 'symbol' == typeof Symbol.iterator,
    Ut = G('wks'),
    $t = o.Symbol,
    Gt = Ft ? $t : ($t && $t.withoutSetter) || z,
    Bt = function (t) {
      return _(Ut, t) || (kt && _($t, t) ? (Ut[t] = $t[t]) : (Ut[t] = Gt('Symbol.' + t))), Ut[t]
    },
    Vt = Bt('species'),
    zt = function (t, e) {
      var n
      return (
        Dt(t) &&
          ('function' != typeof (n = t.constructor) || (n !== Array && !Dt(n.prototype))
            ? y(n) && null === (n = n[Vt]) && (n = void 0)
            : (n = void 0)),
        new (void 0 === n ? Array : n)(0 === e ? 0 : e)
      )
    },
    Wt = [].push,
    Kt = function (t) {
      var e = 1 == t,
        n = 2 == t,
        r = 3 == t,
        o = 4 == t,
        i = 6 == t,
        a = 5 == t || i
      return function (c, u, f, l) {
        for (
          var s,
            p,
            d = Mt(c),
            v = h(d),
            g = (function (t, e, n) {
              if ((Lt(t), void 0 === e)) return t
              switch (n) {
                case 0:
                  return function () {
                    return t.call(e)
                  }
                case 1:
                  return function (n) {
                    return t.call(e, n)
                  }
                case 2:
                  return function (n, r) {
                    return t.call(e, n, r)
                  }
                case 3:
                  return function (n, r, o) {
                    return t.call(e, n, r, o)
                  }
              }
              return function () {
                return t.apply(e, arguments)
              }
            })(u, f, 3),
            y = st(v.length),
            b = 0,
            m = l || zt,
            _ = e ? m(c, y) : n ? m(c, 0) : void 0;
          y > b;
          b++
        )
          if ((a || b in v) && ((p = g((s = v[b]), b, d)), t))
            if (e) _[b] = p
            else if (p)
              switch (t) {
                case 3:
                  return !0
                case 5:
                  return s
                case 6:
                  return b
                case 2:
                  Wt.call(_, s)
              }
            else if (o) return !1
        return i ? -1 : r || o ? o : _
      }
    },
    qt = {
      forEach: Kt(0),
      map: Kt(1),
      filter: Kt(2),
      some: Kt(3),
      every: Kt(4),
      find: Kt(5),
      findIndex: Kt(6)
    },
    Ht = at('navigator', 'userAgent') || '',
    Xt = o.process,
    Yt = Xt && Xt.versions,
    Zt = Yt && Yt.v8
  Zt
    ? (et = (tt = Zt.split('.'))[0] + tt[1])
    : Ht &&
      (!(tt = Ht.match(/Edge\/(\d+)/)) || tt[1] >= 74) &&
      (tt = Ht.match(/Chrome\/(\d+)/)) &&
      (et = tt[1])
  var Jt = et && +et,
    Qt = Bt('species'),
    te = function (t) {
      return (
        Jt >= 51 ||
        !i(function () {
          var e = []
          return (
            ((e.constructor = {})[Qt] = function () {
              return { foo: 1 }
            }),
            1 !== e[t](Boolean).foo
          )
        })
      )
    },
    ee = Object.defineProperty,
    ne = {},
    re = function (t) {
      throw t
    },
    oe = function (t, e) {
      if (_(ne, t)) return ne[t]
      e || (e = {})
      var n = [][t],
        r = !!_(e, 'ACCESSORS') && e.ACCESSORS,
        o = _(e, 0) ? e[0] : re,
        c = _(e, 1) ? e[1] : void 0
      return (ne[t] =
        !!n &&
        !i(function () {
          if (r && !a) return !0
          var t = { length: -1 }
          r ? ee(t, 1, { enumerable: !0, get: re }) : (t[1] = 1), n.call(t, o, c)
        }))
    },
    ie = qt.filter,
    ae = te('filter'),
    ce = oe('filter')
  Rt(
    { target: 'Array', proto: !0, forced: !ae || !ce },
    {
      filter: function (t) {
        return ie(this, t, arguments.length > 1 ? arguments[1] : void 0)
      }
    }
  )
  var ue = function (t, e) {
      var n = [][t]
      return (
        !!n &&
        i(function () {
          n.call(
            null,
            e ||
              function () {
                throw 1
              },
            1
          )
        })
      )
    },
    fe = qt.forEach,
    le = ue('forEach'),
    se = oe('forEach'),
    pe =
      le && se
        ? [].forEach
        : function (t) {
            return fe(this, t, arguments.length > 1 ? arguments[1] : void 0)
          }
  Rt({ target: 'Array', proto: !0, forced: [].forEach != pe }, { forEach: pe })
  var de = gt.indexOf,
    he = [].indexOf,
    ve = !!he && 1 / [1].indexOf(1, -0) < 0,
    ge = ue('indexOf'),
    ye = oe('indexOf', { ACCESSORS: !0, 1: 0 })
  Rt(
    { target: 'Array', proto: !0, forced: ve || !ge || !ye },
    {
      indexOf: function (t) {
        return ve
          ? he.apply(this, arguments) || 0
          : de(this, t, arguments.length > 1 ? arguments[1] : void 0)
      }
    }
  )
  var be = [].join,
    me = h != Object,
    _e = ue('join', ',')
  Rt(
    { target: 'Array', proto: !0, forced: me || !_e },
    {
      join: function (t) {
        return be.call(g(this), void 0 === t ? ',' : t)
      }
    }
  )
  var we = qt.map,
    Ee = te('map'),
    Se = oe('map')
  Rt(
    { target: 'Array', proto: !0, forced: !Ee || !Se },
    {
      map: function (t) {
        return we(this, t, arguments.length > 1 ? arguments[1] : void 0)
      }
    }
  )
  var Oe = function (t) {
      return function (e, n, r, o) {
        Lt(n)
        var i = Mt(e),
          a = h(i),
          c = st(i.length),
          u = t ? c - 1 : 0,
          f = t ? -1 : 1
        if (r < 2)
          for (;;) {
            if (u in a) {
              ;(o = a[u]), (u += f)
              break
            }
            if (((u += f), t ? u < 0 : c <= u))
              throw TypeError('Reduce of empty array with no initial value')
          }
        for (; t ? u >= 0 : c > u; u += f) u in a && (o = n(o, a[u], u, i))
        return o
      }
    },
    xe = { left: Oe(!1), right: Oe(!0) }.left,
    je = ue('reduce'),
    Ae = oe('reduce', { 1: 0 })
  Rt(
    { target: 'Array', proto: !0, forced: !je || !Ae },
    {
      reduce: function (t) {
        return xe(this, t, arguments.length, arguments.length > 1 ? arguments[1] : void 0)
      }
    }
  )
  var Pe,
    Te =
      Object.setPrototypeOf ||
      ('__proto__' in {}
        ? (function () {
            var t,
              e = !1,
              n = {}
            try {
              ;(t = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set).call(n, []),
                (e = n instanceof Array)
            } catch (t) {}
            return function (n, r) {
              return (
                A(n),
                (function (t) {
                  if (!y(t) && null !== t)
                    throw TypeError("Can't set " + String(t) + ' as a prototype')
                })(r),
                e ? t.call(n, r) : (n.__proto__ = r),
                n
              )
            }
          })()
        : void 0),
    Ie = function (t, e, n) {
      var r, o
      return (
        Te &&
          'function' == typeof (r = e.constructor) &&
          r !== n &&
          y((o = r.prototype)) &&
          o !== n.prototype &&
          Te(t, o),
        t
      )
    },
    Ce =
      Object.keys ||
      function (t) {
        return bt(t, mt)
      },
    Ne = a
      ? Object.defineProperties
      : function (t, e) {
          A(t)
          for (var n, r = Ce(e), o = r.length, i = 0; o > i; ) T.f(t, (n = r[i++]), e[n])
          return t
        },
    Re = at('document', 'documentElement'),
    Le = K('IE_PROTO'),
    Me = function () {},
    De = function (t) {
      return '<script>' + t + '</' + 'script>'
    },
    ke = function () {
      try {
        Pe = document.domain && new ActiveXObject('htmlfile')
      } catch (t) {}
      var t, e
      ke = Pe
        ? (function (t) {
            t.write(De('')), t.close()
            var e = t.parentWindow.Object
            return (t = null), e
          })(Pe)
        : (((e = S('iframe')).style.display = 'none'),
          Re.appendChild(e),
          (e.src = String('javascript:')),
          (t = e.contentWindow.document).open(),
          t.write(De('document.F=Object')),
          t.close(),
          t.F)
      for (var n = mt.length; n--; ) delete ke.prototype[mt[n]]
      return ke()
    }
  q[Le] = !0
  var Fe =
      Object.create ||
      function (t, e) {
        var n
        return (
          null !== t
            ? ((Me.prototype = A(t)), (n = new Me()), (Me.prototype = null), (n[Le] = t))
            : (n = ke()),
          void 0 === e ? n : Ne(n, e)
        )
      },
    Ue = '\t\n\v\f\r                　\u2028\u2029\ufeff',
    $e = '[' + Ue + ']',
    Ge = RegExp('^' + $e + $e + '*'),
    Be = RegExp($e + $e + '*$'),
    Ve = function (t) {
      return function (e) {
        var n = String(v(e))
        return 1 & t && (n = n.replace(Ge, '')), 2 & t && (n = n.replace(Be, '')), n
      }
    },
    ze = { start: Ve(1), end: Ve(2), trim: Ve(3) },
    We = wt.f,
    Ke = j.f,
    qe = T.f,
    He = ze.trim,
    Xe = 'Number',
    Ye = o.Number,
    Ze = Ye.prototype,
    Je = p(Fe(Ze)) == Xe,
    Qe = function (t) {
      var e,
        n,
        r,
        o,
        i,
        a,
        c,
        u,
        f = b(t, !1)
      if ('string' == typeof f && f.length > 2)
        if (43 === (e = (f = He(f)).charCodeAt(0)) || 45 === e) {
          if (88 === (n = f.charCodeAt(2)) || 120 === n) return NaN
        } else if (48 === e) {
          switch (f.charCodeAt(1)) {
            case 66:
            case 98:
              ;(r = 2), (o = 49)
              break
            case 79:
            case 111:
              ;(r = 8), (o = 55)
              break
            default:
              return +f
          }
          for (a = (i = f.slice(2)).length, c = 0; c < a; c++)
            if ((u = i.charCodeAt(c)) < 48 || u > o) return NaN
          return parseInt(i, r)
        }
      return +f
    }
  if (Ct(Xe, !Ye(' 0o1') || !Ye('0b1') || Ye('+0x1'))) {
    for (
      var tn,
        en = function (t) {
          var e = arguments.length < 1 ? 0 : t,
            n = this
          return n instanceof en &&
            (Je
              ? i(function () {
                  Ze.valueOf.call(n)
                })
              : p(n) != Xe)
            ? Ie(new Ye(Qe(e)), n, en)
            : Qe(e)
        },
        nn = a
          ? We(Ye)
          : 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'.split(
              ','
            ),
        rn = 0;
      nn.length > rn;
      rn++
    )
      _(Ye, (tn = nn[rn])) && !_(en, tn) && qe(en, tn, Ke(Ye, tn))
    ;(en.prototype = Ze), (Ze.constructor = en), rt(o, Xe, en)
  }
  var on = j.f,
    an = i(function () {
      on(1)
    })
  Rt(
    { target: 'Object', stat: !0, forced: !a || an, sham: !a },
    {
      getOwnPropertyDescriptor: function (t, e) {
        return on(g(t), e)
      }
    }
  )
  var cn = function () {
    var t = A(this),
      e = ''
    return (
      t.global && (e += 'g'),
      t.ignoreCase && (e += 'i'),
      t.multiline && (e += 'm'),
      t.dotAll && (e += 's'),
      t.unicode && (e += 'u'),
      t.sticky && (e += 'y'),
      e
    )
  }
  function un(t, e) {
    return RegExp(t, e)
  }
  var fn,
    ln,
    sn = {
      UNSUPPORTED_Y: i(function () {
        var t = un('a', 'y')
        return (t.lastIndex = 2), null != t.exec('abcd')
      }),
      BROKEN_CARET: i(function () {
        var t = un('^r', 'gy')
        return (t.lastIndex = 2), null != t.exec('str')
      })
    },
    pn = RegExp.prototype.exec,
    dn = String.prototype.replace,
    hn = pn,
    vn =
      ((fn = /a/),
      (ln = /b*/g),
      pn.call(fn, 'a'),
      pn.call(ln, 'a'),
      0 !== fn.lastIndex || 0 !== ln.lastIndex),
    gn = sn.UNSUPPORTED_Y || sn.BROKEN_CARET,
    yn = void 0 !== /()??/.exec('')[1]
  ;(vn || yn || gn) &&
    (hn = function (t) {
      var e,
        n,
        r,
        o,
        i = this,
        a = gn && i.sticky,
        c = cn.call(i),
        u = i.source,
        f = 0,
        l = t
      return (
        a &&
          (-1 === (c = c.replace('y', '')).indexOf('g') && (c += 'g'),
          (l = String(t).slice(i.lastIndex)),
          i.lastIndex > 0 &&
            (!i.multiline || (i.multiline && '\n' !== t[i.lastIndex - 1])) &&
            ((u = '(?: ' + u + ')'), (l = ' ' + l), f++),
          (n = new RegExp('^(?:' + u + ')', c))),
        yn && (n = new RegExp('^' + u + '$(?!\\s)', c)),
        vn && (e = i.lastIndex),
        (r = pn.call(a ? n : i, l)),
        a
          ? r
            ? ((r.input = r.input.slice(f)),
              (r[0] = r[0].slice(f)),
              (r.index = i.lastIndex),
              (i.lastIndex += r[0].length))
            : (i.lastIndex = 0)
          : vn && r && (i.lastIndex = i.global ? r.index + r[0].length : e),
        yn &&
          r &&
          r.length > 1 &&
          dn.call(r[0], n, function () {
            for (o = 1; o < arguments.length - 2; o++) void 0 === arguments[o] && (r[o] = void 0)
          }),
        r
      )
    })
  var bn = hn
  Rt({ target: 'RegExp', proto: !0, forced: /./.exec !== bn }, { exec: bn })
  var mn = Bt('species'),
    _n = !i(function () {
      var t = /./
      return (
        (t.exec = function () {
          var t = []
          return (t.groups = { a: '7' }), t
        }),
        '7' !== ''.replace(t, '$<a>')
      )
    }),
    wn = '$0' === 'a'.replace(/./, '$0'),
    En = Bt('replace'),
    Sn = !!/./[En] && '' === /./[En]('a', '$0'),
    On = !i(function () {
      var t = /(?:)/,
        e = t.exec
      t.exec = function () {
        return e.apply(this, arguments)
      }
      var n = 'ab'.split(t)
      return 2 !== n.length || 'a' !== n[0] || 'b' !== n[1]
    }),
    xn = function (t, e, n, r) {
      var o = Bt(t),
        a = !i(function () {
          var e = {}
          return (
            (e[o] = function () {
              return 7
            }),
            7 != ''[t](e)
          )
        }),
        c =
          a &&
          !i(function () {
            var e = !1,
              n = /a/
            return (
              'split' === t &&
                (((n = {}).constructor = {}),
                (n.constructor[mn] = function () {
                  return n
                }),
                (n.flags = ''),
                (n[o] = /./[o])),
              (n.exec = function () {
                return (e = !0), null
              }),
              n[o](''),
              !e
            )
          })
      if (!a || !c || ('replace' === t && (!_n || !wn || Sn)) || ('split' === t && !On)) {
        var u = /./[o],
          f = n(
            o,
            ''[t],
            function (t, e, n, r, o) {
              return e.exec === bn
                ? a && !o
                  ? { done: !0, value: u.call(e, n, r) }
                  : { done: !0, value: t.call(n, e, r) }
                : { done: !1 }
            },
            {
              REPLACE_KEEPS_$0: wn,
              REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: Sn
            }
          ),
          l = f[0],
          s = f[1]
        rt(String.prototype, t, l),
          rt(
            RegExp.prototype,
            o,
            2 == e
              ? function (t, e) {
                  return s.call(t, this, e)
                }
              : function (t) {
                  return s.call(t, this)
                }
          )
      }
      r && I(RegExp.prototype[o], 'sham', !0)
    },
    jn = function (t) {
      return function (e, n) {
        var r,
          o,
          i = String(v(e)),
          a = ft(n),
          c = i.length
        return a < 0 || a >= c
          ? t
            ? ''
            : void 0
          : (r = i.charCodeAt(a)) < 55296 ||
              r > 56319 ||
              a + 1 === c ||
              (o = i.charCodeAt(a + 1)) < 56320 ||
              o > 57343
            ? t
              ? i.charAt(a)
              : r
            : t
              ? i.slice(a, a + 2)
              : o - 56320 + ((r - 55296) << 10) + 65536
      }
    },
    An = { codeAt: jn(!1), charAt: jn(!0) }.charAt,
    Pn = function (t, e, n) {
      return e + (n ? An(t, e).length : 1)
    },
    Tn = function (t, e) {
      var n = t.exec
      if ('function' == typeof n) {
        var r = n.call(t, e)
        if ('object' != typeof r)
          throw TypeError('RegExp exec method returned something other than an Object or null')
        return r
      }
      if ('RegExp' !== p(t)) throw TypeError('RegExp#exec called on incompatible receiver')
      return bn.call(t, e)
    }
  xn('match', 1, function (t, e, n) {
    return [
      function (e) {
        var n = v(this),
          r = null == e ? void 0 : e[t]
        return void 0 !== r ? r.call(e, n) : new RegExp(e)[t](String(n))
      },
      function (t) {
        var r = n(e, t, this)
        if (r.done) return r.value
        var o = A(t),
          i = String(this)
        if (!o.global) return Tn(o, i)
        var a = o.unicode
        o.lastIndex = 0
        for (var c, u = [], f = 0; null !== (c = Tn(o, i)); ) {
          var l = String(c[0])
          ;(u[f] = l), '' === l && (o.lastIndex = Pn(i, st(o.lastIndex), a)), f++
        }
        return 0 === f ? null : u
      }
    ]
  })
  var In = Bt('match'),
    Cn = Bt('species'),
    Nn = [].push,
    Rn = Math.min,
    Ln = 4294967295,
    Mn = !i(function () {
      return !RegExp(Ln, 'y')
    })
  xn(
    'split',
    2,
    function (t, e, n) {
      var r
      return (
        (r =
          'c' == 'abbc'.split(/(b)*/)[1] ||
          4 != 'test'.split(/(?:)/, -1).length ||
          2 != 'ab'.split(/(?:ab)*/).length ||
          4 != '.'.split(/(.?)(.?)/).length ||
          '.'.split(/()()/).length > 1 ||
          ''.split(/.?/).length
            ? function (t, n) {
                var r,
                  o,
                  i = String(v(this)),
                  a = void 0 === n ? Ln : n >>> 0
                if (0 === a) return []
                if (void 0 === t) return [i]
                if (!y((r = t)) || !(void 0 !== (o = r[In]) ? o : 'RegExp' == p(r)))
                  return e.call(i, t, a)
                for (
                  var c,
                    u,
                    f,
                    l = [],
                    s =
                      (t.ignoreCase ? 'i' : '') +
                      (t.multiline ? 'm' : '') +
                      (t.unicode ? 'u' : '') +
                      (t.sticky ? 'y' : ''),
                    d = 0,
                    h = new RegExp(t.source, s + 'g');
                  (c = bn.call(h, i)) &&
                  !(
                    (u = h.lastIndex) > d &&
                    (l.push(i.slice(d, c.index)),
                    c.length > 1 && c.index < i.length && Nn.apply(l, c.slice(1)),
                    (f = c[0].length),
                    (d = u),
                    l.length >= a)
                  );

                )
                  h.lastIndex === c.index && h.lastIndex++
                return (
                  d === i.length ? (!f && h.test('')) || l.push('') : l.push(i.slice(d)),
                  l.length > a ? l.slice(0, a) : l
                )
              }
            : '0'.split(void 0, 0).length
              ? function (t, n) {
                  return void 0 === t && 0 === n ? [] : e.call(this, t, n)
                }
              : e),
        [
          function (e, n) {
            var o = v(this),
              i = null == e ? void 0 : e[t]
            return void 0 !== i ? i.call(e, o, n) : r.call(String(o), e, n)
          },
          function (t, o) {
            var i = n(r, t, this, o, r !== e)
            if (i.done) return i.value
            var a = A(t),
              c = String(this),
              u = (function (t, e) {
                var n,
                  r = A(t).constructor
                return void 0 === r || null == (n = A(r)[Cn]) ? e : Lt(n)
              })(a, RegExp),
              f = a.unicode,
              l =
                (a.ignoreCase ? 'i' : '') +
                (a.multiline ? 'm' : '') +
                (a.unicode ? 'u' : '') +
                (Mn ? 'y' : 'g'),
              s = new u(Mn ? a : '^(?:' + a.source + ')', l),
              p = void 0 === o ? Ln : o >>> 0
            if (0 === p) return []
            if (0 === c.length) return null === Tn(s, c) ? [c] : []
            for (var d = 0, h = 0, v = []; h < c.length; ) {
              s.lastIndex = Mn ? h : 0
              var g,
                y = Tn(s, Mn ? c : c.slice(h))
              if (null === y || (g = Rn(st(s.lastIndex + (Mn ? 0 : h)), c.length)) === d)
                h = Pn(c, h, f)
              else {
                if ((v.push(c.slice(d, h)), v.length === p)) return v
                for (var b = 1; b <= y.length - 1; b++) if ((v.push(y[b]), v.length === p)) return v
                h = d = g
              }
            }
            return v.push(c.slice(d)), v
          }
        ]
      )
    },
    !Mn
  )
  var Dn,
    kn = ze.trim
  Rt(
    {
      target: 'String',
      proto: !0,
      forced:
        ((Dn = 'trim'),
        i(function () {
          return !!Ue[Dn]() || '​᠎' != '​᠎'[Dn]() || Ue[Dn].name !== Dn
        }))
    },
    {
      trim: function () {
        return kn(this)
      }
    }
  )
  for (var Fn in {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  }) {
    var Un = o[Fn],
      $n = Un && Un.prototype
    if ($n && $n.forEach !== pe)
      try {
        I($n, 'forEach', pe)
      } catch (t) {
        $n.forEach = pe
      }
  }
  function Gn(t) {
    return (Gn =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              'function' == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          })(t)
  }
  function Bn(t, e) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t
      })(t) ||
      (function (t, e) {
        if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return
        var n = [],
          r = !0,
          o = !1,
          i = void 0
        try {
          for (
            var a, c = t[Symbol.iterator]();
            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
            r = !0
          );
        } catch (t) {
          ;(o = !0), (i = t)
        } finally {
          try {
            r || null == c.return || c.return()
          } finally {
            if (o) throw i
          }
        }
        return n
      })(t, e) ||
      zn(t, e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
      })()
    )
  }
  function Vn(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return Wn(t)
      })(t) ||
      (function (t) {
        if ('undefined' != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
      })(t) ||
      zn(t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
      })()
    )
  }
  function zn(t, e) {
    if (t) {
      if ('string' == typeof t) return Wn(t, e)
      var n = Object.prototype.toString.call(t).slice(8, -1)
      return (
        'Object' === n && t.constructor && (n = t.constructor.name),
        'Map' === n || 'Set' === n
          ? Array.from(t)
          : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Wn(t, e)
            : void 0
      )
    }
  }
  function Wn(t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
    return r
  }
  var Kn = n(function (t, e) {
      t.exports = (function (t) {
        function e(r) {
          if (n[r]) return n[r].exports
          var o = (n[r] = { exports: {}, id: r, loaded: !1 })
          return t[r].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports
        }
        var n = {}
        return (e.m = t), (e.c = n), (e.p = ''), e(0)
      })([
        function (t, e, n) {
          function r(t) {
            return t && t.__esModule ? t : { default: t }
          }
          Object.defineProperty(e, '__esModule', { value: !0 }), (e.unwatch = e.watch = void 0)
          var o = r(n(4)),
            i = r(n(3)),
            a =
              ((e.watch = function () {
                for (var t = arguments.length, e = Array(t), n = 0; t > n; n++) e[n] = arguments[n]
                var r = e[1]
                u(r) ? g.apply(void 0, e) : a(r) ? b.apply(void 0, e) : y.apply(void 0, e)
              }),
              (e.unwatch = function () {
                for (var t = arguments.length, e = Array(t), n = 0; t > n; n++) e[n] = arguments[n]
                var r = e[1]
                u(r) || void 0 === r
                  ? E.apply(void 0, e)
                  : a(r)
                    ? _.apply(void 0, e)
                    : m.apply(void 0, e)
              }),
              function (t) {
                return '[object Array]' === {}.toString.call(t)
              }),
            c = function (t) {
              return '[object Object]' === {}.toString.call(t)
            },
            u = function (t) {
              return '[object Function]' === {}.toString.call(t)
            },
            f = function (t, e, n) {
              ;(0, i.default)(t, e, {
                enumerable: !1,
                configurable: !0,
                writable: !1,
                value: n
              })
            },
            l = function (t, e, n, r) {
              ;(0, i.default)(t, e, {
                get: n,
                set: function (t) {
                  r.call(this, t)
                },
                enumerable: !0,
                configurable: !0
              })
            },
            s = function (t, e, n, r, o) {
              var i = void 0,
                a = t.__watchers__[e]
              ;(i = t.__watchers__.__watchall__) && (a = a ? a.concat(i) : i)
              for (var c = a ? a.length : 0, u = 0; c > u; u++) a[u].call(t, n, r, e, o)
            },
            p = ['pop', 'push', 'reverse', 'shift', 'sort', 'unshift', 'splice'],
            d = function (t, e, n, r) {
              f(t, n, function () {
                for (
                  var o = 0, i = void 0, a = void 0, c = arguments.length, u = Array(c), f = 0;
                  c > f;
                  f++
                )
                  u[f] = arguments[f]
                if ('splice' === n) {
                  var l = u[0],
                    s = l + u[1]
                  ;(i = t.slice(l, s)), (a = [])
                  for (var p = 2; p < u.length; p++) a[p - 2] = u[p]
                  o = l
                } else
                  a =
                    'push' === n || 'unshift' === n
                      ? u.length > 0
                        ? u
                        : void 0
                      : u.length > 0
                        ? u[0]
                        : void 0
                var d = e.apply(t, u)
                return (
                  'pop' === n
                    ? ((i = d), (o = t.length))
                    : 'push' === n
                      ? (o = t.length - 1)
                      : 'shift' === n
                        ? (i = d)
                        : 'unshift' !== n && void 0 === a && (a = d),
                  r.call(t, o, n, a, i),
                  d
                )
              })
            },
            h = function (t, e) {
              if (u(e) && t && !(t instanceof String) && a(t))
                for (var n = p.length; n > 0; n--) {
                  var r = p[n - 1]
                  d(t, t[r], r, e)
                }
            },
            v = function (t, e, n, r) {
              var u = !1,
                p = a(t)
              void 0 === t.__watchers__ &&
                (f(t, '__watchers__', {}),
                p &&
                  h(t, function (n, o, i, u) {
                    if ((s(t, n, i, u, o), 0 !== r && i && (c(i) || a(i)))) {
                      var f = void 0,
                        l = t.__watchers__[e]
                      ;(f = t.__watchers__.__watchall__) && (l = l ? l.concat(f) : f)
                      for (var p = l ? l.length : 0, d = 0; p > d; d++)
                        if ('splice' !== o) g(i, l[d], void 0 === r ? r : r - 1)
                        else
                          for (var h = 0; h < i.length; h++) g(i[h], l[d], void 0 === r ? r : r - 1)
                    }
                  })),
                void 0 === t.__proxy__ && f(t, '__proxy__', {}),
                void 0 === t.__watchers__[e] && ((t.__watchers__[e] = []), p || (u = !0))
              for (var d = 0; d < t.__watchers__[e].length; d++)
                if (t.__watchers__[e][d] === n) return
              t.__watchers__[e].push(n),
                u &&
                  (function () {
                    var n = (0, o.default)(t, e)
                    void 0 !== n
                      ? (function () {
                          var r = {
                            enumerable: n.enumerable,
                            configurable: n.configurable
                          }
                          ;['get', 'set'].forEach(function (e) {
                            void 0 !== n[e] &&
                              (r[e] = function () {
                                for (var r = arguments.length, o = Array(r), i = 0; r > i; i++)
                                  o[i] = arguments[i]
                                return n[e].apply(t, o)
                              })
                          }),
                            ['writable', 'value'].forEach(function (t) {
                              void 0 !== n[t] && (r[t] = n[t])
                            }),
                            (0, i.default)(t.__proxy__, e, r)
                        })()
                      : (t.__proxy__[e] = t[e])
                    var u = function (n) {
                      var o = t.__proxy__[e]
                      if (0 !== r && t[e] && (c(t[e]) || a(t[e])) && !t[e].__watchers__)
                        for (var i = 0; i < t.__watchers__[e].length; i++)
                          g(t[e], t.__watchers__[e][i], void 0 === r ? r : r - 1)
                      o !== n && ((t.__proxy__[e] = n), s(t, e, n, o, 'set'))
                    }
                    l(
                      t,
                      e,
                      function () {
                        return t.__proxy__[e]
                      },
                      u
                    )
                  })()
            },
            g = function t(e, n, r) {
              if ('string' != typeof e && (e instanceof Object || a(e)))
                if (a(e)) {
                  if ((v(e, '__watchall__', n, r), void 0 === r || r > 0))
                    for (var o = 0; o < e.length; o++) t(e[o], n, r)
                } else {
                  var i = []
                  for (var c in e) ({}).hasOwnProperty.call(e, c) && i.push(c)
                  b(e, i, n, r)
                }
            },
            y = function (t, e, n, r) {
              'string' != typeof t &&
                (t instanceof Object || a(t)) &&
                (u(t[e]) ||
                  (null !== t[e] && (void 0 === r || r > 0) && g(t[e], n, void 0 !== r ? r - 1 : r),
                  v(t, e, n, r)))
            },
            b = function (t, e, n, r) {
              if ('string' != typeof t && (t instanceof Object || a(t)))
                for (var o = 0; o < e.length; o++) {
                  var i = e[o]
                  y(t, i, n, r)
                }
            },
            m = function (t, e, n) {
              if (void 0 !== t.__watchers__ && void 0 !== t.__watchers__[e])
                if (void 0 === n) delete t.__watchers__[e]
                else
                  for (var r = 0; r < t.__watchers__[e].length; r++)
                    t.__watchers__[e][r] === n && t.__watchers__[e].splice(r, 1)
            },
            _ = function (t, e, n) {
              for (var r in e) e.hasOwnProperty(r) && m(t, e[r], n)
            },
            w = function t(e, n) {
              var r = []
              for (var o in e)
                e.hasOwnProperty(o) && (e[o] instanceof Object && t(e[o], n), r.push(o))
              _(e, r, n)
            },
            E = function (t, e) {
              if (!(t instanceof String || ((!t) instanceof Object && !a(t))))
                if (a(t)) {
                  for (var n = ['__watchall__'], r = 0; r < t.length; r++) n.push(r)
                  _(t, n, e)
                } else w(t, e)
            }
        },
        function (t, e) {
          var n = (t.exports = { version: '1.2.6' })
          'number' == typeof __e && (__e = n)
        },
        function (t, e) {
          var n = Object
          t.exports = {
            create: n.create,
            getProto: n.getPrototypeOf,
            isEnum: {}.propertyIsEnumerable,
            getDesc: n.getOwnPropertyDescriptor,
            setDesc: n.defineProperty,
            setDescs: n.defineProperties,
            getKeys: n.keys,
            getNames: n.getOwnPropertyNames,
            getSymbols: n.getOwnPropertySymbols,
            each: [].forEach
          }
        },
        function (t, e, n) {
          t.exports = { default: n(5), __esModule: !0 }
        },
        function (t, e, n) {
          t.exports = { default: n(6), __esModule: !0 }
        },
        function (t, e, n) {
          var r = n(2)
          t.exports = function (t, e, n) {
            return r.setDesc(t, e, n)
          }
        },
        function (t, e, n) {
          var r = n(2)
          n(17),
            (t.exports = function (t, e) {
              return r.getDesc(t, e)
            })
        },
        function (t, e) {
          t.exports = function (t) {
            if ('function' != typeof t) throw TypeError(t + ' is not a function!')
            return t
          }
        },
        function (t, e) {
          var n = {}.toString
          t.exports = function (t) {
            return n.call(t).slice(8, -1)
          }
        },
        function (t, e, n) {
          var r = n(7)
          t.exports = function (t, e, n) {
            if ((r(t), void 0 === e)) return t
            switch (n) {
              case 1:
                return function (n) {
                  return t.call(e, n)
                }
              case 2:
                return function (n, r) {
                  return t.call(e, n, r)
                }
              case 3:
                return function (n, r, o) {
                  return t.call(e, n, r, o)
                }
            }
            return function () {
              return t.apply(e, arguments)
            }
          }
        },
        function (t, e) {
          t.exports = function (t) {
            if (null == t) throw TypeError("Can't call method on  " + t)
            return t
          }
        },
        function (t, e, n) {
          var r = n(13),
            o = n(1),
            i = n(9),
            a = 'prototype',
            c = function (t, e, n) {
              var u,
                f,
                l,
                s = t & c.F,
                p = t & c.G,
                d = t & c.S,
                h = t & c.P,
                v = t & c.B,
                g = t & c.W,
                y = p ? o : o[e] || (o[e] = {}),
                b = p ? r : d ? r[e] : (r[e] || {})[a]
              for (u in (p && (n = e), n))
                ((f = !s && b && u in b) && u in y) ||
                  ((l = f ? b[u] : n[u]),
                  (y[u] =
                    p && 'function' != typeof b[u]
                      ? n[u]
                      : v && f
                        ? i(l, r)
                        : g && b[u] == l
                          ? (function (t) {
                              var e = function (e) {
                                return this instanceof t ? new t(e) : t(e)
                              }
                              return (e[a] = t[a]), e
                            })(l)
                          : h && 'function' == typeof l
                            ? i(Function.call, l)
                            : l),
                  h && ((y[a] || (y[a] = {}))[u] = l))
            }
          ;(c.F = 1), (c.G = 2), (c.S = 4), (c.P = 8), (c.B = 16), (c.W = 32), (t.exports = c)
        },
        function (t, e) {
          t.exports = function (t) {
            try {
              return !!t()
            } catch (t) {
              return !0
            }
          }
        },
        function (t, e) {
          var n = (t.exports =
            'undefined' != typeof window && window.Math == Math
              ? window
              : 'undefined' != typeof self && self.Math == Math
                ? self
                : Function('return this')())
          'number' == typeof __g && (__g = n)
        },
        function (t, e, n) {
          var r = n(8)
          t.exports = Object('z').propertyIsEnumerable(0)
            ? Object
            : function (t) {
                return 'String' == r(t) ? t.split('') : Object(t)
              }
        },
        function (t, e, n) {
          var r = n(11),
            o = n(1),
            i = n(12)
          t.exports = function (t, e) {
            var n = (o.Object || {})[t] || Object[t],
              a = {}
            ;(a[t] = e(n)),
              r(
                r.S +
                  r.F *
                    i(function () {
                      n(1)
                    }),
                'Object',
                a
              )
          }
        },
        function (t, e, n) {
          var r = n(14),
            o = n(10)
          t.exports = function (t) {
            return r(o(t))
          }
        },
        function (t, e, n) {
          var r = n(16)
          n(15)('getOwnPropertyDescriptor', function (t) {
            return function (e, n) {
              return t(r(e), n)
            }
          })
        }
      ])
    }),
    qn = function (t) {
      return t instanceof HTMLElement
    },
    Hn = {}
  Hn[Bt('toStringTag')] = 'z'
  var Xn = '[object z]' === String(Hn),
    Yn = Bt('toStringTag'),
    Zn =
      'Arguments' ==
      p(
        (function () {
          return arguments
        })()
      ),
    Jn = Xn
      ? p
      : function (t) {
          var e, n, r
          return void 0 === t
            ? 'Undefined'
            : null === t
              ? 'Null'
              : 'string' ==
                  typeof (n = (function (t, e) {
                    try {
                      return t[e]
                    } catch (t) {}
                  })((e = Object(t)), Yn))
                ? n
                : Zn
                  ? p(e)
                  : 'Object' == (r = p(e)) && 'function' == typeof e.callee
                    ? 'Arguments'
                    : r
        },
    Qn = Xn
      ? {}.toString
      : function () {
          return '[object ' + Jn(this) + ']'
        }
  Xn || rt(Object.prototype, 'toString', Qn, { unsafe: !0 })
  var tr = function (t) {
      return '[object Array]' === {}.toString.call(t)
    },
    er = function (t) {
      return 'function' == typeof t
    },
    nr = Math.max,
    rr = Math.min,
    or = Math.floor,
    ir = /\$([$&'`]|\d\d?|<[^>]*>)/g,
    ar = /\$([$&'`]|\d\d?)/g
  xn('replace', 2, function (t, e, n, r) {
    var o = r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
      i = r.REPLACE_KEEPS_$0,
      a = o ? '$' : '$0'
    return [
      function (n, r) {
        var o = v(this),
          i = null == n ? void 0 : n[t]
        return void 0 !== i ? i.call(n, o, r) : e.call(String(o), n, r)
      },
      function (t, r) {
        if ((!o && i) || ('string' == typeof r && -1 === r.indexOf(a))) {
          var u = n(e, t, this, r)
          if (u.done) return u.value
        }
        var f = A(t),
          l = String(this),
          s = 'function' == typeof r
        s || (r = String(r))
        var p = f.global
        if (p) {
          var d = f.unicode
          f.lastIndex = 0
        }
        for (var h = []; ; ) {
          var v = Tn(f, l)
          if (null === v) break
          if ((h.push(v), !p)) break
          '' === String(v[0]) && (f.lastIndex = Pn(l, st(f.lastIndex), d))
        }
        for (var g, y = '', b = 0, m = 0; m < h.length; m++) {
          v = h[m]
          for (
            var _ = String(v[0]), w = nr(rr(ft(v.index), l.length), 0), E = [], S = 1;
            S < v.length;
            S++
          )
            E.push(void 0 === (g = v[S]) ? g : String(g))
          var O = v.groups
          if (s) {
            var x = [_].concat(E, w, l)
            void 0 !== O && x.push(O)
            var j = String(r.apply(void 0, x))
          } else j = c(_, l, w, E, O, r)
          w >= b && ((y += l.slice(b, w) + j), (b = w + _.length))
        }
        return y + l.slice(b)
      }
    ]
    function c(t, n, r, o, i, a) {
      var c = r + t.length,
        u = o.length,
        f = ar
      return (
        void 0 !== i && ((i = Mt(i)), (f = ir)),
        e.call(a, f, function (e, a) {
          var f
          switch (a.charAt(0)) {
            case '$':
              return '$'
            case '&':
              return t
            case '`':
              return n.slice(0, r)
            case "'":
              return n.slice(c)
            case '<':
              f = i[a.slice(1, -1)]
              break
            default:
              var l = +a
              if (0 === l) return e
              if (l > u) {
                var s = or(l / 10)
                return 0 === s
                  ? e
                  : s <= u
                    ? void 0 === o[s - 1]
                      ? a.charAt(1)
                      : o[s - 1] + a.charAt(1)
                    : e
              }
              f = o[l - 1]
          }
          return void 0 === f ? '' : f
        })
      )
    }
  })
  var cr,
    ur,
    fr,
    lr = function (t) {
      return t.replace(/([A-Z])/g, function (t) {
        return '-'.concat(t).toLowerCase()
      })
    },
    sr = wt.f,
    pr = {}.toString,
    dr =
      'object' == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : [],
    hr = {
      f: function (t) {
        return dr && '[object Window]' == pr.call(t)
          ? (function (t) {
              try {
                return sr(t)
              } catch (t) {
                return dr.slice()
              }
            })(t)
          : sr(g(t))
      }
    },
    vr = { f: Bt },
    gr = T.f,
    yr = T.f,
    br = Bt('toStringTag'),
    mr = qt.forEach,
    _r = K('hidden'),
    wr = 'Symbol',
    Er = Bt('toPrimitive'),
    Sr = nt.set,
    Or = nt.getterFor(wr),
    xr = Object.prototype,
    jr = o.Symbol,
    Ar = at('JSON', 'stringify'),
    Pr = j.f,
    Tr = T.f,
    Ir = hr.f,
    Cr = f.f,
    Nr = G('symbols'),
    Rr = G('op-symbols'),
    Lr = G('string-to-symbol-registry'),
    Mr = G('symbol-to-string-registry'),
    Dr = G('wks'),
    kr = o.QObject,
    Fr = !kr || !kr.prototype || !kr.prototype.findChild,
    Ur =
      a &&
      i(function () {
        return (
          7 !=
          Fe(
            Tr({}, 'a', {
              get: function () {
                return Tr(this, 'a', { value: 7 }).a
              }
            })
          ).a
        )
      })
        ? function (t, e, n) {
            var r = Pr(xr, e)
            r && delete xr[e], Tr(t, e, n), r && t !== xr && Tr(xr, e, r)
          }
        : Tr,
    $r = function (t, e) {
      var n = (Nr[t] = Fe(jr.prototype))
      return Sr(n, { type: wr, tag: t, description: e }), a || (n.description = e), n
    },
    Gr = Ft
      ? function (t) {
          return 'symbol' == typeof t
        }
      : function (t) {
          return Object(t) instanceof jr
        },
    Br = function (t, e, n) {
      t === xr && Br(Rr, e, n), A(t)
      var r = b(e, !0)
      return (
        A(n),
        _(Nr, r)
          ? (n.enumerable
              ? (_(t, _r) && t[_r][r] && (t[_r][r] = !1), (n = Fe(n, { enumerable: l(0, !1) })))
              : (_(t, _r) || Tr(t, _r, l(1, {})), (t[_r][r] = !0)),
            Ur(t, r, n))
          : Tr(t, r, n)
      )
    },
    Vr = function (t, e) {
      A(t)
      var n = g(e),
        r = Ce(n).concat(qr(n))
      return (
        mr(r, function (e) {
          ;(a && !zr.call(n, e)) || Br(t, e, n[e])
        }),
        t
      )
    },
    zr = function (t) {
      var e = b(t, !0),
        n = Cr.call(this, e)
      return (
        !(this === xr && _(Nr, e) && !_(Rr, e)) &&
        (!(n || !_(this, e) || !_(Nr, e) || (_(this, _r) && this[_r][e])) || n)
      )
    },
    Wr = function (t, e) {
      var n = g(t),
        r = b(e, !0)
      if (n !== xr || !_(Nr, r) || _(Rr, r)) {
        var o = Pr(n, r)
        return !o || !_(Nr, r) || (_(n, _r) && n[_r][r]) || (o.enumerable = !0), o
      }
    },
    Kr = function (t) {
      var e = Ir(g(t)),
        n = []
      return (
        mr(e, function (t) {
          _(Nr, t) || _(q, t) || n.push(t)
        }),
        n
      )
    },
    qr = function (t) {
      var e = t === xr,
        n = Ir(e ? Rr : g(t)),
        r = []
      return (
        mr(n, function (t) {
          !_(Nr, t) || (e && !_(xr, t)) || r.push(Nr[t])
        }),
        r
      )
    }
  ;(kt ||
    (rt(
      (jr = function () {
        if (this instanceof jr) throw TypeError('Symbol is not a constructor')
        var t = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,
          e = z(t),
          n = function (t) {
            this === xr && n.call(Rr, t),
              _(this, _r) && _(this[_r], e) && (this[_r][e] = !1),
              Ur(this, e, l(1, t))
          }
        return a && Fr && Ur(xr, e, { configurable: !0, set: n }), $r(e, t)
      }).prototype,
      'toString',
      function () {
        return Or(this).tag
      }
    ),
    rt(jr, 'withoutSetter', function (t) {
      return $r(z(t), t)
    }),
    (f.f = zr),
    (T.f = Br),
    (j.f = Wr),
    (wt.f = hr.f = Kr),
    (Et.f = qr),
    (vr.f = function (t) {
      return $r(Bt(t), t)
    }),
    a &&
      (Tr(jr.prototype, 'description', {
        configurable: !0,
        get: function () {
          return Or(this).description
        }
      }),
      rt(xr, 'propertyIsEnumerable', zr, { unsafe: !0 }))),
  Rt({ global: !0, wrap: !0, forced: !kt, sham: !kt }, { Symbol: jr }),
  mr(Ce(Dr), function (t) {
    !(function (t) {
      var e = ot.Symbol || (ot.Symbol = {})
      _(e, t) || gr(e, t, { value: vr.f(t) })
    })(t)
  }),
  Rt(
    { target: wr, stat: !0, forced: !kt },
    {
      for: function (t) {
        var e = String(t)
        if (_(Lr, e)) return Lr[e]
        var n = jr(e)
        return (Lr[e] = n), (Mr[n] = e), n
      },
      keyFor: function (t) {
        if (!Gr(t)) throw TypeError(t + ' is not a symbol')
        if (_(Mr, t)) return Mr[t]
      },
      useSetter: function () {
        Fr = !0
      },
      useSimple: function () {
        Fr = !1
      }
    }
  ),
  Rt(
    { target: 'Object', stat: !0, forced: !kt, sham: !a },
    {
      create: function (t, e) {
        return void 0 === e ? Fe(t) : Vr(Fe(t), e)
      },
      defineProperty: Br,
      defineProperties: Vr,
      getOwnPropertyDescriptor: Wr
    }
  ),
  Rt(
    { target: 'Object', stat: !0, forced: !kt },
    { getOwnPropertyNames: Kr, getOwnPropertySymbols: qr }
  ),
  Rt(
    {
      target: 'Object',
      stat: !0,
      forced: i(function () {
        Et.f(1)
      })
    },
    {
      getOwnPropertySymbols: function (t) {
        return Et.f(Mt(t))
      }
    }
  ),
  Ar) &&
    Rt(
      {
        target: 'JSON',
        stat: !0,
        forced:
          !kt ||
          i(function () {
            var t = jr()
            return '[null]' != Ar([t]) || '{}' != Ar({ a: t }) || '{}' != Ar(Object(t))
          })
      },
      {
        stringify: function (t, e, n) {
          for (var r, o = [t], i = 1; arguments.length > i; ) o.push(arguments[i++])
          if (((r = e), (y(e) || void 0 !== t) && !Gr(t)))
            return (
              Dt(e) ||
                (e = function (t, e) {
                  if (('function' == typeof r && (e = r.call(this, t, e)), !Gr(e))) return e
                }),
              (o[1] = e),
              Ar.apply(null, o)
            )
        }
      }
    )
  jr.prototype[Er] || I(jr.prototype, Er, jr.prototype.valueOf),
    (ur = wr),
    (cr = jr) &&
      !_((cr = fr ? cr : cr.prototype), br) &&
      yr(cr, br, { configurable: !0, value: ur }),
    (q[_r] = !0),
    Rt(
      {
        target: 'Object',
        stat: !0,
        forced: i(function () {
          Ce(1)
        })
      },
      {
        keys: function (t) {
          return Ce(Mt(t))
        }
      }
    )
  var Hr = function (t) {
      for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
        n[r - 1] = arguments[r]
      return (
        n.forEach(function (e) {
          if (e) {
            var n = Object.keys(e).reduce(function (t, n) {
              return (t[n] = Object.getOwnPropertyDescriptor(e, n)), t
            }, {})
            Object.getOwnPropertySymbols(e).forEach(function (t) {
              var r = Object.getOwnPropertyDescriptor(e, t)
              r.enumerable && (n[t] = r)
            }),
              Object.defineProperties(t, n)
          }
        }),
        t
      )
    },
    Xr = function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
      return (
        ((t = Hr({}, t)).readOnly = t.readOnly || !1),
        (t.reflectToAttribute = t.reflectToAttribute || !1),
        (t.value = t.value),
        (t.type = t.type),
        t
      )
    },
    Yr = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 ? arguments[2] : void 0,
        r = {
          enumerable: !0,
          configurable: !0,
          writable: !(e = Xr(e)).readOnly,
          value: er(e.value) ? e.value.call(n) : e.value
        }
      Object.defineProperty(n, t, r)
    },
    Zr = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 ? arguments[2] : void 0,
        r = arguments.length > 3 ? arguments[3] : void 0
      ;(!(e = Xr(e)).value && 0 !== e.value) ||
        n[t] ||
        (e.type === Boolean
          ? (n[t] = (!e.reflectToAttribute || 'false' !== r.dataset[t]) && e.value)
          : er(e.value)
            ? (n[t] = e.value.call(n))
            : (n[t] = e.value))
    },
    Jr = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 ? arguments[2] : void 0
      if ((e = Xr(e)).reflectToAttribute) {
        var r = lr('data-'.concat(t)),
          o = Object.getOwnPropertyDescriptor(n, t),
          i = {
            enumerable: o.enumerable,
            configurable: o.configurable,
            get: function () {
              return e.type === Boolean
                ? '' === this.element.dataset[t]
                : e.type === Number
                  ? Number(this.element.dataset[t])
                  : this.element.dataset[t]
            },
            set: function (n) {
              var o = !n && 0 !== n
              if (e.type === Boolean || o)
                return this.element[o ? 'removeAttribute' : 'setAttribute'](
                  r,
                  e.type === Boolean ? '' : n
                )
              this.element.dataset[t] = n
            }
          }
        Object.defineProperty(n, t, i)
      }
    },
    Qr = function (t, e) {
      var n = t.split('.'),
        r = n.pop()
      return {
        parent: (function (t, e) {
          return t.split('.').reduce(function (t, e) {
            return t[e]
          }, e)
        })(n.join('.'), e),
        prop: r
      }
    },
    to = function (t) {
      return tr(t.observers)
        ? t.observers
            .map(function (t) {
              var e = Bn(t.match(/([a-zA-Z-_]+)\(([^)]*)\)/), 3),
                n = e[1],
                r = e[2]
              return {
                fn: n,
                args: (r = r
                  .split(',')
                  .map(function (t) {
                    return t.trim()
                  })
                  .filter(function (t) {
                    return t.length
                  }))
              }
            })
            .filter(function (e) {
              var n = e.fn
              return er(t[n])
            })
        : []
    },
    eo = function (t) {
      return tr(t.listeners)
        ? t.listeners
            .map(function (t) {
              var e = Bn(t.match(/(.*\.)?([a-zA-Z-_]+)\(([^)]*)\)/), 4),
                n = e[1],
                r = e[2],
                o = e[3]
              return (
                (o = o
                  .split(',')
                  .map(function (t) {
                    return t.trim()
                  })
                  .filter(function (t) {
                    return t.length
                  })),
                {
                  element: (n = n ? n.substr(0, n.length - 1) : 'element'),
                  fn: r,
                  events: o
                }
              )
            })
            .filter(function (e) {
              var n = e.element,
                r = e.fn
              return (
                er(t[r]) &&
                ('document' === n || 'window' === n || qn(t[n]) || (t[n] && qn(t[n].element)))
              )
            })
        : []
    },
    no = function (t) {
      var e = (function (t) {
        return tr(t.mixins)
          ? t.mixins.filter(function (t) {
              return 'object' === Gn(t)
            })
          : []
      })(t)
      return e.unshift({}), Hr.apply(null, e)
    },
    ro = function (t, e) {
      if (t && 'object' === Gn(t) && qn(e)) {
        t.element = e
        var n = {
          $set: function (t, e) {
            if (
              t &&
              void 0 !== e &&
              void 0 !== this.properties &&
              this.properties.hasOwnProperty(t)
            ) {
              var n = Xr(this.properties[t]),
                r = Object.getOwnPropertyDescriptor(this, t)
              if (n.readOnly && void 0 !== r.writable) {
                var o = {
                  enumerable: r.enumerable,
                  configurable: r.configurable,
                  writable: !1,
                  value: e
                }
                Object.defineProperty(this, t, o)
              } else this[t] = e
            }
          },
          init: function () {
            var e
            to((e = this)).forEach(function (t) {
              var n = t.fn,
                r = t.args
              ;(e[n] = e[n].bind(e)),
                r.forEach(function (t) {
                  if (-1 !== t.indexOf('.')) {
                    var r = Qr(t, e),
                      o = r.prop,
                      i = r.parent
                    Kn.watch(i, o, e[n])
                  } else Kn.watch(e, t, e[n])
                })
            }),
              (function (t) {
                eo(t).forEach(function (e) {
                  var n = e.element,
                    r = e.fn,
                    o = e.events
                  ;(t[r] = t[r].bind(t)),
                    'document' === n
                      ? (n = t.element.ownerDocument)
                      : 'window' === n
                        ? (n = window)
                        : qn(t[n])
                          ? (n = t[n])
                          : qn(t[n].element) && (n = t[n].element),
                    n &&
                      o.forEach(function (e) {
                        return n.addEventListener(e, t[r])
                      })
                })
              })(this),
              er(t.init) && t.init.call(this)
          },
          destroy: function () {
            var e = this
            to(t).forEach(function (t) {
              var n = t.fn
              t.args.forEach(function (t) {
                if (-1 !== t.indexOf('.')) {
                  var r = Qr(t, e),
                    o = r.prop,
                    i = r.parent
                  Kn.unwatch(i, o, e[n])
                } else Kn.unwatch(e, t, e[n])
              })
            }),
              eo(t).forEach(function (t) {
                var n = t.element,
                  r = t.fn,
                  o = t.events
                'document' === n
                  ? (n = e.element.ownerDocument)
                  : 'window' === n
                    ? (n = window)
                    : qn(e[n])
                      ? (n = e[n])
                      : qn(e[n].element) && (n = e[n].element),
                  n &&
                    o.forEach(function (t) {
                      return n.removeEventListener(t, e[r])
                    })
              }),
              er(t.destroy) && t.destroy.call(this)
          },
          fire: function (t) {
            var e,
              n = !1
            if ('CustomEvent' in window && 'object' === Gn(window.CustomEvent))
              try {
                e = new CustomEvent(t, { bubbles: n, cancelable: !1 })
              } catch (r) {
                e = new this.CustomEvent_(t, { bubbles: n, cancelable: !1 })
              }
            else (e = document.createEvent('Event')).initEvent(t, n, !0)
            this.element.dispatchEvent(e)
          },
          CustomEvent_: function (t, e) {
            e = e || { bubbles: !1, cancelable: !1, detail: void 0 }
            var n = document.createEvent('CustomEvent')
            return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
          }
        }
        return (
          (function (t, e) {
            if ('object' === Gn(t.properties))
              for (var n in t.properties)
                if (t.properties.hasOwnProperty(n)) {
                  var r = t.properties[n]
                  Yr(n, r, t), Jr(n, r, t), Zr(n, r, t, e)
                }
          })(t, e),
          (n = Hr({}, no(t), t, n)).init(),
          n
        )
      }
      console.error('[dom-factory] Invalid factory.', t, e)
    },
    oo = Bt('unscopables'),
    io = Array.prototype
  null == io[oo] && T.f(io, oo, { configurable: !0, value: Fe(null) })
  var ao = qt.find,
    co = 'find',
    uo = !0,
    fo = oe(co)
  co in [] &&
    Array(1).find(function () {
      uo = !1
    }),
    Rt(
      { target: 'Array', proto: !0, forced: uo || !fo },
      {
        find: function (t) {
          return ao(this, t, arguments.length > 1 ? arguments[1] : void 0)
        }
      }
    ),
    (function (t) {
      io[oo][t] = !0
    })(co)
  var lo = function (t, e, n) {
      var r = b(e)
      r in t ? T.f(t, r, l(0, n)) : (t[r] = n)
    },
    so = te('splice'),
    po = oe('splice', { ACCESSORS: !0, 0: 0, 1: 2 }),
    ho = Math.max,
    vo = Math.min,
    go = 9007199254740991,
    yo = 'Maximum allowed length exceeded'
  Rt(
    { target: 'Array', proto: !0, forced: !so || !po },
    {
      splice: function (t, e) {
        var n,
          r,
          o,
          i,
          a,
          c,
          u = Mt(this),
          f = st(u.length),
          l = ht(t, f),
          s = arguments.length
        if (
          (0 === s
            ? (n = r = 0)
            : 1 === s
              ? ((n = 0), (r = f - l))
              : ((n = s - 2), (r = vo(ho(ft(e), 0), f - l))),
          f + n - r > go)
        )
          throw TypeError(yo)
        for (o = zt(u, r), i = 0; i < r; i++) (a = l + i) in u && lo(o, i, u[a])
        if (((o.length = r), n < r)) {
          for (i = l; i < f - r; i++) (c = i + n), (a = i + r) in u ? (u[c] = u[a]) : delete u[c]
          for (i = f; i > f - r + n; i--) delete u[i - 1]
        } else if (n > r)
          for (i = f - r; i > l; i--)
            (c = i + n - 1), (a = i + r - 1) in u ? (u[c] = u[a]) : delete u[c]
        for (i = 0; i < n; i++) u[i + l] = arguments[i + 2]
        return (u.length = f - r + n), o
      }
    }
  )
  var bo = Object.assign,
    mo = Object.defineProperty,
    _o =
      !bo ||
      i(function () {
        if (
          a &&
          1 !==
            bo(
              { b: 1 },
              bo(
                mo({}, 'a', {
                  enumerable: !0,
                  get: function () {
                    mo(this, 'b', { value: 3, enumerable: !1 })
                  }
                }),
                { b: 2 }
              )
            ).b
        )
          return !0
        var t = {},
          e = {},
          n = Symbol(),
          r = 'abcdefghijklmnopqrst'
        return (
          (t[n] = 7),
          r.split('').forEach(function (t) {
            e[t] = t
          }),
          7 != bo({}, t)[n] || Ce(bo({}, e)).join('') != r
        )
      })
        ? function (t, e) {
            for (var n = Mt(t), r = arguments.length, o = 1, i = Et.f, c = f.f; r > o; )
              for (
                var u,
                  l = h(arguments[o++]),
                  s = i ? Ce(l).concat(i(l)) : Ce(l),
                  p = s.length,
                  d = 0;
                p > d;

              )
                (u = s[d++]), (a && !c.call(l, u)) || (n[u] = l[u])
            return n
          }
        : bo
  Rt({ target: 'Object', stat: !0, forced: Object.assign !== _o }, { assign: _o })
  var wo = function (t) {
      return t.replace(/(\-[a-z])/g, function (t) {
        return t.toUpperCase().replace('-', '')
      })
    },
    Eo = '__domFactoryConfig',
    So = {
      autoInit: function () {
        ;['DOMContentLoaded', 'load'].forEach(function (t) {
          window.addEventListener(t, function () {
            return So.upgradeAll()
          })
        })
      },
      _registered: [],
      _created: [],
      register: function (t, e) {
        var n = 'js-'.concat(t)
        this.findRegistered(t) ||
          this._registered.push({
            id: t,
            cssClass: n,
            callbacks: [],
            factory: e
          })
      },
      registerUpgradedCallback: function (t, e) {
        var n = this.findRegistered(t)
        n && n.callbacks.push(e)
      },
      findRegistered: function (t) {
        return this._registered.find(function (e) {
          return e.id === t
        })
      },
      findCreated: function (t) {
        return this._created.filter(function (e) {
          return e.element === t
        })
      },
      upgradeElement: function (t, e) {
        var n = this
        if (void 0 !== e) {
          var r = t.getAttribute('data-domfactory-upgraded'),
            o = this.findRegistered(e)
          if (!o || (null !== r && -1 !== r.indexOf(e))) {
            if (o) {
              var i = t[wo(e)]
              'function' == typeof i._reset && i._reset()
            }
          } else {
            var a
            ;(r = null === r ? [] : r.split(',')).push(e)
            try {
              a = ro(o.factory(t), t)
            } catch (t) {
              console.error(e, t.message, t.stack)
            }
            if (a) {
              t.setAttribute('data-domfactory-upgraded', r.join(','))
              var c = Object.assign({}, o)
              delete c.factory,
                (a[Eo] = c),
                this._created.push(a),
                Object.defineProperty(t, wo(e), {
                  configurable: !0,
                  writable: !1,
                  value: a
                }),
                o.callbacks.forEach(function (e) {
                  return e(t)
                }),
                a.fire('domfactory-component-upgraded')
            }
          }
        } else
          this._registered.forEach(function (e) {
            t.classList.contains(e.cssClass) && n.upgradeElement(t, e.id)
          })
      },
      upgrade: function (t) {
        var e = this
        if (void 0 === t) this.upgradeAll()
        else {
          var n = this.findRegistered(t)
          if (n)
            Vn(document.querySelectorAll('.' + n.cssClass)).forEach(function (n) {
              return e.upgradeElement(n, t)
            })
        }
      },
      upgradeAll: function () {
        var t = this
        this._registered.forEach(function (e) {
          return t.upgrade(e.id)
        })
      },
      downgradeComponent: function (t) {
        t.destroy()
        var e = this._created.indexOf(t)
        this._created.splice(e, 1)
        var n = t.element.getAttribute('data-domfactory-upgraded').split(','),
          r = n.indexOf(t[Eo].id)
        n.splice(r, 1),
          t.element.setAttribute('data-domfactory-upgraded', n.join(',')),
          t.fire('domfactory-component-downgraded')
      },
      downgradeElement: function (t) {
        this.findCreated(t).forEach(this.downgradeComponent, this)
      },
      downgradeAll: function () {
        this._created.forEach(this.downgradeComponent, this)
      },
      downgrade: function (t) {
        var e = this
        t instanceof Array || t instanceof NodeList
          ? (t instanceof NodeList ? Vn(t) : t).forEach(function (t) {
              return e.downgradeElement(t)
            })
          : t instanceof Node && this.downgradeElement(t)
      }
    },
    Oo = {
      assign: Hr,
      isArray: tr,
      isElement: qn,
      isFunction: er,
      toKebabCase: lr,
      transform: function (t, e) {
        ;['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'].map(
          function (n) {
            return (e.style[n] = t)
          }
        )
      }
    }
  ;(t.factory = ro),
    (t.handler = So),
    (t.util = Oo),
    Object.defineProperty(t, '__esModule', { value: !0 })
})
