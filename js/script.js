(function(g, h, c, j, d, l, k) { /*! Jssor */
    new(function() {});
    var e = {
            td: function(a) {
                return -c.cos(a * c.PI) / 2 + .5
            },
            ud: function(a) {
                return a
            },
            Yf: function(a) {
                return a * a
            },
            xd: function(a) {
                return -a * (a - 2)
            },
            Ce: function(a) {
                return (a *= 2) < 1 ? 1 / 2 * a * a : -1 / 2 * (--a * (a - 2) - 1)
            },
            Be: function(a) {
                return a * a * a
            },
            Ae: function(a) {
                return (a -= 1) * a * a + 1
            },
            ze: function(a) {
                return (a *= 2) < 1 ? 1 / 2 * a * a * a : 1 / 2 * ((a -= 2) * a * a + 2)
            },
            xe: function(a) {
                return a * a * a * a
            },
            Fe: function(a) {
                return -((a -= 1) * a * a * a - 1)
            },
            we: function(a) {
                return (a *= 2) < 1 ? 1 / 2 * a * a * a * a : -1 / 2 * ((a -= 2) * a * a * a - 2)
            },
            te: function(a) {
                return a * a * a * a * a
            },
            re: function(a) {
                return (a -= 1) * a * a * a * a + 1
            },
            qe: function(a) {
                return (a *= 2) < 1 ? 1 / 2 * a * a * a * a * a : 1 / 2 * ((a -= 2) * a * a * a * a + 2)
            },
            pe: function(a) {
                return 1 - c.cos(c.PI / 2 * a)
            },
            oe: function(a) {
                return c.sin(c.PI / 2 * a)
            },
            ne: function(a) {
                return -1 / 2 * (c.cos(c.PI * a) - 1)
            },
            ve: function(a) {
                return a == 0 ? 0 : c.pow(2, 10 * (a - 1))
            },
            Ge: function(a) {
                return a == 1 ? 1 : -c.pow(2, -10 * a) + 1
            },
            He: function(a) {
                return a == 0 || a == 1 ? a : (a *= 2) < 1 ? 1 / 2 * c.pow(2, 10 * (a - 1)) : 1 / 2 * (-c.pow(2, -10 * --a) + 2)
            },
            Ie: function(a) {
                return -(c.sqrt(1 - a * a) - 1)
            },
            bf: function(a) {
                return c.sqrt(1 - (a -= 1) * a)
            },
            af: function(a) {
                return (a *= 2) < 1 ? -1 / 2 * (c.sqrt(1 - a * a) - 1) : 1 / 2 * (c.sqrt(1 - (a -= 2) * a) + 1)
            },
            Ze: function(a) {
                if (!a || a == 1) return a;
                var b = .3,
                    d = .075;
                return -(c.pow(2, 10 * (a -= 1)) * c.sin((a - d) * 2 * c.PI / b))
            },
            Ye: function(a) {
                if (!a || a == 1) return a;
                var b = .3,
                    d = .075;
                return c.pow(2, -10 * a) * c.sin((a - d) * 2 * c.PI / b) + 1
            },
            We: function(a) {
                if (!a || a == 1) return a;
                var b = .45,
                    d = .1125;
                return (a *= 2) < 1 ? -.5 * c.pow(2, 10 * (a -= 1)) * c.sin((a - d) * 2 * c.PI / b) : c.pow(2, -10 * (a -= 1)) * c.sin((a - d) * 2 * c.PI / b) * .5 + 1
            },
            Ve: function(a) {
                var b = 1.70158;
                return a * a * ((b + 1) * a - b)
            },
            Ue: function(a) {
                var b = 1.70158;
                return (a -= 1) * a * ((b + 1) * a + b) + 1
            },
            Se: function(a) {
                var b = 1.70158;
                return (a *= 2) < 1 ? 1 / 2 * a * a * (((b *= 1.525) + 1) * a - b) : 1 / 2 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2)
            },
            md: function(a) {
                return 1 - e.gc(1 - a)
            },
            gc: function(a) {
                return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
            },
            Oe: function(a) {
                return a < 1 / 2 ? e.md(a * 2) * .5 : e.gc(a * 2 - 1) * .5 + .5
            },
            Ne: function() {
                return 1 - c.abs(1)
            },
            Me: function(a) {
                return 1 - c.cos(a * c.PI * 2)
            },
            Je: function(a) {
                return c.sin(a * c.PI * 2)
            },
            me: function(a) {
                return 1 - ((a *= 2) < 1 ? (a = 1 - a) * a * a : (a -= 1) * a * a)
            },
            cf: function(a) {
                return (a *= 2) < 1 ? a * a * a : (a = 2 - a) * a * a
            }
        },
        f = {
            Ld: e.td,
            Id: e.ud,
            Hd: e.Yf,
            Fd: e.xd,
            Ed: e.Ce,
            Kd: e.Be,
            Sd: e.Ae,
            he: e.ze,
            ge: e.xe,
            je: e.Fe,
            be: e.we,
            Zd: e.te,
            sd: e.re,
            Xd: e.qe,
            Vd: e.pe,
            Ud: e.oe,
            Td: e.ne,
            Qd: e.ve,
            ke: e.Ge,
            ae: e.He,
            Wd: e.Ie,
            Yd: e.bf,
            ce: e.af,
            Rd: e.Ze,
            Cd: e.Ye,
            Od: e.We,
            Ke: e.Ve,
            df: e.Ue,
            ff: e.Se,
            cg: e.md,
            bg: e.gc,
            Zf: e.Oe,
            ef: e.Ne,
            Xf: e.Me,
            Wf: e.Je,
            Vf: e.me,
            Sf: e.cf
        };
    var b = new function() {
        var f = this,
            Ab = /\S+/g,
            F = 1,
            yb = 2,
            fb = 3,
            eb = 4,
            jb = 5,
            G, r = 0,
            i = 0,
            s = 0,
            X = 0,
            z = 0,
            I = navigator,
            ob = I.appName,
            o = I.userAgent,
            p = parseFloat;

        function Ib() {
            if (!G) {
                G = {
                    jf: "ontouchstart" in g || "createTouch" in h
                };
                var a;
                if (I.pointerEnabled || (a = I.msPointerEnabled)) G.od = a ? "msTouchAction" : "touchAction"
            }
            return G
        }

        function v(j) {
            if (!r) {
                r = -1;
                if (ob == "Microsoft Internet Explorer" && !!g.attachEvent && !!g.ActiveXObject) {
                    var e = o.indexOf("MSIE");
                    r = F;
                    s = p(o.substring(e + 5, o.indexOf(";", e))); /*@cc_on X=@_jscript_version@*/ ;
                    i = h.documentMode || s
                } else if (ob == "Netscape" && !!g.addEventListener) {
                    var d = o.indexOf("Firefox"),
                        b = o.indexOf("Safari"),
                        f = o.indexOf("Chrome"),
                        c = o.indexOf("AppleWebKit");
                    if (d >= 0) {
                        r = yb;
                        i = p(o.substring(d + 8))
                    } else if (b >= 0) {
                        var k = o.substring(0, b).lastIndexOf("/");
                        r = f >= 0 ? eb : fb;
                        i = p(o.substring(k + 1, b))
                    } else {
                        var a = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(o);
                        if (a) {
                            r = F;
                            i = s = p(a[1])
                        }
                    }
                    if (c >= 0) z = p(o.substring(c + 12))
                } else {
                    var a = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(o);
                    if (a) {
                        r = jb;
                        i = p(a[2])
                    }
                }
            }
            return j == r
        }

        function q() {
            return v(F)
        }

        function Q() {
            return q() && (i < 6 || h.compatMode == "BackCompat")
        }

        function db() {
            return v(fb)
        }

        function ib() {
            return v(jb)
        }

        function vb() {
            return db() && z > 534 && z < 535
        }

        function J() {
            v();
            return z > 537 || i > 42 || r == F && i >= 11
        }

        function O() {
            return q() && i < 9
        }

        function wb(a) {
            var b, c;
            return function(f) {
                if (!b) {
                    b = d;
                    var e = a.substr(0, 1).toUpperCase() + a.substr(1);
                    n([a].concat(["WebKit", "ms", "Moz", "O", "webkit"]), function(g, d) {
                        var b = a;
                        if (d) b = g + e;
                        if (f.style[b] != k) return c = b
                    })
                }
                return c
            }
        }

        function ub(b) {
            var a;
            return function(c) {
                a = a || wb(b)(c) || b;
                return a
            }
        }
        var K = ub("transform");

        function nb(a) {
            return {}.toString.call(a)
        }
        var kb = {};
        n(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function(a) {
            kb["[object " + a + "]"] = a.toLowerCase()
        });

        function n(b, d) {
            var a, c;
            if (nb(b) == "[object Array]") {
                for (a = 0; a < b.length; a++)
                    if (c = d(b[a], a, b)) return c
            } else
                for (a in b)
                    if (c = d(b[a], a, b)) return c
        }

        function C(a) {
            return a == j ? String(a) : kb[nb(a)] || "object"
        }

        function lb(a) {
            for (var b in a) return d
        }

        function A(a) {
            try {
                return C(a) == "object" && !a.nodeType && a != a.window && (!a.constructor || {}.hasOwnProperty.call(a.constructor.prototype, "isPrototypeOf"))
            } catch (b) {}
        }

        function u(a, b) {
            return {
                x: a,
                y: b
            }
        }

        function rb(b, a) {
            setTimeout(b, a || 0)
        }

        function H(b, d, c) {
            var a = !b || b == "inherit" ? "" : b;
            n(d, function(c) {
                var b = c.exec(a);
                if (b) {
                    var d = a.substr(0, b.index),
                        e = a.substr(b.index + b[0].length + 1, a.length - 1);
                    a = d + e
                }
            });
            a = c + (!a.indexOf(" ") ? "" : " ") + a;
            return a
        }

        function tb(b, a) {
            if (i < 9) b.style.filter = a
        }
        f.hf = Ib;
        f.pd = q;
        f.Mf = db;
        f.If = J;
        f.Gf = O;
        wb("transform");
        f.Ad = function() {
            return i
        };
        f.wd = rb;

        function Y(a) {
            a.constructor === Y.caller && a.Bd && a.Bd.apply(a, Y.caller.arguments)
        }
        f.Bd = Y;
        f.yb = function(a) {
            if (f.zf(a)) a = h.getElementById(a);
            return a
        };

        function t(a) {
            return a || g.event
        }
        f.zd = t;
        f.yc = function(b) {
            b = t(b);
            var a = b.target || b.srcElement || h;
            if (a.nodeType == 3) a = f.yd(a);
            return a
        };
        f.fd = function(a) {
            a = t(a);
            return {
                x: a.pageX || a.clientX || 0,
                y: a.pageY || a.clientY || 0
            }
        };

        function D(c, d, a) {
            if (a !== k) c.style[d] = a == k ? "" : a;
            else {
                var b = c.currentStyle || c.style;
                a = b[d];
                if (a == "" && g.getComputedStyle) {
                    b = c.ownerDocument.defaultView.getComputedStyle(c, j);
                    b && (a = b.getPropertyValue(d) || b[d])
                }
                return a
            }
        }

        function ab(b, c, a, d) {
            if (a !== k) {
                if (a == j) a = "";
                else d && (a += "px");
                D(b, c, a)
            } else return p(D(b, c))
        }

        function m(c, a) {
            var d = a ? ab : D,
                b;
            if (a & 4) b = ub(c);
            return function(e, f) {
                return d(e, b ? b(e) : c, f, a & 2)
            }
        }

        function Db(b) {
            if (q() && s < 9) {
                var a = /opacity=([^)]*)/.exec(b.style.filter || "");
                return a ? p(a[1]) / 100 : 1
            } else return p(b.style.opacity || "1")
        }

        function Fb(b, a, f) {
            if (q() && s < 9) {
                var h = b.style.filter || "",
                    i = new RegExp(/[\s]*alpha\([^\)]*\)/g),
                    e = c.round(100 * a),
                    d = "";
                if (e < 100 || f) d = "alpha(opacity=" + e + ") ";
                var g = H(h, [i], d);
                tb(b, g)
            } else b.style.opacity = a == 1 ? "" : c.round(a * 100) / 100
        }
        var L = {
            db: ["rotate"],
            V: ["rotateX"],
            Z: ["rotateY"],
            Ub: ["skewX"],
            Qb: ["skewY"]
        };
        if (!J()) L = B(L, {
            v: ["scaleX", 2],
            p: ["scaleY", 2],
            W: ["translateZ", 1]
        });

        function M(d, a) {
            var c = "";
            if (a) {
                if (q() && i && i < 10) {
                    delete a.V;
                    delete a.Z;
                    delete a.W
                }
                b.c(a, function(d, b) {
                    var a = L[b];
                    if (a) {
                        var e = a[1] || 0;
                        if (N[b] != d) c += " " + a[0] + "(" + d + (["deg", "px", ""])[e] + ")"
                    }
                });
                if (J()) {
                    if (a.cb || a.gb || a.W) c += " translate3d(" + (a.cb || 0) + "px," + (a.gb || 0) + "px," + (a.W || 0) + "px)";
                    if (a.v == k) a.v = 1;
                    if (a.p == k) a.p = 1;
                    if (a.v != 1 || a.p != 1) c += " scale3d(" + a.v + ", " + a.p + ", 1)"
                }
            }
            d.style[K(d)] = c
        }
        f.zc = m("transformOrigin", 4);
        f.Af = m("backfaceVisibility", 4);
        f.Bf = m("transformStyle", 4);
        f.Cf = m("perspective", 6);
        f.Df = m("perspectiveOrigin", 4);
        f.Ef = function(a, b) {
            if (q() && s < 9 || s < 10 && Q()) a.style.zoom = b == 1 ? "" : b;
            else {
                var c = K(a),
                    f = "scale(" + b + ")",
                    e = a.style[c],
                    g = new RegExp(/[\s]*scale\(.*?\)/g),
                    d = H(e, [g], f);
                a.style[c] = d
            }
        };
        f.fc = function(b, a) {
            return function(c) {
                c = t(c);
                var e = c.type,
                    d = c.relatedTarget || (e == "mouseout" ? c.toElement : c.fromElement);
                (!d || d !== a && !f.Hf(a, d)) && b(c)
            }
        };
        f.a = function(a, d, b, c) {
            a = f.yb(a);
            if (a.addEventListener) {
                d == "mousewheel" && a.addEventListener("DOMMouseScroll", b, c);
                a.addEventListener(d, b, c)
            } else if (a.attachEvent) {
                a.attachEvent("on" + d, b);
                c && a.setCapture && a.setCapture()
            }
        };
        f.I = function(a, c, d, b) {
            a = f.yb(a);
            if (a.removeEventListener) {
                c == "mousewheel" && a.removeEventListener("DOMMouseScroll", d, b);
                a.removeEventListener(c, d, b)
            } else if (a.detachEvent) {
                a.detachEvent("on" + c, d);
                b && a.releaseCapture && a.releaseCapture()
            }
        };
        f.Sb = function(a) {
            a = t(a);
            a.preventDefault && a.preventDefault();
            a.cancel = d;
            a.returnValue = l
        };
        f.Kf = function(a) {
            a = t(a);
            a.stopPropagation && a.stopPropagation();
            a.cancelBubble = d
        };
        f.H = function(d, c) {
            var a = [].slice.call(arguments, 2),
                b = function() {
                    var b = a.concat([].slice.call(arguments, 0));
                    return c.apply(d, b)
                };
            return b
        };
        f.Lf = function(a, b) {
            if (b == k) return a.textContent || a.innerText;
            var c = h.createTextNode(b);
            f.mc(a);
            a.appendChild(c)
        };
        f.Cb = function(d, c) {
            for (var b = [], a = d.firstChild; a; a = a.nextSibling)(c || a.nodeType == 1) && b.push(a);
            return b
        };

        function mb(a, c, e, b) {
            b = b || "u";
            for (a = a ? a.firstChild : j; a; a = a.nextSibling)
                if (a.nodeType == 1) {
                    if (U(a, b) == c) return a;
                    if (!e) {
                        var d = mb(a, c, e, b);
                        if (d) return d
                    }
                }
        }
        f.F = mb;

        function S(a, d, f, b) {
            b = b || "u";
            var c = [];
            for (a = a ? a.firstChild : j; a; a = a.nextSibling)
                if (a.nodeType == 1) {
                    U(a, b) == d && c.push(a);
                    if (!f) {
                        var e = S(a, d, f, b);
                        if (e.length) c = c.concat(e)
                    }
                }
            return c
        }

        function gb(a, c, d) {
            for (a = a ? a.firstChild : j; a; a = a.nextSibling)
                if (a.nodeType == 1) {
                    if (a.tagName == c) return a;
                    if (!d) {
                        var b = gb(a, c, d);
                        if (b) return b
                    }
                }
        }
        f.kf = gb;
        f.mf = function(b, a) {
            return b.getElementsByTagName(a)
        };

        function B() {
            var e = arguments,
                d, c, b, a, g = 1 & e[0],
                f = 1 + g;
            d = e[f - 1] || {};
            for (; f < e.length; f++)
                if (c = e[f])
                    for (b in c) {
                        a = c[b];
                        if (a !== k) {
                            a = c[b];
                            var h = d[b];
                            d[b] = g && (A(h) || A(a)) ? B(g, {}, h, a) : a
                        }
                    }
                return d
        }
        f.K = B;

        function Z(f, g) {
            var d = {},
                c, a, b;
            for (c in f) {
                a = f[c];
                b = g[c];
                if (a !== b) {
                    var e;
                    if (A(a) && A(b)) {
                        a = Z(a, b);
                        e = !lb(a)
                    }!e && (d[c] = a)
                }
            }
            return d
        }
        f.Qc = function(a) {
            return C(a) == "function"
        };
        f.zf = function(a) {
            return C(a) == "string"
        };
        f.Yb = function(a) {
            return !isNaN(p(a)) && isFinite(a)
        };
        f.c = n;
        f.lf = A;

        function R(a) {
            return h.createElement(a)
        }
        f.Mb = function() {
            return R("DIV")
        };
        f.uf = function() {
            return R("SPAN")
        };
        f.dd = function() {};

        function V(b, c, a) {
            if (a == k) return b.getAttribute(c);
            b.setAttribute(c, a)
        }

        function U(a, b) {
            return V(a, b) || V(a, "data-" + b)
        }
        f.s = V;
        f.g = U;

        function x(b, a) {
            if (a == k) return b.className;
            b.className = a
        }
        f.cd = x;

        function qb(b) {
            var a = {};
            n(b, function(b) {
                if (b != k) a[b] = b
            });
            return a
        }

        function sb(b, a) {
            return b.match(a || Ab)
        }

        function P(b, a) {
            return qb(sb(b || "", a))
        }
        f.Rf = sb;

        function bb(b, c) {
            var a = "";
            n(c, function(c) {
                a && (a += b);
                a += c
            });
            return a
        }

        function E(a, c, b) {
            x(a, bb(" ", B(Z(P(x(a)), P(c)), P(b))))
        }
        f.yd = function(a) {
            return a.parentNode
        };
        f.R = function(a) {
            f.P(a, "none")
        };
        f.O = function(a, b) {
            f.P(a, b ? "none" : "")
        };
        f.og = function(b, a) {
            b.removeAttribute(a)
        };
        f.qg = function() {
            return q() && i < 10
        };
        f.rg = function(d, a) {
            if (a) d.style.clip = "rect(" + c.round(a.i || a.q || 0) + "px " + c.round(a.E) + "px " + c.round(a.D) + "px " + c.round(a.j || a.u || 0) + "px)";
            else if (a !== k) {
                var g = d.style.cssText,
                    f = [new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i), new RegExp(/[\s]*cliptop: .*?[;]?/i), new RegExp(/[\s]*clipright: .*?[;]?/i), new RegExp(/[\s]*clipbottom: .*?[;]?/i), new RegExp(/[\s]*clipleft: .*?[;]?/i)],
                    e = H(g, f, "");
                b.Ib(d, e)
            }
        };
        f.L = function() {
            return +new Date
        };
        f.S = function(b, a) {
            b.appendChild(a)
        };
        f.Gb = function(b, a, c) {
            (c || a.parentNode).insertBefore(b, a)
        };
        f.Kb = function(b, a) {
            a = a || b.parentNode;
            a && a.removeChild(b)
        };
        f.Tf = function(a, b) {
            n(a, function(a) {
                f.Kb(a, b)
            })
        };
        f.mc = function(a) {
            f.Tf(f.Cb(a, d), a)
        };
        f.Uf = function(a, b) {
            var c = f.yd(a);
            b & 1 && f.B(a, (f.l(c) - f.l(a)) / 2);
            b & 2 && f.A(a, (f.m(c) - f.m(a)) / 2)
        };
        f.Lb = function(b, a) {
            return parseInt(b, a || 10)
        };
        f.ag = p;
        f.Hf = function(b, a) {
            var c = h.body;
            while (a && b !== a && c !== a) try {
                a = a.parentNode
            } catch (d) {
                return l
            }
            return b === a
        };

        function W(d, c, b) {
            var a = d.cloneNode(!c);
            !b && f.og(a, "id");
            return a
        }
        f.qb = W;
        f.tb = function(e, g) {
            var a = new Image;

            function b(e, d) {
                f.I(a, "load", b);
                f.I(a, "abort", c);
                f.I(a, "error", c);
                g && g(a, d)
            }

            function c(a) {
                b(a, d)
            }
            if (ib() && i < 11.6 || !e) b(!e);
            else {
                f.a(a, "load", b);
                f.a(a, "abort", c);
                f.a(a, "error", c);
                a.src = e
            }
        };
        f.dg = function(d, a, e) {
            var c = d.length + 1;

            function b(b) {
                c--;
                if (a && b && b.src == a.src) a = b;
                !c && e && e(a)
            }
            n(d, function(a) {
                f.tb(a.src, b)
            });
            b()
        };
        f.eg = function(a, g, i, h) {
            if (h) a = W(a);
            var c = S(a, g);
            if (!c.length) c = b.mf(a, g);
            for (var f = c.length - 1; f > -1; f--) {
                var d = c[f],
                    e = W(i);
                x(e, x(d));
                b.Ib(e, d.style.cssText);
                b.Gb(e, d);
                b.Kb(d)
            }
            return a
        };

        function Gb(a) {
            var l = this,
                p = "",
                r = ["av", "pv", "ds", "dn"],
                e = [],
                q, j = 0,
                g = 0,
                d = 0;

            function i() {
                E(a, q, e[d || j || g & 2 || g]);
                b.M(a, "pointer-events", d ? "none" : "")
            }

            function c() {
                j = 0;
                i();
                f.I(h, "mouseup", c);
                f.I(h, "touchend", c);
                f.I(h, "touchcancel", c)
            }

            function o(a) {
                if (d) f.Sb(a);
                else {
                    j = 4;
                    i();
                    f.a(h, "mouseup", c);
                    f.a(h, "touchend", c);
                    f.a(h, "touchcancel", c)
                }
            }
            l.rf = function(a) {
                if (a === k) return g;
                g = a & 2 || a & 1;
                i()
            };
            l.Jb = function(a) {
                if (a === k) return !d;
                d = a ? 0 : 3;
                i()
            };
            l.N = a = f.yb(a);
            var m = b.Rf(x(a));
            if (m) p = m.shift();
            n(r, function(a) {
                e.push(p + a)
            });
            q = bb(" ", e);
            e.unshift("");
            f.a(a, "mousedown", o);
            f.a(a, "touchstart", o)
        }
        f.xc = function(a) {
            return new Gb(a)
        };
        f.M = D;
        f.Ob = m("overflow");
        f.A = m("top", 2);
        f.B = m("left", 2);
        f.l = m("width", 2);
        f.m = m("height", 2);
        f.Wc = m("marginLeft", 2);
        f.gd = m("marginTop", 2);
        f.z = m("position");
        f.P = m("display");
        f.n = m("zIndex", 1);
        f.ic = function(b, a, c) {
            if (a != k) Fb(b, a, c);
            else return Db(b)
        };
        f.Ib = function(a, b) {
            if (b != k) a.style.cssText = b;
            else return a.style.cssText
        };
        var T = {
            pb: f.ic,
            i: f.A,
            j: f.B,
            ob: f.l,
            sb: f.m,
            mb: f.z,
            Hg: f.P,
            kb: f.n
        };

        function w(g, l) {
            var e = O(),
                b = J(),
                d = vb(),
                h = K(g);

            function i(b, d, a) {
                var e = b.ab(u(-d / 2, -a / 2)),
                    f = b.ab(u(d / 2, -a / 2)),
                    g = b.ab(u(d / 2, a / 2)),
                    h = b.ab(u(-d / 2, a / 2));
                b.ab(u(300, 300));
                return u(c.min(e.x, f.x, g.x, h.x) + d / 2, c.min(e.y, f.y, g.y, h.y) + a / 2)
            }

            function a(d, a) {
                a = a || {};
                var n = a.W || 0,
                    p = (a.V || 0) % 360,
                    q = (a.Z || 0) % 360,
                    u = (a.db || 0) % 360,
                    l = a.v,
                    m = a.p,
                    g = a.Gg;
                if (l == k) l = 1;
                if (m == k) m = 1;
                if (g == k) g = 1;
                if (e) {
                    n = 0;
                    p = 0;
                    q = 0;
                    g = 0
                }
                var c = new Cb(a.cb, a.gb, n);
                c.V(p);
                c.Z(q);
                c.ee(u);
                c.fe(a.Ub, a.Qb);
                c.oc(l, m, g);
                if (b) {
                    c.vb(a.u, a.q);
                    d.style[h] = c.ie()
                } else if (!X || X < 9) {
                    var o = "",
                        j = {
                            x: 0,
                            y: 0
                        };
                    if (a.T) j = i(c, a.T, a.eb);
                    f.gd(d, j.y);
                    f.Wc(d, j.x);
                    o = c.Dd();
                    var s = d.style.filter,
                        t = new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),
                        r = H(s, [t], o);
                    tb(d, r)
                }
            }
            w = function(e, c) {
                c = c || {};
                var h = c.u,
                    i = c.q,
                    g;
                n(T, function(a, b) {
                    g = c[b];
                    g !== k && a(e, g)
                });
                f.rg(e, c.f);
                if (!b) {
                    h != k && f.B(e, (c.Uc || 0) + h);
                    i != k && f.A(e, (c.Tc || 0) + i)
                }
                if (c.Jd)
                    if (d) rb(f.H(j, M, e, c));
                    else a(e, c)
            };
            f.Rb = M;
            if (d) f.Rb = w;
            if (e) f.Rb = a;
            else if (!b) a = M;
            f.Q = w;
            w(g, l)
        }
        f.Rb = w;
        f.Q = w;

        function Cb(i, k, o) {
            var d = this,
                b = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, i || 0, k || 0, o || 0, 1],
                h = c.sin,
                g = c.cos,
                l = c.tan;

            function f(a) {
                return a * c.PI / 180
            }

            function n(a, b) {
                return {
                    x: a,
                    y: b
                }
            }

            function m(c, e, l, m, o, r, t, u, w, z, A, C, E, b, f, k, a, g, i, n, p, q, s, v, x, y, B, D, F, d, h, j) {
                return [c * a + e * p + l * x + m * F, c * g + e * q + l * y + m * d, c * i + e * s + l * B + m * h, c * n + e * v + l * D + m * j, o * a + r * p + t * x + u * F, o * g + r * q + t * y + u * d, o * i + r * s + t * B + u * h, o * n + r * v + t * D + u * j, w * a + z * p + A * x + C * F, w * g + z * q + A * y + C * d, w * i + z * s + A * B + C * h, w * n + z * v + A * D + C * j, E * a + b * p + f * x + k * F, E * g + b * q + f * y + k * d, E * i + b * s + f * B + k * h, E * n + b * v + f * D + k * j]
            }

            function e(c, a) {
                return m.apply(j, (a || b).concat(c))
            }
            d.oc = function(a, c, d) {
                if (a != 1 || c != 1 || d != 1) b = e([a, 0, 0, 0, 0, c, 0, 0, 0, 0, d, 0, 0, 0, 0, 1])
            };
            d.vb = function(a, c, d) {
                b[12] += a || 0;
                b[13] += c || 0;
                b[14] += d || 0
            };
            d.V = function(c) {
                if (c) {
                    a = f(c);
                    var d = g(a),
                        i = h(a);
                    b = e([1, 0, 0, 0, 0, d, i, 0, 0, -i, d, 0, 0, 0, 0, 1])
                }
            };
            d.Z = function(c) {
                if (c) {
                    a = f(c);
                    var d = g(a),
                        i = h(a);
                    b = e([d, 0, -i, 0, 0, 1, 0, 0, i, 0, d, 0, 0, 0, 0, 1])
                }
            };
            d.ee = function(c) {
                if (c) {
                    a = f(c);
                    var d = g(a),
                        i = h(a);
                    b = e([d, i, 0, 0, -i, d, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                }
            };
            d.fe = function(a, c) {
                if (a || c) {
                    i = f(a);
                    k = f(c);
                    b = e([1, l(k), 0, 0, l(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                }
            };
            d.ab = function(c) {
                var a = e(b, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c.x, c.y, 0, 1]);
                return n(a[12], a[13])
            };
            d.ie = function() {
                return "matrix3d(" + b.join(",") + ")"
            };
            d.Dd = function() {
                return "progid:DXImageTransform.Microsoft.Matrix(M11=" + b[0] + ", M12=" + b[4] + ", M21=" + b[1] + ", M22=" + b[5] + ", SizingMethod='auto expand')"
            }
        }
        new function() {
            var a = this;

            function b(d, g) {
                for (var j = d[0].length, i = d.length, h = g[0].length, f = [], c = 0; c < i; c++)
                    for (var k = f[c] = [], b = 0; b < h; b++) {
                        for (var e = 0, a = 0; a < j; a++) e += d[c][a] * g[a][b];
                        k[b] = e
                    }
                return f
            }
            a.v = function(b, c) {
                return a.Sc(b, c, 0)
            };
            a.p = function(b, c) {
                return a.Sc(b, 0, c)
            };
            a.Sc = function(a, c, d) {
                return b(a, [
                    [c, 0],
                    [0, d]
                ])
            };
            a.ab = function(d, c) {
                var a = b(d, [
                    [c.x],
                    [c.y]
                ]);
                return u(a[0][0], a[1][0])
            }
        };
        var N = {
            Uc: 0,
            Tc: 0,
            u: 0,
            q: 0,
            ib: 1,
            v: 1,
            p: 1,
            db: 0,
            V: 0,
            Z: 0,
            cb: 0,
            gb: 0,
            W: 0,
            Ub: 0,
            Qb: 0
        };
        f.ed = function(a) {
            var c = a || {};
            if (a)
                if (b.Qc(a)) c = {
                    wc: c
                };
                else if (b.Qc(a.f)) c.f = {
                wc: a.f
            };
            return c
        };

        function pb(c, a) {
            var b = {};
            n(c, function(c, d) {
                var e = c;
                if (a[d] != k)
                    if (f.Yb(c)) e = c + a[d];
                    else e = pb(c, a[d]);
                b[d] = e
            });
            return b
        }
        f.le = pb;
        f.Le = function(l, m, x, q, z, A, n) {
            var a = m;
            if (l) {
                a = {};
                for (var g in m) {
                    var B = A[g] || 1,
                        w = z[g] || [0, 1],
                        f = (x - w[0]) / w[1];
                    f = c.min(c.max(f, 0), 1);
                    f = f * B;
                    var u = c.floor(f);
                    if (f != u) f -= u;
                    var h = q.wc || e.td,
                        i, C = l[g],
                        o = m[g];
                    if (b.Yb(o)) {
                        h = q[g] || h;
                        var y = h(f);
                        i = C + o * y
                    } else {
                        i = b.K({
                            Tb: {}
                        }, l[g]);
                        var v = q[g] || {};
                        b.c(o.Tb || o, function(d, a) {
                            h = v[a] || v.wc || h;
                            var c = h(f),
                                b = d * c;
                            i.Tb[a] = b;
                            i[a] += b
                        })
                    }
                    a[g] = i
                }
                var t = b.c(m, function(b, a) {
                    return N[a] != k
                });
                t && b.c(N, function(c, b) {
                    if (a[b] == k && l[b] !== k) a[b] = l[b]
                });
                if (t) {
                    if (a.ib) a.v = a.p = a.ib;
                    a.T = n.T;
                    a.eb = n.eb;
                    a.Jd = d
                }
            }
            if (m.f && n.vb) {
                var p = a.f.Tb,
                    s = (p.i || 0) + (p.D || 0),
                    r = (p.j || 0) + (p.E || 0);
                a.j = (a.j || 0) + r;
                a.i = (a.i || 0) + s;
                a.f.j -= r;
                a.f.E -= r;
                a.f.i -= s;
                a.f.D -= s
            }
            if (a.f && b.qg() && !a.f.i && !a.f.j && !a.f.q && !a.f.u && a.f.E == n.T && a.f.D == n.eb) a.f = j;
            return a
        }
    };

    function n() {
        var a = this,
            d = [];

        function i(a, b) {
            d.push({
                rc: a,
                hc: b
            })
        }

        function h(a, c) {
            b.c(d, function(b, e) {
                b.rc == a && b.hc === c && d.splice(e, 1)
            })
        }
        a.xb = a.addEventListener = i;
        a.removeEventListener = h;
        a.k = function(a) {
            var c = [].slice.call(arguments, 1);
            b.c(d, function(b) {
                b.rc == a && b.hc.apply(g, c)
            })
        }
    }
    var m = function(z, C, f, K, N, M) {
        z = z || 0;
        var a = this,
            q, n, o, u, A = 0,
            G, H, F, B, y = 0,
            i = 0,
            m = 0,
            D, k, h, e, p, J, w = [],
            x;

        function P(a) {
            h += a;
            e += a;
            k += a;
            i += a;
            m += a;
            y += a
        }

        function t(o) {
            var g = o;
            if (p && (g >= e || g <= h && !J)) g = ((g - h) % p + p) % p + h;
            if (!D || u || i != g) {
                var j = c.min(g, e);
                j = c.max(j, h);
                if (!D || u || j != m) {
                    if (M) {
                        var l = (j - k) / (C || 1);
                        if (f.Xe) l = 1 - l;
                        var n = b.Le(N, M, l, G, F, H, f);
                        if (x) b.c(n, function(b, a) {
                            x[a] && x[a](K, b)
                        });
                        else b.Q(K, n)
                    }
                    a.bc(m - k, j - k);
                    m = j;
                    b.c(w, function(b, c) {
                        var a = o < i ? w[w.length - c - 1] : b;
                        a.C(m - y)
                    });
                    var r = i,
                        q = m;
                    i = g;
                    D = d;
                    a.Pb(r, q)
                }
            }
        }

        function E(a, b, d) {
            b && a.jb(e);
            if (!d) {
                h = c.min(h, a.sc() + y);
                e = c.max(e, a.nb() + y)
            }
            w.push(a)
        }
        var r = g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || g.msRequestAnimationFrame;
        if (b.Mf() && b.Ad() < 7) r = j;
        r = r || function(a) {
            b.wd(a, f.Oc)
        };

        function I() {
            if (q) {
                var d = b.L(),
                    e = c.min(d - A, f.Nc),
                    a = i + e * o;
                A = d;
                if (a * o >= n * o) a = n;
                t(a);
                if (!u && a * o >= n * o) L(B);
                else r(I)
            }
        }

        function s(f, g, j) {
            if (!q) {
                q = d;
                u = j;
                B = g;
                f = c.max(f, h);
                f = c.min(f, e);
                n = f;
                o = n < i ? -1 : 1;
                a.Mc();
                A = b.L();
                r(I)
            }
        }

        function L(b) {
            if (q) {
                u = q = B = l;
                a.Lc();
                b && b()
            }
        }
        a.Kc = function(a, b, c) {
            s(a ? i + a : e, b, c)
        };
        a.Jc = s;
        a.hb = L;
        a.ue = function(a) {
            s(a)
        };
        a.U = function() {
            return i
        };
        a.Hc = function() {
            return n
        };
        a.rb = function() {
            return m
        };
        a.C = t;
        a.vb = function(a) {
            t(i + a)
        };
        a.Fc = function() {
            return q
        };
        a.Ee = function(a) {
            p = a
        };
        a.jb = P;
        a.Y = function(a, b) {
            E(a, 0, b)
        };
        a.Vb = function(a) {
            E(a, 1)
        };
        a.tg = function(a) {
            e += a
        };
        a.sc = function() {
            return h
        };
        a.nb = function() {
            return e
        };
        a.Pb = a.Mc = a.Lc = a.bc = b.dd;
        a.lc = b.L();
        f = b.K({
            Oc: 16,
            Nc: 50
        }, f);
        p = f.pc;
        J = f.Qf;
        x = f.fg;
        h = k = z;
        e = z + C;
        H = f.gg || {};
        F = f.ig || {};
        G = b.ed(f.X)
    };
    new(function() {});
    var i = function(p, fc) {
        var f = this;

        function Bc() {
            var a = this;
            m.call(a, -1e8, 2e8);
            a.wf = function() {
                var b = a.rb(),
                    d = c.floor(b),
                    f = t(d),
                    e = b - c.floor(b);
                return {
                    fb: f,
                    nf: d,
                    mb: e
                }
            };
            a.Pb = function(b, a) {
                var e = c.floor(a);
                if (e != a && a > b) e++;
                Tb(e, d);
                f.k(i.gf, t(a), t(b), a, b)
            }
        }

        function Ac() {
            var a = this;
            m.call(a, 0, 0, {
                pc: r
            });
            b.c(C, function(b) {
                D & 1 && b.Ee(r);
                a.Vb(b);
                b.jb(kb / bc)
            })
        }

        function zc() {
            var a = this,
                b = Ub.N;
            m.call(a, -1, 2, {
                X: e.ud,
                fg: {
                    mb: Zb
                },
                pc: r
            }, b, {
                mb: 1
            }, {
                mb: -2
            });
            a.kc = b
        }

        function mc(o, n) {
            var b = this,
                e, g, h, k, c;
            m.call(b, -1e8, 2e8, {
                Nc: 100
            });
            b.Mc = function() {
                M = d;
                R = j;
                f.k(i.qf, t(w.U()), w.U())
            };
            b.Lc = function() {
                M = l;
                k = l;
                var a = w.wf();
                f.k(i.lg, t(w.U()), w.U());
                !a.mb && Dc(a.nf, s)
            };
            b.Pb = function(i, f) {
                var b;
                if (k) b = c;
                else {
                    b = g;
                    if (h) {
                        var d = f / h;
                        b = a.Ec(d) * (g - e) + e
                    }
                }
                w.C(b)
            };
            b.Hb = function(a, d, c, f) {
                e = a;
                g = d;
                h = c;
                w.C(a);
                b.C(0);
                b.Jc(c, f)
            };
            b.wg = function(a) {
                k = d;
                c = a;
                b.Kc(a, j, d)
            };
            b.De = function(a) {
                c = a
            };
            w = new Bc;
            w.Y(o);
            w.Y(n)
        }

        function oc() {
            var c = this,
                a = Xb();
            b.n(a, 0);
            b.M(a, "pointerEvents", "none");
            c.N = a;
            c.Fb = function() {
                b.R(a);
                b.mc(a)
            }
        }

        function xc(o, g) {
            var e = this,
                q, M, v, k, y = [],
                x, B, W, H, S, F, h, w, p;
            m.call(e, -u, u + 1, {});

            function E(a) {
                q && q.Gc();
                T(o, a, 0);
                F = d;
                q = new I.G(o, I, b.ag(b.g(o, "idle")) || lc);
                q.C(0)
            }

            function Z() {
                q.lc < I.lc && E()
            }

            function O(p, r, o) {
                if (!H) {
                    H = d;
                    if (k && o) {
                        var h = o.width,
                            c = o.height,
                            n = h,
                            m = c;
                        if (h && c && a.ub) {
                            if (a.ub & 3 && (!(a.ub & 4) || h > K || c > J)) {
                                var j = l,
                                    q = K / J * c / h;
                                if (a.ub & 1) j = q > 1;
                                else if (a.ub & 2) j = q < 1;
                                n = j ? h * J / c : K;
                                m = j ? J : c * K / h
                            }
                            b.l(k, n);
                            b.m(k, m);
                            b.A(k, (J - m) / 2);
                            b.B(k, (K - n) / 2)
                        }
                        b.z(k, "absolute");
                        f.k(i.ye, g)
                    }
                }
                b.R(r);
                p && p(e)
            }

            function Y(b, c, d, f) {
                if (f == R && s == g && N)
                    if (!Cc) {
                        var a = t(b);
                        A.Jf(a, g, c, e, d);
                        c.se();
                        U.jb(a - U.sc() - 1);
                        U.C(a);
                        z.Hb(b, b, 0)
                    }
            }

            function bb(b) {
                if (b == R && s == g) {
                    if (!h) {
                        var a = j;
                        if (A)
                            if (A.fb == g) a = A.xf();
                            else A.Fb();
                        Z();
                        h = new vc(o, g, a, q);
                        h.Ic(p)
                    }!h.Fc() && h.dc()
                }
            }

            function G(d, f, l) {
                if (d == g) {
                    if (d != f) C[f] && C[f].Pc();
                    else !l && h && h.Te();
                    p && p.Jb();
                    var m = R = b.L();
                    e.tb(b.H(j, bb, m))
                } else {
                    var k = c.min(g, d),
                        i = c.max(g, d),
                        o = c.min(i - k, k + r - i),
                        n = u + a.Re - 1;
                    (!S || o <= n) && e.tb()
                }
            }

            function db() {
                if (s == g && h) {
                    h.hb();
                    p && p.Qe();
                    p && p.Pe();
                    h.Rc()
                }
            }

            function eb() {
                s == g && h && h.hb()
            }

            function ab(a) {
                !P && f.k(i.Nd, g, a)
            }

            function Q() {
                p = w.pInstance;
                h && h.Ic(p)
            }
            e.tb = function(c, a) {
                a = a || v;
                if (y.length && !H) {
                    b.O(a);
                    if (!W) {
                        W = d;
                        f.k(i.Md, g);
                        b.c(y, function(a) {
                            if (!b.s(a, "src")) {
                                a.src = b.g(a, "src2");
                                b.P(a, a["display-origin"])
                            }
                        })
                    }
                    b.dg(y, k, b.H(j, O, c, a))
                } else O(c, a)
            };
            e.de = function() {
                var i = g;
                if (a.Vc < 0) i -= r;
                var d = i + a.Vc * tc;
                if (D & 2) d = t(d);
                if (!(D & 1) && !ib) d = c.max(0, c.min(d, r - u));
                if (d != g) {
                    if (A) {
                        var f = A.Ff(r);
                        if (f) {
                            var k = R = b.L(),
                                h = C[t(d)];
                            return h.tb(b.H(j, Y, d, h, f, k), v)
                        }
                    }
                    cb(d)
                } else if (a.lb) {
                    e.Pc();
                    G(g, g)
                }
            };
            e.vc = function() {
                G(g, g, d)
            };
            e.Pc = function() {
                p && p.Qe();
                p && p.Pe();
                e.Xc();
                h && h.Pd();
                h = j;
                E()
            };
            e.se = function() {
                b.R(o)
            };
            e.Xc = function() {
                b.O(o)
            };
            e.hg = function() {
                p && p.Jb()
            };

            function T(a, c, e) {
                if (b.s(a, "jssor-slider")) return;
                if (!F) {
                    if (a.tagName == "IMG") {
                        y.push(a);
                        if (!b.s(a, "src")) {
                            S = d;
                            a["display-origin"] = b.P(a);
                            b.R(a)
                        }
                    }
                    b.n(a, (b.n(a) || 0) + 1);
                    b.gd(a, 0);
                    b.Wc(a, 0)
                }
                var f = b.Cb(a);
                b.c(f, function(f) {
                    var h = f.tagName,
                        i = b.g(f, "u");
                    if (i == "player" && !w) {
                        w = f;
                        if (w.pInstance) Q();
                        else b.a(w, "dataavailable", Q)
                    }
                    if (i == "caption") {
                        if (c) {
                            b.zc(f, b.g(f, "to"));
                            b.Af(f, b.g(f, "bf"));
                            b.g(f, "3d") && b.Bf(f, "preserve-3d")
                        } else if (!b.pd()) {
                            var g = b.qb(f, l, d);
                            b.Gb(g, f, a);
                            b.Kb(f, a);
                            f = g;
                            c = d
                        }
                    } else if (!F && !e && !k) {
                        if (h == "A") {
                            if (b.g(f, "u") == "image") k = b.kf(f, "IMG");
                            else k = b.F(f, "image", d);
                            if (k) {
                                x = f;
                                b.P(x, "block");
                                b.Q(x, V);
                                B = b.qb(x, d);
                                b.z(x, "relative");
                                b.ic(B, 0);
                                b.M(B, "backgroundColor", "#000")
                            }
                        } else if (h == "IMG" && b.g(f, "u") == "image") k = f;
                        if (k) {
                            k.border = 0;
                            b.Q(k, V)
                        }
                    }
                    T(f, c, e + 1)
                })
            }
            e.bc = function(c, b) {
                var a = u - b;
                Zb(M, a)
            };
            e.fb = g;
            n.call(e);
            b.Cf(o, b.g(o, "p"));
            b.Df(o, b.g(o, "po"));
            var L = b.F(o, "thumb", d);
            if (L) {
                b.qb(L);
                b.R(L)
            }
            b.O(o);
            v = b.qb(gb);
            b.n(v, 1e3);
            b.a(o, "click", ab);
            E(d);
            e.yf = k;
            e.Yc = B;
            e.kc = M = o;
            b.S(M, v);
            f.xb(203, G);
            f.xb(28, eb);
            f.xb(24, db)
        }

        function vc(y, g, p, q) {
            var a = this,
                n = 0,
                u = 0,
                h, j, e, c, k, t, r, o = C[g];
            m.call(a, 0, 0);

            function v() {
                b.mc(L);
                cc && k && o.Yc && b.S(L, o.Yc);
                b.O(L, !k && o.yf)
            }

            function w() {
                a.dc()
            }

            function x(b) {
                r = b;
                a.hb();
                a.dc()
            }
            a.dc = function() {
                var b = a.rb();
                if (!B && !M && !r && s == g) {
                    if (!b) {
                        if (h && !k) {
                            k = d;
                            a.Rc(d);
                            f.k(i.sg, g, n, u, h, c)
                        }
                        v()
                    }
                    var l, p = i.Zc;
                    if (b != c)
                        if (b == e) l = c;
                        else if (b == j) l = e;
                    else if (!b) l = j;
                    else l = a.Hc();
                    f.k(p, g, b, n, j, e, c);
                    var m = N && (!E || F);
                    if (b == c)(e != c && !(E & 12) || m) && o.de();
                    else(m || b != e) && a.Jc(l, w)
                }
            };
            a.Te = function() {
                e == c && e == a.rb() && a.C(j)
            };
            a.Pd = function() {
                A && A.fb == g && A.Fb();
                var b = a.rb();
                b < c && f.k(i.Zc, g, -b - 1, n, j, e, c)
            };
            a.Rc = function(a) {
                p && b.Ob(lb, a && p.ec.Fg ? "" : "hidden")
            };
            a.bc = function(b, a) {
                if (k && a >= h) {
                    k = l;
                    v();
                    o.Xc();
                    A.Fb();
                    f.k(i.kg, g, n, u, h, c)
                }
                f.k(i.jg, g, a, n, j, e, c)
            };
            a.Ic = function(a) {
                if (a && !t) {
                    t = a;
                    a.xb($JssorPlayer$.ng, x)
                }
            };
            p && a.Vb(p);
            h = a.nb();
            a.Vb(q);
            j = h + q.ad;
            e = h + q.bd;
            c = a.nb()
        }

        function Kb(a, c, d) {
            b.B(a, c);
            b.A(a, d)
        }

        function Zb(c, b) {
            var a = x > 0 ? x : fb,
                d = zb * b * (a & 1),
                e = Ab * b * (a >> 1 & 1);
            Kb(c, d, e)
        }

        function Pb() {
            qb = M;
            Ib = z.Hc();
            G = w.U()
        }

        function gc() {
            Pb();
            if (B || !F && E & 12) {
                z.hb();
                f.k(i.tf)
            }
        }

        function ec(f) {
            if (!B && (F || !(E & 12)) && !z.Fc()) {
                var d = w.U(),
                    b = c.ceil(G);
                if (f && c.abs(H) >= a.Dc) {
                    b = c.ceil(d);
                    b += jb
                }
                if (!(D & 1)) b = c.min(r - u, c.max(b, 0));
                var e = c.abs(b - d);
                e = 1 - c.pow(1 - e, 5);
                if (!P && qb) z.ue(Ib);
                else if (d == b) {
                    tb.hg();
                    tb.vc()
                } else z.Hb(d, b, e * Vb)
            }
        }

        function Hb(a) {
            !b.g(b.yc(a), "nodrag") && b.Sb(a)
        }

        function rc(a) {
            Yb(a, 1)
        }

        function Yb(a, c) {
            a = b.zd(a);
            var k = b.yc(a);
            if (!O && !b.g(k, "nodrag") && sc() && (!c || a.touches.length == 1)) {
                B = d;
                yb = l;
                R = j;
                b.a(h, c ? "touchmove" : "mousemove", Bb);
                b.L();
                P = 0;
                gc();
                if (!qb) x = 0;
                if (c) {
                    var g = a.touches[0];
                    ub = g.clientX;
                    vb = g.clientY
                } else {
                    var e = b.fd(a);
                    ub = e.x;
                    vb = e.y
                }
                H = 0;
                hb = 0;
                jb = 0;
                f.k(i.sf, t(G), G, a)
            }
        }

        function Bb(e) {
            if (B) {
                e = b.zd(e);
                var f;
                if (e.type != "mousemove") {
                    var l = e.touches[0];
                    f = {
                        x: l.clientX,
                        y: l.clientY
                    }
                } else f = b.fd(e);
                if (f) {
                    var j = f.x - ub,
                        k = f.y - vb;
                    if (c.floor(G) != G) x = x || fb & O;
                    if ((j || k) && !x) {
                        if (O == 3)
                            if (c.abs(k) > c.abs(j)) x = 2;
                            else x = 1;
                        else x = O;
                        if (ob && x == 1 && c.abs(k) - c.abs(j) > 3) yb = d
                    }
                    if (x) {
                        var a = k,
                            i = Ab;
                        if (x == 1) {
                            a = j;
                            i = zb
                        }
                        if (!(D & 1)) {
                            if (a > 0) {
                                var g = i * s,
                                    h = a - g;
                                if (h > 0) a = g + c.sqrt(h) * 5
                            }
                            if (a < 0) {
                                var g = i * (r - u - s),
                                    h = -a - g;
                                if (h > 0) a = -g - c.sqrt(h) * 5
                            }
                        }
                        if (H - hb < -2) jb = 0;
                        else if (H - hb > 2) jb = -1;
                        hb = H;
                        H = a;
                        sb = G - H / i / (Y || 1);
                        if (H && x && !yb) {
                            b.Sb(e);
                            if (!M) z.wg(sb);
                            else z.De(sb)
                        }
                    }
                }
            }
        }

        function bb() {
            qc();
            if (B) {
                B = l;
                b.L();
                b.I(h, "mousemove", Bb);
                b.I(h, "touchmove", Bb);
                P = H;
                z.hb();
                var a = w.U();
                f.k(i.Pf, t(a), a, t(G), G);
                E & 12 && Pb();
                ec(d)
            }
        }

        function jc(c) {
            if (P) {
                b.Kf(c);
                var a = b.yc(c);
                while (a && v !== a) {
                    a.tagName == "A" && b.Sb(c);
                    try {
                        a = a.parentNode
                    } catch (d) {
                        break
                    }
                }
            }
        }

        function Jb(a) {
            C[s];
            s = t(a);
            tb = C[s];
            Tb(a);
            return s
        }

        function Dc(a, b) {
            x = 0;
            Jb(a);
            f.k(i.pf, t(a), b)
        }

        function Tb(a, c) {
            wb = a;
            b.c(S, function(b) {
                b.ac(t(a), a, c)
            })
        }

        function sc() {
            var b = i.Bc || 0,
                a = X;
            if (ob) a & 1 && (a &= 1);
            i.Bc |= a;
            return O = a & ~b
        }

        function qc() {
            if (O) {
                i.Bc &= ~X;
                O = 0
            }
        }

        function Xb() {
            var a = b.Mb();
            b.Q(a, V);
            b.z(a, "absolute");
            return a
        }

        function t(a) {
            return (a % r + r) % r
        }

        function kc(b, d) {
            if (d)
                if (!D) {
                    b = c.min(c.max(b + wb, 0), r - u);
                    d = l
                } else if (D & 2) {
                b = t(b + wb);
                d = l
            }
            cb(b, a.Eb, d)
        }

        function xb() {
            b.c(S, function(a) {
                a.jc(a.Nb.Bg <= F)
            })
        }

        function hc() {
            if (!F) {
                F = 1;
                xb();
                if (!B) {
                    E & 12 && ec();
                    E & 3 && C[s].vc()
                }
            }
        }

        function Ec() {
            if (F) {
                F = 0;
                xb();
                B || !(E & 12) || gc()
            }
        }

        function ic() {
            V = {
                ob: K,
                sb: J,
                i: 0,
                j: 0
            };
            b.c(T, function(a) {
                b.Q(a, V);
                b.z(a, "absolute");
                b.Ob(a, "hidden");
                b.R(a)
            });
            b.Q(gb, V)
        }

        function ab(b, a) {
            cb(b, a, d)
        }

        function cb(g, f, j) {
            if (Rb && (!B && (F || !(E & 12)) || a.Ac)) {
                M = d;
                B = l;
                z.hb();
                if (f == k) f = Vb;
                var e = Cb.rb(),
                    b = g;
                if (j) {
                    b = e + g;
                    if (g > 0) b = c.ceil(b);
                    else b = c.floor(b)
                }
                if (D & 2) b = t(b);
                if (!(D & 1)) b = c.max(0, c.min(b, r - u));
                var i = (b - e) % r;
                b = e + i;
                var h = e == b ? 0 : f * c.abs(i);
                h = c.min(h, f * u * 1.5);
                z.Hb(e, b, h || 1)
            }
        }
        f.Kc = function() {
            if (!N) {
                N = d;
                C[s] && C[s].vc()
            }
        };

        function W() {
            return b.l(y || p)
        }

        function nb() {
            return b.m(y || p)
        }
        f.T = W;
        f.eb = nb;

        function Eb(c, d) {
            if (c == k) return b.l(p);
            if (!y) {
                var a = b.Mb(h);
                b.cd(a, b.cd(p));
                b.Ib(a, b.Ib(p));
                b.P(a, "block");
                b.z(a, "relative");
                b.A(a, 0);
                b.B(a, 0);
                b.Ob(a, "visible");
                y = b.Mb(h);
                b.z(y, "absolute");
                b.A(y, 0);
                b.B(y, 0);
                b.l(y, b.l(p));
                b.m(y, b.m(p));
                b.zc(y, "0 0");
                b.S(y, a);
                var g = b.Cb(p);
                b.S(p, y);
                b.M(p, "backgroundImage", "");
                b.c(g, function(c) {
                    b.S(b.g(c, "noscale") ? p : a, c);
                    b.g(c, "autocenter") && Lb.push(c)
                })
            }
            Y = c / (d ? b.m : b.l)(y);
            b.Ef(y, Y);
            var f = d ? Y * W() : c,
                e = d ? c : Y * nb();
            b.l(p, f);
            b.m(p, e);
            b.c(Lb, function(a) {
                var c = b.Lb(b.g(a, "autocenter"));
                b.Uf(a, c)
            })
        }
        f.of = Eb;
        n.call(f);
        f.N = p = b.yb(p);
        var a = b.K({
            ub: 0,
            Re: 1,
            qc: 1,
            Wb: 0,
            Xb: l,
            lb: 1,
            wb: d,
            Ac: d,
            Vc: 1,
            ld: 3e3,
            kd: 1,
            Eb: 500,
            Ec: e.xd,
            Dc: 20,
            rd: 0,
            Ab: 1,
            vd: 0,
            Nf: 1,
            cc: 1,
            id: 1
        }, fc);
        a.wb = a.wb && b.If();
        if (a.Of != k) a.ld = a.Of;
        if (a.mg != k) a.vd = a.mg;
        var fb = a.cc & 3,
            tc = (a.cc & 4) / -4 || 1,
            mb = a.Ag,
            I = b.K({
                G: q,
                wb: a.wb
            }, a.pg);
        I.Bb = I.Bb || I.Eg;
        var Fb = a.ug,
            Z = a.vg,
            eb = a.Dg,
            Q = !a.Nf,
            y, v = b.F(p, "slides", Q),
            gb = b.F(p, "loading", Q) || b.Mb(h),
            Nb = b.F(p, "navigator", Q),
            dc = b.F(p, "arrowleft", Q),
            ac = b.F(p, "arrowright", Q),
            Mb = b.F(p, "thumbnavigator", Q),
            pc = b.l(v),
            nc = b.m(v),
            V, T = [],
            uc = b.Cb(v);
        b.c(uc, function(a) {
            if (a.tagName == "DIV" && !b.g(a, "u")) T.push(a);
            else b.Gf() && b.n(a, (b.n(a) || 0) + 1)
        });
        var s = -1,
            wb, tb, r = T.length,
            K = a.xg || pc,
            J = a.yg || nc,
            Wb = a.rd,
            zb = K + Wb,
            Ab = J + Wb,
            bc = fb & 1 ? zb : Ab,
            u = c.min(a.Ab, r),
            lb, x, O, yb, S = [],
            Qb, Sb, Ob, cc, Cc, N, E = a.kd,
            lc = a.ld,
            Vb = a.Eb,
            rb, ib, kb, Rb = u < r,
            D = Rb ? a.lb : 0,
            X, P, F = 1,
            M, B, R, ub = 0,
            vb = 0,
            H, hb, jb, Cb, w, U, z, Ub = new oc,
            Y, Lb = [];
        if (r) {
            if (a.wb) Kb = function(a, c, d) {
                b.Rb(a, {
                    cb: c,
                    gb: d
                })
            };
            N = a.Xb;
            f.Nb = fc;
            ic();
            b.s(p, "jssor-slider", d);
            b.n(v, b.n(v) || 0);
            b.z(v, "absolute");
            lb = b.qb(v, d);
            b.Gb(lb, v);
            if (mb) {
                cc = mb.Cg;
                rb = mb.G;
                ib = u == 1 && r > 1 && rb && (!b.pd() || b.Ad() >= 8)
            }
            kb = ib || u >= r || !(D & 1) ? 0 : a.vd;
            X = (u > 1 || kb ? fb : -1) & a.id;
            var Gb = v,
                C = [],
                A, L, Db = b.hf(),
                ob = Db.jf,
                G, qb, Ib, sb;
            Db.od && b.M(Gb, Db.od, ([j, "pan-y", "pan-x", "none"])[X] || "");
            U = new zc;
            if (ib) A = new rb(Ub, K, J, mb, ob);
            b.S(lb, U.kc);
            b.Ob(v, "hidden");
            L = Xb();
            b.M(L, "backgroundColor", "#000");
            b.ic(L, 0);
            b.Gb(L, Gb.firstChild, Gb);
            for (var db = 0; db < T.length; db++) {
                var wc = T[db],
                    yc = new xc(wc, db);
                C.push(yc)
            }
            b.R(gb);
            Cb = new Ac;
            z = new mc(Cb, U);
            b.a(v, "click", jc, d);
            b.a(p, "mouseout", b.fc(hc, p));
            b.a(p, "mouseover", b.fc(Ec, p));
            if (X) {
                b.a(v, "mousedown", Yb);
                b.a(v, "touchstart", rc);
                b.a(v, "dragstart", Hb);
                b.a(v, "selectstart", Hb);
                b.a(h, "mouseup", bb);
                b.a(h, "touchend", bb);
                b.a(h, "touchcancel", bb);
                b.a(g, "blur", bb)
            }
            E &= ob ? 10 : 5;
            if (Nb && Fb) {
                Qb = new Fb.G(Nb, Fb, W(), nb());
                S.push(Qb)
            }
            if (Z && dc && ac) {
                Z.lb = D;
                Z.Ab = u;
                Sb = new Z.G(dc, ac, Z, W(), nb());
                S.push(Sb)
            }
            if (Mb && eb) {
                eb.Wb = a.Wb;
                Ob = new eb.G(Mb, eb);
                S.push(Ob)
            }
            b.c(S, function(a) {
                a.uc(r, C, gb);
                a.xb(o.tc, kc)
            });
            b.M(p, "visibility", "visible");
            Eb(W());
            xb();
            a.qc && b.a(h, "keydown", function(b) {
                if (b.keyCode == 37) ab(-a.qc);
                else b.keyCode == 39 && ab(a.qc)
            });
            var pb = a.Wb;
            if (!(D & 1)) pb = c.max(0, c.min(pb, r - u));
            z.Hb(pb, pb, 0)
        }
    };
    i.Nd = 21;
    i.sf = 22;
    i.Pf = 23;
    i.qf = 24;
    i.lg = 25;
    i.Md = 26;
    i.ye = 27;
    i.tf = 28;
    i.gf = 202;
    i.pf = 203;
    i.sg = 206;
    i.kg = 207;
    i.jg = 208;
    i.Zc = 209;
    var o = {
            tc: 1
        },
        r = function(e, C) {
            var f = this;
            n.call(f);
            e = b.yb(e);
            var s, A, z, r, k = 0,
                a, m, i, w, x, h, g, q, p, B = [],
                y = [];

            function v(a) {
                a != -1 && y[a].rf(a == k)
            }

            function t(a) {
                f.k(o.tc, a * m)
            }
            f.N = e;
            f.ac = function(a) {
                if (a != r) {
                    var d = k,
                        b = c.floor(a / m);
                    k = b;
                    r = a;
                    v(d);
                    v(b)
                }
            };
            f.jc = function(a) {
                b.O(e, a)
            };
            var u;
            f.uc = function(D) {
                if (!u) {
                    s = c.ceil(D / m);
                    k = 0;
                    var o = q + w,
                        r = p + x,
                        n = c.ceil(s / i) - 1;
                    A = q + o * (!h ? n : i - 1);
                    z = p + r * (h ? n : i - 1);
                    b.l(e, A);
                    b.m(e, z);
                    for (var f = 0; f < s; f++) {
                        var C = b.uf();
                        b.Lf(C, f + 1);
                        var l = b.eg(g, "numbertemplate", C, d);
                        b.z(l, "absolute");
                        var v = f % (n + 1);
                        b.B(l, !h ? o * v : f % i * o);
                        b.A(l, h ? r * v : c.floor(f / (n + 1)) * r);
                        b.S(e, l);
                        B[f] = l;
                        a.nc & 1 && b.a(l, "click", b.H(j, t, f));
                        a.nc & 2 && b.a(l, "mouseover", b.fc(b.H(j, t, f), l));
                        y[f] = b.xc(l)
                    }
                    u = d
                }
            };
            f.Nb = a = b.K({
                jd: 10,
                hd: 10,
                qd: 1,
                nc: 1
            }, C);
            g = b.F(e, "prototype");
            q = b.l(g);
            p = b.m(g);
            b.Kb(g, e);
            m = a.nd || 1;
            i = a.vf || 1;
            w = a.jd;
            x = a.hd;
            h = a.qd - 1;
            a.oc == l && b.s(e, "noscale", d);
            a.zb && b.s(e, "autocenter", a.zb)
        },
        s = function(a, g, h) {
            var c = this;
            n.call(c);
            var r, e, f, i;
            b.l(a);
            b.m(a);
            var p, m;

            function k(a) {
                c.k(o.tc, a, d)
            }

            function t(c) {
                b.O(a, c);
                b.O(g, c)
            }

            function s() {
                p.Jb(h.lb || e > 0);
                m.Jb(h.lb || e < r - h.Ab)
            }
            c.ac = function(b, a, c) {
                if (c) e = a;
                else {
                    e = b;
                    s()
                }
            };
            c.jc = t;
            var q;
            c.uc = function(c) {
                r = c;
                e = 0;
                if (!q) {
                    b.a(a, "click", b.H(j, k, -i));
                    b.a(g, "click", b.H(j, k, i));
                    p = b.xc(a);
                    m = b.xc(g);
                    q = d
                }
            };
            c.Nb = f = b.K({
                nd: 1
            }, h);
            i = f.nd;
            if (f.oc == l) {
                b.s(a, "noscale", d);
                b.s(g, "noscale", d)
            }
            if (f.zb) {
                b.s(a, "autocenter", f.zb);
                b.s(g, "autocenter", f.zb)
            }
        };

    function q(e, d, c) {
        var a = this;
        m.call(a, 0, c);
        a.Gc = b.dd;
        a.ad = 0;
        a.bd = c
    }
    var t = function(v, g, u) {
        var a = this,
            w, n = {},
            p = g.Bb,
            r = g.zg,
            e = new m(0, 0),
            t = [],
            o = [],
            h = [];
        m.call(a, 0, 0);

        function q(d, c) {
            var a = {};
            b.c(d, function(d, f) {
                var e = n[f];
                if (e) {
                    if (b.lf(d)) d = q(d, c || f == "e");
                    else if (c)
                        if (b.Yb(d)) d = w[d];
                    a[e] = d
                }
            });
            return a
        }

        function s(e, c) {
            var a = [],
                d = b.Cb(e);
            b.c(d, function(d) {
                var h = b.g(d, "u") == "caption";
                if (h) {
                    var e = b.g(d, "t"),
                        g = p[b.Lb(e)] || p[e],
                        f = {
                            N: d,
                            ec: g
                        };
                    a.push(f)
                }
                if (c < 5) a = a.concat(s(d, c + 1))
            });
            return a
        }

        function l(c, d, e) {
            var a = 0;
            !b.c(c, function(b, c) {
                a = c;
                return b.J > e
            }) && a++;
            c.splice(a, 0, d)
        }

        function z(k, n, e) {
            var a;
            if (r) {
                var i = b.g(k, "c");
                if (i) {
                    var g = r[b.Lb(i)];
                    if (g) {
                        a = {
                            J: g.r,
                            bb: 0,
                            Db: [],
                            Zb: [],
                            Cc: 0
                        };
                        l(h, a, g.b)
                    }
                }
            }
            b.c(n, function(g) {
                var f = b.K(d, {}, q(g)),
                    i = b.ed(f.X);
                delete f.X;
                if (f.j) {
                    f.u = f.j;
                    i.u = i.j;
                    delete f.j
                }
                if (f.i) {
                    f.q = f.i;
                    i.q = i.i;
                    delete f.i
                }
                var p = {
                        X: i,
                        T: e.ob,
                        eb: e.sb
                    },
                    n = new m(g.b, g.d, p, k, e, f),
                    h = t[g.b];
                if (h == j) {
                    h = {
                        J: g.b,
                        Db: []
                    };
                    t[g.b] = h;
                    l(o, h, g.b)
                }
                h.Db.push(n);
                if (a && g.b + g.d > a.J) {
                    a.bb = c.max(a.bb, g.b + g.d);
                    a.Zb.push(n)
                }
                e = b.le(e, f)
            });
            if (a && a.Zb.length) {
                var f = new m(a.J, a.bb - a.J, {
                    pc: a.bb - a.J,
                    Qf: d
                });
                b.c(a.Zb, function(a) {
                    f.Y(a, d)
                });
                f.jb(a.bb - a.J);
                a.Db = [f]
            }
            return e
        }

        function y(a) {
            b.c(a, function(d) {
                var a = d.N,
                    f = b.l(a),
                    e = b.m(a),
                    c = {
                        j: b.B(a),
                        i: b.A(a),
                        u: 0,
                        q: 0,
                        pb: 1,
                        kb: b.n(a) || 0,
                        db: 0,
                        V: 0,
                        Z: 0,
                        v: 1,
                        p: 1,
                        cb: 0,
                        gb: 0,
                        W: 0,
                        Ub: 0,
                        Qb: 0,
                        ob: f,
                        sb: e,
                        f: {
                            i: 0,
                            E: f,
                            D: e,
                            j: 0
                        }
                    };
                c.Uc = c.j;
                c.Tc = c.i;
                z(a, d.ec, c)
            })
        }

        function B(g, f, h) {
            var c = g.b - f;
            if (c) {
                var b = new m(f, c);
                b.Y(e, d);
                b.jb(h);
                a.Y(b)
            }
            a.tg(g.d);
            return c
        }

        function A(f) {
            var c = e.sc(),
                d = 0;
            b.c(f, function(e, f) {
                e = b.K({
                    d: u
                }, e);
                B(e, c, d);
                c = e.b;
                d += e.d;
                if (!f || e.t == 2) {
                    a.ad = c;
                    a.bd = c + e.d
                }
                b.c(h, function(a) {
                    if (a.bb > e.b) a.Cc += e.d
                })
            })
        }

        function i(j, e, a) {
            var f = e.length;
            if (f > 4)
                for (var k = c.ceil(f / 4), d = 0; d < k; d++) {
                    var g = e.slice(d * 4, c.min(d * 4 + 4, f)),
                        h = new m(g[0].J, a || 0);
                    i(h, g, a);
                    j.Y(h, a)
                } else b.c(e, function(c) {
                    b.c(c.Db, function(b) {
                        b.jb(c.Cc || 0);
                        j.Y(b, a)
                    })
                })
        }
        a.Gc = function() {
            a.C(-1, d)
        };
        w = [f.Ld, f.Id, f.Hd, f.Fd, f.Ed, f.Kd, f.Sd, f.he, f.ge, f.je, f.be, f.Zd, f.sd, f.Xd, f.Vd, f.Ud, f.Td, f.Qd, f.ke, f.ae, f.Wd, f.Yd, f.ce, f.Rd, f.Cd, f.Od, f.Ke, f.df, f.ff, f.cg, f.bg, f.Zf, f.ef, f.Xf, f.Wf, f.Vf, f.Sf];
        var C = {
            i: "y",
            j: "x",
            D: "m",
            E: "t",
            db: "r",
            V: "rX",
            Z: "rY",
            v: "sX",
            p: "sY",
            cb: "tX",
            gb: "tY",
            W: "tZ",
            Ub: "kX",
            Qb: "kY",
            pb: "o",
            X: "e",
            kb: "i",
            f: "c"
        };
        b.c(C, function(b, a) {
            n[b] = a
        });
        y(s(v, 1));
        i(e, o);
        var x = g.Ig || [],
            k = [].concat(x[b.Lb(b.g(v, "b"))] || []);
        !k.length && k.push({
            b: e.nb(),
            d: u
        });
        A(k);
        i(a, h, a.nb());
        a.C(-1)
    };
    jssor_1_slider_init = function() {
        var h = [
                [{
                    b: -1,
                    d: 1,
                    o: -1
                }, {
                    b: 0,
                    d: 1e3,
                    o: 1
                }],
                [{
                    b: 1900,
                    d: 2e3,
                    x: -379,
                    e: {
                        x: 7
                    }
                }],
                [{
                    b: 1900,
                    d: 2e3,
                    x: -379,
                    e: {
                        x: 7
                    }
                }],
                [{
                    b: -1,
                    d: 1,
                    o: -1,
                    r: 288,
                    sX: 9,
                    sY: 9
                }, {
                    b: 1e3,
                    d: 900,
                    x: -1400,
                    y: -660,
                    o: 1,
                    r: -288,
                    sX: -9,
                    sY: -9,
                    e: {
                        r: 6
                    }
                }, {
                    b: 1900,
                    d: 1600,
                    x: -200,
                    o: -1,
                    e: {
                        x: 16
                    }
                }]
            ],
            j = {
                Xb: d,
                Eb: 800,
                Ec: f.sd,
                pg: {
                    G: t,
                    Bb: h
                },
                vg: {
                    G: s
                },
                ug: {
                    G: r
                }
            },
            e = new i("jssor_1", j);

        function a() {
            var b = e.N.parentNode.clientWidth;
            if (b) {
                b = c.min(b, 1920);
                e.of(b)
            } else g.setTimeout(a, 30)
        }
        a();
        b.a(g, "load", a);
        b.a(g, "resize", a);
        b.a(g, "orientationchange", a)
    }
})(window, document, Math, null, true, false)
