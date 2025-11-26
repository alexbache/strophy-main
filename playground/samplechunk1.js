import { a as re } from './chunk-7CAOOJVW.js';
import { a as b } from './chunk-CB6LZ537.js';
import { c as $ } from './chunk-GGDEANQW.js';
import { c as ne } from './chunk-K46K3RI5.js';
import { f as M } from './chunk-N2ZCN6XY.js';
import { r as O } from './chunk-REJ3R5JH.js';
import { a as _ } from './chunk-UAA7M346.js';
import { b as q, f as x } from './chunk-WIALCYDY.js';
import { h as V, i as v } from './chunk-XRTLPMPO.js';
var le = '1.6.13';
function se(o) {
  if (Array.isArray(o)) {
    for (var e = 0, t = Array(o.length); e < o.length; e++) t[e] = o[e];
    return t;
  }
  return Array.from(o);
}
var B = !1;
typeof window < 'u' &&
  ((L = {
    get passive() {
      B = !0;
    },
  }),
  window.addEventListener('testPassive', null, L),
  window.removeEventListener('testPassive', null, L));
var L,
  g =
    typeof window < 'u' &&
    window.navigator &&
    window.navigator.platform &&
    (/iP(ad|hone|od)/.test(window.navigator.platform) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)),
  u = [],
  y = !1,
  k = -1,
  f = void 0,
  a = void 0,
  m = void 0,
  Y = function (e) {
    return u.some(function (t) {
      return !!(t.options.allowTouchMove && t.options.allowTouchMove(e));
    });
  },
  S = function (e) {
    var t = e || window.event;
    return Y(t.target) || t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1);
  },
  ae = function (e) {
    if (m === void 0) {
      var t = !!e && e.reserveScrollBarGap === !0,
        r = window.innerWidth - document.documentElement.clientWidth;
      if (t && r > 0) {
        var n = parseInt(
          window.getComputedStyle(document.body).getPropertyValue('padding-right'),
          10
        );
        (m = document.body.style.paddingRight), (document.body.style.paddingRight = n + r + 'px');
      }
    }
    f === void 0 && ((f = document.body.style.overflow), (document.body.style.overflow = 'hidden'));
  },
  ce = function () {
    m !== void 0 && ((document.body.style.paddingRight = m), (m = void 0)),
      f !== void 0 && ((document.body.style.overflow = f), (f = void 0));
  },
  de = function () {
    return window.requestAnimationFrame(function () {
      if (a === void 0) {
        a = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
        };
        var e = window,
          t = e.scrollY,
          r = e.scrollX,
          n = e.innerHeight;
        (document.body.style.position = 'fixed'),
          (document.body.style.top = -t),
          (document.body.style.left = -r),
          setTimeout(function () {
            return window.requestAnimationFrame(function () {
              var i = n - window.innerHeight;
              i && t >= n && (document.body.style.top = -(t + i));
            });
          }, 300);
      }
    });
  },
  ue = function () {
    if (a !== void 0) {
      var e = -parseInt(document.body.style.top, 10),
        t = -parseInt(document.body.style.left, 10);
      (document.body.style.position = a.position),
        (document.body.style.top = a.top),
        (document.body.style.left = a.left),
        window.scrollTo(t, e),
        (a = void 0);
    }
  },
  fe = function (e) {
    return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1;
  },
  me = function (e, t) {
    var r = e.targetTouches[0].clientY - k;
    return Y(e.target)
      ? !1
      : (t && t.scrollTop === 0 && r > 0) || (fe(t) && r < 0)
        ? S(e)
        : (e.stopPropagation(), !0);
  },
  W = function (e, t) {
    if (!e) {
      console.error(
        'disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.'
      );
      return;
    }
    if (
      !u.some(function (n) {
        return n.targetElement === e;
      })
    ) {
      var r = { targetElement: e, options: t || {} };
      (u = [].concat(se(u), [r])),
        g ? de() : ae(t),
        g &&
          ((e.ontouchstart = function (n) {
            n.targetTouches.length === 1 && (k = n.targetTouches[0].clientY);
          }),
          (e.ontouchmove = function (n) {
            n.targetTouches.length === 1 && me(n, e);
          }),
          y || (document.addEventListener('touchmove', S, B ? { passive: !1 } : void 0), (y = !0)));
    }
  },
  z = function () {
    g &&
      (u.forEach(function (e) {
        (e.targetElement.ontouchstart = null), (e.targetElement.ontouchmove = null);
      }),
      y && (document.removeEventListener('touchmove', S, B ? { passive: !1 } : void 0), (y = !1)),
      (k = -1)),
      g ? ue() : ce(),
      (u = []);
  };
var { body: D } = document,
  j = !0,
  H = !1,
  w,
  I = () => H,
  U = (o) => {
    j = o;
  },
  h = (o) => {
    (w = window.scrollY),
      (H = !0),
      W(o, { reserveScrollBarGap: j }),
      D.style.setProperty('top', `${w * -1}px`);
  },
  E = () => {
    (H = !1), z(), D.style.setProperty('top', ''), w && D.scrollTo(0, w);
  },
  T = (o) => {
    if (x(o)) return o;
    let e = o.querySelectorAll('*');
    for (let t of e) if (v(t) && x(t)) return t;
  };
var C = ['when-visible', 'enable', 'disable', 'toggle', 'smart-nav', 'preserve'],
  P = { media: { key: 'media' }, gap: { key: 'gap', values: ['true', 'false'] } },
  X = { medium: '(max-width: 991px)', small: '(max-width: 767px)', tiny: '(max-width: 479px)' };
var {
  getElementSelector: c,
  getAttribute: A,
  queryAllElements: J,
  getSettingSelector: K,
  hasAttributeValue: Q,
} = _(O, C, P);
var Z = (o) =>
  b(window, 'click', ({ target: t }) => {
    if (!V(t)) return;
    let r = t.closest(c('toggle')),
      n = r || t.closest(c('disable')),
      i = r || t.closest(c('enable')),
      s = n || i;
    if (!s) return;
    let d = A(s, 'media');
    if (!(d && !window.matchMedia(d).matches)) {
      if (I() && i) E();
      else if (!I() && v(n)) for (let l of new Set([...o, T(n) || n])) h(l);
    }
  });
var N = ne(re(), 1);
var ee = new Map(),
  R = (o, e) => {
    let t = ee.get(o);
    if (!t) return;
    let { matchMedia: r, firstScrollableElement: n, visible: i } = t;
    if (r && !window.matchMedia(r).matches) return;
    let s = q(o);
    if (s !== i) {
      if ((i && E(), s)) for (let d of new Set([...e, n])) h(d);
      t.visible = s;
    }
  },
  te = (o) => {
    let e = c('smart-nav'),
      t = document.querySelectorAll(`${c('when-visible')}, ${e}.${M.navMenu}, ${e} .${M.navMenu}`),
      n = (0, N.default)((l) => {
        let p = l[0].target;
        R(p, o);
      }, 25),
      i = new MutationObserver(n);
    for (let l of t) {
      let p = A(l, 'media'),
        F = l.closest('.w-nav');
      if (F) {
        let G = F.dataset.collapse;
        G && (p = X[G]);
      }
      let oe = T(l) || l;
      ee.set(l, { firstScrollableElement: oe, matchMedia: p }),
        R(l, o),
        i.observe(l, { attributes: !0, attributeFilter: ['style', 'class'] });
    }
    let s = (0, N.default)(() => {
        for (let l of t) R(l, o);
      }, 250),
      d = b(window, 'resize', s);
    return () => {
      i.disconnect(), d();
    };
  };
var pe = async () => {
  await $();
  let o = J('preserve'),
    e = !0,
    t = document.querySelector(K('gap'));
  t && Q(t, 'gap', 'false') && (e = !1), U(e);
  let n = Z(o),
    i = te(o);
  return {
    destroy() {
      n(), i();
    },
  };
};
export { C as ELEMENTS, pe as init, P as SETTINGS, le as version };
