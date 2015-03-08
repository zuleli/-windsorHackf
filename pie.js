/* Copyright Factmint Ltd, not for distribution without consent; version 2.6.17; includes SnapSVG, https://github.com/adobe-webplatform/Snap.svg/blob/master/LICENSE */
/*
 almond 0.3.0 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/almond for details
 
 Modified by Zule Li
*/
'use strict';
var requirejs, require, define;
(function(v) {
    function f(h, a) {
        var b, d, c, f, e, s, x, l, t, m = a && a.split("/"),
            B = q.map,
            k = B && B["*"] || {};
        if (h && "." === h.charAt(0))
            if (a) {
                m = m.slice(0, m.length - 1);
                h = h.split("/");
                e = h.length - 1;
                q.nodeIdCompat && n.test(h[e]) && (h[e] = h[e].replace(n, ""));
                h = m.concat(h);
                for (e = 0; e < h.length; e += 1)
                    if (b = h[e], "." === b) h.splice(e, 1), --e;
                    else if (".." === b)
                    if (1 !== e || ".." !== h[2] && ".." !== h[0]) 0 < e && (h.splice(e - 1, 2), e -= 2);
                    else break;
                h = h.join("/")
            } else 0 === h.indexOf("./") && (h = h.substring(2));
        if ((m || k) && B) {
            b = h.split("/");
            for (e = b.length; 0 <
                e; --e) {
                d = b.slice(0, e).join("/");
                if (m)
                    for (t = m.length; 0 < t; --t)
                        if (c = B[m.slice(0, t).join("/")])
                            if (c = c[d]) {
                                f = c;
                                s = e;
                                break
                            }
                if (f) break;
                !x && k && k[d] && (x = k[d], l = e)
            }!f && x && (f = x, s = l);
            f && (b.splice(0, s, f), h = b.join("/"))
        }
        return h
    }

    function k(h, a) {
        return function() {
            var b = B.call(arguments, 0);
            "string" !== typeof b[0] && 1 === b.length && b.push(null);
            return l.apply(v, b.concat([h, a]))
        }
    }

    function p(h) {
        return function(a) {
            return f(a, h)
        }
    }

    function a(h) {
        return function(a) {
            c[h] = a
        }
    }

    function e(h) {
        if (b.call(s, h)) {
            var a = s[h];
            delete s[h];
            x[h] = !0;
            w.apply(v, a)
        }
        if (!b.call(c, h) && !b.call(x, h)) throw Error("No " + h);
        return c[h]
    }

    function m(h) {
        var a, b = h ? h.indexOf("!") : -1; - 1 < b && (a = h.substring(0, b), h = h.substring(b + 1, h.length));
        return [a, h]
    }

    function u(h) {
        return function() {
            return q && q.config && q.config[h] || {}
        }
    }
    var w, l, t, d, c = {},
        s = {},
        q = {},
        x = {},
        b = Object.prototype.hasOwnProperty,
        B = [].slice,
        n = /\.js$/;
    t = function(h, a) {
        var b, d = m(h),
            c = d[0];
        h = d[1];
        c && (c = f(c, a), b = e(c));
        c ? h = b && b.normalize ? b.normalize(h, p(a)) : f(h, a) : (h = f(h, a), d = m(h), c = d[0], h = d[1], c && (b = e(c)));
        return {
            f: c ? c + "!" + h : h,
            n: h,
            pr: c,
            p: b
        }
    };
    d = {
        require: function(h) {
            return k(h)
        },
        exports: function(h) {
            var a = c[h];
            return "undefined" !== typeof a ? a : c[h] = {}
        },
        module: function(h) {
            return {
                id: h,
                uri: "",
                exports: c[h],
                config: u(h)
            }
        }
    };
    w = function(h, f, n, l) {
        var y, D, m, q, B = [];
        D = typeof n;
        var w;
        l = l || h;
        if ("undefined" === D || "function" === D) {
            f = !f.length && n.length ? ["require", "exports", "module"] : f;
            for (q = 0; q < f.length; q += 1)
                if (m = t(f[q], l), D = m.f, "require" === D) B[q] = d.require(h);
                else if ("exports" === D) B[q] = d.exports(h), w = !0;
            else if ("module" ===
                D) y = B[q] = d.module(h);
            else if (b.call(c, D) || b.call(s, D) || b.call(x, D)) B[q] = e(D);
            else if (m.p) m.p.load(m.n, k(l, !0), a(D), {}), B[q] = c[D];
            else throw Error(h + " missing " + D);
            f = n ? n.apply(c[h], B) : void 0;
            h && (y && y.exports !== v && y.exports !== c[h] ? c[h] = y.exports : f === v && w || (c[h] = f))
        } else h && (c[h] = n)
    };
    requirejs = require = l = function(h, a, b, c, f) {
        if ("string" === typeof h) return d[h] ? d[h](a) : e(t(h, a).f);
        if (!h.splice) {
            q = h;
            q.deps && l(q.deps, q.callback);
            if (!a) return;
            a.splice ? (h = a, a = b, b = null) : h = v
        }
        a = a || function() {};
        "function" === typeof b &&
            (b = c, c = f);
        c ? w(v, h, a, b) : setTimeout(function() {
            w(v, h, a, b)
        }, 4);
        return l
    };
    l.config = function(h) {
        return l(h)
    };
    requirejs._defined = c;
    define = function(h, a, d) {
        a.splice || (d = a, a = []);
        b.call(c, h) || b.call(s, h) || (s[h] = [h, a, d])
    };
    define.amd = {
        jQuery: !0
    }
})();
define("almond", function() {});
(function(v) {
    var f = /[\.\/]/,
        k = /\s*,\s*/,
        p = function(a, d) {
            return a - d
        },
        a, e, m = {
            n: {}
        },
        u = function() {
            for (var a = 0, d = this.length; a < d; a++)
                if ("undefined" != typeof this[a]) return this[a]
        },
        w = function() {
            for (var a = this.length; --a;)
                if ("undefined" != typeof this[a]) return this[a]
        },
        l = function(f, d) {
            f = String(f);
            var c = e,
                s = Array.prototype.slice.call(arguments, 2),
                m = l.listeners(f),
                x = 0,
                b, B = [],
                n = {},
                h = [],
                H = a;
            h.firstDefined = u;
            h.lastDefined = w;
            a = f;
            for (var k = e = 0, C = m.length; k < C; k++) "zIndex" in m[k] && (B.push(m[k].zIndex), 0 > m[k].zIndex &&
                (n[m[k].zIndex] = m[k]));
            for (B.sort(p); 0 > B[x];)
                if (b = n[B[x++]], h.push(b.apply(d, s)), e) return e = c, h;
            for (k = 0; k < C; k++)
                if (b = m[k], "zIndex" in b)
                    if (b.zIndex == B[x]) {
                        h.push(b.apply(d, s));
                        if (e) break;
                        do
                            if (x++, (b = n[B[x]]) && h.push(b.apply(d, s)), e) break;
                        while (b)
                    } else n[b.zIndex] = b;
            else if (h.push(b.apply(d, s)), e) break;
            e = c;
            a = H;
            return h
        };
    l._events = m;
    l.listeners = function(a) {
        a = a.split(f);
        var d = m,
            c, e, l, x, b, B, n, h = [d],
            k = [];
        l = 0;
        for (x = a.length; l < x; l++) {
            n = [];
            b = 0;
            for (B = h.length; b < B; b++)
                for (d = h[b].n, c = [d[a[l]], d["*"]], e = 2; e--;)
                    if (d =
                        c[e]) n.push(d), k = k.concat(d.f || []);
            h = n
        }
        return k
    };
    l.on = function(a, d) {
        a = String(a);
        if ("function" != typeof d) return function() {};
        for (var c = a.split(k), e = 0, l = c.length; e < l; e++)(function(a) {
            a = a.split(f);
            for (var b = m, c, e = 0, h = a.length; e < h; e++) b = b.n, b = b.hasOwnProperty(a[e]) && b[a[e]] || (b[a[e]] = {
                n: {}
            });
            b.f = b.f || [];
            e = 0;
            for (h = b.f.length; e < h; e++)
                if (b.f[e] == d) {
                    c = !0;
                    break
                }!c && b.f.push(d)
        })(c[e]);
        return function(a) {
            +a == +a && (d.zIndex = +a)
        }
    };
    l.f = function(a) {
        var d = [].slice.call(arguments, 1);
        return function() {
            l.apply(null, [a, null].concat(d).concat([].slice.call(arguments, 0)))
        }
    };
    l.stop = function() {
        e = 1
    };
    l.nt = function(e) {
        return e ? (new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)")).test(a) : a
    };
    l.nts = function() {
        return a.split(f)
    };
    l.off = l.unbind = function(a, d) {
        if (a) {
            var c = a.split(k);
            if (1 < c.length)
                for (var e = 0, q = c.length; e < q; e++) l.off(c[e], d);
            else {
                for (var c = a.split(f), x, b, B, n, h = [m], e = 0, q = c.length; e < q; e++)
                    for (n = 0; n < h.length; n += B.length - 2) {
                        B = [n, 1];
                        x = h[n].n;
                        if ("*" != c[e]) x[c[e]] && B.push(x[c[e]]);
                        else
                            for (b in x) x.hasOwnProperty(b) &&
                                B.push(x[b]);
                        h.splice.apply(h, B)
                    }
                e = 0;
                for (q = h.length; e < q; e++)
                    for (x = h[e]; x.n;) {
                        if (d) {
                            if (x.f) {
                                n = 0;
                                for (c = x.f.length; n < c; n++)
                                    if (x.f[n] == d) {
                                        x.f.splice(n, 1);
                                        break
                                    }!x.f.length && delete x.f
                            }
                            for (b in x.n)
                                if (x.n.hasOwnProperty(b) && x.n[b].f) {
                                    B = x.n[b].f;
                                    n = 0;
                                    for (c = B.length; n < c; n++)
                                        if (B[n] == d) {
                                            B.splice(n, 1);
                                            break
                                        }!B.length && delete x.n[b].f
                                }
                        } else
                            for (b in delete x.f, x.n) x.n.hasOwnProperty(b) && x.n[b].f && delete x.n[b].f;
                        x = x.n
                    }
            }
        } else l._events = m = {
            n: {}
        }
    };
    l.once = function(a, d) {
        var e = function() {
            l.unbind(a, e);
            return d.apply(this,
                arguments)
        };
        return l.on(a, e)
    };
    l.version = "0.4.2";
    l.toString = function() {
        return "You are running Eve 0.4.2"
    };
    "undefined" != typeof module && module.exports ? module.exports = l : "function" === typeof define && define.amd ? define("eve", [], function() {
        return l
    }) : v.eve = l
})(this);
(function(v, f) {
    "function" === typeof define && define.amd ? define("snap", ["eve"], function(k) {
        return f(v, k)
    }) : f(v, v.eve)
})(this, function(v, f) {
    var k = function(a) {
            var e = {},
                f = v.requestAnimationFrame || v.webkitRequestAnimationFrame || v.mozRequestAnimationFrame || v.oRequestAnimationFrame || v.msRequestAnimationFrame || function(a) {
                    setTimeout(a, 16)
                },
                k = Array.isArray || function(a) {
                    return a instanceof Array || "[object Array]" == Object.prototype.toString.call(a)
                },
                w = 0,
                l = "M" + (+new Date).toString(36),
                t = function(a) {
                    if (null == a) return this.s;
                    var b = this.s - a;
                    this.b += this.dur * b;
                    this.B += this.dur * b;
                    this.s = a
                },
                d = function(a) {
                    if (null == a) return this.spd;
                    this.spd = a
                },
                c = function(a) {
                    if (null == a) return this.dur;
                    this.s = this.s * a / this.dur;
                    this.dur = a
                },
                s = function() {
                    delete e[this.id];
                    this.update();
                    a("mina.stop." + this.id, this)
                },
                q = function() {
                    this.pdif || (delete e[this.id], this.update(), this.pdif = this.get() - this.b)
                },
                x = function() {
                    this.pdif && (this.b = this.get() - this.pdif, delete this.pdif, e[this.id] = this)
                },
                b = function() {
                    var a;
                    if (k(this.start)) {
                        a = [];
                        for (var b = 0, e = this.start.length; b <
                            e; b++) a[b] = +this.start[b] + (this.end[b] - this.start[b]) * this.easing(this.s)
                    } else a = +this.start + (this.end - this.start) * this.easing(this.s);
                    this.set(a)
                },
                B = function() {
                    var h = 0,
                        b;
                    for (b in e)
                        if (e.hasOwnProperty(b)) {
                            var d = e[b],
                                c = d.get();
                            h++;
                            d.s = (c - d.b) / (d.dur / d.spd);
                            1 <= d.s && (delete e[b], d.s = 1, h--, function(h) {
                                setTimeout(function() {
                                    a("mina.finish." + h.id, h)
                                })
                            }(d));
                            d.update()
                        }
                    h && f(B)
                },
                n = function(a, k, p, C, y, D, u) {
                    a = {
                        id: l + (w++).toString(36),
                        start: a,
                        end: k,
                        b: p,
                        s: 0,
                        dur: C - p,
                        spd: 1,
                        get: y,
                        set: D,
                        easing: u || n.linear,
                        status: t,
                        speed: d,
                        duration: c,
                        stop: s,
                        pause: q,
                        resume: x,
                        update: b
                    };
                    e[a.id] = a;
                    k = 0;
                    for (var v in e)
                        if (e.hasOwnProperty(v) && (k++, 2 == k)) break;
                    1 == k && f(B);
                    return a
                };
            n.time = Date.now || function() {
                return +new Date
            };
            n.getById = function(a) {
                return e[a] || null
            };
            n.linear = function(a) {
                return a
            };
            n.easeout = function(a) {
                return Math.pow(a, 1.7)
            };
            n.easein = function(a) {
                return Math.pow(a, .48)
            };
            n.easeinout = function(a) {
                if (1 == a) return 1;
                if (0 == a) return 0;
                var b = .48 - a / 1.04,
                    d = Math.sqrt(.1734 + b * b);
                a = d - b;
                a = Math.pow(Math.abs(a), 1 / 3) * (0 > a ? -1 : 1);
                b = -d - b;
                b = Math.pow(Math.abs(b), 1 / 3) * (0 > b ? -1 : 1);
                a = a + b + .5;
                return 3 * (1 - a) * a * a + a * a * a
            };
            n.backin = function(a) {
                return 1 == a ? 1 : a * a * (2.70158 * a - 1.70158)
            };
            n.backout = function(a) {
                if (0 == a) return 0;
                --a;
                return a * a * (2.70158 * a + 1.70158) + 1
            };
            n.elastic = function(a) {
                return a == !!a ? a : Math.pow(2, -10 * a) * Math.sin(2 * (a - .075) * Math.PI / .3) + 1
            };
            n.bounce = function(a) {
                a < 1 / 2.75 ? a *= 7.5625 * a : a < 2 / 2.75 ? (a -= 1.5 / 2.75, a = 7.5625 * a * a + .75) : a < 2.5 / 2.75 ? (a -= 2.25 / 2.75, a = 7.5625 * a * a + .9375) : (a -= 2.625 / 2.75, a = 7.5625 * a * a + .984375);
                return a
            };
            return v.mina = n
        }("undefined" ==
            typeof f ? function() {} : f),
        p = function() {
            function a(A, z) {
                if (A) {
                    if (A.tagName) return C(A);
                    if (m(A, "array") && a.set) return a.set.apply(a, A);
                    if (A instanceof n) return A;
                    if (null == z) return A = y.doc.querySelector(A), C(A)
                }
                return new K(null == A ? "100%" : A, null == z ? "100%" : z)
            }

            function e(a, z) {
                if (z) {
                    "#text" == a && (a = y.doc.createTextNode(z.text || ""));
                    "string" == typeof a && (a = e(a));
                    if ("string" == typeof z) return "xlink:" == z.substring(0, 6) ? a.getAttributeNS(r, z.substring(6)) : "xml:" == z.substring(0, 4) ? a.getAttributeNS(ha, z.substring(4)) :
                        a.getAttribute(z);
                    for (var b in z)
                        if (z[D](b)) {
                            var h = N(z[b]);
                            h ? "xlink:" == b.substring(0, 6) ? a.setAttributeNS(r, b.substring(6), h) : "xml:" == b.substring(0, 4) ? a.setAttributeNS(ha, b.substring(4), h) : a.setAttribute(b, h) : a.removeAttribute(b)
                        }
                } else a = y.doc.createElementNS(ha, a);
                return a
            }

            function m(a, z) {
                z = N.prototype.toLowerCase.call(z);
                return "finite" == z ? isFinite(a) : "array" == z && (a instanceof Array || Array.isArray && Array.isArray(a)) ? !0 : "null" == z && null === a || z == typeof a && null !== a || "object" == z && a === Object(a) || Z.call(a).slice(8, -1).toLowerCase() == z
            }

            function p(a) {
                if ("function" == typeof a || Object(a) !== a) return a;
                var z = new a.constructor,
                    b;
                for (b in a) a[D](b) && (z[b] = p(a[b]));
                return z
            }

            function w(a, z, b) {
                function h() {
                    var r = Array.prototype.slice.call(arguments, 0),
                        d = r.join("\u2400"),
                        e = h.cache = h.cache || {},
                        c = h.count = h.count || [];
                    if (e[D](d)) {
                        a: for (var r = c, c = d, G = 0, f = r.length; G < f; G++)
                            if (r[G] === c) {
                                r.push(r.splice(G, 1)[0]);
                                break a
                            }return b ? b(e[d]) : e[d]
                    }
                    1E3 <= c.length && delete e[c.shift()];
                    c.push(d);
                    e[d] = a.apply(z, r);
                    return b ? b(e[d]) : e[d]
                }
                return h
            }

            function l(a, z, b, h, r, d) {
                return null == r ? (a -= b, z -= h, a || z ? (180 * Q.atan2(-z, -a) / I + 540) % 360 : 0) : l(a, z, r, d) - l(b, h, r, d)
            }

            function t(a) {
                return a % 360 * I / 180
            }

            function d(a) {
                var z = [];
                a = a.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function(a, A, b) {
                    b = b.split(/\s*,\s*|\s+/);
                    "rotate" == A && 1 == b.length && b.push(0, 0);
                    "scale" == A && (2 < b.length ? b = b.slice(0, 2) : 2 == b.length && b.push(0, 0), 1 == b.length && b.push(b[0], 0, 0));
                    "skewX" == A ? z.push(["m", 1, 0, Q.tan(t(b[0])), 1, 0, 0]) : "skewY" == A ? z.push(["m", 1, Q.tan(t(b[0])), 0, 1, 0, 0]) : z.push([A.charAt(0)].concat(b));
                    return a
                });
                return z
            }

            function c(A, b) {
                var r = pa(A),
                    h = new a.Matrix;
                if (r)
                    for (var d = 0, e = r.length; d < e; d++) {
                        var c = r[d],
                            f = c.length,
                            G = N(c[0]).toLowerCase(),
                            J = c[0] != G,
                            y = J ? h.invert() : 0,
                            n;
                        "t" == G && 2 == f ? h.translate(c[1], 0) : "t" == G && 3 == f ? J ? (f = y.x(0, 0), G = y.y(0, 0), J = y.x(c[1], c[2]), y = y.y(c[1], c[2]), h.translate(J - f, y - G)) : h.translate(c[1], c[2]) : "r" == G ? 2 == f ? (n = n || b, h.rotate(c[1], n.x + n.width / 2, n.y + n.height / 2)) : 4 == f && (J ? (J = y.x(c[2], c[3]), y = y.y(c[2], c[3]), h.rotate(c[1], J, y)) : h.rotate(c[1], c[2], c[3])) : "s" == G ? 2 == f || 3 == f ? (n =
                            n || b, h.scale(c[1], c[f - 1], n.x + n.width / 2, n.y + n.height / 2)) : 4 == f ? J ? (J = y.x(c[2], c[3]), y = y.y(c[2], c[3]), h.scale(c[1], c[1], J, y)) : h.scale(c[1], c[1], c[2], c[3]) : 5 == f && (J ? (J = y.x(c[3], c[4]), y = y.y(c[3], c[4]), h.scale(c[1], c[2], J, y)) : h.scale(c[1], c[2], c[3], c[4])) : "m" == G && 7 == f && h.add(c[1], c[2], c[3], c[4], c[5], c[6])
                    }
                return h
            }

            function s(A, b) {
                if (null == b) {
                    var h = !0;
                    b = "linearGradient" == A.type || "radialGradient" == A.type ? A.node.getAttribute("gradientTransform") : "pattern" == A.type ? A.node.getAttribute("patternTransform") : A.node.getAttribute("transform");
                    if (!b) return new a.Matrix;
                    b = d(b)
                } else b = a._.rgTransform.test(b) ? N(b).replace(/\.{3}|\u2026/g, A._.transform || "") : d(b), m(b, "array") && (b = a.path ? a.path.toString.call(b) : N(b)), A._.transform = b;
                var r = c(b, A.getBBox(1));
                if (h) return r;
                A.matrix = r
            }

            function q(A) {
                A = A.node.ownerSVGElement && C(A.node.ownerSVGElement) || A.node.parentNode && C(A.node.parentNode) || a.select("svg") || a(0, 0);
                var b = A.select("defs"),
                    b = null == b ? !1 : b.node;
                b || (b = H("defs", A.node).node);
                return b
            }

            function x(A) {
                return A.node.ownerSVGElement && C(A.node.ownerSVGElement) ||
                    a.select("svg")
            }

            function b(a, b, h) {
                function c(a) {
                    if (null == a) return "";
                    if (a == +a) return a;
                    e(G, {
                        width: a
                    });
                    try {
                        return G.getBBox().width
                    } catch (A) {
                        return 0
                    }
                }

                function r(a) {
                    if (null == a) return "";
                    if (a == +a) return a;
                    e(G, {
                        height: a
                    });
                    try {
                        return G.getBBox().height
                    } catch (A) {
                        return 0
                    }
                }

                function d(c, r) {
                    null == b ? y[c] = r(a.attr(c) || 0) : c == b && (y = r(null == h ? a.attr(c) || 0 : h))
                }
                var f = x(a).node,
                    y = {},
                    G = f.querySelector(".svg---mgr");
                G || (G = e("rect"), e(G, {
                    x: -9E9,
                    y: -9E9,
                    width: 10,
                    height: 10,
                    "class": "svg---mgr",
                    fill: "none"
                }), f.appendChild(G));
                switch (a.type) {
                    case "rect":
                        d("rx", c), d("ry", r);
                    case "image":
                        d("width", c), d("height", r);
                    case "text":
                        d("x", c);
                        d("y", r);
                        break;
                    case "circle":
                        d("cx", c);
                        d("cy", r);
                        d("r", c);
                        break;
                    case "ellipse":
                        d("cx", c);
                        d("cy", r);
                        d("rx", c);
                        d("ry", r);
                        break;
                    case "line":
                        d("x1", c);
                        d("x2", c);
                        d("y1", r);
                        d("y2", r);
                        break;
                    case "marker":
                        d("refX", c);
                        d("markerWidth", c);
                        d("refY", r);
                        d("markerHeight", r);
                        break;
                    case "radialGradient":
                        d("fx", c);
                        d("fy", r);
                        break;
                    case "tspan":
                        d("dx", c);
                        d("dy", r);
                        break;
                    default:
                        d(b, c)
                }
                f.removeChild(G);
                return y
            }

            function B(a) {
                m(a, "array") || (a = Array.prototype.slice.call(arguments, 0));
                for (var b = 0, c = 0, r = this.node; this[b];) delete this[b++];
                for (b = 0; b < a.length; b++) "set" == a[b].type ? a[b].forEach(function(a) {
                    r.appendChild(a.node)
                }) : r.appendChild(a[b].node);
                for (var d = r.childNodes, b = 0; b < d.length; b++) this[c++] = C(d[b]);
                return this
            }

            function n(a) {
                if (a.snap in S) return S[a.snap];
                var b = this.id = W(),
                    c;
                try {
                    c = a.ownerSVGElement
                } catch (r) {}
                this.node = a;
                c && (this.paper = new K(c));
                this.type = a.tagName;
                this.anims = {};
                this._ = {
                    transform: []
                };
                a.snap = b;
                S[b] = this;
                "g" == this.type && (this.add = B);
                if (this.type in {
                        g: 1,
                        mask: 1,
                        pattern: 1
                    })
                    for (var d in K.prototype) K.prototype[D](d) && (this[d] = K.prototype[d])
            }

            function h(a) {
                this.node = a
            }

            function H(a, b) {
                var c = e(a);
                b.appendChild(c);
                return C(c)
            }

            function K(a, b) {
                var c, d, r, h = K.prototype;
                if (a && "svg" == a.tagName) {
                    if (a.snap in S) return S[a.snap];
                    var f = a.ownerDocument;
                    c = new n(a);
                    d = a.getElementsByTagName("desc")[0];
                    r = a.getElementsByTagName("defs")[0];
                    d || (d = e("desc"), d.appendChild(f.createTextNode("Created with Snap")),
                        c.node.appendChild(d));
                    r || (r = e("defs"), c.node.appendChild(r));
                    c.defs = r;
                    for (var s in h) h[D](s) && (c[s] = h[s]);
                    c.paper = c.root = c
                } else c = H("svg", y.doc.body), e(c.node, {
                    height: b,
                    version: 1.1,
                    width: a,
                    xmlns: ha
                });
                return c
            }

            function C(a) {
                return !a || a instanceof n || a instanceof h ? a : a.tagName && "svg" == a.tagName.toLowerCase() ? new K(a) : a.tagName && "object" == a.tagName.toLowerCase() && "image/svg+xml" == a.type ? new K(a.contentDocument.getElementsByTagName("svg")[0]) : new n(a)
            }
            a.version = "0.3.0";
            a.toString = function() {
                return "Snap v" +
                    this.version
            };
            a._ = {};
            var y = {
                win: v,
                doc: v.document
            };
            a._.glob = y;
            var D = "hasOwnProperty",
                N = String,
                R = parseFloat,
                L = parseInt,
                Q = Math,
                F = Q.max,
                M = Q.min,
                V = Q.abs,
                I = Q.PI,
                Z = Object.prototype.toString,
                E = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i;
            a._.separator =
                /[,\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]+/;
            var O = /[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
                X = {
                    hs: 1,
                    rg: 1
                },
                P = /([a-z])[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
                $ = /([rstm])[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
                aa = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
                Y = 0,
                T = "S" + (+new Date).toString(36),
                W = function() {
                    return T + (Y++).toString(36)
                },
                r = "http://www.w3.org/1999/xlink",
                ha = "http://www.w3.org/2000/svg",
                S = {},
                ba = a.url = function(a) {
                    return "url('#" + a + "')"
                };
            a._.$ = e;
            a._.id = W;
            a.format = function() {
                var a = /\{([^\}]+)\}/g,
                    b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                    c = function(a, A, c) {
                        var d = c;
                        A.replace(b, function(a, b, A, c, r) {
                            b = b || c;
                            d && (b in d && (d = d[b]), "function" == typeof d && r && (d = d()))
                        });
                        return d = (null == d || d == c ? a : d) + ""
                    };
                return function(b, d) {
                    return N(b).replace(a,
                        function(a, b) {
                            return c(a, b, d)
                        })
                }
            }();
            a._.clone = p;
            a._.cacher = w;
            a.rad = t;
            a.deg = function(a) {
                return 180 * a / I % 360
            };
            a.angle = l;
            a.is = m;
            a.snapTo = function(a, b, c) {
                c = m(c, "finite") ? c : 10;
                if (m(a, "array"))
                    for (var d = a.length; d--;) {
                        if (V(a[d] - b) <= c) return a[d]
                    } else {
                        a = +a;
                        d = b % a;
                        if (d < c) return b - d;
                        if (d > a - c) return b - d + a
                    }
                return b
            };
            a.getRGB = w(function(b) {
                if (!b || (b = N(b)).indexOf("-") + 1) return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: ga
                };
                if ("none" == b) return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    toString: ga
                };
                !X[D](b.toLowerCase().substring(0,
                    2)) && "#" != b.charAt() && (b = la(b));
                if (!b) return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: ga
                };
                var c, d, r, h, e;
                if (b = b.match(E)) {
                    b[2] && (r = L(b[2].substring(5), 16), d = L(b[2].substring(3, 5), 16), c = L(b[2].substring(1, 3), 16));
                    b[3] && (r = L((e = b[3].charAt(3)) + e, 16), d = L((e = b[3].charAt(2)) + e, 16), c = L((e = b[3].charAt(1)) + e, 16));
                    b[4] && (e = b[4].split(O), c = R(e[0]), "%" == e[0].slice(-1) && (c *= 2.55), d = R(e[1]), "%" == e[1].slice(-1) && (d *= 2.55), r = R(e[2]), "%" == e[2].slice(-1) && (r *= 2.55), "rgba" == b[1].toLowerCase().slice(0, 4) && (h = R(e[3])),
                        e[3] && "%" == e[3].slice(-1) && (h /= 100));
                    if (b[5]) return e = b[5].split(O), c = R(e[0]), "%" == e[0].slice(-1) && (c /= 100), d = R(e[1]), "%" == e[1].slice(-1) && (d /= 100), r = R(e[2]), "%" == e[2].slice(-1) && (r /= 100), "deg" != e[0].slice(-3) && "\u00b0" != e[0].slice(-1) || (c /= 360), "hsba" == b[1].toLowerCase().slice(0, 4) && (h = R(e[3])), e[3] && "%" == e[3].slice(-1) && (h /= 100), a.hsb2rgb(c, d, r, h);
                    if (b[6]) return e = b[6].split(O), c = R(e[0]), "%" == e[0].slice(-1) && (c /= 100), d = R(e[1]), "%" == e[1].slice(-1) && (d /= 100), r = R(e[2]), "%" == e[2].slice(-1) && (r /= 100),
                        "deg" != e[0].slice(-3) && "\u00b0" != e[0].slice(-1) || (c /= 360), "hsla" == b[1].toLowerCase().slice(0, 4) && (h = R(e[3])), e[3] && "%" == e[3].slice(-1) && (h /= 100), a.hsl2rgb(c, d, r, h);
                    c = M(Q.round(c), 255);
                    d = M(Q.round(d), 255);
                    r = M(Q.round(r), 255);
                    h = M(F(h, 0), 1);
                    b = {
                        r: c,
                        g: d,
                        b: r,
                        toString: ga
                    };
                    b.hex = "#" + (16777216 | r | d << 8 | c << 16).toString(16).slice(1);
                    b.opacity = m(h, "finite") ? h : 1;
                    return b
                }
                return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: ga
                }
            }, a);
            a.hsb = w(function(b, c, d) {
                return a.hsb2rgb(b, c, d).hex
            });
            a.hsl = w(function(b, c, d) {
                return a.hsl2rgb(b,
                    c, d).hex
            });
            a.rgb = w(function(a, b, c, d) {
                if (m(d, "finite")) {
                    var r = Q.round;
                    return "rgba(" + [r(a), r(b), r(c), +d.toFixed(2)] + ")"
                }
                return "#" + (16777216 | c | b << 8 | a << 16).toString(16).slice(1)
            });
            var la = function(a) {
                    var b = y.doc.getElementsByTagName("head")[0] || y.doc.getElementsByTagName("svg")[0];
                    la = w(function(a) {
                        if ("red" == a.toLowerCase()) return "rgb(255, 0, 0)";
                        b.style.color = "rgb(255, 0, 0)";
                        b.style.color = a;
                        a = y.doc.defaultView.getComputedStyle(b, "").getPropertyValue("color");
                        return "rgb(255, 0, 0)" == a ? null : a
                    });
                    return la(a)
                },
                qa = function() {
                    return "hsb(" + [this.h, this.s, this.b] + ")"
                },
                ra = function() {
                    return "hsl(" + [this.h, this.s, this.l] + ")"
                },
                ga = function() {
                    return 1 == this.opacity || null == this.opacity ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")"
                },
                ma = function(b, c, d) {
                    null == c && m(b, "object") && "r" in b && "g" in b && "b" in b && (d = b.b, c = b.g, b = b.r);
                    null == c && m(b, string) && (d = a.getRGB(b), b = d.r, c = d.g, d = d.b);
                    if (1 < b || 1 < c || 1 < d) b /= 255, c /= 255, d /= 255;
                    return [b, c, d]
                },
                na = function(b, c, d, r) {
                    b = Q.round(255 * b);
                    c = Q.round(255 * c);
                    d = Q.round(255 * d);
                    b = {
                        r: b,
                        g: c,
                        b: d,
                        opacity: m(r, "finite") ? r : 1,
                        hex: a.rgb(b, c, d),
                        toString: ga
                    };
                    m(r, "finite") && (b.opacity = r);
                    return b
                };
            a.color = function(b) {
                var c;
                m(b, "object") && "h" in b && "s" in b && "b" in b ? (c = a.hsb2rgb(b), b.r = c.r, b.g = c.g, b.b = c.b, b.opacity = 1, b.hex = c.hex) : m(b, "object") && "h" in b && "s" in b && "l" in b ? (c = a.hsl2rgb(b), b.r = c.r, b.g = c.g, b.b = c.b, b.opacity = 1, b.hex = c.hex) : (m(b, "string") && (b = a.getRGB(b)), m(b, "object") && "r" in b && "g" in b && "b" in b && !("error" in b) ? (c = a.rgb2hsl(b), b.h = c.h, b.s = c.s, b.l = c.l, c = a.rgb2hsb(b), b.v = c.b) : (b = {
                        hex: "none"
                    },
                    b.r = b.g = b.b = b.h = b.s = b.v = b.l = -1, b.error = 1));
                b.toString = ga;
                return b
            };
            a.hsb2rgb = function(a, b, c, d) {
                m(a, "object") && "h" in a && "s" in a && "b" in a && (c = a.b, b = a.s, a = a.h, d = a.o);
                var r, h, e;
                a = 360 * a % 360 / 60;
                e = c * b;
                b = e * (1 - V(a % 2 - 1));
                c = r = h = c - e;
                a = ~~a;
                c += [e, b, 0, 0, b, e][a];
                r += [b, e, e, b, 0, 0][a];
                h += [0, 0, b, e, e, b][a];
                return na(c, r, h, d)
            };
            a.hsl2rgb = function(a, b, c, d) {
                m(a, "object") && "h" in a && "s" in a && "l" in a && (c = a.l, b = a.s, a = a.h);
                if (1 < a || 1 < b || 1 < c) a /= 360, b /= 100, c /= 100;
                var r, h, e;
                a = 360 * a % 360 / 60;
                e = 2 * b * (.5 > c ? c : 1 - c);
                b = e * (1 - V(a % 2 - 1));
                c = r = h =
                    c - e / 2;
                a = ~~a;
                c += [e, b, 0, 0, b, e][a];
                r += [b, e, e, b, 0, 0][a];
                h += [0, 0, b, e, e, b][a];
                return na(c, r, h, d)
            };
            a.rgb2hsb = function(a, b, c) {
                c = ma(a, b, c);
                a = c[0];
                b = c[1];
                c = c[2];
                var d, r;
                d = F(a, b, c);
                r = d - M(a, b, c);
                a = ((0 == r ? null : d == a ? (b - c) / r : d == b ? (c - a) / r + 2 : (a - b) / r + 4) + 360) % 6 * 60 / 360;
                return {
                    h: a,
                    s: 0 == r ? 0 : r / d,
                    b: d,
                    toString: qa
                }
            };
            a.rgb2hsl = function(a, b, c) {
                c = ma(a, b, c);
                a = c[0];
                b = c[1];
                c = c[2];
                var d, r, h;
                d = F(a, b, c);
                r = M(a, b, c);
                h = d - r;
                a = ((0 == h ? null : d == a ? (b - c) / h : d == b ? (c - a) / h + 2 : (a - b) / h + 4) + 360) % 6 * 60 / 360;
                d = (d + r) / 2;
                return {
                    h: a,
                    s: 0 == h ? 0 : .5 > d ? h / (2 * d) : h /
                        (2 - 2 * d),
                    l: d,
                    toString: ra
                }
            };
            a.parsePathString = function(b) {
                if (!b) return null;
                var c = a.path(b);
                if (c.arr) return a.path.clone(c.arr);
                var d = {
                        a: 7,
                        c: 6,
                        o: 2,
                        h: 1,
                        l: 2,
                        m: 2,
                        r: 4,
                        q: 4,
                        s: 4,
                        t: 2,
                        v: 1,
                        u: 3,
                        z: 0
                    },
                    r = [];
                m(b, "array") && m(b[0], "array") && (r = a.path.clone(b));
                r.length || N(b).replace(P, function(a, b, c) {
                    var h = [];
                    a = b.toLowerCase();
                    c.replace(aa, function(a, b) {
                        b && h.push(+b)
                    });
                    "m" == a && 2 < h.length && (r.push([b].concat(h.splice(0, 2))), a = "l", b = "m" == b ? "l" : "L");
                    "o" == a && 1 == h.length && r.push([b, h[0]]);
                    if ("r" == a) r.push([b].concat(h));
                    else
                        for (; h.length >= d[a] && (r.push([b].concat(h.splice(0, d[a]))), d[a]););
                });
                r.toString = a.path.toString;
                c.arr = a.path.clone(r);
                return r
            };
            var pa = a.parseTransformString = function(b) {
                if (!b) return null;
                var c = [];
                m(b, "array") && m(b[0], "array") && (c = a.path.clone(b));
                c.length || N(b).replace($, function(a, b, d) {
                    var r = [];
                    b.toLowerCase();
                    d.replace(aa, function(a, b) {
                        b && r.push(+b)
                    });
                    c.push([b].concat(r))
                });
                c.toString = a.path.toString;
                return c
            };
            a._.svgTransform2string = d;
            a._.rgTransform = /^[a-z][\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*-?\.?\d/i;
            a._.transform2matrix = c;
            a._unit2px = b;
            a._.getSomeDefs = q;
            a._.getSomeSVG = x;
            a.select = function(a) {
                return C(y.doc.querySelector(a))
            };
            a.selectAll = function(b) {
                b = y.doc.querySelectorAll(b);
                for (var c = (a.set || Array)(), d = 0; d < b.length; d++) c.push(C(b[d]));
                return c
            };
            setInterval(function() {
                for (var a in S)
                    if (S[D](a)) {
                        var b = S[a],
                            c = b.node;
                        ("svg" != b.type && !c.ownerSVGElement || "svg" == b.type && (!c.parentNode || "ownerSVGElement" in c.parentNode && !c.ownerSVGElement)) && delete S[a]
                    }
            }, 1E4);
            (function(c) {
                function d(a) {
                    function b(a,
                        c) {
                        var d = e(a.node, c);
                        (d = (d = d && d.match(f)) && d[2]) && "#" == d.charAt() && (d = d.substring(1)) && (y[d] = (y[d] || []).concat(function(b) {
                            var d = {};
                            d[c] = ba(b);
                            e(a.node, d)
                        }))
                    }

                    function c(a) {
                        var b = e(a.node, "xlink:href");
                        b && "#" == b.charAt() && (b = b.substring(1)) && (y[b] = (y[b] || []).concat(function(b) {
                            a.attr("xlink:href", "#" + b)
                        }))
                    }
                    var r = a.selectAll("*"),
                        h, f = /^\s*url\(("|'|)(.*)\1\)\s*$/;
                    a = [];
                    for (var y = {}, n = 0, s = r.length; n < s; n++) {
                        h = r[n];
                        b(h, "fill");
                        b(h, "stroke");
                        b(h, "filter");
                        b(h, "mask");
                        b(h, "clip-path");
                        c(h);
                        var l = e(h.node,
                            "id");
                        l && (e(h.node, {
                            id: h.id
                        }), a.push({
                            old: l,
                            id: h.id
                        }))
                    }
                    n = 0;
                    for (s = a.length; n < s; n++)
                        if (r = y[a[n].old])
                            for (h = 0, l = r.length; h < l; h++) r[h](a[n].id)
                }

                function r(a, b, c) {
                    return function(d) {
                        d = d.slice(a, b);
                        1 == d.length && (d = d[0]);
                        return c ? c(d) : d
                    }
                }

                function h(a) {
                    return function() {
                        var b = a ? "<" + this.type : "",
                            c = this.node.attributes,
                            d = this.node.childNodes;
                        if (a)
                            for (var r = 0, h = c.length; r < h; r++) b += " " + c[r].name + '="' + c[r].value.replace(/"/g, '\\"') + '"';
                        if (d.length) {
                            a && (b += ">");
                            r = 0;
                            for (h = d.length; r < h; r++) 3 == d[r].nodeType ? b += d[r].nodeValue :
                                1 == d[r].nodeType && (b += C(d[r]).toString());
                            a && (b += "</" + this.type + ">")
                        } else a && (b += "/>");
                        return b
                    }
                }
                c.attr = function(a, b) {
                    if (!a) return this;
                    if (m(a, "string"))
                        if (1 < arguments.length) {
                            var c = {};
                            c[a] = b;
                            a = c
                        } else return f("snap.util.getattr." + a, this).firstDefined();
                    for (var d in a) a[D](d) && f("snap.util.attr." + d, this, a[d]);
                    return this
                };
                c.getBBox = function(b) {
                    if (!a.Matrix || !a.path) return this.node.getBBox();
                    var c = this,
                        d = new a.Matrix;
                    if (c.removed) return a._.box();
                    for (;
                        "use" == c.type;)
                        if (b || (d = d.add(c.transform().localMatrix.translate(c.attr("x") ||
                                0, c.attr("y") || 0))), c.original) c = c.original;
                        else var r = c.attr("xlink:href"),
                            c = c.original = c.node.ownerDocument.getElementById(r.substring(r.indexOf("#") + 1));
                    var r = c._,
                        h = a.path.get[c.type] || a.path.get.deflt;
                    try {
                        if (b) return r.bboxwt = h ? a.path.getBBox(c.realPath = h(c)) : a._.box(c.node.getBBox()), a._.box(r.bboxwt);
                        c.realPath = h(c);
                        c.matrix = c.transform().localMatrix;
                        r.bbox = a.path.getBBox(a.path.map(c.realPath, d.add(c.matrix)));
                        return a._.box(r.bbox)
                    } catch (e) {
                        return a._.box()
                    }
                };
                var y = function() {
                    return this.string
                };
                c.transform = function(b) {
                    var c = this._;
                    if (null == b) {
                        var d = this;
                        b = new a.Matrix(this.node.getCTM());
                        for (var r = s(this), h = [r], f = new a.Matrix, n = r.toTransformString(), c = N(r) == N(this.matrix) ? N(c.transform) : n;
                            "svg" != d.type && (d = d.parent());) h.push(s(d));
                        for (d = h.length; d--;) f.add(h[d]);
                        return {
                            string: c,
                            globalMatrix: b,
                            totalMatrix: f,
                            localMatrix: r,
                            diffMatrix: b.clone().add(r.invert()),
                            global: b.toTransformString(),
                            total: f.toTransformString(),
                            local: n,
                            toString: y
                        }
                    }
                    b instanceof a.Matrix ? this.matrix = b : s(this, b);
                    this.node &&
                        ("linearGradient" == this.type || "radialGradient" == this.type ? e(this.node, {
                            gradientTransform: this.matrix
                        }) : "pattern" == this.type ? e(this.node, {
                            patternTransform: this.matrix
                        }) : e(this.node, {
                            transform: this.matrix
                        }));
                    return this
                };
                c.parent = function() {
                    return C(this.node.parentNode)
                };
                c.append = c.add = function(a) {
                    if (a) {
                        if ("set" == a.type) {
                            var b = this;
                            a.forEach(function(a) {
                                b.add(a)
                            });
                            return this
                        }
                        a = C(a);
                        this.node.appendChild(a.node);
                        a.paper = this.paper
                    }
                    return this
                };
                c.appendTo = function(a) {
                    a && (a = C(a), a.append(this));
                    return this
                };
                c.prepend = function(a) {
                    if (a) {
                        if ("set" == a.type) {
                            var b = this,
                                c;
                            a.forEach(function(a) {
                                c ? c.after(a) : b.prepend(a);
                                c = a
                            });
                            return this
                        }
                        a = C(a);
                        var d = a.parent();
                        this.node.insertBefore(a.node, this.node.firstChild);
                        this.add && this.add();
                        a.paper = this.paper;
                        this.parent() && this.parent().add();
                        d && d.add()
                    }
                    return this
                };
                c.prependTo = function(a) {
                    a = C(a);
                    a.prepend(this);
                    return this
                };
                c.before = function(a) {
                    if ("set" == a.type) {
                        var b = this;
                        a.forEach(function(a) {
                            var c = a.parent();
                            b.node.parentNode.insertBefore(a.node, b.node);
                            c && c.add()
                        });
                        this.parent().add();
                        return this
                    }
                    a = C(a);
                    var c = a.parent();
                    this.node.parentNode.insertBefore(a.node, this.node);
                    this.parent() && this.parent().add();
                    c && c.add();
                    a.paper = this.paper;
                    return this
                };
                c.after = function(a) {
                    a = C(a);
                    var b = a.parent();
                    this.node.nextSibling ? this.node.parentNode.insertBefore(a.node, this.node.nextSibling) : this.node.parentNode.appendChild(a.node);
                    this.parent() && this.parent().add();
                    b && b.add();
                    a.paper = this.paper;
                    return this
                };
                c.insertBefore = function(a) {
                    a = C(a);
                    var b = this.parent();
                    a.node.parentNode.insertBefore(this.node,
                        a.node);
                    this.paper = a.paper;
                    b && b.add();
                    a.parent() && a.parent().add();
                    return this
                };
                c.insertAfter = function(a) {
                    a = C(a);
                    var b = this.parent();
                    a.node.parentNode.insertBefore(this.node, a.node.nextSibling);
                    this.paper = a.paper;
                    b && b.add();
                    a.parent() && a.parent().add();
                    return this
                };
                c.remove = function() {
                    var a = this.parent();
                    this.node.parentNode && this.node.parentNode.removeChild(this.node);
                    delete this.paper;
                    this.removed = !0;
                    a && a.add();
                    return this
                };
                c.select = function(a) {
                    return C(this.node.querySelector(a))
                };
                c.selectAll =
                    function(b) {
                        b = this.node.querySelectorAll(b);
                        for (var c = (a.set || Array)(), d = 0; d < b.length; d++) c.push(C(b[d]));
                        return c
                    };
                c.asPX = function(a, c) {
                    null == c && (c = this.attr(a));
                    return +b(this, a, c)
                };
                c.use = function() {
                    var a, b = this.node.id;
                    b || (b = this.id, e(this.node, {
                        id: b
                    }));
                    a = "linearGradient" == this.type || "radialGradient" == this.type || "pattern" == this.type ? H(this.type, this.node.parentNode) : H("use", this.node.parentNode);
                    e(a.node, {
                        "xlink:href": "#" + b
                    });
                    a.original = this;
                    return a
                };
                var n = /\S+/g;
                c.addClass = function(a) {
                    var b = (a ||
                        "").match(n) || [];
                    a = this.node;
                    var c = a.className.baseVal,
                        d = c.match(n) || [],
                        r, h, e;
                    if (b.length) {
                        for (r = 0; e = b[r++];) h = d.indexOf(e), ~h || d.push(e);
                        b = d.join(" ");
                        c != b && (a.className.baseVal = b)
                    }
                    return this
                };
                c.removeClass = function(a) {
                    var b = (a || "").match(n) || [];
                    a = this.node;
                    var c = a.className.baseVal,
                        d = c.match(n) || [],
                        r, h;
                    if (d.length) {
                        for (r = 0; h = b[r++];) h = d.indexOf(h), ~h && d.splice(h, 1);
                        b = d.join(" ");
                        c != b && (a.className.baseVal = b)
                    }
                    return this
                };
                c.hasClass = function(a) {
                    return !!~(this.node.className.baseVal.match(n) || []).indexOf(a)
                };
                c.toggleClass = function(a, b) {
                    if (null != b) return b ? this.addClass(a) : this.removeClass(a);
                    var c = (a || "").match(n) || [],
                        d = this.node,
                        r = d.className.baseVal,
                        h = r.match(n) || [],
                        e, f, y;
                    for (e = 0; y = c[e++];) f = h.indexOf(y), ~f ? h.splice(f, 1) : h.push(y);
                    c = h.join(" ");
                    r != c && (d.className.baseVal = c);
                    return this
                };
                c.clone = function() {
                    var a = C(this.node.cloneNode(!0));
                    e(a.node, "id") && e(a.node, {
                        id: a.id
                    });
                    d(a);
                    a.insertAfter(this);
                    return a
                };
                c.toDefs = function() {
                    q(this).appendChild(this.node);
                    return this
                };
                c.pattern = c.toPattern = function(a,
                    b, c, d) {
                    var r = H("pattern", q(this));
                    null == a && (a = this.getBBox());
                    m(a, "object") && "x" in a && (b = a.y, c = a.width, d = a.height, a = a.x);
                    e(r.node, {
                        x: a,
                        y: b,
                        width: c,
                        height: d,
                        patternUnits: "userSpaceOnUse",
                        id: r.id,
                        viewBox: [a, b, c, d].join(" ")
                    });
                    r.node.appendChild(this.node);
                    return r
                };
                c.marker = function(a, b, c, d, r, h) {
                    var f = H("marker", q(this));
                    null == a && (a = this.getBBox());
                    m(a, "object") && "x" in a && (b = a.y, c = a.width, d = a.height, r = a.refX || a.cx, h = a.refY || a.cy, a = a.x);
                    e(f.node, {
                        viewBox: [a, b, c, d].join(" "),
                        markerWidth: c,
                        markerHeight: d,
                        orient: "auto",
                        refX: r || 0,
                        refY: h || 0,
                        id: f.id
                    });
                    f.node.appendChild(this.node);
                    return f
                };
                var l = function(a, b, c, d) {
                    "function" != typeof c || c.length || (d = c, c = k.linear);
                    this.attr = a;
                    this.dur = b;
                    c && (this.easing = c);
                    d && (this.callback = d)
                };
                a._.Animation = l;
                a.animation = function(a, b, c, d) {
                    return new l(a, b, c, d)
                };
                c.inAnim = function() {
                    var a = [],
                        b;
                    for (b in this.anims) this.anims[D](b) && function(b) {
                        a.push({
                            anim: new l(b._attrs, b.dur, b.easing, b._callback),
                            mina: b,
                            curStatus: b.status(),
                            status: function(a) {
                                return b.status(a)
                            },
                            stop: function() {
                                b.stop()
                            }
                        })
                    }(this.anims[b]);
                    return a
                };
                a.animate = function(a, b, c, d, r, h) {
                    "function" != typeof r || r.length || (h = r, r = k.linear);
                    var e = k.time();
                    a = k(a, b, e, e + d, k.time, c, r);
                    h && f.once("mina.finish." + a.id, h);
                    return a
                };
                c.stop = function() {
                    for (var a = this.inAnim(), b = 0, c = a.length; b < c; b++) a[b].stop();
                    return this
                };
                c.animate = function(a, b, c, d) {
                    "function" != typeof c || c.length || (d = c, c = k.linear);
                    a instanceof l && (d = a.callback, c = a.easing, b = c.dur, a = a.attr);
                    var h = [],
                        e = [],
                        y = {},
                        n, s, S, z = this,
                        ba;
                    for (ba in a)
                        if (a[D](ba)) {
                            z.equal ? (S = z.equal(ba, N(a[ba])), n = S.from,
                                s = S.to, S = S.f) : (n = +z.attr(ba), s = +a[ba]);
                            var B = m(n, "array") ? n.length : 1;
                            y[ba] = r(h.length, h.length + B, S);
                            h = h.concat(n);
                            e = e.concat(s)
                        }
                    n = k.time();
                    var x = k(h, e, n, n + b, k.time, function(a) {
                        var b = {},
                            c;
                        for (c in y) y[D](c) && (b[c] = y[c](a));
                        z.attr(b)
                    }, c);
                    z.anims[x.id] = x;
                    x._attrs = a;
                    x._callback = d;
                    f("snap.animcreated." + z.id, x);
                    f.once("mina.finish." + x.id, function() {
                        delete z.anims[x.id];
                        d && d.call(z)
                    });
                    f.once("mina.stop." + x.id, function() {
                        delete z.anims[x.id]
                    });
                    return z
                };
                var S = {};
                c.data = function(b, c) {
                    var d = S[this.id] = S[this.id] || {};
                    if (0 == arguments.length) return f("snap.data.get." + this.id, this, d, null), d;
                    if (1 == arguments.length) {
                        if (a.is(b, "object")) {
                            for (var r in b) b[D](r) && this.data(r, b[r]);
                            return this
                        }
                        f("snap.data.get." + this.id, this, d[b], b);
                        return d[b]
                    }
                    d[b] = c;
                    f("snap.data.set." + this.id, this, c, b);
                    return this
                };
                c.removeData = function(a) {
                    null == a ? S[this.id] = {} : S[this.id] && delete S[this.id][a];
                    return this
                };
                c.outerSVG = c.toString = h(1);
                c.innerSVG = h()
            })(n.prototype);
            a.parse = function(a) {
                var b = y.doc.createDocumentFragment(),
                    c = !0,
                    d = y.doc.createElement("div");
                a = N(a);
                a.match(/^\s*<\s*svg(?:\s|>)/) || (a = "<svg>" + a + "</svg>", c = !1);
                d.innerHTML = a;
                if (a = d.getElementsByTagName("svg")[0])
                    if (c) b = a;
                    else
                        for (; a.firstChild;) b.appendChild(a.firstChild);
                d.innerHTML = "";
                return new h(b)
            };
            h.prototype.select = n.prototype.select;
            h.prototype.selectAll = n.prototype.selectAll;
            a.fragment = function() {
                for (var b = Array.prototype.slice.call(arguments, 0), c = y.doc.createDocumentFragment(), d = 0, r = b.length; d < r; d++) {
                    var e = b[d];
                    e.node && e.node.nodeType && c.appendChild(e.node);
                    e.nodeType && c.appendChild(e);
                    "string" == typeof e && c.appendChild(a.parse(e).node)
                }
                return new h(c)
            };
            a._.make = H;
            a._.wrap = C;
            K.prototype.el = function(a, b) {
                var c = H(a, this.node);
                b && c.attr(b);
                return c
            };
            f.on("snap.util.getattr", function() {
                var a = f.nt(),
                    a = a.substring(a.lastIndexOf(".") + 1),
                    b = a.replace(/[A-Z]/g, function(a) {
                        return "-" + a.toLowerCase()
                    });
                return oa[D](b) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(b) : e(this.node, a)
            });
            var oa = {
                "alignment-baseline": 0,
                "baseline-shift": 0,
                clip: 0,
                "clip-path": 0,
                "clip-rule": 0,
                color: 0,
                "color-interpolation": 0,
                "color-interpolation-filters": 0,
                "color-profile": 0,
                "color-rendering": 0,
                cursor: 0,
                direction: 0,
                display: 0,
                "dominant-baseline": 0,
                "enable-background": 0,
                fill: 0,
                "fill-opacity": 0,
                "fill-rule": 0,
                filter: 0,
                "flood-color": 0,
                "flood-opacity": 0,
                font: 0,
                "font-family": 0,
                "font-size": 0,
                "font-size-adjust": 0,
                "font-stretch": 0,
                "font-style": 0,
                "font-variant": 0,
                "font-weight": 0,
                "glyph-orientation-horizontal": 0,
                "glyph-orientation-vertical": 0,
                "image-rendering": 0,
                kerning: 0,
                "letter-spacing": 0,
                "lighting-color": 0,
                marker: 0,
                "marker-end": 0,
                "marker-mid": 0,
                "marker-start": 0,
                mask: 0,
                opacity: 0,
                overflow: 0,
                "pointer-events": 0,
                "shape-rendering": 0,
                "stop-color": 0,
                "stop-opacity": 0,
                stroke: 0,
                "stroke-dasharray": 0,
                "stroke-dashoffset": 0,
                "stroke-linecap": 0,
                "stroke-linejoin": 0,
                "stroke-miterlimit": 0,
                "stroke-opacity": 0,
                "stroke-width": 0,
                "text-anchor": 0,
                "text-decoration": 0,
                "text-rendering": 0,
                "unicode-bidi": 0,
                visibility: 0,
                "word-spacing": 0,
                "writing-mode": 0
            };
            f.on("snap.util.attr", function(a) {
                var b = f.nt(),
                    c = {},
                    b = b.substring(b.lastIndexOf(".") +
                        1);
                c[b] = a;
                var d = b.replace(/-(\w)/gi, function(a, b) {
                        return b.toUpperCase()
                    }),
                    b = b.replace(/[A-Z]/g, function(a) {
                        return "-" + a.toLowerCase()
                    });
                oa[D](b) ? this.node.style[d] = null == a ? "" : a : e(this.node, c)
            });
            a.ajax = function(a, b, c, d) {
                var r = new XMLHttpRequest,
                    h = W();
                if (r) {
                    if (m(b, "function")) d = c, c = b, b = null;
                    else if (m(b, "object")) {
                        var e = [],
                            y;
                        for (y in b) b.hasOwnProperty(y) && e.push(encodeURIComponent(y) + "=" + encodeURIComponent(b[y]));
                        b = e.join("&")
                    }
                    r.open(b ? "POST" : "GET", a, !0);
                    b && (r.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"));
                    c && (f.once("snap.ajax." + h + ".0", c), f.once("snap.ajax." + h + ".200", c), f.once("snap.ajax." + h + ".304", c));
                    r.onreadystatechange = function() {
                        4 == r.readyState && f("snap.ajax." + h + "." + r.status, d, r)
                    };
                    if (4 == r.readyState) return r;
                    r.send(b);
                    return r
                }
            };
            a.load = function(b, c, d) {
                a.ajax(b, function(b) {
                    b = a.parse(b.responseText);
                    d ? c.call(d, b) : c(b)
                })
            };
            a.getElementByPoint = function(a, b) {
                var c, d, r = y.doc.elementFromPoint(a, b);
                if (y.win.opera && "svg" == r.tagName) {
                    c =
                        r;
                    d = c.getBoundingClientRect();
                    c = c.ownerDocument;
                    var h = c.body,
                        e = c.documentElement;
                    c = d.top + (g.win.pageYOffset || e.scrollTop || h.scrollTop) - (e.clientTop || h.clientTop || 0);
                    d = d.left + (g.win.pageXOffset || e.scrollLeft || h.scrollLeft) - (e.clientLeft || h.clientLeft || 0);
                    h = r.createSVGRect();
                    h.x = a - d;
                    h.y = b - c;
                    h.width = h.height = 1;
                    c = r.getIntersectionList(h, null);
                    c.length && (r = c[c.length - 1])
                }
                return r ? C(r) : null
            };
            a.plugin = function(b) {
                b(a, n, K, y, h)
            };
            return y.win.Snap = a
        }();
    p.plugin(function(a, e, f, k, p) {
        function l(a, c, d, b, e, f) {
            null ==
                c && "[object SVGMatrix]" == t.call(a) ? (this.a = a.a, this.b = a.b, this.c = a.c, this.d = a.d, this.e = a.e, this.f = a.f) : null != a ? (this.a = +a, this.b = +c, this.c = +d, this.d = +b, this.e = +e, this.f = +f) : (this.a = 1, this.c = this.b = 0, this.d = 1, this.f = this.e = 0)
        }
        var t = Object.prototype.toString,
            d = String,
            c = Math;
        (function(e) {
            function f(a) {
                return a[0] * a[0] + a[1] * a[1]
            }

            function m(a) {
                var d = c.sqrt(f(a));
                a[0] && (a[0] /= d);
                a[1] && (a[1] /= d)
            }
            e.add = function(a, c, d, h, e, f) {
                var s = [
                        [],
                        [],
                        []
                    ],
                    y = [
                        [this.a, this.c, this.e],
                        [this.b, this.d, this.f],
                        [0, 0, 1]
                    ];
                c = [
                    [a,
                        d, e
                    ],
                    [c, h, f],
                    [0, 0, 1]
                ];
                a && a instanceof l && (c = [
                    [a.a, a.c, a.e],
                    [a.b, a.d, a.f],
                    [0, 0, 1]
                ]);
                for (a = 0; 3 > a; a++)
                    for (d = 0; 3 > d; d++) {
                        for (h = e = 0; 3 > h; h++) e += y[a][h] * c[h][d];
                        s[a][d] = e
                    }
                this.a = s[0][0];
                this.b = s[1][0];
                this.c = s[0][1];
                this.d = s[1][1];
                this.e = s[0][2];
                this.f = s[1][2];
                return this
            };
            e.invert = function() {
                var a = this.a * this.d - this.b * this.c;
                return new l(this.d / a, -this.b / a, -this.c / a, this.a / a, (this.c * this.f - this.d * this.e) / a, (this.b * this.e - this.a * this.f) / a)
            };
            e.clone = function() {
                return new l(this.a, this.b, this.c, this.d, this.e,
                    this.f)
            };
            e.translate = function(a, c) {
                return this.add(1, 0, 0, 1, a, c)
            };
            e.scale = function(a, c, d, h) {
                null == c && (c = a);
                (d || h) && this.add(1, 0, 0, 1, d, h);
                this.add(a, 0, 0, c, 0, 0);
                (d || h) && this.add(1, 0, 0, 1, -d, -h);
                return this
            };
            e.rotate = function(b, d, e) {
                b = a.rad(b);
                d = d || 0;
                e = e || 0;
                var h = +c.cos(b).toFixed(9);
                b = +c.sin(b).toFixed(9);
                this.add(h, b, -b, h, d, e);
                return this.add(1, 0, 0, 1, -d, -e)
            };
            e.x = function(a, c) {
                return a * this.a + c * this.c + this.e
            };
            e.y = function(a, c) {
                return a * this.b + c * this.d + this.f
            };
            e.get = function(a) {
                return +this[d.fromCharCode(97 +
                    a)].toFixed(4)
            };
            e.toString = function() {
                return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")"
            };
            e.offset = function() {
                return [this.e.toFixed(4), this.f.toFixed(4)]
            };
            e.determinant = function() {
                return this.a * this.d - this.b * this.c
            };
            e.split = function() {
                var b = {};
                b.dx = this.e;
                b.dy = this.f;
                var d = [
                    [this.a, this.c],
                    [this.b, this.d]
                ];
                b.scalex = c.sqrt(f(d[0]));
                m(d[0]);
                b.shear = d[0][0] * d[1][0] + d[0][1] * d[1][1];
                d[1] = [d[1][0] - d[0][0] * b.shear, d[1][1] - d[0][1] * b.shear];
                b.scaley = c.sqrt(f(d[1]));
                m(d[1]);
                b.shear /= b.scaley;
                0 > this.determinant() && (b.scalex = -b.scalex);
                var e = -d[0][1],
                    d = d[1][1];
                0 > d ? (b.rotate = a.deg(c.acos(d)), 0 > e && (b.rotate = 360 - b.rotate)) : b.rotate = a.deg(c.asin(e));
                b.isSimple = !+b.shear.toFixed(9) && (b.scalex.toFixed(9) == b.scaley.toFixed(9) || !b.rotate);
                b.isSuperSimple = !+b.shear.toFixed(9) && b.scalex.toFixed(9) == b.scaley.toFixed(9) && !b.rotate;
                b.noRotation = !+b.shear.toFixed(9) && !b.rotate;
                return b
            };
            e.toTransformString = function(a) {
                a = a || this.split();
                if (+a.shear.toFixed(9)) return "m" + [this.get(0),
                    this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)
                ];
                a.scalex = +a.scalex.toFixed(4);
                a.scaley = +a.scaley.toFixed(4);
                a.rotate = +a.rotate.toFixed(4);
                return (a.dx || a.dy ? "t" + [+a.dx.toFixed(4), +a.dy.toFixed(4)] : "") + (1 != a.scalex || 1 != a.scaley ? "s" + [a.scalex, a.scaley, 0, 0] : "") + (a.rotate ? "r" + [+a.rotate.toFixed(4), 0, 0] : "")
            }
        })(l.prototype);
        a.Matrix = l;
        a.matrix = function(a, c, d, b, e, f) {
            return new l(a, c, d, b, e, f)
        }
    });
    p.plugin(function(a, e, m, k, p) {
        function l(c) {
            return function(d) {
                f.stop();
                d instanceof p && 1 == d.node.childNodes.length &&
                    ("radialGradient" == d.node.firstChild.tagName || "linearGradient" == d.node.firstChild.tagName || "pattern" == d.node.firstChild.tagName) && (d = d.node.firstChild, b(this).appendChild(d), d = q(d));
                if (d instanceof e)
                    if ("radialGradient" == d.type || "linearGradient" == d.type || "pattern" == d.type) {
                        d.node.id || n(d.node, {
                            id: d.id
                        });
                        var l = h(d.node.id)
                    } else l = d.attr(c);
                else l = a.color(d), l.error ? (l = a(b(this).ownerSVGElement).gradient(d)) ? (l.node.id || n(l.node, {
                    id: l.id
                }), l = h(l.node.id)) : l = d : l = H(l);
                d = {};
                d[c] = l;
                n(this.node, d);
                this.node.style[c] =
                    ""
            }
        }

        function t(a) {
            f.stop();
            a == +a && (a += "px");
            this.node.style.fontSize = a
        }

        function d(a) {
            var b = [];
            a = a.childNodes;
            for (var c = 0, h = a.length; c < h; c++) {
                var e = a[c];
                3 == e.nodeType && b.push(e.nodeValue);
                "tspan" == e.tagName && (1 == e.childNodes.length && 3 == e.firstChild.nodeType ? b.push(e.firstChild.nodeValue) : b.push(d(e)))
            }
            return b
        }

        function c() {
            f.stop();
            return this.node.style.fontSize
        }
        var s = a._.make,
            q = a._.wrap,
            x = a.is,
            b = a._.getSomeDefs,
            B = /^url\(#?([^)]+)\)$/,
            n = a._.$,
            h = a.url,
            H = String,
            K = a._.separator;
        f.on("snap.util.attr.mask",
            function(a) {
                if (a instanceof e || a instanceof p) {
                    f.stop();
                    a instanceof p && 1 == a.node.childNodes.length && (a = a.node.firstChild, b(this).appendChild(a), a = q(a));
                    if ("mask" == a.type) var c = a;
                    else c = s("mask", b(this)), c.node.appendChild(a.node);
                    !c.node.id && n(c.node, {
                        id: c.id
                    });
                    n(this.node, {
                        mask: h(c.id)
                    })
                }
            });
        (function(a) {
            f.on("snap.util.attr.clip", a);
            f.on("snap.util.attr.clip-path", a);
            f.on("snap.util.attr.clipPath", a)
        })(function(a) {
            if (a instanceof e || a instanceof p) {
                f.stop();
                if ("clipPath" == a.type) var c = a;
                else c =
                    s("clipPath", b(this)), c.node.appendChild(a.node), !c.node.id && n(c.node, {
                        id: c.id
                    });
                n(this.node, {
                    "clip-path": h(c.id)
                })
            }
        });
        f.on("snap.util.attr.fill", l("fill"));
        f.on("snap.util.attr.stroke", l("stroke"));
        var C = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
        f.on("snap.util.grad.parse", function(a) {
            a = H(a);
            var b = a.match(C);
            if (!b) return null;
            a = b[1];
            var c = b[2],
                b = b[3],
                c = c.split(/\s*,\s*/).map(function(a) {
                    return +a == a ? +a : a
                });
            1 == c.length && 0 == c[0] && (c = []);
            b = b.split("-");
            b = b.map(function(a) {
                a = a.split(":");
                var b = {
                    color: a[0]
                };
                a[1] &&
                    (b.offset = parseFloat(a[1]));
                return b
            });
            return {
                type: a,
                params: c,
                stops: b
            }
        });
        f.on("snap.util.attr.d", function(b) {
            f.stop();
            x(b, "array") && x(b[0], "array") && (b = a.path.toString.call(b));
            b = H(b);
            b.match(/[ruo]/i) && (b = a.path.toAbsolute(b));
            n(this.node, {
                d: b
            })
        })(-1);
        f.on("snap.util.attr.#text", function(a) {
            f.stop();
            a = H(a);
            for (a = k.doc.createTextNode(a); this.node.firstChild;) this.node.removeChild(this.node.firstChild);
            this.node.appendChild(a)
        })(-1);
        f.on("snap.util.attr.path", function(a) {
            f.stop();
            this.attr({
                d: a
            })
        })(-1);
        f.on("snap.util.attr.class", function(a) {
            f.stop();
            this.node.className.baseVal = a
        })(-1);
        f.on("snap.util.attr.viewBox", function(a) {
            a = x(a, "object") && "x" in a ? [a.x, a.y, a.width, a.height].join(" ") : x(a, "array") ? a.join(" ") : a;
            n(this.node, {
                viewBox: a
            });
            f.stop()
        })(-1);
        f.on("snap.util.attr.transform", function(a) {
            this.transform(a);
            f.stop()
        })(-1);
        f.on("snap.util.attr.r", function(a) {
            "rect" == this.type && (f.stop(), n(this.node, {
                rx: a,
                ry: a
            }))
        })(-1);
        f.on("snap.util.attr.textpath", function(a) {
            f.stop();
            if ("text" == this.type) {
                var c,
                    d;
                if (!a && this.textPath) {
                    for (a = this.textPath; a.node.firstChild;) this.node.appendChild(a.node.firstChild);
                    a.remove();
                    delete this.textPath
                } else if (x(a, "string") ? (c = b(this), a = q(c.parentNode).path(a), c.appendChild(a.node), c = a.id, a.attr({
                        id: c
                    })) : (a = q(a), a instanceof e && (c = a.attr("id"), c || (c = a.id, a.attr({
                        id: c
                    })))), c)
                    if (a = this.textPath, d = this.node, a) a.attr({
                        "xlink:href": "#" + c
                    });
                    else {
                        for (a = n("textPath", {
                                "xlink:href": "#" + c
                            }); d.firstChild;) a.appendChild(d.firstChild);
                        d.appendChild(a);
                        this.textPath = q(a)
                    }
            }
        })(-1);
        f.on("snap.util.attr.text", function(a) {
            if ("text" == this.type) {
                for (var b = this.node, c = function(a) {
                        var b = n("tspan");
                        if (x(a, "array"))
                            for (var d = 0; d < a.length; d++) b.appendChild(c(a[d]));
                        else b.appendChild(k.doc.createTextNode(a));
                        b.normalize && b.normalize();
                        return b
                    }; b.firstChild;) b.removeChild(b.firstChild);
                for (a = c(a); a.firstChild;) b.appendChild(a.firstChild)
            }
            f.stop()
        })(-1);
        f.on("snap.util.attr.fontSize", t)(-1);
        f.on("snap.util.attr.font-size", t)(-1);
        f.on("snap.util.getattr.transform", function() {
            f.stop();
            return this.transform()
        })(-1);
        f.on("snap.util.getattr.textpath", function() {
            f.stop();
            return this.textPath
        })(-1);
        (function() {
            function b(c) {
                return function() {
                    f.stop();
                    var b = k.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + c);
                    return "none" == b ? b : a(k.doc.getElementById(b.match(B)[1]))
                }
            }

            function c(a) {
                return function(b) {
                    f.stop();
                    var c = "marker" + a.charAt(0).toUpperCase() + a.substring(1);
                    if ("" == b || !b) this.node.style[c] = "none";
                    else if ("marker" == b.type) {
                        var d = b.node.id;
                        d || n(b.node, {
                            id: b.id
                        });
                        this.node.style[c] = h(d)
                    }
                }
            }
            f.on("snap.util.getattr.marker-end", b("end"))(-1);
            f.on("snap.util.getattr.markerEnd", b("end"))(-1);
            f.on("snap.util.getattr.marker-start", b("start"))(-1);
            f.on("snap.util.getattr.markerStart", b("start"))(-1);
            f.on("snap.util.getattr.marker-mid", b("mid"))(-1);
            f.on("snap.util.getattr.markerMid", b("mid"))(-1);
            f.on("snap.util.attr.marker-end", c("end"))(-1);
            f.on("snap.util.attr.markerEnd", c("end"))(-1);
            f.on("snap.util.attr.marker-start", c("start"))(-1);
            f.on("snap.util.attr.markerStart",
                c("start"))(-1);
            f.on("snap.util.attr.marker-mid", c("mid"))(-1);
            f.on("snap.util.attr.markerMid", c("mid"))(-1)
        })();
        f.on("snap.util.getattr.r", function() {
            if ("rect" == this.type && n(this.node, "rx") == n(this.node, "ry")) return f.stop(), n(this.node, "rx")
        })(-1);
        f.on("snap.util.getattr.text", function() {
            if ("text" == this.type || "tspan" == this.type) {
                f.stop();
                var a = d(this.node);
                return 1 == a.length ? a[0] : a
            }
        })(-1);
        f.on("snap.util.getattr.#text", function() {
            return this.node.textContent
        })(-1);
        f.on("snap.util.getattr.viewBox",
            function() {
                f.stop();
                var b = n(this.node, "viewBox");
                if (b) return b = b.split(K), a._.box(+b[0], +b[1], +b[2], +b[3])
            })(-1);
        f.on("snap.util.getattr.points", function() {
            var a = n(this.node, "points");
            f.stop();
            if (a) return a.split(K)
        })(-1);
        f.on("snap.util.getattr.path", function() {
            var a = n(this.node, "d");
            f.stop();
            return a
        })(-1);
        f.on("snap.util.getattr.class", function() {
            return this.node.className.baseVal
        })(-1);
        f.on("snap.util.getattr.fontSize", c)(-1);
        f.on("snap.util.getattr.font-size", c)(-1)
    });
    p.plugin(function(a, e, m,
        k, p) {
        function l(a) {
            return a
        }

        function t(a) {
            return function(b) {
                return +b.toFixed(3) + a
            }
        }
        var d = {
                "+": function(a, b) {
                    return a + b
                },
                "-": function(a, b) {
                    return a - b
                },
                "/": function(a, b) {
                    return a / b
                },
                "*": function(a, b) {
                    return a * b
                }
            },
            c = String,
            s = /[a-z]+$/i,
            q = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
        f.on("snap.util.attr", function(a) {
            if (a = c(a).match(q)) {
                var b = f.nt(),
                    b = b.substring(b.lastIndexOf(".") + 1),
                    e = this.attr(b),
                    n = {};
                f.stop();
                var h = a[3] || "",
                    l = e.match(s),
                    m = d[a[1]];
                l && l == h ? a = m(parseFloat(e), +a[2]) : (e = this.asPX(b),
                    a = m(this.asPX(b), this.asPX(b, a[2] + h)));
                isNaN(e) || isNaN(a) || (n[b] = a, this.attr(n))
            }
        })(-10);
        f.on("snap.util.equal", function(a, b) {
            var e = c(this.attr(a) || ""),
                n = c(b).match(q);
            if (n) {
                f.stop();
                var h = n[3] || "",
                    m = e.match(s),
                    k = d[n[1]];
                if (m && m == h) return {
                    from: parseFloat(e),
                    to: k(parseFloat(e), +n[2]),
                    f: t(m)
                };
                e = this.asPX(a);
                return {
                    from: e,
                    to: k(e, this.asPX(a, n[2] + h)),
                    f: l
                }
            }
        })(-10)
    });
    p.plugin(function(a, e, m, k, p) {
        var l = m.prototype,
            t = a.is;
        l.rect = function(a, d, e, f, b, l) {
            var n;
            null == l && (l = b);
            t(a, "object") && "[object Object]" ==
                a ? n = a : null != a && (n = {
                    x: a,
                    y: d,
                    width: e,
                    height: f
                }, null != b && (n.rx = b, n.ry = l));
            return this.el("rect", n)
        };
        l.circle = function(a, d, e) {
            var f;
            t(a, "object") && "[object Object]" == a ? f = a : null != a && (f = {
                cx: a,
                cy: d,
                r: e
            });
            return this.el("circle", f)
        };
        var d = function() {
            function a() {
                this.parentNode.removeChild(this)
            }
            return function(d, e) {
                var f = k.doc.createElement("img"),
                    b = k.doc.body;
                f.style.cssText = "position:absolute;left:-9999em;top:-9999em";
                f.onload = function() {
                    e.call(f);
                    f.onload = f.onerror = null;
                    b.removeChild(f)
                };
                f.onerror = a;
                b.appendChild(f);
                f.src = d
            }
        }();
        l.image = function(c, e, f, l, b) {
            var m = this.el("image");
            if (t(c, "object") && "src" in c) m.attr(c);
            else if (null != c) {
                var n = {
                    "xlink:href": c,
                    preserveAspectRatio: "none"
                };
                null != e && null != f && (n.x = e, n.y = f);
                null != l && null != b ? (n.width = l, n.height = b) : d(c, function() {
                    a._.$(m.node, {
                        width: this.offsetWidth,
                        height: this.offsetHeight
                    })
                });
                a._.$(m.node, n)
            }
            return m
        };
        l.ellipse = function(a, d, e, f) {
            var b;
            t(a, "object") && "[object Object]" == a ? b = a : null != a && (b = {
                cx: a,
                cy: d,
                rx: e,
                ry: f
            });
            return this.el("ellipse", b)
        };
        l.path = function(a) {
            var d;
            t(a, "object") && !t(a, "array") ? d = a : a && (d = {
                d: a
            });
            return this.el("path", d)
        };
        l.group = l.g = function(a) {
            var d = this.el("g");
            1 == arguments.length && a && !a.type ? d.attr(a) : arguments.length && d.add(Array.prototype.slice.call(arguments, 0));
            return d
        };
        l.svg = function(a, d, e, f, b, l, n, h) {
            var m = {};
            t(a, "object") && null == d ? m = a : (null != a && (m.x = a), null != d && (m.y = d), null != e && (m.width = e), null != f && (m.height = f), null != b && null != l && null != n && null != h && (m.viewBox = [b, l, n, h]));
            return this.el("svg", m)
        };
        l.mask = function(a) {
            var d =
                this.el("mask");
            1 == arguments.length && a && !a.type ? d.attr(a) : arguments.length && d.add(Array.prototype.slice.call(arguments, 0));
            return d
        };
        l.ptrn = function(a, d, e, f, b, l, n, h) {
            if (t(a, "object")) var m = a;
            else arguments.length ? (m = {}, null != a && (m.x = a), null != d && (m.y = d), null != e && (m.width = e), null != f && (m.height = f), null != b && null != l && null != n && null != h && (m.viewBox = [b, l, n, h])) : m = {
                patternUnits: "userSpaceOnUse"
            };
            return this.el("pattern", m)
        };
        l.use = function(a) {
            return null != a ? (make("use", this.node), a instanceof e && (a.attr("id") ||
                a.attr({
                    id: ID()
                }), a = a.attr("id")), this.el("use", {
                "xlink:href": a
            })) : e.prototype.use.call(this)
        };
        l.text = function(a, d, e) {
            var f = {};
            t(a, "object") ? f = a : null != a && (f = {
                x: a,
                y: d,
                text: e || ""
            });
            return this.el("text", f)
        };
        l.line = function(a, d, e, f) {
            var b = {};
            t(a, "object") ? b = a : null != a && (b = {
                x1: a,
                x2: e,
                y1: d,
                y2: f
            });
            return this.el("line", b)
        };
        l.polyline = function(a) {
            1 < arguments.length && (a = Array.prototype.slice.call(arguments, 0));
            var d = {};
            t(a, "object") && !t(a, "array") ? d = a : null != a && (d = {
                points: a
            });
            return this.el("polyline", d)
        };
        l.polygon = function(a) {
            1 < arguments.length && (a = Array.prototype.slice.call(arguments, 0));
            var d = {};
            t(a, "object") && !t(a, "array") ? d = a : null != a && (d = {
                points: a
            });
            return this.el("polygon", d)
        };
        (function() {
            function c() {
                return this.selectAll("stop")
            }

            function d(b, c) {
                var e = n("stop"),
                    f = {
                        offset: +c + "%"
                    };
                b = a.color(b);
                f["stop-color"] = b.hex;
                1 > b.opacity && (f["stop-opacity"] = b.opacity);
                n(e, f);
                this.node.appendChild(e);
                return this
            }

            function e() {
                if ("linearGradient" == this.type) {
                    var b = n(this.node, "x1") || 0,
                        c = n(this.node, "x2") ||
                        1,
                        d = n(this.node, "y1") || 0,
                        f = n(this.node, "y2") || 0;
                    return a._.box(b, d, math.abs(c - b), math.abs(f - d))
                }
                b = this.node.r || 0;
                return a._.box((this.node.cx || .5) - b, (this.node.cy || .5) - b, 2 * b, 2 * b)
            }

            function m(a, c) {
                function d(a, b) {
                    for (var c = (b - p) / (a - t), e = t; e < a; e++) s[e].offset = +(+p + c * (e - t)).toFixed(2);
                    t = a;
                    p = b
                }
                var e = f("snap.util.grad.parse", null, c).firstDefined(),
                    l;
                if (!e) return null;
                e.params.unshift(a);
                l = "l" == e.type.toLowerCase() ? b.apply(0, e.params) : k.apply(0, e.params);
                e.type != e.type.toLowerCase() && n(l.node, {
                    gradientUnits: "userSpaceOnUse"
                });
                var s = e.stops,
                    e = s.length,
                    p = 0,
                    t = 0;
                e--;
                for (var q = 0; q < e; q++) "offset" in s[q] && d(q, s[q].offset);
                s[e].offset = s[e].offset || 100;
                d(e, s[e].offset);
                for (q = 0; q <= e; q++) {
                    var w = s[q];
                    l.addStop(w.color, w.offset)
                }
                return l
            }

            function b(b, f, l, m, k) {
                b = a._.make("linearGradient", b);
                b.stops = c;
                b.addStop = d;
                b.getBBox = e;
                null != f && n(b.node, {
                    x1: f,
                    y1: l,
                    x2: m,
                    y2: k
                });
                return b
            }

            function k(b, f, l, m, p, t) {
                b = a._.make("radialGradient", b);
                b.stops = c;
                b.addStop = d;
                b.getBBox = e;
                null != f && n(b.node, {
                    cx: f,
                    cy: l,
                    r: m
                });
                null != p && null != t && n(b.node, {
                    fx: p,
                    fy: t
                });
                return b
            }
            var n = a._.$;
            l.gradient = function(a) {
                return m(this.defs, a)
            };
            l.gradientLinear = function(a, c, d, e) {
                return b(this.defs, a, c, d, e)
            };
            l.gradientRadial = function(a, b, c, d, e) {
                return k(this.defs, a, b, c, d, e)
            };
            l.toString = function() {
                var b = this.node.ownerDocument,
                    c = b.createDocumentFragment(),
                    b = b.createElement("div"),
                    d = this.node.cloneNode(!0);
                c.appendChild(b);
                b.appendChild(d);
                a._.$(d, {
                    xmlns: "http://www.w3.org/2000/svg"
                });
                b = b.innerHTML;
                c.removeChild(c.firstChild);
                return b
            };
            l.clear = function() {
                for (var a = this.node.firstChild,
                        b; a;) b = a.nextSibling, "defs" != a.tagName ? a.parentNode.removeChild(a) : l.clear.call({
                    node: a
                }), a = b
            }
        })()
    });
    p.plugin(function(a, e, f, k) {
        function p(a) {
            var b = p.ps = p.ps || {};
            b[a] ? b[a].sleep = 100 : b[a] = {
                sleep: 100
            };
            setTimeout(function() {
                for (var c in b) b.hasOwnProperty(c) && c != a && (b[c].sleep--, !b[c].sleep && delete b[c])
            });
            return b[a]
        }

        function l(a, b, c, d) {
            null == a && (a = b = c = d = 0);
            null == b && (b = a.y, c = a.width, d = a.height, a = a.x);
            return {
                x: a,
                y: b,
                width: c,
                w: c,
                height: d,
                h: d,
                x2: a + c,
                y2: b + d,
                cx: a + c / 2,
                cy: b + d / 2,
                r1: E.min(c, d) / 2,
                r2: E.max(c,
                    d) / 2,
                r0: E.sqrt(c * c + d * d) / 2,
                path: K(a, b, c, d),
                vb: [a, b, c, d].join(" ")
            }
        }

        function t() {
            return this.join(",").replace(I, "$1")
        }

        function d(a) {
            a = V(a);
            a.toString = t;
            return a
        }

        function c(a, b, c, d, e, h, f, l, m) {
            if (null == m) return n(a, b, c, d, e, h, f, l);
            if (0 > m || n(a, b, c, d, e, h, f, l) < m) m = void 0;
            else {
                var k = .5,
                    p = 1 - k,
                    s;
                for (s = n(a, b, c, d, e, h, f, l, p);.01 < aa(s - m);) k /= 2, p += (s < m ? 1 : -1) * k, s = n(a, b, c, d, e, h, f, l, p);
                m = p
            }
            return q(a, b, c, d, e, h, f, l, m)
        }

        function s(b, d) {
            function h(a) {
                return +(+a).toFixed(3)
            }
            return a._.cacher(function(a, f, l) {
                a instanceof
                e && (a = a.attr("d"));
                a = Q(a);
                for (var n, m, k, p, s = "", t = {}, A = 0, z = 0, y = a.length; z < y; z++) {
                    k = a[z];
                    if ("M" == k[0]) n = +k[1], m = +k[2];
                    else {
                        p = c(n, m, k[1], k[2], k[3], k[4], k[5], k[6]);
                        if (A + p > f) {
                            if (d && !t.start) {
                                n = c(n, m, k[1], k[2], k[3], k[4], k[5], k[6], f - A);
                                s += ["C" + h(n.start.x), h(n.start.y), h(n.m.x), h(n.m.y), h(n.x), h(n.y)];
                                if (l) return s;
                                t.start = s;
                                s = ["M" + h(n.x), h(n.y) + "C" + h(n.n.x), h(n.n.y), h(n.end.x), h(n.end.y), h(k[5]), h(k[6])].join();
                                A += p;
                                n = +k[5];
                                m = +k[6];
                                continue
                            }
                            if (!b && !d) return n = c(n, m, k[1], k[2], k[3], k[4], k[5], k[6], f - A)
                        }
                        A +=
                            p;
                        n = +k[5];
                        m = +k[6]
                    }
                    s += k.shift() + k
                }
                t.end = s;
                return n = b ? A : d ? t : q(n, m, k[0], k[1], k[2], k[3], k[4], k[5], 1)
            }, null, a._.clone)
        }

        function q(a, b, c, d, e, h, f, n, l) {
            var k = 1 - l,
                m = $(k, 3),
                s = $(k, 2),
                p = l * l,
                t = p * l,
                q = m * a + 3 * s * l * c + 3 * k * l * l * e + t * f,
                m = m * b + 3 * s * l * d + 3 * k * l * l * h + t * n,
                s = a + 2 * l * (c - a) + p * (e - 2 * c + a),
                t = b + 2 * l * (d - b) + p * (h - 2 * d + b),
                y = c + 2 * l * (e - c) + p * (f - 2 * e + c),
                p = d + 2 * l * (h - d) + p * (n - 2 * h + d);
            a = k * a + l * c;
            b = k * b + l * d;
            e = k * e + l * f;
            h = k * h + l * n;
            n = 90 - 180 * E.atan2(s - y, t - p) / O;
            return {
                x: q,
                y: m,
                m: {
                    x: s,
                    y: t
                },
                n: {
                    x: y,
                    y: p
                },
                start: {
                    x: a,
                    y: b
                },
                end: {
                    x: e,
                    y: h
                },
                alpha: n
            }
        }

        function x(b,
            c, d, e, h, f, n, k) {
            a.is(b, "array") || (b = [b, c, d, e, h, f, n, k]);
            b = L.apply(null, b);
            return l(b.min.x, b.min.y, b.max.x - b.min.x, b.max.y - b.min.y)
        }

        function b(a, b, c) {
            return b >= a.x && b <= a.x + a.width && c >= a.y && c <= a.y + a.height
        }

        function v(a, c) {
            a = l(a);
            c = l(c);
            return b(c, a.x, a.y) || b(c, a.x2, a.y) || b(c, a.x, a.y2) || b(c, a.x2, a.y2) || b(a, c.x, c.y) || b(a, c.x2, c.y) || b(a, c.x, c.y2) || b(a, c.x2, c.y2) || (a.x < c.x2 && a.x > c.x || c.x < a.x2 && c.x > a.x) && (a.y < c.y2 && a.y > c.y || c.y < a.y2 && c.y > a.y)
        }

        function n(a, b, c, d, e, h, f, n, l) {
            null == l && (l = 1);
            l = (1 < l ? 1 : 0 > l ? 0 : l) /
                2;
            for (var k = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], m = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], p = 0, s = 0; 12 > s; s++) var t = l * k[s] + l,
                q = t * (t * (-3 * a + 9 * c - 9 * e + 3 * f) + 6 * a - 12 * c + 6 * e) - 3 * a + 3 * c,
                t = t * (t * (-3 * b + 9 * d - 9 * h + 3 * n) + 6 * b - 12 * d + 6 * h) - 3 * b + 3 * d,
                p = p + m[s] * E.sqrt(q * q + t * t);
            return l * p
        }

        function h(a, b, c) {
            a = Q(a);
            b = Q(b);
            for (var d, e, h, f, l, k, m, p, s, t, z = c ? 0 : [], y = 0, w = a.length; y < w; y++)
                if (s = a[y], "M" == s[0]) d = l = s[1], e = k = s[2];
                else {
                    "C" == s[0] ? (s = [d, e].concat(s.slice(1)),
                        d = s[6], e = s[7]) : (s = [d, e, d, e, l, k, l, k], d = l, e = k);
                    for (var C = 0, K = b.length; C < K; C++)
                        if (t = b[C], "M" == t[0]) h = m = t[1], f = p = t[2];
                        else {
                            "C" == t[0] ? (t = [h, f].concat(t.slice(1)), h = t[6], f = t[7]) : (t = [h, f, h, f, m, p, m, p], h = m, f = p);
                            var u;
                            var D = s,
                                G = t;
                            u = c;
                            var J = x(D),
                                T = x(G);
                            if (v(J, T)) {
                                for (var J = n.apply(0, D), T = n.apply(0, G), J = ~~(J / 8), T = ~~(T / 8), H = [], N = [], F = {}, R = u ? 0 : [], L = 0; L < J + 1; L++) {
                                    var W = q.apply(0, D.concat(L / J));
                                    H.push({
                                        x: W.x,
                                        y: W.y,
                                        t: L / J
                                    })
                                }
                                for (L = 0; L < T + 1; L++) W = q.apply(0, G.concat(L / T)), N.push({
                                    x: W.x,
                                    y: W.y,
                                    t: L / T
                                });
                                for (L = 0; L < J; L++)
                                    for (D =
                                        0; D < T; D++) {
                                        var E = H[L],
                                            M = H[L + 1],
                                            G = N[D],
                                            W = N[D + 1],
                                            I = .001 > aa(M.x - E.x) ? "y" : "x",
                                            O = .001 > aa(W.x - G.x) ? "y" : "x",
                                            U;
                                        U = E.x;
                                        var V = E.y,
                                            Y = M.x,
                                            Z = M.y,
                                            $ = G.x,
                                            ca = G.y,
                                            da = W.x,
                                            ea = W.y;
                                        if (P(U, Y) < X($, da) || X(U, Y) > P($, da) || P(V, Z) < X(ca, ea) || X(V, Z) > P(ca, ea)) U = void 0;
                                        else {
                                            var ia = (U * Z - V * Y) * ($ - da) - (U - Y) * ($ * ea - ca * da),
                                                ja = (U * Z - V * Y) * (ca - ea) - (V - Z) * ($ * ea - ca * da),
                                                fa = (U - Y) * (ca - ea) - (V - Z) * ($ - da);
                                            if (fa) {
                                                var ia = ia / fa,
                                                    ja = ja / fa,
                                                    fa = +ia.toFixed(2),
                                                    ka = +ja.toFixed(2);
                                                U = fa < +X(U, Y).toFixed(2) || fa > +P(U, Y).toFixed(2) || fa < +X($, da).toFixed(2) || fa > +P($, da).toFixed(2) ||
                                                    ka < +X(V, Z).toFixed(2) || ka > +P(V, Z).toFixed(2) || ka < +X(ca, ea).toFixed(2) || ka > +P(ca, ea).toFixed(2) ? void 0 : {
                                                        x: ia,
                                                        y: ja
                                                    }
                                            } else U = void 0
                                        }
                                        U && F[U.x.toFixed(4)] != U.y.toFixed(4) && (F[U.x.toFixed(4)] = U.y.toFixed(4), E = E.t + aa((U[I] - E[I]) / (M[I] - E[I])) * (M.t - E.t), G = G.t + aa((U[O] - G[O]) / (W[O] - G[O])) * (W.t - G.t), 0 <= E && 1 >= E && 0 <= G && 1 >= G && (u ? R++ : R.push({
                                            x: U.x,
                                            y: U.y,
                                            t1: E,
                                            t2: G
                                        })))
                                    }
                                u = R
                            } else u = u ? 0 : [];
                            if (c) z += u;
                            else {
                                J = 0;
                                for (T = u.length; J < T; J++) u[J].segment1 = y, u[J].segment2 = C, u[J].bez1 = s, u[J].bez2 = t;
                                z = z.concat(u)
                            }
                        }
                }
            return z
        }

        function H(a) {
            var b =
                p(a);
            if (b.bbox) return V(b.bbox);
            if (!a) return l();
            a = Q(a);
            for (var c = 0, d = 0, e = [], h = [], f, n = 0, k = a.length; n < k; n++) f = a[n], "M" == f[0] ? (c = f[1], d = f[2], e.push(c), h.push(d)) : (c = L(c, d, f[1], f[2], f[3], f[4], f[5], f[6]), e = e.concat(c.min.x, c.max.x), h = h.concat(c.min.y, c.max.y), c = f[5], d = f[6]);
            a = X.apply(0, e);
            f = X.apply(0, h);
            e = P.apply(0, e);
            h = P.apply(0, h);
            h = l(a, f, e - a, h - f);
            b.bbox = V(h);
            return h
        }

        function K(a, b, c, d, e) {
            if (e) return [
                ["M", +a + +e, b],
                ["l", c - 2 * e, 0],
                ["a", e, e, 0, 0, 1, e, e],
                ["l", 0, d - 2 * e],
                ["a", e, e, 0, 0, 1, -e, e],
                ["l", 2 * e - c, 0],
                ["a", e, e, 0, 0, 1, -e, -e],
                ["l", 0, 2 * e - d],
                ["a", e, e, 0, 0, 1, e, -e],
                ["z"]
            ];
            a = [
                ["M", a, b],
                ["l", c, 0],
                ["l", 0, d],
                ["l", -c, 0],
                ["z"]
            ];
            a.toString = t;
            return a
        }

        function C(a, b, c, d, e) {
            null == e && null == d && (d = c);
            a = +a;
            b = +b;
            c = +c;
            d = +d;
            if (null != e) {
                var h = Math.PI / 180,
                    f = a + c * Math.cos(-d * h);
                a += c * Math.cos(-e * h);
                var n = b + c * Math.sin(-d * h);
                b += c * Math.sin(-e * h);
                c = [
                    ["M", f, n],
                    ["A", c, c, 0, +(180 < e - d), 0, a, b]
                ]
            } else c = [
                ["M", a, b],
                ["m", 0, -d],
                ["a", c, d, 0, 1, 1, 0, 2 * d],
                ["a", c, d, 0, 1, 1, 0, -2 * d],
                ["z"]
            ];
            c.toString = t;
            return c
        }

        function y(b) {
            var c = p(b);
            if (c.abs) return d(c.abs);
            M(b, "array") && M(b && b[0], "array") || (b = a.parsePathString(b));
            if (!b || !b.length) return [
                ["M", 0, 0]
            ];
            var e = [],
                h = 0,
                f = 0,
                n = 0,
                l = 0,
                k = 0;
            "M" == b[0][0] && (h = +b[0][1], f = +b[0][2], n = h, l = f, k++, e[0] = ["M", h, f]);
            for (var m = 3 == b.length && "M" == b[0][0] && "R" == b[1][0].toUpperCase() && "Z" == b[2][0].toUpperCase(), s, q, y = k, x = b.length; y < x; y++) {
                e.push(s = []);
                q = b[y];
                k = q[0];
                if (k != k.toUpperCase()) switch (s[0] = k.toUpperCase(), s[0]) {
                        case "A":
                            s[1] = q[1];
                            s[2] = q[2];
                            s[3] = q[3];
                            s[4] = q[4];
                            s[5] = q[5];
                            s[6] = +q[6] + h;
                            s[7] = +q[7] + f;
                            break;
                        case "V":
                            s[1] = +q[1] +
                                f;
                            break;
                        case "H":
                            s[1] = +q[1] + h;
                            break;
                        case "R":
                            for (var z = [h, f].concat(q.slice(1)), u = 2, v = z.length; u < v; u++) z[u] = +z[u] + h, z[++u] = +z[u] + f;
                            e.pop();
                            e = e.concat(F(z, m));
                            break;
                        case "O":
                            e.pop();
                            z = C(h, f, q[1], q[2]);
                            z.push(z[0]);
                            e = e.concat(z);
                            break;
                        case "U":
                            e.pop();
                            e = e.concat(C(h, f, q[1], q[2], q[3]));
                            s = ["U"].concat(e[e.length - 1].slice(-2));
                            break;
                        case "M":
                            n = +q[1] + h, l = +q[2] + f;
                        default:
                            for (u = 1, v = q.length; u < v; u++) s[u] = +q[u] + (u % 2 ? h : f)
                    } else if ("R" == k) z = [h, f].concat(q.slice(1)), e.pop(), e = e.concat(F(z, m)), s = ["R"].concat(q.slice(-2));
                    else if ("O" == k) e.pop(), z = C(h, f, q[1], q[2]), z.push(z[0]), e = e.concat(z);
                else if ("U" == k) e.pop(), e = e.concat(C(h, f, q[1], q[2], q[3])), s = ["U"].concat(e[e.length - 1].slice(-2));
                else
                    for (z = 0, u = q.length; z < u; z++) s[z] = q[z];
                k = k.toUpperCase();
                if ("O" != k) switch (s[0]) {
                    case "Z":
                        h = +n;
                        f = +l;
                        break;
                    case "H":
                        h = s[1];
                        break;
                    case "V":
                        f = s[1];
                        break;
                    case "M":
                        n = s[s.length - 2], l = s[s.length - 1];
                    default:
                        h = s[s.length - 2], f = s[s.length - 1]
                }
            }
            e.toString = t;
            c.abs = d(e);
            return e
        }

        function D(a, b, c, d) {
            return [a, b, c, d, c, d]
        }

        function N(a, b, c, d, e, h) {
            var f =
                1 / 3,
                n = 2 / 3;
            return [f * a + n * c, f * b + n * d, f * e + n * c, f * h + n * d, e, h]
        }

        function R(b, c, d, e, h, f, n, l, k, m) {
            var s = 120 * O / 180,
                p = O / 180 * (+h || 0),
                t = [],
                q, y = a._.cacher(function(a, b, c) {
                    var d = a * E.cos(c) - b * E.sin(c);
                    a = a * E.sin(c) + b * E.cos(c);
                    return {
                        x: d,
                        y: a
                    }
                });
            if (m) x = m[0], q = m[1], f = m[2], w = m[3];
            else {
                q = y(b, c, -p);
                b = q.x;
                c = q.y;
                q = y(l, k, -p);
                l = q.x;
                k = q.y;
                E.cos(O / 180 * h);
                E.sin(O / 180 * h);
                q = (b - l) / 2;
                x = (c - k) / 2;
                w = q * q / (d * d) + x * x / (e * e);
                1 < w && (w = E.sqrt(w), d *= w, e *= w);
                var w = d * d,
                    u = e * e,
                    w = (f == n ? -1 : 1) * E.sqrt(aa((w * u - w * x * x - u * q * q) / (w * x * x + u * q * q)));
                f = w * d * x / e + (b + l) /
                    2;
                var w = w * -e * q / d + (c + k) / 2,
                    x = E.asin(((c - w) / e).toFixed(9));
                q = E.asin(((k - w) / e).toFixed(9));
                x = b < f ? O - x : x;
                q = l < f ? O - q : q;
                0 > x && (x = 2 * O + x);
                0 > q && (q = 2 * O + q);
                n && x > q && (x -= 2 * O);
                !n && q > x && (q -= 2 * O)
            }
            if (aa(q - x) > s) {
                var t = q,
                    u = l,
                    v = k;
                q = x + s * (n && q > x ? 1 : -1);
                l = f + d * E.cos(q);
                k = w + e * E.sin(q);
                t = R(l, k, d, e, h, 0, n, u, v, [q, t, f, w])
            }
            f = q - x;
            h = E.cos(x);
            s = E.sin(x);
            n = E.cos(q);
            q = E.sin(q);
            f = E.tan(f / 4);
            d = 4 / 3 * d * f;
            f *= 4 / 3 * e;
            e = [b, c];
            b = [b + d * s, c - f * h];
            c = [l + d * q, k - f * n];
            l = [l, k];
            b[0] = 2 * e[0] - b[0];
            b[1] = 2 * e[1] - b[1];
            if (m) return [b, c, l].concat(t);
            t = [b, c, l].concat(t).join().split(",");
            m = [];
            l = 0;
            for (k = t.length; l < k; l++) m[l] = l % 2 ? y(t[l - 1], t[l], p).y : y(t[l], t[l + 1], p).x;
            return m
        }

        function L(a, b, c, d, e, h, f, l) {
            for (var n = [], k = [
                    [],
                    []
                ], m, s, q, p, t = 0; 2 > t; ++t) 0 == t ? (s = 6 * a - 12 * c + 6 * e, m = -3 * a + 9 * c - 9 * e + 3 * f, q = 3 * c - 3 * a) : (s = 6 * b - 12 * d + 6 * h, m = -3 * b + 9 * d - 9 * h + 3 * l, q = 3 * d - 3 * b), 1E-12 > aa(m) ? 1E-12 > aa(s) || (m = -q / s, 0 < m && 1 > m && n.push(m)) : (p = s * s - 4 * q * m, q = E.sqrt(p), 0 > p || (p = (-s + q) / (2 * m), 0 < p && 1 > p && n.push(p), m = (-s - q) / (2 * m), 0 < m && 1 > m && n.push(m)));
            for (s = t = n.length; t--;) m = n[t], q = 1 - m, k[0][t] = q * q * q * a + 3 * q * q * m * c + 3 * q * m * m * e + m * m * m * f, k[1][t] = q *
                q * q * b + 3 * q * q * m * d + 3 * q * m * m * h + m * m * m * l;
            k[0][s] = a;
            k[1][s] = b;
            k[0][s + 1] = f;
            k[1][s + 1] = l;
            k[0].length = k[1].length = s + 2;
            return {
                min: {
                    x: X.apply(0, k[0]),
                    y: X.apply(0, k[1])
                },
                max: {
                    x: P.apply(0, k[0]),
                    y: P.apply(0, k[1])
                }
            }
        }

        function Q(a, b) {
            var c = !b && p(a);
            if (!b && c.curve) return d(c.curve);
            var e = y(a),
                h = b && y(b),
                f = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                l = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                n = function(a, b, c) {
                    if (!a) return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
                    a[0] in {
                        T: 1,
                        Q: 1
                    } || (b.qx = b.qy = null);
                    switch (a[0]) {
                        case "M":
                            b.X = a[1];
                            b.Y =
                                a[2];
                            break;
                        case "A":
                            a = ["C"].concat(R.apply(0, [b.x, b.y].concat(a.slice(1))));
                            break;
                        case "S":
                            "C" == c || "S" == c ? (c = 2 * b.x - b.bx, b = 2 * b.y - b.by) : (c = b.x, b = b.y);
                            a = ["C", c, b].concat(a.slice(1));
                            break;
                        case "T":
                            "Q" == c || "T" == c ? (b.qx = 2 * b.x - b.qx, b.qy = 2 * b.y - b.qy) : (b.qx = b.x, b.qy = b.y);
                            a = ["C"].concat(N(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                            break;
                        case "Q":
                            b.qx = a[1];
                            b.qy = a[2];
                            a = ["C"].concat(N(b.x, b.y, a[1], a[2], a[3], a[4]));
                            break;
                        case "L":
                            a = ["C"].concat(D(b.x, b.y, a[1], a[2]));
                            break;
                        case "H":
                            a = ["C"].concat(D(b.x, b.y, a[1], b.y));
                            break;
                        case "V":
                            a = ["C"].concat(D(b.x, b.y, b.x, a[1]));
                            break;
                        case "Z":
                            a = ["C"].concat(D(b.x, b.y, b.X, b.Y))
                    }
                    return a
                },
                k = function(a, b) {
                    if (7 < a[b].length) {
                        a[b].shift();
                        for (var c = a[b]; c.length;) s[b] = "A", h && (q[b] = "A"), a.splice(b++, 0, ["C"].concat(c.splice(0, 6)));
                        a.splice(b, 1);
                        v = P(e.length, h && h.length || 0)
                    }
                },
                m = function(a, b, c, d, f) {
                    a && b && "M" == a[f][0] && "M" != b[f][0] && (b.splice(f, 0, ["M", d.x, d.y]), c.bx = 0, c.by = 0, c.x = a[f][1], c.y = a[f][2], v = P(e.length, h && h.length || 0))
                },
                s = [],
                q = [],
                t = "",
                x = "",
                u = 0,
                v = P(e.length, h && h.length || 0);
            for (; u <
                v; u++) {
                e[u] && (t = e[u][0]);
                "C" != t && (s[u] = t, u && (x = s[u - 1]));
                e[u] = n(e[u], f, x);
                "A" != s[u] && "C" == t && (s[u] = "C");
                k(e, u);
                h && (h[u] && (t = h[u][0]), "C" != t && (q[u] = t, u && (x = q[u - 1])), h[u] = n(h[u], l, x), "A" != q[u] && "C" == t && (q[u] = "C"), k(h, u));
                m(e, h, f, l, u);
                m(h, e, l, f, u);
                var C = e[u],
                    B = h && h[u],
                    K = C.length,
                    T = h && B.length;
                f.x = C[K - 2];
                f.y = C[K - 1];
                f.bx = Z(C[K - 4]) || f.x;
                f.by = Z(C[K - 3]) || f.y;
                l.bx = h && (Z(B[T - 4]) || l.x);
                l.by = h && (Z(B[T - 3]) || l.y);
                l.x = h && B[T - 2];
                l.y = h && B[T - 1]
            }
            h || (c.curve = d(e));
            return h ? [e, h] : e
        }

        function F(a, b) {
            for (var c = [], d = 0, e = a.length; e -
                2 * !b > d; d += 2) {
                var h = [{
                    x: +a[d - 2],
                    y: +a[d - 1]
                }, {
                    x: +a[d],
                    y: +a[d + 1]
                }, {
                    x: +a[d + 2],
                    y: +a[d + 3]
                }, {
                    x: +a[d + 4],
                    y: +a[d + 5]
                }];
                b ? d ? e - 4 == d ? h[3] = {
                    x: +a[0],
                    y: +a[1]
                } : e - 2 == d && (h[2] = {
                    x: +a[0],
                    y: +a[1]
                }, h[3] = {
                    x: +a[2],
                    y: +a[3]
                }) : h[0] = {
                    x: +a[e - 2],
                    y: +a[e - 1]
                } : e - 4 == d ? h[3] = h[2] : d || (h[0] = {
                    x: +a[d],
                    y: +a[d + 1]
                });
                c.push(["C", (-h[0].x + 6 * h[1].x + h[2].x) / 6, (-h[0].y + 6 * h[1].y + h[2].y) / 6, (h[1].x + 6 * h[2].x - h[3].x) / 6, (h[1].y + 6 * h[2].y - h[3].y) / 6, h[2].x, h[2].y])
            }
            return c
        }
        f = e.prototype;
        var M = a.is,
            V = a._.clone,
            I = /,?([a-z]),?/gi,
            Z = parseFloat,
            E = Math,
            O = E.PI,
            X =
            E.min,
            P = E.max,
            $ = E.pow,
            aa = E.abs;
        k = s(1);
        var Y = s(),
            T = s(0, 1),
            W = a._unit2px;
        a.path = p;
        a.path.getTotalLength = k;
        a.path.getPointAtLength = Y;
        a.path.getSubpath = function(a, b, c) {
            if (1E-6 > this.getTotalLength(a) - c) return T(a, b).end;
            a = T(a, c, 1);
            return b ? T(a, b).end : a
        };
        f.getTotalLength = function() {
            if (this.node.getTotalLength) return this.node.getTotalLength()
        };
        f.getPointAtLength = function(a) {
            return Y(this.attr("d"), a)
        };
        f.getSubpath = function(b, c) {
            return a.path.getSubpath(this.attr("d"), b, c)
        };
        a._.box = l;
        a.path.findDotsAtSegment =
            q;
        a.path.bezierBBox = x;
        a.path.isPointInsideBBox = b;
        a.path.isBBoxIntersect = v;
        a.path.intersection = function(a, b) {
            return h(a, b)
        };
        a.path.intersectionNumber = function(a, b) {
            return h(a, b, 1)
        };
        a.path.isPointInside = function(a, c, d) {
            var e = H(a);
            return b(e, c, d) && 1 == h(a, [
                ["M", c, d],
                ["H", e.x2 + 10]
            ], 1) % 2
        };
        a.path.getBBox = H;
        a.path.get = {
            path: function(a) {
                return a.attr("path")
            },
            circle: function(a) {
                a = W(a);
                return C(a.cx, a.cy, a.r)
            },
            ellipse: function(a) {
                a = W(a);
                return C(a.cx || 0, a.cy || 0, a.rx, a.ry)
            },
            rect: function(a) {
                a = W(a);
                return K(a.x ||
                    0, a.y || 0, a.width, a.height, a.rx, a.ry)
            },
            image: function(a) {
                a = W(a);
                return K(a.x || 0, a.y || 0, a.width, a.height)
            },
            line: function(a) {
                return "M" + [a.attr("x1") || 0, a.attr("y1") || 0, a.attr("x2"), a.attr("y2")]
            },
            polyline: function(a) {
                return "M" + a.attr("points")
            },
            polygon: function(a) {
                return "M" + a.attr("points") + "z"
            },
            deflt: function(a) {
                a = a.node.getBBox();
                return K(a.x, a.y, a.width, a.height)
            }
        };
        a.path.toRelative = function(b) {
            var c = p(b),
                e = String.prototype.toLowerCase;
            if (c.rel) return d(c.rel);
            a.is(b, "array") && a.is(b && b[0], "array") ||
                (b = a.parsePathString(b));
            var h = [],
                f = 0,
                l = 0,
                n = 0,
                k = 0,
                m = 0;
            "M" == b[0][0] && (f = b[0][1], l = b[0][2], n = f, k = l, m++, h.push(["M", f, l]));
            for (var s = b.length; m < s; m++) {
                var q = h[m] = [],
                    u = b[m];
                if (u[0] != e.call(u[0])) switch (q[0] = e.call(u[0]), q[0]) {
                    case "a":
                        q[1] = u[1];
                        q[2] = u[2];
                        q[3] = u[3];
                        q[4] = u[4];
                        q[5] = u[5];
                        q[6] = +(u[6] - f).toFixed(3);
                        q[7] = +(u[7] - l).toFixed(3);
                        break;
                    case "v":
                        q[1] = +(u[1] - l).toFixed(3);
                        break;
                    case "m":
                        n = u[1], k = u[2];
                    default:
                        for (var y = 1, x = u.length; y < x; y++) q[y] = +(u[y] - (y % 2 ? f : l)).toFixed(3)
                } else
                    for (h[m] = [], "m" == u[0] &&
                        (n = u[1] + f, k = u[2] + l), q = 0, y = u.length; q < y; q++) h[m][q] = u[q];
                u = h[m].length;
                switch (h[m][0]) {
                    case "z":
                        f = n;
                        l = k;
                        break;
                    case "h":
                        f += +h[m][u - 1];
                        break;
                    case "v":
                        l += +h[m][u - 1];
                        break;
                    default:
                        f += +h[m][u - 2], l += +h[m][u - 1]
                }
            }
            h.toString = t;
            c.rel = d(h);
            return h
        };
        a.path.toAbsolute = y;
        a.path.toCubic = Q;
        a.path.map = function(a, b) {
            if (!b) return a;
            var c, d, e, h, f, l, n;
            a = Q(a);
            e = 0;
            for (f = a.length; e < f; e++)
                for (n = a[e], h = 1, l = n.length; h < l; h += 2) c = b.x(n[h], n[h + 1]), d = b.y(n[h], n[h + 1]), n[h] = c, n[h + 1] = d;
            return a
        };
        a.path.toString = t;
        a.path.clone = d
    });
    p.plugin(function(a, e, m, p) {
        var w = Math.max,
            l = Math.min,
            t = function(a) {
                this.items = [];
                this.bindings = {};
                this.length = 0;
                this.type = "set";
                if (a)
                    for (var c = 0, e = a.length; c < e; c++) a[c] && (this[this.items.length] = this.items[this.items.length] = a[c], this.length++)
            };
        e = t.prototype;
        e.push = function() {
            for (var a, c, e = 0, f = arguments.length; e < f; e++)
                if (a = arguments[e]) c = this.items.length, this[c] = this.items[c] = a, this.length++;
            return this
        };
        e.pop = function() {
            this.length && delete this[this.length--];
            return this.items.pop()
        };
        e.forEach =
            function(a, c) {
                for (var e = 0, f = this.items.length; e < f && !1 !== a.call(c, this.items[e], e); e++);
                return this
            };
        e.animate = function(d, c, e, l) {
            "function" != typeof e || e.length || (l = e, e = k.linear);
            d instanceof a._.Animation && (l = d.callback, e = d.easing, c = e.dur, d = d.attr);
            var m = arguments;
            if (a.is(d, "array") && a.is(m[m.length - 1], "array")) var b = !0;
            var t, n = function() {
                    t ? this.b = t : t = this.b
                },
                h = 0,
                p = l && function() {
                    h++ == this.length && l.call(this)
                };
            return this.forEach(function(a, h) {
                f.once("snap.animcreated." + a.id, n);
                b ? m[h] && a.animate.apply(a,
                    m[h]) : a.animate(d, c, e, p)
            })
        };
        e.remove = function() {
            for (; this.length;) this.pop().remove();
            return this
        };
        e.bind = function(a, c, e) {
            var f = {};
            if ("function" == typeof c) this.bindings[a] = c;
            else {
                var l = e || a;
                this.bindings[a] = function(a) {
                    f[l] = a;
                    c.attr(f)
                }
            }
            return this
        };
        e.attr = function(a) {
            var c = {},
                e;
            for (e in a)
                if (this.bindings[e]) this.bindings[e](a[e]);
                else c[e] = a[e];
            a = 0;
            for (e = this.items.length; a < e; a++) this.items[a].attr(c);
            return this
        };
        e.clear = function() {
            for (; this.length;) this.pop()
        };
        e.splice = function(a, c, e) {
            a = 0 > a ? w(this.length +
                a, 0) : a;
            c = w(0, l(this.length - a, c));
            var f = [],
                m = [],
                b = [],
                k;
            for (k = 2; k < arguments.length; k++) b.push(arguments[k]);
            for (k = 0; k < c; k++) m.push(this[a + k]);
            for (; k < this.length - a; k++) f.push(this[a + k]);
            var n = b.length;
            for (k = 0; k < n + f.length; k++) this.items[a + k] = this[a + k] = k < n ? b[k] : f[k - n];
            for (k = this.items.length = this.length -= c - n; this[k];) delete this[k++];
            return new t(m)
        };
        e.exclude = function(a) {
            for (var c = 0, e = this.length; c < e; c++)
                if (this[c] == a) return this.splice(c, 1), !0;
            return !1
        };
        e.insertAfter = function(a) {
            for (var c = this.items.length; c--;) this.items[c].insertAfter(a);
            return this
        };
        e.getBBox = function() {
            for (var a = [], c = [], e = [], f = [], k = this.items.length; k--;)
                if (!this.items[k].removed) {
                    var b = this.items[k].getBBox();
                    a.push(b.x);
                    c.push(b.y);
                    e.push(b.x + b.width);
                    f.push(b.y + b.height)
                }
            a = l.apply(0, a);
            c = l.apply(0, c);
            e = w.apply(0, e);
            f = w.apply(0, f);
            return {
                x: a,
                y: c,
                x2: e,
                y2: f,
                width: e - a,
                height: f - c,
                cx: a + (e - a) / 2,
                cy: c + (f - c) / 2
            }
        };
        e.clone = function(a) {
            a = new t;
            for (var c = 0, e = this.items.length; c < e; c++) a.push(this.items[c].clone());
            return a
        };
        e.toString = function() {
            return "Snap\u2018s set"
        };
        e.type =
            "set";
        a.set = function() {
            var a = new t;
            arguments.length && a.push.apply(a, Array.prototype.slice.call(arguments, 0));
            return a
        }
    });
    p.plugin(function(a, e, k, p) {
        function w(a) {
            var b = a[0];
            switch (b.toLowerCase()) {
                case "t":
                    return [b, 0, 0];
                case "m":
                    return [b, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0];
                case "s":
                    return 5 == a.length ? [b, 1, 1, a[3], a[4]] : 3 == a.length ? [b, 1, 1] : [b, 1]
            }
        }

        function l(b, c, d) {
            c = v(c).replace(/\.{3}|\u2026/g, b);
            b = a.parseTransformString(b) || [];
            c = a.parseTransformString(c) || [];
            for (var e = Math.max(b.length,
                    c.length), f = [], l = [], k = 0, m, t, p, u; k < e; k++) {
                p = b[k] || w(c[k]);
                u = c[k] || w(p);
                if (p[0] != u[0] || "r" == p[0].toLowerCase() && (p[2] != u[2] || p[3] != u[3]) || "s" == p[0].toLowerCase() && (p[3] != u[3] || p[4] != u[4])) {
                    b = a._.transform2matrix(b, d());
                    c = a._.transform2matrix(c, d());
                    f = [
                        ["m", b.a, b.b, b.c, b.d, b.e, b.f]
                    ];
                    l = [
                        ["m", c.a, c.b, c.c, c.d, c.e, c.f]
                    ];
                    break
                }
                f[k] = [];
                l[k] = [];
                m = 0;
                for (t = Math.max(p.length, u.length); m < t; m++) m in p && (f[k][m] = p[m]), m in u && (l[k][m] = u[m])
            }
            return {
                from: q(f),
                to: q(l),
                f: s(f)
            }
        }

        function t(a) {
            return a
        }

        function d(a) {
            return function(b) {
                return +b.toFixed(3) +
                    a
            }
        }

        function c(b) {
            return a.rgb(b[0], b[1], b[2])
        }

        function s(a) {
            var b = 0,
                c, d, e, f, l, k, m = [];
            c = 0;
            for (d = a.length; c < d; c++) {
                l = "[";
                k = ['"' + a[c][0] + '"'];
                e = 1;
                for (f = a[c].length; e < f; e++) k[e] = "val[" + b++ +"]";
                l += k + "]";
                m[c] = l
            }
            return Function("val", "return Snap.path.toString.call([" + m + "])")
        }

        function q(a) {
            for (var b = [], c = 0, d = a.length; c < d; c++)
                for (var e = 1, f = a[c].length; e < f; e++) b.push(a[c][e]);
            return b
        }
        var x = {},
            b = /[a-z]+$/i,
            v = String;
        x.stroke = x.fill = "colour";
        e.prototype.equal = function(a, b) {
            return f("snap.util.equal", this, a,
                b).firstDefined()
        };
        f.on("snap.util.equal", function(e, h) {
            var f, k;
            f = v(this.attr(e) || "");
            var m = this;
            if (f == +f && h == +h) return {
                from: +f,
                to: +h,
                f: t
            };
            if ("colour" == x[e]) return f = a.color(f), k = a.color(h), {
                from: [f.r, f.g, f.b, f.opacity],
                to: [k.r, k.g, k.b, k.opacity],
                f: c
            };
            if ("transform" == e || "gradientTransform" == e || "patternTransform" == e) return h instanceof a.Matrix && (h = h.toTransformString()), a._.rgTransform.test(h) || (h = a._.svgTransform2string(h)), l(f, h, function() {
                return m.getBBox(1)
            });
            if ("d" == e || "path" == e) return f = a.path.toCubic(f,
                h), {
                from: q(f[0]),
                to: q(f[1]),
                f: s(f[0])
            };
            if ("points" == e) return f = v(f).split(a._.separator), k = v(h).split(a._.separator), {
                from: f,
                to: k,
                f: function(a) {
                    return a
                }
            };
            aUnit = f.match(b);
            k = v(h).match(b);
            return aUnit && aUnit == k ? {
                from: parseFloat(f),
                to: parseFloat(h),
                f: d(aUnit)
            } : {
                from: this.asPX(e),
                to: this.asPX(e, h),
                f: t
            }
        })
    });
    p.plugin(function(a, e, k, p) {
        var w = e.prototype,
            l = "createTouch" in p.doc;
        e = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel".split(" ");
        var t = {
                mousedown: "touchstart",
                mousemove: "touchmove",
                mouseup: "touchend"
            },
            d = function(a, b) {
                var c = "y" == a ? "scrollTop" : "scrollLeft",
                    d = b && b.node ? b.node.ownerDocument : p.doc;
                return d[c in d.documentElement ? "documentElement" : "body"][c]
            },
            c = function() {
                this.returnValue = !1
            },
            s = function() {
                return this.originalEvent.preventDefault()
            },
            q = function() {
                this.cancelBubble = !0
            },
            x = function() {
                return this.originalEvent.stopPropagation()
            },
            b = function() {
                if (p.doc.addEventListener) return function(a, b, c, e) {
                    var h = l && t[b] ? t[b] : b,
                        f = function(h) {
                            var f = d("y", e),
                                k = d("x",
                                    e);
                            if (l && t.hasOwnProperty(b))
                                for (var m = 0, n = h.targetTouches && h.targetTouches.length; m < n; m++)
                                    if (h.targetTouches[m].target == a || a.contains(h.targetTouches[m].target)) {
                                        n = h;
                                        h = h.targetTouches[m];
                                        h.originalEvent = n;
                                        h.preventDefault = s;
                                        h.stopPropagation = x;
                                        break
                                    }
                            return c.call(e, h, h.clientX + k, h.clientY + f)
                        };
                    b !== h && a.addEventListener(b, f, !1);
                    a.addEventListener(h, f, !1);
                    return function() {
                        b !== h && a.removeEventListener(b, f, !1);
                        a.removeEventListener(h, f, !1);
                        return !0
                    }
                };
                if (p.doc.attachEvent) return function(a, b, e, h) {
                    var f =
                        function(a) {
                            a = a || h.node.ownerDocument.window.event;
                            var b = d("y", h),
                                f = d("x", h),
                                f = a.clientX + f,
                                b = a.clientY + b;
                            a.preventDefault = a.preventDefault || c;
                            a.stopPropagation = a.stopPropagation || q;
                            return e.call(h, a, f, b)
                        };
                    a.attachEvent("on" + b, f);
                    return function() {
                        a.detachEvent("on" + b, f);
                        return !0
                    }
                }
            }(),
            v = [],
            n = function(a) {
                for (var b = a.clientX, c = a.clientY, e = d("y"), h = d("x"), k, m = v.length; m--;) {
                    k = v[m];
                    if (l)
                        for (var n = a.touches && a.touches.length, q; n--;) {
                            if (q = a.touches[n], q.identifier == k.el._drag.id || k.el.node.contains(q.target)) {
                                b =
                                    q.clientX;
                                c = q.clientY;
                                (a.originalEvent ? a.originalEvent : a).preventDefault();
                                break
                            }
                        } else a.preventDefault();
                    b += h;
                    c += e;
                    f("snap.drag.move." + k.el.id, k.move_scope || k.el, b - k.el._drag.x, c - k.el._drag.y, b, c, a)
                }
            },
            h = function(b) {
                a.unmousemove(n).unmouseup(h);
                for (var c = v.length, d; c--;) d = v[c], d.el._drag = {}, f("snap.drag.end." + d.el.id, d.end_scope || d.start_scope || d.move_scope || d.el, b);
                v = []
            };
        for (k = e.length; k--;)(function(c) {
            a[c] = w[c] = function(d, e) {
                a.is(d, "function") && (this.events = this.events || [], this.events.push({
                    name: c,
                    f: d,
                    unbind: b(this.node || document, c, d, e || this)
                }));
                return this
            };
            a["un" + c] = w["un" + c] = function(a) {
                for (var b = this.events || [], d = b.length; d--;)
                    if (b[d].name == c && (b[d].f == a || !a)) {
                        b[d].unbind();
                        b.splice(d, 1);
                        !b.length && delete this.events;
                        break
                    }
                return this
            }
        })(e[k]);
        w.hover = function(a, b, c, d) {
            return this.mouseover(a, c).mouseout(b, d || c)
        };
        w.unhover = function(a, b) {
            return this.unmouseover(a).unmouseout(b)
        };
        var H = [];
        w.drag = function(b, c, d, e, k, l) {
            function m(q, p, t) {
                (q.originalEvent || q).preventDefault();
                this._drag.x = p;
                this._drag.y = t;
                this._drag.id = q.identifier;
                !v.length && a.mousemove(n).mouseup(h);
                v.push({
                    el: this,
                    move_scope: e,
                    start_scope: k,
                    end_scope: l
                });
                c && f.on("snap.drag.start." + this.id, c);
                b && f.on("snap.drag.move." + this.id, b);
                d && f.on("snap.drag.end." + this.id, d);
                f("snap.drag.start." + this.id, k || e || this, p, t, q)
            }
            if (!arguments.length) {
                var q;
                return this.drag(function(a, b) {
                    this.attr({
                        transform: q + (q ? "T" : "t") + [a, b]
                    })
                }, function() {
                    q = this.transform().local
                })
            }
            this._drag = {};
            H.push({
                el: this,
                start: m
            });
            this.mousedown(m);
            return this
        };
        w.undrag = function() {
            for (var b = H.length; b--;) H[b].el == this && (this.unmousedown(H[b].start), H.splice(b, 1), f.unbind("snap.drag.*." + this.id));
            !H.length && a.unmousemove(n).unmouseup(h);
            return this
        }
    });
    p.plugin(function(a, e, k, p) {
        k = k.prototype;
        var w = /^\s*url\((.+)\)/,
            l = String,
            t = a._.$;
        a.filter = {};
        k.filter = function(d) {
            var c = this;
            "svg" != c.type && (c = c.paper);
            d = a.parse(l(d));
            var f = a._.id(),
                k = t("filter");
            t(k, {
                id: f,
                filterUnits: "userSpaceOnUse"
            });
            k.appendChild(d.node);
            c.defs.appendChild(k);
            return new e(k)
        };
        f.on("snap.util.getattr.filter",
            function() {
                f.stop();
                var d = t(this.node, "filter");
                if (d) return (d = l(d).match(w)) && a.select(d[1])
            });
        f.on("snap.util.attr.filter", function(d) {
            if (d instanceof e && "filter" == d.type) {
                f.stop();
                var c = d.node.id;
                c || (t(d.node, {
                    id: d.id
                }), c = d.id);
                t(this.node, {
                    filter: a.url(c)
                })
            }
            d && "none" != d || (f.stop(), this.node.removeAttribute("filter"))
        });
        a.filter.blur = function(d, c) {
            null == d && (d = 2);
            return a.format('<feGaussianBlur stdDeviation="{def}"/>', {
                def: null == c ? d : [d, c]
            })
        };
        a.filter.blur.toString = function() {
            return this()
        };
        a.filter.shadow =
            function(d, c, e, f, k) {
                "string" == typeof e && (k = f = e, e = 4);
                "string" != typeof f && (k = f, f = "#000");
                null == e && (e = 4);
                null == k && (k = 1);
                null == d && (d = 0, c = 2);
                null == c && (c = d);
                f = a.color(f || "#000");
                return a.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
                    color: f,
                    dx: d,
                    dy: c,
                    blur: e,
                    opacity: k
                })
            };
        a.filter.shadow.toString = function() {
            return this()
        };
        a.filter.grayscale = function(d) {
            null == d && (d = 1);
            return a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
                a: .2126 + .7874 * (1 - d),
                b: .7152 - .7152 * (1 - d),
                c: .0722 - .0722 * (1 - d),
                d: .2126 - .2126 * (1 - d),
                e: .7152 + .2848 * (1 - d),
                f: .0722 - .0722 * (1 - d),
                g: .2126 - .2126 * (1 - d),
                h: .0722 + .9278 * (1 - d)
            })
        };
        a.filter.grayscale.toString = function() {
            return this()
        };
        a.filter.sepia = function(d) {
            null ==
                d && (d = 1);
            return a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
                a: .393 + .607 * (1 - d),
                b: .769 - .769 * (1 - d),
                c: .189 - .189 * (1 - d),
                d: .349 - .349 * (1 - d),
                e: .686 + .314 * (1 - d),
                f: .168 - .168 * (1 - d),
                g: .272 - .272 * (1 - d),
                h: .534 - .534 * (1 - d),
                i: .131 + .869 * (1 - d)
            })
        };
        a.filter.sepia.toString = function() {
            return this()
        };
        a.filter.saturate = function(d) {
            null == d && (d = 1);
            return a.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                amount: 1 - d
            })
        };
        a.filter.saturate.toString = function() {
            return this()
        };
        a.filter.hueRotate = function(d) {
            return a.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                angle: d || 0
            })
        };
        a.filter.hueRotate.toString = function() {
            return this()
        };
        a.filter.invert = function(d) {
            null == d && (d = 1);
            return a.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
                amount: d,
                amount2: 1 - d
            })
        };
        a.filter.invert.toString = function() {
            return this()
        };
        a.filter.brightness = function(d) {
            null == d && (d = 1);
            return a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
                amount: d
            })
        };
        a.filter.brightness.toString = function() {
            return this()
        };
        a.filter.contrast = function(d) {
            null == d && (d = 1);
            return a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
                amount: d,
                amount2: .5 - d / 2
            })
        };
        a.filter.contrast.toString = function() {
            return this()
        }
    });
    return p
});
"document" in self && !("classList" in document.createElement("_")) && function(v) {
    if ("Element" in v) {
        v = v.Element.prototype;
        var f = Object,
            k = String.prototype.trim || function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            p = Array.prototype.indexOf || function(a) {
                for (var d = 0, c = this.length; d < c; d++)
                    if (d in this && this[d] === a) return d;
                return -1
            },
            a = function(a, d) {
                this.name = a;
                this.code = DOMException[a];
                this.message = d
            },
            e = function(e, d) {
                if ("" === d) throw new a("SYNTAX_ERR", "An invalid or illegal string was specified");
                if (/\s/.test(d)) throw new a("INVALID_CHARACTER_ERR",
                    "String contains an invalid character");
                return p.call(e, d)
            },
            m = function(a) {
                for (var d = k.call(a.getAttribute("class") || ""), d = d ? d.split(/\s+/) : [], c = 0, e = d.length; c < e; c++) this.push(d[c]);
                this._updateClassName = function() {
                    a.setAttribute("class", this.toString())
                }
            },
            u = m.prototype = [],
            w = function() {
                return new m(this)
            };
        a.prototype = Error.prototype;
        u.item = function(a) {
            return this[a] || null
        };
        u.contains = function(a) {
            return -1 !== e(this, a + "")
        };
        u.add = function() {
            var a = arguments,
                d = 0,
                c = a.length,
                f, k = !1;
            do f = a[d] + "", -1 === e(this,
                f) && (this.push(f), k = !0); while (++d < c);
            k && this._updateClassName()
        };
        u.remove = function() {
            var a = arguments,
                d = 0,
                c = a.length,
                f, k = !1;
            do f = a[d] + "", f = e(this, f), -1 !== f && (this.splice(f, 1), k = !0); while (++d < c);
            k && this._updateClassName()
        };
        u.toggle = function(a, d) {
            a += "";
            var c = this.contains(a),
                e = c ? !0 !== d && "remove" : !1 !== d && "add";
            if (e) this[e](a);
            return !c
        };
        u.toString = function() {
            return this.join(" ")
        };
        if (f.defineProperty) {
            u = {
                get: w,
                enumerable: !0,
                configurable: !0
            };
            try {
                f.defineProperty(v, "classList", u)
            } catch (l) {
                -2146823252 ===
                    l.number && (u.enumerable = !1, f.defineProperty(v, "classList", u))
            }
        } else f.prototype.__defineGetter__ && v.__defineGetter__("classList", w)
    }
}(self);
define("classList", function() {});
define("circle-utils", [], function() {
    return {
        tenth: 1 * Math.PI / 5,
        eighth: 1 * Math.PI / 4,
        quarter: 1 * Math.PI / 2,
        half: Math.PI,
        whole: 2 * Math.PI,
        getPointOnCircle: function(v, f, k, p) {
            return {
                x: v + k * Math.sin(p),
                y: f + -k * Math.cos(p)
            }
        },
        getAngle: function(v, f, k) {
            k = "undefined" === typeof k ? this.whole : k;
            return k / f * v
        }
    }
});
define("config", ["circle-utils"], function(v) {
    return {
        FONT_FAMILY: "'Lato', sans-serif",
        TEXT_SIZE_EXTRA_SMALL: "10px",
        TEXT_SIZE_SMALL: "12px",
        TEXT_SIZE_MEDIUM: "14.4px",
        PADDING_FOR_LABELS: 70,
        SPILLOVER_TOP: .17,
        SPILLOVER_RIGHT: .15,
        SPILLOVER_BOTTOM: 0,
        SPILLOVER_LEFT: .15,
        OVERFLOW_SPREAD: 3.5 * v.tenth,
        OVERFLOW_INNER_RADIUS_FACTOR: .25,
        OVERFLOW_OUTER_RADIUS_FACTOR: .425,
        OVERFLOW_MESSAGE: "Click to expand segment",
        NO_DETAILS_MESSAGE: "No details to display.",
        BRACKET_INNER_RADIUS_ADJUST: .03,
        BRACKET_MIDDLE_RADIUS_ADJUST: .15,
        BRACKET_OUTER_RADIUS_ADJUST: .2,
        KEY_WIDTH: 2,
        MIN_KEY_WIDTH: 250,
        KEY_HEIGHT: 1,
        KEY_TOP_BOTTOM_PADDING: .15,
        KEY_LEFT_RIGHT_PADDING: .4,
        KEY_TOP_MARGIN: .5,
        DEFAULT_MAX_KEY_ENTRIES: 12,
        FORCE_BASIC_MODE_WIDTH: 400,
        LABEL_MARGIN: 3,
        LABEL_BORDER_RADIUS: 5,
        LABEL_ARROW_LENGTH: 10,
        LABEL_ARROW_WIDTH: 9,
        LABEL_PADDING: 10,
        LABEL_FONT_SIZE: 10,
        KEY_SIDE_PADDING: 30,
        KEY_PADDING_TOP: 20,
        KEY_PADDING_RIGHT: 50,
        KEY_PADDING_BOTTOM: 20,
        KEY_PADDING_LEFT: 50,
        KEY_MAX_VALUE_LENGTH: 20,
        KEY_PADDING: 10,
        TARGET_KEY_COLUMN_WIDTH: 180,
        KEY_COLUMN_PADDING_RATIO: .1,
        KEY_ROWSPACING: 8,
        KEY_TEXT_SPACING: 5,
        KEY_NEUTRAL_FILL: "#E4E4E3",
        KEY_NEUTRAL_STROKE: "#676A68",
        KEY_MAX_TEXT_LENGTH: 5
    }
});
define("data-processor", ["circle-utils"], function(v) {
    return {
        sortDataByValue: function(f, k) {
            return k.value - f.value
        },
        tableToJSON: function(f, k) {
            var p = Math.PI / 20,
                a = /^\-?[0-9]+(,[0-9]{3})*(\.[0-9]+)?$/;
            f.classList.add("fm-hidden");
            for (var e = f.querySelectorAll("tbody > tr"), m = [], u = [], w = 0, l = 0; l < e.length; l++) e[l].children[1] && e[l].children[1].textContent.match(a) && (w += parseFloat(e[l].children[1].textContent));
            for (var t = 0, l = 0; l < e.length; l++)
                if (e[l].children[1] && e[l].children[1].textContent.match(a)) {
                    var d =
                        parseFloat(e[l].children[1].textContent);
                    v.getAngle(d, w) <= p && t++
                }
            for (l = 0; l < e.length; l++)
                if (e[l].children[0] && e[l].children[1] && e[l].children[1].textContent.match(a)) {
                    for (var c = e[l].children[0].textContent, d = parseFloat(e[l].children[1].textContent.replace(/,([0-9]{3})/g, "$1")), s = [], q = 2, q = 2; q < e[l].children.length; q++) s.push(e[l].children[q].textContent);
                    v.getAngle(d, w) > p || 2 > t ? m.push({
                        title: c,
                        value: d,
                        details: s
                    }) : u.push({
                        title: c,
                        value: d,
                        details: s
                    })
                }
            m.sort(this.sortDataByValue);
            if (0 < u.length) {
                u.sort(this.sortDataByValue);
                for (a = p = 0; a < u.length; a++) p += u[a].value;
                m.push({
                    title: "Other",
                    value: p,
                    overflow: u
                })
            }
            return m
        }
    }
});
define("number-utils", [], function() {
    return {
        roundToOrder: function(v, f, k) {
            function p(a, e) {
                var f = Math.abs(a);
                f >= Math.pow(10, k) ? (a = p(a / 10, e), a *= 10) : f < Math.pow(10, k - 1) ? (a *= 10, a = p(a, e), a /= 10) : (f = Math.round(a / e) * e, 0 === f && (k++, f = p(a, e)), a = f);
                return parseFloat(a.toPrecision(k + 1))
            }
            v = parseFloat(v);
            if (0 == v) return 0;
            k || (k = 2);
            return 1 === f ? parseFloat(v.toPrecision(k)) : p(v, f)
        },
        renderValue: function(v) {
            function f(a) {
                if (0 == a) return 0;
                if (1 <= a && 1E3 > a) return a;
                if (1 > a) return p -= 3, f(1E3 * a);
                if (1E3 <= a) return p += 3, f(a / 1E3)
            }
            if (0 === v) return "0";
            if (!v) return "";
            var k = 1;
            0 > v && (k = -1, v *= -1);
            v = this.roundToOrder(v, 1, 3);
            var p = 0,
                a = new String(k * f(v));
            return 3 == p ? a + "k" : 6 == p ? a + "m" : 9 == p ? a + "bn" : 12 == p ? a + " trillion" : new String(k * v)
        },
        getDataTotal: function(v) {
            for (var f = 0, k = 0; k < v.length; k++) f += v[k].value;
            return f
        },
        getAngle: function(v, f, k) {
            k = "undefined" === typeof k ? Circle.whole : k;
            return k / f * v
        },
        getFactor: function(v) {
            for (var f = v - 1; 1 < f; f--) {
                var k = v / f;
                if (parseInt(k) == k) return f
            }
            return v
        }
    }
});
define("color-utils", [], function() {
    return {
        colorWheelClasses: "fm-datum-color-wheel-a fm-datum-color-wheel-b fm-datum-color-wheel-c fm-datum-color-wheel-d fm-datum-color-wheel-e fm-datum-color-wheel-f fm-datum-color-wheel-g fm-datum-color-wheel-h fm-datum-color-wheel-i fm-datum-color-wheel-j fm-datum-color-wheel-k fm-datum-color-wheel-l".split(" "),
        overflowClass: "fm-datum-color-overflow",
        pad: function(v) {
            return 2 > v.length ? "0" + v : v
        },
        contrasting: function(v) {
            throw "Not yet implemented";
        },
        registerTint1Filter: function() {
            throw "Not yet implemented";
        },
        registerTint2Filter: function() {
            throw "Not yet implemented";
        },
        lowContrast: function(v, f) {
            f = "undefined" === typeof f ? 0 : f;
            if (v + f > this.colorWheelClasses.length) {
                for (var k = [], p = 0; p < v; p++) p < this.colorWheelClasses.length ? k.push(this.colorWheelClasses[p]) : k.push(this.colorWheelClasses[this.colorWheelClasses.length - p]);
                return k
            }
            return this.colorWheelClasses.splice(f, v)
        },
        monochromatic: function(v, f, k) {
            throw "Not yet implemented";
        },
        harmonious: function(v) {
            for (var f = Math.min(v, this.colorWheelClasses.length), k = [],
                    p = Math.floor(this.colorWheelClasses.length / 2), a = function() {
                        return 0 == this.colorWheelClasses.length % 4
                    }.bind(this), e = function(a, e) {
                        a = (a + this.colorWheelClasses.length) % this.colorWheelClasses.length;
                        var d = Math.floor(k.length / 4) + 1;
                        k.length < f && k.splice(1 * d - 1, 0, a);
                        k.length < f && k.splice(2 * d - 1, 0, (a + e + 1) % this.colorWheelClasses.length);
                        k.length < f && k.splice(3 * d - 1, 0, (a + p) % this.colorWheelClasses.length);
                        k.length < f && k.splice(4 * d - 1, 0, (a + e + 1 + p) % this.colorWheelClasses.length)
                    }.bind(this), m = function(a, e) {
                        a = (a + this.colorWheelClasses.length) %
                            this.colorWheelClasses.length;
                        k.splice(e, 0, a)
                    }.bind(this), u = 1, w = 0; u <= p - 2; u += 2, w--) e(w, u);
            e = k.length / 4;
            k.length < f && m(1, e);
            k.length < f && m(1 + p, 3 * e + 1);
            a() && (k.length < f && m(1 + p / 2, 2 * e + 1), k.length < f && m(1 + 3 * p / 2, 4 * e + 3));
            a = [];
            for (m = 0; m < v; m++) a.push(this.colorWheelClasses[k[m % f]]);
            return a
        }
    }
});
define("dashed-bracket", ["snap", "circle-utils"], function(v, f) {
    return v.plugin(function(k, p, a) {
        a.prototype.dashedBracket = function(a, m, p, w, l, t, d) {
            var c = f.getPointOnCircle(a, m, p, t),
                s = f.getPointOnCircle(a, m, p, d);
            p = this.path(k.format("M{x1},{y1}A{radius},{radius} 0 {large},1 {x2} {y2}", {
                x1: c.x,
                y1: c.y,
                radius: p,
                large: d - t > Math.PI ? 1 : 0,
                x2: s.x,
                y2: s.y
            })).attr({
                opacity: 0,
                fill: "none"
            });
            var c = f.getPointOnCircle(a, m, w, t),
                s = f.getPointOnCircle(a, m, w, d),
                q = f.getPointOnCircle(a, m, l, t);
            a = f.getPointOnCircle(a, m, l, d);
            w =
                this.path(k.format("M{x1},{y1}L{x2},{y2}A{radius},{radius} 0 {large},1 {x3} {y3}L{x4},{y4}", {
                    x1: q.x,
                    y1: q.y,
                    x2: c.x,
                    y2: c.y,
                    radius: w,
                    large: d - t > Math.PI ? 1 : 0,
                    x3: s.x,
                    y3: s.y,
                    x4: a.x,
                    y4: a.y
                }));
            t = p.getPointAtLength(p.getTotalLength() / 2);
            d = w.getPointAtLength(w.getTotalLength() / 2);
            t = this.path("M" + t.x + "," + t.y + "L" + d.x + " " + d.y);
            return this.g(w, t).addClass("fm-bracket")
        }
    })
});
define("pie-segment", ["snap", "circle-utils"], function(v, f) {
    return v.plugin(function(k, p, a) {
        a.prototype.pieSegment = function(a, m, p, w, l) {
            var t = f.getPointOnCircle(a, m, p, w),
                d = f.getPointOnCircle(a, m, p, l);
            return this.path(k.format("M{originX},{originY}L{x1},{y1}A{radius},{radius} 0 {large},1 {x2},{y2}Z", {
                originX: a,
                originY: m,
                x1: t.x,
                y1: t.y,
                x2: d.x,
                y2: d.y,
                radius: p,
                large: l - w > Math.PI ? 1 : 0
            }))
        }
    })
});
define("doughnut-segment", ["snap", "circle-utils"], function(v, f) {
    return v.plugin(function(k, p, a) {
        a.prototype.doughnutSegment = function(a, m, p, w, l, t) {
            var d = f.getPointOnCircle(a, m, p, l),
                c = f.getPointOnCircle(a, m, p, t),
                s = f.getPointOnCircle(a, m, w, t),
                q = f.getPointOnCircle(a, m, w, l);
            return this.path(k.format("M{x1},{y1}A{radius},{radius} 0 {large},1 {x2} {y2}L{x3},{y3}A{innerRadius},{innerRadius} 0 {large},0 {x4} {y4}Z", {
                originX: a,
                originY: m,
                x1: d.x,
                y1: d.y,
                x2: c.x,
                y2: c.y,
                x3: s.x,
                y3: s.y,
                x4: q.x,
                y4: q.y,
                radius: p,
                innerRadius: w,
                large: t - l > Math.PI ? 1 : 0
            }))
        }
    })
});
define("key", ["snap", "config", "color-utils"], function(v, f, k) {
    v = function(f, a, e, k, u, w, l, t, d, c, s, q) {
        this._paper = f;
        this.node = f.g();
        this.x = a;
        this.y = e;
        this.width = k;
        this.columns = u;
        this.columnWidth = w;
        this.centerItems = l;
        this.values = t;
        this.maxValues = d;
        this.maxValueLength = c;
        this.lastItemIsOther = s;
        this.colorClasses = q
    };
    v.prototype = {
        constructor: v,
        hide: function() {},
        remove: function() {
            this.node.parent.remove(this.node);
            this.node = null
        },
        render: function() {
            var p = this.values.length;
            if ("undefined" === typeof this.maxEntries ||
                this.maxEntries > p) this.maxEntries = p;
            "undefined" === typeof this.maxValueLength && (this.maxValueLength = f.KEY_MAX_TEXT_LENGTH);
            var a;
            a = this.colorClasses ? this.colorClasses : k.harmonious(p);
            this.container = this.node.rect(this.x, this.y, this.width, 10).addClass("fm-key-container").attr({
                fill: f.KEY_NEUTRAL_FILL,
                stroke: f.KEY_NEUTRAL_STROKE
            });
            var e = this.node.g().addClass("fm-key-items"),
                m = 0,
                u = 0,
                w;
            this.values.forEach(function(k, d) {
                var c;
                c = d === this.values.length - 1 && this.lastItemIsOther ? "fm-datum-color-overflow" : a[d];
                0 !== d && 0 === d % this.columns && (m = 0, u += w.getBBox().height + f.KEY_ROWSPACING);
                var l = k.length > this.maxValueLength ? k.substring(0, this.maxValueLength - 1) + "\u2026" : k;
                c = this.node.rect(this.x + m, this.y + f.KEY_PADDING_TOP + u, 13, 13).addClass(c);
                w = this.node.text(this.x + f.KEY_TEXT_SPACING + c.getBBox().width + m, this.y + f.KEY_PADDING_TOP + u + parseInt(c.attr("height"), 10) - 1, l).attr({
                    "font-family": f.FONT_FAMILY,
                    "font-size": f.TEXT_SIZE_SMALL
                });
                l = this.node.g(c, w).data("fullText", k[d]);
                c = this.columnWidth - f.KEY_TEXT_SPACING;
                var p =
                    l.getBBox().width;
                if (!(p <= c))
                    for (var v = l.select("text"), b = v.attr("text"), B = !0, b = b.substr(0, b.length - 1) + "\u2026"; B;)
                        if (b = b.substr(0, b.length - 2) + "\u2026", v.attr("text", b), p = l.getBBox().width, p <= c || 5 === b.length) B = !1;
                e.append(l);
                m += this.columnWidth
            }.bind(this));
            var p = e.getBBox(),
                l = this.container.getBBox();
            this.container.attr({
                height: p.height + f.KEY_PADDING_TOP + f.KEY_PADDING_BOTTOM
            });
            !0 === this.centerItems ? e.transform("t" + (l.width / 2 - p.width / 2) + " 0") : e.transform("t" + f.KEY_PADDING_LEFT + " 0");
            return this.node.g(this.container,
                e).addClass("fm-key").attr({
                strokeDasharray: this.width + "," + l.height + ",0," + 100 * this.width + ",0"
            })
        },
        show: function() {},
        setHeight: function(f) {
            this.node.select(".fm-key-container").attr({
                height: f + "px"
            })
        }
    };
    return v
});
define("multitext", ["snap"], function(v) {
    return v.plugin(function(f, k, p, a) {
        p.prototype.multitext = function(a, f, k, p, l) {
            "undefined" === typeof p && (p = "1.8em");
            "undefined" === typeof l && (l = "start");
            k = k.split("\n");
            f = this.text(a, f, k);
            f.attr({
                textAnchor: l
            });
            f.selectAll("tspan:nth-child(n+2)").attr({
                dy: p,
                x: a
            });
            return f
        }
    })
});
define("tooltip", ["config", "multitext"], function(v, f) {
    function k(a, e, f, k) {
        (this.enableBlackBorder = k) && !document.getElementById("black-border") && (a.node.querySelector("defs").innerHTML += '<filter id="black-border" x="-5%" y="-5%" width="110%" height="110%"><feMorphology in="SourceAlpha" operator="dilate" radius="1" result="border"></feMorphology><feGaussianBlur stdDeviation="0.2" in="border" result="blurred-border"></feGaussianBlur><feMerge><feMergeNode in="blurred-border"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>');
        this.tooltipClass =
            e;
        this.colorClass = f;
        this._paper = a;
        this._parent = a.node;
        this._tooltipBG = this._tooltipArrow = null;
        this._tooltipPlacement = "right";
        this.snapElement = this._tooltipText = null
    }
    var p;
    v.TOOLTIP_MAX_VALUE_LENGTH ? p = v.TOOLTIP_MAX_VALUE_LENGTH : 20;
    k.prototype = {
        _positionTooltipArrow: function(a) {
            var e = Snap.matrix(),
                f = this._tooltipBG.getBBox();
            switch (a) {
                case "left":
                    e.translate(f.width + 4, f.height / 2);
                    e.rotate(180);
                    this._tooltipArrow.transform(e.toTransformString());
                    break;
                case "right":
                    e.translate(-4, f.height / 2);
                    this._tooltipArrow.transform(e.toTransformString());
                    break;
                case "top":
                    e.translate(f.width / 2, f.height + 4);
                    e.rotate(-90);
                    this._tooltipArrow.transform(e.toTransformString());
                    break;
                case "bottom":
                    e.translate(f.width / 2, -4), e.rotate(90), this._tooltipArrow.transform(e.toTransformString())
            }
            this._tooltipPlacement = a
        },
        constructor: k,
        hide: function() {
            this.snapElement && this.snapElement.attr("display", "none")
        },
        remove: function() {
            this._tooltipText = this._tooltipBG = this._tooltipArrow = null;
            this.snapElement.remove();
            this.snapElement = null
        },
        render: function(a, e) {
            var f = this._paper,
                k = null;
            null !== this.snapElement && this.remove();
            this.snapElement = f.g();
            var w, l = "[object Array]" === Object.prototype.toString.call(e) ? !0 : !1;
            a.length > p && (a = a.substring(0, p - 3) + "...");
            if (l) {
                w = f.g();
                w.attr({
                    fill: "#fff"
                });
                var t = f.text(10, 10, a);
                t.attr({
                    dy: parseInt("12px", 10),
                    "font-family": "'Lato', sans-serif",
                    "font-size": "12px"
                });
                w.append(t);
                var d = [],
                    c = [];
                e.forEach(function(a) {
                    var e;
                    e = a.title.length > p ? a.title.substring(0, p - 3) + "..." : a.title;
                    a = a.value.length > p ? a.value.substring(0, p - 3) + "..." : a.value;
                    d.push(e +
                        ":");
                    c.push(a)
                });
                var k = f.multitext(10, 20 + t.getBBox().height + 5, d.join("\n"), "1.2em").attr({
                        "font-family": "'Lato', sans-serif",
                        "font-size": "12px"
                    }),
                    s = f.multitext(10, 20 + t.getBBox().height + 5, c.join("\n"), "1.2em", "end").attr({
                        "font-family": "'Lato', sans-serif",
                        "font-size": "12px"
                    });
                s.transform("t " + (k.getBBox().width + s.getBBox().width + 5) + " 0");
                w.append(k);
                w.append(s)
            } else w = f.text(10, 10, a + ": " + e), w.attr({
                dy: parseInt("12px", 10)
            });
            this._tooltipText = w;
            this.snapElement.append(w);
            k = w.getBBox();
            w = f.rect(0, 0,
                k.width + 10 + 10, k.height + 10 + 10, 4);
            w.addClass(this.colorClass);
            this._tooltipBG = w;
            l && t.transform("t " + (k.width / 2 - t.getBBox().width / 2) + " 0");
            this._tooltipArrow = f = f.polygon([-5, .2, 5, -5, 5, 5]).addClass(this.colorClass);
            this._positionTooltipArrow(this._tooltipPlacement);
            this.snapElement.prepend(w);
            this.snapElement.append(f);
            this.snapElement.addClass("fm-tooltip " + this.tooltipClass);
            this.hide();
            this.enableBlackBorder && this.snapElement.attr({
                filter: "url(#black-border)"
            });
            return this.snapElement
        },
        setPosition: function(a,
            e, f) {
            if (this.snapElement) {
                void 0 === f ? f = this._tooltipPlacement : f !== this._tooltipPlacement && this._positionTooltipArrow(f);
                var k = this._tooltipArrow.getBBox(),
                    p = this._tooltipBG.getBBox();
                switch (f) {
                    case "left":
                        a = a - k.width - p.width;
                        e -= p.height / 2;
                        break;
                    case "right":
                        a += k.width;
                        e -= p.height / 2;
                        break;
                    case "bottom":
                        a -= p.width / 2;
                        e += k.height;
                        break;
                    case "top":
                        a -= p.width / 2, e = e - p.height - k.height
                }
                this.snapElement.transform("T" + a + "," + e)
            }
        },
        show: function() {
            this.snapElement && (this.snapElement.parent().append(this.snapElement),
                this.snapElement.attr("display", "block"))
        }
    };
    return k
});
define("two-section-tooltip", ["tooltip"], function(v) {
    function f(f, p, a) {
        v.call(this, f, p, a)
    }
    f.prototype = Object.create(v.prototype);
    f.prototype.render = function(f, p) {
        var a = this._paper,
            e = null;
        void 0 != this.snapElement && this.remove();
        this.snapElement = a.g();
        var m;
        m = a.g();
        e = a.text(10, 5, f).attr({
            dy: parseInt("12px", 10)
        });
        m.append(e);
        m.attr({
            fill: "#fff",
            "font-family": "'Lato', sans-serif",
            "font-size": "12px"
        });
        this._tooltipText = m;
        if (p) {
            var e = e.getBBox(),
                u = a.text(10 + e.width + 20, 5, p).attr({
                    dy: parseInt("12px", 10),
                    "text-anchor": "left"
                });
            m.append(u);
            this.groupBoundary = 20 + e.width
        }
        e = m.getBBox();
        e = a.rect(0, 0, e.width + 10 + 10, e.height + 5 + 10 - 3, 4);
        e.addClass(this.colorClass);
        this._tooltipBG = e;
        var w = e.getBBox();
        if (p) var l = a.line(this.groupBoundary, 0, this.groupBoundary, w.height).attr({
            stroke: "white"
        });
        u = a.rect(w.x, w.y, w.width, w.height, 4);
        w = a.rect(this.groupBoundary, w.y, w.width - this.groupBoundary, w.height).attr("fill", "white");
        u.attr("mask", w);
        u.addClass(this.colorClass + " tint-1");
        w = a.polygon([-3.5, .2, 6.5, -5, 6.5, 5]);
        a = a.rect(-6, -6, 11, 12).attr("fill", "#fff");
        w.attr({
            mask: a
        }).addClass(this.colorClass);
        this._tooltipArrow = w;
        this._positionTooltipArrow(this._tooltipPlacement);
        this.snapElement.append(e);
        this.snapElement.append(u);
        this.snapElement.append(m);
        this.snapElement.append(w);
        this.snapElement.append(l);
        this.snapElement.addClass("fm-tooltip");
        this.hide();
        return this.snapElement
    };
    f.prototype._positionTooltipArrow = function(f) {
        var p = Snap.matrix(),
            a = this._tooltipBG.getBBox();
        switch (f) {
            case "left":
                p.translate(a.width + 4, a.height /
                    2);
                p.rotate(180);
                this._tooltipArrow.transform(p.toTransformString());
                this._tooltipArrow.addClass("tint-1");
                break;
            case "right":
                p.translate(-4, a.height / 2);
                this._tooltipArrow.transform(p.toTransformString());
                break;
            case "top":
                p.translate(a.width / 2, a.height + 4);
                p.rotate(-90);
                this._tooltipArrow.transform(p.toTransformString());
                break;
            case "topRight":
                p.translate(this.groupBoundary / 2, a.height + 4);
                p.rotate(-90);
                this._tooltipArrow.transform(p.toTransformString());
                break;
            case "topLeft":
                p.translate((a.width + this.groupBoundary) /
                    2, a.height + 4);
                p.rotate(-90);
                this._tooltipArrow.transform(p.toTransformString());
                this._tooltipArrow.addClass("tint-1");
                break;
            case "bottomRight":
                p.translate(this.groupBoundary / 2, -4);
                p.rotate(90);
                this._tooltipArrow.transform(p.toTransformString());
                break;
            case "bottomLeft":
                p.translate((a.width + this.groupBoundary) / 2, -4), p.rotate(90), this._tooltipArrow.transform(p.toTransformString()), this._tooltipArrow.addClass("tint-1")
        }
        this._tooltipPlacement = f
    };
    f.prototype.setPosition = function(f, p, a) {
        if (this.snapElement) {
            void 0 ===
                a ? a = this._tooltipPlacement : a !== this._tooltipPlacement && this._positionTooltipArrow(a);
            var e = this._tooltipArrow.getBBox(),
                m = this._tooltipBG.getBBox();
            switch (a) {
                case "left":
                    f = f - e.width - m.width;
                    p -= m.height / 2;
                    break;
                case "right":
                    f += e.width;
                    p -= m.height / 2;
                    break;
                case "top":
                    f -= m.width / 2;
                    p = p - m.height - e.height;
                    break;
                case "topRight":
                    f -= this.groupBoundary / 2;
                    p = p - m.height - e.height;
                    break;
                case "topLeft":
                    f -= (m.width + this.groupBoundary) / 2;
                    p = p - m.height - e.height;
                    break;
                case "bottomRight":
                    f -= this.groupBoundary / 2;
                    p += e.height;
                    break;
                case "bottomLeft":
                    f -= (m.width + this.groupBoundary) / 2, p += e.height
            }
            this.snapElement.transform("T" + f + "," + p)
        }
    };
    return f
});
define("pie", "snap config number-utils circle-utils color-utils dashed-bracket pie-segment doughnut-segment key two-section-tooltip multitext".split(" "), function(v, f, k, p, a, e, m, u, w, l, t) {
    return v.plugin(function(d, c, e) {
        e.prototype.pieChart = function(c, d, b, e, m, h) {
            function t(a, b) {
                F.data("state") || F.data("state", M.neutral);
                b = F.select(".fm-key");
                if (a.data("overflowItems"))
                    if (F.data("state") === M.showingOverflow) L();
                    else {
                        var c = F.selectAll(".fm-doughnut-segment");
                        c.attr({
                            display: "block"
                        });
                        c.animate({
                                opacity: 1
                            },
                            80);
                        c = F.select(".fm-bracket");
                        c.attr({
                            display: "block"
                        });
                        c.animate({
                            opacity: 1
                        }, 80);
                        b.remove();
                        s(a.data("overflowItems"), !1);
                        F.data("state", M.showingOverflow)
                    } else F.data("state") === M.neutral ? (v(a), F.data("state", M.showingData)) : F.data("state") === M.showingData ? b.data("segmentId") === a.id ? L() : (R(b), v(a)) : F.data("state") === M.showingOverflow && (a.hasClass("fm-doughnut-segment") ? b.data("segmentId") === a.id ? (F.select(".fm-key").remove(), s(Y)) : (R(b), v(a)) : (N(), R(b), v(a), F.data("state", M.showingData)))
            }

            function s(a,
                b) {
                var c = Math.min(a.length, Math.round(aa / f.TARGET_KEY_COLUMN_WIDTH));
                0 === c && (c = 1);
                var d = aa / (c + f.KEY_COLUMN_PADDING_RATIO) - f.KEY_SIDE_PADDING;
                "undefined" === typeof b && (b = Z);
                c = (new w(F, E - aa / 2, O + I + f.PADDING_FOR_LABELS, aa, c, d, !0, a, h.maxKeyEntries, f.KEY_MAX_VALUE_LENGTH, b)).render();
                c.data("showingDetails", !1);
                var d = c.getBBox(),
                    d = d.height + d.y,
                    e = F.node.getAttribute("viewBox").split(" ")[2];
                F.node.style.height = d + "px";
                F.node.setAttribute("viewBox", "0 0 " + e + " " + d);
                return c
            }

            function u(b, c, d, e) {
                var l = k.getDataTotal(e),
                    m = [];
                e.forEach(function(a) {
                    m.push(a.title)
                });
                b.addClass(a.overflowClass).data("colorClass", a.overflowClass).data("hasOverflow", !0).data("overflowItems", m).data("mainText", f.OVERFLOW_MESSAGE);
                d = (c + d) / 2;
                c = d - f.OVERFLOW_SPREAD / 2;
                d += f.OVERFLOW_SPREAD / 2;
                b = parseInt(b.attr("strokeWidth"), 10);
                F.dashedBracket(P.x, P.y, I + I * f.BRACKET_INNER_RADIUS_ADJUST, I + I * f.BRACKET_MIDDLE_RADIUS_ADJUST, I + I * f.BRACKET_OUTER_RADIUS_ADJUST, c + b / I, d - b / I).attr({
                    display: "none",
                    opacity: 0,
                    fill: "none"
                });
                b = F.g();
                for (d = 0; d < e.length; d++) {
                    var n =
                        c;
                    c += p.getAngle(e[d].value, l, f.OVERFLOW_SPREAD);
                    n = F.doughnutSegment(P.x, P.y, I + I * f.OVERFLOW_INNER_RADIUS_FACTOR, I + I * f.OVERFLOW_OUTER_RADIUS_FACTOR, n, c).addClass("fm-segment fm-doughnut-segment " + X[d]).data("colorClass", X[d]).data("middleAngle", (n + c) / 2).data("centerX", E).data("centerY", O).data("radius", I * (1 + f.OVERFLOW_OUTER_RADIUS_FACTOR)).data("mainText", e[d].title).data("secondaryText", h.valuePrefix + k.renderValue(e[d].value) + h.valueSuffix).data("showingInKey", !1).data("details", e[d].details).click(function() {
                        t(this)
                    });
                    h.basicMode || n.hover(Q, D);
                    b.append(n)
                }
                N()
            }

            function v(a) {
                var b = F.select(".fm-key");
                b.data("segmentId", a.id);
                var c = b.getBBox(),
                    d = b.text(P.x, c.y + f.KEY_PADDING, a.data("mainText")).addClass("fm-key-title");
                d.attr({
                    "font-family": f.FONT_FAMILY,
                    "font-size": f.TEXT_SIZE_MEDIUM,
                    "text-anchor": "middle",
                    fill: a.attr("fill")
                });
                var e = d.getBBox();
                d.transform("t0 " + e.height);
                var h;
                h = 0 < a.data("details").length ? a.data("details") : [f.NO_DETAILS_MESSAGE];
                c = b.multitext(c.x + f.KEY_LEFT_RIGHT_PADDING * I, c.y + 3 * f.KEY_PADDING + e.height,
                    h.join("\n")).addClass("fm-key-details");
                c.attr({
                    "font-family": f.FONT_FAMILY,
                    "font-size": f.TEXT_SIZE_SMALL,
                    "font-weight": "lighter",
                    fill: a.attr("fill")
                });
                d = b.g(d, c).addClass("fm-key-segment-details");
                b.selectAll(".fm-key-items").attr({
                    display: "none"
                });
                b.append(d);
                F.select(".fm-key-container").addClass(a.data("colorClass") + " tint-2").attr({
                    stroke: a.attr("fill"),
                    height: d.getBBox().height + 3 * f.KEY_PADDING
                })
            }

            function D() {
                V.forEach(function(a) {
                    a.remove();
                    V.pop(a)
                })
            }

            function N() {
                var a = F.selectAll(".fm-doughnut-segment");
                if (0 < a.length) {
                    a.forEach(function(a) {
                        a.animate({
                            opacity: 0
                        }, 80, function() {
                            a.attr({
                                display: "none"
                            })
                        })
                    });
                    var b = F.select(".fm-bracket");
                    b.animate({
                        opacity: 0
                    }, 80, function() {
                        b.attr({
                            display: "none"
                        })
                    })
                }
            }

            function R(a) {
                if (F.data("state") === M.showingOverflow) a.remove(), s(Y);
                else {
                    F.select(".fm-key-title").remove();
                    F.select(".fm-key-details").remove();
                    F.selectAll(".fm-key-items").attr({
                        display: "block"
                    });
                    a = F.select(".fm-key-container").removeClass("tint-2").attr({
                        fill: "#E4E4E3",
                        stroke: "#676A68"
                    });
                    for (var b = 0; b <
                        a.node.classList.length; b++) a.node.classList[b].match(/fm-datum-color/) && a.removeClass(a.node.classList[b])
                }
            }

            function L() {
                F.select(".fm-key").remove();
                s(Y);
                N();
                F.data("state", M.neutral)
            }

            function Q() {
                if (!this.data("overflowItems") || F.data("state") !== M.showingOverflow) {
                    var a = this.data("middleAngle") % (2 * Math.PI),
                        b = this.data("centerX") + (parseInt(this.data("radius"), 10) + f.LABEL_MARGIN) * Math.sin(a),
                        c = this.data("centerY") - (parseInt(this.data("radius"), 10) + f.LABEL_MARGIN) * Math.cos(a),
                        d = this.data("colorClass"),
                        e = this.data("mainText"),
                        h = "undefined" === typeof this.data("secondaryText") ? "" : this.data("secondaryText"),
                        k;
                    this.data("hasOverflow") ? k = "top" : a < p.eighth || a >= 7 * p.eighth ? k = a <= 1 * Math.PI / 4 ? "topRight" : "topLeft" : a >= p.eighth && a < 3 * p.eighth ? k = "right" : a >= 3 * p.eighth && a < 5 * p.eighth ? k = a <= p.half ? "bottomRight" : "bottomLeft" : a >= 5 * p.eighth && a < 7 * p.eighth && (k = "left");
                    a = new l(F, "fm-pie-tooltip", d);
                    V.push(a);
                    a.render(e, h).addClass("fm-pie-tooltip");
                    a.setPosition(b, c, k);
                    a.show()
                }
            }
            var F = this;
            h = function(a, b) {
                a.valuePrefix = a.valuePrefix ?
                    a.valuePrefix : "";
                a.valueSuffix = a.valueSuffix ? a.valueSuffix : "";
                "undefined" === typeof a.maxKeyEntries && (a.maxKeyEntries = f.DEFAULT_MAX_KEY_ENTRIES);
                a.maxKeyEntries > b.length && (a.maxKeyEntries = b.length);
                return a
            }(h, m);
            h.width < f.FORCE_BASIC_MODE_WIDTH && (h.basicMode = !0);
            Math.ceil(h.maxKeyEntries / 3);
            var M = {
                    neutral: 0,
                    showingData: 1,
                    showingOverflow: 2
                },
                V = [];
            Math.min(b, e);
            var I, Z, E = c + b / 2,
                O = d + e / 2,
                X = a.harmonious(m.length),
                P = {
                    x: E,
                    y: O
                };
            c = k.getDataTotal(m);
            var $ = d = 0,
                aa = 0;
            Z = "true" === h.basicMode || !0 === h.basicMode ? !1 :
                !0;
            I = .4 * Math.min(b, e);
            aa = f.KEY_WIDTH * I < f.MIN_KEY_WIDTH ? f.MIN_KEY_WIDTH : f.KEY_WIDTH * I;
            this.rect(0, 0, "100%", "100%").attr({
                opacity: 0
            }).click(L);
            for (b = 0; b < m.length; b++) $ = d, d += p.getAngle(m[b].value, c), e = F.pieSegment(P.x, P.y, I, $, d).addClass("fm-segment fm-pie-segment").data("middleAngle", ($ + d) / 2).data("centerX", E).data("centerY", O).data("radius", I).data("showingInKey", !1).click(function() {
                    t(this);
                    this.data("overflowItems") && D()
                }), h.basicMode || e.hover(Q, D), m[b].hasOwnProperty("overflow") ? u(e, $, d, m[b].overflow) :
                e.addClass(X[b]).data("colorClass", X[b]).data("mainText", m[b].title).data("secondaryText", h.valuePrefix + k.renderValue(m[b].value) + h.valueSuffix).data("details", m[b].details);
            var Y = [];
            m.forEach(function(a) {
                Y.push(a.title)
            });
            s(Y)
        }
    })
});
define("render", ["snap", "classList", "config", "data-processor", "pie"], function(v, f, k, p, a) {
    function e(a) {
        return a.split("-").map(function(a, e) {
            return 0 === e ? a : a.charAt(0).toUpperCase() + a.substr(1)
        }).join("")
    }

    function m(a) {
        var e = document.createElement("div");
        e.innerHTML = 'Powered by <a style="color: #527a92" href="http://factmint.com/charts">Factmint</a>';
        e.style.fontSize = "8px";
        e.style.lineHeight = "12px";
        e.style.width = "100%";
        e.style.textAlign = "right";
        e.style.fontFamily = "Lato, sans-serif";
        a.parentElement.insertBefore(e,
            a.nextSibling)
    }
    var u = /([0-9]+)(px|%|rem|em|ex|ch|vw|vh|vmin|vmax|mm|cm|in|pt|pc)/;
    return function(a) {
        var f = a.getAttribute("data-fm-config"),
            t = f && window[f] ? window[f] : {};
        [].filter.call(a.attributes, function(a) {
            return "data-fm-config" === a.name ? !1 : /^data-fm-/.test(a.name)
        }).forEach(function(a) {
            var b = a.name.replace(/^data-fm-/, ""),
                b = e(b);
            t[b] = a.value
        });
        t.width || (t.width = "100%");
        t.height || (t.height = "450px");
        if (null === t.height.match(u) || null === t.width.match(u)) throw "A valid CSS length must be used for the chart dimensions (such as 50% or 400px)";
        var d, c, s;
        t.width.replace(u, function(a, b, e) {
            d = parseFloat(b);
            c = d * (k.SPILLOVER_LEFT + k.SPILLOVER_RIGHT);
            s = e
        });
        var q, x, b;
        t.height.replace(u, function(a, c, d) {
            q = parseFloat(c);
            x = q * (k.SPILLOVER_TOP + k.SPILLOVER_BOTTOM);
            b = d
        });
        f = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        a.id || (a.id = Math.floor(16777216 * Math.random()).toString(16));
        f.setAttribute("aria-describedby", a.id);
        t.disableSpillover ? (f.style.height = q + b, f.style.width = d + s) : (f.style.height = q + x + b, f.style.width = d + c + s, f.style.margin = "-" + k.SPILLOVER_TOP *
            q + b + " -" + k.SPILLOVER_RIGHT * d + s + " -" + k.SPILLOVER_BOTTOM * q + b + " -" + k.SPILLOVER_LEFT * d + s);
        a.parentElement.insertBefore(f, a);
        var B = v(f);
        a = p.tableToJSON(a, t);
        var n = f.getBoundingClientRect(),
            h = n.right - n.left,
            n = n.bottom - n.top,
            H = h / (1 + k.SPILLOVER_LEFT + k.SPILLOVER_RIGHT),
            K = n / (1 + k.SPILLOVER_TOP + k.SPILLOVER_BOTTOM),
            C = H * k.SPILLOVER_LEFT,
            y = K * k.SPILLOVER_TOP;
        f.setAttribute("viewBox", "0 0 " + h + " " + n);
        B.pieChart(C, y, H, K, a, t);
        m(f)
    }
});
require.config({
    paths: {
        snap: "../../bower_components/Snap.svg/dist/snap.svg",
        classList: "../../bower_components/classlist/classList.min",
        "number-utils": "../../bower_components/number-utils/dist/number-utils",
        "circle-utils": "../../bower_components/circle-utils/dist/circle",
        "color-utils": "../../bower_components/color-utils/dist/color",
        "dashed-bracket": "../../bower_components/dashed-bracket/dist/dashed-bracket",
        "pie-segment": "../../bower_components/pie-segment/dist/pie-segment",
        "doughnut-segment": "../../bower_components/doughnut-segment/dist/doughnut-segment",
        key: "../../bower_components/key/dist/key",
        "two-section-tooltip": "../../bower_components/two-section-tooltip/dist/two-section-tooltip",
        tooltip: "../../bower_components/Tooltip/dist/Tooltip",
        multitext: "../../bower_components/multitext/dist/multitext"
    },
    shim: {
        snap: {
            exports: "Snap"
        }
    }
});
require(["render"], function(v) {
    var f = document.querySelectorAll("table.fm-pie");
    if (document.implementation && (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0") || document.implementation.hasFeature("SVG", "1.0"))) {
        for (var k = !1, p = document.querySelectorAll("script"), a = 0; a < p.length; a++) {
            var e = p[a].getAttribute("src");
            if (e) {
                var m = "s" == e[4] ? 1 : 0;
                if ("f" == e[7 + m] && "i" == e[16 + m] && "c" == e[9 + m] && "." == e[15 + m]) {
                    k = !0;
                    break
                }
            }
        }
        //if (!k) throw "Licence error";
        for (k = 0; k < f.length; k++)
            if (window.factmint &&
                window.factmint.previewVisualizations || !f[k].hasAttribute("data-fm-rendered")) {
                f[k].setAttribute("data-fm-rendered", "true");
                try {
                    v(f[k])
                } catch (u) {
                    console.log("ERROR: chart rendering failed"), u instanceof Error ? console.log(u.stack) : console.log(u)
                }
            }
    } else
        for (console.log("SVG not supported: visualizations disabled"), k = 0; k < f.length; k++) f[k].style.display = "table"
});
define("main", function() {});
