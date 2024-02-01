"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/knockout/build/output/knockout-latest.js
var require_knockout_latest = __commonJS({
  "node_modules/knockout/build/output/knockout-latest.js"(exports, module2) {
    (function() {
      (function(n) {
        var A = this || (0, eval)("this"), w = A.document, R = A.navigator, v = A.jQuery, H = A.JSON;
        v || "undefined" === typeof jQuery || (v = jQuery);
        (function(n2) {
          "function" === typeof define && define.amd ? define(["exports", "require"], n2) : "object" === typeof exports && "object" === typeof module2 ? n2(module2.exports || exports) : n2(A.ko = {});
        })(function(S, T) {
          function K(a2, c) {
            return null === a2 || typeof a2 in W ? a2 === c : false;
          }
          function X(b, c) {
            var d;
            return function() {
              d || (d = a.a.setTimeout(function() {
                d = n;
                b();
              }, c));
            };
          }
          function Y(b, c) {
            var d;
            return function() {
              clearTimeout(d);
              d = a.a.setTimeout(b, c);
            };
          }
          function Z(a2, c) {
            c && "change" !== c ? "beforeChange" === c ? this.pc(a2) : this.gb(a2, c) : this.qc(a2);
          }
          function aa(a2, c) {
            null !== c && c.s && c.s();
          }
          function ba(a2, c) {
            var d = this.qd, e = d[r];
            e.ra || (this.Qb && this.mb[c] ? (d.uc(c, a2, this.mb[c]), this.mb[c] = null, --this.Qb) : e.I[c] || d.uc(c, a2, e.J ? { da: a2 } : d.$c(a2)), a2.Ja && a2.gd());
          }
          var a = "undefined" !== typeof S ? S : {};
          a.b = function(b, c) {
            for (var d = b.split("."), e = a, f = 0; f < d.length - 1; f++)
              e = e[d[f]];
            e[d[d.length - 1]] = c;
          };
          a.L = function(a2, c, d) {
            a2[c] = d;
          };
          a.version = "3.5.1";
          a.b(
            "version",
            a.version
          );
          a.options = { deferUpdates: false, useOnlyNativeEvents: false, foreachHidesDestroyed: false };
          a.a = function() {
            function b(a2, b2) {
              for (var c2 in a2)
                f.call(a2, c2) && b2(c2, a2[c2]);
            }
            function c(a2, b2) {
              if (b2)
                for (var c2 in b2)
                  f.call(b2, c2) && (a2[c2] = b2[c2]);
              return a2;
            }
            function d(a2, b2) {
              a2.__proto__ = b2;
              return a2;
            }
            function e(b2, c2, d2, e2) {
              var l3 = b2[c2].match(q) || [];
              a.a.D(d2.match(q), function(b3) {
                a.a.Na(l3, b3, e2);
              });
              b2[c2] = l3.join(" ");
            }
            var f = Object.prototype.hasOwnProperty, g = { __proto__: [] } instanceof Array, h = "function" === typeof Symbol, m = {}, k = {};
            m[R && /Firefox\/2/i.test(R.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"];
            m.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
            b(m, function(a2, b2) {
              if (b2.length)
                for (var c2 = 0, d2 = b2.length; c2 < d2; c2++)
                  k[b2[c2]] = a2;
            });
            var l2 = { propertychange: true }, p = w && function() {
              for (var a2 = 3, b2 = w.createElement("div"), c2 = b2.getElementsByTagName("i"); b2.innerHTML = "<!--[if gt IE " + ++a2 + "]><i></i><![endif]-->", c2[0]; )
                ;
              return 4 < a2 ? a2 : n;
            }(), q = /\S+/g, t;
            return {
              Jc: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
              D: function(a2, b2, c2) {
                for (var d2 = 0, e2 = a2.length; d2 < e2; d2++)
                  b2.call(c2, a2[d2], d2, a2);
              },
              A: "function" == typeof Array.prototype.indexOf ? function(a2, b2) {
                return Array.prototype.indexOf.call(a2, b2);
              } : function(a2, b2) {
                for (var c2 = 0, d2 = a2.length; c2 < d2; c2++)
                  if (a2[c2] === b2)
                    return c2;
                return -1;
              },
              Lb: function(a2, b2, c2) {
                for (var d2 = 0, e2 = a2.length; d2 < e2; d2++)
                  if (b2.call(c2, a2[d2], d2, a2))
                    return a2[d2];
                return n;
              },
              Pa: function(b2, c2) {
                var d2 = a.a.A(b2, c2);
                0 < d2 ? b2.splice(d2, 1) : 0 === d2 && b2.shift();
              },
              wc: function(b2) {
                var c2 = [];
                b2 && a.a.D(b2, function(b3) {
                  0 > a.a.A(c2, b3) && c2.push(b3);
                });
                return c2;
              },
              Mb: function(a2, b2, c2) {
                var d2 = [];
                if (a2)
                  for (var e2 = 0, l3 = a2.length; e2 < l3; e2++)
                    d2.push(b2.call(c2, a2[e2], e2));
                return d2;
              },
              jb: function(a2, b2, c2) {
                var d2 = [];
                if (a2)
                  for (var e2 = 0, l3 = a2.length; e2 < l3; e2++)
                    b2.call(c2, a2[e2], e2) && d2.push(a2[e2]);
                return d2;
              },
              Nb: function(a2, b2) {
                if (b2 instanceof Array)
                  a2.push.apply(a2, b2);
                else
                  for (var c2 = 0, d2 = b2.length; c2 < d2; c2++)
                    a2.push(b2[c2]);
                return a2;
              },
              Na: function(b2, c2, d2) {
                var e2 = a.a.A(a.a.bc(b2), c2);
                0 > e2 ? d2 && b2.push(c2) : d2 || b2.splice(e2, 1);
              },
              Ba: g,
              extend: c,
              setPrototypeOf: d,
              Ab: g ? d : c,
              P: b,
              Ga: function(a2, b2, c2) {
                if (!a2)
                  return a2;
                var d2 = {}, e2;
                for (e2 in a2)
                  f.call(a2, e2) && (d2[e2] = b2.call(c2, a2[e2], e2, a2));
                return d2;
              },
              Tb: function(b2) {
                for (; b2.firstChild; )
                  a.removeNode(b2.firstChild);
              },
              Yb: function(b2) {
                b2 = a.a.la(b2);
                for (var c2 = (b2[0] && b2[0].ownerDocument || w).createElement("div"), d2 = 0, e2 = b2.length; d2 < e2; d2++)
                  c2.appendChild(a.oa(b2[d2]));
                return c2;
              },
              Ca: function(b2, c2) {
                for (var d2 = 0, e2 = b2.length, l3 = []; d2 < e2; d2++) {
                  var k2 = b2[d2].cloneNode(true);
                  l3.push(c2 ? a.oa(k2) : k2);
                }
                return l3;
              },
              va: function(b2, c2) {
                a.a.Tb(b2);
                if (c2)
                  for (var d2 = 0, e2 = c2.length; d2 < e2; d2++)
                    b2.appendChild(c2[d2]);
              },
              Xc: function(b2, c2) {
                var d2 = b2.nodeType ? [b2] : b2;
                if (0 < d2.length) {
                  for (var e2 = d2[0], l3 = e2.parentNode, k2 = 0, f2 = c2.length; k2 < f2; k2++)
                    l3.insertBefore(c2[k2], e2);
                  k2 = 0;
                  for (f2 = d2.length; k2 < f2; k2++)
                    a.removeNode(d2[k2]);
                }
              },
              Ua: function(a2, b2) {
                if (a2.length) {
                  for (b2 = 8 === b2.nodeType && b2.parentNode || b2; a2.length && a2[0].parentNode !== b2; )
                    a2.splice(0, 1);
                  for (; 1 < a2.length && a2[a2.length - 1].parentNode !== b2; )
                    a2.length--;
                  if (1 < a2.length) {
                    var c2 = a2[0], d2 = a2[a2.length - 1];
                    for (a2.length = 0; c2 !== d2; )
                      a2.push(c2), c2 = c2.nextSibling;
                    a2.push(d2);
                  }
                }
                return a2;
              },
              Zc: function(a2, b2) {
                7 > p ? a2.setAttribute("selected", b2) : a2.selected = b2;
              },
              Db: function(a2) {
                return null === a2 || a2 === n ? "" : a2.trim ? a2.trim() : a2.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
              },
              Ud: function(a2, b2) {
                a2 = a2 || "";
                return b2.length > a2.length ? false : a2.substring(0, b2.length) === b2;
              },
              vd: function(a2, b2) {
                if (a2 === b2)
                  return true;
                if (11 === a2.nodeType)
                  return false;
                if (b2.contains)
                  return b2.contains(1 !== a2.nodeType ? a2.parentNode : a2);
                if (b2.compareDocumentPosition)
                  return 16 == (b2.compareDocumentPosition(a2) & 16);
                for (; a2 && a2 != b2; )
                  a2 = a2.parentNode;
                return !!a2;
              },
              Sb: function(b2) {
                return a.a.vd(b2, b2.ownerDocument.documentElement);
              },
              kd: function(b2) {
                return !!a.a.Lb(b2, a.a.Sb);
              },
              R: function(a2) {
                return a2 && a2.tagName && a2.tagName.toLowerCase();
              },
              Ac: function(b2) {
                return a.onError ? function() {
                  try {
                    return b2.apply(this, arguments);
                  } catch (c2) {
                    throw a.onError && a.onError(c2), c2;
                  }
                } : b2;
              },
              setTimeout: function(b2, c2) {
                return setTimeout(a.a.Ac(b2), c2);
              },
              Gc: function(b2) {
                setTimeout(function() {
                  a.onError && a.onError(b2);
                  throw b2;
                }, 0);
              },
              B: function(b2, c2, d2) {
                var e2 = a.a.Ac(d2);
                d2 = l2[c2];
                if (a.options.useOnlyNativeEvents || d2 || !v)
                  if (d2 || "function" != typeof b2.addEventListener)
                    if ("undefined" != typeof b2.attachEvent) {
                      var k2 = function(a2) {
                        e2.call(b2, a2);
                      }, f2 = "on" + c2;
                      b2.attachEvent(
                        f2,
                        k2
                      );
                      a.a.K.za(b2, function() {
                        b2.detachEvent(f2, k2);
                      });
                    } else
                      throw Error("Browser doesn't support addEventListener or attachEvent");
                  else
                    b2.addEventListener(c2, e2, false);
                else
                  t || (t = "function" == typeof v(b2).on ? "on" : "bind"), v(b2)[t](c2, e2);
              },
              Fb: function(b2, c2) {
                if (!b2 || !b2.nodeType)
                  throw Error("element must be a DOM node when calling triggerEvent");
                var d2;
                "input" === a.a.R(b2) && b2.type && "click" == c2.toLowerCase() ? (d2 = b2.type, d2 = "checkbox" == d2 || "radio" == d2) : d2 = false;
                if (a.options.useOnlyNativeEvents || !v || d2)
                  if ("function" == typeof w.createEvent)
                    if ("function" == typeof b2.dispatchEvent)
                      d2 = w.createEvent(k[c2] || "HTMLEvents"), d2.initEvent(c2, true, true, A, 0, 0, 0, 0, 0, false, false, false, false, 0, b2), b2.dispatchEvent(d2);
                    else
                      throw Error("The supplied element doesn't support dispatchEvent");
                  else if (d2 && b2.click)
                    b2.click();
                  else if ("undefined" != typeof b2.fireEvent)
                    b2.fireEvent("on" + c2);
                  else
                    throw Error("Browser doesn't support triggering events");
                else
                  v(b2).trigger(c2);
              },
              f: function(b2) {
                return a.O(b2) ? b2() : b2;
              },
              bc: function(b2) {
                return a.O(b2) ? b2.v() : b2;
              },
              Eb: function(b2, c2, d2) {
                var l3;
                c2 && ("object" === typeof b2.classList ? (l3 = b2.classList[d2 ? "add" : "remove"], a.a.D(c2.match(q), function(a2) {
                  l3.call(b2.classList, a2);
                })) : "string" === typeof b2.className.baseVal ? e(b2.className, "baseVal", c2, d2) : e(b2, "className", c2, d2));
              },
              Bb: function(b2, c2) {
                var d2 = a.a.f(c2);
                if (null === d2 || d2 === n)
                  d2 = "";
                var e2 = a.h.firstChild(b2);
                !e2 || 3 != e2.nodeType || a.h.nextSibling(e2) ? a.h.va(b2, [b2.ownerDocument.createTextNode(d2)]) : e2.data = d2;
                a.a.Ad(b2);
              },
              Yc: function(a2, b2) {
                a2.name = b2;
                if (7 >= p)
                  try {
                    var c2 = a2.name.replace(/[&<>'"]/g, function(a3) {
                      return "&#" + a3.charCodeAt(0) + ";";
                    });
                    a2.mergeAttributes(w.createElement("<input name='" + c2 + "'/>"), false);
                  } catch (d2) {
                  }
              },
              Ad: function(a2) {
                9 <= p && (a2 = 1 == a2.nodeType ? a2 : a2.parentNode, a2.style && (a2.style.zoom = a2.style.zoom));
              },
              wd: function(a2) {
                if (p) {
                  var b2 = a2.style.width;
                  a2.style.width = 0;
                  a2.style.width = b2;
                }
              },
              Pd: function(b2, c2) {
                b2 = a.a.f(b2);
                c2 = a.a.f(c2);
                for (var d2 = [], e2 = b2; e2 <= c2; e2++)
                  d2.push(e2);
                return d2;
              },
              la: function(a2) {
                for (var b2 = [], c2 = 0, d2 = a2.length; c2 < d2; c2++)
                  b2.push(a2[c2]);
                return b2;
              },
              Da: function(a2) {
                return h ? Symbol(a2) : a2;
              },
              Zd: 6 === p,
              $d: 7 === p,
              W: p,
              Lc: function(b2, c2) {
                for (var d2 = a.a.la(b2.getElementsByTagName("input")).concat(a.a.la(b2.getElementsByTagName("textarea"))), e2 = "string" == typeof c2 ? function(a2) {
                  return a2.name === c2;
                } : function(a2) {
                  return c2.test(a2.name);
                }, l3 = [], k2 = d2.length - 1; 0 <= k2; k2--)
                  e2(d2[k2]) && l3.push(d2[k2]);
                return l3;
              },
              Nd: function(b2) {
                return "string" == typeof b2 && (b2 = a.a.Db(b2)) ? H && H.parse ? H.parse(b2) : new Function("return " + b2)() : null;
              },
              hc: function(b2, c2, d2) {
                if (!H || !H.stringify)
                  throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
                return H.stringify(a.a.f(b2), c2, d2);
              },
              Od: function(c2, d2, e2) {
                e2 = e2 || {};
                var l3 = e2.params || {}, k2 = e2.includeFields || this.Jc, f2 = c2;
                if ("object" == typeof c2 && "form" === a.a.R(c2))
                  for (var f2 = c2.action, h2 = k2.length - 1; 0 <= h2; h2--)
                    for (var g2 = a.a.Lc(c2, k2[h2]), m2 = g2.length - 1; 0 <= m2; m2--)
                      l3[g2[m2].name] = g2[m2].value;
                d2 = a.a.f(d2);
                var p2 = w.createElement("form");
                p2.style.display = "none";
                p2.action = f2;
                p2.method = "post";
                for (var q2 in d2)
                  c2 = w.createElement("input"), c2.type = "hidden", c2.name = q2, c2.value = a.a.hc(a.a.f(d2[q2])), p2.appendChild(c2);
                b(l3, function(a2, b2) {
                  var c3 = w.createElement("input");
                  c3.type = "hidden";
                  c3.name = a2;
                  c3.value = b2;
                  p2.appendChild(c3);
                });
                w.body.appendChild(p2);
                e2.submitter ? e2.submitter(p2) : p2.submit();
                setTimeout(function() {
                  p2.parentNode.removeChild(p2);
                }, 0);
              }
            };
          }();
          a.b("utils", a.a);
          a.b("utils.arrayForEach", a.a.D);
          a.b("utils.arrayFirst", a.a.Lb);
          a.b("utils.arrayFilter", a.a.jb);
          a.b("utils.arrayGetDistinctValues", a.a.wc);
          a.b("utils.arrayIndexOf", a.a.A);
          a.b("utils.arrayMap", a.a.Mb);
          a.b("utils.arrayPushAll", a.a.Nb);
          a.b("utils.arrayRemoveItem", a.a.Pa);
          a.b("utils.cloneNodes", a.a.Ca);
          a.b(
            "utils.createSymbolOrString",
            a.a.Da
          );
          a.b("utils.extend", a.a.extend);
          a.b("utils.fieldsIncludedWithJsonPost", a.a.Jc);
          a.b("utils.getFormFields", a.a.Lc);
          a.b("utils.objectMap", a.a.Ga);
          a.b("utils.peekObservable", a.a.bc);
          a.b("utils.postJson", a.a.Od);
          a.b("utils.parseJson", a.a.Nd);
          a.b("utils.registerEventHandler", a.a.B);
          a.b("utils.stringifyJson", a.a.hc);
          a.b("utils.range", a.a.Pd);
          a.b("utils.toggleDomNodeCssClass", a.a.Eb);
          a.b("utils.triggerEvent", a.a.Fb);
          a.b("utils.unwrapObservable", a.a.f);
          a.b("utils.objectForEach", a.a.P);
          a.b(
            "utils.addOrRemoveItem",
            a.a.Na
          );
          a.b("utils.setTextContent", a.a.Bb);
          a.b("unwrap", a.a.f);
          Function.prototype.bind || (Function.prototype.bind = function(a2) {
            var c = this;
            if (1 === arguments.length)
              return function() {
                return c.apply(a2, arguments);
              };
            var d = Array.prototype.slice.call(arguments, 1);
            return function() {
              var e = d.slice(0);
              e.push.apply(e, arguments);
              return c.apply(a2, e);
            };
          });
          a.a.g = new function() {
            var b = 0, c = "__ko__" + (/* @__PURE__ */ new Date()).getTime(), d = {}, e, f;
            a.a.W ? (e = function(a2, e2) {
              var f2 = a2[c];
              if (!f2 || "null" === f2 || !d[f2]) {
                if (!e2)
                  return n;
                f2 = a2[c] = "ko" + b++;
                d[f2] = {};
              }
              return d[f2];
            }, f = function(a2) {
              var b2 = a2[c];
              return b2 ? (delete d[b2], a2[c] = null, true) : false;
            }) : (e = function(a2, b2) {
              var d2 = a2[c];
              !d2 && b2 && (d2 = a2[c] = {});
              return d2;
            }, f = function(a2) {
              return a2[c] ? (delete a2[c], true) : false;
            });
            return { get: function(a2, b2) {
              var c2 = e(a2, false);
              return c2 && c2[b2];
            }, set: function(a2, b2, c2) {
              (a2 = e(a2, c2 !== n)) && (a2[b2] = c2);
            }, Ub: function(a2, b2, c2) {
              a2 = e(a2, true);
              return a2[b2] || (a2[b2] = c2);
            }, clear: f, Z: function() {
              return b++ + c;
            } };
          }();
          a.b("utils.domData", a.a.g);
          a.b("utils.domData.clear", a.a.g.clear);
          a.a.K = new function() {
            function b(b2, c2) {
              var d2 = a.a.g.get(b2, e);
              d2 === n && c2 && (d2 = [], a.a.g.set(b2, e, d2));
              return d2;
            }
            function c(c2) {
              var e2 = b(c2, false);
              if (e2)
                for (var e2 = e2.slice(0), k = 0; k < e2.length; k++)
                  e2[k](c2);
              a.a.g.clear(c2);
              a.a.K.cleanExternalData(c2);
              g[c2.nodeType] && d(c2.childNodes, true);
            }
            function d(b2, d2) {
              for (var e2 = [], l2, f2 = 0; f2 < b2.length; f2++)
                if (!d2 || 8 === b2[f2].nodeType) {
                  if (c(e2[e2.length] = l2 = b2[f2]), b2[f2] !== l2)
                    for (; f2-- && -1 == a.a.A(e2, b2[f2]); )
                      ;
                }
            }
            var e = a.a.g.Z(), f = { 1: true, 8: true, 9: true }, g = { 1: true, 9: true };
            return { za: function(a2, c2) {
              if ("function" != typeof c2)
                throw Error("Callback must be a function");
              b(a2, true).push(c2);
            }, yb: function(c2, d2) {
              var f2 = b(c2, false);
              f2 && (a.a.Pa(f2, d2), 0 == f2.length && a.a.g.set(c2, e, n));
            }, oa: function(b2) {
              a.u.G(function() {
                f[b2.nodeType] && (c(b2), g[b2.nodeType] && d(b2.getElementsByTagName("*")));
              });
              return b2;
            }, removeNode: function(b2) {
              a.oa(b2);
              b2.parentNode && b2.parentNode.removeChild(b2);
            }, cleanExternalData: function(a2) {
              v && "function" == typeof v.cleanData && v.cleanData([a2]);
            } };
          }();
          a.oa = a.a.K.oa;
          a.removeNode = a.a.K.removeNode;
          a.b("cleanNode", a.oa);
          a.b("removeNode", a.removeNode);
          a.b("utils.domNodeDisposal", a.a.K);
          a.b(
            "utils.domNodeDisposal.addDisposeCallback",
            a.a.K.za
          );
          a.b("utils.domNodeDisposal.removeDisposeCallback", a.a.K.yb);
          (function() {
            var b = [0, "", ""], c = [1, "<table>", "</table>"], d = [3, "<table><tbody><tr>", "</tr></tbody></table>"], e = [1, "<select multiple='multiple'>", "</select>"], f = { thead: c, tbody: c, tfoot: c, tr: [2, "<table><tbody>", "</tbody></table>"], td: d, th: d, option: e, optgroup: e }, g = 8 >= a.a.W;
            a.a.ua = function(c2, d2) {
              var e2;
              if (v)
                if (v.parseHTML)
                  e2 = v.parseHTML(c2, d2) || [];
                else {
                  if ((e2 = v.clean([c2], d2)) && e2[0]) {
                    for (var l2 = e2[0]; l2.parentNode && 11 !== l2.parentNode.nodeType; )
                      l2 = l2.parentNode;
                    l2.parentNode && l2.parentNode.removeChild(l2);
                  }
                }
              else {
                (e2 = d2) || (e2 = w);
                var l2 = e2.parentWindow || e2.defaultView || A, p = a.a.Db(c2).toLowerCase(), q = e2.createElement("div"), t;
                t = (p = p.match(/^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/)) && f[p[1]] || b;
                p = t[0];
                t = "ignored<div>" + t[1] + c2 + t[2] + "</div>";
                "function" == typeof l2.innerShiv ? q.appendChild(l2.innerShiv(t)) : (g && e2.body.appendChild(q), q.innerHTML = t, g && q.parentNode.removeChild(q));
                for (; p--; )
                  q = q.lastChild;
                e2 = a.a.la(q.lastChild.childNodes);
              }
              return e2;
            };
            a.a.Md = function(b2, c2) {
              var d2 = a.a.ua(
                b2,
                c2
              );
              return d2.length && d2[0].parentElement || a.a.Yb(d2);
            };
            a.a.fc = function(b2, c2) {
              a.a.Tb(b2);
              c2 = a.a.f(c2);
              if (null !== c2 && c2 !== n)
                if ("string" != typeof c2 && (c2 = c2.toString()), v)
                  v(b2).html(c2);
                else
                  for (var d2 = a.a.ua(c2, b2.ownerDocument), e2 = 0; e2 < d2.length; e2++)
                    b2.appendChild(d2[e2]);
            };
          })();
          a.b("utils.parseHtmlFragment", a.a.ua);
          a.b("utils.setHtml", a.a.fc);
          a.aa = function() {
            function b(c2, e) {
              if (c2) {
                if (8 == c2.nodeType) {
                  var f = a.aa.Uc(c2.nodeValue);
                  null != f && e.push({ ud: c2, Kd: f });
                } else if (1 == c2.nodeType)
                  for (var f = 0, g = c2.childNodes, h = g.length; f < h; f++)
                    b(
                      g[f],
                      e
                    );
              }
            }
            var c = {};
            return { Xb: function(a2) {
              if ("function" != typeof a2)
                throw Error("You can only pass a function to ko.memoization.memoize()");
              var b2 = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
              c[b2] = a2;
              return "<!--[ko_memo:" + b2 + "]-->";
            }, bd: function(a2, b2) {
              var f = c[a2];
              if (f === n)
                throw Error("Couldn't find any memo with ID " + a2 + ". Perhaps it's already been unmemoized.");
              try {
                return f.apply(null, b2 || []), true;
              } finally {
                delete c[a2];
              }
            }, cd: function(c2, e) {
              var f = [];
              b(c2, f);
              for (var g = 0, h = f.length; g < h; g++) {
                var m = f[g].ud, k = [m];
                e && a.a.Nb(k, e);
                a.aa.bd(f[g].Kd, k);
                m.nodeValue = "";
                m.parentNode && m.parentNode.removeChild(m);
              }
            }, Uc: function(a2) {
              return (a2 = a2.match(/^\[ko_memo\:(.*?)\]$/)) ? a2[1] : null;
            } };
          }();
          a.b("memoization", a.aa);
          a.b("memoization.memoize", a.aa.Xb);
          a.b("memoization.unmemoize", a.aa.bd);
          a.b("memoization.parseMemoText", a.aa.Uc);
          a.b("memoization.unmemoizeDomNodeAndDescendants", a.aa.cd);
          a.na = function() {
            function b() {
              if (f) {
                for (var b2 = f, c2 = 0, d2; h < f; )
                  if (d2 = e[h++]) {
                    if (h > b2) {
                      if (5e3 <= ++c2) {
                        h = f;
                        a.a.Gc(Error("'Too much recursion' after processing " + c2 + " task groups."));
                        break;
                      }
                      b2 = f;
                    }
                    try {
                      d2();
                    } catch (p) {
                      a.a.Gc(p);
                    }
                  }
              }
            }
            function c() {
              b();
              h = f = e.length = 0;
            }
            var d, e = [], f = 0, g = 1, h = 0;
            A.MutationObserver ? d = function(a2) {
              var b2 = w.createElement("div");
              new MutationObserver(a2).observe(b2, { attributes: true });
              return function() {
                b2.classList.toggle("foo");
              };
            }(c) : d = w && "onreadystatechange" in w.createElement("script") ? function(a2) {
              var b2 = w.createElement("script");
              b2.onreadystatechange = function() {
                b2.onreadystatechange = null;
                w.documentElement.removeChild(b2);
                b2 = null;
                a2();
              };
              w.documentElement.appendChild(b2);
            } : function(a2) {
              setTimeout(a2, 0);
            };
            return { scheduler: d, zb: function(b2) {
              f || a.na.scheduler(c);
              e[f++] = b2;
              return g++;
            }, cancel: function(a2) {
              a2 = a2 - (g - f);
              a2 >= h && a2 < f && (e[a2] = null);
            }, resetForTesting: function() {
              var a2 = f - h;
              h = f = e.length = 0;
              return a2;
            }, Sd: b };
          }();
          a.b("tasks", a.na);
          a.b("tasks.schedule", a.na.zb);
          a.b("tasks.runEarly", a.na.Sd);
          a.Ta = { throttle: function(b, c) {
            b.throttleEvaluation = c;
            var d = null;
            return a.$({ read: b, write: function(e) {
              clearTimeout(d);
              d = a.a.setTimeout(
                function() {
                  b(e);
                },
                c
              );
            } });
          }, rateLimit: function(a2, c) {
            var d, e, f;
            "number" == typeof c ? d = c : (d = c.timeout, e = c.method);
            a2.Hb = false;
            f = "function" == typeof e ? e : "notifyWhenChangesStop" == e ? Y : X;
            a2.ub(function(a3) {
              return f(a3, d, c);
            });
          }, deferred: function(b, c) {
            if (true !== c)
              throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");
            b.Hb || (b.Hb = true, b.ub(function(c2) {
              var e, f = false;
              return function() {
                if (!f) {
                  a.na.cancel(e);
                  e = a.na.zb(c2);
                  try {
                    f = true, b.notifySubscribers(n, "dirty");
                  } finally {
                    f = false;
                  }
                }
              };
            }));
          }, notify: function(a2, c) {
            a2.equalityComparer = "always" == c ? null : K;
          } };
          var W = { undefined: 1, "boolean": 1, number: 1, string: 1 };
          a.b("extenders", a.Ta);
          a.ic = function(b, c, d) {
            this.da = b;
            this.lc = c;
            this.mc = d;
            this.Ib = false;
            this.fb = this.Jb = null;
            a.L(this, "dispose", this.s);
            a.L(this, "disposeWhenNodeIsRemoved", this.l);
          };
          a.ic.prototype.s = function() {
            this.Ib || (this.fb && a.a.K.yb(this.Jb, this.fb), this.Ib = true, this.mc(), this.da = this.lc = this.mc = this.Jb = this.fb = null);
          };
          a.ic.prototype.l = function(b) {
            this.Jb = b;
            a.a.K.za(b, this.fb = this.s.bind(this));
          };
          a.T = function() {
            a.a.Ab(this, D);
            D.qb(this);
          };
          var D = {
            qb: function(a2) {
              a2.U = { change: [] };
              a2.sc = 1;
            },
            subscribe: function(b, c, d) {
              var e = this;
              d = d || "change";
              var f = new a.ic(e, c ? b.bind(c) : b, function() {
                a.a.Pa(e.U[d], f);
                e.hb && e.hb(d);
              });
              e.Qa && e.Qa(d);
              e.U[d] || (e.U[d] = []);
              e.U[d].push(f);
              return f;
            },
            notifySubscribers: function(b, c) {
              c = c || "change";
              "change" === c && this.Gb();
              if (this.Wa(c)) {
                var d = "change" === c && this.ed || this.U[c].slice(0);
                try {
                  a.u.xc();
                  for (var e = 0, f; f = d[e]; ++e)
                    f.Ib || f.lc(b);
                } finally {
                  a.u.end();
                }
              }
            },
            ob: function() {
              return this.sc;
            },
            Dd: function(a2) {
              return this.ob() !== a2;
            },
            Gb: function() {
              ++this.sc;
            },
            ub: function(b) {
              var c = this, d = a.O(c), e, f, g, h, m;
              c.gb || (c.gb = c.notifySubscribers, c.notifySubscribers = Z);
              var k = b(function() {
                c.Ja = false;
                d && h === c && (h = c.nc ? c.nc() : c());
                var a2 = f || m && c.sb(g, h);
                m = f = e = false;
                a2 && c.gb(g = h);
              });
              c.qc = function(a2, b2) {
                b2 && c.Ja || (m = !b2);
                c.ed = c.U.change.slice(0);
                c.Ja = e = true;
                h = a2;
                k();
              };
              c.pc = function(a2) {
                e || (g = a2, c.gb(a2, "beforeChange"));
              };
              c.rc = function() {
                m = true;
              };
              c.gd = function() {
                c.sb(g, c.v(true)) && (f = true);
              };
            },
            Wa: function(a2) {
              return this.U[a2] && this.U[a2].length;
            },
            Bd: function(b) {
              if (b)
                return this.U[b] && this.U[b].length || 0;
              var c = 0;
              a.a.P(this.U, function(a2, b2) {
                "dirty" !== a2 && (c += b2.length);
              });
              return c;
            },
            sb: function(a2, c) {
              return !this.equalityComparer || !this.equalityComparer(a2, c);
            },
            toString: function() {
              return "[object Object]";
            },
            extend: function(b) {
              var c = this;
              b && a.a.P(b, function(b2, e) {
                var f = a.Ta[b2];
                "function" == typeof f && (c = f(c, e) || c);
              });
              return c;
            }
          };
          a.L(D, "init", D.qb);
          a.L(D, "subscribe", D.subscribe);
          a.L(D, "extend", D.extend);
          a.L(D, "getSubscriptionsCount", D.Bd);
          a.a.Ba && a.a.setPrototypeOf(
            D,
            Function.prototype
          );
          a.T.fn = D;
          a.Qc = function(a2) {
            return null != a2 && "function" == typeof a2.subscribe && "function" == typeof a2.notifySubscribers;
          };
          a.b("subscribable", a.T);
          a.b("isSubscribable", a.Qc);
          a.S = a.u = function() {
            function b(a2) {
              d.push(e);
              e = a2;
            }
            function c() {
              e = d.pop();
            }
            var d = [], e, f = 0;
            return {
              xc: b,
              end: c,
              cc: function(b2) {
                if (e) {
                  if (!a.Qc(b2))
                    throw Error("Only subscribable things can act as dependencies");
                  e.od.call(e.pd, b2, b2.fd || (b2.fd = ++f));
                }
              },
              G: function(a2, d2, e2) {
                try {
                  return b(), a2.apply(d2, e2 || []);
                } finally {
                  c();
                }
              },
              qa: function() {
                if (e)
                  return e.o.qa();
              },
              Va: function() {
                if (e)
                  return e.o.Va();
              },
              Ya: function() {
                if (e)
                  return e.Ya;
              },
              o: function() {
                if (e)
                  return e.o;
              }
            };
          }();
          a.b("computedContext", a.S);
          a.b("computedContext.getDependenciesCount", a.S.qa);
          a.b("computedContext.getDependencies", a.S.Va);
          a.b("computedContext.isInitial", a.S.Ya);
          a.b("computedContext.registerDependency", a.S.cc);
          a.b("ignoreDependencies", a.Yd = a.u.G);
          var I = a.a.Da("_latestValue");
          a.ta = function(b) {
            function c() {
              if (0 < arguments.length)
                return c.sb(c[I], arguments[0]) && (c.ya(), c[I] = arguments[0], c.xa()), this;
              a.u.cc(c);
              return c[I];
            }
            c[I] = b;
            a.a.Ba || a.a.extend(c, a.T.fn);
            a.T.fn.qb(c);
            a.a.Ab(c, F);
            a.options.deferUpdates && a.Ta.deferred(c, true);
            return c;
          };
          var F = { equalityComparer: K, v: function() {
            return this[I];
          }, xa: function() {
            this.notifySubscribers(this[I], "spectate");
            this.notifySubscribers(this[I]);
          }, ya: function() {
            this.notifySubscribers(this[I], "beforeChange");
          } };
          a.a.Ba && a.a.setPrototypeOf(F, a.T.fn);
          var G = a.ta.Ma = "__ko_proto__";
          F[G] = a.ta;
          a.O = function(b) {
            if ((b = "function" == typeof b && b[G]) && b !== F[G] && b !== a.o.fn[G])
              throw Error("Invalid object that looks like an observable; possibly from another Knockout instance");
            return !!b;
          };
          a.Za = function(b) {
            return "function" == typeof b && (b[G] === F[G] || b[G] === a.o.fn[G] && b.Nc);
          };
          a.b("observable", a.ta);
          a.b("isObservable", a.O);
          a.b("isWriteableObservable", a.Za);
          a.b("isWritableObservable", a.Za);
          a.b("observable.fn", F);
          a.L(F, "peek", F.v);
          a.L(F, "valueHasMutated", F.xa);
          a.L(F, "valueWillMutate", F.ya);
          a.Ha = function(b) {
            b = b || [];
            if ("object" != typeof b || !("length" in b))
              throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
            b = a.ta(b);
            a.a.Ab(
              b,
              a.Ha.fn
            );
            return b.extend({ trackArrayChanges: true });
          };
          a.Ha.fn = { remove: function(b) {
            for (var c = this.v(), d = [], e = "function" != typeof b || a.O(b) ? function(a2) {
              return a2 === b;
            } : b, f = 0; f < c.length; f++) {
              var g = c[f];
              if (e(g)) {
                0 === d.length && this.ya();
                if (c[f] !== g)
                  throw Error("Array modified during remove; cannot remove item");
                d.push(g);
                c.splice(f, 1);
                f--;
              }
            }
            d.length && this.xa();
            return d;
          }, removeAll: function(b) {
            if (b === n) {
              var c = this.v(), d = c.slice(0);
              this.ya();
              c.splice(0, c.length);
              this.xa();
              return d;
            }
            return b ? this.remove(function(c2) {
              return 0 <= a.a.A(b, c2);
            }) : [];
          }, destroy: function(b) {
            var c = this.v(), d = "function" != typeof b || a.O(b) ? function(a2) {
              return a2 === b;
            } : b;
            this.ya();
            for (var e = c.length - 1; 0 <= e; e--) {
              var f = c[e];
              d(f) && (f._destroy = true);
            }
            this.xa();
          }, destroyAll: function(b) {
            return b === n ? this.destroy(function() {
              return true;
            }) : b ? this.destroy(function(c) {
              return 0 <= a.a.A(b, c);
            }) : [];
          }, indexOf: function(b) {
            var c = this();
            return a.a.A(c, b);
          }, replace: function(a2, c) {
            var d = this.indexOf(a2);
            0 <= d && (this.ya(), this.v()[d] = c, this.xa());
          }, sorted: function(a2) {
            var c = this().slice(0);
            return a2 ? c.sort(a2) : c.sort();
          }, reversed: function() {
            return this().slice(0).reverse();
          } };
          a.a.Ba && a.a.setPrototypeOf(a.Ha.fn, a.ta.fn);
          a.a.D("pop push reverse shift sort splice unshift".split(" "), function(b) {
            a.Ha.fn[b] = function() {
              var a2 = this.v();
              this.ya();
              this.zc(a2, b, arguments);
              var d = a2[b].apply(a2, arguments);
              this.xa();
              return d === a2 ? this : d;
            };
          });
          a.a.D(["slice"], function(b) {
            a.Ha.fn[b] = function() {
              var a2 = this();
              return a2[b].apply(a2, arguments);
            };
          });
          a.Pc = function(b) {
            return a.O(b) && "function" == typeof b.remove && "function" == typeof b.push;
          };
          a.b("observableArray", a.Ha);
          a.b("isObservableArray", a.Pc);
          a.Ta.trackArrayChanges = function(b, c) {
            function d() {
              function c2() {
                if (m) {
                  var d2 = [].concat(b.v() || []), e2;
                  if (b.Wa("arrayChange")) {
                    if (!f || 1 < m)
                      f = a.a.Pb(k, d2, b.Ob);
                    e2 = f;
                  }
                  k = d2;
                  f = null;
                  m = 0;
                  e2 && e2.length && b.notifySubscribers(e2, "arrayChange");
                }
              }
              e ? c2() : (e = true, h = b.subscribe(function() {
                ++m;
              }, null, "spectate"), k = [].concat(b.v() || []), f = null, g = b.subscribe(c2));
            }
            b.Ob = {};
            c && "object" == typeof c && a.a.extend(b.Ob, c);
            b.Ob.sparse = true;
            if (!b.zc) {
              var e = false, f = null, g, h, m = 0, k, l2 = b.Qa, p = b.hb;
              b.Qa = function(a2) {
                l2 && l2.call(b, a2);
                "arrayChange" === a2 && d();
              };
              b.hb = function(a2) {
                p && p.call(b, a2);
                "arrayChange" !== a2 || b.Wa("arrayChange") || (g && g.s(), h && h.s(), h = g = null, e = false, k = n);
              };
              b.zc = function(b2, c2, d2) {
                function l3(a2, b3, c3) {
                  return k2[k2.length] = { status: a2, value: b3, index: c3 };
                }
                if (e && !m) {
                  var k2 = [], p2 = b2.length, g2 = d2.length, h2 = 0;
                  switch (c2) {
                    case "push":
                      h2 = p2;
                    case "unshift":
                      for (c2 = 0; c2 < g2; c2++)
                        l3("added", d2[c2], h2 + c2);
                      break;
                    case "pop":
                      h2 = p2 - 1;
                    case "shift":
                      p2 && l3("deleted", b2[h2], h2);
                      break;
                    case "splice":
                      c2 = Math.min(Math.max(0, 0 > d2[0] ? p2 + d2[0] : d2[0]), p2);
                      for (var p2 = 1 === g2 ? p2 : Math.min(c2 + (d2[1] || 0), p2), g2 = c2 + g2 - 2, h2 = Math.max(p2, g2), U = [], L = [], n2 = 2; c2 < h2; ++c2, ++n2)
                        c2 < p2 && L.push(l3("deleted", b2[c2], c2)), c2 < g2 && U.push(l3("added", d2[n2], c2));
                      a.a.Kc(L, U);
                      break;
                    default:
                      return;
                  }
                  f = k2;
                }
              };
            }
          };
          var r = a.a.Da("_state");
          a.o = a.$ = function(b, c, d) {
            function e() {
              if (0 < arguments.length) {
                if ("function" === typeof f)
                  f.apply(g.nb, arguments);
                else
                  throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
                return this;
              }
              g.ra || a.u.cc(e);
              (g.ka || g.J && e.Xa()) && e.ha();
              return g.X;
            }
            "object" === typeof b ? d = b : (d = d || {}, b && (d.read = b));
            if ("function" != typeof d.read)
              throw Error("Pass a function that returns the value of the ko.computed");
            var f = d.write, g = { X: n, sa: true, ka: true, rb: false, jc: false, ra: false, wb: false, J: false, Wc: d.read, nb: c || d.owner, l: d.disposeWhenNodeIsRemoved || d.l || null, Sa: d.disposeWhen || d.Sa, Rb: null, I: {}, V: 0, Ic: null };
            e[r] = g;
            e.Nc = "function" === typeof f;
            a.a.Ba || a.a.extend(e, a.T.fn);
            a.T.fn.qb(e);
            a.a.Ab(e, C);
            d.pure ? (g.wb = true, g.J = true, a.a.extend(e, da)) : d.deferEvaluation && a.a.extend(e, ea);
            a.options.deferUpdates && a.Ta.deferred(e, true);
            g.l && (g.jc = true, g.l.nodeType || (g.l = null));
            g.J || d.deferEvaluation || e.ha();
            g.l && e.ja() && a.a.K.za(g.l, g.Rb = function() {
              e.s();
            });
            return e;
          };
          var C = {
            equalityComparer: K,
            qa: function() {
              return this[r].V;
            },
            Va: function() {
              var b = [];
              a.a.P(this[r].I, function(a2, d) {
                b[d.Ka] = d.da;
              });
              return b;
            },
            Vb: function(b) {
              if (!this[r].V)
                return false;
              var c = this.Va();
              return -1 !== a.a.A(c, b) ? true : !!a.a.Lb(c, function(a2) {
                return a2.Vb && a2.Vb(b);
              });
            },
            uc: function(a2, c, d) {
              if (this[r].wb && c === this)
                throw Error("A 'pure' computed must not be called recursively");
              this[r].I[a2] = d;
              d.Ka = this[r].V++;
              d.La = c.ob();
            },
            Xa: function() {
              var a2, c, d = this[r].I;
              for (a2 in d)
                if (Object.prototype.hasOwnProperty.call(d, a2) && (c = d[a2], this.Ia && c.da.Ja || c.da.Dd(c.La)))
                  return true;
            },
            Jd: function() {
              this.Ia && !this[r].rb && this.Ia(false);
            },
            ja: function() {
              var a2 = this[r];
              return a2.ka || 0 < a2.V;
            },
            Rd: function() {
              this.Ja ? this[r].ka && (this[r].sa = true) : this.Hc();
            },
            $c: function(a2) {
              if (a2.Hb) {
                var c = a2.subscribe(this.Jd, this, "dirty"), d = a2.subscribe(
                  this.Rd,
                  this
                );
                return { da: a2, s: function() {
                  c.s();
                  d.s();
                } };
              }
              return a2.subscribe(this.Hc, this);
            },
            Hc: function() {
              var b = this, c = b.throttleEvaluation;
              c && 0 <= c ? (clearTimeout(this[r].Ic), this[r].Ic = a.a.setTimeout(function() {
                b.ha(true);
              }, c)) : b.Ia ? b.Ia(true) : b.ha(true);
            },
            ha: function(b) {
              var c = this[r], d = c.Sa, e = false;
              if (!c.rb && !c.ra) {
                if (c.l && !a.a.Sb(c.l) || d && d()) {
                  if (!c.jc) {
                    this.s();
                    return;
                  }
                } else
                  c.jc = false;
                c.rb = true;
                try {
                  e = this.zd(b);
                } finally {
                  c.rb = false;
                }
                return e;
              }
            },
            zd: function(b) {
              var c = this[r], d = false, e = c.wb ? n : !c.V, d = { qd: this, mb: c.I, Qb: c.V };
              a.u.xc({
                pd: d,
                od: ba,
                o: this,
                Ya: e
              });
              c.I = {};
              c.V = 0;
              var f = this.yd(c, d);
              c.V ? d = this.sb(c.X, f) : (this.s(), d = true);
              d && (c.J ? this.Gb() : this.notifySubscribers(c.X, "beforeChange"), c.X = f, this.notifySubscribers(c.X, "spectate"), !c.J && b && this.notifySubscribers(c.X), this.rc && this.rc());
              e && this.notifySubscribers(c.X, "awake");
              return d;
            },
            yd: function(b, c) {
              try {
                var d = b.Wc;
                return b.nb ? d.call(b.nb) : d();
              } finally {
                a.u.end(), c.Qb && !b.J && a.a.P(c.mb, aa), b.sa = b.ka = false;
              }
            },
            v: function(a2) {
              var c = this[r];
              (c.ka && (a2 || !c.V) || c.J && this.Xa()) && this.ha();
              return c.X;
            },
            ub: function(b) {
              a.T.fn.ub.call(this, b);
              this.nc = function() {
                this[r].J || (this[r].sa ? this.ha() : this[r].ka = false);
                return this[r].X;
              };
              this.Ia = function(a2) {
                this.pc(this[r].X);
                this[r].ka = true;
                a2 && (this[r].sa = true);
                this.qc(this, !a2);
              };
            },
            s: function() {
              var b = this[r];
              !b.J && b.I && a.a.P(b.I, function(a2, b2) {
                b2.s && b2.s();
              });
              b.l && b.Rb && a.a.K.yb(b.l, b.Rb);
              b.I = n;
              b.V = 0;
              b.ra = true;
              b.sa = false;
              b.ka = false;
              b.J = false;
              b.l = n;
              b.Sa = n;
              b.Wc = n;
              this.Nc || (b.nb = n);
            }
          }, da = { Qa: function(b) {
            var c = this, d = c[r];
            if (!d.ra && d.J && "change" == b) {
              d.J = false;
              if (d.sa || c.Xa())
                d.I = null, d.V = 0, c.ha() && c.Gb();
              else {
                var e = [];
                a.a.P(d.I, function(a2, b2) {
                  e[b2.Ka] = a2;
                });
                a.a.D(e, function(a2, b2) {
                  var e2 = d.I[a2], m = c.$c(e2.da);
                  m.Ka = b2;
                  m.La = e2.La;
                  d.I[a2] = m;
                });
                c.Xa() && c.ha() && c.Gb();
              }
              d.ra || c.notifySubscribers(d.X, "awake");
            }
          }, hb: function(b) {
            var c = this[r];
            c.ra || "change" != b || this.Wa("change") || (a.a.P(c.I, function(a2, b2) {
              b2.s && (c.I[a2] = { da: b2.da, Ka: b2.Ka, La: b2.La }, b2.s());
            }), c.J = true, this.notifySubscribers(n, "asleep"));
          }, ob: function() {
            var b = this[r];
            b.J && (b.sa || this.Xa()) && this.ha();
            return a.T.fn.ob.call(this);
          } }, ea = { Qa: function(a2) {
            "change" != a2 && "beforeChange" != a2 || this.v();
          } };
          a.a.Ba && a.a.setPrototypeOf(C, a.T.fn);
          var N = a.ta.Ma;
          C[N] = a.o;
          a.Oc = function(a2) {
            return "function" == typeof a2 && a2[N] === C[N];
          };
          a.Fd = function(b) {
            return a.Oc(b) && b[r] && b[r].wb;
          };
          a.b("computed", a.o);
          a.b("dependentObservable", a.o);
          a.b("isComputed", a.Oc);
          a.b("isPureComputed", a.Fd);
          a.b("computed.fn", C);
          a.L(C, "peek", C.v);
          a.L(C, "dispose", C.s);
          a.L(C, "isActive", C.ja);
          a.L(C, "getDependenciesCount", C.qa);
          a.L(C, "getDependencies", C.Va);
          a.xb = function(b, c) {
            if ("function" === typeof b)
              return a.o(
                b,
                c,
                { pure: true }
              );
            b = a.a.extend({}, b);
            b.pure = true;
            return a.o(b, c);
          };
          a.b("pureComputed", a.xb);
          (function() {
            function b(a2, f, g) {
              g = g || new d();
              a2 = f(a2);
              if ("object" != typeof a2 || null === a2 || a2 === n || a2 instanceof RegExp || a2 instanceof Date || a2 instanceof String || a2 instanceof Number || a2 instanceof Boolean)
                return a2;
              var h = a2 instanceof Array ? [] : {};
              g.save(a2, h);
              c(a2, function(c2) {
                var d2 = f(a2[c2]);
                switch (typeof d2) {
                  case "boolean":
                  case "number":
                  case "string":
                  case "function":
                    h[c2] = d2;
                    break;
                  case "object":
                  case "undefined":
                    var l2 = g.get(d2);
                    h[c2] = l2 !== n ? l2 : b(d2, f, g);
                }
              });
              return h;
            }
            function c(a2, b2) {
              if (a2 instanceof Array) {
                for (var c2 = 0; c2 < a2.length; c2++)
                  b2(c2);
                "function" == typeof a2.toJSON && b2("toJSON");
              } else
                for (c2 in a2)
                  b2(c2);
            }
            function d() {
              this.keys = [];
              this.values = [];
            }
            a.ad = function(c2) {
              if (0 == arguments.length)
                throw Error("When calling ko.toJS, pass the object you want to convert.");
              return b(c2, function(b2) {
                for (var c3 = 0; a.O(b2) && 10 > c3; c3++)
                  b2 = b2();
                return b2;
              });
            };
            a.toJSON = function(b2, c2, d2) {
              b2 = a.ad(b2);
              return a.a.hc(b2, c2, d2);
            };
            d.prototype = { constructor: d, save: function(b2, c2) {
              var d2 = a.a.A(
                this.keys,
                b2
              );
              0 <= d2 ? this.values[d2] = c2 : (this.keys.push(b2), this.values.push(c2));
            }, get: function(b2) {
              b2 = a.a.A(this.keys, b2);
              return 0 <= b2 ? this.values[b2] : n;
            } };
          })();
          a.b("toJS", a.ad);
          a.b("toJSON", a.toJSON);
          a.Wd = function(b, c, d) {
            function e(c2) {
              var e2 = a.xb(b, d).extend({ ma: "always" }), h = e2.subscribe(function(a2) {
                a2 && (h.s(), c2(a2));
              });
              e2.notifySubscribers(e2.v());
              return h;
            }
            return "function" !== typeof Promise || c ? e(c.bind(d)) : new Promise(e);
          };
          a.b("when", a.Wd);
          (function() {
            a.w = { M: function(b) {
              switch (a.a.R(b)) {
                case "option":
                  return true === b.__ko__hasDomDataOptionValue__ ? a.a.g.get(b, a.c.options.$b) : 7 >= a.a.W ? b.getAttributeNode("value") && b.getAttributeNode("value").specified ? b.value : b.text : b.value;
                case "select":
                  return 0 <= b.selectedIndex ? a.w.M(b.options[b.selectedIndex]) : n;
                default:
                  return b.value;
              }
            }, cb: function(b, c, d) {
              switch (a.a.R(b)) {
                case "option":
                  "string" === typeof c ? (a.a.g.set(b, a.c.options.$b, n), "__ko__hasDomDataOptionValue__" in b && delete b.__ko__hasDomDataOptionValue__, b.value = c) : (a.a.g.set(b, a.c.options.$b, c), b.__ko__hasDomDataOptionValue__ = true, b.value = "number" === typeof c ? c : "");
                  break;
                case "select":
                  if ("" === c || null === c)
                    c = n;
                  for (var e = -1, f = 0, g = b.options.length, h; f < g; ++f)
                    if (h = a.w.M(b.options[f]), h == c || "" === h && c === n) {
                      e = f;
                      break;
                    }
                  if (d || 0 <= e || c === n && 1 < b.size)
                    b.selectedIndex = e, 6 === a.a.W && a.a.setTimeout(function() {
                      b.selectedIndex = e;
                    }, 0);
                  break;
                default:
                  if (null === c || c === n)
                    c = "";
                  b.value = c;
              }
            } };
          })();
          a.b("selectExtensions", a.w);
          a.b("selectExtensions.readValue", a.w.M);
          a.b("selectExtensions.writeValue", a.w.cb);
          a.m = function() {
            function b(b2) {
              b2 = a.a.Db(b2);
              123 === b2.charCodeAt(0) && (b2 = b2.slice(
                1,
                -1
              ));
              b2 += "\n,";
              var c2 = [], d2 = b2.match(e), p, q = [], h2 = 0;
              if (1 < d2.length) {
                for (var x = 0, B; B = d2[x]; ++x) {
                  var u = B.charCodeAt(0);
                  if (44 === u) {
                    if (0 >= h2) {
                      c2.push(p && q.length ? { key: p, value: q.join("") } : { unknown: p || q.join("") });
                      p = h2 = 0;
                      q = [];
                      continue;
                    }
                  } else if (58 === u) {
                    if (!h2 && !p && 1 === q.length) {
                      p = q.pop();
                      continue;
                    }
                  } else if (47 === u && 1 < B.length && (47 === B.charCodeAt(1) || 42 === B.charCodeAt(1)))
                    continue;
                  else
                    47 === u && x && 1 < B.length ? (u = d2[x - 1].match(f)) && !g[u[0]] && (b2 = b2.substr(b2.indexOf(B) + 1), d2 = b2.match(e), x = -1, B = "/") : 40 === u || 123 === u || 91 === u ? ++h2 : 41 === u || 125 === u || 93 === u ? --h2 : p || q.length || 34 !== u && 39 !== u || (B = B.slice(1, -1));
                  q.push(B);
                }
                if (0 < h2)
                  throw Error("Unbalanced parentheses, braces, or brackets");
              }
              return c2;
            }
            var c = ["true", "false", "null", "undefined"], d = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, e = RegExp("\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]", "g"), f = /[\])"'A-Za-z0-9_$]+$/, g = { "in": 1, "return": 1, "typeof": 1 }, h = {};
            return { Ra: [], wa: h, ac: b, vb: function(e2, f2) {
              function l2(b2, e3) {
                var f3;
                if (!x) {
                  var k = a.getBindingHandler(b2);
                  if (k && k.preprocess && !(e3 = k.preprocess(e3, b2, l2)))
                    return;
                  if (k = h[b2])
                    f3 = e3, 0 <= a.a.A(c, f3) ? f3 = false : (k = f3.match(d), f3 = null === k ? false : k[1] ? "Object(" + k[1] + ")" + k[2] : f3), k = f3;
                  k && q.push("'" + ("string" == typeof h[b2] ? h[b2] : b2) + "':function(_z){" + f3 + "=_z}");
                }
                g2 && (e3 = "function(){return " + e3 + " }");
                p.push("'" + b2 + "':" + e3);
              }
              f2 = f2 || {};
              var p = [], q = [], g2 = f2.valueAccessors, x = f2.bindingParams, B = "string" === typeof e2 ? b(e2) : e2;
              a.a.D(B, function(a2) {
                l2(
                  a2.key || a2.unknown,
                  a2.value
                );
              });
              q.length && l2("_ko_property_writers", "{" + q.join(",") + " }");
              return p.join(",");
            }, Id: function(a2, b2) {
              for (var c2 = 0; c2 < a2.length; c2++)
                if (a2[c2].key == b2)
                  return true;
              return false;
            }, eb: function(b2, c2, d2, e2, f2) {
              if (b2 && a.O(b2))
                !a.Za(b2) || f2 && b2.v() === e2 || b2(e2);
              else if ((b2 = c2.get("_ko_property_writers")) && b2[d2])
                b2[d2](e2);
            } };
          }();
          a.b("expressionRewriting", a.m);
          a.b("expressionRewriting.bindingRewriteValidators", a.m.Ra);
          a.b("expressionRewriting.parseObjectLiteral", a.m.ac);
          a.b("expressionRewriting.preProcessBindings", a.m.vb);
          a.b(
            "expressionRewriting._twoWayBindings",
            a.m.wa
          );
          a.b("jsonExpressionRewriting", a.m);
          a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", a.m.vb);
          (function() {
            function b(a2) {
              return 8 == a2.nodeType && g.test(f ? a2.text : a2.nodeValue);
            }
            function c(a2) {
              return 8 == a2.nodeType && h.test(f ? a2.text : a2.nodeValue);
            }
            function d(d2, e2) {
              for (var f2 = d2, h2 = 1, g2 = []; f2 = f2.nextSibling; ) {
                if (c(f2) && (a.a.g.set(f2, k, true), h2--, 0 === h2))
                  return g2;
                g2.push(f2);
                b(f2) && h2++;
              }
              if (!e2)
                throw Error("Cannot find closing comment tag to match: " + d2.nodeValue);
              return null;
            }
            function e(a2, b2) {
              var c2 = d(a2, b2);
              return c2 ? 0 < c2.length ? c2[c2.length - 1].nextSibling : a2.nextSibling : null;
            }
            var f = w && "<!--test-->" === w.createComment("test").text, g = f ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/, h = f ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/, m = { ul: true, ol: true }, k = "__ko_matchedEndComment__";
            a.h = { ea: {}, childNodes: function(a2) {
              return b(a2) ? d(a2) : a2.childNodes;
            }, Ea: function(c2) {
              if (b(c2)) {
                c2 = a.h.childNodes(c2);
                for (var d2 = 0, e2 = c2.length; d2 < e2; d2++)
                  a.removeNode(c2[d2]);
              } else
                a.a.Tb(c2);
            }, va: function(c2, d2) {
              if (b(c2)) {
                a.h.Ea(c2);
                for (var e2 = c2.nextSibling, f2 = 0, k2 = d2.length; f2 < k2; f2++)
                  e2.parentNode.insertBefore(d2[f2], e2);
              } else
                a.a.va(c2, d2);
            }, Vc: function(a2, c2) {
              var d2;
              b(a2) ? (d2 = a2.nextSibling, a2 = a2.parentNode) : d2 = a2.firstChild;
              d2 ? c2 !== d2 && a2.insertBefore(c2, d2) : a2.appendChild(c2);
            }, Wb: function(c2, d2, e2) {
              e2 ? (e2 = e2.nextSibling, b(c2) && (c2 = c2.parentNode), e2 ? d2 !== e2 && c2.insertBefore(d2, e2) : c2.appendChild(d2)) : a.h.Vc(c2, d2);
            }, firstChild: function(a2) {
              if (b(a2))
                return !a2.nextSibling || c(a2.nextSibling) ? null : a2.nextSibling;
              if (a2.firstChild && c(a2.firstChild))
                throw Error("Found invalid end comment, as the first child of " + a2);
              return a2.firstChild;
            }, nextSibling: function(d2) {
              b(d2) && (d2 = e(d2));
              if (d2.nextSibling && c(d2.nextSibling)) {
                var f2 = d2.nextSibling;
                if (c(f2) && !a.a.g.get(f2, k))
                  throw Error("Found end comment without a matching opening comment, as child of " + d2);
                return null;
              }
              return d2.nextSibling;
            }, Cd: b, Vd: function(a2) {
              return (a2 = (f ? a2.text : a2.nodeValue).match(g)) ? a2[1] : null;
            }, Sc: function(d2) {
              if (m[a.a.R(d2)]) {
                var f2 = d2.firstChild;
                if (f2) {
                  do
                    if (1 === f2.nodeType) {
                      var k2;
                      k2 = f2.firstChild;
                      var h2 = null;
                      if (k2) {
                        do
                          if (h2)
                            h2.push(k2);
                          else if (b(k2)) {
                            var g2 = e(k2, true);
                            g2 ? k2 = g2 : h2 = [k2];
                          } else
                            c(k2) && (h2 = [k2]);
                        while (k2 = k2.nextSibling);
                      }
                      if (k2 = h2)
                        for (h2 = f2.nextSibling, g2 = 0; g2 < k2.length; g2++)
                          h2 ? d2.insertBefore(k2[g2], h2) : d2.appendChild(k2[g2]);
                    }
                  while (f2 = f2.nextSibling);
                }
              }
            } };
          })();
          a.b("virtualElements", a.h);
          a.b("virtualElements.allowedBindings", a.h.ea);
          a.b("virtualElements.emptyNode", a.h.Ea);
          a.b("virtualElements.insertAfter", a.h.Wb);
          a.b("virtualElements.prepend", a.h.Vc);
          a.b("virtualElements.setDomNodeChildren", a.h.va);
          (function() {
            a.ga = function() {
              this.nd = {};
            };
            a.a.extend(a.ga.prototype, {
              nodeHasBindings: function(b) {
                switch (b.nodeType) {
                  case 1:
                    return null != b.getAttribute("data-bind") || a.j.getComponentNameForNode(b);
                  case 8:
                    return a.h.Cd(b);
                  default:
                    return false;
                }
              },
              getBindings: function(b, c) {
                var d = this.getBindingsString(b, c), d = d ? this.parseBindingsString(d, c, b) : null;
                return a.j.tc(d, b, c, false);
              },
              getBindingAccessors: function(b, c) {
                var d = this.getBindingsString(b, c), d = d ? this.parseBindingsString(d, c, b, { valueAccessors: true }) : null;
                return a.j.tc(d, b, c, true);
              },
              getBindingsString: function(b) {
                switch (b.nodeType) {
                  case 1:
                    return b.getAttribute("data-bind");
                  case 8:
                    return a.h.Vd(b);
                  default:
                    return null;
                }
              },
              parseBindingsString: function(b, c, d, e) {
                try {
                  var f = this.nd, g = b + (e && e.valueAccessors || ""), h;
                  if (!(h = f[g])) {
                    var m, k = "with($context){with($data||{}){return{" + a.m.vb(b, e) + "}}}";
                    m = new Function("$context", "$element", k);
                    h = f[g] = m;
                  }
                  return h(c, d);
                } catch (l2) {
                  throw l2.message = "Unable to parse bindings.\nBindings value: " + b + "\nMessage: " + l2.message, l2;
                }
              }
            });
            a.ga.instance = new a.ga();
          })();
          a.b("bindingProvider", a.ga);
          (function() {
            function b(b2) {
              var c2 = (b2 = a.a.g.get(b2, z)) && b2.N;
              c2 && (b2.N = null, c2.Tc());
            }
            function c(c2, d2, e2) {
              this.node = c2;
              this.yc = d2;
              this.kb = [];
              this.H = false;
              d2.N || a.a.K.za(c2, b);
              e2 && e2.N && (e2.N.kb.push(c2), this.Kb = e2);
            }
            function d(a2) {
              return function() {
                return a2;
              };
            }
            function e(a2) {
              return a2();
            }
            function f(b2) {
              return a.a.Ga(a.u.G(b2), function(a2, c2) {
                return function() {
                  return b2()[c2];
                };
              });
            }
            function g(b2, c2, e2) {
              return "function" === typeof b2 ? f(b2.bind(null, c2, e2)) : a.a.Ga(b2, d);
            }
            function h(a2, b2) {
              return f(this.getBindings.bind(this, a2, b2));
            }
            function m(b2, c2) {
              var d2 = a.h.firstChild(c2);
              if (d2) {
                var e2, f2 = a.ga.instance, l3 = f2.preprocessNode;
                if (l3) {
                  for (; e2 = d2; )
                    d2 = a.h.nextSibling(e2), l3.call(f2, e2);
                  d2 = a.h.firstChild(c2);
                }
                for (; e2 = d2; )
                  d2 = a.h.nextSibling(e2), k(b2, e2);
              }
              a.i.ma(c2, a.i.H);
            }
            function k(b2, c2) {
              var d2 = b2, e2 = 1 === c2.nodeType;
              e2 && a.h.Sc(c2);
              if (e2 || a.ga.instance.nodeHasBindings(c2))
                d2 = p(c2, null, b2).bindingContextForDescendants;
              d2 && !u[a.a.R(c2)] && m(d2, c2);
            }
            function l2(b2) {
              var c2 = [], d2 = {}, e2 = [];
              a.a.P(b2, function ca(f2) {
                if (!d2[f2]) {
                  var k2 = a.getBindingHandler(f2);
                  k2 && (k2.after && (e2.push(f2), a.a.D(k2.after, function(c3) {
                    if (b2[c3]) {
                      if (-1 !== a.a.A(e2, c3))
                        throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + e2.join(", "));
                      ca(c3);
                    }
                  }), e2.length--), c2.push({ key: f2, Mc: k2 }));
                  d2[f2] = true;
                }
              });
              return c2;
            }
            function p(b2, c2, d2) {
              var f2 = a.a.g.Ub(b2, z, {}), k2 = f2.hd;
              if (!c2) {
                if (k2)
                  throw Error("You cannot apply bindings multiple times to the same element.");
                f2.hd = true;
              }
              k2 || (f2.context = d2);
              f2.Zb || (f2.Zb = {});
              var g2;
              if (c2 && "function" !== typeof c2)
                g2 = c2;
              else {
                var p2 = a.ga.instance, q2 = p2.getBindingAccessors || h, m2 = a.$(function() {
                  if (g2 = c2 ? c2(d2, b2) : q2.call(p2, b2, d2)) {
                    if (d2[t])
                      d2[t]();
                    if (d2[B])
                      d2[B]();
                  }
                  return g2;
                }, null, { l: b2 });
                g2 && m2.ja() || (m2 = null);
              }
              var x2 = d2, u2;
              if (g2) {
                var J2 = function() {
                  return a.a.Ga(m2 ? m2() : g2, e);
                }, r2 = m2 ? function(a2) {
                  return function() {
                    return e(m2()[a2]);
                  };
                } : function(a2) {
                  return g2[a2];
                };
                J2.get = function(a2) {
                  return g2[a2] && e(r2(a2));
                };
                J2.has = function(a2) {
                  return a2 in g2;
                };
                a.i.H in g2 && a.i.subscribe(b2, a.i.H, function() {
                  var c3 = (0, g2[a.i.H])();
                  if (c3) {
                    var d3 = a.h.childNodes(b2);
                    d3.length && c3(d3, a.Ec(d3[0]));
                  }
                });
                a.i.pa in g2 && (x2 = a.i.Cb(b2, d2), a.i.subscribe(b2, a.i.pa, function() {
                  var c3 = (0, g2[a.i.pa])();
                  c3 && a.h.firstChild(b2) && c3(b2);
                }));
                f2 = l2(g2);
                a.a.D(f2, function(c3) {
                  var d3 = c3.Mc.init, e2 = c3.Mc.update, f3 = c3.key;
                  if (8 === b2.nodeType && !a.h.ea[f3])
                    throw Error("The binding '" + f3 + "' cannot be used with virtual elements");
                  try {
                    "function" == typeof d3 && a.u.G(function() {
                      var a2 = d3(b2, r2(f3), J2, x2.$data, x2);
                      if (a2 && a2.controlsDescendantBindings) {
                        if (u2 !== n)
                          throw Error("Multiple bindings (" + u2 + " and " + f3 + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                        u2 = f3;
                      }
                    }), "function" == typeof e2 && a.$(function() {
                      e2(b2, r2(f3), J2, x2.$data, x2);
                    }, null, { l: b2 });
                  } catch (k3) {
                    throw k3.message = 'Unable to process binding "' + f3 + ": " + g2[f3] + '"\nMessage: ' + k3.message, k3;
                  }
                });
              }
              f2 = u2 === n;
              return { shouldBindDescendants: f2, bindingContextForDescendants: f2 && x2 };
            }
            function q(b2, c2) {
              return b2 && b2 instanceof a.fa ? b2 : new a.fa(b2, n, n, c2);
            }
            var t = a.a.Da("_subscribable"), x = a.a.Da("_ancestorBindingInfo"), B = a.a.Da("_dataDependency");
            a.c = {};
            var u = { script: true, textarea: true, template: true };
            a.getBindingHandler = function(b2) {
              return a.c[b2];
            };
            var J = {};
            a.fa = function(b2, c2, d2, e2, f2) {
              function k2() {
                var b3 = p2 ? h2() : h2, f3 = a.a.f(b3);
                c2 ? (a.a.extend(l3, c2), x in c2 && (l3[x] = c2[x])) : (l3.$parents = [], l3.$root = f3, l3.ko = a);
                l3[t] = q2;
                g2 ? f3 = l3.$data : (l3.$rawData = b3, l3.$data = f3);
                d2 && (l3[d2] = f3);
                e2 && e2(l3, c2, f3);
                if (c2 && c2[t] && !a.S.o().Vb(c2[t]))
                  c2[t]();
                m2 && (l3[B] = m2);
                return l3.$data;
              }
              var l3 = this, g2 = b2 === J, h2 = g2 ? n : b2, p2 = "function" == typeof h2 && !a.O(h2), q2, m2 = f2 && f2.dataDependency;
              f2 && f2.exportDependencies ? k2() : (q2 = a.xb(k2), q2.v(), q2.ja() ? q2.equalityComparer = null : l3[t] = n);
            };
            a.fa.prototype.createChildContext = function(b2, c2, d2, e2) {
              !e2 && c2 && "object" == typeof c2 && (e2 = c2, c2 = e2.as, d2 = e2.extend);
              if (c2 && e2 && e2.noChildContext) {
                var f2 = "function" == typeof b2 && !a.O(b2);
                return new a.fa(J, this, null, function(a2) {
                  d2 && d2(a2);
                  a2[c2] = f2 ? b2() : b2;
                }, e2);
              }
              return new a.fa(
                b2,
                this,
                c2,
                function(a2, b3) {
                  a2.$parentContext = b3;
                  a2.$parent = b3.$data;
                  a2.$parents = (b3.$parents || []).slice(0);
                  a2.$parents.unshift(a2.$parent);
                  d2 && d2(a2);
                },
                e2
              );
            };
            a.fa.prototype.extend = function(b2, c2) {
              return new a.fa(J, this, null, function(c3) {
                a.a.extend(c3, "function" == typeof b2 ? b2(c3) : b2);
              }, c2);
            };
            var z = a.a.g.Z();
            c.prototype.Tc = function() {
              this.Kb && this.Kb.N && this.Kb.N.sd(this.node);
            };
            c.prototype.sd = function(b2) {
              a.a.Pa(this.kb, b2);
              !this.kb.length && this.H && this.Cc();
            };
            c.prototype.Cc = function() {
              this.H = true;
              this.yc.N && !this.kb.length && (this.yc.N = null, a.a.K.yb(this.node, b), a.i.ma(this.node, a.i.pa), this.Tc());
            };
            a.i = { H: "childrenComplete", pa: "descendantsComplete", subscribe: function(b2, c2, d2, e2, f2) {
              var k2 = a.a.g.Ub(b2, z, {});
              k2.Fa || (k2.Fa = new a.T());
              f2 && f2.notifyImmediately && k2.Zb[c2] && a.u.G(d2, e2, [b2]);
              return k2.Fa.subscribe(d2, e2, c2);
            }, ma: function(b2, c2) {
              var d2 = a.a.g.get(b2, z);
              if (d2 && (d2.Zb[c2] = true, d2.Fa && d2.Fa.notifySubscribers(b2, c2), c2 == a.i.H)) {
                if (d2.N)
                  d2.N.Cc();
                else if (d2.N === n && d2.Fa && d2.Fa.Wa(a.i.pa))
                  throw Error("descendantsComplete event not supported for bindings on this node");
              }
            }, Cb: function(b2, d2) {
              var e2 = a.a.g.Ub(b2, z, {});
              e2.N || (e2.N = new c(b2, e2, d2[x]));
              return d2[x] == e2 ? d2 : d2.extend(function(a2) {
                a2[x] = e2;
              });
            } };
            a.Td = function(b2) {
              return (b2 = a.a.g.get(b2, z)) && b2.context;
            };
            a.ib = function(b2, c2, d2) {
              1 === b2.nodeType && a.h.Sc(b2);
              return p(b2, c2, q(d2));
            };
            a.ld = function(b2, c2, d2) {
              d2 = q(d2);
              return a.ib(b2, g(c2, d2, b2), d2);
            };
            a.Oa = function(a2, b2) {
              1 !== b2.nodeType && 8 !== b2.nodeType || m(q(a2), b2);
            };
            a.vc = function(a2, b2, c2) {
              !v && A.jQuery && (v = A.jQuery);
              if (2 > arguments.length) {
                if (b2 = w.body, !b2)
                  throw Error("ko.applyBindings: could not find document.body; has the document been loaded?");
              } else if (!b2 || 1 !== b2.nodeType && 8 !== b2.nodeType)
                throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
              k(q(a2, c2), b2);
            };
            a.Dc = function(b2) {
              return !b2 || 1 !== b2.nodeType && 8 !== b2.nodeType ? n : a.Td(b2);
            };
            a.Ec = function(b2) {
              return (b2 = a.Dc(b2)) ? b2.$data : n;
            };
            a.b("bindingHandlers", a.c);
            a.b("bindingEvent", a.i);
            a.b("bindingEvent.subscribe", a.i.subscribe);
            a.b("bindingEvent.startPossiblyAsyncContentBinding", a.i.Cb);
            a.b("applyBindings", a.vc);
            a.b("applyBindingsToDescendants", a.Oa);
            a.b("applyBindingAccessorsToNode", a.ib);
            a.b("applyBindingsToNode", a.ld);
            a.b("contextFor", a.Dc);
            a.b("dataFor", a.Ec);
          })();
          (function(b) {
            function c(c2, e2) {
              var k = Object.prototype.hasOwnProperty.call(f, c2) ? f[c2] : b, l2;
              k ? k.subscribe(e2) : (k = f[c2] = new a.T(), k.subscribe(e2), d(c2, function(b2, d2) {
                var e3 = !(!d2 || !d2.synchronous);
                g[c2] = { definition: b2, Gd: e3 };
                delete f[c2];
                l2 || e3 ? k.notifySubscribers(b2) : a.na.zb(function() {
                  k.notifySubscribers(b2);
                });
              }), l2 = true);
            }
            function d(a2, b2) {
              e("getConfig", [a2], function(c2) {
                c2 ? e("loadComponent", [a2, c2], function(a3) {
                  b2(
                    a3,
                    c2
                  );
                }) : b2(null, null);
              });
            }
            function e(c2, d2, f2, l2) {
              l2 || (l2 = a.j.loaders.slice(0));
              var g2 = l2.shift();
              if (g2) {
                var q = g2[c2];
                if (q) {
                  var t = false;
                  if (q.apply(g2, d2.concat(function(a2) {
                    t ? f2(null) : null !== a2 ? f2(a2) : e(c2, d2, f2, l2);
                  })) !== b && (t = true, !g2.suppressLoaderExceptions))
                    throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");
                } else
                  e(c2, d2, f2, l2);
              } else
                f2(null);
            }
            var f = {}, g = {};
            a.j = { get: function(d2, e2) {
              var f2 = Object.prototype.hasOwnProperty.call(g, d2) ? g[d2] : b;
              f2 ? f2.Gd ? a.u.G(function() {
                e2(f2.definition);
              }) : a.na.zb(function() {
                e2(f2.definition);
              }) : c(d2, e2);
            }, Bc: function(a2) {
              delete g[a2];
            }, oc: e };
            a.j.loaders = [];
            a.b("components", a.j);
            a.b("components.get", a.j.get);
            a.b("components.clearCachedDefinition", a.j.Bc);
          })();
          (function() {
            function b(b2, c2, d2, e2) {
              function g2() {
                0 === --B && e2(h2);
              }
              var h2 = {}, B = 2, u = d2.template;
              d2 = d2.viewModel;
              u ? f(c2, u, function(c3) {
                a.j.oc("loadTemplate", [b2, c3], function(a2) {
                  h2.template = a2;
                  g2();
                });
              }) : g2();
              d2 ? f(c2, d2, function(c3) {
                a.j.oc("loadViewModel", [b2, c3], function(a2) {
                  h2[m] = a2;
                  g2();
                });
              }) : g2();
            }
            function c(a2, b2, d2) {
              if ("function" === typeof b2)
                d2(function(a3) {
                  return new b2(a3);
                });
              else if ("function" === typeof b2[m])
                d2(b2[m]);
              else if ("instance" in b2) {
                var e2 = b2.instance;
                d2(function() {
                  return e2;
                });
              } else
                "viewModel" in b2 ? c(a2, b2.viewModel, d2) : a2("Unknown viewModel value: " + b2);
            }
            function d(b2) {
              switch (a.a.R(b2)) {
                case "script":
                  return a.a.ua(b2.text);
                case "textarea":
                  return a.a.ua(b2.value);
                case "template":
                  if (e(b2.content))
                    return a.a.Ca(b2.content.childNodes);
              }
              return a.a.Ca(b2.childNodes);
            }
            function e(a2) {
              return A.DocumentFragment ? a2 instanceof DocumentFragment : a2 && 11 === a2.nodeType;
            }
            function f(a2, b2, c2) {
              "string" === typeof b2.require ? T || A.require ? (T || A.require)([b2.require], function(a3) {
                a3 && "object" === typeof a3 && a3.Xd && a3["default"] && (a3 = a3["default"]);
                c2(a3);
              }) : a2("Uses require, but no AMD loader is present") : c2(b2);
            }
            function g(a2) {
              return function(b2) {
                throw Error("Component '" + a2 + "': " + b2);
              };
            }
            var h = {};
            a.j.register = function(b2, c2) {
              if (!c2)
                throw Error("Invalid configuration for " + b2);
              if (a.j.tb(b2))
                throw Error("Component " + b2 + " is already registered");
              h[b2] = c2;
            };
            a.j.tb = function(a2) {
              return Object.prototype.hasOwnProperty.call(h, a2);
            };
            a.j.unregister = function(b2) {
              delete h[b2];
              a.j.Bc(b2);
            };
            a.j.Fc = { getConfig: function(b2, c2) {
              c2(a.j.tb(b2) ? h[b2] : null);
            }, loadComponent: function(a2, c2, d2) {
              var e2 = g(a2);
              f(e2, c2, function(c3) {
                b(a2, e2, c3, d2);
              });
            }, loadTemplate: function(b2, c2, f2) {
              b2 = g(b2);
              if ("string" === typeof c2)
                f2(a.a.ua(c2));
              else if (c2 instanceof Array)
                f2(c2);
              else if (e(c2))
                f2(a.a.la(c2.childNodes));
              else if (c2.element)
                if (c2 = c2.element, A.HTMLElement ? c2 instanceof HTMLElement : c2 && c2.tagName && 1 === c2.nodeType)
                  f2(d(c2));
                else if ("string" === typeof c2) {
                  var h2 = w.getElementById(c2);
                  h2 ? f2(d(h2)) : b2("Cannot find element with ID " + c2);
                } else
                  b2("Unknown element type: " + c2);
              else
                b2("Unknown template value: " + c2);
            }, loadViewModel: function(a2, b2, d2) {
              c(g(a2), b2, d2);
            } };
            var m = "createViewModel";
            a.b("components.register", a.j.register);
            a.b("components.isRegistered", a.j.tb);
            a.b("components.unregister", a.j.unregister);
            a.b("components.defaultLoader", a.j.Fc);
            a.j.loaders.push(a.j.Fc);
            a.j.dd = h;
          })();
          (function() {
            function b(b2, e) {
              var f = b2.getAttribute("params");
              if (f) {
                var f = c.parseBindingsString(f, e, b2, { valueAccessors: true, bindingParams: true }), f = a.a.Ga(f, function(c2) {
                  return a.o(c2, null, { l: b2 });
                }), g = a.a.Ga(
                  f,
                  function(c2) {
                    var e2 = c2.v();
                    return c2.ja() ? a.o({ read: function() {
                      return a.a.f(c2());
                    }, write: a.Za(e2) && function(a2) {
                      c2()(a2);
                    }, l: b2 }) : e2;
                  }
                );
                Object.prototype.hasOwnProperty.call(g, "$raw") || (g.$raw = f);
                return g;
              }
              return { $raw: {} };
            }
            a.j.getComponentNameForNode = function(b2) {
              var c2 = a.a.R(b2);
              if (a.j.tb(c2) && (-1 != c2.indexOf("-") || "[object HTMLUnknownElement]" == "" + b2 || 8 >= a.a.W && b2.tagName === c2))
                return c2;
            };
            a.j.tc = function(c2, e, f, g) {
              if (1 === e.nodeType) {
                var h = a.j.getComponentNameForNode(e);
                if (h) {
                  c2 = c2 || {};
                  if (c2.component)
                    throw Error('Cannot use the "component" binding on a custom element matching a component');
                  var m = { name: h, params: b(e, f) };
                  c2.component = g ? function() {
                    return m;
                  } : m;
                }
              }
              return c2;
            };
            var c = new a.ga();
            9 > a.a.W && (a.j.register = function(a2) {
              return function(b2) {
                return a2.apply(this, arguments);
              };
            }(a.j.register), w.createDocumentFragment = function(b2) {
              return function() {
                var c2 = b2(), f = a.j.dd, g;
                for (g in f)
                  ;
                return c2;
              };
            }(w.createDocumentFragment));
          })();
          (function() {
            function b(b2, c2, d2) {
              c2 = c2.template;
              if (!c2)
                throw Error("Component '" + b2 + "' has no template");
              b2 = a.a.Ca(c2);
              a.h.va(d2, b2);
            }
            function c(a2, b2, c2) {
              var d2 = a2.createViewModel;
              return d2 ? d2.call(
                a2,
                b2,
                c2
              ) : b2;
            }
            var d = 0;
            a.c.component = { init: function(e, f, g, h, m) {
              function k() {
                var a2 = l2 && l2.dispose;
                "function" === typeof a2 && a2.call(l2);
                q && q.s();
                p = l2 = q = null;
              }
              var l2, p, q, t = a.a.la(a.h.childNodes(e));
              a.h.Ea(e);
              a.a.K.za(e, k);
              a.o(function() {
                var g2 = a.a.f(f()), h2, u;
                "string" === typeof g2 ? h2 = g2 : (h2 = a.a.f(g2.name), u = a.a.f(g2.params));
                if (!h2)
                  throw Error("No component name specified");
                var n2 = a.i.Cb(e, m), z = p = ++d;
                a.j.get(h2, function(d2) {
                  if (p === z) {
                    k();
                    if (!d2)
                      throw Error("Unknown component '" + h2 + "'");
                    b(h2, d2, e);
                    var f2 = c(d2, u, { element: e, templateNodes: t });
                    d2 = n2.createChildContext(f2, { extend: function(a2) {
                      a2.$component = f2;
                      a2.$componentTemplateNodes = t;
                    } });
                    f2 && f2.koDescendantsComplete && (q = a.i.subscribe(e, a.i.pa, f2.koDescendantsComplete, f2));
                    l2 = f2;
                    a.Oa(d2, e);
                  }
                });
              }, null, { l: e });
              return { controlsDescendantBindings: true };
            } };
            a.h.ea.component = true;
          })();
          var V = { "class": "className", "for": "htmlFor" };
          a.c.attr = { update: function(b, c) {
            var d = a.a.f(c()) || {};
            a.a.P(d, function(c2, d2) {
              d2 = a.a.f(d2);
              var g = c2.indexOf(":"), g = "lookupNamespaceURI" in b && 0 < g && b.lookupNamespaceURI(c2.substr(0, g)), h = false === d2 || null === d2 || d2 === n;
              h ? g ? b.removeAttributeNS(g, c2) : b.removeAttribute(c2) : d2 = d2.toString();
              8 >= a.a.W && c2 in V ? (c2 = V[c2], h ? b.removeAttribute(c2) : b[c2] = d2) : h || (g ? b.setAttributeNS(g, c2, d2) : b.setAttribute(c2, d2));
              "name" === c2 && a.a.Yc(b, h ? "" : d2);
            });
          } };
          (function() {
            a.c.checked = { after: ["value", "attr"], init: function(b, c, d) {
              function e() {
                var e2 = b.checked, f2 = g();
                if (!a.S.Ya() && (e2 || !m && !a.S.qa())) {
                  var k2 = a.u.G(c);
                  if (l2) {
                    var q2 = p ? k2.v() : k2, z = t;
                    t = f2;
                    z !== f2 ? e2 && (a.a.Na(q2, f2, true), a.a.Na(q2, z, false)) : a.a.Na(q2, f2, e2);
                    p && a.Za(k2) && k2(q2);
                  } else
                    h && (f2 === n ? f2 = e2 : e2 || (f2 = n)), a.m.eb(
                      k2,
                      d,
                      "checked",
                      f2,
                      true
                    );
                }
              }
              function f() {
                var d2 = a.a.f(c()), e2 = g();
                l2 ? (b.checked = 0 <= a.a.A(d2, e2), t = e2) : b.checked = h && e2 === n ? !!d2 : g() === d2;
              }
              var g = a.xb(function() {
                if (d.has("checkedValue"))
                  return a.a.f(d.get("checkedValue"));
                if (q)
                  return d.has("value") ? a.a.f(d.get("value")) : b.value;
              }), h = "checkbox" == b.type, m = "radio" == b.type;
              if (h || m) {
                var k = c(), l2 = h && a.a.f(k) instanceof Array, p = !(l2 && k.push && k.splice), q = m || l2, t = l2 ? g() : n;
                m && !b.name && a.c.uniqueName.init(b, function() {
                  return true;
                });
                a.o(e, null, { l: b });
                a.a.B(b, "click", e);
                a.o(f, null, { l: b });
                k = n;
              }
            } };
            a.m.wa.checked = true;
            a.c.checkedValue = { update: function(b, c) {
              b.value = a.a.f(c());
            } };
          })();
          a.c["class"] = { update: function(b, c) {
            var d = a.a.Db(a.a.f(c()));
            a.a.Eb(b, b.__ko__cssValue, false);
            b.__ko__cssValue = d;
            a.a.Eb(b, d, true);
          } };
          a.c.css = { update: function(b, c) {
            var d = a.a.f(c());
            null !== d && "object" == typeof d ? a.a.P(d, function(c2, d2) {
              d2 = a.a.f(d2);
              a.a.Eb(b, c2, d2);
            }) : a.c["class"].update(b, c);
          } };
          a.c.enable = { update: function(b, c) {
            var d = a.a.f(c());
            d && b.disabled ? b.removeAttribute("disabled") : d || b.disabled || (b.disabled = true);
          } };
          a.c.disable = { update: function(b, c) {
            a.c.enable.update(b, function() {
              return !a.a.f(c());
            });
          } };
          a.c.event = { init: function(b, c, d, e, f) {
            var g = c() || {};
            a.a.P(g, function(g2) {
              "string" == typeof g2 && a.a.B(b, g2, function(b2) {
                var k, l2 = c()[g2];
                if (l2) {
                  try {
                    var p = a.a.la(arguments);
                    e = f.$data;
                    p.unshift(e);
                    k = l2.apply(e, p);
                  } finally {
                    true !== k && (b2.preventDefault ? b2.preventDefault() : b2.returnValue = false);
                  }
                  false === d.get(g2 + "Bubble") && (b2.cancelBubble = true, b2.stopPropagation && b2.stopPropagation());
                }
              });
            });
          } };
          a.c.foreach = { Rc: function(b) {
            return function() {
              var c = b(), d = a.a.bc(c);
              if (!d || "number" == typeof d.length)
                return { foreach: c, templateEngine: a.ba.Ma };
              a.a.f(c);
              return { foreach: d.data, as: d.as, noChildContext: d.noChildContext, includeDestroyed: d.includeDestroyed, afterAdd: d.afterAdd, beforeRemove: d.beforeRemove, afterRender: d.afterRender, beforeMove: d.beforeMove, afterMove: d.afterMove, templateEngine: a.ba.Ma };
            };
          }, init: function(b, c) {
            return a.c.template.init(b, a.c.foreach.Rc(c));
          }, update: function(b, c, d, e, f) {
            return a.c.template.update(b, a.c.foreach.Rc(c), d, e, f);
          } };
          a.m.Ra.foreach = false;
          a.h.ea.foreach = true;
          a.c.hasfocus = { init: function(b, c, d) {
            function e(e2) {
              b.__ko_hasfocusUpdating = true;
              var f2 = b.ownerDocument;
              if ("activeElement" in f2) {
                var g2;
                try {
                  g2 = f2.activeElement;
                } catch (l2) {
                  g2 = f2.body;
                }
                e2 = g2 === b;
              }
              f2 = c();
              a.m.eb(f2, d, "hasfocus", e2, true);
              b.__ko_hasfocusLastValue = e2;
              b.__ko_hasfocusUpdating = false;
            }
            var f = e.bind(null, true), g = e.bind(null, false);
            a.a.B(b, "focus", f);
            a.a.B(b, "focusin", f);
            a.a.B(b, "blur", g);
            a.a.B(b, "focusout", g);
            b.__ko_hasfocusLastValue = false;
          }, update: function(b, c) {
            var d = !!a.a.f(c());
            b.__ko_hasfocusUpdating || b.__ko_hasfocusLastValue === d || (d ? b.focus() : b.blur(), !d && b.__ko_hasfocusLastValue && b.ownerDocument.body.focus(), a.u.G(a.a.Fb, null, [b, d ? "focusin" : "focusout"]));
          } };
          a.m.wa.hasfocus = true;
          a.c.hasFocus = a.c.hasfocus;
          a.m.wa.hasFocus = "hasfocus";
          a.c.html = { init: function() {
            return { controlsDescendantBindings: true };
          }, update: function(b, c) {
            a.a.fc(b, c());
          } };
          (function() {
            function b(b2, d, e) {
              a.c[b2] = { init: function(b3, c, h, m, k) {
                var l2, p, q = {}, t, x, n2;
                if (d) {
                  m = h.get("as");
                  var u = h.get("noChildContext");
                  n2 = !(m && u);
                  q = { as: m, noChildContext: u, exportDependencies: n2 };
                }
                x = (t = "render" == h.get("completeOn")) || h.has(a.i.pa);
                a.o(function() {
                  var h2 = a.a.f(c()), m2 = !e !== !h2, u2 = !p, r2;
                  if (n2 || m2 !== l2) {
                    x && (k = a.i.Cb(b3, k));
                    if (m2) {
                      if (!d || n2)
                        q.dataDependency = a.S.o();
                      r2 = d ? k.createChildContext("function" == typeof h2 ? h2 : c, q) : a.S.qa() ? k.extend(null, q) : k;
                    }
                    u2 && a.S.qa() && (p = a.a.Ca(a.h.childNodes(b3), true));
                    m2 ? (u2 || a.h.va(b3, a.a.Ca(p)), a.Oa(r2, b3)) : (a.h.Ea(b3), t || a.i.ma(b3, a.i.H));
                    l2 = m2;
                  }
                }, null, { l: b3 });
                return { controlsDescendantBindings: true };
              } };
              a.m.Ra[b2] = false;
              a.h.ea[b2] = true;
            }
            b("if");
            b("ifnot", false, true);
            b("with", true);
          })();
          a.c.let = { init: function(b, c, d, e, f) {
            c = f.extend(c);
            a.Oa(c, b);
            return { controlsDescendantBindings: true };
          } };
          a.h.ea.let = true;
          var Q = {};
          a.c.options = { init: function(b) {
            if ("select" !== a.a.R(b))
              throw Error("options binding applies only to SELECT elements");
            for (; 0 < b.length; )
              b.remove(0);
            return { controlsDescendantBindings: true };
          }, update: function(b, c, d) {
            function e() {
              return a.a.jb(b.options, function(a2) {
                return a2.selected;
              });
            }
            function f(a2, b2, c2) {
              var d2 = typeof b2;
              return "function" == d2 ? b2(a2) : "string" == d2 ? a2[b2] : c2;
            }
            function g(c2, d2) {
              if (x && l2)
                a.i.ma(b, a.i.H);
              else if (t.length) {
                var e2 = 0 <= a.a.A(t, a.w.M(d2[0]));
                a.a.Zc(d2[0], e2);
                x && !e2 && a.u.G(a.a.Fb, null, [b, "change"]);
              }
            }
            var h = b.multiple, m = 0 != b.length && h ? b.scrollTop : null, k = a.a.f(c()), l2 = d.get("valueAllowUnset") && d.has("value"), p = d.get("optionsIncludeDestroyed");
            c = {};
            var q, t = [];
            l2 || (h ? t = a.a.Mb(e(), a.w.M) : 0 <= b.selectedIndex && t.push(a.w.M(b.options[b.selectedIndex])));
            k && ("undefined" == typeof k.length && (k = [k]), q = a.a.jb(k, function(b2) {
              return p || b2 === n || null === b2 || !a.a.f(b2._destroy);
            }), d.has("optionsCaption") && (k = a.a.f(d.get("optionsCaption")), null !== k && k !== n && q.unshift(Q)));
            var x = false;
            c.beforeRemove = function(a2) {
              b.removeChild(a2);
            };
            k = g;
            d.has("optionsAfterRender") && "function" == typeof d.get("optionsAfterRender") && (k = function(b2, c2) {
              g(0, c2);
              a.u.G(d.get("optionsAfterRender"), null, [c2[0], b2 !== Q ? b2 : n]);
            });
            a.a.ec(b, q, function(c2, e2, g2) {
              g2.length && (t = !l2 && g2[0].selected ? [a.w.M(g2[0])] : [], x = true);
              e2 = b.ownerDocument.createElement("option");
              c2 === Q ? (a.a.Bb(e2, d.get("optionsCaption")), a.w.cb(e2, n)) : (g2 = f(c2, d.get("optionsValue"), c2), a.w.cb(e2, a.a.f(g2)), c2 = f(c2, d.get("optionsText"), g2), a.a.Bb(e2, c2));
              return [e2];
            }, c, k);
            if (!l2) {
              var B;
              h ? B = t.length && e().length < t.length : B = t.length && 0 <= b.selectedIndex ? a.w.M(b.options[b.selectedIndex]) !== t[0] : t.length || 0 <= b.selectedIndex;
              B && a.u.G(a.a.Fb, null, [b, "change"]);
            }
            (l2 || a.S.Ya()) && a.i.ma(b, a.i.H);
            a.a.wd(b);
            m && 20 < Math.abs(m - b.scrollTop) && (b.scrollTop = m);
          } };
          a.c.options.$b = a.a.g.Z();
          a.c.selectedOptions = { init: function(b, c, d) {
            function e() {
              var e2 = c(), f2 = [];
              a.a.D(b.getElementsByTagName("option"), function(b2) {
                b2.selected && f2.push(a.w.M(b2));
              });
              a.m.eb(
                e2,
                d,
                "selectedOptions",
                f2
              );
            }
            function f() {
              var d2 = a.a.f(c()), e2 = b.scrollTop;
              d2 && "number" == typeof d2.length && a.a.D(b.getElementsByTagName("option"), function(b2) {
                var c2 = 0 <= a.a.A(d2, a.w.M(b2));
                b2.selected != c2 && a.a.Zc(b2, c2);
              });
              b.scrollTop = e2;
            }
            if ("select" != a.a.R(b))
              throw Error("selectedOptions binding applies only to SELECT elements");
            var g;
            a.i.subscribe(b, a.i.H, function() {
              g ? e() : (a.a.B(b, "change", e), g = a.o(f, null, { l: b }));
            }, null, { notifyImmediately: true });
          }, update: function() {
          } };
          a.m.wa.selectedOptions = true;
          a.c.style = { update: function(b, c) {
            var d = a.a.f(c() || {});
            a.a.P(d, function(c2, d2) {
              d2 = a.a.f(d2);
              if (null === d2 || d2 === n || false === d2)
                d2 = "";
              if (v)
                v(b).css(c2, d2);
              else if (/^--/.test(c2))
                b.style.setProperty(c2, d2);
              else {
                c2 = c2.replace(/-(\w)/g, function(a2, b2) {
                  return b2.toUpperCase();
                });
                var g = b.style[c2];
                b.style[c2] = d2;
                d2 === g || b.style[c2] != g || isNaN(d2) || (b.style[c2] = d2 + "px");
              }
            });
          } };
          a.c.submit = { init: function(b, c, d, e, f) {
            if ("function" != typeof c())
              throw Error("The value for a submit binding must be a function");
            a.a.B(b, "submit", function(a2) {
              var d2, e2 = c();
              try {
                d2 = e2.call(f.$data, b);
              } finally {
                true !== d2 && (a2.preventDefault ? a2.preventDefault() : a2.returnValue = false);
              }
            });
          } };
          a.c.text = { init: function() {
            return { controlsDescendantBindings: true };
          }, update: function(b, c) {
            a.a.Bb(b, c());
          } };
          a.h.ea.text = true;
          (function() {
            if (A && A.navigator) {
              var b = function(a2) {
                if (a2)
                  return parseFloat(a2[1]);
              }, c = A.navigator.userAgent, d, e, f, g, h;
              (d = A.opera && A.opera.version && parseInt(A.opera.version())) || (h = b(c.match(/Edge\/([^ ]+)$/))) || b(c.match(/Chrome\/([^ ]+)/)) || (e = b(c.match(/Version\/([^ ]+) Safari/))) || (f = b(c.match(/Firefox\/([^ ]+)/))) || (g = a.a.W || b(c.match(/MSIE ([^ ]+)/))) || (g = b(c.match(/rv:([^ )]+)/)));
            }
            if (8 <= g && 10 > g)
              var m = a.a.g.Z(), k = a.a.g.Z(), l2 = function(b2) {
                var c2 = this.activeElement;
                (c2 = c2 && a.a.g.get(c2, k)) && c2(b2);
              }, p = function(b2, c2) {
                var d2 = b2.ownerDocument;
                a.a.g.get(d2, m) || (a.a.g.set(d2, m, true), a.a.B(d2, "selectionchange", l2));
                a.a.g.set(b2, k, c2);
              };
            a.c.textInput = { init: function(b2, c2, k2) {
              function l3(c3, d2) {
                a.a.B(b2, c3, d2);
              }
              function m2() {
                var d2 = a.a.f(c2());
                if (null === d2 || d2 === n)
                  d2 = "";
                L !== n && d2 === L ? a.a.setTimeout(m2, 4) : b2.value !== d2 && (y = true, b2.value = d2, y = false, v2 = b2.value);
              }
              function r2() {
                w2 || (L = b2.value, w2 = a.a.setTimeout(
                  z,
                  4
                ));
              }
              function z() {
                clearTimeout(w2);
                L = w2 = n;
                var d2 = b2.value;
                v2 !== d2 && (v2 = d2, a.m.eb(c2(), k2, "textInput", d2));
              }
              var v2 = b2.value, w2, L, A2 = 9 == a.a.W ? r2 : z, y = false;
              g && l3("keypress", z);
              11 > g && l3("propertychange", function(a2) {
                y || "value" !== a2.propertyName || A2(a2);
              });
              8 == g && (l3("keyup", z), l3("keydown", z));
              p && (p(b2, A2), l3("dragend", r2));
              (!g || 9 <= g) && l3("input", A2);
              5 > e && "textarea" === a.a.R(b2) ? (l3("keydown", r2), l3("paste", r2), l3("cut", r2)) : 11 > d ? l3("keydown", r2) : 4 > f ? (l3("DOMAutoComplete", z), l3("dragdrop", z), l3("drop", z)) : h && "number" === b2.type && l3("keydown", r2);
              l3(
                "change",
                z
              );
              l3("blur", z);
              a.o(m2, null, { l: b2 });
            } };
            a.m.wa.textInput = true;
            a.c.textinput = { preprocess: function(a2, b2, c2) {
              c2("textInput", a2);
            } };
          })();
          a.c.uniqueName = { init: function(b, c) {
            if (c()) {
              var d = "ko_unique_" + ++a.c.uniqueName.rd;
              a.a.Yc(b, d);
            }
          } };
          a.c.uniqueName.rd = 0;
          a.c.using = { init: function(b, c, d, e, f) {
            var g;
            d.has("as") && (g = { as: d.get("as"), noChildContext: d.get("noChildContext") });
            c = f.createChildContext(c, g);
            a.Oa(c, b);
            return { controlsDescendantBindings: true };
          } };
          a.h.ea.using = true;
          a.c.value = { init: function(b, c, d) {
            var e = a.a.R(b), f = "input" == e;
            if (!f || "checkbox" != b.type && "radio" != b.type) {
              var g = [], h = d.get("valueUpdate"), m = false, k = null;
              h && ("string" == typeof h ? g = [h] : g = a.a.wc(h), a.a.Pa(g, "change"));
              var l2 = function() {
                k = null;
                m = false;
                var e2 = c(), f2 = a.w.M(b);
                a.m.eb(e2, d, "value", f2);
              };
              !a.a.W || !f || "text" != b.type || "off" == b.autocomplete || b.form && "off" == b.form.autocomplete || -1 != a.a.A(g, "propertychange") || (a.a.B(b, "propertychange", function() {
                m = true;
              }), a.a.B(b, "focus", function() {
                m = false;
              }), a.a.B(b, "blur", function() {
                m && l2();
              }));
              a.a.D(g, function(c2) {
                var d2 = l2;
                a.a.Ud(c2, "after") && (d2 = function() {
                  k = a.w.M(b);
                  a.a.setTimeout(l2, 0);
                }, c2 = c2.substring(5));
                a.a.B(b, c2, d2);
              });
              var p;
              p = f && "file" == b.type ? function() {
                var d2 = a.a.f(c());
                null === d2 || d2 === n || "" === d2 ? b.value = "" : a.u.G(l2);
              } : function() {
                var f2 = a.a.f(c()), g2 = a.w.M(b);
                if (null !== k && f2 === k)
                  a.a.setTimeout(p, 0);
                else if (f2 !== g2 || g2 === n)
                  "select" === e ? (g2 = d.get("valueAllowUnset"), a.w.cb(b, f2, g2), g2 || f2 === a.w.M(b) || a.u.G(l2)) : a.w.cb(b, f2);
              };
              if ("select" === e) {
                var q;
                a.i.subscribe(
                  b,
                  a.i.H,
                  function() {
                    q ? d.get("valueAllowUnset") ? p() : l2() : (a.a.B(b, "change", l2), q = a.o(p, null, { l: b }));
                  },
                  null,
                  { notifyImmediately: true }
                );
              } else
                a.a.B(b, "change", l2), a.o(p, null, { l: b });
            } else
              a.ib(b, { checkedValue: c });
          }, update: function() {
          } };
          a.m.wa.value = true;
          a.c.visible = { update: function(b, c) {
            var d = a.a.f(c()), e = "none" != b.style.display;
            d && !e ? b.style.display = "" : !d && e && (b.style.display = "none");
          } };
          a.c.hidden = { update: function(b, c) {
            a.c.visible.update(b, function() {
              return !a.a.f(c());
            });
          } };
          (function(b) {
            a.c[b] = { init: function(c, d, e, f, g) {
              return a.c.event.init.call(this, c, function() {
                var a2 = {};
                a2[b] = d();
                return a2;
              }, e, f, g);
            } };
          })("click");
          a.ca = function() {
          };
          a.ca.prototype.renderTemplateSource = function() {
            throw Error("Override renderTemplateSource");
          };
          a.ca.prototype.createJavaScriptEvaluatorBlock = function() {
            throw Error("Override createJavaScriptEvaluatorBlock");
          };
          a.ca.prototype.makeTemplateSource = function(b, c) {
            if ("string" == typeof b) {
              c = c || w;
              var d = c.getElementById(b);
              if (!d)
                throw Error("Cannot find template with ID " + b);
              return new a.C.F(d);
            }
            if (1 == b.nodeType || 8 == b.nodeType)
              return new a.C.ia(b);
            throw Error("Unknown template type: " + b);
          };
          a.ca.prototype.renderTemplate = function(a2, c, d, e) {
            a2 = this.makeTemplateSource(a2, e);
            return this.renderTemplateSource(a2, c, d, e);
          };
          a.ca.prototype.isTemplateRewritten = function(a2, c) {
            return false === this.allowTemplateRewriting ? true : this.makeTemplateSource(a2, c).data("isRewritten");
          };
          a.ca.prototype.rewriteTemplate = function(a2, c, d) {
            a2 = this.makeTemplateSource(a2, d);
            c = c(a2.text());
            a2.text(c);
            a2.data("isRewritten", true);
          };
          a.b("templateEngine", a.ca);
          a.kc = function() {
            function b(b2, c2, d2, h) {
              b2 = a.m.ac(b2);
              for (var m = a.m.Ra, k = 0; k < b2.length; k++) {
                var l2 = b2[k].key;
                if (Object.prototype.hasOwnProperty.call(
                  m,
                  l2
                )) {
                  var p = m[l2];
                  if ("function" === typeof p) {
                    if (l2 = p(b2[k].value))
                      throw Error(l2);
                  } else if (!p)
                    throw Error("This template engine does not support the '" + l2 + "' binding within its templates");
                }
              }
              d2 = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + a.m.vb(b2, { valueAccessors: true }) + " } })()},'" + d2.toLowerCase() + "')";
              return h.createJavaScriptEvaluatorBlock(d2) + c2;
            }
            var c = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi, d = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
            return { xd: function(b2, c2, d2) {
              c2.isTemplateRewritten(b2, d2) || c2.rewriteTemplate(b2, function(b3) {
                return a.kc.Ld(b3, c2);
              }, d2);
            }, Ld: function(a2, f) {
              return a2.replace(c, function(a3, c2, d2, e, l2) {
                return b(l2, c2, d2, f);
              }).replace(d, function(a3, c2) {
                return b(c2, "<!-- ko -->", "#comment", f);
              });
            }, md: function(b2, c2) {
              return a.aa.Xb(function(d2, h) {
                var m = d2.nextSibling;
                m && m.nodeName.toLowerCase() === c2 && a.ib(m, b2, h);
              });
            } };
          }();
          a.b("__tr_ambtns", a.kc.md);
          (function() {
            a.C = {};
            a.C.F = function(b2) {
              if (this.F = b2) {
                var c2 = a.a.R(b2);
                this.ab = "script" === c2 ? 1 : "textarea" === c2 ? 2 : "template" == c2 && b2.content && 11 === b2.content.nodeType ? 3 : 4;
              }
            };
            a.C.F.prototype.text = function() {
              var b2 = 1 === this.ab ? "text" : 2 === this.ab ? "value" : "innerHTML";
              if (0 == arguments.length)
                return this.F[b2];
              var c2 = arguments[0];
              "innerHTML" === b2 ? a.a.fc(this.F, c2) : this.F[b2] = c2;
            };
            var b = a.a.g.Z() + "_";
            a.C.F.prototype.data = function(c2) {
              if (1 === arguments.length)
                return a.a.g.get(this.F, b + c2);
              a.a.g.set(this.F, b + c2, arguments[1]);
            };
            var c = a.a.g.Z();
            a.C.F.prototype.nodes = function() {
              var b2 = this.F;
              if (0 == arguments.length) {
                var e = a.a.g.get(b2, c) || {}, f = e.lb || (3 === this.ab ? b2.content : 4 === this.ab ? b2 : n);
                if (!f || e.jd) {
                  var g = this.text();
                  g && g !== e.bb && (f = a.a.Md(g, b2.ownerDocument), a.a.g.set(b2, c, { lb: f, bb: g, jd: true }));
                }
                return f;
              }
              e = arguments[0];
              this.ab !== n && this.text("");
              a.a.g.set(b2, c, { lb: e });
            };
            a.C.ia = function(a2) {
              this.F = a2;
            };
            a.C.ia.prototype = new a.C.F();
            a.C.ia.prototype.constructor = a.C.ia;
            a.C.ia.prototype.text = function() {
              if (0 == arguments.length) {
                var b2 = a.a.g.get(this.F, c) || {};
                b2.bb === n && b2.lb && (b2.bb = b2.lb.innerHTML);
                return b2.bb;
              }
              a.a.g.set(
                this.F,
                c,
                { bb: arguments[0] }
              );
            };
            a.b("templateSources", a.C);
            a.b("templateSources.domElement", a.C.F);
            a.b("templateSources.anonymousTemplate", a.C.ia);
          })();
          (function() {
            function b(b2, c2, d2) {
              var e2;
              for (c2 = a.h.nextSibling(c2); b2 && (e2 = b2) !== c2; )
                b2 = a.h.nextSibling(e2), d2(e2, b2);
            }
            function c(c2, d2) {
              if (c2.length) {
                var e2 = c2[0], f2 = c2[c2.length - 1], g2 = e2.parentNode, h2 = a.ga.instance, m2 = h2.preprocessNode;
                if (m2) {
                  b(e2, f2, function(a2, b2) {
                    var c3 = a2.previousSibling, d3 = m2.call(h2, a2);
                    d3 && (a2 === e2 && (e2 = d3[0] || b2), a2 === f2 && (f2 = d3[d3.length - 1] || c3));
                  });
                  c2.length = 0;
                  if (!e2)
                    return;
                  e2 === f2 ? c2.push(e2) : (c2.push(e2, f2), a.a.Ua(c2, g2));
                }
                b(e2, f2, function(b2) {
                  1 !== b2.nodeType && 8 !== b2.nodeType || a.vc(d2, b2);
                });
                b(e2, f2, function(b2) {
                  1 !== b2.nodeType && 8 !== b2.nodeType || a.aa.cd(b2, [d2]);
                });
                a.a.Ua(c2, g2);
              }
            }
            function d(a2) {
              return a2.nodeType ? a2 : 0 < a2.length ? a2[0] : null;
            }
            function e(b2, e2, f2, h2, m2) {
              m2 = m2 || {};
              var n2 = (b2 && d(b2) || f2 || {}).ownerDocument, B = m2.templateEngine || g;
              a.kc.xd(f2, B, n2);
              f2 = B.renderTemplate(f2, h2, m2, n2);
              if ("number" != typeof f2.length || 0 < f2.length && "number" != typeof f2[0].nodeType)
                throw Error("Template engine must return an array of DOM nodes");
              n2 = false;
              switch (e2) {
                case "replaceChildren":
                  a.h.va(
                    b2,
                    f2
                  );
                  n2 = true;
                  break;
                case "replaceNode":
                  a.a.Xc(b2, f2);
                  n2 = true;
                  break;
                case "ignoreTargetNode":
                  break;
                default:
                  throw Error("Unknown renderMode: " + e2);
              }
              n2 && (c(f2, h2), m2.afterRender && a.u.G(m2.afterRender, null, [f2, h2[m2.as || "$data"]]), "replaceChildren" == e2 && a.i.ma(b2, a.i.H));
              return f2;
            }
            function f(b2, c2, d2) {
              return a.O(b2) ? b2() : "function" === typeof b2 ? b2(c2, d2) : b2;
            }
            var g;
            a.gc = function(b2) {
              if (b2 != n && !(b2 instanceof a.ca))
                throw Error("templateEngine must inherit from ko.templateEngine");
              g = b2;
            };
            a.dc = function(b2, c2, h2, m2, t) {
              h2 = h2 || {};
              if ((h2.templateEngine || g) == n)
                throw Error("Set a template engine before calling renderTemplate");
              t = t || "replaceChildren";
              if (m2) {
                var x = d(m2);
                return a.$(function() {
                  var g2 = c2 && c2 instanceof a.fa ? c2 : new a.fa(c2, null, null, null, { exportDependencies: true }), n2 = f(b2, g2.$data, g2), g2 = e(m2, t, n2, g2, h2);
                  "replaceNode" == t && (m2 = g2, x = d(m2));
                }, null, { Sa: function() {
                  return !x || !a.a.Sb(x);
                }, l: x && "replaceNode" == t ? x.parentNode : x });
              }
              return a.aa.Xb(function(d2) {
                a.dc(b2, c2, h2, d2, "replaceNode");
              });
            };
            a.Qd = function(b2, d2, g2, h2, m2) {
              function x(b3, c2) {
                a.u.G(a.a.ec, null, [h2, b3, u, g2, r2, c2]);
                a.i.ma(h2, a.i.H);
              }
              function r2(a2, b3) {
                c(b3, v2);
                g2.afterRender && g2.afterRender(b3, a2);
                v2 = null;
              }
              function u(a2, c2) {
                v2 = m2.createChildContext(a2, { as: z, noChildContext: g2.noChildContext, extend: function(a3) {
                  a3.$index = c2;
                  z && (a3[z + "Index"] = c2);
                } });
                var d3 = f(b2, a2, v2);
                return e(h2, "ignoreTargetNode", d3, v2, g2);
              }
              var v2, z = g2.as, w2 = false === g2.includeDestroyed || a.options.foreachHidesDestroyed && !g2.includeDestroyed;
              if (w2 || g2.beforeRemove || !a.Pc(d2))
                return a.$(function() {
                  var b3 = a.a.f(d2) || [];
                  "undefined" == typeof b3.length && (b3 = [b3]);
                  w2 && (b3 = a.a.jb(b3, function(b4) {
                    return b4 === n || null === b4 || !a.a.f(b4._destroy);
                  }));
                  x(b3);
                }, null, { l: h2 });
              x(d2.v());
              var A2 = d2.subscribe(function(a2) {
                x(d2(), a2);
              }, null, "arrayChange");
              A2.l(h2);
              return A2;
            };
            var h = a.a.g.Z(), m = a.a.g.Z();
            a.c.template = { init: function(b2, c2) {
              var d2 = a.a.f(c2());
              if ("string" == typeof d2 || "name" in d2)
                a.h.Ea(b2);
              else if ("nodes" in d2) {
                d2 = d2.nodes || [];
                if (a.O(d2))
                  throw Error('The "nodes" option must be a plain, non-observable array.');
                var e2 = d2[0] && d2[0].parentNode;
                e2 && a.a.g.get(e2, m) || (e2 = a.a.Yb(d2), a.a.g.set(e2, m, true));
                new a.C.ia(b2).nodes(e2);
              } else if (d2 = a.h.childNodes(b2), 0 < d2.length)
                e2 = a.a.Yb(d2), new a.C.ia(b2).nodes(e2);
              else
                throw Error("Anonymous template defined, but no template content was provided");
              return { controlsDescendantBindings: true };
            }, update: function(b2, c2, d2, e2, f2) {
              var g2 = c2();
              c2 = a.a.f(g2);
              d2 = true;
              e2 = null;
              "string" == typeof c2 ? c2 = {} : (g2 = "name" in c2 ? c2.name : b2, "if" in c2 && (d2 = a.a.f(c2["if"])), d2 && "ifnot" in c2 && (d2 = !a.a.f(c2.ifnot)), d2 && !g2 && (d2 = false));
              "foreach" in c2 ? e2 = a.Qd(g2, d2 && c2.foreach || [], c2, b2, f2) : d2 ? (d2 = f2, "data" in c2 && (d2 = f2.createChildContext(c2.data, { as: c2.as, noChildContext: c2.noChildContext, exportDependencies: true })), e2 = a.dc(g2, d2, c2, b2)) : a.h.Ea(b2);
              f2 = e2;
              (c2 = a.a.g.get(b2, h)) && "function" == typeof c2.s && c2.s();
              a.a.g.set(b2, h, !f2 || f2.ja && !f2.ja() ? n : f2);
            } };
            a.m.Ra.template = function(b2) {
              b2 = a.m.ac(b2);
              return 1 == b2.length && b2[0].unknown || a.m.Id(b2, "name") ? null : "This template engine does not support anonymous templates nested within its templates";
            };
            a.h.ea.template = true;
          })();
          a.b("setTemplateEngine", a.gc);
          a.b("renderTemplate", a.dc);
          a.a.Kc = function(a2, c, d) {
            if (a2.length && c.length) {
              var e, f, g, h, m;
              for (e = f = 0; (!d || e < d) && (h = a2[f]); ++f) {
                for (g = 0; m = c[g]; ++g)
                  if (h.value === m.value) {
                    h.moved = m.index;
                    m.moved = h.index;
                    c.splice(g, 1);
                    e = g = 0;
                    break;
                  }
                e += g;
              }
            }
          };
          a.a.Pb = function() {
            function b(b2, d, e, f, g) {
              var h = Math.min, m = Math.max, k = [], l2, p = b2.length, q, n2 = d.length, r2 = n2 - p || 1, v2 = p + n2 + 1, u, w2, z;
              for (l2 = 0; l2 <= p; l2++)
                for (w2 = u, k.push(u = []), z = h(n2, l2 + r2), q = m(0, l2 - 1); q <= z; q++)
                  u[q] = q ? l2 ? b2[l2 - 1] === d[q - 1] ? w2[q - 1] : h(w2[q] || v2, u[q - 1] || v2) + 1 : q + 1 : l2 + 1;
              h = [];
              m = [];
              r2 = [];
              l2 = p;
              for (q = n2; l2 || q; )
                n2 = k[l2][q] - 1, q && n2 === k[l2][q - 1] ? m.push(h[h.length] = { status: e, value: d[--q], index: q }) : l2 && n2 === k[l2 - 1][q] ? r2.push(h[h.length] = { status: f, value: b2[--l2], index: l2 }) : (--q, --l2, g.sparse || h.push({ status: "retained", value: d[q] }));
              a.a.Kc(r2, m, !g.dontLimitMoves && 10 * p);
              return h.reverse();
            }
            return function(a2, d, e) {
              e = "boolean" === typeof e ? { dontLimitMoves: e } : e || {};
              a2 = a2 || [];
              d = d || [];
              return a2.length < d.length ? b(a2, d, "added", "deleted", e) : b(d, a2, "deleted", "added", e);
            };
          }();
          a.b("utils.compareArrays", a.a.Pb);
          (function() {
            function b(b2, c2, d2, h, m) {
              var k = [], l2 = a.$(function() {
                var l3 = c2(d2, m, a.a.Ua(k, b2)) || [];
                0 < k.length && (a.a.Xc(k, l3), h && a.u.G(h, null, [d2, l3, m]));
                k.length = 0;
                a.a.Nb(k, l3);
              }, null, { l: b2, Sa: function() {
                return !a.a.kd(k);
              } });
              return { Y: k, $: l2.ja() ? l2 : n };
            }
            var c = a.a.g.Z(), d = a.a.g.Z();
            a.a.ec = function(e, f, g, h, m, k) {
              function l2(b2) {
                y = { Aa: b2, pb: a.ta(w2++) };
                v2.push(y);
                r2 || F2.push(y);
              }
              function p(b2) {
                y = t[b2];
                w2 !== y.pb.v() && D2.push(y);
                y.pb(w2++);
                a.a.Ua(y.Y, e);
                v2.push(y);
              }
              function q(b2, c2) {
                if (b2)
                  for (var d2 = 0, e2 = c2.length; d2 < e2; d2++)
                    a.a.D(c2[d2].Y, function(a2) {
                      b2(a2, d2, c2[d2].Aa);
                    });
              }
              f = f || [];
              "undefined" == typeof f.length && (f = [f]);
              h = h || {};
              var t = a.a.g.get(e, c), r2 = !t, v2 = [], u = 0, w2 = 0, z = [], A2 = [], C2 = [], D2 = [], F2 = [], y, I2 = 0;
              if (r2)
                a.a.D(f, l2);
              else {
                if (!k || t && t._countWaitingForRemove) {
                  var E = a.a.Mb(t, function(a2) {
                    return a2.Aa;
                  });
                  k = a.a.Pb(E, f, { dontLimitMoves: h.dontLimitMoves, sparse: true });
                }
                for (var E = 0, G2, H2, K2; G2 = k[E]; E++)
                  switch (H2 = G2.moved, K2 = G2.index, G2.status) {
                    case "deleted":
                      for (; u < K2; )
                        p(u++);
                      H2 === n && (y = t[u], y.$ && (y.$.s(), y.$ = n), a.a.Ua(y.Y, e).length && (h.beforeRemove && (v2.push(y), I2++, y.Aa === d ? y = null : C2.push(y)), y && z.push.apply(z, y.Y)));
                      u++;
                      break;
                    case "added":
                      for (; w2 < K2; )
                        p(u++);
                      H2 !== n ? (A2.push(v2.length), p(H2)) : l2(G2.value);
                  }
                for (; w2 < f.length; )
                  p(u++);
                v2._countWaitingForRemove = I2;
              }
              a.a.g.set(e, c, v2);
              q(h.beforeMove, D2);
              a.a.D(
                z,
                h.beforeRemove ? a.oa : a.removeNode
              );
              var M, O, P;
              try {
                P = e.ownerDocument.activeElement;
              } catch (N2) {
              }
              if (A2.length)
                for (; (E = A2.shift()) != n; ) {
                  y = v2[E];
                  for (M = n; E; )
                    if ((O = v2[--E].Y) && O.length) {
                      M = O[O.length - 1];
                      break;
                    }
                  for (f = 0; u = y.Y[f]; M = u, f++)
                    a.h.Wb(e, u, M);
                }
              for (E = 0; y = v2[E]; E++) {
                y.Y || a.a.extend(y, b(e, g, y.Aa, m, y.pb));
                for (f = 0; u = y.Y[f]; M = u, f++)
                  a.h.Wb(e, u, M);
                !y.Ed && m && (m(y.Aa, y.Y, y.pb), y.Ed = true, M = y.Y[y.Y.length - 1]);
              }
              P && e.ownerDocument.activeElement != P && P.focus();
              q(h.beforeRemove, C2);
              for (E = 0; E < C2.length; ++E)
                C2[E].Aa = d;
              q(h.afterMove, D2);
              q(h.afterAdd, F2);
            };
          })();
          a.b("utils.setDomNodeChildrenFromArrayMapping", a.a.ec);
          a.ba = function() {
            this.allowTemplateRewriting = false;
          };
          a.ba.prototype = new a.ca();
          a.ba.prototype.constructor = a.ba;
          a.ba.prototype.renderTemplateSource = function(b, c, d, e) {
            if (c = (9 > a.a.W ? 0 : b.nodes) ? b.nodes() : null)
              return a.a.la(c.cloneNode(true).childNodes);
            b = b.text();
            return a.a.ua(b, e);
          };
          a.ba.Ma = new a.ba();
          a.gc(a.ba.Ma);
          a.b("nativeTemplateEngine", a.ba);
          (function() {
            a.$a = function() {
              var a2 = this.Hd = function() {
                if (!v || !v.tmpl)
                  return 0;
                try {
                  if (0 <= v.tmpl.tag.tmpl.open.toString().indexOf("__"))
                    return 2;
                } catch (a3) {
                }
                return 1;
              }();
              this.renderTemplateSource = function(b2, e, f, g) {
                g = g || w;
                f = f || {};
                if (2 > a2)
                  throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
                var h = b2.data("precompiled");
                h || (h = b2.text() || "", h = v.template(null, "{{ko_with $item.koBindingContext}}" + h + "{{/ko_with}}"), b2.data("precompiled", h));
                b2 = [e.$data];
                e = v.extend({ koBindingContext: e }, f.templateOptions);
                e = v.tmpl(h, b2, e);
                e.appendTo(g.createElement("div"));
                v.fragments = {};
                return e;
              };
              this.createJavaScriptEvaluatorBlock = function(a3) {
                return "{{ko_code ((function() { return " + a3 + " })()) }}";
              };
              this.addTemplate = function(a3, b2) {
                w.write("<script type='text/html' id='" + a3 + "'>" + b2 + "</script>");
              };
              0 < a2 && (v.tmpl.tag.ko_code = { open: "__.push($1 || '');" }, v.tmpl.tag.ko_with = { open: "with($1) {", close: "} " });
            };
            a.$a.prototype = new a.ca();
            a.$a.prototype.constructor = a.$a;
            var b = new a.$a();
            0 < b.Hd && a.gc(b);
            a.b("jqueryTmplTemplateEngine", a.$a);
          })();
        });
      })();
    })();
  }
});

// node_modules/uri-js/dist/es5/uri.all.js
var require_uri_all = __commonJS({
  "node_modules/uri-js/dist/es5/uri.all.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.URI = global.URI || {});
    })(exports, function(exports2) {
      "use strict";
      function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
          sets[_key] = arguments[_key];
        }
        if (sets.length > 1) {
          sets[0] = sets[0].slice(0, -1);
          var xl = sets.length - 1;
          for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
          }
          sets[xl] = sets[xl].slice(1);
          return sets.join("");
        } else {
          return sets[0];
        }
      }
      function subexp(str) {
        return "(?:" + str + ")";
      }
      function typeOf(o) {
        return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
      }
      function toUpperCase(str) {
        return str.toUpperCase();
      }
      function toArray(obj) {
        return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
      }
      function assign(target, source) {
        var obj = target;
        if (source) {
          for (var key in source) {
            obj[key] = source[key];
          }
        }
        return obj;
      }
      function buildExps(isIRI2) {
        var ALPHA$$ = "[A-Za-z]", CR$ = "[\\x0D]", DIGIT$$ = "[0-9]", DQUOTE$$ = "[\\x22]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), LF$$ = "[\\x0A]", SP$$ = "[\\x20]", PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI2 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI2 ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$), SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"), USERINFO$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*"), DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$), DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+"), IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$), IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + ZONEID$), IPVFUTURE$ = subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+"), IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"), REG_NAME$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*"), HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")|" + REG_NAME$), PORT$ = subexp(DIGIT$$ + "*"), AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"), PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]")), SEGMENT$ = subexp(PCHAR$ + "*"), SEGMENT_NZ$ = subexp(PCHAR$ + "+"), SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+"), PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"), PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"), PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$), PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$), PATH_EMPTY$ = "(?!" + PCHAR$ + ")", PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"), FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"), HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$), RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$), ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"), GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$", SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
        return {
          NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
          NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
          NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
          ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
          OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
          PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
          IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
          IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
          //RFC 6874, with relaxed parsing rules
        };
      }
      var URI_PROTOCOL = buildExps(false);
      var IRI_PROTOCOL = buildExps(true);
      var slicedToArray = function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err2) {
            _d = true;
            _e = err2;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var maxInt = 2147483647;
      var base = 36;
      var tMin = 1;
      var tMax = 26;
      var skew = 38;
      var damp = 700;
      var initialBias = 72;
      var initialN = 128;
      var delimiter = "-";
      var regexPunycode = /^xn--/;
      var regexNonASCII = /[^\0-\x7E]/;
      var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
      var errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      };
      var baseMinusTMin = base - tMin;
      var floor = Math.floor;
      var stringFromCharCode = String.fromCharCode;
      function error$1(type) {
        throw new RangeError(errors[type]);
      }
      function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      var ucs2encode = function ucs2encode2(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
      };
      var basicToDigit = function basicToDigit2(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      };
      var digitToBasic = function digitToBasic2(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      };
      var adapt = function adapt2(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (
          ;
          /* no initialization */
          delta > baseMinusTMin * tMax >> 1;
          k += base
        ) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      };
      var decode = function decode2(input) {
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error$1("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          var oldi = i;
          for (
            var w = 1, k = base;
            ;
            /* no condition */
            k += base
          ) {
            if (index >= inputLength) {
              error$1("invalid-input");
            }
            var digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error$1("overflow");
            }
            i += digit * w;
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
              break;
            }
            var baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error$1("overflow");
            }
            w *= baseMinusT;
          }
          var out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error$1("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(String, output);
      };
      var encode = function encode2(input) {
        var output = [];
        input = ucs2decode(input);
        var inputLength = input.length;
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _currentValue2 = _step.value;
            if (_currentValue2 < 128) {
              output.push(stringFromCharCode(_currentValue2));
            }
          }
        } catch (err2) {
          _didIteratorError = true;
          _iteratorError = err2;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          var m = maxInt;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var currentValue = _step2.value;
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
          } catch (err2) {
            _didIteratorError2 = true;
            _iteratorError2 = err2;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error$1("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _currentValue = _step3.value;
              if (_currentValue < n && ++delta > maxInt) {
                error$1("overflow");
              }
              if (_currentValue == n) {
                var q = delta;
                for (
                  var k = base;
                  ;
                  /* no condition */
                  k += base
                ) {
                  var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  var qMinusT = q - t;
                  var baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
          } catch (err2) {
            _didIteratorError3 = true;
            _iteratorError3 = err2;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      };
      var toUnicode = function toUnicode2(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      };
      var toASCII = function toASCII2(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      };
      var punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        "version": "2.1.0",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      var SCHEMES = {};
      function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16)
          e = "%0" + c.toString(16).toUpperCase();
        else if (c < 128)
          e = "%" + c.toString(16).toUpperCase();
        else if (c < 2048)
          e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        else
          e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
      }
      function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
          var c = parseInt(str.substr(i + 1, 2), 16);
          if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
          } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
              var c2 = parseInt(str.substr(i + 4, 2), 16);
              newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
              newStr += str.substr(i, 6);
            }
            i += 6;
          } else if (c >= 224) {
            if (il - i >= 9) {
              var _c = parseInt(str.substr(i + 4, 2), 16);
              var c3 = parseInt(str.substr(i + 7, 2), 16);
              newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
              newStr += str.substr(i, 9);
            }
            i += 9;
          } else {
            newStr += str.substr(i, 3);
            i += 3;
          }
        }
        return newStr;
      }
      function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved2(str) {
          var decStr = pctDecChars(str);
          return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme)
          components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== void 0)
          components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== void 0)
          components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== void 0)
          components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== void 0)
          components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== void 0)
          components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
      }
      function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
      }
      function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];
        var _matches = slicedToArray(matches, 2), address = _matches[1];
        if (address) {
          return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
          return host;
        }
      }
      function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];
        var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
        if (address) {
          var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
          var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
          var lastFields = last.split(":").map(_stripLeadingZeros);
          var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
          var fieldCount = isLastFieldIPv4Address ? 7 : 8;
          var lastFieldsStart = lastFields.length - fieldCount;
          var fields = Array(fieldCount);
          for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
          }
          if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
          }
          var allZeroFields = fields.reduce(function(acc, field, index) {
            if (!field || field === "0") {
              var lastLongest = acc[acc.length - 1];
              if (lastLongest && lastLongest.index + lastLongest.length === index) {
                lastLongest.length++;
              } else {
                acc.push({ index, length: 1 });
              }
            }
            return acc;
          }, []);
          var longestZeroFields = allZeroFields.sort(function(a, b) {
            return b.length - a.length;
          })[0];
          var newHost = void 0;
          if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
          } else {
            newHost = fields.join(":");
          }
          if (zone) {
            newHost += "%" + zone;
          }
          return newHost;
        } else {
          return host;
        }
      }
      var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
      var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
      function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix")
          uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
          if (NO_MATCH_IS_UNDEFINED) {
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            if (isNaN(components.port)) {
              components.port = matches[5];
            }
          } else {
            components.scheme = matches[1] || void 0;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
            if (isNaN(components.port)) {
              components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
            }
          }
          if (components.host) {
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
          }
          if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
            components.reference = "same-document";
          } else if (components.scheme === void 0) {
            components.reference = "relative";
          } else if (components.fragment === void 0) {
            components.reference = "absolute";
          } else {
            components.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
          }
          var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
          if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
              try {
                components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
              } catch (e) {
                components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
              }
            }
            _normalizeComponentEncoding(components, URI_PROTOCOL);
          } else {
            _normalizeComponentEncoding(components, protocol);
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
          }
        } else {
          components.error = components.error || "URI can not be parsed.";
        }
        return components;
      }
      function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== void 0) {
          uriTokens.push(components.userinfo);
          uriTokens.push("@");
        }
        if (components.host !== void 0) {
          uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
          }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
          uriTokens.push(":");
          uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      var RDS1 = /^\.\.?\//;
      var RDS2 = /^\/\.(\/|$)/;
      var RDS3 = /^\/\.\.(\/|$)/;
      var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
      function removeDotSegments(input) {
        var output = [];
        while (input.length) {
          if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
          } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
          } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
          } else if (input === "." || input === "..") {
            input = "";
          } else {
            var im = input.match(RDS5);
            if (im) {
              var s = im[0];
              input = input.slice(s.length);
              output.push(s);
            } else {
              throw new Error("Unexpected dot segment condition");
            }
          }
        }
        return output.join("");
      }
      function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (schemeHandler && schemeHandler.serialize)
          schemeHandler.serialize(components, options);
        if (components.host) {
          if (protocol.IPV6ADDRESS.test(components.host)) {
          } else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
            try {
              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
          }
        }
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
          uriTokens.push(components.scheme);
          uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
          }
        }
        if (components.path !== void 0) {
          var s = components.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (authority === void 0) {
            s = s.replace(/^\/\//, "/%2F");
          }
          uriTokens.push(s);
        }
        if (components.query !== void 0) {
          uriTokens.push("?");
          uriTokens.push(components.query);
        }
        if (components.fragment !== void 0) {
          uriTokens.push("#");
          uriTokens.push(components.fragment);
        }
        return uriTokens.join("");
      }
      function resolveComponents(base2, relative) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var skipNormalization = arguments[3];
        var target = {};
        if (!skipNormalization) {
          base2 = parse(serialize(base2, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base2.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base2.query;
              }
            } else {
              if (relative.path.charAt(0) === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                  target.path = "/" + relative.path;
                } else if (!base2.path) {
                  target.path = relative.path;
                } else {
                  target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base2.userinfo;
            target.host = base2.host;
            target.port = base2.port;
          }
          target.scheme = base2.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: "null" }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
      }
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
          uri = parse(serialize(uri, options), options);
        }
        return uri;
      }
      function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
          uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
          uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
          uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
          uriB = serialize(uriB, options);
        }
        return uriA === uriB;
      }
      function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
      }
      function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
      }
      var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse2(components, options) {
          if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
          }
          return components;
        },
        serialize: function serialize2(components, options) {
          var secure = String(components.scheme).toLowerCase() === "https";
          if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = void 0;
          }
          if (!components.path) {
            components.path = "/";
          }
          return components;
        }
      };
      var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
      };
      function isSecure(wsComponents) {
        return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
      }
      var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse2(components, options) {
          var wsComponents = components;
          wsComponents.secure = isSecure(wsComponents);
          wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
          wsComponents.path = void 0;
          wsComponents.query = void 0;
          return wsComponents;
        },
        serialize: function serialize2(wsComponents, options) {
          if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = void 0;
          }
          if (typeof wsComponents.secure === "boolean") {
            wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
            wsComponents.secure = void 0;
          }
          if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
            wsComponents.path = path && path !== "/" ? path : void 0;
            wsComponents.query = query;
            wsComponents.resourceName = void 0;
          }
          wsComponents.fragment = void 0;
          return wsComponents;
        }
      };
      var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
      };
      var O = {};
      var isIRI = true;
      var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
      var HEXDIG$$ = "[0-9A-Fa-f]";
      var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
      var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
      var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
      var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
      var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
      var UNRESERVED = new RegExp(UNRESERVED$$, "g");
      var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
      var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
      var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
      var NOT_HFVALUE = NOT_HFNAME;
      function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
      }
      var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
          var mailtoComponents = components;
          var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
          mailtoComponents.path = void 0;
          if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
              var hfield = hfields[x].split("=");
              switch (hfield[0]) {
                case "to":
                  var toAddrs = hfield[1].split(",");
                  for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                    to.push(toAddrs[_x]);
                  }
                  break;
                case "subject":
                  mailtoComponents.subject = unescapeComponent(hfield[1], options);
                  break;
                case "body":
                  mailtoComponents.body = unescapeComponent(hfield[1], options);
                  break;
                default:
                  unknownHeaders = true;
                  headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                  break;
              }
            }
            if (unknownHeaders)
              mailtoComponents.headers = headers;
          }
          mailtoComponents.query = void 0;
          for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
              try {
                addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
              } catch (e) {
                mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
              }
            } else {
              addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
          }
          return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
          var components = mailtoComponents;
          var to = toArray(mailtoComponents.to);
          if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
              var toAddr = String(to[x]);
              var atIdx = toAddr.lastIndexOf("@");
              var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
              var domain = toAddr.slice(atIdx + 1);
              try {
                domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
              } catch (e) {
                components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
              }
              to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
          }
          var headers = mailtoComponents.headers = mailtoComponents.headers || {};
          if (mailtoComponents.subject)
            headers["subject"] = mailtoComponents.subject;
          if (mailtoComponents.body)
            headers["body"] = mailtoComponents.body;
          var fields = [];
          for (var name in headers) {
            if (headers[name] !== O[name]) {
              fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
          }
          if (fields.length) {
            components.query = fields.join("&");
          }
          return components;
        }
      };
      var URN_PARSE = /^([^\:]+)\:(.*)/;
      var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
          var matches = components.path && components.path.match(URN_PARSE);
          var urnComponents = components;
          if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = void 0;
            if (schemeHandler) {
              urnComponents = schemeHandler.parse(urnComponents, options);
            }
          } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
          }
          return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = urnComponents.nid;
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
          }
          var uriComponents = urnComponents;
          var nss = urnComponents.nss;
          uriComponents.path = (nid || options.nid) + ":" + nss;
          return uriComponents;
        }
      };
      var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
      var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse2(urnComponents, options) {
          var uuidComponents = urnComponents;
          uuidComponents.uuid = uuidComponents.nss;
          uuidComponents.nss = void 0;
          if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
          }
          return uuidComponents;
        },
        serialize: function serialize2(uuidComponents, options) {
          var urnComponents = uuidComponents;
          urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
          return urnComponents;
        }
      };
      SCHEMES[handler.scheme] = handler;
      SCHEMES[handler$1.scheme] = handler$1;
      SCHEMES[handler$2.scheme] = handler$2;
      SCHEMES[handler$3.scheme] = handler$3;
      SCHEMES[handler$4.scheme] = handler$4;
      SCHEMES[handler$5.scheme] = handler$5;
      SCHEMES[handler$6.scheme] = handler$6;
      exports2.SCHEMES = SCHEMES;
      exports2.pctEncChar = pctEncChar;
      exports2.pctDecChars = pctDecChars;
      exports2.parse = parse;
      exports2.removeDotSegments = removeDotSegments;
      exports2.serialize = serialize;
      exports2.resolveComponents = resolveComponents;
      exports2.resolve = resolve;
      exports2.normalize = normalize;
      exports2.equal = equal;
      exports2.escapeComponent = escapeComponent;
      exports2.unescapeComponent = unescapeComponent;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module2) {
    "use strict";
    module2.exports = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/ajv/lib/compile/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/lib/compile/ucs2length.js"(exports, module2) {
    "use strict";
    module2.exports = function ucs2length(str) {
      var length = 0, len = str.length, pos = 0, value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) == 56320)
            pos++;
        }
      }
      return length;
    };
  }
});

// node_modules/ajv/lib/compile/util.js
var require_util = __commonJS({
  "node_modules/ajv/lib/compile/util.js"(exports, module2) {
    "use strict";
    module2.exports = {
      copy,
      checkDataType,
      checkDataTypes,
      coerceToTypes,
      toHash,
      getProperty,
      escapeQuotes,
      equal: require_fast_deep_equal(),
      ucs2length: require_ucs2length(),
      varOccurences,
      varReplace,
      schemaHasRules,
      schemaHasRulesExcept,
      schemaUnknownRules,
      toQuotedString,
      getPathExpr,
      getPath,
      getData,
      unescapeFragment,
      unescapeJsonPointer,
      escapeFragment,
      escapeJsonPointer
    };
    function copy(o, to) {
      to = to || {};
      for (var key in o)
        to[key] = o[key];
      return to;
    }
    function checkDataType(dataType, data, strictNumbers, negate) {
      var EQUAL = negate ? " !== " : " === ", AND = negate ? " || " : " && ", OK = negate ? "!" : "", NOT = negate ? "" : "!";
      switch (dataType) {
        case "null":
          return data + EQUAL + "null";
        case "array":
          return OK + "Array.isArray(" + data + ")";
        case "object":
          return "(" + OK + data + AND + "typeof " + data + EQUAL + '"object"' + AND + NOT + "Array.isArray(" + data + "))";
        case "integer":
          return "(typeof " + data + EQUAL + '"number"' + AND + NOT + "(" + data + " % 1)" + AND + data + EQUAL + data + (strictNumbers ? AND + OK + "isFinite(" + data + ")" : "") + ")";
        case "number":
          return "(typeof " + data + EQUAL + '"' + dataType + '"' + (strictNumbers ? AND + OK + "isFinite(" + data + ")" : "") + ")";
        default:
          return "typeof " + data + EQUAL + '"' + dataType + '"';
      }
    }
    function checkDataTypes(dataTypes, data, strictNumbers) {
      switch (dataTypes.length) {
        case 1:
          return checkDataType(dataTypes[0], data, strictNumbers, true);
        default:
          var code = "";
          var types = toHash(dataTypes);
          if (types.array && types.object) {
            code = types.null ? "(" : "(!" + data + " || ";
            code += "typeof " + data + ' !== "object")';
            delete types.null;
            delete types.array;
            delete types.object;
          }
          if (types.number)
            delete types.integer;
          for (var t in types)
            code += (code ? " && " : "") + checkDataType(t, data, strictNumbers, true);
          return code;
      }
    }
    var COERCE_TO_TYPES = toHash(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(optionCoerceTypes, dataTypes) {
      if (Array.isArray(dataTypes)) {
        var types = [];
        for (var i = 0; i < dataTypes.length; i++) {
          var t = dataTypes[i];
          if (COERCE_TO_TYPES[t])
            types[types.length] = t;
          else if (optionCoerceTypes === "array" && t === "array")
            types[types.length] = t;
        }
        if (types.length)
          return types;
      } else if (COERCE_TO_TYPES[dataTypes]) {
        return [dataTypes];
      } else if (optionCoerceTypes === "array" && dataTypes === "array") {
        return ["array"];
      }
    }
    function toHash(arr) {
      var hash = {};
      for (var i = 0; i < arr.length; i++)
        hash[arr[i]] = true;
      return hash;
    }
    var IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var SINGLE_QUOTE = /'|\\/g;
    function getProperty(key) {
      return typeof key == "number" ? "[" + key + "]" : IDENTIFIER.test(key) ? "." + key : "['" + escapeQuotes(key) + "']";
    }
    function escapeQuotes(str) {
      return str.replace(SINGLE_QUOTE, "\\$&").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\f/g, "\\f").replace(/\t/g, "\\t");
    }
    function varOccurences(str, dataVar) {
      dataVar += "[^0-9]";
      var matches = str.match(new RegExp(dataVar, "g"));
      return matches ? matches.length : 0;
    }
    function varReplace(str, dataVar, expr) {
      dataVar += "([^0-9])";
      expr = expr.replace(/\$/g, "$$$$");
      return str.replace(new RegExp(dataVar, "g"), expr + "$1");
    }
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (var key in schema)
        if (rules[key])
          return true;
    }
    function schemaHasRulesExcept(schema, rules, exceptKeyword) {
      if (typeof schema == "boolean")
        return !schema && exceptKeyword != "not";
      for (var key in schema)
        if (key != exceptKeyword && rules[key])
          return true;
    }
    function schemaUnknownRules(schema, rules) {
      if (typeof schema == "boolean")
        return;
      for (var key in schema)
        if (!rules[key])
          return key;
    }
    function toQuotedString(str) {
      return "'" + escapeQuotes(str) + "'";
    }
    function getPathExpr(currentPath, expr, jsonPointers, isNumber) {
      var path = jsonPointers ? "'/' + " + expr + (isNumber ? "" : ".replace(/~/g, '~0').replace(/\\//g, '~1')") : isNumber ? "'[' + " + expr + " + ']'" : "'[\\'' + " + expr + " + '\\']'";
      return joinPaths(currentPath, path);
    }
    function getPath(currentPath, prop, jsonPointers) {
      var path = jsonPointers ? toQuotedString("/" + escapeJsonPointer(prop)) : toQuotedString(getProperty(prop));
      return joinPaths(currentPath, path);
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, lvl, paths) {
      var up, jsonPointer, data, matches;
      if ($data === "")
        return "rootData";
      if ($data[0] == "/") {
        if (!JSON_POINTER.test($data))
          throw new Error("Invalid JSON-pointer: " + $data);
        jsonPointer = $data;
        data = "rootData";
      } else {
        matches = $data.match(RELATIVE_JSON_POINTER);
        if (!matches)
          throw new Error("Invalid JSON-pointer: " + $data);
        up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer == "#") {
          if (up >= lvl)
            throw new Error("Cannot access property/index " + up + " levels up, current level is " + lvl);
          return paths[lvl - up];
        }
        if (up > lvl)
          throw new Error("Cannot access data " + up + " levels up, current level is " + lvl);
        data = "data" + (lvl - up || "");
        if (!jsonPointer)
          return data;
      }
      var expr = data;
      var segments = jsonPointer.split("/");
      for (var i = 0; i < segments.length; i++) {
        var segment = segments[i];
        if (segment) {
          data += getProperty(unescapeJsonPointer(segment));
          expr += " && " + data;
        }
      }
      return expr;
    }
    function joinPaths(a, b) {
      if (a == '""')
        return b;
      return (a + " + " + b).replace(/([^\\])' \+ '/g, "$1");
    }
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    function escapeJsonPointer(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
  }
});

// node_modules/ajv/lib/compile/schema_obj.js
var require_schema_obj = __commonJS({
  "node_modules/ajv/lib/compile/schema_obj.js"(exports, module2) {
    "use strict";
    var util = require_util();
    module2.exports = SchemaObject;
    function SchemaObject(obj) {
      util.copy(obj, this);
    }
  }
});

// node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "node_modules/json-schema-traverse/index.js"(exports, module2) {
    "use strict";
    var traverse = module2.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// node_modules/ajv/lib/compile/resolve.js
var require_resolve = __commonJS({
  "node_modules/ajv/lib/compile/resolve.js"(exports, module2) {
    "use strict";
    var URI = require_uri_all();
    var equal = require_fast_deep_equal();
    var util = require_util();
    var SchemaObject = require_schema_obj();
    var traverse = require_json_schema_traverse();
    module2.exports = resolve;
    resolve.normalizeId = normalizeId;
    resolve.fullPath = getFullPath;
    resolve.url = resolveUrl;
    resolve.ids = resolveIds;
    resolve.inlineRef = inlineRef;
    resolve.schema = resolveSchema;
    function resolve(compile, root, ref) {
      var refVal = this._refs[ref];
      if (typeof refVal == "string") {
        if (this._refs[refVal])
          refVal = this._refs[refVal];
        else
          return resolve.call(this, compile, root, refVal);
      }
      refVal = refVal || this._schemas[ref];
      if (refVal instanceof SchemaObject) {
        return inlineRef(refVal.schema, this._opts.inlineRefs) ? refVal.schema : refVal.validate || this._compile(refVal);
      }
      var res = resolveSchema.call(this, root, ref);
      var schema, v, baseId;
      if (res) {
        schema = res.schema;
        root = res.root;
        baseId = res.baseId;
      }
      if (schema instanceof SchemaObject) {
        v = schema.validate || compile.call(this, schema.schema, root, void 0, baseId);
      } else if (schema !== void 0) {
        v = inlineRef(schema, this._opts.inlineRefs) ? schema : compile.call(this, schema, root, void 0, baseId);
      }
      return v;
    }
    function resolveSchema(root, ref) {
      var p = URI.parse(ref), refPath = _getFullPath(p), baseId = getFullPath(this._getId(root.schema));
      if (Object.keys(root.schema).length === 0 || refPath !== baseId) {
        var id = normalizeId(refPath);
        var refVal = this._refs[id];
        if (typeof refVal == "string") {
          return resolveRecursive.call(this, root, refVal, p);
        } else if (refVal instanceof SchemaObject) {
          if (!refVal.validate)
            this._compile(refVal);
          root = refVal;
        } else {
          refVal = this._schemas[id];
          if (refVal instanceof SchemaObject) {
            if (!refVal.validate)
              this._compile(refVal);
            if (id == normalizeId(ref))
              return { schema: refVal, root, baseId };
            root = refVal;
          } else {
            return;
          }
        }
        if (!root.schema)
          return;
        baseId = getFullPath(this._getId(root.schema));
      }
      return getJsonPointer.call(this, p, baseId, root.schema, root);
    }
    function resolveRecursive(root, ref, parsedRef) {
      var res = resolveSchema.call(this, root, ref);
      if (res) {
        var schema = res.schema;
        var baseId = res.baseId;
        root = res.root;
        var id = this._getId(schema);
        if (id)
          baseId = resolveUrl(baseId, id);
        return getJsonPointer.call(this, parsedRef, baseId, schema, root);
      }
    }
    var PREVENT_SCOPE_CHANGE = util.toHash(["properties", "patternProperties", "enum", "dependencies", "definitions"]);
    function getJsonPointer(parsedRef, baseId, schema, root) {
      parsedRef.fragment = parsedRef.fragment || "";
      if (parsedRef.fragment.slice(0, 1) != "/")
        return;
      var parts = parsedRef.fragment.split("/");
      for (var i = 1; i < parts.length; i++) {
        var part = parts[i];
        if (part) {
          part = util.unescapeFragment(part);
          schema = schema[part];
          if (schema === void 0)
            break;
          var id;
          if (!PREVENT_SCOPE_CHANGE[part]) {
            id = this._getId(schema);
            if (id)
              baseId = resolveUrl(baseId, id);
            if (schema.$ref) {
              var $ref2 = resolveUrl(baseId, schema.$ref);
              var res = resolveSchema.call(this, root, $ref2);
              if (res) {
                schema = res.schema;
                root = res.root;
                baseId = res.baseId;
              }
            }
          }
        }
      }
      if (schema !== void 0 && schema !== root.schema)
        return { schema, root, baseId };
    }
    var SIMPLE_INLINED = util.toHash([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum"
    ]);
    function inlineRef(schema, limit) {
      if (limit === false)
        return false;
      if (limit === void 0 || limit === true)
        return checkNoRef(schema);
      else if (limit)
        return countKeys(schema) <= limit;
    }
    function checkNoRef(schema) {
      var item;
      if (Array.isArray(schema)) {
        for (var i = 0; i < schema.length; i++) {
          item = schema[i];
          if (typeof item == "object" && !checkNoRef(item))
            return false;
        }
      } else {
        for (var key in schema) {
          if (key == "$ref")
            return false;
          item = schema[key];
          if (typeof item == "object" && !checkNoRef(item))
            return false;
        }
      }
      return true;
    }
    function countKeys(schema) {
      var count = 0, item;
      if (Array.isArray(schema)) {
        for (var i = 0; i < schema.length; i++) {
          item = schema[i];
          if (typeof item == "object")
            count += countKeys(item);
          if (count == Infinity)
            return Infinity;
        }
      } else {
        for (var key in schema) {
          if (key == "$ref")
            return Infinity;
          if (SIMPLE_INLINED[key]) {
            count++;
          } else {
            item = schema[key];
            if (typeof item == "object")
              count += countKeys(item) + 1;
            if (count == Infinity)
              return Infinity;
          }
        }
      }
      return count;
    }
    function getFullPath(id, normalize) {
      if (normalize !== false)
        id = normalizeId(id);
      var p = URI.parse(id);
      return _getFullPath(p);
    }
    function _getFullPath(p) {
      return URI.serialize(p).split("#")[0] + "#";
    }
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    function resolveUrl(baseId, id) {
      id = normalizeId(id);
      return URI.resolve(baseId, id);
    }
    function resolveIds(schema) {
      var schemaId = normalizeId(this._getId(schema));
      var baseIds = { "": schemaId };
      var fullPaths = { "": getFullPath(schemaId, false) };
      var localRefs = {};
      var self2 = this;
      traverse(schema, { allKeys: true }, function(sch, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
        if (jsonPtr === "")
          return;
        var id = self2._getId(sch);
        var baseId = baseIds[parentJsonPtr];
        var fullPath = fullPaths[parentJsonPtr] + "/" + parentKeyword;
        if (keyIndex !== void 0)
          fullPath += "/" + (typeof keyIndex == "number" ? keyIndex : util.escapeFragment(keyIndex));
        if (typeof id == "string") {
          id = baseId = normalizeId(baseId ? URI.resolve(baseId, id) : id);
          var refVal = self2._refs[id];
          if (typeof refVal == "string")
            refVal = self2._refs[refVal];
          if (refVal && refVal.schema) {
            if (!equal(sch, refVal.schema))
              throw new Error('id "' + id + '" resolves to more than one schema');
          } else if (id != normalizeId(fullPath)) {
            if (id[0] == "#") {
              if (localRefs[id] && !equal(sch, localRefs[id]))
                throw new Error('id "' + id + '" resolves to more than one schema');
              localRefs[id] = sch;
            } else {
              self2._refs[id] = fullPath;
            }
          }
        }
        baseIds[jsonPtr] = baseId;
        fullPaths[jsonPtr] = fullPath;
      });
      return localRefs;
    }
  }
});

// node_modules/ajv/lib/compile/error_classes.js
var require_error_classes = __commonJS({
  "node_modules/ajv/lib/compile/error_classes.js"(exports, module2) {
    "use strict";
    var resolve = require_resolve();
    module2.exports = {
      Validation: errorSubclass(ValidationError),
      MissingRef: errorSubclass(MissingRefError)
    };
    function ValidationError(errors) {
      this.message = "validation failed";
      this.errors = errors;
      this.ajv = this.validation = true;
    }
    MissingRefError.message = function(baseId, ref) {
      return "can't resolve reference " + ref + " from id " + baseId;
    };
    function MissingRefError(baseId, ref, message) {
      this.message = message || MissingRefError.message(baseId, ref);
      this.missingRef = resolve.url(baseId, ref);
      this.missingSchema = resolve.normalizeId(resolve.fullPath(this.missingRef));
    }
    function errorSubclass(Subclass) {
      Subclass.prototype = Object.create(Error.prototype);
      Subclass.prototype.constructor = Subclass;
      return Subclass;
    }
  }
});

// node_modules/fast-json-stable-stringify/index.js
var require_fast_json_stable_stringify = __commonJS({
  "node_modules/fast-json-stable-stringify/index.js"(exports, module2) {
    "use strict";
    module2.exports = function(data, opts) {
      if (!opts)
        opts = {};
      if (typeof opts === "function")
        opts = { cmp: opts };
      var cycles = typeof opts.cycles === "boolean" ? opts.cycles : false;
      var cmp = opts.cmp && function(f) {
        return function(node) {
          return function(a, b) {
            var aobj = { key: a, value: node[a] };
            var bobj = { key: b, value: node[b] };
            return f(aobj, bobj);
          };
        };
      }(opts.cmp);
      var seen = [];
      return function stringify(node) {
        if (node && node.toJSON && typeof node.toJSON === "function") {
          node = node.toJSON();
        }
        if (node === void 0)
          return;
        if (typeof node == "number")
          return isFinite(node) ? "" + node : "null";
        if (typeof node !== "object")
          return JSON.stringify(node);
        var i, out;
        if (Array.isArray(node)) {
          out = "[";
          for (i = 0; i < node.length; i++) {
            if (i)
              out += ",";
            out += stringify(node[i]) || "null";
          }
          return out + "]";
        }
        if (node === null)
          return "null";
        if (seen.indexOf(node) !== -1) {
          if (cycles)
            return JSON.stringify("__cycle__");
          throw new TypeError("Converting circular structure to JSON");
        }
        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = "";
        for (i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = stringify(node[key]);
          if (!value)
            continue;
          if (out)
            out += ",";
          out += JSON.stringify(key) + ":" + value;
        }
        seen.splice(seenIndex, 1);
        return "{" + out + "}";
      }(data);
    };
  }
});

// node_modules/ajv/lib/dotjs/validate.js
var require_validate = __commonJS({
  "node_modules/ajv/lib/dotjs/validate.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_validate(it, $keyword, $ruleType) {
      var out = "";
      var $async = it.schema.$async === true, $refKeywords = it.util.schemaHasRulesExcept(it.schema, it.RULES.all, "$ref"), $id = it.self._getId(it.schema);
      if (it.opts.strictKeywords) {
        var $unknownKwd = it.util.schemaUnknownRules(it.schema, it.RULES.keywords);
        if ($unknownKwd) {
          var $keywordsMsg = "unknown keyword: " + $unknownKwd;
          if (it.opts.strictKeywords === "log")
            it.logger.warn($keywordsMsg);
          else
            throw new Error($keywordsMsg);
        }
      }
      if (it.isTop) {
        out += " var validate = ";
        if ($async) {
          it.async = true;
          out += "async ";
        }
        out += "function(data, dataPath, parentData, parentDataProperty, rootData) { 'use strict'; ";
        if ($id && (it.opts.sourceCode || it.opts.processCode)) {
          out += " " + ("/*# sourceURL=" + $id + " */") + " ";
        }
      }
      if (typeof it.schema == "boolean" || !($refKeywords || it.schema.$ref)) {
        var $keyword = "false schema";
        var $lvl = it.level;
        var $dataLvl = it.dataLevel;
        var $schema2 = it.schema[$keyword];
        var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
        var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
        var $breakOnError = !it.opts.allErrors;
        var $errorKeyword;
        var $data = "data" + ($dataLvl || "");
        var $valid = "valid" + $lvl;
        if (it.schema === false) {
          if (it.isTop) {
            $breakOnError = true;
          } else {
            out += " var " + $valid + " = false; ";
          }
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = "";
          if (it.createErrors !== false) {
            out += " { keyword: '" + ($errorKeyword || "false schema") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
            if (it.opts.messages !== false) {
              out += " , message: 'boolean schema is false' ";
            }
            if (it.opts.verbose) {
              out += " , schema: false , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError([" + __err + "]); ";
            } else {
              out += " validate.errors = [" + __err + "]; return false; ";
            }
          } else {
            out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          }
        } else {
          if (it.isTop) {
            if ($async) {
              out += " return data; ";
            } else {
              out += " validate.errors = null; return true; ";
            }
          } else {
            out += " var " + $valid + " = true; ";
          }
        }
        if (it.isTop) {
          out += " }; return validate; ";
        }
        return out;
      }
      if (it.isTop) {
        var $top = it.isTop, $lvl = it.level = 0, $dataLvl = it.dataLevel = 0, $data = "data";
        it.rootId = it.resolve.fullPath(it.self._getId(it.root.schema));
        it.baseId = it.baseId || it.rootId;
        delete it.isTop;
        it.dataPathArr = [""];
        if (it.schema.default !== void 0 && it.opts.useDefaults && it.opts.strictDefaults) {
          var $defaultMsg = "default is ignored in the schema root";
          if (it.opts.strictDefaults === "log")
            it.logger.warn($defaultMsg);
          else
            throw new Error($defaultMsg);
        }
        out += " var vErrors = null; ";
        out += " var errors = 0;     ";
        out += " if (rootData === undefined) rootData = data; ";
      } else {
        var $lvl = it.level, $dataLvl = it.dataLevel, $data = "data" + ($dataLvl || "");
        if ($id)
          it.baseId = it.resolve.url(it.baseId, $id);
        if ($async && !it.async)
          throw new Error("async schema in sync schema");
        out += " var errs_" + $lvl + " = errors;";
      }
      var $valid = "valid" + $lvl, $breakOnError = !it.opts.allErrors, $closingBraces1 = "", $closingBraces2 = "";
      var $errorKeyword;
      var $typeSchema = it.schema.type, $typeIsArray = Array.isArray($typeSchema);
      if ($typeSchema && it.opts.nullable && it.schema.nullable === true) {
        if ($typeIsArray) {
          if ($typeSchema.indexOf("null") == -1)
            $typeSchema = $typeSchema.concat("null");
        } else if ($typeSchema != "null") {
          $typeSchema = [$typeSchema, "null"];
          $typeIsArray = true;
        }
      }
      if ($typeIsArray && $typeSchema.length == 1) {
        $typeSchema = $typeSchema[0];
        $typeIsArray = false;
      }
      if (it.schema.$ref && $refKeywords) {
        if (it.opts.extendRefs == "fail") {
          throw new Error('$ref: validation keywords used in schema at path "' + it.errSchemaPath + '" (see option extendRefs)');
        } else if (it.opts.extendRefs !== true) {
          $refKeywords = false;
          it.logger.warn('$ref: keywords ignored in schema at path "' + it.errSchemaPath + '"');
        }
      }
      if (it.schema.$comment && it.opts.$comment) {
        out += " " + it.RULES.all.$comment.code(it, "$comment");
      }
      if ($typeSchema) {
        if (it.opts.coerceTypes) {
          var $coerceToTypes = it.util.coerceToTypes(it.opts.coerceTypes, $typeSchema);
        }
        var $rulesGroup = it.RULES.types[$typeSchema];
        if ($coerceToTypes || $typeIsArray || $rulesGroup === true || $rulesGroup && !$shouldUseGroup($rulesGroup)) {
          var $schemaPath = it.schemaPath + ".type", $errSchemaPath = it.errSchemaPath + "/type";
          var $schemaPath = it.schemaPath + ".type", $errSchemaPath = it.errSchemaPath + "/type", $method = $typeIsArray ? "checkDataTypes" : "checkDataType";
          out += " if (" + it.util[$method]($typeSchema, $data, it.opts.strictNumbers, true) + ") { ";
          if ($coerceToTypes) {
            var $dataType = "dataType" + $lvl, $coerced = "coerced" + $lvl;
            out += " var " + $dataType + " = typeof " + $data + "; var " + $coerced + " = undefined; ";
            if (it.opts.coerceTypes == "array") {
              out += " if (" + $dataType + " == 'object' && Array.isArray(" + $data + ") && " + $data + ".length == 1) { " + $data + " = " + $data + "[0]; " + $dataType + " = typeof " + $data + "; if (" + it.util.checkDataType(it.schema.type, $data, it.opts.strictNumbers) + ") " + $coerced + " = " + $data + "; } ";
            }
            out += " if (" + $coerced + " !== undefined) ; ";
            var arr1 = $coerceToTypes;
            if (arr1) {
              var $type, $i = -1, l1 = arr1.length - 1;
              while ($i < l1) {
                $type = arr1[$i += 1];
                if ($type == "string") {
                  out += " else if (" + $dataType + " == 'number' || " + $dataType + " == 'boolean') " + $coerced + " = '' + " + $data + "; else if (" + $data + " === null) " + $coerced + " = ''; ";
                } else if ($type == "number" || $type == "integer") {
                  out += " else if (" + $dataType + " == 'boolean' || " + $data + " === null || (" + $dataType + " == 'string' && " + $data + " && " + $data + " == +" + $data + " ";
                  if ($type == "integer") {
                    out += " && !(" + $data + " % 1)";
                  }
                  out += ")) " + $coerced + " = +" + $data + "; ";
                } else if ($type == "boolean") {
                  out += " else if (" + $data + " === 'false' || " + $data + " === 0 || " + $data + " === null) " + $coerced + " = false; else if (" + $data + " === 'true' || " + $data + " === 1) " + $coerced + " = true; ";
                } else if ($type == "null") {
                  out += " else if (" + $data + " === '' || " + $data + " === 0 || " + $data + " === false) " + $coerced + " = null; ";
                } else if (it.opts.coerceTypes == "array" && $type == "array") {
                  out += " else if (" + $dataType + " == 'string' || " + $dataType + " == 'number' || " + $dataType + " == 'boolean' || " + $data + " == null) " + $coerced + " = [" + $data + "]; ";
                }
              }
            }
            out += " else {   ";
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = "";
            if (it.createErrors !== false) {
              out += " { keyword: '" + ($errorKeyword || "type") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { type: '";
              if ($typeIsArray) {
                out += "" + $typeSchema.join(",");
              } else {
                out += "" + $typeSchema;
              }
              out += "' } ";
              if (it.opts.messages !== false) {
                out += " , message: 'should be ";
                if ($typeIsArray) {
                  out += "" + $typeSchema.join(",");
                } else {
                  out += "" + $typeSchema;
                }
                out += "' ";
              }
              if (it.opts.verbose) {
                out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              if (it.async) {
                out += " throw new ValidationError([" + __err + "]); ";
              } else {
                out += " validate.errors = [" + __err + "]; return false; ";
              }
            } else {
              out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            }
            out += " } if (" + $coerced + " !== undefined) {  ";
            var $parentData = $dataLvl ? "data" + ($dataLvl - 1 || "") : "parentData", $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : "parentDataProperty";
            out += " " + $data + " = " + $coerced + "; ";
            if (!$dataLvl) {
              out += "if (" + $parentData + " !== undefined)";
            }
            out += " " + $parentData + "[" + $parentDataProperty + "] = " + $coerced + "; } ";
          } else {
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = "";
            if (it.createErrors !== false) {
              out += " { keyword: '" + ($errorKeyword || "type") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { type: '";
              if ($typeIsArray) {
                out += "" + $typeSchema.join(",");
              } else {
                out += "" + $typeSchema;
              }
              out += "' } ";
              if (it.opts.messages !== false) {
                out += " , message: 'should be ";
                if ($typeIsArray) {
                  out += "" + $typeSchema.join(",");
                } else {
                  out += "" + $typeSchema;
                }
                out += "' ";
              }
              if (it.opts.verbose) {
                out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              if (it.async) {
                out += " throw new ValidationError([" + __err + "]); ";
              } else {
                out += " validate.errors = [" + __err + "]; return false; ";
              }
            } else {
              out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            }
          }
          out += " } ";
        }
      }
      if (it.schema.$ref && !$refKeywords) {
        out += " " + it.RULES.all.$ref.code(it, "$ref") + " ";
        if ($breakOnError) {
          out += " } if (errors === ";
          if ($top) {
            out += "0";
          } else {
            out += "errs_" + $lvl;
          }
          out += ") { ";
          $closingBraces2 += "}";
        }
      } else {
        var arr2 = it.RULES;
        if (arr2) {
          var $rulesGroup, i2 = -1, l2 = arr2.length - 1;
          while (i2 < l2) {
            $rulesGroup = arr2[i2 += 1];
            if ($shouldUseGroup($rulesGroup)) {
              if ($rulesGroup.type) {
                out += " if (" + it.util.checkDataType($rulesGroup.type, $data, it.opts.strictNumbers) + ") { ";
              }
              if (it.opts.useDefaults) {
                if ($rulesGroup.type == "object" && it.schema.properties) {
                  var $schema2 = it.schema.properties, $schemaKeys = Object.keys($schema2);
                  var arr3 = $schemaKeys;
                  if (arr3) {
                    var $propertyKey, i3 = -1, l3 = arr3.length - 1;
                    while (i3 < l3) {
                      $propertyKey = arr3[i3 += 1];
                      var $sch = $schema2[$propertyKey];
                      if ($sch.default !== void 0) {
                        var $passData = $data + it.util.getProperty($propertyKey);
                        if (it.compositeRule) {
                          if (it.opts.strictDefaults) {
                            var $defaultMsg = "default is ignored for: " + $passData;
                            if (it.opts.strictDefaults === "log")
                              it.logger.warn($defaultMsg);
                            else
                              throw new Error($defaultMsg);
                          }
                        } else {
                          out += " if (" + $passData + " === undefined ";
                          if (it.opts.useDefaults == "empty") {
                            out += " || " + $passData + " === null || " + $passData + " === '' ";
                          }
                          out += " ) " + $passData + " = ";
                          if (it.opts.useDefaults == "shared") {
                            out += " " + it.useDefault($sch.default) + " ";
                          } else {
                            out += " " + JSON.stringify($sch.default) + " ";
                          }
                          out += "; ";
                        }
                      }
                    }
                  }
                } else if ($rulesGroup.type == "array" && Array.isArray(it.schema.items)) {
                  var arr4 = it.schema.items;
                  if (arr4) {
                    var $sch, $i = -1, l4 = arr4.length - 1;
                    while ($i < l4) {
                      $sch = arr4[$i += 1];
                      if ($sch.default !== void 0) {
                        var $passData = $data + "[" + $i + "]";
                        if (it.compositeRule) {
                          if (it.opts.strictDefaults) {
                            var $defaultMsg = "default is ignored for: " + $passData;
                            if (it.opts.strictDefaults === "log")
                              it.logger.warn($defaultMsg);
                            else
                              throw new Error($defaultMsg);
                          }
                        } else {
                          out += " if (" + $passData + " === undefined ";
                          if (it.opts.useDefaults == "empty") {
                            out += " || " + $passData + " === null || " + $passData + " === '' ";
                          }
                          out += " ) " + $passData + " = ";
                          if (it.opts.useDefaults == "shared") {
                            out += " " + it.useDefault($sch.default) + " ";
                          } else {
                            out += " " + JSON.stringify($sch.default) + " ";
                          }
                          out += "; ";
                        }
                      }
                    }
                  }
                }
              }
              var arr5 = $rulesGroup.rules;
              if (arr5) {
                var $rule, i5 = -1, l5 = arr5.length - 1;
                while (i5 < l5) {
                  $rule = arr5[i5 += 1];
                  if ($shouldUseRule($rule)) {
                    var $code = $rule.code(it, $rule.keyword, $rulesGroup.type);
                    if ($code) {
                      out += " " + $code + " ";
                      if ($breakOnError) {
                        $closingBraces1 += "}";
                      }
                    }
                  }
                }
              }
              if ($breakOnError) {
                out += " " + $closingBraces1 + " ";
                $closingBraces1 = "";
              }
              if ($rulesGroup.type) {
                out += " } ";
                if ($typeSchema && $typeSchema === $rulesGroup.type && !$coerceToTypes) {
                  out += " else { ";
                  var $schemaPath = it.schemaPath + ".type", $errSchemaPath = it.errSchemaPath + "/type";
                  var $$outStack = $$outStack || [];
                  $$outStack.push(out);
                  out = "";
                  if (it.createErrors !== false) {
                    out += " { keyword: '" + ($errorKeyword || "type") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { type: '";
                    if ($typeIsArray) {
                      out += "" + $typeSchema.join(",");
                    } else {
                      out += "" + $typeSchema;
                    }
                    out += "' } ";
                    if (it.opts.messages !== false) {
                      out += " , message: 'should be ";
                      if ($typeIsArray) {
                        out += "" + $typeSchema.join(",");
                      } else {
                        out += "" + $typeSchema;
                      }
                      out += "' ";
                    }
                    if (it.opts.verbose) {
                      out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                    }
                    out += " } ";
                  } else {
                    out += " {} ";
                  }
                  var __err = out;
                  out = $$outStack.pop();
                  if (!it.compositeRule && $breakOnError) {
                    if (it.async) {
                      out += " throw new ValidationError([" + __err + "]); ";
                    } else {
                      out += " validate.errors = [" + __err + "]; return false; ";
                    }
                  } else {
                    out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                  }
                  out += " } ";
                }
              }
              if ($breakOnError) {
                out += " if (errors === ";
                if ($top) {
                  out += "0";
                } else {
                  out += "errs_" + $lvl;
                }
                out += ") { ";
                $closingBraces2 += "}";
              }
            }
          }
        }
      }
      if ($breakOnError) {
        out += " " + $closingBraces2 + " ";
      }
      if ($top) {
        if ($async) {
          out += " if (errors === 0) return data;           ";
          out += " else throw new ValidationError(vErrors); ";
        } else {
          out += " validate.errors = vErrors; ";
          out += " return errors === 0;       ";
        }
        out += " }; return validate;";
      } else {
        out += " var " + $valid + " = errors === errs_" + $lvl + ";";
      }
      function $shouldUseGroup($rulesGroup2) {
        var rules = $rulesGroup2.rules;
        for (var i = 0; i < rules.length; i++)
          if ($shouldUseRule(rules[i]))
            return true;
      }
      function $shouldUseRule($rule2) {
        return it.schema[$rule2.keyword] !== void 0 || $rule2.implements && $ruleImplementsSomeKeyword($rule2);
      }
      function $ruleImplementsSomeKeyword($rule2) {
        var impl = $rule2.implements;
        for (var i = 0; i < impl.length; i++)
          if (it.schema[impl[i]] !== void 0)
            return true;
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/compile/index.js
var require_compile = __commonJS({
  "node_modules/ajv/lib/compile/index.js"(exports, module2) {
    "use strict";
    var resolve = require_resolve();
    var util = require_util();
    var errorClasses = require_error_classes();
    var stableStringify = require_fast_json_stable_stringify();
    var validateGenerator = require_validate();
    var ucs2length = util.ucs2length;
    var equal = require_fast_deep_equal();
    var ValidationError = errorClasses.Validation;
    module2.exports = compile;
    function compile(schema, root, localRefs, baseId) {
      var self2 = this, opts = this._opts, refVal = [void 0], refs = {}, patterns = [], patternsHash = {}, defaults = [], defaultsHash = {}, customRules = [];
      root = root || { schema, refVal, refs };
      var c = checkCompiling.call(this, schema, root, baseId);
      var compilation = this._compilations[c.index];
      if (c.compiling)
        return compilation.callValidate = callValidate;
      var formats = this._formats;
      var RULES = this.RULES;
      try {
        var v = localCompile(schema, root, localRefs, baseId);
        compilation.validate = v;
        var cv = compilation.callValidate;
        if (cv) {
          cv.schema = v.schema;
          cv.errors = null;
          cv.refs = v.refs;
          cv.refVal = v.refVal;
          cv.root = v.root;
          cv.$async = v.$async;
          if (opts.sourceCode)
            cv.source = v.source;
        }
        return v;
      } finally {
        endCompiling.call(this, schema, root, baseId);
      }
      function callValidate() {
        var validate = compilation.validate;
        var result = validate.apply(this, arguments);
        callValidate.errors = validate.errors;
        return result;
      }
      function localCompile(_schema, _root, localRefs2, baseId2) {
        var isRoot = !_root || _root && _root.schema == _schema;
        if (_root.schema != root.schema)
          return compile.call(self2, _schema, _root, localRefs2, baseId2);
        var $async = _schema.$async === true;
        var sourceCode = validateGenerator({
          isTop: true,
          schema: _schema,
          isRoot,
          baseId: baseId2,
          root: _root,
          schemaPath: "",
          errSchemaPath: "#",
          errorPath: '""',
          MissingRefError: errorClasses.MissingRef,
          RULES,
          validate: validateGenerator,
          util,
          resolve,
          resolveRef,
          usePattern,
          useDefault,
          useCustomRule,
          opts,
          formats,
          logger: self2.logger,
          self: self2
        });
        sourceCode = vars(refVal, refValCode) + vars(patterns, patternCode) + vars(defaults, defaultCode) + vars(customRules, customRuleCode) + sourceCode;
        if (opts.processCode)
          sourceCode = opts.processCode(sourceCode, _schema);
        var validate;
        try {
          var makeValidate = new Function(
            "self",
            "RULES",
            "formats",
            "root",
            "refVal",
            "defaults",
            "customRules",
            "equal",
            "ucs2length",
            "ValidationError",
            sourceCode
          );
          validate = makeValidate(
            self2,
            RULES,
            formats,
            root,
            refVal,
            defaults,
            customRules,
            equal,
            ucs2length,
            ValidationError
          );
          refVal[0] = validate;
        } catch (e) {
          self2.logger.error("Error compiling schema, function code:", sourceCode);
          throw e;
        }
        validate.schema = _schema;
        validate.errors = null;
        validate.refs = refs;
        validate.refVal = refVal;
        validate.root = isRoot ? validate : _root;
        if ($async)
          validate.$async = true;
        if (opts.sourceCode === true) {
          validate.source = {
            code: sourceCode,
            patterns,
            defaults
          };
        }
        return validate;
      }
      function resolveRef(baseId2, ref, isRoot) {
        ref = resolve.url(baseId2, ref);
        var refIndex = refs[ref];
        var _refVal, refCode;
        if (refIndex !== void 0) {
          _refVal = refVal[refIndex];
          refCode = "refVal[" + refIndex + "]";
          return resolvedRef(_refVal, refCode);
        }
        if (!isRoot && root.refs) {
          var rootRefId = root.refs[ref];
          if (rootRefId !== void 0) {
            _refVal = root.refVal[rootRefId];
            refCode = addLocalRef(ref, _refVal);
            return resolvedRef(_refVal, refCode);
          }
        }
        refCode = addLocalRef(ref);
        var v2 = resolve.call(self2, localCompile, root, ref);
        if (v2 === void 0) {
          var localSchema = localRefs && localRefs[ref];
          if (localSchema) {
            v2 = resolve.inlineRef(localSchema, opts.inlineRefs) ? localSchema : compile.call(self2, localSchema, root, localRefs, baseId2);
          }
        }
        if (v2 === void 0) {
          removeLocalRef(ref);
        } else {
          replaceLocalRef(ref, v2);
          return resolvedRef(v2, refCode);
        }
      }
      function addLocalRef(ref, v2) {
        var refId = refVal.length;
        refVal[refId] = v2;
        refs[ref] = refId;
        return "refVal" + refId;
      }
      function removeLocalRef(ref) {
        delete refs[ref];
      }
      function replaceLocalRef(ref, v2) {
        var refId = refs[ref];
        refVal[refId] = v2;
      }
      function resolvedRef(refVal2, code) {
        return typeof refVal2 == "object" || typeof refVal2 == "boolean" ? { code, schema: refVal2, inline: true } : { code, $async: refVal2 && !!refVal2.$async };
      }
      function usePattern(regexStr) {
        var index = patternsHash[regexStr];
        if (index === void 0) {
          index = patternsHash[regexStr] = patterns.length;
          patterns[index] = regexStr;
        }
        return "pattern" + index;
      }
      function useDefault(value) {
        switch (typeof value) {
          case "boolean":
          case "number":
            return "" + value;
          case "string":
            return util.toQuotedString(value);
          case "object":
            if (value === null)
              return "null";
            var valueStr = stableStringify(value);
            var index = defaultsHash[valueStr];
            if (index === void 0) {
              index = defaultsHash[valueStr] = defaults.length;
              defaults[index] = value;
            }
            return "default" + index;
        }
      }
      function useCustomRule(rule, schema2, parentSchema, it) {
        if (self2._opts.validateSchema !== false) {
          var deps = rule.definition.dependencies;
          if (deps && !deps.every(function(keyword) {
            return Object.prototype.hasOwnProperty.call(parentSchema, keyword);
          }))
            throw new Error("parent schema must have all required keywords: " + deps.join(","));
          var validateSchema = rule.definition.validateSchema;
          if (validateSchema) {
            var valid = validateSchema(schema2);
            if (!valid) {
              var message = "keyword schema is invalid: " + self2.errorsText(validateSchema.errors);
              if (self2._opts.validateSchema == "log")
                self2.logger.error(message);
              else
                throw new Error(message);
            }
          }
        }
        var compile2 = rule.definition.compile, inline = rule.definition.inline, macro = rule.definition.macro;
        var validate;
        if (compile2) {
          validate = compile2.call(self2, schema2, parentSchema, it);
        } else if (macro) {
          validate = macro.call(self2, schema2, parentSchema, it);
          if (opts.validateSchema !== false)
            self2.validateSchema(validate, true);
        } else if (inline) {
          validate = inline.call(self2, it, rule.keyword, schema2, parentSchema);
        } else {
          validate = rule.definition.validate;
          if (!validate)
            return;
        }
        if (validate === void 0)
          throw new Error('custom keyword "' + rule.keyword + '"failed to compile');
        var index = customRules.length;
        customRules[index] = validate;
        return {
          code: "customRule" + index,
          validate
        };
      }
    }
    function checkCompiling(schema, root, baseId) {
      var index = compIndex.call(this, schema, root, baseId);
      if (index >= 0)
        return { index, compiling: true };
      index = this._compilations.length;
      this._compilations[index] = {
        schema,
        root,
        baseId
      };
      return { index, compiling: false };
    }
    function endCompiling(schema, root, baseId) {
      var i = compIndex.call(this, schema, root, baseId);
      if (i >= 0)
        this._compilations.splice(i, 1);
    }
    function compIndex(schema, root, baseId) {
      for (var i = 0; i < this._compilations.length; i++) {
        var c = this._compilations[i];
        if (c.schema == schema && c.root == root && c.baseId == baseId)
          return i;
      }
      return -1;
    }
    function patternCode(i, patterns) {
      return "var pattern" + i + " = new RegExp(" + util.toQuotedString(patterns[i]) + ");";
    }
    function defaultCode(i) {
      return "var default" + i + " = defaults[" + i + "];";
    }
    function refValCode(i, refVal) {
      return refVal[i] === void 0 ? "" : "var refVal" + i + " = refVal[" + i + "];";
    }
    function customRuleCode(i) {
      return "var customRule" + i + " = customRules[" + i + "];";
    }
    function vars(arr, statement) {
      if (!arr.length)
        return "";
      var code = "";
      for (var i = 0; i < arr.length; i++)
        code += statement(i, arr);
      return code;
    }
  }
});

// node_modules/ajv/lib/cache.js
var require_cache = __commonJS({
  "node_modules/ajv/lib/cache.js"(exports, module2) {
    "use strict";
    var Cache = module2.exports = function Cache2() {
      this._cache = {};
    };
    Cache.prototype.put = function Cache_put(key, value) {
      this._cache[key] = value;
    };
    Cache.prototype.get = function Cache_get(key) {
      return this._cache[key];
    };
    Cache.prototype.del = function Cache_del(key) {
      delete this._cache[key];
    };
    Cache.prototype.clear = function Cache_clear() {
      this._cache = {};
    };
  }
});

// node_modules/ajv/lib/compile/formats.js
var require_formats = __commonJS({
  "node_modules/ajv/lib/compile/formats.js"(exports, module2) {
    "use strict";
    var util = require_util();
    var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
    var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
    var URL = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;
    var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
    var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
    var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
    var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
    module2.exports = formats;
    function formats(mode) {
      mode = mode == "full" ? "full" : "fast";
      return util.copy(formats[mode]);
    }
    formats.fast = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,
      "date-time": /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      "uri-template": URITEMPLATE,
      url: URL,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
      hostname: HOSTNAME,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
      ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
      regex,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: UUID,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": JSON_POINTER,
      "json-pointer-uri-fragment": JSON_POINTER_URI_FRAGMENT,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": RELATIVE_JSON_POINTER
    };
    formats.full = {
      date,
      time,
      "date-time": date_time,
      uri,
      "uri-reference": URIREF,
      "uri-template": URITEMPLATE,
      url: URL,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: HOSTNAME,
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
      regex,
      uuid: UUID,
      "json-pointer": JSON_POINTER,
      "json-pointer-uri-fragment": JSON_POINTER_URI_FRAGMENT,
      "relative-json-pointer": RELATIVE_JSON_POINTER
    };
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    function date(str) {
      var matches = str.match(DATE);
      if (!matches)
        return false;
      var year = +matches[1];
      var month = +matches[2];
      var day = +matches[3];
      return month >= 1 && month <= 12 && day >= 1 && day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
    }
    function time(str, full) {
      var matches = str.match(TIME);
      if (!matches)
        return false;
      var hour = matches[1];
      var minute = matches[2];
      var second = matches[3];
      var timeZone = matches[5];
      return (hour <= 23 && minute <= 59 && second <= 59 || hour == 23 && minute == 59 && second == 60) && (!full || timeZone);
    }
    var DATE_TIME_SEPARATOR = /t|\s/i;
    function date_time(str) {
      var dateTime = str.split(DATE_TIME_SEPARATOR);
      return dateTime.length == 2 && date(dateTime[0]) && time(dateTime[1], true);
    }
    var NOT_URI_FRAGMENT = /\/|:/;
    function uri(str) {
      return NOT_URI_FRAGMENT.test(str) && URI.test(str);
    }
    var Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str))
        return false;
      try {
        new RegExp(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
});

// node_modules/ajv/lib/dotjs/ref.js
var require_ref = __commonJS({
  "node_modules/ajv/lib/dotjs/ref.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_ref(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $async, $refCode;
      if ($schema2 == "#" || $schema2 == "#/") {
        if (it.isRoot) {
          $async = it.async;
          $refCode = "validate";
        } else {
          $async = it.root.schema.$async === true;
          $refCode = "root.refVal[0]";
        }
      } else {
        var $refVal = it.resolveRef(it.baseId, $schema2, it.isRoot);
        if ($refVal === void 0) {
          var $message = it.MissingRefError.message(it.baseId, $schema2);
          if (it.opts.missingRefs == "fail") {
            it.logger.error($message);
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = "";
            if (it.createErrors !== false) {
              out += " { keyword: '$ref' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { ref: '" + it.util.escapeQuotes($schema2) + "' } ";
              if (it.opts.messages !== false) {
                out += " , message: 'can\\'t resolve reference " + it.util.escapeQuotes($schema2) + "' ";
              }
              if (it.opts.verbose) {
                out += " , schema: " + it.util.toQuotedString($schema2) + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              if (it.async) {
                out += " throw new ValidationError([" + __err + "]); ";
              } else {
                out += " validate.errors = [" + __err + "]; return false; ";
              }
            } else {
              out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            }
            if ($breakOnError) {
              out += " if (false) { ";
            }
          } else if (it.opts.missingRefs == "ignore") {
            it.logger.warn($message);
            if ($breakOnError) {
              out += " if (true) { ";
            }
          } else {
            throw new it.MissingRefError(it.baseId, $schema2, $message);
          }
        } else if ($refVal.inline) {
          var $it = it.util.copy(it);
          $it.level++;
          var $nextValid = "valid" + $it.level;
          $it.schema = $refVal.schema;
          $it.schemaPath = "";
          $it.errSchemaPath = $schema2;
          var $code = it.validate($it).replace(/validate\.schema/g, $refVal.code);
          out += " " + $code + " ";
          if ($breakOnError) {
            out += " if (" + $nextValid + ") { ";
          }
        } else {
          $async = $refVal.$async === true || it.async && $refVal.$async !== false;
          $refCode = $refVal.code;
        }
      }
      if ($refCode) {
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        if (it.opts.passContext) {
          out += " " + $refCode + ".call(this, ";
        } else {
          out += " " + $refCode + "( ";
        }
        out += " " + $data + ", (dataPath || '')";
        if (it.errorPath != '""') {
          out += " + " + it.errorPath;
        }
        var $parentData = $dataLvl ? "data" + ($dataLvl - 1 || "") : "parentData", $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : "parentDataProperty";
        out += " , " + $parentData + " , " + $parentDataProperty + ", rootData)  ";
        var __callValidate = out;
        out = $$outStack.pop();
        if ($async) {
          if (!it.async)
            throw new Error("async schema referenced by sync schema");
          if ($breakOnError) {
            out += " var " + $valid + "; ";
          }
          out += " try { await " + __callValidate + "; ";
          if ($breakOnError) {
            out += " " + $valid + " = true; ";
          }
          out += " } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ";
          if ($breakOnError) {
            out += " " + $valid + " = false; ";
          }
          out += " } ";
          if ($breakOnError) {
            out += " if (" + $valid + ") { ";
          }
        } else {
          out += " if (!" + __callValidate + ") { if (vErrors === null) vErrors = " + $refCode + ".errors; else vErrors = vErrors.concat(" + $refCode + ".errors); errors = vErrors.length; } ";
          if ($breakOnError) {
            out += " else { ";
          }
        }
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/allOf.js
var require_allOf = __commonJS({
  "node_modules/ajv/lib/dotjs/allOf.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_allOf(it, $keyword, $ruleType) {
      var out = " ";
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      var $currentBaseId = $it.baseId, $allSchemasEmpty = true;
      var arr1 = $schema2;
      if (arr1) {
        var $sch, $i = -1, l1 = arr1.length - 1;
        while ($i < l1) {
          $sch = arr1[$i += 1];
          if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
            $allSchemasEmpty = false;
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + "[" + $i + "]";
            $it.errSchemaPath = $errSchemaPath + "/" + $i;
            out += "  " + it.validate($it) + " ";
            $it.baseId = $currentBaseId;
            if ($breakOnError) {
              out += " if (" + $nextValid + ") { ";
              $closingBraces += "}";
            }
          }
        }
      }
      if ($breakOnError) {
        if ($allSchemasEmpty) {
          out += " if (true) { ";
        } else {
          out += " " + $closingBraces.slice(0, -1) + " ";
        }
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/anyOf.js
var require_anyOf = __commonJS({
  "node_modules/ajv/lib/dotjs/anyOf.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_anyOf(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      var $noEmptySchema = $schema2.every(function($sch2) {
        return it.opts.strictKeywords ? typeof $sch2 == "object" && Object.keys($sch2).length > 0 || $sch2 === false : it.util.schemaHasRules($sch2, it.RULES.all);
      });
      if ($noEmptySchema) {
        var $currentBaseId = $it.baseId;
        out += " var " + $errs + " = errors; var " + $valid + " = false;  ";
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        var arr1 = $schema2;
        if (arr1) {
          var $sch, $i = -1, l1 = arr1.length - 1;
          while ($i < l1) {
            $sch = arr1[$i += 1];
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + "[" + $i + "]";
            $it.errSchemaPath = $errSchemaPath + "/" + $i;
            out += "  " + it.validate($it) + " ";
            $it.baseId = $currentBaseId;
            out += " " + $valid + " = " + $valid + " || " + $nextValid + "; if (!" + $valid + ") { ";
            $closingBraces += "}";
          }
        }
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += " " + $closingBraces + " if (!" + $valid + ") {   var err =   ";
        if (it.createErrors !== false) {
          out += " { keyword: 'anyOf' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
          if (it.opts.messages !== false) {
            out += " , message: 'should match some schema in anyOf' ";
          }
          if (it.opts.verbose) {
            out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError(vErrors); ";
          } else {
            out += " validate.errors = vErrors; return false; ";
          }
        }
        out += " } else {  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; } ";
        if (it.opts.allErrors) {
          out += " } ";
        }
      } else {
        if ($breakOnError) {
          out += " if (true) { ";
        }
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/comment.js
var require_comment = __commonJS({
  "node_modules/ajv/lib/dotjs/comment.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_comment(it, $keyword, $ruleType) {
      var out = " ";
      var $schema2 = it.schema[$keyword];
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $comment = it.util.toQuotedString($schema2);
      if (it.opts.$comment === true) {
        out += " console.log(" + $comment + ");";
      } else if (typeof it.opts.$comment == "function") {
        out += " self._opts.$comment(" + $comment + ", " + it.util.toQuotedString($errSchemaPath) + ", validate.root.schema);";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/const.js
var require_const = __commonJS({
  "node_modules/ajv/lib/dotjs/const.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_const(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      if (!$isData) {
        out += " var schema" + $lvl + " = validate.schema" + $schemaPath + ";";
      }
      out += "var " + $valid + " = equal(" + $data + ", schema" + $lvl + "); if (!" + $valid + ") {   ";
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: 'const' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { allowedValue: schema" + $lvl + " } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should be equal to constant' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += " }";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/contains.js
var require_contains = __commonJS({
  "node_modules/ajv/lib/dotjs/contains.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_contains(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      var $idx = "i" + $lvl, $dataNxt = $it.dataLevel = it.dataLevel + 1, $nextData = "data" + $dataNxt, $currentBaseId = it.baseId, $nonEmptySchema = it.opts.strictKeywords ? typeof $schema2 == "object" && Object.keys($schema2).length > 0 || $schema2 === false : it.util.schemaHasRules($schema2, it.RULES.all);
      out += "var " + $errs + " = errors;var " + $valid + ";";
      if ($nonEmptySchema) {
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        $it.schema = $schema2;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        out += " var " + $nextValid + " = false; for (var " + $idx + " = 0; " + $idx + " < " + $data + ".length; " + $idx + "++) { ";
        $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
        var $passData = $data + "[" + $idx + "]";
        $it.dataPathArr[$dataNxt] = $idx;
        var $code = it.validate($it);
        $it.baseId = $currentBaseId;
        if (it.util.varOccurences($code, $nextData) < 2) {
          out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
        } else {
          out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
        }
        out += " if (" + $nextValid + ") break; }  ";
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += " " + $closingBraces + " if (!" + $nextValid + ") {";
      } else {
        out += " if (" + $data + ".length == 0) {";
      }
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: 'contains' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
        if (it.opts.messages !== false) {
          out += " , message: 'should contain a valid item' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += " } else { ";
      if ($nonEmptySchema) {
        out += "  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; } ";
      }
      if (it.opts.allErrors) {
        out += " } ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/dependencies.js
var require_dependencies = __commonJS({
  "node_modules/ajv/lib/dotjs/dependencies.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_dependencies(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      var $schemaDeps = {}, $propertyDeps = {}, $ownProperties = it.opts.ownProperties;
      for ($property in $schema2) {
        if ($property == "__proto__")
          continue;
        var $sch = $schema2[$property];
        var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
        $deps[$property] = $sch;
      }
      out += "var " + $errs + " = errors;";
      var $currentErrorPath = it.errorPath;
      out += "var missing" + $lvl + ";";
      for (var $property in $propertyDeps) {
        $deps = $propertyDeps[$property];
        if ($deps.length) {
          out += " if ( " + $data + it.util.getProperty($property) + " !== undefined ";
          if ($ownProperties) {
            out += " && Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($property) + "') ";
          }
          if ($breakOnError) {
            out += " && ( ";
            var arr1 = $deps;
            if (arr1) {
              var $propertyKey, $i = -1, l1 = arr1.length - 1;
              while ($i < l1) {
                $propertyKey = arr1[$i += 1];
                if ($i) {
                  out += " || ";
                }
                var $prop = it.util.getProperty($propertyKey), $useData = $data + $prop;
                out += " ( ( " + $useData + " === undefined ";
                if ($ownProperties) {
                  out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                }
                out += ") && (missing" + $lvl + " = " + it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop) + ") ) ";
              }
            }
            out += ")) {  ";
            var $propertyPath = "missing" + $lvl, $missingProperty = "' + " + $propertyPath + " + '";
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + " + " + $propertyPath;
            }
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = "";
            if (it.createErrors !== false) {
              out += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { property: '" + it.util.escapeQuotes($property) + "', missingProperty: '" + $missingProperty + "', depsCount: " + $deps.length + ", deps: '" + it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", ")) + "' } ";
              if (it.opts.messages !== false) {
                out += " , message: 'should have ";
                if ($deps.length == 1) {
                  out += "property " + it.util.escapeQuotes($deps[0]);
                } else {
                  out += "properties " + it.util.escapeQuotes($deps.join(", "));
                }
                out += " when property " + it.util.escapeQuotes($property) + " is present' ";
              }
              if (it.opts.verbose) {
                out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              if (it.async) {
                out += " throw new ValidationError([" + __err + "]); ";
              } else {
                out += " validate.errors = [" + __err + "]; return false; ";
              }
            } else {
              out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            }
          } else {
            out += " ) { ";
            var arr2 = $deps;
            if (arr2) {
              var $propertyKey, i2 = -1, l2 = arr2.length - 1;
              while (i2 < l2) {
                $propertyKey = arr2[i2 += 1];
                var $prop = it.util.getProperty($propertyKey), $missingProperty = it.util.escapeQuotes($propertyKey), $useData = $data + $prop;
                if (it.opts._errorDataPathProperty) {
                  it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
                }
                out += " if ( " + $useData + " === undefined ";
                if ($ownProperties) {
                  out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                }
                out += ") {  var err =   ";
                if (it.createErrors !== false) {
                  out += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { property: '" + it.util.escapeQuotes($property) + "', missingProperty: '" + $missingProperty + "', depsCount: " + $deps.length + ", deps: '" + it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", ")) + "' } ";
                  if (it.opts.messages !== false) {
                    out += " , message: 'should have ";
                    if ($deps.length == 1) {
                      out += "property " + it.util.escapeQuotes($deps[0]);
                    } else {
                      out += "properties " + it.util.escapeQuotes($deps.join(", "));
                    }
                    out += " when property " + it.util.escapeQuotes($property) + " is present' ";
                  }
                  if (it.opts.verbose) {
                    out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                  }
                  out += " } ";
                } else {
                  out += " {} ";
                }
                out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ";
              }
            }
          }
          out += " }   ";
          if ($breakOnError) {
            $closingBraces += "}";
            out += " else { ";
          }
        }
      }
      it.errorPath = $currentErrorPath;
      var $currentBaseId = $it.baseId;
      for (var $property in $schemaDeps) {
        var $sch = $schemaDeps[$property];
        if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
          out += " " + $nextValid + " = true; if ( " + $data + it.util.getProperty($property) + " !== undefined ";
          if ($ownProperties) {
            out += " && Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($property) + "') ";
          }
          out += ") { ";
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + it.util.getProperty($property);
          $it.errSchemaPath = $errSchemaPath + "/" + it.util.escapeFragment($property);
          out += "  " + it.validate($it) + " ";
          $it.baseId = $currentBaseId;
          out += " }  ";
          if ($breakOnError) {
            out += " if (" + $nextValid + ") { ";
            $closingBraces += "}";
          }
        }
      }
      if ($breakOnError) {
        out += "   " + $closingBraces + " if (" + $errs + " == errors) {";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/enum.js
var require_enum = __commonJS({
  "node_modules/ajv/lib/dotjs/enum.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_enum(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      var $i = "i" + $lvl, $vSchema = "schema" + $lvl;
      if (!$isData) {
        out += " var " + $vSchema + " = validate.schema" + $schemaPath + ";";
      }
      out += "var " + $valid + ";";
      if ($isData) {
        out += " if (schema" + $lvl + " === undefined) " + $valid + " = true; else if (!Array.isArray(schema" + $lvl + ")) " + $valid + " = false; else {";
      }
      out += "" + $valid + " = false;for (var " + $i + "=0; " + $i + "<" + $vSchema + ".length; " + $i + "++) if (equal(" + $data + ", " + $vSchema + "[" + $i + "])) { " + $valid + " = true; break; }";
      if ($isData) {
        out += "  }  ";
      }
      out += " if (!" + $valid + ") {   ";
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: 'enum' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { allowedValues: schema" + $lvl + " } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should be equal to one of the allowed values' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += " }";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/format.js
var require_format = __commonJS({
  "node_modules/ajv/lib/dotjs/format.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_format(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      if (it.opts.format === false) {
        if ($breakOnError) {
          out += " if (true) { ";
        }
        return out;
      }
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      var $unknownFormats = it.opts.unknownFormats, $allowUnknown = Array.isArray($unknownFormats);
      if ($isData) {
        var $format = "format" + $lvl, $isObject = "isObject" + $lvl, $formatType = "formatType" + $lvl;
        out += " var " + $format + " = formats[" + $schemaValue + "]; var " + $isObject + " = typeof " + $format + " == 'object' && !(" + $format + " instanceof RegExp) && " + $format + ".validate; var " + $formatType + " = " + $isObject + " && " + $format + ".type || 'string'; if (" + $isObject + ") { ";
        if (it.async) {
          out += " var async" + $lvl + " = " + $format + ".async; ";
        }
        out += " " + $format + " = " + $format + ".validate; } if (  ";
        if ($isData) {
          out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'string') || ";
        }
        out += " (";
        if ($unknownFormats != "ignore") {
          out += " (" + $schemaValue + " && !" + $format + " ";
          if ($allowUnknown) {
            out += " && self._opts.unknownFormats.indexOf(" + $schemaValue + ") == -1 ";
          }
          out += ") || ";
        }
        out += " (" + $format + " && " + $formatType + " == '" + $ruleType + "' && !(typeof " + $format + " == 'function' ? ";
        if (it.async) {
          out += " (async" + $lvl + " ? await " + $format + "(" + $data + ") : " + $format + "(" + $data + ")) ";
        } else {
          out += " " + $format + "(" + $data + ") ";
        }
        out += " : " + $format + ".test(" + $data + "))))) {";
      } else {
        var $format = it.formats[$schema2];
        if (!$format) {
          if ($unknownFormats == "ignore") {
            it.logger.warn('unknown format "' + $schema2 + '" ignored in schema at path "' + it.errSchemaPath + '"');
            if ($breakOnError) {
              out += " if (true) { ";
            }
            return out;
          } else if ($allowUnknown && $unknownFormats.indexOf($schema2) >= 0) {
            if ($breakOnError) {
              out += " if (true) { ";
            }
            return out;
          } else {
            throw new Error('unknown format "' + $schema2 + '" is used in schema at path "' + it.errSchemaPath + '"');
          }
        }
        var $isObject = typeof $format == "object" && !($format instanceof RegExp) && $format.validate;
        var $formatType = $isObject && $format.type || "string";
        if ($isObject) {
          var $async = $format.async === true;
          $format = $format.validate;
        }
        if ($formatType != $ruleType) {
          if ($breakOnError) {
            out += " if (true) { ";
          }
          return out;
        }
        if ($async) {
          if (!it.async)
            throw new Error("async format in sync schema");
          var $formatRef = "formats" + it.util.getProperty($schema2) + ".validate";
          out += " if (!(await " + $formatRef + "(" + $data + "))) { ";
        } else {
          out += " if (! ";
          var $formatRef = "formats" + it.util.getProperty($schema2);
          if ($isObject)
            $formatRef += ".validate";
          if (typeof $format == "function") {
            out += " " + $formatRef + "(" + $data + ") ";
          } else {
            out += " " + $formatRef + ".test(" + $data + ") ";
          }
          out += ") { ";
        }
      }
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: 'format' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { format:  ";
        if ($isData) {
          out += "" + $schemaValue;
        } else {
          out += "" + it.util.toQuotedString($schema2);
        }
        out += "  } ";
        if (it.opts.messages !== false) {
          out += ` , message: 'should match format "`;
          if ($isData) {
            out += "' + " + $schemaValue + " + '";
          } else {
            out += "" + it.util.escapeQuotes($schema2);
          }
          out += `"' `;
        }
        if (it.opts.verbose) {
          out += " , schema:  ";
          if ($isData) {
            out += "validate.schema" + $schemaPath;
          } else {
            out += "" + it.util.toQuotedString($schema2);
          }
          out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += " } ";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/if.js
var require_if = __commonJS({
  "node_modules/ajv/lib/dotjs/if.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_if(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      $it.level++;
      var $nextValid = "valid" + $it.level;
      var $thenSch = it.schema["then"], $elseSch = it.schema["else"], $thenPresent = $thenSch !== void 0 && (it.opts.strictKeywords ? typeof $thenSch == "object" && Object.keys($thenSch).length > 0 || $thenSch === false : it.util.schemaHasRules($thenSch, it.RULES.all)), $elsePresent = $elseSch !== void 0 && (it.opts.strictKeywords ? typeof $elseSch == "object" && Object.keys($elseSch).length > 0 || $elseSch === false : it.util.schemaHasRules($elseSch, it.RULES.all)), $currentBaseId = $it.baseId;
      if ($thenPresent || $elsePresent) {
        var $ifClause;
        $it.createErrors = false;
        $it.schema = $schema2;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        out += " var " + $errs + " = errors; var " + $valid + " = true;  ";
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        out += "  " + it.validate($it) + " ";
        $it.baseId = $currentBaseId;
        $it.createErrors = true;
        out += "  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; }  ";
        it.compositeRule = $it.compositeRule = $wasComposite;
        if ($thenPresent) {
          out += " if (" + $nextValid + ") {  ";
          $it.schema = it.schema["then"];
          $it.schemaPath = it.schemaPath + ".then";
          $it.errSchemaPath = it.errSchemaPath + "/then";
          out += "  " + it.validate($it) + " ";
          $it.baseId = $currentBaseId;
          out += " " + $valid + " = " + $nextValid + "; ";
          if ($thenPresent && $elsePresent) {
            $ifClause = "ifClause" + $lvl;
            out += " var " + $ifClause + " = 'then'; ";
          } else {
            $ifClause = "'then'";
          }
          out += " } ";
          if ($elsePresent) {
            out += " else { ";
          }
        } else {
          out += " if (!" + $nextValid + ") { ";
        }
        if ($elsePresent) {
          $it.schema = it.schema["else"];
          $it.schemaPath = it.schemaPath + ".else";
          $it.errSchemaPath = it.errSchemaPath + "/else";
          out += "  " + it.validate($it) + " ";
          $it.baseId = $currentBaseId;
          out += " " + $valid + " = " + $nextValid + "; ";
          if ($thenPresent && $elsePresent) {
            $ifClause = "ifClause" + $lvl;
            out += " var " + $ifClause + " = 'else'; ";
          } else {
            $ifClause = "'else'";
          }
          out += " } ";
        }
        out += " if (!" + $valid + ") {   var err =   ";
        if (it.createErrors !== false) {
          out += " { keyword: 'if' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { failingKeyword: " + $ifClause + " } ";
          if (it.opts.messages !== false) {
            out += ` , message: 'should match "' + ` + $ifClause + ` + '" schema' `;
          }
          if (it.opts.verbose) {
            out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError(vErrors); ";
          } else {
            out += " validate.errors = vErrors; return false; ";
          }
        }
        out += " }   ";
        if ($breakOnError) {
          out += " else { ";
        }
      } else {
        if ($breakOnError) {
          out += " if (true) { ";
        }
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/items.js
var require_items = __commonJS({
  "node_modules/ajv/lib/dotjs/items.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_items(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      var $idx = "i" + $lvl, $dataNxt = $it.dataLevel = it.dataLevel + 1, $nextData = "data" + $dataNxt, $currentBaseId = it.baseId;
      out += "var " + $errs + " = errors;var " + $valid + ";";
      if (Array.isArray($schema2)) {
        var $additionalItems = it.schema.additionalItems;
        if ($additionalItems === false) {
          out += " " + $valid + " = " + $data + ".length <= " + $schema2.length + "; ";
          var $currErrSchemaPath = $errSchemaPath;
          $errSchemaPath = it.errSchemaPath + "/additionalItems";
          out += "  if (!" + $valid + ") {   ";
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = "";
          if (it.createErrors !== false) {
            out += " { keyword: 'additionalItems' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { limit: " + $schema2.length + " } ";
            if (it.opts.messages !== false) {
              out += " , message: 'should NOT have more than " + $schema2.length + " items' ";
            }
            if (it.opts.verbose) {
              out += " , schema: false , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError([" + __err + "]); ";
            } else {
              out += " validate.errors = [" + __err + "]; return false; ";
            }
          } else {
            out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          }
          out += " } ";
          $errSchemaPath = $currErrSchemaPath;
          if ($breakOnError) {
            $closingBraces += "}";
            out += " else { ";
          }
        }
        var arr1 = $schema2;
        if (arr1) {
          var $sch, $i = -1, l1 = arr1.length - 1;
          while ($i < l1) {
            $sch = arr1[$i += 1];
            if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
              out += " " + $nextValid + " = true; if (" + $data + ".length > " + $i + ") { ";
              var $passData = $data + "[" + $i + "]";
              $it.schema = $sch;
              $it.schemaPath = $schemaPath + "[" + $i + "]";
              $it.errSchemaPath = $errSchemaPath + "/" + $i;
              $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
              $it.dataPathArr[$dataNxt] = $i;
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
              } else {
                out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
              }
              out += " }  ";
              if ($breakOnError) {
                out += " if (" + $nextValid + ") { ";
                $closingBraces += "}";
              }
            }
          }
        }
        if (typeof $additionalItems == "object" && (it.opts.strictKeywords ? typeof $additionalItems == "object" && Object.keys($additionalItems).length > 0 || $additionalItems === false : it.util.schemaHasRules($additionalItems, it.RULES.all))) {
          $it.schema = $additionalItems;
          $it.schemaPath = it.schemaPath + ".additionalItems";
          $it.errSchemaPath = it.errSchemaPath + "/additionalItems";
          out += " " + $nextValid + " = true; if (" + $data + ".length > " + $schema2.length + ") {  for (var " + $idx + " = " + $schema2.length + "; " + $idx + " < " + $data + ".length; " + $idx + "++) { ";
          $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
          var $passData = $data + "[" + $idx + "]";
          $it.dataPathArr[$dataNxt] = $idx;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
          } else {
            out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
          }
          if ($breakOnError) {
            out += " if (!" + $nextValid + ") break; ";
          }
          out += " } }  ";
          if ($breakOnError) {
            out += " if (" + $nextValid + ") { ";
            $closingBraces += "}";
          }
        }
      } else if (it.opts.strictKeywords ? typeof $schema2 == "object" && Object.keys($schema2).length > 0 || $schema2 === false : it.util.schemaHasRules($schema2, it.RULES.all)) {
        $it.schema = $schema2;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        out += "  for (var " + $idx + " = 0; " + $idx + " < " + $data + ".length; " + $idx + "++) { ";
        $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
        var $passData = $data + "[" + $idx + "]";
        $it.dataPathArr[$dataNxt] = $idx;
        var $code = it.validate($it);
        $it.baseId = $currentBaseId;
        if (it.util.varOccurences($code, $nextData) < 2) {
          out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
        } else {
          out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
        }
        if ($breakOnError) {
          out += " if (!" + $nextValid + ") break; ";
        }
        out += " }";
      }
      if ($breakOnError) {
        out += " " + $closingBraces + " if (" + $errs + " == errors) {";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/_limit.js
var require_limit = __commonJS({
  "node_modules/ajv/lib/dotjs/_limit.js"(exports, module2) {
    "use strict";
    module2.exports = function generate__limit(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = "data" + ($dataLvl || "");
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      var $isMax = $keyword == "maximum", $exclusiveKeyword = $isMax ? "exclusiveMaximum" : "exclusiveMinimum", $schemaExcl = it.schema[$exclusiveKeyword], $isDataExcl = it.opts.$data && $schemaExcl && $schemaExcl.$data, $op = $isMax ? "<" : ">", $notOp = $isMax ? ">" : "<", $errorKeyword = void 0;
      if (!($isData || typeof $schema2 == "number" || $schema2 === void 0)) {
        throw new Error($keyword + " must be number");
      }
      if (!($isDataExcl || $schemaExcl === void 0 || typeof $schemaExcl == "number" || typeof $schemaExcl == "boolean")) {
        throw new Error($exclusiveKeyword + " must be number or boolean");
      }
      if ($isDataExcl) {
        var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr), $exclusive = "exclusive" + $lvl, $exclType = "exclType" + $lvl, $exclIsNumber = "exclIsNumber" + $lvl, $opExpr = "op" + $lvl, $opStr = "' + " + $opExpr + " + '";
        out += " var schemaExcl" + $lvl + " = " + $schemaValueExcl + "; ";
        $schemaValueExcl = "schemaExcl" + $lvl;
        out += " var " + $exclusive + "; var " + $exclType + " = typeof " + $schemaValueExcl + "; if (" + $exclType + " != 'boolean' && " + $exclType + " != 'undefined' && " + $exclType + " != 'number') { ";
        var $errorKeyword = $exclusiveKeyword;
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        if (it.createErrors !== false) {
          out += " { keyword: '" + ($errorKeyword || "_exclusiveLimit") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
          if (it.opts.messages !== false) {
            out += " , message: '" + $exclusiveKeyword + " should be boolean' ";
          }
          if (it.opts.verbose) {
            out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError([" + __err + "]); ";
          } else {
            out += " validate.errors = [" + __err + "]; return false; ";
          }
        } else {
          out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        }
        out += " } else if ( ";
        if ($isData) {
          out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
        }
        out += " " + $exclType + " == 'number' ? ( (" + $exclusive + " = " + $schemaValue + " === undefined || " + $schemaValueExcl + " " + $op + "= " + $schemaValue + ") ? " + $data + " " + $notOp + "= " + $schemaValueExcl + " : " + $data + " " + $notOp + " " + $schemaValue + " ) : ( (" + $exclusive + " = " + $schemaValueExcl + " === true) ? " + $data + " " + $notOp + "= " + $schemaValue + " : " + $data + " " + $notOp + " " + $schemaValue + " ) || " + $data + " !== " + $data + ") { var op" + $lvl + " = " + $exclusive + " ? '" + $op + "' : '" + $op + "='; ";
        if ($schema2 === void 0) {
          $errorKeyword = $exclusiveKeyword;
          $errSchemaPath = it.errSchemaPath + "/" + $exclusiveKeyword;
          $schemaValue = $schemaValueExcl;
          $isData = $isDataExcl;
        }
      } else {
        var $exclIsNumber = typeof $schemaExcl == "number", $opStr = $op;
        if ($exclIsNumber && $isData) {
          var $opExpr = "'" + $opStr + "'";
          out += " if ( ";
          if ($isData) {
            out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
          }
          out += " ( " + $schemaValue + " === undefined || " + $schemaExcl + " " + $op + "= " + $schemaValue + " ? " + $data + " " + $notOp + "= " + $schemaExcl + " : " + $data + " " + $notOp + " " + $schemaValue + " ) || " + $data + " !== " + $data + ") { ";
        } else {
          if ($exclIsNumber && $schema2 === void 0) {
            $exclusive = true;
            $errorKeyword = $exclusiveKeyword;
            $errSchemaPath = it.errSchemaPath + "/" + $exclusiveKeyword;
            $schemaValue = $schemaExcl;
            $notOp += "=";
          } else {
            if ($exclIsNumber)
              $schemaValue = Math[$isMax ? "min" : "max"]($schemaExcl, $schema2);
            if ($schemaExcl === ($exclIsNumber ? $schemaValue : true)) {
              $exclusive = true;
              $errorKeyword = $exclusiveKeyword;
              $errSchemaPath = it.errSchemaPath + "/" + $exclusiveKeyword;
              $notOp += "=";
            } else {
              $exclusive = false;
              $opStr += "=";
            }
          }
          var $opExpr = "'" + $opStr + "'";
          out += " if ( ";
          if ($isData) {
            out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
          }
          out += " " + $data + " " + $notOp + " " + $schemaValue + " || " + $data + " !== " + $data + ") { ";
        }
      }
      $errorKeyword = $errorKeyword || $keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: '" + ($errorKeyword || "_limit") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { comparison: " + $opExpr + ", limit: " + $schemaValue + ", exclusive: " + $exclusive + " } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should be " + $opStr + " ";
          if ($isData) {
            out += "' + " + $schemaValue;
          } else {
            out += "" + $schemaValue + "'";
          }
        }
        if (it.opts.verbose) {
          out += " , schema:  ";
          if ($isData) {
            out += "validate.schema" + $schemaPath;
          } else {
            out += "" + $schema2;
          }
          out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += " } ";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/_limitItems.js
var require_limitItems = __commonJS({
  "node_modules/ajv/lib/dotjs/_limitItems.js"(exports, module2) {
    "use strict";
    module2.exports = function generate__limitItems(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = "data" + ($dataLvl || "");
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      if (!($isData || typeof $schema2 == "number")) {
        throw new Error($keyword + " must be number");
      }
      var $op = $keyword == "maxItems" ? ">" : "<";
      out += "if ( ";
      if ($isData) {
        out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
      }
      out += " " + $data + ".length " + $op + " " + $schemaValue + ") { ";
      var $errorKeyword = $keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: '" + ($errorKeyword || "_limitItems") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { limit: " + $schemaValue + " } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should NOT have ";
          if ($keyword == "maxItems") {
            out += "more";
          } else {
            out += "fewer";
          }
          out += " than ";
          if ($isData) {
            out += "' + " + $schemaValue + " + '";
          } else {
            out += "" + $schema2;
          }
          out += " items' ";
        }
        if (it.opts.verbose) {
          out += " , schema:  ";
          if ($isData) {
            out += "validate.schema" + $schemaPath;
          } else {
            out += "" + $schema2;
          }
          out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += "} ";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/_limitLength.js
var require_limitLength = __commonJS({
  "node_modules/ajv/lib/dotjs/_limitLength.js"(exports, module2) {
    "use strict";
    module2.exports = function generate__limitLength(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = "data" + ($dataLvl || "");
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      if (!($isData || typeof $schema2 == "number")) {
        throw new Error($keyword + " must be number");
      }
      var $op = $keyword == "maxLength" ? ">" : "<";
      out += "if ( ";
      if ($isData) {
        out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
      }
      if (it.opts.unicode === false) {
        out += " " + $data + ".length ";
      } else {
        out += " ucs2length(" + $data + ") ";
      }
      out += " " + $op + " " + $schemaValue + ") { ";
      var $errorKeyword = $keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: '" + ($errorKeyword || "_limitLength") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { limit: " + $schemaValue + " } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should NOT be ";
          if ($keyword == "maxLength") {
            out += "longer";
          } else {
            out += "shorter";
          }
          out += " than ";
          if ($isData) {
            out += "' + " + $schemaValue + " + '";
          } else {
            out += "" + $schema2;
          }
          out += " characters' ";
        }
        if (it.opts.verbose) {
          out += " , schema:  ";
          if ($isData) {
            out += "validate.schema" + $schemaPath;
          } else {
            out += "" + $schema2;
          }
          out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += "} ";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/_limitProperties.js
var require_limitProperties = __commonJS({
  "node_modules/ajv/lib/dotjs/_limitProperties.js"(exports, module2) {
    "use strict";
    module2.exports = function generate__limitProperties(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = "data" + ($dataLvl || "");
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      if (!($isData || typeof $schema2 == "number")) {
        throw new Error($keyword + " must be number");
      }
      var $op = $keyword == "maxProperties" ? ">" : "<";
      out += "if ( ";
      if ($isData) {
        out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
      }
      out += " Object.keys(" + $data + ").length " + $op + " " + $schemaValue + ") { ";
      var $errorKeyword = $keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: '" + ($errorKeyword || "_limitProperties") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { limit: " + $schemaValue + " } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should NOT have ";
          if ($keyword == "maxProperties") {
            out += "more";
          } else {
            out += "fewer";
          }
          out += " than ";
          if ($isData) {
            out += "' + " + $schemaValue + " + '";
          } else {
            out += "" + $schema2;
          }
          out += " properties' ";
        }
        if (it.opts.verbose) {
          out += " , schema:  ";
          if ($isData) {
            out += "validate.schema" + $schemaPath;
          } else {
            out += "" + $schema2;
          }
          out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += "} ";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/multipleOf.js
var require_multipleOf = __commonJS({
  "node_modules/ajv/lib/dotjs/multipleOf.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_multipleOf(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      if (!($isData || typeof $schema2 == "number")) {
        throw new Error($keyword + " must be number");
      }
      out += "var division" + $lvl + ";if (";
      if ($isData) {
        out += " " + $schemaValue + " !== undefined && ( typeof " + $schemaValue + " != 'number' || ";
      }
      out += " (division" + $lvl + " = " + $data + " / " + $schemaValue + ", ";
      if (it.opts.multipleOfPrecision) {
        out += " Math.abs(Math.round(division" + $lvl + ") - division" + $lvl + ") > 1e-" + it.opts.multipleOfPrecision + " ";
      } else {
        out += " division" + $lvl + " !== parseInt(division" + $lvl + ") ";
      }
      out += " ) ";
      if ($isData) {
        out += "  )  ";
      }
      out += " ) {   ";
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: 'multipleOf' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { multipleOf: " + $schemaValue + " } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should be multiple of ";
          if ($isData) {
            out += "' + " + $schemaValue;
          } else {
            out += "" + $schemaValue + "'";
          }
        }
        if (it.opts.verbose) {
          out += " , schema:  ";
          if ($isData) {
            out += "validate.schema" + $schemaPath;
          } else {
            out += "" + $schema2;
          }
          out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += "} ";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/not.js
var require_not = __commonJS({
  "node_modules/ajv/lib/dotjs/not.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_not(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      $it.level++;
      var $nextValid = "valid" + $it.level;
      if (it.opts.strictKeywords ? typeof $schema2 == "object" && Object.keys($schema2).length > 0 || $schema2 === false : it.util.schemaHasRules($schema2, it.RULES.all)) {
        $it.schema = $schema2;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        out += " var " + $errs + " = errors;  ";
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        $it.createErrors = false;
        var $allErrorsOption;
        if ($it.opts.allErrors) {
          $allErrorsOption = $it.opts.allErrors;
          $it.opts.allErrors = false;
        }
        out += " " + it.validate($it) + " ";
        $it.createErrors = true;
        if ($allErrorsOption)
          $it.opts.allErrors = $allErrorsOption;
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += " if (" + $nextValid + ") {   ";
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        if (it.createErrors !== false) {
          out += " { keyword: 'not' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
          if (it.opts.messages !== false) {
            out += " , message: 'should NOT be valid' ";
          }
          if (it.opts.verbose) {
            out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError([" + __err + "]); ";
          } else {
            out += " validate.errors = [" + __err + "]; return false; ";
          }
        } else {
          out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        }
        out += " } else {  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; } ";
        if (it.opts.allErrors) {
          out += " } ";
        }
      } else {
        out += "  var err =   ";
        if (it.createErrors !== false) {
          out += " { keyword: 'not' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
          if (it.opts.messages !== false) {
            out += " , message: 'should NOT be valid' ";
          }
          if (it.opts.verbose) {
            out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if ($breakOnError) {
          out += " if (false) { ";
        }
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/oneOf.js
var require_oneOf = __commonJS({
  "node_modules/ajv/lib/dotjs/oneOf.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_oneOf(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      var $currentBaseId = $it.baseId, $prevValid = "prevValid" + $lvl, $passingSchemas = "passingSchemas" + $lvl;
      out += "var " + $errs + " = errors , " + $prevValid + " = false , " + $valid + " = false , " + $passingSchemas + " = null; ";
      var $wasComposite = it.compositeRule;
      it.compositeRule = $it.compositeRule = true;
      var arr1 = $schema2;
      if (arr1) {
        var $sch, $i = -1, l1 = arr1.length - 1;
        while ($i < l1) {
          $sch = arr1[$i += 1];
          if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + "[" + $i + "]";
            $it.errSchemaPath = $errSchemaPath + "/" + $i;
            out += "  " + it.validate($it) + " ";
            $it.baseId = $currentBaseId;
          } else {
            out += " var " + $nextValid + " = true; ";
          }
          if ($i) {
            out += " if (" + $nextValid + " && " + $prevValid + ") { " + $valid + " = false; " + $passingSchemas + " = [" + $passingSchemas + ", " + $i + "]; } else { ";
            $closingBraces += "}";
          }
          out += " if (" + $nextValid + ") { " + $valid + " = " + $prevValid + " = true; " + $passingSchemas + " = " + $i + "; }";
        }
      }
      it.compositeRule = $it.compositeRule = $wasComposite;
      out += "" + $closingBraces + "if (!" + $valid + ") {   var err =   ";
      if (it.createErrors !== false) {
        out += " { keyword: 'oneOf' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { passingSchemas: " + $passingSchemas + " } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should match exactly one schema in oneOf' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError(vErrors); ";
        } else {
          out += " validate.errors = vErrors; return false; ";
        }
      }
      out += "} else {  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; }";
      if (it.opts.allErrors) {
        out += " } ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/pattern.js
var require_pattern = __commonJS({
  "node_modules/ajv/lib/dotjs/pattern.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_pattern(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      var $regexp = $isData ? "(new RegExp(" + $schemaValue + "))" : it.usePattern($schema2);
      out += "if ( ";
      if ($isData) {
        out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'string') || ";
      }
      out += " !" + $regexp + ".test(" + $data + ") ) {   ";
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: 'pattern' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { pattern:  ";
        if ($isData) {
          out += "" + $schemaValue;
        } else {
          out += "" + it.util.toQuotedString($schema2);
        }
        out += "  } ";
        if (it.opts.messages !== false) {
          out += ` , message: 'should match pattern "`;
          if ($isData) {
            out += "' + " + $schemaValue + " + '";
          } else {
            out += "" + it.util.escapeQuotes($schema2);
          }
          out += `"' `;
        }
        if (it.opts.verbose) {
          out += " , schema:  ";
          if ($isData) {
            out += "validate.schema" + $schemaPath;
          } else {
            out += "" + it.util.toQuotedString($schema2);
          }
          out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += "} ";
      if ($breakOnError) {
        out += " else { ";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/properties.js
var require_properties = __commonJS({
  "node_modules/ajv/lib/dotjs/properties.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_properties(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      var $key = "key" + $lvl, $idx = "idx" + $lvl, $dataNxt = $it.dataLevel = it.dataLevel + 1, $nextData = "data" + $dataNxt, $dataProperties = "dataProperties" + $lvl;
      var $schemaKeys = Object.keys($schema2 || {}).filter(notProto), $pProperties = it.schema.patternProperties || {}, $pPropertyKeys = Object.keys($pProperties).filter(notProto), $aProperties = it.schema.additionalProperties, $someProperties = $schemaKeys.length || $pPropertyKeys.length, $noAdditional = $aProperties === false, $additionalIsSchema = typeof $aProperties == "object" && Object.keys($aProperties).length, $removeAdditional = it.opts.removeAdditional, $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional, $ownProperties = it.opts.ownProperties, $currentBaseId = it.baseId;
      var $required = it.schema.required;
      if ($required && !(it.opts.$data && $required.$data) && $required.length < it.opts.loopRequired) {
        var $requiredHash = it.util.toHash($required);
      }
      function notProto(p) {
        return p !== "__proto__";
      }
      out += "var " + $errs + " = errors;var " + $nextValid + " = true;";
      if ($ownProperties) {
        out += " var " + $dataProperties + " = undefined;";
      }
      if ($checkAdditional) {
        if ($ownProperties) {
          out += " " + $dataProperties + " = " + $dataProperties + " || Object.keys(" + $data + "); for (var " + $idx + "=0; " + $idx + "<" + $dataProperties + ".length; " + $idx + "++) { var " + $key + " = " + $dataProperties + "[" + $idx + "]; ";
        } else {
          out += " for (var " + $key + " in " + $data + ") { ";
        }
        if ($someProperties) {
          out += " var isAdditional" + $lvl + " = !(false ";
          if ($schemaKeys.length) {
            if ($schemaKeys.length > 8) {
              out += " || validate.schema" + $schemaPath + ".hasOwnProperty(" + $key + ") ";
            } else {
              var arr1 = $schemaKeys;
              if (arr1) {
                var $propertyKey, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  $propertyKey = arr1[i1 += 1];
                  out += " || " + $key + " == " + it.util.toQuotedString($propertyKey) + " ";
                }
              }
            }
          }
          if ($pPropertyKeys.length) {
            var arr2 = $pPropertyKeys;
            if (arr2) {
              var $pProperty, $i = -1, l2 = arr2.length - 1;
              while ($i < l2) {
                $pProperty = arr2[$i += 1];
                out += " || " + it.usePattern($pProperty) + ".test(" + $key + ") ";
              }
            }
          }
          out += " ); if (isAdditional" + $lvl + ") { ";
        }
        if ($removeAdditional == "all") {
          out += " delete " + $data + "[" + $key + "]; ";
        } else {
          var $currentErrorPath = it.errorPath;
          var $additionalProperty = "' + " + $key + " + '";
          if (it.opts._errorDataPathProperty) {
            it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          }
          if ($noAdditional) {
            if ($removeAdditional) {
              out += " delete " + $data + "[" + $key + "]; ";
            } else {
              out += " " + $nextValid + " = false; ";
              var $currErrSchemaPath = $errSchemaPath;
              $errSchemaPath = it.errSchemaPath + "/additionalProperties";
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = "";
              if (it.createErrors !== false) {
                out += " { keyword: 'additionalProperties' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { additionalProperty: '" + $additionalProperty + "' } ";
                if (it.opts.messages !== false) {
                  out += " , message: '";
                  if (it.opts._errorDataPathProperty) {
                    out += "is an invalid additional property";
                  } else {
                    out += "should NOT have additional properties";
                  }
                  out += "' ";
                }
                if (it.opts.verbose) {
                  out += " , schema: false , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                }
                out += " } ";
              } else {
                out += " {} ";
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) {
                if (it.async) {
                  out += " throw new ValidationError([" + __err + "]); ";
                } else {
                  out += " validate.errors = [" + __err + "]; return false; ";
                }
              } else {
                out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
              }
              $errSchemaPath = $currErrSchemaPath;
              if ($breakOnError) {
                out += " break; ";
              }
            }
          } else if ($additionalIsSchema) {
            if ($removeAdditional == "failing") {
              out += " var " + $errs + " = errors;  ";
              var $wasComposite = it.compositeRule;
              it.compositeRule = $it.compositeRule = true;
              $it.schema = $aProperties;
              $it.schemaPath = it.schemaPath + ".additionalProperties";
              $it.errSchemaPath = it.errSchemaPath + "/additionalProperties";
              $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
              var $passData = $data + "[" + $key + "]";
              $it.dataPathArr[$dataNxt] = $key;
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
              } else {
                out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
              }
              out += " if (!" + $nextValid + ") { errors = " + $errs + "; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete " + $data + "[" + $key + "]; }  ";
              it.compositeRule = $it.compositeRule = $wasComposite;
            } else {
              $it.schema = $aProperties;
              $it.schemaPath = it.schemaPath + ".additionalProperties";
              $it.errSchemaPath = it.errSchemaPath + "/additionalProperties";
              $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
              var $passData = $data + "[" + $key + "]";
              $it.dataPathArr[$dataNxt] = $key;
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
              } else {
                out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
              }
              if ($breakOnError) {
                out += " if (!" + $nextValid + ") break; ";
              }
            }
          }
          it.errorPath = $currentErrorPath;
        }
        if ($someProperties) {
          out += " } ";
        }
        out += " }  ";
        if ($breakOnError) {
          out += " if (" + $nextValid + ") { ";
          $closingBraces += "}";
        }
      }
      var $useDefaults = it.opts.useDefaults && !it.compositeRule;
      if ($schemaKeys.length) {
        var arr3 = $schemaKeys;
        if (arr3) {
          var $propertyKey, i3 = -1, l3 = arr3.length - 1;
          while (i3 < l3) {
            $propertyKey = arr3[i3 += 1];
            var $sch = $schema2[$propertyKey];
            if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
              var $prop = it.util.getProperty($propertyKey), $passData = $data + $prop, $hasDefault = $useDefaults && $sch.default !== void 0;
              $it.schema = $sch;
              $it.schemaPath = $schemaPath + $prop;
              $it.errSchemaPath = $errSchemaPath + "/" + it.util.escapeFragment($propertyKey);
              $it.errorPath = it.util.getPath(it.errorPath, $propertyKey, it.opts.jsonPointers);
              $it.dataPathArr[$dataNxt] = it.util.toQuotedString($propertyKey);
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                $code = it.util.varReplace($code, $nextData, $passData);
                var $useData = $passData;
              } else {
                var $useData = $nextData;
                out += " var " + $nextData + " = " + $passData + "; ";
              }
              if ($hasDefault) {
                out += " " + $code + " ";
              } else {
                if ($requiredHash && $requiredHash[$propertyKey]) {
                  out += " if ( " + $useData + " === undefined ";
                  if ($ownProperties) {
                    out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                  }
                  out += ") { " + $nextValid + " = false; ";
                  var $currentErrorPath = it.errorPath, $currErrSchemaPath = $errSchemaPath, $missingProperty = it.util.escapeQuotes($propertyKey);
                  if (it.opts._errorDataPathProperty) {
                    it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
                  }
                  $errSchemaPath = it.errSchemaPath + "/required";
                  var $$outStack = $$outStack || [];
                  $$outStack.push(out);
                  out = "";
                  if (it.createErrors !== false) {
                    out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
                    if (it.opts.messages !== false) {
                      out += " , message: '";
                      if (it.opts._errorDataPathProperty) {
                        out += "is a required property";
                      } else {
                        out += "should have required property \\'" + $missingProperty + "\\'";
                      }
                      out += "' ";
                    }
                    if (it.opts.verbose) {
                      out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                    }
                    out += " } ";
                  } else {
                    out += " {} ";
                  }
                  var __err = out;
                  out = $$outStack.pop();
                  if (!it.compositeRule && $breakOnError) {
                    if (it.async) {
                      out += " throw new ValidationError([" + __err + "]); ";
                    } else {
                      out += " validate.errors = [" + __err + "]; return false; ";
                    }
                  } else {
                    out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                  }
                  $errSchemaPath = $currErrSchemaPath;
                  it.errorPath = $currentErrorPath;
                  out += " } else { ";
                } else {
                  if ($breakOnError) {
                    out += " if ( " + $useData + " === undefined ";
                    if ($ownProperties) {
                      out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                    }
                    out += ") { " + $nextValid + " = true; } else { ";
                  } else {
                    out += " if (" + $useData + " !== undefined ";
                    if ($ownProperties) {
                      out += " &&   Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                    }
                    out += " ) { ";
                  }
                }
                out += " " + $code + " } ";
              }
            }
            if ($breakOnError) {
              out += " if (" + $nextValid + ") { ";
              $closingBraces += "}";
            }
          }
        }
      }
      if ($pPropertyKeys.length) {
        var arr4 = $pPropertyKeys;
        if (arr4) {
          var $pProperty, i4 = -1, l4 = arr4.length - 1;
          while (i4 < l4) {
            $pProperty = arr4[i4 += 1];
            var $sch = $pProperties[$pProperty];
            if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
              $it.schema = $sch;
              $it.schemaPath = it.schemaPath + ".patternProperties" + it.util.getProperty($pProperty);
              $it.errSchemaPath = it.errSchemaPath + "/patternProperties/" + it.util.escapeFragment($pProperty);
              if ($ownProperties) {
                out += " " + $dataProperties + " = " + $dataProperties + " || Object.keys(" + $data + "); for (var " + $idx + "=0; " + $idx + "<" + $dataProperties + ".length; " + $idx + "++) { var " + $key + " = " + $dataProperties + "[" + $idx + "]; ";
              } else {
                out += " for (var " + $key + " in " + $data + ") { ";
              }
              out += " if (" + it.usePattern($pProperty) + ".test(" + $key + ")) { ";
              $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
              var $passData = $data + "[" + $key + "]";
              $it.dataPathArr[$dataNxt] = $key;
              var $code = it.validate($it);
              $it.baseId = $currentBaseId;
              if (it.util.varOccurences($code, $nextData) < 2) {
                out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
              } else {
                out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
              }
              if ($breakOnError) {
                out += " if (!" + $nextValid + ") break; ";
              }
              out += " } ";
              if ($breakOnError) {
                out += " else " + $nextValid + " = true; ";
              }
              out += " }  ";
              if ($breakOnError) {
                out += " if (" + $nextValid + ") { ";
                $closingBraces += "}";
              }
            }
          }
        }
      }
      if ($breakOnError) {
        out += " " + $closingBraces + " if (" + $errs + " == errors) {";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/propertyNames.js
var require_propertyNames = __commonJS({
  "node_modules/ajv/lib/dotjs/propertyNames.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_propertyNames(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $errs = "errs__" + $lvl;
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      out += "var " + $errs + " = errors;";
      if (it.opts.strictKeywords ? typeof $schema2 == "object" && Object.keys($schema2).length > 0 || $schema2 === false : it.util.schemaHasRules($schema2, it.RULES.all)) {
        $it.schema = $schema2;
        $it.schemaPath = $schemaPath;
        $it.errSchemaPath = $errSchemaPath;
        var $key = "key" + $lvl, $idx = "idx" + $lvl, $i = "i" + $lvl, $invalidName = "' + " + $key + " + '", $dataNxt = $it.dataLevel = it.dataLevel + 1, $nextData = "data" + $dataNxt, $dataProperties = "dataProperties" + $lvl, $ownProperties = it.opts.ownProperties, $currentBaseId = it.baseId;
        if ($ownProperties) {
          out += " var " + $dataProperties + " = undefined; ";
        }
        if ($ownProperties) {
          out += " " + $dataProperties + " = " + $dataProperties + " || Object.keys(" + $data + "); for (var " + $idx + "=0; " + $idx + "<" + $dataProperties + ".length; " + $idx + "++) { var " + $key + " = " + $dataProperties + "[" + $idx + "]; ";
        } else {
          out += " for (var " + $key + " in " + $data + ") { ";
        }
        out += " var startErrs" + $lvl + " = errors; ";
        var $passData = $key;
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        var $code = it.validate($it);
        $it.baseId = $currentBaseId;
        if (it.util.varOccurences($code, $nextData) < 2) {
          out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
        } else {
          out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
        }
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += " if (!" + $nextValid + ") { for (var " + $i + "=startErrs" + $lvl + "; " + $i + "<errors; " + $i + "++) { vErrors[" + $i + "].propertyName = " + $key + "; }   var err =   ";
        if (it.createErrors !== false) {
          out += " { keyword: 'propertyNames' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { propertyName: '" + $invalidName + "' } ";
          if (it.opts.messages !== false) {
            out += " , message: 'property name \\'" + $invalidName + "\\' is invalid' ";
          }
          if (it.opts.verbose) {
            out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError(vErrors); ";
          } else {
            out += " validate.errors = vErrors; return false; ";
          }
        }
        if ($breakOnError) {
          out += " break; ";
        }
        out += " } }";
      }
      if ($breakOnError) {
        out += " " + $closingBraces + " if (" + $errs + " == errors) {";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/required.js
var require_required = __commonJS({
  "node_modules/ajv/lib/dotjs/required.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_required(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      var $vSchema = "schema" + $lvl;
      if (!$isData) {
        if ($schema2.length < it.opts.loopRequired && it.schema.properties && Object.keys(it.schema.properties).length) {
          var $required = [];
          var arr1 = $schema2;
          if (arr1) {
            var $property, i1 = -1, l1 = arr1.length - 1;
            while (i1 < l1) {
              $property = arr1[i1 += 1];
              var $propertySch = it.schema.properties[$property];
              if (!($propertySch && (it.opts.strictKeywords ? typeof $propertySch == "object" && Object.keys($propertySch).length > 0 || $propertySch === false : it.util.schemaHasRules($propertySch, it.RULES.all)))) {
                $required[$required.length] = $property;
              }
            }
          }
        } else {
          var $required = $schema2;
        }
      }
      if ($isData || $required.length) {
        var $currentErrorPath = it.errorPath, $loopRequired = $isData || $required.length >= it.opts.loopRequired, $ownProperties = it.opts.ownProperties;
        if ($breakOnError) {
          out += " var missing" + $lvl + "; ";
          if ($loopRequired) {
            if (!$isData) {
              out += " var " + $vSchema + " = validate.schema" + $schemaPath + "; ";
            }
            var $i = "i" + $lvl, $propertyPath = "schema" + $lvl + "[" + $i + "]", $missingProperty = "' + " + $propertyPath + " + '";
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
            }
            out += " var " + $valid + " = true; ";
            if ($isData) {
              out += " if (schema" + $lvl + " === undefined) " + $valid + " = true; else if (!Array.isArray(schema" + $lvl + ")) " + $valid + " = false; else {";
            }
            out += " for (var " + $i + " = 0; " + $i + " < " + $vSchema + ".length; " + $i + "++) { " + $valid + " = " + $data + "[" + $vSchema + "[" + $i + "]] !== undefined ";
            if ($ownProperties) {
              out += " &&   Object.prototype.hasOwnProperty.call(" + $data + ", " + $vSchema + "[" + $i + "]) ";
            }
            out += "; if (!" + $valid + ") break; } ";
            if ($isData) {
              out += "  }  ";
            }
            out += "  if (!" + $valid + ") {   ";
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = "";
            if (it.createErrors !== false) {
              out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
              if (it.opts.messages !== false) {
                out += " , message: '";
                if (it.opts._errorDataPathProperty) {
                  out += "is a required property";
                } else {
                  out += "should have required property \\'" + $missingProperty + "\\'";
                }
                out += "' ";
              }
              if (it.opts.verbose) {
                out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              if (it.async) {
                out += " throw new ValidationError([" + __err + "]); ";
              } else {
                out += " validate.errors = [" + __err + "]; return false; ";
              }
            } else {
              out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            }
            out += " } else { ";
          } else {
            out += " if ( ";
            var arr2 = $required;
            if (arr2) {
              var $propertyKey, $i = -1, l2 = arr2.length - 1;
              while ($i < l2) {
                $propertyKey = arr2[$i += 1];
                if ($i) {
                  out += " || ";
                }
                var $prop = it.util.getProperty($propertyKey), $useData = $data + $prop;
                out += " ( ( " + $useData + " === undefined ";
                if ($ownProperties) {
                  out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                }
                out += ") && (missing" + $lvl + " = " + it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop) + ") ) ";
              }
            }
            out += ") {  ";
            var $propertyPath = "missing" + $lvl, $missingProperty = "' + " + $propertyPath + " + '";
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + " + " + $propertyPath;
            }
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = "";
            if (it.createErrors !== false) {
              out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
              if (it.opts.messages !== false) {
                out += " , message: '";
                if (it.opts._errorDataPathProperty) {
                  out += "is a required property";
                } else {
                  out += "should have required property \\'" + $missingProperty + "\\'";
                }
                out += "' ";
              }
              if (it.opts.verbose) {
                out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              if (it.async) {
                out += " throw new ValidationError([" + __err + "]); ";
              } else {
                out += " validate.errors = [" + __err + "]; return false; ";
              }
            } else {
              out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            }
            out += " } else { ";
          }
        } else {
          if ($loopRequired) {
            if (!$isData) {
              out += " var " + $vSchema + " = validate.schema" + $schemaPath + "; ";
            }
            var $i = "i" + $lvl, $propertyPath = "schema" + $lvl + "[" + $i + "]", $missingProperty = "' + " + $propertyPath + " + '";
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
            }
            if ($isData) {
              out += " if (" + $vSchema + " && !Array.isArray(" + $vSchema + ")) {  var err =   ";
              if (it.createErrors !== false) {
                out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
                if (it.opts.messages !== false) {
                  out += " , message: '";
                  if (it.opts._errorDataPathProperty) {
                    out += "is a required property";
                  } else {
                    out += "should have required property \\'" + $missingProperty + "\\'";
                  }
                  out += "' ";
                }
                if (it.opts.verbose) {
                  out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                }
                out += " } ";
              } else {
                out += " {} ";
              }
              out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (" + $vSchema + " !== undefined) { ";
            }
            out += " for (var " + $i + " = 0; " + $i + " < " + $vSchema + ".length; " + $i + "++) { if (" + $data + "[" + $vSchema + "[" + $i + "]] === undefined ";
            if ($ownProperties) {
              out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", " + $vSchema + "[" + $i + "]) ";
            }
            out += ") {  var err =   ";
            if (it.createErrors !== false) {
              out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
              if (it.opts.messages !== false) {
                out += " , message: '";
                if (it.opts._errorDataPathProperty) {
                  out += "is a required property";
                } else {
                  out += "should have required property \\'" + $missingProperty + "\\'";
                }
                out += "' ";
              }
              if (it.opts.verbose) {
                out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ";
            if ($isData) {
              out += "  }  ";
            }
          } else {
            var arr3 = $required;
            if (arr3) {
              var $propertyKey, i3 = -1, l3 = arr3.length - 1;
              while (i3 < l3) {
                $propertyKey = arr3[i3 += 1];
                var $prop = it.util.getProperty($propertyKey), $missingProperty = it.util.escapeQuotes($propertyKey), $useData = $data + $prop;
                if (it.opts._errorDataPathProperty) {
                  it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
                }
                out += " if ( " + $useData + " === undefined ";
                if ($ownProperties) {
                  out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                }
                out += ") {  var err =   ";
                if (it.createErrors !== false) {
                  out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
                  if (it.opts.messages !== false) {
                    out += " , message: '";
                    if (it.opts._errorDataPathProperty) {
                      out += "is a required property";
                    } else {
                      out += "should have required property \\'" + $missingProperty + "\\'";
                    }
                    out += "' ";
                  }
                  if (it.opts.verbose) {
                    out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                  }
                  out += " } ";
                } else {
                  out += " {} ";
                }
                out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ";
              }
            }
          }
        }
        it.errorPath = $currentErrorPath;
      } else if ($breakOnError) {
        out += " if (true) {";
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/uniqueItems.js
var require_uniqueItems = __commonJS({
  "node_modules/ajv/lib/dotjs/uniqueItems.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_uniqueItems(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      if (($schema2 || $isData) && it.opts.uniqueItems !== false) {
        if ($isData) {
          out += " var " + $valid + "; if (" + $schemaValue + " === false || " + $schemaValue + " === undefined) " + $valid + " = true; else if (typeof " + $schemaValue + " != 'boolean') " + $valid + " = false; else { ";
        }
        out += " var i = " + $data + ".length , " + $valid + " = true , j; if (i > 1) { ";
        var $itemType = it.schema.items && it.schema.items.type, $typeIsArray = Array.isArray($itemType);
        if (!$itemType || $itemType == "object" || $itemType == "array" || $typeIsArray && ($itemType.indexOf("object") >= 0 || $itemType.indexOf("array") >= 0)) {
          out += " outer: for (;i--;) { for (j = i; j--;) { if (equal(" + $data + "[i], " + $data + "[j])) { " + $valid + " = false; break outer; } } } ";
        } else {
          out += " var itemIndices = {}, item; for (;i--;) { var item = " + $data + "[i]; ";
          var $method = "checkDataType" + ($typeIsArray ? "s" : "");
          out += " if (" + it.util[$method]($itemType, "item", it.opts.strictNumbers, true) + ") continue; ";
          if ($typeIsArray) {
            out += ` if (typeof item == 'string') item = '"' + item; `;
          }
          out += " if (typeof itemIndices[item] == 'number') { " + $valid + " = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ";
        }
        out += " } ";
        if ($isData) {
          out += "  }  ";
        }
        out += " if (!" + $valid + ") {   ";
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        if (it.createErrors !== false) {
          out += " { keyword: 'uniqueItems' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { i: i, j: j } ";
          if (it.opts.messages !== false) {
            out += " , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' ";
          }
          if (it.opts.verbose) {
            out += " , schema:  ";
            if ($isData) {
              out += "validate.schema" + $schemaPath;
            } else {
              out += "" + $schema2;
            }
            out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError([" + __err + "]); ";
          } else {
            out += " validate.errors = [" + __err + "]; return false; ";
          }
        } else {
          out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        }
        out += " } ";
        if ($breakOnError) {
          out += " else { ";
        }
      } else {
        if ($breakOnError) {
          out += " if (true) { ";
        }
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/dotjs/index.js
var require_dotjs = __commonJS({
  "node_modules/ajv/lib/dotjs/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      "$ref": require_ref(),
      allOf: require_allOf(),
      anyOf: require_anyOf(),
      "$comment": require_comment(),
      const: require_const(),
      contains: require_contains(),
      dependencies: require_dependencies(),
      "enum": require_enum(),
      format: require_format(),
      "if": require_if(),
      items: require_items(),
      maximum: require_limit(),
      minimum: require_limit(),
      maxItems: require_limitItems(),
      minItems: require_limitItems(),
      maxLength: require_limitLength(),
      minLength: require_limitLength(),
      maxProperties: require_limitProperties(),
      minProperties: require_limitProperties(),
      multipleOf: require_multipleOf(),
      not: require_not(),
      oneOf: require_oneOf(),
      pattern: require_pattern(),
      properties: require_properties(),
      propertyNames: require_propertyNames(),
      required: require_required(),
      uniqueItems: require_uniqueItems(),
      validate: require_validate()
    };
  }
});

// node_modules/ajv/lib/compile/rules.js
var require_rules = __commonJS({
  "node_modules/ajv/lib/compile/rules.js"(exports, module2) {
    "use strict";
    var ruleModules = require_dotjs();
    var toHash = require_util().toHash;
    module2.exports = function rules() {
      var RULES = [
        {
          type: "number",
          rules: [
            { "maximum": ["exclusiveMaximum"] },
            { "minimum": ["exclusiveMinimum"] },
            "multipleOf",
            "format"
          ]
        },
        {
          type: "string",
          rules: ["maxLength", "minLength", "pattern", "format"]
        },
        {
          type: "array",
          rules: ["maxItems", "minItems", "items", "contains", "uniqueItems"]
        },
        {
          type: "object",
          rules: [
            "maxProperties",
            "minProperties",
            "required",
            "dependencies",
            "propertyNames",
            { "properties": ["additionalProperties", "patternProperties"] }
          ]
        },
        { rules: ["$ref", "const", "enum", "not", "anyOf", "oneOf", "allOf", "if"] }
      ];
      var ALL = ["type", "$comment"];
      var KEYWORDS = [
        "$schema",
        "$id",
        "id",
        "$data",
        "$async",
        "title",
        "description",
        "default",
        "definitions",
        "examples",
        "readOnly",
        "writeOnly",
        "contentMediaType",
        "contentEncoding",
        "additionalItems",
        "then",
        "else"
      ];
      var TYPES = ["number", "integer", "string", "array", "object", "boolean", "null"];
      RULES.all = toHash(ALL);
      RULES.types = toHash(TYPES);
      RULES.forEach(function(group) {
        group.rules = group.rules.map(function(keyword) {
          var implKeywords;
          if (typeof keyword == "object") {
            var key = Object.keys(keyword)[0];
            implKeywords = keyword[key];
            keyword = key;
            implKeywords.forEach(function(k) {
              ALL.push(k);
              RULES.all[k] = true;
            });
          }
          ALL.push(keyword);
          var rule = RULES.all[keyword] = {
            keyword,
            code: ruleModules[keyword],
            implements: implKeywords
          };
          return rule;
        });
        RULES.all.$comment = {
          keyword: "$comment",
          code: ruleModules.$comment
        };
        if (group.type)
          RULES.types[group.type] = group;
      });
      RULES.keywords = toHash(ALL.concat(KEYWORDS));
      RULES.custom = {};
      return RULES;
    };
  }
});

// node_modules/ajv/lib/data.js
var require_data = __commonJS({
  "node_modules/ajv/lib/data.js"(exports, module2) {
    "use strict";
    var KEYWORDS = [
      "multipleOf",
      "maximum",
      "exclusiveMaximum",
      "minimum",
      "exclusiveMinimum",
      "maxLength",
      "minLength",
      "pattern",
      "additionalItems",
      "maxItems",
      "minItems",
      "uniqueItems",
      "maxProperties",
      "minProperties",
      "required",
      "additionalProperties",
      "enum",
      "format",
      "const"
    ];
    module2.exports = function(metaSchema, keywordsJsonPointers) {
      for (var i = 0; i < keywordsJsonPointers.length; i++) {
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        var segments = keywordsJsonPointers[i].split("/");
        var keywords = metaSchema;
        var j;
        for (j = 1; j < segments.length; j++)
          keywords = keywords[segments[j]];
        for (j = 0; j < KEYWORDS.length; j++) {
          var key = KEYWORDS[j];
          var schema = keywords[key];
          if (schema) {
            keywords[key] = {
              anyOf: [
                schema,
                { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" }
              ]
            };
          }
        }
      }
      return metaSchema;
    };
  }
});

// node_modules/ajv/lib/compile/async.js
var require_async = __commonJS({
  "node_modules/ajv/lib/compile/async.js"(exports, module2) {
    "use strict";
    var MissingRefError = require_error_classes().MissingRef;
    module2.exports = compileAsync;
    function compileAsync(schema, meta, callback) {
      var self2 = this;
      if (typeof this._opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      if (typeof meta == "function") {
        callback = meta;
        meta = void 0;
      }
      var p = loadMetaSchemaOf(schema).then(function() {
        var schemaObj = self2._addSchema(schema, void 0, meta);
        return schemaObj.validate || _compileAsync(schemaObj);
      });
      if (callback) {
        p.then(
          function(v) {
            callback(null, v);
          },
          callback
        );
      }
      return p;
      function loadMetaSchemaOf(sch) {
        var $schema2 = sch.$schema;
        return $schema2 && !self2.getSchema($schema2) ? compileAsync.call(self2, { $ref: $schema2 }, true) : Promise.resolve();
      }
      function _compileAsync(schemaObj) {
        try {
          return self2._compile(schemaObj);
        } catch (e) {
          if (e instanceof MissingRefError)
            return loadMissingSchema(e);
          throw e;
        }
        function loadMissingSchema(e) {
          var ref = e.missingSchema;
          if (added(ref))
            throw new Error("Schema " + ref + " is loaded but " + e.missingRef + " cannot be resolved");
          var schemaPromise = self2._loadingSchemas[ref];
          if (!schemaPromise) {
            schemaPromise = self2._loadingSchemas[ref] = self2._opts.loadSchema(ref);
            schemaPromise.then(removePromise, removePromise);
          }
          return schemaPromise.then(function(sch) {
            if (!added(ref)) {
              return loadMetaSchemaOf(sch).then(function() {
                if (!added(ref))
                  self2.addSchema(sch, ref, void 0, meta);
              });
            }
          }).then(function() {
            return _compileAsync(schemaObj);
          });
          function removePromise() {
            delete self2._loadingSchemas[ref];
          }
          function added(ref2) {
            return self2._refs[ref2] || self2._schemas[ref2];
          }
        }
      }
    }
  }
});

// node_modules/ajv/lib/dotjs/custom.js
var require_custom = __commonJS({
  "node_modules/ajv/lib/dotjs/custom.js"(exports, module2) {
    "use strict";
    module2.exports = function generate_custom(it, $keyword, $ruleType) {
      var out = " ";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      var $errs = "errs__" + $lvl;
      var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
      if ($isData) {
        out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
        $schemaValue = "schema" + $lvl;
      } else {
        $schemaValue = $schema2;
      }
      var $rule = this, $definition = "definition" + $lvl, $rDef = $rule.definition, $closingBraces = "";
      var $compile, $inline, $macro, $ruleValidate, $validateCode;
      if ($isData && $rDef.$data) {
        $validateCode = "keywordValidate" + $lvl;
        var $validateSchema = $rDef.validateSchema;
        out += " var " + $definition + " = RULES.custom['" + $keyword + "'].definition; var " + $validateCode + " = " + $definition + ".validate;";
      } else {
        $ruleValidate = it.useCustomRule($rule, $schema2, it.schema, it);
        if (!$ruleValidate)
          return;
        $schemaValue = "validate.schema" + $schemaPath;
        $validateCode = $ruleValidate.code;
        $compile = $rDef.compile;
        $inline = $rDef.inline;
        $macro = $rDef.macro;
      }
      var $ruleErrs = $validateCode + ".errors", $i = "i" + $lvl, $ruleErr = "ruleErr" + $lvl, $asyncKeyword = $rDef.async;
      if ($asyncKeyword && !it.async)
        throw new Error("async keyword in sync schema");
      if (!($inline || $macro)) {
        out += "" + $ruleErrs + " = null;";
      }
      out += "var " + $errs + " = errors;var " + $valid + ";";
      if ($isData && $rDef.$data) {
        $closingBraces += "}";
        out += " if (" + $schemaValue + " === undefined) { " + $valid + " = true; } else { ";
        if ($validateSchema) {
          $closingBraces += "}";
          out += " " + $valid + " = " + $definition + ".validateSchema(" + $schemaValue + "); if (" + $valid + ") { ";
        }
      }
      if ($inline) {
        if ($rDef.statements) {
          out += " " + $ruleValidate.validate + " ";
        } else {
          out += " " + $valid + " = " + $ruleValidate.validate + "; ";
        }
      } else if ($macro) {
        var $it = it.util.copy(it);
        var $closingBraces = "";
        $it.level++;
        var $nextValid = "valid" + $it.level;
        $it.schema = $ruleValidate.validate;
        $it.schemaPath = "";
        var $wasComposite = it.compositeRule;
        it.compositeRule = $it.compositeRule = true;
        var $code = it.validate($it).replace(/validate\.schema/g, $validateCode);
        it.compositeRule = $it.compositeRule = $wasComposite;
        out += " " + $code;
      } else {
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        out += "  " + $validateCode + ".call( ";
        if (it.opts.passContext) {
          out += "this";
        } else {
          out += "self";
        }
        if ($compile || $rDef.schema === false) {
          out += " , " + $data + " ";
        } else {
          out += " , " + $schemaValue + " , " + $data + " , validate.schema" + it.schemaPath + " ";
        }
        out += " , (dataPath || '')";
        if (it.errorPath != '""') {
          out += " + " + it.errorPath;
        }
        var $parentData = $dataLvl ? "data" + ($dataLvl - 1 || "") : "parentData", $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : "parentDataProperty";
        out += " , " + $parentData + " , " + $parentDataProperty + " , rootData )  ";
        var def_callRuleValidate = out;
        out = $$outStack.pop();
        if ($rDef.errors === false) {
          out += " " + $valid + " = ";
          if ($asyncKeyword) {
            out += "await ";
          }
          out += "" + def_callRuleValidate + "; ";
        } else {
          if ($asyncKeyword) {
            $ruleErrs = "customErrors" + $lvl;
            out += " var " + $ruleErrs + " = null; try { " + $valid + " = await " + def_callRuleValidate + "; } catch (e) { " + $valid + " = false; if (e instanceof ValidationError) " + $ruleErrs + " = e.errors; else throw e; } ";
          } else {
            out += " " + $ruleErrs + " = null; " + $valid + " = " + def_callRuleValidate + "; ";
          }
        }
      }
      if ($rDef.modifying) {
        out += " if (" + $parentData + ") " + $data + " = " + $parentData + "[" + $parentDataProperty + "];";
      }
      out += "" + $closingBraces;
      if ($rDef.valid) {
        if ($breakOnError) {
          out += " if (true) { ";
        }
      } else {
        out += " if ( ";
        if ($rDef.valid === void 0) {
          out += " !";
          if ($macro) {
            out += "" + $nextValid;
          } else {
            out += "" + $valid;
          }
        } else {
          out += " " + !$rDef.valid + " ";
        }
        out += ") { ";
        $errorKeyword = $rule.keyword;
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        if (it.createErrors !== false) {
          out += " { keyword: '" + ($errorKeyword || "custom") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { keyword: '" + $rule.keyword + "' } ";
          if (it.opts.messages !== false) {
            out += ` , message: 'should pass "` + $rule.keyword + `" keyword validation' `;
          }
          if (it.opts.verbose) {
            out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError([" + __err + "]); ";
          } else {
            out += " validate.errors = [" + __err + "]; return false; ";
          }
        } else {
          out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        }
        var def_customError = out;
        out = $$outStack.pop();
        if ($inline) {
          if ($rDef.errors) {
            if ($rDef.errors != "full") {
              out += "  for (var " + $i + "=" + $errs + "; " + $i + "<errors; " + $i + "++) { var " + $ruleErr + " = vErrors[" + $i + "]; if (" + $ruleErr + ".dataPath === undefined) " + $ruleErr + ".dataPath = (dataPath || '') + " + it.errorPath + "; if (" + $ruleErr + ".schemaPath === undefined) { " + $ruleErr + '.schemaPath = "' + $errSchemaPath + '"; } ';
              if (it.opts.verbose) {
                out += " " + $ruleErr + ".schema = " + $schemaValue + "; " + $ruleErr + ".data = " + $data + "; ";
              }
              out += " } ";
            }
          } else {
            if ($rDef.errors === false) {
              out += " " + def_customError + " ";
            } else {
              out += " if (" + $errs + " == errors) { " + def_customError + " } else {  for (var " + $i + "=" + $errs + "; " + $i + "<errors; " + $i + "++) { var " + $ruleErr + " = vErrors[" + $i + "]; if (" + $ruleErr + ".dataPath === undefined) " + $ruleErr + ".dataPath = (dataPath || '') + " + it.errorPath + "; if (" + $ruleErr + ".schemaPath === undefined) { " + $ruleErr + '.schemaPath = "' + $errSchemaPath + '"; } ';
              if (it.opts.verbose) {
                out += " " + $ruleErr + ".schema = " + $schemaValue + "; " + $ruleErr + ".data = " + $data + "; ";
              }
              out += " } } ";
            }
          }
        } else if ($macro) {
          out += "   var err =   ";
          if (it.createErrors !== false) {
            out += " { keyword: '" + ($errorKeyword || "custom") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { keyword: '" + $rule.keyword + "' } ";
            if (it.opts.messages !== false) {
              out += ` , message: 'should pass "` + $rule.keyword + `" keyword validation' `;
            }
            if (it.opts.verbose) {
              out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError(vErrors); ";
            } else {
              out += " validate.errors = vErrors; return false; ";
            }
          }
        } else {
          if ($rDef.errors === false) {
            out += " " + def_customError + " ";
          } else {
            out += " if (Array.isArray(" + $ruleErrs + ")) { if (vErrors === null) vErrors = " + $ruleErrs + "; else vErrors = vErrors.concat(" + $ruleErrs + "); errors = vErrors.length;  for (var " + $i + "=" + $errs + "; " + $i + "<errors; " + $i + "++) { var " + $ruleErr + " = vErrors[" + $i + "]; if (" + $ruleErr + ".dataPath === undefined) " + $ruleErr + ".dataPath = (dataPath || '') + " + it.errorPath + ";  " + $ruleErr + '.schemaPath = "' + $errSchemaPath + '";  ';
            if (it.opts.verbose) {
              out += " " + $ruleErr + ".schema = " + $schemaValue + "; " + $ruleErr + ".data = " + $data + "; ";
            }
            out += " } } else { " + def_customError + " } ";
          }
        }
        out += " } ";
        if ($breakOnError) {
          out += " else { ";
        }
      }
      return out;
    };
  }
});

// node_modules/ajv/lib/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "node_modules/ajv/lib/refs/json-schema-draft-07.json"(exports, module2) {
    module2.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [
            { $ref: "#/definitions/nonNegativeInteger" },
            { default: 0 }
          ]
        },
        simpleTypes: {
          enum: [
            "array",
            "boolean",
            "integer",
            "null",
            "number",
            "object",
            "string"
          ]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [
            { $ref: "#" },
            { $ref: "#/definitions/schemaArray" }
          ],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [
              { $ref: "#" },
              { $ref: "#/definitions/stringArray" }
            ]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});

// node_modules/ajv/lib/definition_schema.js
var require_definition_schema = __commonJS({
  "node_modules/ajv/lib/definition_schema.js"(exports, module2) {
    "use strict";
    var metaSchema = require_json_schema_draft_07();
    module2.exports = {
      $id: "https://github.com/ajv-validator/ajv/blob/master/lib/definition_schema.js",
      definitions: {
        simpleTypes: metaSchema.definitions.simpleTypes
      },
      type: "object",
      dependencies: {
        schema: ["validate"],
        $data: ["validate"],
        statements: ["inline"],
        valid: { not: { required: ["macro"] } }
      },
      properties: {
        type: metaSchema.properties.type,
        schema: { type: "boolean" },
        statements: { type: "boolean" },
        dependencies: {
          type: "array",
          items: { type: "string" }
        },
        metaSchema: { type: "object" },
        modifying: { type: "boolean" },
        valid: { type: "boolean" },
        $data: { type: "boolean" },
        async: { type: "boolean" },
        errors: {
          anyOf: [
            { type: "boolean" },
            { const: "full" }
          ]
        }
      }
    };
  }
});

// node_modules/ajv/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/ajv/lib/keyword.js"(exports, module2) {
    "use strict";
    var IDENTIFIER = /^[a-z_$][a-z0-9_$-]*$/i;
    var customRuleCode = require_custom();
    var definitionSchema = require_definition_schema();
    module2.exports = {
      add: addKeyword,
      get: getKeyword,
      remove: removeKeyword,
      validate: validateKeyword
    };
    function addKeyword(keyword, definition) {
      var RULES = this.RULES;
      if (RULES.keywords[keyword])
        throw new Error("Keyword " + keyword + " is already defined");
      if (!IDENTIFIER.test(keyword))
        throw new Error("Keyword " + keyword + " is not a valid identifier");
      if (definition) {
        this.validateKeyword(definition, true);
        var dataType = definition.type;
        if (Array.isArray(dataType)) {
          for (var i = 0; i < dataType.length; i++)
            _addRule(keyword, dataType[i], definition);
        } else {
          _addRule(keyword, dataType, definition);
        }
        var metaSchema = definition.metaSchema;
        if (metaSchema) {
          if (definition.$data && this._opts.$data) {
            metaSchema = {
              anyOf: [
                metaSchema,
                { "$ref": "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" }
              ]
            };
          }
          definition.validateSchema = this.compile(metaSchema, true);
        }
      }
      RULES.keywords[keyword] = RULES.all[keyword] = true;
      function _addRule(keyword2, dataType2, definition2) {
        var ruleGroup;
        for (var i2 = 0; i2 < RULES.length; i2++) {
          var rg = RULES[i2];
          if (rg.type == dataType2) {
            ruleGroup = rg;
            break;
          }
        }
        if (!ruleGroup) {
          ruleGroup = { type: dataType2, rules: [] };
          RULES.push(ruleGroup);
        }
        var rule = {
          keyword: keyword2,
          definition: definition2,
          custom: true,
          code: customRuleCode,
          implements: definition2.implements
        };
        ruleGroup.rules.push(rule);
        RULES.custom[keyword2] = rule;
      }
      return this;
    }
    function getKeyword(keyword) {
      var rule = this.RULES.custom[keyword];
      return rule ? rule.definition : this.RULES.keywords[keyword] || false;
    }
    function removeKeyword(keyword) {
      var RULES = this.RULES;
      delete RULES.keywords[keyword];
      delete RULES.all[keyword];
      delete RULES.custom[keyword];
      for (var i = 0; i < RULES.length; i++) {
        var rules = RULES[i].rules;
        for (var j = 0; j < rules.length; j++) {
          if (rules[j].keyword == keyword) {
            rules.splice(j, 1);
            break;
          }
        }
      }
      return this;
    }
    function validateKeyword(definition, throwError) {
      validateKeyword.errors = null;
      var v = this._validateKeyword = this._validateKeyword || this.compile(definitionSchema, true);
      if (v(definition))
        return true;
      validateKeyword.errors = v.errors;
      if (throwError)
        throw new Error("custom keyword definition is invalid: " + this.errorsText(v.errors));
      else
        return false;
    }
  }
});

// node_modules/ajv/lib/refs/data.json
var require_data2 = __commonJS({
  "node_modules/ajv/lib/refs/data.json"(exports, module2) {
    module2.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON Schema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [
            { format: "relative-json-pointer" },
            { format: "json-pointer" }
          ]
        }
      },
      additionalProperties: false
    };
  }
});

// node_modules/ajv/lib/ajv.js
var require_ajv = __commonJS({
  "node_modules/ajv/lib/ajv.js"(exports, module2) {
    "use strict";
    var compileSchema = require_compile();
    var resolve = require_resolve();
    var Cache = require_cache();
    var SchemaObject = require_schema_obj();
    var stableStringify = require_fast_json_stable_stringify();
    var formats = require_formats();
    var rules = require_rules();
    var $dataMetaSchema = require_data();
    var util = require_util();
    module2.exports = Ajv2;
    Ajv2.prototype.validate = validate;
    Ajv2.prototype.compile = compile;
    Ajv2.prototype.addSchema = addSchema;
    Ajv2.prototype.addMetaSchema = addMetaSchema;
    Ajv2.prototype.validateSchema = validateSchema;
    Ajv2.prototype.getSchema = getSchema;
    Ajv2.prototype.removeSchema = removeSchema;
    Ajv2.prototype.addFormat = addFormat;
    Ajv2.prototype.errorsText = errorsText;
    Ajv2.prototype._addSchema = _addSchema;
    Ajv2.prototype._compile = _compile;
    Ajv2.prototype.compileAsync = require_async();
    var customKeyword = require_keyword();
    Ajv2.prototype.addKeyword = customKeyword.add;
    Ajv2.prototype.getKeyword = customKeyword.get;
    Ajv2.prototype.removeKeyword = customKeyword.remove;
    Ajv2.prototype.validateKeyword = customKeyword.validate;
    var errorClasses = require_error_classes();
    Ajv2.ValidationError = errorClasses.Validation;
    Ajv2.MissingRefError = errorClasses.MissingRef;
    Ajv2.$dataMetaSchema = $dataMetaSchema;
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes", "strictDefaults"];
    var META_SUPPORT_DATA = ["/properties"];
    function Ajv2(opts) {
      if (!(this instanceof Ajv2))
        return new Ajv2(opts);
      opts = this._opts = util.copy(opts) || {};
      setLogger(this);
      this._schemas = {};
      this._refs = {};
      this._fragments = {};
      this._formats = formats(opts.format);
      this._cache = opts.cache || new Cache();
      this._loadingSchemas = {};
      this._compilations = [];
      this.RULES = rules();
      this._getId = chooseGetId(opts);
      opts.loopRequired = opts.loopRequired || Infinity;
      if (opts.errorDataPath == "property")
        opts._errorDataPathProperty = true;
      if (opts.serialize === void 0)
        opts.serialize = stableStringify;
      this._metaOpts = getMetaSchemaOptions(this);
      if (opts.formats)
        addInitialFormats(this);
      if (opts.keywords)
        addInitialKeywords(this);
      addDefaultMetaSchema(this);
      if (typeof opts.meta == "object")
        this.addMetaSchema(opts.meta);
      if (opts.nullable)
        this.addKeyword("nullable", { metaSchema: { type: "boolean" } });
      addInitialSchemas(this);
    }
    function validate(schemaKeyRef, data) {
      var v;
      if (typeof schemaKeyRef == "string") {
        v = this.getSchema(schemaKeyRef);
        if (!v)
          throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
      } else {
        var schemaObj = this._addSchema(schemaKeyRef);
        v = schemaObj.validate || this._compile(schemaObj);
      }
      var valid = v(data);
      if (v.$async !== true)
        this.errors = v.errors;
      return valid;
    }
    function compile(schema, _meta) {
      var schemaObj = this._addSchema(schema, void 0, _meta);
      return schemaObj.validate || this._compile(schemaObj);
    }
    function addSchema(schema, key, _skipValidation, _meta) {
      if (Array.isArray(schema)) {
        for (var i = 0; i < schema.length; i++)
          this.addSchema(schema[i], void 0, _skipValidation, _meta);
        return this;
      }
      var id = this._getId(schema);
      if (id !== void 0 && typeof id != "string")
        throw new Error("schema id must be string");
      key = resolve.normalizeId(key || id);
      checkUnique(this, key);
      this._schemas[key] = this._addSchema(schema, _skipValidation, _meta, true);
      return this;
    }
    function addMetaSchema(schema, key, skipValidation) {
      this.addSchema(schema, key, skipValidation, true);
      return this;
    }
    function validateSchema(schema, throwOrLogError) {
      var $schema2 = schema.$schema;
      if ($schema2 !== void 0 && typeof $schema2 != "string")
        throw new Error("$schema must be a string");
      $schema2 = $schema2 || this._opts.defaultMeta || defaultMeta(this);
      if (!$schema2) {
        this.logger.warn("meta-schema not available");
        this.errors = null;
        return true;
      }
      var valid = this.validate($schema2, schema);
      if (!valid && throwOrLogError) {
        var message = "schema is invalid: " + this.errorsText();
        if (this._opts.validateSchema == "log")
          this.logger.error(message);
        else
          throw new Error(message);
      }
      return valid;
    }
    function defaultMeta(self2) {
      var meta = self2._opts.meta;
      self2._opts.defaultMeta = typeof meta == "object" ? self2._getId(meta) || meta : self2.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0;
      return self2._opts.defaultMeta;
    }
    function getSchema(keyRef) {
      var schemaObj = _getSchemaObj(this, keyRef);
      switch (typeof schemaObj) {
        case "object":
          return schemaObj.validate || this._compile(schemaObj);
        case "string":
          return this.getSchema(schemaObj);
        case "undefined":
          return _getSchemaFragment(this, keyRef);
      }
    }
    function _getSchemaFragment(self2, ref) {
      var res = resolve.schema.call(self2, { schema: {} }, ref);
      if (res) {
        var schema = res.schema, root = res.root, baseId = res.baseId;
        var v = compileSchema.call(self2, schema, root, void 0, baseId);
        self2._fragments[ref] = new SchemaObject({
          ref,
          fragment: true,
          schema,
          root,
          baseId,
          validate: v
        });
        return v;
      }
    }
    function _getSchemaObj(self2, keyRef) {
      keyRef = resolve.normalizeId(keyRef);
      return self2._schemas[keyRef] || self2._refs[keyRef] || self2._fragments[keyRef];
    }
    function removeSchema(schemaKeyRef) {
      if (schemaKeyRef instanceof RegExp) {
        _removeAllSchemas(this, this._schemas, schemaKeyRef);
        _removeAllSchemas(this, this._refs, schemaKeyRef);
        return this;
      }
      switch (typeof schemaKeyRef) {
        case "undefined":
          _removeAllSchemas(this, this._schemas);
          _removeAllSchemas(this, this._refs);
          this._cache.clear();
          return this;
        case "string":
          var schemaObj = _getSchemaObj(this, schemaKeyRef);
          if (schemaObj)
            this._cache.del(schemaObj.cacheKey);
          delete this._schemas[schemaKeyRef];
          delete this._refs[schemaKeyRef];
          return this;
        case "object":
          var serialize = this._opts.serialize;
          var cacheKey = serialize ? serialize(schemaKeyRef) : schemaKeyRef;
          this._cache.del(cacheKey);
          var id = this._getId(schemaKeyRef);
          if (id) {
            id = resolve.normalizeId(id);
            delete this._schemas[id];
            delete this._refs[id];
          }
      }
      return this;
    }
    function _removeAllSchemas(self2, schemas, regex) {
      for (var keyRef in schemas) {
        var schemaObj = schemas[keyRef];
        if (!schemaObj.meta && (!regex || regex.test(keyRef))) {
          self2._cache.del(schemaObj.cacheKey);
          delete schemas[keyRef];
        }
      }
    }
    function _addSchema(schema, skipValidation, meta, shouldAddSchema) {
      if (typeof schema != "object" && typeof schema != "boolean")
        throw new Error("schema should be object or boolean");
      var serialize = this._opts.serialize;
      var cacheKey = serialize ? serialize(schema) : schema;
      var cached = this._cache.get(cacheKey);
      if (cached)
        return cached;
      shouldAddSchema = shouldAddSchema || this._opts.addUsedSchema !== false;
      var id = resolve.normalizeId(this._getId(schema));
      if (id && shouldAddSchema)
        checkUnique(this, id);
      var willValidate = this._opts.validateSchema !== false && !skipValidation;
      var recursiveMeta;
      if (willValidate && !(recursiveMeta = id && id == resolve.normalizeId(schema.$schema)))
        this.validateSchema(schema, true);
      var localRefs = resolve.ids.call(this, schema);
      var schemaObj = new SchemaObject({
        id,
        schema,
        localRefs,
        cacheKey,
        meta
      });
      if (id[0] != "#" && shouldAddSchema)
        this._refs[id] = schemaObj;
      this._cache.put(cacheKey, schemaObj);
      if (willValidate && recursiveMeta)
        this.validateSchema(schema, true);
      return schemaObj;
    }
    function _compile(schemaObj, root) {
      if (schemaObj.compiling) {
        schemaObj.validate = callValidate;
        callValidate.schema = schemaObj.schema;
        callValidate.errors = null;
        callValidate.root = root ? root : callValidate;
        if (schemaObj.schema.$async === true)
          callValidate.$async = true;
        return callValidate;
      }
      schemaObj.compiling = true;
      var currentOpts;
      if (schemaObj.meta) {
        currentOpts = this._opts;
        this._opts = this._metaOpts;
      }
      var v;
      try {
        v = compileSchema.call(this, schemaObj.schema, root, schemaObj.localRefs);
      } catch (e) {
        delete schemaObj.validate;
        throw e;
      } finally {
        schemaObj.compiling = false;
        if (schemaObj.meta)
          this._opts = currentOpts;
      }
      schemaObj.validate = v;
      schemaObj.refs = v.refs;
      schemaObj.refVal = v.refVal;
      schemaObj.root = v.root;
      return v;
      function callValidate() {
        var _validate = schemaObj.validate;
        var result = _validate.apply(this, arguments);
        callValidate.errors = _validate.errors;
        return result;
      }
    }
    function chooseGetId(opts) {
      switch (opts.schemaId) {
        case "auto":
          return _get$IdOrId;
        case "id":
          return _getId;
        default:
          return _get$Id;
      }
    }
    function _getId(schema) {
      if (schema.$id)
        this.logger.warn("schema $id ignored", schema.$id);
      return schema.id;
    }
    function _get$Id(schema) {
      if (schema.id)
        this.logger.warn("schema id ignored", schema.id);
      return schema.$id;
    }
    function _get$IdOrId(schema) {
      if (schema.$id && schema.id && schema.$id != schema.id)
        throw new Error("schema $id is different from id");
      return schema.$id || schema.id;
    }
    function errorsText(errors, options) {
      errors = errors || this.errors;
      if (!errors)
        return "No errors";
      options = options || {};
      var separator = options.separator === void 0 ? ", " : options.separator;
      var dataVar = options.dataVar === void 0 ? "data" : options.dataVar;
      var text = "";
      for (var i = 0; i < errors.length; i++) {
        var e = errors[i];
        if (e)
          text += dataVar + e.dataPath + " " + e.message + separator;
      }
      return text.slice(0, -separator.length);
    }
    function addFormat(name, format) {
      if (typeof format == "string")
        format = new RegExp(format);
      this._formats[name] = format;
      return this;
    }
    function addDefaultMetaSchema(self2) {
      var $dataSchema;
      if (self2._opts.$data) {
        $dataSchema = require_data2();
        self2.addMetaSchema($dataSchema, $dataSchema.$id, true);
      }
      if (self2._opts.meta === false)
        return;
      var metaSchema = require_json_schema_draft_07();
      if (self2._opts.$data)
        metaSchema = $dataMetaSchema(metaSchema, META_SUPPORT_DATA);
      self2.addMetaSchema(metaSchema, META_SCHEMA_ID, true);
      self2._refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    function addInitialSchemas(self2) {
      var optsSchemas = self2._opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        self2.addSchema(optsSchemas);
      else
        for (var key in optsSchemas)
          self2.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats(self2) {
      for (var name in self2._opts.formats) {
        var format = self2._opts.formats[name];
        self2.addFormat(name, format);
      }
    }
    function addInitialKeywords(self2) {
      for (var name in self2._opts.keywords) {
        var keyword = self2._opts.keywords[name];
        self2.addKeyword(name, keyword);
      }
    }
    function checkUnique(self2, id) {
      if (self2._schemas[id] || self2._refs[id])
        throw new Error('schema with key or id "' + id + '" already exists');
    }
    function getMetaSchemaOptions(self2) {
      var metaOpts = util.copy(self2._opts);
      for (var i = 0; i < META_IGNORE_OPTIONS.length; i++)
        delete metaOpts[META_IGNORE_OPTIONS[i]];
      return metaOpts;
    }
    function setLogger(self2) {
      var logger = self2._opts.logger;
      if (logger === false) {
        self2.logger = { log: noop, warn: noop, error: noop };
      } else {
        if (logger === void 0)
          logger = console;
        if (!(typeof logger == "object" && logger.log && logger.warn && logger.error))
          throw new Error("logger must implement log, warn and error methods");
        self2.logger = logger;
      }
    }
    function noop() {
    }
  }
});

// node_modules/detect-browser/index.js
var require_detect_browser = __commonJS({
  "node_modules/detect-browser/index.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l2 = from.length, ar; i < l2; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNodeVersion = exports.detectOS = exports.parseUserAgent = exports.browserName = exports.detect = exports.ReactNativeInfo = exports.BotInfo = exports.SearchBotDeviceInfo = exports.NodeInfo = exports.BrowserInfo = void 0;
    var BrowserInfo = (
      /** @class */
      function() {
        function BrowserInfo2(name, version, os2) {
          this.name = name;
          this.version = version;
          this.os = os2;
          this.type = "browser";
        }
        return BrowserInfo2;
      }()
    );
    exports.BrowserInfo = BrowserInfo;
    var NodeInfo = (
      /** @class */
      function() {
        function NodeInfo2(version) {
          this.version = version;
          this.type = "node";
          this.name = "node";
          this.os = process.platform;
        }
        return NodeInfo2;
      }()
    );
    exports.NodeInfo = NodeInfo;
    var SearchBotDeviceInfo = (
      /** @class */
      function() {
        function SearchBotDeviceInfo2(name, version, os2, bot) {
          this.name = name;
          this.version = version;
          this.os = os2;
          this.bot = bot;
          this.type = "bot-device";
        }
        return SearchBotDeviceInfo2;
      }()
    );
    exports.SearchBotDeviceInfo = SearchBotDeviceInfo;
    var BotInfo = (
      /** @class */
      function() {
        function BotInfo2() {
          this.type = "bot";
          this.bot = true;
          this.name = "bot";
          this.version = null;
          this.os = null;
        }
        return BotInfo2;
      }()
    );
    exports.BotInfo = BotInfo;
    var ReactNativeInfo = (
      /** @class */
      function() {
        function ReactNativeInfo2() {
          this.type = "react-native";
          this.name = "react-native";
          this.version = null;
          this.os = null;
        }
        return ReactNativeInfo2;
      }()
    );
    exports.ReactNativeInfo = ReactNativeInfo;
    var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
    var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
    var REQUIRED_VERSION_PARTS = 3;
    var userAgentRules = [
      ["aol", /AOLShield\/([0-9\._]+)/],
      ["edge", /Edge\/([0-9\._]+)/],
      ["edge-ios", /EdgiOS\/([0-9\._]+)/],
      ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
      ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
      ["samsung", /SamsungBrowser\/([0-9\.]+)/],
      ["silk", /\bSilk\/([0-9._-]+)\b/],
      ["miui", /MiuiBrowser\/([0-9\.]+)$/],
      ["beaker", /BeakerBrowser\/([0-9\.]+)/],
      ["edge-chromium", /EdgA?\/([0-9\.]+)/],
      [
        "chromium-webview",
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
      ],
      ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
      ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
      ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
      ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
      ["fxios", /FxiOS\/([0-9\.]+)/],
      ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
      ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
      ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
      ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
      ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
      ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
      ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
      ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
      ["ie", /MSIE\s(7\.0)/],
      ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
      ["android", /Android\s([0-9\.]+)/],
      ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
      ["safari", /Version\/([0-9\._]+).*Safari/],
      ["facebook", /FB[AS]V\/([0-9\.]+)/],
      ["instagram", /Instagram\s([0-9\.]+)/],
      ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
      ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
      ["curl", /^curl\/([0-9\.]+)$/],
      ["searchbot", SEARCHBOX_UA_REGEX]
    ];
    var operatingSystemRules = [
      ["iOS", /iP(hone|od|ad)/],
      ["Android OS", /Android/],
      ["BlackBerry OS", /BlackBerry|BB10/],
      ["Windows Mobile", /IEMobile/],
      ["Amazon OS", /Kindle/],
      ["Windows 3.11", /Win16/],
      ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
      ["Windows 98", /(Windows 98)|(Win98)/],
      ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
      ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
      ["Windows Server 2003", /(Windows NT 5.2)/],
      ["Windows Vista", /(Windows NT 6.0)/],
      ["Windows 7", /(Windows NT 6.1)/],
      ["Windows 8", /(Windows NT 6.2)/],
      ["Windows 8.1", /(Windows NT 6.3)/],
      ["Windows 10", /(Windows NT 10.0)/],
      ["Windows ME", /Windows ME/],
      ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
      ["Open BSD", /OpenBSD/],
      ["Sun OS", /SunOS/],
      ["Chrome OS", /CrOS/],
      ["Linux", /(Linux)|(X11)/],
      ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
      ["QNX", /QNX/],
      ["BeOS", /BeOS/],
      ["OS/2", /OS\/2/]
    ];
    function detect2(userAgent) {
      if (!!userAgent) {
        return parseUserAgent(userAgent);
      }
      if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
        return new ReactNativeInfo();
      }
      if (typeof navigator !== "undefined") {
        return parseUserAgent(navigator.userAgent);
      }
      return getNodeVersion();
    }
    exports.detect = detect2;
    function matchUserAgent(ua) {
      return ua !== "" && userAgentRules.reduce(function(matched, _a) {
        var browser = _a[0], regex = _a[1];
        if (matched) {
          return matched;
        }
        var uaMatch = regex.exec(ua);
        return !!uaMatch && [browser, uaMatch];
      }, false);
    }
    function browserName(ua) {
      var data = matchUserAgent(ua);
      return data ? data[0] : null;
    }
    exports.browserName = browserName;
    function parseUserAgent(ua) {
      var matchedRule = matchUserAgent(ua);
      if (!matchedRule) {
        return null;
      }
      var name = matchedRule[0], match = matchedRule[1];
      if (name === "searchbot") {
        return new BotInfo();
      }
      var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
      if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
          versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
        }
      } else {
        versionParts = [];
      }
      var version = versionParts.join(".");
      var os2 = detectOS(ua);
      var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
      if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo(name, version, os2, searchBotMatch[1]);
      }
      return new BrowserInfo(name, version, os2);
    }
    exports.parseUserAgent = parseUserAgent;
    function detectOS(ua) {
      for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
        var _a = operatingSystemRules[ii], os2 = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
          return os2;
        }
      }
      return null;
    }
    exports.detectOS = detectOS;
    function getNodeVersion() {
      var isNode = typeof process !== "undefined" && process.version;
      return isNode ? new NodeInfo(process.version.slice(1)) : null;
    }
    exports.getNodeVersion = getNodeVersion;
    function createVersionParts(count) {
      var output = [];
      for (var ii = 0; ii < count; ii++) {
        output.push("0");
      }
      return output;
    }
  }
});

// src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearch.ts
var ExternalMatterSearch_exports = {};
__export(ExternalMatterSearch_exports, {
  ExternalMatterSearch: () => ExternalMatterSearch
});
module.exports = __toCommonJS(ExternalMatterSearch_exports);

// node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/chalk/source/vendor/supports-color/index.js
var import_node_process = __toESM(require("node:process"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_tty = __toESM(require("node:tty"), 1);
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = import_node_process.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if ("GITHUB_ACTIONS" in env || "GITEA_ACTIONS" in env) {
      return 3;
    }
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self2, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self2;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self2, string) => {
  if (self2.level <= 0 || !string) {
    return self2[IS_EMPTY] ? "" : string;
  }
  let styler = self2[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// src/Common/StackHelper.ts
function extractLineNumberFromStack(stack) {
  if (!stack)
    return null;
  const stackLines = stack.split("\n");
  const errorLine = stackLines[1] || "";
  const match = errorLine.match(/:(\d+):(\d+)$/);
  return match ? parseInt(match[1]) : null;
}
function extractCallerFromStack(stack) {
  if (!stack)
    return null;
  const stackLines = stack.split("\n");
  const callerLine = stackLines[2] || "";
  const match = callerLine.match(/at ([\w.<>]+)/);
  return match ? match[1] : null;
}

// src/Common/Log.ts
source_default.level = 3;
var defaultMode = source_default.reset;
var lastSec;
function clearSec() {
  if (lastSec?.group) {
    for (let i = 0; i < lastSec?.group; i++) {
      console.groupEnd();
    }
  }
  lastSec = new Section("Root", defaultMode);
}
function secBackOne() {
  lastSec = lastSec?.parent;
  console.groupEnd();
}
var Section = class {
  constructor(sectionName, c, section) {
    this.indent = 0;
    this.indentPad = "";
    this.group = 0;
    this.c = c;
    this.sectionName = sectionName;
    if (section) {
      this.indent = section.indent + 1;
      this.indentPad = "-".repeat(this.indent * 2) + " ";
    }
    lastSec = this;
    this.parent = section;
  }
  log(...args) {
    console.log(defaultMode(args));
  }
  lh1(heading) {
    return lh1(this.indentPad + heading, this);
  }
  lh2(heading) {
    return lh2(this.indentPad + heading, this);
  }
  lh3(heading) {
    return lh3(this.indentPad + heading, this);
  }
  l(...args) {
    return l(this, ...args);
  }
};
function l(...args) {
  let sec = lastSec;
  let firstArg;
  let firstArgModifed;
  args.forEach((arg) => {
    if (arg instanceof Section) {
      sec = arg;
    }
    if (!firstArg && arg.constructor.name === "String") {
      firstArg = args.shift();
    }
  });
  args = args.filter((arg) => {
    return !(arg instanceof Section);
  });
  let c = defaultMode;
  let indentPad = sec?.indentPad || "";
  if (!firstArg) {
    firstArg = "";
  }
  firstArgModifed = firstArg;
  firstArgModifed = indentPad + firstArg;
  let totLen = firstArgModifed.length - firstArgModifed.replace(/\u001b\[.*?m/g, "").length - 2;
  console.log(firstArgModifed);
  args.forEach((arg) => {
    console.log(arg);
  });
}
function logHeadingSection(c, heading, section) {
  let sec = new Section(heading, c, section);
  let time = new Date(Date.now()).toLocaleString();
  let path = "";
  if (section) {
    path = section.sectionName;
    while (section.parent) {
      section = section.parent;
      path = section.sectionName + " -> " + path;
    }
  }
  if (path.length > 0) {
    path += " -> ";
  }
  path += heading;
  console.groupCollapsed(c(path));
  sec.group++;
  return sec;
}
function lh1(heading, section = lastSec) {
  let c = source_default.bgBlack.greenBright.bold;
  return logHeadingSection(c, heading, section);
}
function lh2(heading, section = lastSec) {
  let c = source_default.bgGray.cyanBright.bold;
  return logHeadingSection(c, heading, section);
}
function lh3(heading, section = lastSec) {
  let c = source_default.bgGray.magentaBright.bold;
  return logHeadingSection(c, heading, section);
}
var inf = (text) => {
  let c = source_default.blue.bold;
  return c(text);
};
var wrn = (text) => {
  let c = source_default.yellow.bold;
  return c(text);
};
var err = (text) => {
  let er = new Error();
  let lineNo = extractLineNumberFromStack(er.stack);
  let caller = extractCallerFromStack(er.stack);
  let preText = `[${caller}:${lineNo}]`;
  text = preText + " " + text;
  console.log(er);
  let c = source_default.red.bold;
  return c(text);
};
var nv = (name, value) => {
  return source_default.bgBlueBright(name.padEnd(30, " ")) + " : " + source_default.cyanBright(value);
};
clearSec();

// src/WebBased/Common/ObjectHelper.ts
function setAllFieldsToNull(model) {
  let keys = Object.keys(model);
  keys.forEach((key) => {
    model[key] = null;
  });
}
function setNestedProperty(obj, propertyPath, value) {
  const properties = propertyPath.split(".");
  let current = obj;
  for (let i = 0; i < properties.length - 1; i++) {
    const prop = properties[i];
    if (!current[prop]) {
      current[prop] = {};
    }
    current = current[prop];
  }
  current[properties[properties.length - 1]] = value;
}
function getNestedProperty(obj, propertyPath) {
  l(inf(`getNestedProperty(${propertyPath})`), obj);
  const properties = propertyPath.split(".");
  let current = obj;
  for (const prop of properties) {
    const matches = prop.match(/^([a-zA-Z0-9_]+)\[([0-9]+)\]$/);
    if (matches) {
      const arrayProp = matches[1];
      const index = parseInt(matches[2], 10);
      if (!Array.isArray(current[arrayProp]) || current[arrayProp][index] === void 0) {
        l(err(`getNestedProperty(${propertyPath}): arrayProp or index is undefined`), obj);
        return void 0;
      }
      current = current[arrayProp][index];
    } else if (current[prop] === void 0) {
      l(err(`getNestedProperty(${propertyPath}): prop is undefined`), obj);
      return void 0;
    } else {
      current = current[prop];
    }
  }
  return current;
}
function gvko(koObject) {
  return ko.toJS(koObject);
}

// src/WebBased/Common/api/api.ts
async function executePost(api, postBody) {
  return (await executeFetch(api, "POST", postBody)).data;
}
async function executeGetv2(api) {
  return executeFetch(api, "GET", void 0);
}
async function executePostv2(api, postBody) {
  return executeFetch(api, "POST", postBody);
}
function validateApi(api) {
  let location = window.document.location.origin;
  if (api.indexOf(location) === -1) {
    if (api.indexOf("/") !== 0) {
      api = "/" + api;
    }
    api = location + api;
  }
  return api;
}
async function executeFetch(api, method, data, retryCounter) {
  let retValue = {
    data: void 0,
    response: void 0,
    info: {
      success: false,
      error: []
    }
  };
  let url = validateApi(api);
  let fetchHeaders = buildHeaders();
  let response = await fetch(
    url,
    {
      method,
      headers: fetchHeaders,
      body: data ? JSON.stringify(data) : void 0
    }
  ).then(async (response2) => {
    retValue.response = response2;
    if (response2.ok === false) {
      if (response2.status === 401) {
        retryCounter = retryCounter || 1;
        if (retryCounter > 3) {
          retValue.info.error.push({
            code: "API_ERROR",
            message: `An error occured while trying to call the API after 3 attempts. statusText: ${response2.statusText}`,
            userMessage: "An error occured while trying to call the API."
          });
          return { data: void 0, response: response2 };
        }
        await $ajax.get("https://hsf-vnext.sharedo.co.uk/security/refreshTokens?_=" + Date.now);
        return await executeFetch(api, method, data, retryCounter);
      }
      retValue.info.error.push({
        code: "API_ERROR",
        message: `An error occured while trying to call the API. statusText: ${response2.statusText}`,
        userMessage: "An error occured while trying to call the API."
      });
    }
    let responseData;
    try {
      if (response2.headers.get("content-type")?.includes("application/json")) {
        responseData = await response2.json();
      } else {
        responseData = await response2.text();
      }
      retValue.info.success = true;
    } catch (e) {
      retValue.info.error.push({
        code: "API_ERROR",
        message: `An error occured while trying to extract the data from the API. Message: ${e?.message || "Unknown"}`,
        userMessage: `An error occured while trying to extract the data from the API.`
      });
    }
    return { data: responseData, response: response2 };
  }).catch((error) => {
    l(err(`Error from API Call ${url}`), error);
    retValue.info.error.push({
      code: "API_ERROR",
      message: error.message,
      userMessage: error.message
    });
    return { data: void 0, response: void 0 };
  });
  lh1(`Response from ${url}`);
  l(response);
  retValue.data = response.data;
  if (retValue.info.error.length > 0) {
    retValue.info.success = false;
    retValue.info.error.forEach((e) => {
      l(err(`Error from API Call ${url}`), e);
    });
  }
  secBackOne();
  return retValue;
}
function buildHeaders() {
  let bearer = getBearerToken();
  let fetchHeaders = new Headers();
  fetchHeaders.append("Content-Type", "application/json");
  if (bearer) {
    fetchHeaders.append("Authorization", bearer);
  }
  return fetchHeaders;
}
function getCookies() {
  let retValue = {};
  let cookies = document.cookie.split(";").reduce(function(cookies2, cookie) {
    var parts = cookie.split("=");
    if (parts.length === 2) {
      var key = parts[0].trim();
      var value = parts[1];
      retValue[key] = value;
    }
    return cookies2;
  }, {});
  return retValue;
}
function getBearerToken() {
  var cookies = getCookies();
  var token = cookies["_api"];
  if (token)
    return "Bearer " + token;
  return null;
}

// src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearch.ts
var import_knockout2 = __toESM(require_knockout_latest());

// src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts
var DEBUG_DEFAULT = () => {
  let retValue = {
    enabled: true,
    logToConsole: true,
    showInAspect: false,
    liveConfig: false
  };
  return retValue;
};
var DEFAULT_SHAREDO_COMMAND = {
  typeSystemName: "task",
  title: "Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle}",
  description: void 0
};
var DEFAULT_SUPPORT_BUTTON = {
  raiseSupportTicket: true,
  supportTicketMessage: "Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle} context ${JSON.stringify(dataContext)}",
  raiseSupportTicketSharedoCommand: DEFAULT_SHAREDO_COMMAND,
  dataContext: "Populated by the system",
  title: "Raise Support Ticket",
  styleRules: void 0,
  classRules: void 0,
  toolTip: "Raise a support ticket with the support desk"
};
var REFRESH_ON_DEFAULTS = {
  sharedoIdChanged: false,
  sharedoParentIdChanged: false,
  sharedoPhaseChanged: false
};
var DEFAULT_ERROR_MANAGEMENT_TRAPS = [
  {
    dataContext: null,
    enabled: true,
    rule: "dataContext.error.message.toLowerCase().includes('forbidden')",
    userFreindlyMessage: "The matter is not accessible to you. It may be behind a Information Barrier.",
    resolutionSuggestions: ["Please contact the matter owner for access."],
    userFreindlyHTMLMessageTemplate: void 0,
    supportButton: DEFAULT_SUPPORT_BUTTON,
    styleRules: [
      {
        rule: "true",
        style: "box-shadow: 1px 1px 10px #d46060;"
      }
    ],
    classRules: [
      {
        rule: "true",
        cssClass: "ems-selected-item"
      },
      {
        rule: "true",
        cssClass: "ems-show"
      }
    ]
  }
];
var DEFAULT_ERROR_MANAGEMENT_SETTINGS = {
  errorTraps: DEFAULT_ERROR_MANAGEMENT_TRAPS,
  enabled: true,
  displayUnTrappedErrorInAspect: true,
  unTrappedErrorsSupportButton: void 0
};
var DEFAULT_CONFIGURATION_SETTINGS = {
  debug: DEBUG_DEFAULT(),
  refreshOn: REFRESH_ON_DEFAULTS,
  eventsToReactTo: [
    {
      eventPath: "sharedo.updated",
      methodToCall: "refresh"
    },
    {
      eventPath: "sharedo.core.case.sharedo-updated",
      methodToCall: "refresh"
    }
  ],
  dataSettings: {
    getValueUsingParents: false,
    maxDepth: 0
  },
  errorManagement: DEFAULT_ERROR_MANAGEMENT_SETTINGS
};

// src/WebBased/IDEAspects/ExternalMatterSearch/DefaultSearchFields.ts
var DEFAULT_SEARCH_FIELDS_CONFIG = {
  "container": {},
  "icon": [
    {
      "icon": "fa-search fa-2x text-primary"
    }
  ],
  "style": [
    {
      "rule": "dataContext.data.data.status.toLowerCase()==='closed'",
      "style": {
        "color": "lightgrey"
      }
    }
  ],
  "rows": [
    {
      "fields": [
        {
          "field": "${dataContext.data.data.matterCode||dataContext.data.data.code}",
          "style": "font-weight:bold",
          "icon": [
            {
              "rule": "dataContext.data.data.status.toLowerCase()==='open'",
              "icon": "fa-folder-open text-success",
              "position": "before"
            },
            {
              "rule": "dataContext.data.data.status.toLowerCase()==='closed'",
              "icon": "fa-folder text-danger",
              "position": "before"
            }
          ],
          "width": null
        },
        {
          "style": {
            "color": "blue"
          },
          "field": "${dataContext.data.title}"
        },
        {
          "field": "${dataContext.data.data.status}",
          "formatter": "value.toUpperCase()",
          "label": "Status",
          "position": "right",
          "width": null
        }
      ]
    },
    {
      "fields": [
        {
          "field": ""
        },
        {
          "label": "Client",
          "field": "${dataContext.data.data.client}",
          "width": null
        },
        {
          "field": ""
        }
      ]
    }
  ]
};

// src/WebBased/IDEAspects/ExternalMatterSearch/DefaultSelectedFields.ts
var DEFAULT_SELECTED_FIELDS_CONFIG = {
  "container": {
    "style": [
      {
        "rule": "dataContext.data.secure",
        "style": {
          "box-shadow": "1px 1px 62px #cb8383"
        }
      },
      {
        "rule": "!dataContext.data.secure",
        "style": {
          "box-shadow": "1px 1px 10px #a4a3a3"
        }
      }
    ]
  },
  "icon": [
    {
      "rule": "dataContext.data.secure",
      "icon": "fa-shield text-warning fa-2x",
      "position": "before"
    }
  ],
  "rows": [
    {
      "fields": [
        {
          "field": "${dataContext.data.matterCode}",
          "style": "font-weight:bold",
          "icon": [
            {
              "rule": "dataContext.data.status.toLowerCase()==='open'",
              "icon": "fa-folder-open text-success",
              "position": "before"
            },
            {
              "rule": "dataContext.data.status.toLowerCase()==='closed'",
              "icon": "fa-folder text-danger",
              "position": "before"
            }
          ],
          "width": null
        },
        {
          "field": "${dataContext.data.shortName}",
          "width": null,
          "style": {
            "font-weight": "bold",
            "color": "red",
            "font-size": "larger"
          }
        },
        {
          "field": "${dataContext.data.status}",
          "formatter": "value.toUpperCase()",
          "label": "Status",
          "position": "right",
          "width": null,
          "style": "font-weight:bold"
        }
      ]
    },
    {
      "fields": [
        {
          "field": [
            {
              "rule": "dataContext.data.secure",
              "field": "Secured!"
            },
            {
              "rule": "!dataContext.data.secure",
              "field": "Not Secured"
            }
          ],
          "style": [
            {
              "style": {
                "margin-top": "-10px",
                "font-size": "x-small"
              }
            },
            {
              "rule": "!dataContext.data.secure",
              "style": {
                "color": "green",
                "font-weight": "bold"
              }
            },
            {
              "rule": "dataContext.data.secure",
              "style": {
                "color": "red",
                "font-weight": "bold"
              }
            }
          ]
        },
        {
          "style": {
            "font-size": "smaller",
            "margin-top": "-10px"
          },
          "field": "${dataContext.data.practiceGroup}"
        },
        {
          "field": ""
        }
      ]
    },
    {
      "fields": [
        {
          "label": "Client",
          "field": "${dataContext.data.client.name}",
          "width": null
        },
        {
          "field": "${dataContext.data.client.code}",
          "width": null,
          "style": {}
        }
      ]
    },
    {
      "fields": [
        {
          "label": "Partner",
          "field": "${dataContext.data.partner.name}",
          "width": null
        },
        {
          "field": "${dataContext.data.partner.code}",
          "width": null,
          "style": {}
        }
      ]
    },
    {
      "fields": [
        {
          "label": "Location",
          "field": "${dataContext.data.location.country}",
          "width": null
        },
        {
          "label": "Office",
          "field": "${dataContext.data.location.office}",
          "width": null,
          "style": {}
        },
        {
          "label": "Region",
          "field": "${dataContext.data.location.region}",
          "width": null,
          "style": {}
        }
      ]
    }
  ]
};

// src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchDefaults.ts
var Default = {
  title: "Matter Search",
  showSearchingStatus: true,
  inputVisability: [
    {
      rule: "dataContext.phaseName ? dataContext.phaseName.toLowerCase()==='new' : true"
    }
  ],
  fackMode: false,
  fackLoadDataIDEPath: void 0,
  fackSearchDataIDEPath: void 0,
  formBuilderName: "custom-alt-ediscovery-instruction-matter-details",
  formBuilderFieldSerialisedData: "matterJSON",
  selectedFieldDisplayValue: "${dataContext.matterCode} - ${dataContext.shortName}",
  loadApiResultDataPath: "data",
  loadApiUrl: "/api/proxy/hurricane-api/_/v2/matters/${dataContext.data.matterCode||dataContext.data.code}",
  dataMapping: [
    {
      formBuilderField: "expert-matter-number",
      searchResultField: "${dataContext.data.matterCode}"
    },
    {
      formBuilderField: "expert-matter-number-value",
      searchResultField: "${dataContext.data.matterCode}"
    },
    {
      formBuilderField: "matter-details-ib",
      searchResultField: "${dataContext.data.secure}"
    },
    {
      formBuilderField: "matter-details-name",
      searchResultField: "${dataContext.data.shortName}"
    },
    {
      formBuilderField: "matter-details-client-name",
      searchResultField: "${dataContext.data.client.name}"
    },
    {
      formBuilderField: "matter-details-client-code",
      searchResultField: "${dataContext.data.client.code}"
    },
    {
      formBuilderField: "matter-details-partner-name",
      searchResultField: "${dataContext.data.partner.name}"
    }
  ],
  fieldMapping: [
    {
      formBuilderField: "jurisdictions-country",
      searchResultField: "${dataContext.data.location.country}"
    }
  ],
  debug: DEBUG_DEFAULT(),
  searchFields: DEFAULT_SEARCH_FIELDS_CONFIG,
  selectedFields: DEFAULT_SELECTED_FIELDS_CONFIG,
  searchApiExecutionSettings: [
    {
      method: "GET",
      url: "/api/proxy/hurricane-api/_/v1/find?q=${dataContext.searchTerm}&engines=MBN",
      resultDataPath: "data[0].results",
      name: "Aderant Matter Content"
    },
    {
      method: "GET",
      url: "/api/proxy/hurricane-api/_/v1/find?q=${dataContext.searchTerm}&engines=MBC",
      resultDataPath: "data[0].results",
      name: "Aderant Matter Number"
    }
  ],
  refreshOn: {
    sharedoIdChanged: true,
    sharedoParentIdChanged: true,
    sharedoPhaseChanged: false
  },
  eventsToReactTo: [],
  dataSettings: {
    getValueUsingParents: false,
    maxDepth: 0
  },
  errorManagement: DEFAULT_ERROR_MANAGEMENT_SETTINGS
};

// src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchSettings.ts
var Settings = {
  type: "widget",
  "priority": 6e3,
  "designer": {
    "allowInPortalDesigner": false,
    "allowInSharedoPortalDesigner": false,
    "allowAspectAdapter": true,
    "title": "External Matter Search",
    "icon": "fa-cog",
    "description": "External Matter Search",
    "categories": [],
    "isConfigurable": true,
    "configurationWidget": null,
    defaultConfigurationJson: { configuration: Default }
  },
  "scripts": [],
  "styles": [
    "ExternalMatterSearch.css"
  ],
  "templates": [
    "ExternalMatterSearch.html"
  ],
  "menuTemplates": [],
  "components": [
    "Sharedo.UI.Framework.Components.AutoComplete",
    "Sharedo.Core.Case.TextEditor.Component",
    "Sharedo.UI.Framework.Components.SyntaxEditor"
  ]
};

// src/WebBased/IDEAspects/BaseClasses/Template/TemplateGenerator.ts
var import_knockout = __toESM(require_knockout_latest());
function autoGenerateTemplate(fieldNames) {
  const rows = [];
  for (let i = 0; i < fieldNames.length; i++) {
    const fieldName = fieldNames[i];
    const row = {
      fields: [
        {
          field: fieldName,
          formatter: i < 2 ? "value.toUpperCase()" : void 0,
          style: i < 1 ? "font-weight:bold" : void 0,
          icon: i < 1 ? [{ rule: "isSecure", icon: "fa-shield", position: "before" }] : void 0,
          label: i === 1 ? "Status" : void 0,
          position: i === 1 ? "right" : void 0,
          width: null
        }
      ]
    };
    rows.push(row);
  }
  return {
    rows
    // icon: [
    //   {
    //     icon: 'fa-search'
    //   }
    // ]
    // Add other properties if you want
    // for example: cssClass, style, icon, etc.
  };
}
function generateHtmlDiv(placement, dataContextName, container, applicator) {
  import_knockout.default.bindingHandlers.matterSearchBinding = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      applicator.setupElement(element, valueAccessor, allBindings, viewModel, bindingContext);
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      applicator.updateElement(element, valueAccessor, allBindings, viewModel, bindingContext);
    }
  };
  const rootDiv = document.createElement("div");
  container.appendChild(rootDiv);
  const divElemColumn = document.createElement("div");
  addCustomBinding(rootDiv, placement, "IFieldPlacement");
  return rootDiv;
}
function addCustomBinding(element, field, type) {
  let currentDataBind = element.getAttribute("data-bind") || "";
  if (currentDataBind) {
    currentDataBind += ",";
  }
  let customContext = {
    type,
    object: field
  };
  element.setAttribute("data-bind", `${currentDataBind} matterSearchBinding: ${JSON.stringify(customContext, null, 2)}`);
}

// src/helpers/Schema.ts
var import_ajv = __toESM(require_ajv());
function validateJSON(data, schema) {
  const ajv = new import_ajv.default();
  const validateFn = ajv.compile(schema);
  return validateFn(data);
}

// src/WebBased/IDEAspects/ExternalMatterSearch/ConfigSchema.json
var ConfigSchema_exports = {};
__export(ConfigSchema_exports, {
  $ref: () => $ref,
  $schema: () => $schema,
  default: () => ConfigSchema_default,
  definitions: () => definitions
});
var $schema = "http://json-schema.org/draft-07/schema#";
var $ref = "#/definitions/IExternalMatterSearchConfiguration";
var definitions = {
  IExternalMatterSearchConfiguration: {
    type: "object",
    properties: {
      fackMode: {
        type: "boolean"
      },
      searchApiUrl: {
        type: "string"
      },
      loadApiUrl: {
        type: "string"
      },
      searchFields: {
        $ref: "#/definitions/IFieldPlacement"
      },
      selectedFields: {
        $ref: "#/definitions/IFieldPlacement"
      },
      dataMapping: {
        type: "array",
        items: {
          $ref: "#/definitions/IDataMapping"
        }
      },
      fackSearchDataIDEPath: {
        type: "string"
      },
      fackLoadDataIDEPath: {
        type: "string"
      }
    },
    required: [
      "fackMode",
      "searchApiUrl",
      "loadApiUrl",
      "searchFields",
      "selectedFields",
      "dataMapping"
    ],
    additionalProperties: false
  },
  IFieldPlacement: {
    type: "object",
    properties: {
      cssClass: {
        type: [
          "string",
          "null"
        ]
      },
      style: {
        type: [
          "string",
          "null"
        ]
      },
      icon: {
        anyOf: [
          {
            type: "array",
            items: {
              $ref: "#/definitions/IIconRule"
            }
          },
          {
            type: "null"
          }
        ]
      },
      rows: {
        anyOf: [
          {
            type: "array",
            items: {
              $ref: "#/definitions/IFieldRow"
            }
          },
          {
            type: "null"
          }
        ]
      }
    },
    required: [
      "rows"
    ],
    additionalProperties: false
  },
  IIconRule: {
    type: "object",
    properties: {
      rule: {
        type: [
          "string",
          "null"
        ]
      },
      icon: {
        type: "string"
      },
      cssClass: {
        type: [
          "string",
          "null"
        ]
      },
      style: {
        type: [
          "string",
          "null"
        ]
      },
      position: {
        type: [
          "string",
          "null"
        ],
        enum: [
          "before",
          "after",
          null
        ]
      }
    },
    required: [
      "icon"
    ],
    additionalProperties: false
  },
  IFieldRow: {
    type: "object",
    properties: {
      cssClass: {
        type: [
          "string",
          "null"
        ]
      },
      style: {
        type: [
          "string",
          "null"
        ]
      },
      alignItems: {
        type: [
          "string",
          "null"
        ],
        enum: [
          "space-between",
          "space-around",
          "flex-start",
          "flex-end",
          "center",
          null
        ]
      },
      fields: {
        anyOf: [
          {
            type: "array",
            items: {
              $ref: "#/definitions/IFieldRowField"
            }
          },
          {
            type: "null"
          }
        ]
      }
    },
    required: [
      "fields"
    ],
    additionalProperties: false
  },
  IFieldRowField: {
    type: "object",
    properties: {
      field: {
        type: "string"
      },
      formatter: {
        type: [
          "string",
          "null"
        ]
      },
      label: {
        type: [
          "string",
          "null"
        ]
      },
      position: {
        type: [
          "string",
          "null"
        ],
        enum: [
          "left",
          "right",
          "center",
          null
        ]
      },
      width: {
        type: [
          "number",
          "null"
        ]
      },
      icon: {
        anyOf: [
          {
            type: "array",
            items: {
              $ref: "#/definitions/IIconRule"
            }
          },
          {
            type: "null"
          }
        ]
      },
      cssClass: {
        type: [
          "string",
          "null"
        ]
      },
      style: {
        type: [
          "string",
          "null"
        ]
      }
    },
    required: [
      "field"
    ],
    additionalProperties: false
  },
  IDataMapping: {
    type: "object",
    properties: {
      formBuilderField: {
        type: "string"
      },
      searchResultField: {
        type: "string"
      }
    },
    required: [
      "formBuilderField",
      "searchResultField"
    ],
    additionalProperties: false
  }
};
var ConfigSchema_default = {
  $schema,
  $ref,
  definitions
};

// src/Common/JsonToHTMLConverter.ts
var JsonToHtmlConverter = class {
  static convert(json2) {
    if (json2 == null)
      return this.escapeHtml("<em>null</em>");
    if (typeof json2 !== "object")
      return this.escapeHtml(json2.toString());
    if (Array.isArray(json2)) {
      return this.arrayToHtml(json2);
    } else {
      return this.objectToHtml(json2);
    }
  }
  static arrayToHtml(arr) {
    const itemsHtml = arr.map((item) => `<li>${this.convert(item)}</li>`).join("");
    return `<ul>${itemsHtml}</ul>`;
  }
  static objectToHtml(obj) {
    const propertiesHtml = Object.keys(obj).map((key) => `<li>${this.escapeHtml(key)}: ${this.convert(obj[key])}</li>`).join("");
    return `<ul>${propertiesHtml}</ul>`;
  }
  static escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
};
var json = {
  code: "ERROR_CODE",
  message: "Something went wrong",
  details: {
    info: "Detailed information about the error",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    items: [1, 2, 3]
  }
};

// src/helpers/evaluteRule.ts
function evaluteRule(rule, dataContext, dataContextName) {
  if (!rule) {
    return false;
  }
  try {
    const returnValue = executeFunc(rule, dataContext, dataContextName);
    if (typeof returnValue === "boolean") {
      return returnValue;
    } else {
      l(err(`Rule [${rule}] did not return a boolean value. It returned: ${returnValue}`));
      return false;
    }
  } catch (e) {
    console.log(`Error evaluating rule [${rule}] with data context`, e);
    return false;
  }
}
function executeFunc(expression, dataContext, dataContextName) {
  l(inf(`evaluteRule(${expression})`), dataContext);
  if (expression === "") {
    return "";
  }
  if (!expression) {
    return void 0;
  }
  let dynamicFunc;
  try {
    let dataContextNameToUse = "dataContext";
    if (dataContextName) {
      const escapedDataContextName = dataContextName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedDataContextName, "g");
      expression = expression.replace(regex, dataContextNameToUse);
    }
    checkAndLogUndefined(dataContext, expression, dataContextNameToUse);
    dynamicFunc = new Function(`${dataContextNameToUse}`, `return (${expression});`);
  } catch (e) {
    let errMessage = `Error creating function for expression [${expression}]`;
    l(err(errMessage), e);
    return errMessage;
  }
  l(inf(`evaluteRule(${expression}) - dynamicFunc: `), dynamicFunc);
  try {
    const returnValue = dynamicFunc(dataContext);
    return returnValue;
  } catch (e) {
    console.log(`Error evaluating rule [${expression}] with data context`, e);
    return `${e}`;
  }
}
function checkAndLogUndefined(obj, rule, dataContextName) {
  const props = rule.split(".");
  let current = {};
  current[dataContextName] = obj;
  for (let i = 0; i < props.length; i++) {
    if (current[props[i]] === void 0) {
      l(err(`Error while evaluating a rule ${rule}! The property ${dataContextName}.${props.slice(0, i + 1).join(".")} is undefined.`));
      l(err(`Check the configuration of the rule ${rule}!`));
      return void 0;
    }
    current = current[props[i]];
  }
  return current;
}
function executeEmbeddedCode(input, dataContext, dataContextName) {
  if (!input) {
    return "";
  }
  return input.replace(/\$\{(.+?)\}/g, (_, code) => {
    try {
      let val = executeFunc(code, dataContext, dataContextName);
      if (val === void 0) {
        val = "";
      }
      val = JSON.stringify(val, void 0, 2);
      val = JsonToHtmlConverter.convert(val);
      val = val.substring(1, val.length - 1);
      return val;
    } catch (error) {
      console.error("Failed to execute embedded code:", error);
      let val = "";
      if (error.message) {
        val = error.message;
      } else {
        val = JSON.stringify(error);
      }
      return JSON.stringify(val);
    }
  });
}

// src/helpers/Formatter.ts
function formatValue(value, formatter) {
  let dynamicFunc;
  let returnValue;
  try {
    dynamicFunc = new Function("value", `return (${formatter});`);
    returnValue = dynamicFunc(value);
  } catch (e) {
    returnValue = `Error formatting value ${value} with formatter ${formatter} - ${e}`;
  }
  return returnValue;
}
var formatFunc = formatValue;

// src/helpers/VakueExtractor.ts
function extractValue(value, viewModel, formatter, dataContextName) {
  let valueToSet = executeEmbeddedCode(value, viewModel, dataContextName);
  if (typeof valueToSet !== "string") {
    valueToSet = JSON.stringify(valueToSet, null, 2);
  }
  if (formatter) {
    valueToSet = formatFunc(valueToSet, formatter);
  }
  return valueToSet;
}

// src/WebBased/IDEAspects/ExternalMatterSearch/DataMapper.ts
function mapData(data, dataMapping, dataContextName) {
  const mappedData = {};
  for (const mapping of dataMapping) {
    const { formBuilderField, searchResultField } = mapping;
    if (searchResultField.includes("{*}")) {
      const searchResultBase = searchResultField.split("{*}")[0];
      let objectBase = searchResultBase.replace(/{|}/g, "");
      if (objectBase.endsWith(".")) {
        objectBase = objectBase.substring(0, objectBase.length - 1);
      }
      const value = extractValue(objectBase, data, null, dataContextName);
      if (typeof value === "object") {
        for (const [key, subValue] of Object.entries(value)) {
          let keyWithFirstLetterCapitalized = key.charAt(0).toUpperCase() + key.slice(1);
          mappedData[`${formBuilderField.replace("{*}", keyWithFirstLetterCapitalized)}`] = subValue;
        }
      }
    } else {
      if (searchResultField.includes("{") && searchResultField.includes("}")) {
        let value = searchResultField;
        value = extractValue(value, data, null, dataContextName);
        mappedData[formBuilderField] = value;
      } else {
        let value = getNestedProperty(data, searchResultField.replace(/{|}/g, ""));
        value = extractValue(value, data, null, dataContextName);
        mappedData[formBuilderField] = value;
      }
    }
  }
  return mappedData;
}

// src/WebBased/IDEAspects/BaseClasses/Template/TemplateApplicator.ts
var TemplateApplicator = class {
  constructor() {
  }
  setupElement(element, valueAccessor, allBindings, viewModel, bindingContext) {
    let instruction = allBindings().matterSearchBinding;
    if (!instruction) {
      l(err("No instruction defined"));
      return;
    }
    if (instruction.type == "IFieldPlacement") {
      let rowField = instruction.object;
      this.buildPlacements(rowField, "dataContextName", viewModel, element);
    }
  }
  updateElement(element, valueAccessor, allBindings, viewModel, bindingContext) {
    l("updateElement", element, valueAccessor, allBindings, viewModel, bindingContext);
  }
  buildPlacements(placement, dataContextName, viewModel, container) {
    let rowCounter = 0;
    const rootDiv = document.createElement("div");
    container.appendChild(rootDiv);
    if (placement.container) {
      container.classList.add("ems-container");
      let containerParent = container.parentElement;
      if (containerParent) {
        containerParent.classList.add("ems-container-parent");
        this.addCSS(placement.container.cssClass, containerParent, dataContextName, viewModel);
        this.addStyle(placement.container.style, containerParent, dataContextName, viewModel);
      }
    }
    rootDiv.classList.add("ems-placement-item");
    rootDiv.id = "resultItem";
    this.addCSS(placement.cssClass, rootDiv, dataContextName, viewModel);
    this.addStyle(placement.style, rootDiv, dataContextName, viewModel);
    if (placement.icon) {
      this.addIcons(placement.icon, dataContextName, rootDiv, viewModel);
    }
    const divRowContainer = document.createElement("div");
    divRowContainer.classList.add("ems-row-container");
    rootDiv.appendChild(divRowContainer);
    placement.rows?.forEach((row) => {
      rowCounter++;
      const rowDiv = document.createElement("div");
      rowDiv.style.alignItems = row.alignItems || "space-between";
      rowDiv.classList.add("ems-row" + rowCounter);
      rowDiv.classList.add("ems-row");
      this.addCSS(row.cssClass, rowDiv, dataContextName, viewModel);
      this.addStyle(row.style, rowDiv, dataContextName, viewModel);
      row.fields?.forEach((field) => {
        this.addField(field, dataContextName, rowDiv, viewModel);
      });
      divRowContainer.appendChild(rowDiv);
    });
  }
  addField(field, dataContextName, rowDiv, viewModel) {
    const fieldDiv = document.createElement("div");
    fieldDiv.classList.add("ems-row-group");
    this.addCSS(field.cssClass, fieldDiv, dataContextName, viewModel);
    if (field.width)
      fieldDiv.style.width = `${field.width}px`;
    if (field.position)
      fieldDiv.style.textAlign = field.position;
    this.addStyle(field.style, fieldDiv, dataContextName, viewModel);
    if (field.label) {
      const labelElem = document.createElement("label");
      labelElem.textContent = field.label;
      labelElem.classList.add("ems-label");
      fieldDiv.appendChild(labelElem);
    }
    this.addIcons(field.icon, dataContextName, fieldDiv, viewModel);
    const spanElem = document.createElement("span");
    spanElem.classList.add("ems-field-value");
    if (field.field instanceof Array) {
      this.addFieldArray(field.field, field.formatter, spanElem, viewModel);
    }
    if (typeof field.field === "string") {
      this.setInnerHTML(field.field, field.formatter, viewModel, spanElem);
    }
    fieldDiv.appendChild(spanElem);
    rowDiv.appendChild(fieldDiv);
  }
  setInnerHTML(value, formatter, viewModel, element) {
    let valueToSet = extractValue(value, viewModel, formatter);
    element.innerHTML = valueToSet;
  }
  addIcons(icons, dataContextName, fieldDiv, viewModel) {
    if (!icons)
      return;
    if (typeof icons === "string") {
      icons = [{ icon: icons }];
    }
    icons.forEach((iconRule) => {
      const iconElem = document.createElement("span");
      iconElem.className = "fa card-icon " + iconRule.icon;
      iconElem.classList.add("ems-icon");
      if (iconRule.cssClass)
        iconElem.classList.add(iconRule.cssClass);
      if (typeof iconRule.style === "string")
        iconElem.setAttribute("style", iconRule.style);
      if (iconRule.rule) {
        console.log("iconRule.rule", iconRule.rule);
        let value = evaluteRule(iconRule.rule, viewModel);
        if (!value) {
          iconElem.style.display = "none";
        }
      }
      if (iconRule.position === "before") {
        fieldDiv.insertBefore(iconElem, fieldDiv.firstChild);
      }
      if (iconRule.position === "after") {
        fieldDiv.appendChild(iconElem);
      }
      if (!iconRule.position) {
        fieldDiv.appendChild(iconElem);
      }
    });
  }
  addCSS(cssClass, rootDiv, dataContextName, viewModel) {
    if (typeof cssClass === "string") {
      cssClass = [{ cssClass }];
    }
    if (cssClass instanceof Array) {
      let arrItem = cssClass;
      for (let i = 0; i < arrItem.length; i++) {
        let cssRule = arrItem[i];
        let cssValue = executeEmbeddedCode(cssRule.cssClass, viewModel);
        if (cssRule.rule) {
          let currentDataBind = rootDiv.getAttribute("data-bind") || "";
          if (currentDataBind) {
            currentDataBind += ",";
          }
          let rule = cssRule.rule;
          let value = evaluteRule(rule, viewModel);
          if (value) {
            rootDiv.classList.add(cssValue);
          }
        } else {
          rootDiv.classList.add(cssValue);
        }
      }
    }
  }
  addFieldArray(fields, formatter, fieldDiv, viewModel) {
    if (!fields)
      return;
    fields.forEach((field) => {
      if (field.rule) {
        console.log("fieldRule.rule", field.rule);
        let value = evaluteRule(field.rule, viewModel);
        if (value) {
          this.setInnerHTML(field.field, formatter, viewModel, fieldDiv);
        }
      } else {
        this.setInnerHTML(field.field, formatter, viewModel, fieldDiv);
      }
    });
  }
  addStyle(style, rootDiv, dataContextName, viewModel) {
    if (style == void 0)
      return;
    if (typeof style === "string") {
      style = [{ style }];
    }
    if (style instanceof Array) {
      let arrItem = style;
      for (let i = 0; i < arrItem.length; i++) {
        let styleRule = arrItem[i].rule;
        if (styleRule) {
          let currentDataBind = rootDiv.getAttribute("data-bind") || "";
          if (currentDataBind) {
            currentDataBind += ",";
          }
          let value = evaluteRule(styleRule, viewModel);
          if (value) {
            this.setStyles(style, viewModel, dataContextName, rootDiv);
          }
        } else {
          this.setStyles(style, viewModel, dataContextName, rootDiv);
        }
      }
    } else {
      this.setStyles(style, viewModel, dataContextName, rootDiv);
    }
  }
  setStyles(style, data, dataContextName, rootDiv) {
    let retValue = {};
    if (!style) {
      return "";
    }
    ;
    if (typeof style === "string") {
      let n = {
        style
      };
      return this.buildStyleNameValue(n, retValue);
    }
    if (Array.isArray(style)) {
      let arrItem = style;
      if (Array.isArray(arrItem)) {
        for (let i = 0; i < arrItem.length; i++) {
          let styleRuleOrNameValue = arrItem[i];
          if (styleRuleOrNameValue.rule) {
            if (evaluteRule(styleRuleOrNameValue.rule, data)) {
              if (!styleRuleOrNameValue.style)
                continue;
              retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
            }
          } else {
            retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
          }
        }
      }
      for (let i = 0; i < arrItem.length; i++) {
        let styleRuleOrNameValue = arrItem[i];
        if (styleRuleOrNameValue.rule) {
          if (evaluteRule(styleRuleOrNameValue.rule, data)) {
            if (!styleRuleOrNameValue.style)
              continue;
            retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
          }
        } else {
          retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
        }
      }
    } else {
      if (typeof style === "object") {
        retValue = style;
      }
    }
    for (let key in retValue) {
      if (retValue.hasOwnProperty(key)) {
        rootDiv.style[key] = retValue[key];
      }
    }
  }
  buildStyleNameValue(rule, retValue) {
    if (typeof rule.style === "object") {
      retValue = { ...retValue, ...rule.style };
    }
    if (typeof rule.style === "string") {
      let styleItems = rule.style.split(";");
      for (let i = 0; i < styleItems.length; i++) {
        let styleItem = styleItems[i];
        let nameValue = styleItem.split(":");
        if (nameValue.length == 2) {
          retValue[nameValue[0].trim()] = nameValue[1].trim();
        }
      }
    }
    return retValue;
  }
};

// src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts
var ko4 = __toESM(require_knockout_latest());

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-node/native.js
var import_crypto2 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto2.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/WebBased/Common/EventsHelper.ts
function fireEvent(event) {
  $ui.events.broadcast(event.eventPath, event);
}

// src/WebBased/IDEAspects/BaseClasses/KOConverter.ts
var ko3 = __toESM(require_knockout_latest());
function toObservableObject(obj, existing) {
  if (!existing)
    existing = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "__ko_mapping__" && key !== "_host") {
      const value = obj[key];
      if (Array.isArray(value)) {
        if (!existing[key]) {
          existing[key] = ko3.observableArray(value.map((item) => toObservableObject(item, {})));
        } else {
          existing[key](value.map((item) => toObservableObject(item, {})));
        }
      } else if (value !== null && typeof value === "object") {
        if (!existing[key]) {
          existing[key] = ko3.observable(toObservableObject(value, {}));
        } else {
          existing[key](toObservableObject(value, existing[key]()));
        }
      } else {
        if (!existing[key]) {
          existing[key] = ko3.observable(value);
        } else {
          existing[key](value);
        }
      }
    }
  }
  return existing;
}

// src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts
function executeFindByQuery(inputOption) {
  return executePost("/api/v1/public/workItem/findByQuery", inputOption).then((result) => {
    return result;
  });
}

// src/WebBased/Common/api/searchForAttributeWithParents.ts
async function searchForAttributeRecursive(workItemId, attributeName, parents, maxDepth) {
  let useMaxDepth = maxDepth ? true : false;
  if (maxDepth && maxDepth > 0) {
    useMaxDepth = true;
  }
  let retValue = { found: false, value: void 0, parentId: void 0, depth: 0, foundInWorkItemId: void 0, wasFoundInAncestor: false, foundInWorkTypeSystemName: void 0 };
  retValue = await searchForAttribute(workItemId, attributeName);
  if (retValue.found) {
    return retValue;
  }
  if (!parents) {
    console.log("No parents or children to search so only searching current work item");
    return retValue;
  }
  if (parents) {
    console.log("Searching parents");
    let depth = 0;
    let searchParent = async (parentId) => {
      depth++;
      let r = {
        found: false,
        value: void 0,
        parentId: void 0,
        depth,
        //depth here will be overriden if there is a parent
        foundInWorkItemId: void 0,
        wasFoundInAncestor: false,
        foundInWorkTypeSystemName: void 0
      };
      if (!parentId) {
        console.log("No parent found");
        return r;
      }
      r = await searchForAttribute(parentId, attributeName);
      r.depth = depth;
      if (r.found) {
        console.log("Found attribute in parent");
        r.wasFoundInAncestor = true;
        return r;
      } else {
        if (useMaxDepth && depth >= maxDepth) {
          console.log("Max depth reached");
          return r;
        }
        if (!r.parentId) {
          console.log("No parent found");
          return r;
        }
        console.log("Not found in parent");
        return searchParent(r.parentId);
      }
    };
    retValue = await searchParent(retValue.parentId);
  }
  return retValue;
}
async function searchForAttribute(workItemId, attributeName) {
  let retValue = {
    found: false,
    value: void 0,
    parentId: void 0,
    depth: 0,
    foundInWorkItemId: void 0,
    wasFoundInAncestor: false,
    foundInWorkTypeSystemName: void 0
  };
  let req = {
    "search": {
      "workItemIds": [
        workItemId
      ]
    },
    "enrich": [
      {
        "path": "title"
      },
      {
        "path": "parent.id"
      },
      {
        "path": "type.systemName"
      },
      {
        "path": "reference"
      },
      {
        "path": attributeName
      }
    ]
  };
  console.log("Searching using ShareDo Id: " + workItemId);
  let httpResultFindByQuery = await executeFindByQuery(req);
  if (!httpResultFindByQuery) {
    console.log("No result found");
    return retValue;
  }
  console.log(`Work item ${workItemId} found`);
  console.log(JSON.stringify(httpResultFindByQuery.results));
  let typeSystemName = httpResultFindByQuery.results[0].data["type.systemName"];
  let parentId = httpResultFindByQuery.results[0].data["parent.id"];
  let attribute = httpResultFindByQuery.results[0].data[attributeName];
  console.log(`Type system name is ${typeSystemName}`);
  console.log(`Parent Id is ${parentId}`);
  console.log(`Attribute [${attributeName}] is ${attribute}`);
  retValue.value = attribute;
  if (attribute) {
    retValue.found = true;
    retValue.foundInWorkItemId = workItemId;
    retValue.foundInWorkTypeSystemName = typeSystemName;
  }
  retValue.parentId = parentId;
  return retValue;
}

// src/Common/Debound.ts
var timer;
function debounceFunction(func, wait) {
  return function executedFunction() {
    const later = () => {
      clearTimeout(timer);
      func();
    };
    clearTimeout(timer);
    timer = window.setTimeout(later, wait);
  };
}

// src/Interfaces/api/graph/IGraphQuery.ts
var IGraphQueryDfaults = {
  "fields": [
    {
      "path": "workitem.title"
    },
    {
      "path": "workitem.id"
    }
  ],
  "debug": false,
  "allowParallelExecution": true,
  "executeCalculatedFields": true,
  "responseType": "flat",
  "entityType": void 0,
  "entityId": ""
};

// src/WebBased/Common/api/executeFindByGraph/executeFindByGraph.ts
function executeFindByGraph(inputOption) {
  return executePostv2("/api/graph/workitem/query", inputOption);
}

// src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts
var import_detect_browser = __toESM(require_detect_browser());
console.log("v: - 3.29");
var ERROR_DIV_SELECTOR = "#render-errors-here";
var BaseIDEAspect = class {
  constructor(...arr) {
    this.widgetSettings = this.setWidgetJsonSettings();
    this.thisComponentName = this.setThisComponentName();
    this.defaults = this.setDefaults();
    this.disposables = [];
    this.refreshLog = new Array();
    this.errorDivSelector = ERROR_DIV_SELECTOR;
    this.errors = ko4.observableArray();
    if (arr.length === 0) {
      return;
    }
    if (arr.length === 3) {
      this.uniqueId = v4_default();
      this._initialise(arr[0], arr[1], arr[2]);
      this.fireEvent("onSetup", this.model);
      this.setup();
      this.fireEvent("afterSetup", this.model);
      this.setupLiveConfig();
      this.setupEventWatcher();
      this.setupErrorManager();
      this.addAspectLogOutput();
      return;
    }
  }
  _initialise(element, polutedConfiguration, baseModel) {
    this.sharedoConfiguration = polutedConfiguration;
    this.element = element;
    this.originalConfiguration = polutedConfiguration;
    this.baseModel = baseModel;
    if (!this.sharedoConfiguration.configuration) {
      console.error(
        "No configuration found in the sharedoConfiguration - check the aspect or widget config that ther eis a base configuration of configuration:{}"
      );
      throw new Error("No configuration found in the sharedoConfiguration");
    }
    this.sharedoConfiguration.configuration = $.extend(
      DEFAULT_CONFIGURATION_SETTINGS,
      this.sharedoConfiguration.configuration
    );
    this.sharedoConfiguration.configuration = $.extend(
      this.defaults,
      this.originalConfiguration.configuration
    );
    this.model = this.sharedoConfiguration._host?.model;
    this.blade = this.sharedoConfiguration._host?.blade;
    this.loaded = this.loaded || ko4.observable(false);
    this.sharedoId = this.sharedoConfiguration._host?.model.id || $ui.pageContext?.sharedoId || ko4.observable(void 0);
    if (!this.sharedoId || this.sharedoId()) {
      this.log("No sharedoId found");
    }
    this.sharedoTypeSystemName = this.sharedoConfiguration._host?.model?.sharedoTypeSystemName || $ui.pageContext?.sharedoTypeName || ko4.observable(void 0);
    if (!this.sharedoTypeSystemName || !this.sharedoTypeSystemName()) {
      this.log("No sharedoTypeSystemName found");
    }
    this.parentSharedoId = this.sharedoConfiguration._host?.model?.parentSharedoId || ko4.observable(void 0);
    this.phaseName = this.sharedoConfiguration._host?.model?.phaseName || $ui.pageContext?.phaseName || ko4.observable(void 0);
    this.phaseIsOpen = this.sharedoConfiguration._host?.model?.phaseIsOpen || $ui.pageContext?.phaseIsOpen || ko4.observable(void 0);
    this.validation = {};
    this.validationErrorCount = this.validationErrorCount || ko4.observable(0);
    this.applyComponentConfiguration(this.sharedoConfiguration.configuration);
    this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
    this.fireEvent("onInitialise", this.model);
  }
  applyComponentConfiguration(configuration) {
    let configurationAsObservables = toObservableObject(
      configuration,
      this.options
    );
    this.configuration = configuration;
    this.options = configurationAsObservables;
    this._options = configurationAsObservables;
  }
  clearErrors() {
    this.errors?.removeAll();
  }
  setupErrorManager() {
    this.l("Setting up error manager");
    this.errors?.subscribe((newValue) => {
      this.inf("Errors changed", newValue);
      this.buildErrorDiv();
    });
  }
  setupLiveConfig() {
    this._options?.debug.subscribe((newValue) => {
      if (newValue.liveConfig) {
        this.activateLiveConfig(newValue.liveConfig);
      }
    });
    this.activateLiveConfig(this._options?.debug().liveConfig());
  }
  activateLiveConfig(active) {
    if (!active) {
      this.liveConfigDiv?.remove();
      return;
    }
    if (this.liveConfigDiv) {
      return;
    }
    this.l("Setting up live config");
    const serializedData = JSON.stringify(
      this.sharedoConfiguration,
      (key, value) => {
        if (key === "_host") {
          return void 0;
        }
        return value;
      },
      4
    );
    let config = ko4.observable(serializedData);
    this.liveConfigData = {
      config
    };
    let timeout = false;
    this.liveConfigDiv = this.createLiveConfigDiv();
    this.element.prepend(this.liveConfigDiv);
    let applyChange = () => {
      this.applyComponentConfiguration(JSON.parse(config()).configuration);
      this.liveConfigurationRefreshed();
      this.buildErrorDiv();
    };
    setTimeout(() => {
      config.subscribe((newValue) => {
        const debouncedApplyChange = debounceFunction(applyChange, 3e3);
        debouncedApplyChange();
      });
    }, 3e3);
  }
  ensureStylesLoaded(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.href = href;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);
    }
  }
  createLiveConfigDiv() {
    const outerDiv = document.createElement("div");
    outerDiv.className = "col-sm-12 formbuilder-editor-json";
    const innerDiv = document.createElement("div");
    innerDiv.id = "liveConfig";
    innerDiv.className = "form-control textarea";
    innerDiv.style.height = "300px";
    innerDiv.setAttribute("data-bind", "syntaxEditor: liveConfigData.config");
    outerDiv.appendChild(innerDiv);
    return outerDiv;
  }
  setupEventWatcher() {
    this._options?.eventsToReactTo()?.forEach((eventToWatch) => {
      console.log("Subscribing to event", eventToWatch);
      this.disposables.push(
        $ui.events.subscribe(
          eventToWatch.eventPath(),
          (e) => {
            this.refreshComponent(
              eventToWatch.eventPath(),
              eventToWatch.methodToCall()
            );
          },
          this
        )
      );
    });
    let refreshOn = ko4.toJS(this._options?.refreshOn());
    if (refreshOn) {
      if (refreshOn.sharedoIdChanged) {
        this.disposables.push(
          this.sharedoId.subscribe((newValue) => {
            this.refreshComponent("sharedoIdChanged", "refresh");
          })
        );
      }
      if (refreshOn.sharedoParentIdChanged) {
        this.disposables.push(
          this.parentSharedoId.subscribe((newValue) => {
            this.refreshComponent("sharedoParentIdChanged", "refresh");
          })
        );
      }
      if (refreshOn.sharedoPhaseChanged) {
        this.disposables.push(
          this.phaseName.subscribe((newValue) => {
            this.refreshComponent("sharedoPhaseChanged", "refresh");
          })
        );
      }
    }
  }
  refreshComponent(eventPath, methodToCall) {
    this.refreshLog = this.refreshLog || [];
    if (this.lastRefresh) {
      let secondsSinceLastRefresh = ((/* @__PURE__ */ new Date()).getTime() - this.lastRefresh.getTime()) / 100;
      console.log("Seconds since last refresh", secondsSinceLastRefresh);
      if (secondsSinceLastRefresh < 10) {
        console.log("Skipping refresh, too soon");
        return;
      }
    }
    this.lastRefresh = /* @__PURE__ */ new Date();
    console.log("Refreshing component");
    let logItem = {
      eventPath,
      methodToCall,
      time: /* @__PURE__ */ new Date(),
      success: false
    };
    try {
      if (methodToCall) {
        console.log("Executing method", methodToCall);
        let componentToRefresh = this;
        if (!componentToRefresh[methodToCall]) {
          console.log(
            `Method not found on component ${this.thisComponentName}`,
            methodToCall
          );
        }
        {
          componentToRefresh[methodToCall]();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      logItem.success = true;
      this.refreshLog.push(logItem);
    }
  }
  buildErrorDiv() {
    this.inf("Building error div");
    let errorDiv = this.element.querySelector(this.errorDivSelector);
    if (!errorDiv) {
      return;
    }
    l("errorDiv.innerHTML");
    errorDiv.innerHTML = "";
    if (!this.errors) {
      this.errors = ko4.observableArray();
    }
    if (this.errors().length === 0) {
      return;
    }
    let errorContainerDiv = document.createElement("div");
    errorDiv.appendChild(errorContainerDiv);
    errorContainerDiv.className = "ide-aspect-error-container";
    let titleDiv = document.createElement("div");
    titleDiv.className = "ide-aspect-error-title";
    titleDiv.innerText = "There has been an error:";
    errorContainerDiv.appendChild(titleDiv);
    let foreachDiv = document.createElement("div");
    errorContainerDiv.appendChild(foreachDiv);
    for (let i = 0; i < this.errors().length; i++) {
      let error = this.errors()[i];
      this.addErrorTrapping(error);
      foreachDiv.appendChild(this.buildIndividualError(error));
    }
  }
  buildIndividualError(error) {
    let templateApplicator = new TemplateApplicator();
    let dataContext = this.getDataContext([{ obj: error, key: "error" }]);
    let linkedTrappedError = error.linkedTrappedError;
    let individualErrorDiv = document.createElement("div");
    individualErrorDiv.className = "ide-aspect-error-individual-error";
    if (linkedTrappedError) {
      templateApplicator.addCSS(
        linkedTrappedError.classRules,
        individualErrorDiv,
        "dataContext",
        dataContext
      );
      templateApplicator.addStyle(
        linkedTrappedError.styleRules,
        individualErrorDiv,
        "dataContext",
        dataContext
      );
    }
    let userMessageDiv = document.createElement("div");
    userMessageDiv.className = "ide-aspect-error-user-message";
    let suggestionsDiv;
    let supportButtonDiv;
    let actionsDiv;
    let internalSuggestionsDiv;
    userMessageDiv.innerHTML = linkedTrappedError?.userFreindlyMessage || error.userMessage || error.message || "Unknown error";
    if (linkedTrappedError?.userFreindlyHTMLMessageTemplate) {
      let userFreindlyMessage = executeEmbeddedCode(
        linkedTrappedError.userFreindlyHTMLMessageTemplate,
        dataContext
      );
      userMessageDiv.innerHTML = userFreindlyMessage;
      suggestionsDiv = userMessageDiv.querySelector(".ide-aspect-error-suggestions") || suggestionsDiv;
      actionsDiv = userMessageDiv.querySelector(".ide-aspect-error-actions") || actionsDiv;
      internalSuggestionsDiv = userMessageDiv.querySelector(
        ".ide-aspect-error-internal-suggestions"
      ) || internalSuggestionsDiv;
    }
    individualErrorDiv.appendChild(userMessageDiv);
    {
      if (!suggestionsDiv) {
        suggestionsDiv = document.createElement("div");
        individualErrorDiv.appendChild(suggestionsDiv);
      }
      if (!actionsDiv) {
        actionsDiv = document.createElement("div");
        individualErrorDiv.appendChild(actionsDiv);
      }
      if (!internalSuggestionsDiv) {
        internalSuggestionsDiv = document.createElement("div");
        individualErrorDiv.appendChild(internalSuggestionsDiv);
      }
      if (!supportButtonDiv) {
        supportButtonDiv = document.createElement("div");
        individualErrorDiv.appendChild(supportButtonDiv);
      }
    }
    let resolutionSuggestions = linkedTrappedError?.resolutionSuggestions || error.internalSuggestions || [];
    if (resolutionSuggestions.length > 0) {
      suggestionsDiv.className = "ide-aspect-error-suggestions";
      suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${resolutionSuggestions.join(
        "<br/>"
      )}`;
    }
    let actions = error.sharedoErrorActions || [];
    if (actions.length > 0) {
      actionsDiv.innerHTML = `<b>Actions:</b><br/>${actions.join("<br/>")}`;
    }
    let internalSuggestions = error.internalSuggestions || [];
    if (internalSuggestions.length > 0) {
      internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${internalSuggestions.join(
        "<br/>"
      )}`;
    }
    let supportButton = linkedTrappedError?.supportButton || this.configuration?.errorManagement?.unTrappedErrorsSupportButton;
    if (supportButton) {
      let actionDiv = document.createElement("div");
      actionDiv.className = "ide-aspect-error-support-action";
      individualErrorDiv.appendChild(actionDiv);
      let button = document.createElement("button");
      button.className = "btn btn-primary";
      button.onclick = () => {
        this.createOpenPanel(supportButton, dataContext);
      };
      templateApplicator.addCSS(
        supportButton.classRules,
        actionDiv,
        "dataContext",
        dataContext
      );
      templateApplicator.addStyle(
        supportButton.styleRules,
        actionDiv,
        "dataContext",
        dataContext
      );
      button.innerText = supportButton.title;
      actionDiv.appendChild(button);
    }
    return individualErrorDiv;
  }
  createOpenPanel(supportButton, dataContext) {
    if (!supportButton) {
      return;
    }
    let buttonConfig = supportButton.raiseSupportTicketSharedoCommand;
    let supportTicketMessage = buttonConfig.description || supportButton.supportTicketMessage || "";
    let config = {
      title: executeEmbeddedCode(buttonConfig.title, dataContext),
      typeSystemName: executeEmbeddedCode(buttonConfig.typeSystemName, dataContext),
      description: executeEmbeddedCode(supportTicketMessage, dataContext)
    };
    $ui.nav.invoke({
      invokeType: "panel",
      invoke: "Sharedo.Core.Case.Sharedo.AddEditSharedo",
      config
    });
  }
  addErrorTrapping(error) {
    let errorTrapped = false;
    let errorTraps = this.configuration?.errorManagement?.errorTraps || [];
    for (let errorTrapsIndex = 0; errorTrapsIndex < errorTraps.length; errorTrapsIndex++) {
      let trap = errorTraps[errorTrapsIndex];
      if (trap.enabled === false) {
        continue;
      }
      try {
        let dataContext = this.getDataContext([{ obj: error, key: "error" }]);
        l(
          `Evaluating rule [${trap.rule}] on error ${error} with dataContext:`,
          dataContext
        );
        let ruleResult = evaluteRule(trap.rule, dataContext);
        if (ruleResult) {
          errorTrapped = true;
          error.linkedTrappedError = trap;
          break;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  getDataContext(additional) {
    const browser = (0, import_detect_browser.detect)();
    let dataContext = {
      thisComponentName: this.thisComponentName,
      user: ko4.toJS($ui.pageContext?.user),
      pageContext: ko4.toJS($ui.pageContext),
      aspectData: ko4.toJS(this.baseModel),
      configuration: ko4.toJS(this._options),
      browser
    };
    let additionalData = additional || [];
    for (let i = 0; i < additionalData.length; i++) {
      let item = additionalData[i];
      dataContext[item.key] = item.obj;
    }
    return dataContext;
  }
  // abstract setDependantScriptFiles(): string[];
  // abstract setDependantStyleFiles(): string[];
  // abstract setDependantTemplateFiles(): string[];
  // abstract setDependantMenuTemplateFiles(): string[];
  // abstract setDependantComponentFiles(): string[];
  // abstract setWidgetDesignerSettings(): IWidgetJsonDesigner;
  // abstract setPriority() : number;
  /**
   * Called by the aspect IDE adapter when the model is saved. Manipulate the
   * model as required.
   */
  onSave(model) {
    this.fireEvent("onSave", model);
    let dataToSave = this._data;
    this.log(
      "Saving, model passed in we need to persist to",
      "green",
      dataToSave
    );
    if (this.LocationToSaveOrLoadData === void 0) {
      this.log(
        "No location to save data to set - this method should be overriden",
        "red"
      );
      return;
    }
    let dataToPersist = this._data;
    let currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
    if (currentData) {
      this.log(
        `Current data at location ${this.LocationToSaveOrLoadData} :`,
        "magenta",
        currentData
      );
    }
    if (!currentData) {
    }
    this.log(
      `New data to persist to location ${this.LocationToSaveOrLoadData} :`,
      "blue",
      dataToPersist
    );
    setNestedProperty(model, this.LocationToSaveOrLoadData, dataToPersist);
    this.l("Data saved", model);
  }
  /**
   * Gets the data to load, defaults to LocationToSaveOrLoadData unless a fieldPath is passed in
   * @param fieldPath
   * @returns
   */
  async getData(fieldPath) {
    if (this._data) {
      return this._data;
    }
    fieldPath = fieldPath || this.LocationToSaveOrLoadData;
    let useParents = this._options?.dataSettings().getValueUsingParents();
    let shareDoId = this.sharedoId();
    let maxDepth = this._options?.dataSettings().maxDepth();
    if (fieldPath === void 0) {
      this.log(
        "No location to load data from set - this method should be overriden",
        "red"
      );
      return this._data;
    }
    this._data = getNestedProperty(this.model, fieldPath);
    if (this._data !== void 0) {
      this.l("Data found at location", this._data);
      this._data = ko4.toJS(this._data);
      return this._data;
    }
    if (this._data === void 0 && useParents === false && shareDoId) {
      return searchForAttributeRecursive(shareDoId, fieldPath, false).then(
        (data) => {
          if (data.found) {
            this._data = data.value;
          }
          return this._data;
        }
      );
    }
    if (this._data === void 0 && useParents === true) {
      let idToUser = this.sharedoId() || this.parentSharedoId();
      if (!idToUser) {
        this.log(
          "No id to use for search both sharedoId and parentSharedoId are undefined"
        );
        return this._data;
      }
      return searchForAttributeRecursive(
        idToUser,
        fieldPath,
        useParents,
        maxDepth
      ).then((data) => {
        if (data.found) {
          this._data = data.value;
        }
        return this._data;
      });
    }
  }
  searchForAttributeRecursive(id, attribute, useParents, maxDepth) {
    return searchForAttributeRecursive(id, attribute, useParents, maxDepth);
  }
  async searchByGraph(fieldPath, useParent = false) {
    let inputOption = IGraphQueryDfaults;
    let shareDoId = this.sharedoId();
    let parentId = this.parentSharedoId();
    let query = {
      path: fieldPath
    };
    inputOption.fields.push(query);
    if (useParent === false && shareDoId) {
      inputOption.entityId = shareDoId;
    } else if (useParent === true && parentId) {
      inputOption.entityId = parentId;
    }
    if (!inputOption.entityId) {
      this.log(
        "No id to use for search both sharedoId and parentSharedoId are undefined"
      );
      return;
    }
    let result = await executeFindByGraph(inputOption);
    if (result.info.success === false) {
      this.log("Error executing search", "red", result.info);
      return;
    }
    return result.data?.data[fieldPath];
  }
  setData(value) {
    let valueToPersist = ko4.toJS(value);
    let previousValue = ko4.toJS(this._data);
    this._data = valueToPersist;
    this.fireValueChangedEvent("onDataBeforeChanged", {
      previousValue,
      newValue: valueToPersist
    });
    if (this.LocationToSaveOrLoadData === void 0) {
      return;
    }
    let valueToSet = value;
    this.log("Setting data at location", "green", valueToSet);
    setNestedProperty(this.model, this.LocationToSaveOrLoadData, this._data);
    this.fireEvent("onDataChanged", this.model);
  }
  onDestroy(model) {
    this.log("IDEAspects.Example : onDestroy");
    this.fireEvent("onDestroy", model);
    $ui.util.dispose(this.disposables);
  }
  /**
   * Called by the UI framework after initial creation and binding to load data
   * into it's model
   */
  loadAndBind() {
    this.log("IDEAspects.Example : loadAndBind");
    this.log("Loading data (model:any) passed in", "green");
    this.log(
      "Loading data based on location to save",
      "green",
      this.LocationToSaveOrLoadData
    );
    this.fireEvent("onLoad", this.model);
  }
  /**
   * Called by the aspect IDE adapter before the model is saved
   */
  onBeforeSave(model) {
    this.log("IDEAspects.Example : onBeforeSave");
    this.fireEvent("onBeforeSave", model);
  }
  /**
   * Called by the aspect IDE adapter after the model has been saved.
   */
  onAfterSave(model) {
    this.log("IDEAspects.Example : onAfterSave");
    this.fireEvent("onAfterSave", model);
  }
  /**
   * Called by the aspect IDE adapter when it reloads aspect data
   */
  onReload(model) {
    this.log("IDEAspects.Example : onReload");
    this.fireEvent("onReload", model);
  }
  debugSettings() {
    let debugSetting = DEBUG_DEFAULT();
    if (this._options?.debug()) {
      debugSetting = ko4.toJS(this._options?.debug());
    }
    return debugSetting;
  }
  /**
   * Provides logging for the component based on the debug configuration
   * @param message
   * @param color
   * @param data
   */
  log(message, color, data) {
    if (this.debugSettings().enabled) {
      if (this.debugSettings().logToConsole) {
        if (!color)
          color = "black";
        console.log(
          `%c ${this.thisComponentName} - ${message}`,
          `color:${color}`,
          data
        );
      }
    }
  }
  canLog() {
    return this.debugSettings().enabled;
  }
  logToConsole() {
    return this.canLog() && this.debugSettings().logToConsole;
  }
  logToAspect() {
    return this.canLog() && this.debugSettings().showInAspect;
  }
  inf(message, ...args) {
    if (this.logToConsole()) {
      l(inf(message), ...args);
    }
  }
  wrn(message, ...args) {
    if (this.logToConsole()) {
      l(wrn(message), ...args);
    }
  }
  err(message, ...args) {
    if (this.logToConsole()) {
      l(err(message), ...args);
    }
  }
  nv(name, value) {
    if (this.logToConsole()) {
      l(nv(name, value));
    }
  }
  lh1(message, ...args) {
    if (this.logToConsole()) {
      l(lh1(message), ...args);
    }
  }
  clearSec() {
    clearSec();
  }
  l(message, ...args) {
    if (this.logToConsole()) {
      l(message, ...args);
    }
    if (this.logToAspect()) {
      let aspectLogOutput = this.aspectLogOutput;
      if (aspectLogOutput) {
        aspectLogOutput.innerText += `${message}
`;
      }
    }
  }
  addAspectLogOutput() {
    if (!this.logToAspect()) {
      return;
    }
    this.aspectLogOutput = document.createElement("div");
    let aspectLogOutput = this.aspectLogOutput;
    aspectLogOutput.id = `aspectLogOutput-${this.uniqueId}`;
    aspectLogOutput.style.border = "1px solid black";
    aspectLogOutput.style.padding = "5px";
    aspectLogOutput.style.margin = "5px";
    aspectLogOutput.style.height = "200px";
    aspectLogOutput.style.overflow = "auto";
    aspectLogOutput.style.backgroundColor = "white";
    aspectLogOutput.style.color = "black";
    aspectLogOutput.style.fontSize = "10px";
    aspectLogOutput.style.fontFamily = "monospace";
    aspectLogOutput.style.whiteSpace = "pre-wrap";
    aspectLogOutput.style.wordWrap = "break-word";
    aspectLogOutput.style.display = "none";
    aspectLogOutput.style.position = "relative";
    aspectLogOutput.style.zIndex = "1000";
    aspectLogOutput.style.bottom = "0px";
    aspectLogOutput.style.left = "0px";
    aspectLogOutput.style.right = "0px";
    aspectLogOutput.style.marginLeft = "auto";
    aspectLogOutput.style.marginRight = "auto";
    aspectLogOutput.style.marginBottom = "auto";
    aspectLogOutput.style.marginTop = "auto";
    aspectLogOutput.style.backgroundColor = "rgba(255,255,255,0.8)";
    aspectLogOutput.style.borderRadius = "5px";
    aspectLogOutput.style.padding = "5px";
    aspectLogOutput.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.75)";
    this.element.prepend(aspectLogOutput);
  }
  fireEvent(eventName, data) {
    let event = {
      eventPath: this.thisComponentName + "." + eventName,
      eventName,
      source: this,
      data
    };
    fireEvent(event);
  }
  fireValueChangedEvent(eventName, changedData) {
    let event = {
      eventPath: this.thisComponentName + "." + eventName,
      eventName,
      source: this,
      data: changedData
    };
    fireEvent(event);
  }
  /**
   *
   * @returns Formbuild if it exists or creates it if it does not
   *
   */
  formbuilder() {
    if (!this.blade?.model?.aspectData?.formBuilder?.formData) {
      this.log(
        "blade.model.aspectData.formBuilder.formData not found - will create the path",
        "blue"
      );
    } else {
      this.log("blade.model.aspectData.formBuilder.formData found", "green");
    }
    if (!this.blade) {
      return void 0;
    }
    this.blade = this.blade || {};
    return this.ensureFormbuilder(this.blade.model);
  }
  /**
   * Ensures there is a form builder in the passed in model and returns it
   * @param model
   * @returns
   */
  ensureFormbuilder(model) {
    if (!model?.aspectData?.formBuilder?.formData) {
      this.log(
        "blade.model.aspectData.formBuilder.formData not found - will create the path",
        "blue"
      );
    } else {
      this.log("blade.model.aspectData.formBuilder.formData found", "green");
    }
    model = model || {};
    model.aspectData = model.aspectData || {};
    model.aspectData.formBuilder = model.aspectData.formBuilder || {
      formData: {}
    };
    return model.aspectData.formBuilder.formData;
  }
  formbuilderField(formbuilderField, setValue) {
    if (!this.formbuilder()) {
      this.log("Form builder does not exist! ", "red");
      throw new Error("Form builder does not exist!");
    }
    let formBuilder = this.formbuilder();
    if (!formBuilder) {
      return;
    }
    let foundValue = formBuilder[formbuilderField];
    if (!foundValue) {
      this.log(
        `Form builder does not contain field ${formbuilderField} `,
        "orange"
      );
      this.log(`Creating field ${formbuilderField} `, "blue");
      formBuilder[formbuilderField] = void 0;
    }
    if (setValue) {
      this.log(`Setting ${formbuilderField} to ${setValue}`, "green");
      formBuilder[formbuilderField] = setValue;
      return setValue;
    }
    return foundValue;
  }
};

// src/helpers/Serialization.ts
function serializeObjectToBase64(obj) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}
function deserializeObjectFromBase64(base64) {
  return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
}

// src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearch.ts
var CSS_CLASS_SELECTED_ITEM = "ems-selected-item";
var CUSTOM_TEMPLATE_CONTENT_ID = "resultItem";
var SEARCH_TERM = "searchTerm";
var SEARCH_STATUS_ID = "searchStatus";
var ExternalMatterSearch = class extends BaseIDEAspect {
  // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind
  /**
   * @method setup
   * @description Sets up the auto complete handler
   * @returns {void}
   */
  setup() {
    this.selectedMatter = this.selectedMatter || import_knockout2.default.observable(void 0);
    if (!validateJSON(this.configuration, ConfigSchema_exports)) {
      this.wrn("SearchFields does not match schema");
    }
    this.inputVisability = this.inputVisability || import_knockout2.default.computed(() => {
      return this.getInputVisability();
    });
    this.validateFormbuilderJSONFieldSetup();
    if (!gvko(this.options?.searchFields) || !gvko(this.options?.searchFields).rows) {
      this.err("No searchFields defined");
      throw new Error("No searchFields defined");
    }
    if (!gvko(this.options?.selectedFields) || !gvko(this.options?.selectedFields).rows) {
      this.wrn("No selectedFields defined, using searchFields as selectedFields");
      this.options?.selectedFields(this.options?.searchFields());
    }
    this.ensureSearchTemplate();
    this.selectedDiv = this.selectedDiv || this.element.querySelector(`.${CSS_CLASS_SELECTED_ITEM}`);
    if (!this.selectedDiv) {
      this.err(`Could not find element with class '${CSS_CLASS_SELECTED_ITEM}'`);
      throw new Error(`Could not find element with class '${CSS_CLASS_SELECTED_ITEM}'`);
    }
    this.autoComplete = this.autoComplete || this.setupAutoComplete();
    this.selectedMatter.subscribe((newValue) => {
      this.ensureSelectedMatterTemplate();
      this.updateFields();
    });
    this.selectedFieldsSubscription = this.selectedFieldsSubscription || this.options?.selectedFields.subscribe((newValue) => {
      this.ensureSelectedMatterTemplate();
    });
    this.title = import_knockout2.default.computed(() => {
      let title = executeEmbeddedCode(this.options?.title(), this);
      return title;
    });
  }
  setupAutoComplete() {
    return new Sharedo.UI.Framework.Components.AutoCompleteHandler(
      {
        enabled: true,
        mode: "select" /* SELECT */,
        text: {
          placeholder: "Search for matter",
          empty: "Start typing to lookup a matter by number",
          emptyIcon: "fa-search",
          typing: "Will search when you stop typing",
          searching: "One moment...",
          noResults: "Nothing found"
        },
        select: {
          allowClear: true,
          selectedValue: null,
          onLoad: this.loadSelectedExternalResult.bind(this)
        },
        onFind: this.querySearchAPI.bind(this),
        templates: { result: this.searchTemplateToUseName }
      }
    );
  }
  liveConfigurationRefreshed() {
    this.ensureSelectedMatterTemplate();
    this.updateFields();
  }
  validateFormbuilderJSONFieldSetup() {
    if (!this.options?.formBuilderFieldSerialisedData()) {
      this.wrn("No formBuilderFieldSerialisedData defined - this will prevent the matter from being saved and loaded");
      this.wrn("Add a field to the form builder and set the formBuilderFieldSerialisedData to the field name in the configuration of the aspect");
    }
  }
  /**
   * @method load
   * @description Initial loads the data from the sharedo model form builder
   * @param {IExternalResultItem} model - The model to load from
   * @returns {void}
   */
  async load(model) {
    this.inf("Loading Data", this.model);
    if (this.options?.formBuilderFieldSerialisedData()) {
      let data = await this.getData();
      if (data) {
        let base64Decoded = deserializeObjectFromBase64(data);
        this.selectedMatter(base64Decoded);
      }
    }
  }
  /**
   * After the user clicks a search result, this method is called to load the matter details
   * If the configuration has a loadApiUrl defined, then this will be used to load the matter details
   * If the configuration does not have a loadApiUrl defined, then the matter details will be loaded from the search results
   * @param model 
   * @returns 
   */
  async loadSelectedExternalResult(model) {
    try {
      if (this.searchStatusDiv) {
        this.searchStatusDiv.classList.remove("show");
      }
      $ui.stacks.lock(self, "Loading");
      if (!this.options?.loadApiUrl()) {
        this.log(inf("No Load API URL defined, using search results"));
        this.selectedMatter(model);
        $ui.stacks.unlock(self);
      } else {
        model = await this.loadMatterDetailsFromLoadAPI(model);
        this.selectedMatter(model);
        $ui.stacks.unlock(self);
      }
      let textValue = this.options?.selectedFieldDisplayValue();
      if (!textValue) {
        textValue = "{matterCode} - {shortName}";
      }
      textValue = executeEmbeddedCode(textValue, model);
      return new Sharedo.UI.Framework.Components.AutoCompleteDisplayCard({
        id: model,
        icon: null,
        text: textValue
      });
    } catch (e) {
      $ui.stacks.unlock(self);
      this.err("Error loading matter details", e);
    }
  }
  ensureSearchTemplate() {
    let applicator = new TemplateApplicator();
    this.customTemplateContentId = CUSTOM_TEMPLATE_CONTENT_ID;
    this.searchCustomTemplateId = "__custom_matter_search_item_template";
    this.searchCustomTemplateDiv = this.element.querySelector("#" + this.searchCustomTemplateId);
    if (this.searchCustomTemplateDiv) {
      const content = this.searchCustomTemplateDiv.content;
      this.searchCustomTemplateContentsDiv = content.querySelector("#" + this.customTemplateContentId);
      if (this.searchCustomTemplateContentsDiv) {
        if (this.searchTemplateGeneratedDiv) {
          this.searchTemplateGeneratedDiv.remove();
        }
        let unwrap = import_knockout2.default.toJS(this.options?.searchFields());
        if (!unwrap) {
          this.err("No searchFields defined");
          throw new Error("No searchFields defined");
        }
        this.searchTemplateGeneratedDiv = generateHtmlDiv(unwrap, "data", this.searchCustomTemplateContentsDiv, applicator);
        this.searchTemplateToUseName = this.searchCustomTemplateId;
      }
    }
  }
  // setDynamic(setType:string,dataContext: IFieldRowField, field: string, dataContextName: string) {
  //     //setType: text or style or visability or value 
  //     //dataContext: { data:{ matterCode: "1234"}}
  //     //field: matterCode
  //     //dataContextName: "data" or "dataContext"
  //     this.lh1("setDynamic")
  //     this.l("setType:", setType)
  //     this.l("dataContext:", dataContext)
  //     this.l("field:", field)
  //     this.l("dataContextName:", dataContextName)
  //     if (!dataContext) {
  //         this.err("No value passed to formatFunc", dataContextName)
  //         this.errors?.push({
  //             code: "CONFIG_ERROR",
  //             message: "No value passed to formatFunc",
  //             userMessage: "No value passed to formatFunc, contact a system administrator.",
  //             additionalInfo: {
  //                 "Trying to apply type ": setType,
  //                 "To this field ": field,
  //                 "On this object ": dataContext,
  //                 "Using this key ": dataContextName,
  //             }
  //         })
  //         return;
  //     }
  //     if (!field) {
  //         return "";
  //     }
  //     let retValue = field //replaceValues(`${field}`, object);
  //     // if (formatter && formatter !== "undefined") {
  //     retValue = executeFunc(retValue, dataContext)
  //     // }
  //     // if (formatter && formatter !== "undefined") {
  //     //     retValue = formatFunc(retValue, formatter)
  //     // }
  //     return retValue;
  // };
  ensureSelectedMatterTemplate() {
    if (!this.selectedDiv) {
      this.err("No selectedDiv defined");
      return;
    }
    this.selectedDiv.innerHTML = "";
    if (this.selectedMatter && this.selectedMatter() === void 0) {
      this.selectedDiv.classList.remove("ems-show");
      return;
    }
    this.selectedDiv.classList.add("ems-show");
    this.lh1("ensureSelectedMatterTemplate");
    if (this.selectedTemplateGeneratedDiv) {
      import_knockout2.default.cleanNode(this.selectedTemplateGeneratedDiv);
      this.selectedTemplateGeneratedDiv.remove();
    }
    if (!this.options?.selectedFields()) {
      this.err("No searchIFieldPlacement defined");
      throw new Error("No searchIFieldPlacement defined");
    }
    let applicator = new TemplateApplicator();
    this.selectedTemplateGeneratedDiv = generateHtmlDiv(import_knockout2.default.toJS(this.options?.selectedFields()), "selectedMatter()", this.selectedDiv, applicator);
    if (this.selectedMatter && this.selectedMatter()) {
      let data = { data: this.selectedMatter() };
      import_knockout2.default.applyBindings(data, this.selectedTemplateGeneratedDiv);
    }
    this.clearSec();
  }
  async updateFields() {
    if (!this.options?.fieldMapping || !this.options?.fieldMapping()) {
      return;
    }
    this.options?.fieldMapping()?.forEach((mapping) => {
      let searchResultField = gvko(mapping.searchResultField);
      let formBuilderField = gvko(mapping.formBuilderField);
      let data = { data: this.selectedMatter() };
      let value = executeEmbeddedCode(searchResultField, data, void 0);
      this.updateFieldValue(formBuilderField, value);
    });
  }
  async updateFieldValue(fieldName, value) {
    let divElement = document.querySelector(`div[data-alpaca-container-item-name="${fieldName}"]`);
    if (!divElement) {
      this.err(`Could not find element with data-alpaca-container-item-name='${fieldName}'`);
      return;
    }
    try {
      let alp = $(divElement).alpaca();
      if (alp.selectOptions) {
        let found = alp.selectOptions.find((s) => s.text.toLowerCase() === value.toLowerCase());
        if (found) {
          let currValue = alp.getValue();
          if (currValue) {
            return;
          }
          alp.setValue(found.value);
          if (alp._events.change) {
            alp._events.change();
          }
          alp.refresh();
          return;
        }
        return;
      }
      alp.setValue(value);
    } catch (e) {
      this.err("Error updating field value", e);
    }
  }
  async loadMatterDetailsFromLoadAPI(model) {
    this.clearErrors();
    try {
      let retValue = model;
      let url = this.options?.loadApiUrl();
      try {
        url = executeEmbeddedCode(url, model);
      } catch (e) {
        this.err("Error executing url function", e);
      }
      if (!url) {
        this.err("No url defined");
        throw new Error("No url defined");
      }
      let matches = url.match(/{([^}]+)}/g);
      if (matches) {
        matches.forEach((m) => {
          let key = m.replace("{", "").replace("}", "");
          let val = getNestedProperty(model, key);
          if (val === void 0) {
            this.err(`Could not find value for key [${key}] in the data model:`, model);
            this.errors?.push({
              code: "CONFIG_ERROR",
              message: `Could not find value for key ${key} in model`,
              userMessage: `Could not find value for key ${key} in model, contact a system administrator.`,
              additionalInfo: {
                "Looking for the key ": key,
                "Inside this model ": model
              }
            });
            return;
          }
          url = url.replace(m, val);
        });
      }
      this.log("Loading Matter using : " + url, "green");
      return executeGetv2(url).then((response) => {
        let dataPath = this.options?.loadApiResultDataPath();
        let data = this.validateResponseData(response, dataPath);
        if (response.info.success === false) {
          return retValue;
        }
        this.inf("loadMatterDetailsFromLoadAPI", data);
        return data;
      }).catch((error) => {
        setAllFieldsToNull(retValue);
        return retValue;
      });
    } catch (e) {
      this.err("Error loading matter details", e);
    }
  }
  buildUserErrors(response) {
    this.err("Error loading matter details", response);
    let errorMessageFromSharedo = response.data?.errorMessage;
    let errorStack = new Error().stack;
    if (errorMessageFromSharedo) {
      this.errors?.push({
        code: "SHAREDO_ERROR",
        message: errorMessageFromSharedo,
        userMessage: errorMessageFromSharedo,
        errorStack,
        additionalInfo: {
          responseUrl: response.response?.url || "",
          responseStatus: response.response?.status || "",
          responseStatusText: response.response?.statusText || "",
          responseData: response.data || ""
        }
      });
    }
    response.info.error.forEach((e) => {
      this.errors?.push(e);
    });
  }
  _aspectReload(model) {
    this.load(model);
  }
  save(model) {
    let data = {
      data: this.selectedMatter()
      //! To keep consistency with the search template and search results
    };
    let dataMappings = import_knockout2.default.toJS(this.options?.dataMapping());
    if (!dataMappings) {
      this.err("No dataMappings defined");
      throw new Error("No dataMappings defined");
    }
    let mappedData = mapData(data, dataMappings);
    if (gvko(this.options?.formBuilderFieldSerialisedData)) {
      let base64EncodedData = serializeObjectToBase64(this.selectedMatter());
      mappedData[gvko(this.options?.formBuilderFieldSerialisedData)] = base64EncodedData;
    }
    this.inf("save", mappedData);
    let dataToSave = this.ensureFormbuilder(model);
    $.extend(this.ensureFormbuilder(model), mappedData);
    this.l("dataToSave", dataToSave);
  }
  /**
   * This method is called by the auto complete when the user types in the search box
   * @param searchTerm the term the user has typed in
   * @param handler The auto complete handler - not used
   * @returns This method returns an array of cards to display in the auto complete
   */
  async querySearchAPI(searchTerm, handler) {
    this.clearErrors();
    this.ensureSearchTemplate();
    let results = new Array();
    var search = searchTerm.toLowerCase();
    let multiAPICallResults = void 0;
    if (this.options?.searchApiExecutionSettings && gvko(this.options?.searchApiExecutionSettings)) {
      multiAPICallResults = this.querySearchAPIMulti(search, {}).then((data) => {
        if (!data) {
          this.wrn("No results from multi search");
        } else {
          results.push(...data);
          this.l("results after multi api call:", results);
        }
      });
    }
    return Promise.all([multiAPICallResults]).then(() => {
      let cards = new Array();
      results.forEach((d) => {
        cards.push(new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
          type: "result" /* RESULT */,
          data: d,
          icon: d.icon,
          id: d,
          styles: null,
          cssClass: d.cssClass
        }));
      });
      return cards;
    });
  }
  /**
   * This method is called by the querySearchAPI when the user types in the search box
   * It will call the search API and return the results by itterating through the searchApiExecutionSettings
   * It calls the APIs in parallel and returns the results in the order they are defined in the configuration
   * @param searchTerm 
   * @param dataContext 
   * @returns 
   */
  async querySearchAPIMulti(searchTerm, dataContext) {
    let executionResults = [];
    this.clearErrors();
    var search = searchTerm.toLowerCase();
    this.log("Searching for: " + search);
    if (!this.options?.searchApiExecutionSettings) {
      this.err("No searchApiExecutionSettings defined");
      return;
    }
    dataContext = dataContext || {};
    let searchStatusInfoDiv = document.createElement("div");
    searchStatusInfoDiv.id = "searchResults";
    searchStatusInfoDiv.classList.add("ems-search-results");
    this.searchStatusDiv = this.element.querySelector(`#${SEARCH_STATUS_ID}`);
    this.searchStatusDiv.classList.remove("show");
    this.searchStatusDiv.classList.remove("all-searches-completed");
    if (!this.searchStatusDiv) {
      this.err(`Could not find element with id '${SEARCH_STATUS_ID}'`);
      throw new Error(`Could not find element with id '${SEARCH_STATUS_ID}'`);
    }
    if (this.searchStatusDiv) {
      this.searchStatusDiv.innerHTML = "";
      this.searchStatusDiv.appendChild(searchStatusInfoDiv);
      this.searchStatusDiv.classList.add("ems-search-status");
      if (gvko(this.options?.showSearchingStatus)) {
        this.searchStatusDiv.classList.add("show");
      }
    }
    gvko(this.options?.searchApiExecutionSettings)?.forEach((setting) => {
      setting = import_knockout2.default.toJS(setting);
      let weAreStillSearching = true;
      let startTime = /* @__PURE__ */ new Date();
      let searchDiv = document.createElement("div");
      searchDiv.classList.add("ems-search-result");
      ;
      searchStatusInfoDiv.appendChild(searchDiv);
      let forEachSearchStatusDiv = document.createElement("div");
      forEachSearchStatusDiv.classList.add("ems-each-search-status");
      forEachSearchStatusDiv.classList.add("searching");
      searchDiv.appendChild(forEachSearchStatusDiv);
      let indicatorDiv = document.createElement("div");
      indicatorDiv.classList.add("ems-search-results-indicator");
      indicatorDiv.classList.add("ring");
      indicatorDiv.classList.add("show");
      forEachSearchStatusDiv.appendChild(indicatorDiv);
      let eachSearchResultMessage = document.createElement("div");
      eachSearchResultMessage.classList.add("ems-search-result-message");
      eachSearchResultMessage.innerHTML = `Searching <span class="ems-search-result-name">${setting.name || setting.url}</span>`;
      forEachSearchStatusDiv.appendChild(eachSearchResultMessage);
      let elapsedTimeDiv = document.createElement("div");
      elapsedTimeDiv.classList.add("ems-search-result-elapsed-time");
      forEachSearchStatusDiv.appendChild(elapsedTimeDiv);
      let innerSpan = document.createElement("span");
      innerSpan.classList.add("esm-elapsed");
      innerSpan.innerHTML = "elapsed time";
      let innerSpan2 = document.createElement("span");
      innerSpan2.classList.add("esm-elapsed-value");
      let innerSpanIndicator = document.createElement("span");
      innerSpanIndicator.classList.add("esm-elapsed-indicator");
      elapsedTimeDiv.appendChild(innerSpan);
      elapsedTimeDiv.appendChild(innerSpan2);
      elapsedTimeDiv.appendChild(innerSpanIndicator);
      let interVal = setInterval(() => {
        this.l("Still searching for:", setting.name || setting.url);
        let elapsed = (/* @__PURE__ */ new Date()).getTime() - startTime.getTime();
        if (elapsedTimeDiv) {
          let seconds = Math.floor(elapsed / 1e3);
          let milliseconds = Math.floor(elapsed % 1e3 / 10);
          let millisecondsString = milliseconds.toString();
          if (milliseconds < 10) {
            millisecondsString = "0" + millisecondsString;
          }
          if (seconds > 3 && seconds < 6) {
            innerSpan2.classList.add("long");
          }
          if (seconds > 6 && seconds < 9) {
            innerSpan2.classList.add("very-long");
            innerSpan2.classList.remove("long");
          }
          if (seconds > 9) {
            innerSpan2.classList.remove("very-long");
            innerSpan2.classList.add("very-very-long");
          }
          innerSpan2.innerHTML = `${seconds}.${millisecondsString}`;
        }
        if (!weAreStillSearching) {
          elapsedTimeDiv.innerHTML = `<span class="esm-elapsed">completed in</span><span class="esm-elapsed-value">${elapsed / 1e3}</span>`;
          forEachSearchStatusDiv.classList.remove("searching");
          indicatorDiv.classList.remove("show");
          clearInterval(interVal);
          return;
        }
      }, 10);
      let data = void 0;
      let url = void 0;
      let method = setting.method || "GET";
      if (!dataContext[SEARCH_TERM]) {
        dataContext[SEARCH_TERM] = searchTerm;
      }
      if (!setting.url) {
        this.err("No url defined in searchApiExecutionSettings");
        this.errors?.push({
          code: "USER_ERROR",
          message: "No url defined in searchApiExecutionSettings - check the configuration of the aspect",
          userMessage: "No url defined in settings of this component, contact a system administrator."
        });
        return [];
      }
      url = executeEmbeddedCode(setting.url, dataContext);
      if (setting.data) {
        data = executeEmbeddedCode(setting.data, dataContext);
      }
      try {
        let executionResult = executeFetch(url, method, data).then((response) => {
          this.lh1(`Results from ${url}`);
          this.l("Response:", response);
          let dataPath = setting.resultDataPath || "";
          this.l("dataPath:", dataPath);
          let dataItems = this.validateResponseData(response, dataPath, setting, false);
          if (!dataItems) {
            this.err("No data items returned from search");
            eachSearchResultMessage.classList.add("no-results");
            eachSearchResultMessage.innerHTML = `Search <span class="ems-search-result-name">${setting.name || setting.url}</span> returned no results`;
            return [];
          }
          this.l("dataItems:", dataItems);
          if (!Array.isArray(dataItems)) {
            dataItems = [dataItems];
            this.l(inf(`Data Items is not an array, converting to array`));
          }
          this.nv("Total results:", dataItems.length);
          eachSearchResultMessage.classList.add("completed");
          eachSearchResultMessage.innerHTML = `Search <span class="ems-search-result-name">${setting.name || setting.url}</span> returned <span class="ems-search-result-count">${dataItems.length}</span> results`;
          dataItems.forEach((d) => {
            if (setting.resultDatapPrefixName) {
              d[setting.resultDatapPrefixName] = d;
            }
          });
          secBackOne();
          return dataItems;
        }).catch((error) => {
          eachSearchResultMessage.classList.add("error");
          eachSearchResultMessage.innerHTML = `Search <span class="ems-search-result-name">${setting.name || setting.url}</span> returned an error <span class="ems-search-result-error">${error}</span>`;
        }).finally(() => {
          weAreStillSearching = false;
        });
        executionResults.push(executionResult);
      } catch (e) {
        weAreStillSearching = false;
        this.err("Error executing search", e);
        eachSearchResultMessage.classList.add("error");
      }
    });
    return Promise.all(executionResults).then(() => {
      this.searchStatusDiv?.classList.add("all-searches-completed");
      setTimeout(() => {
        this.searchStatusDiv?.classList.remove("show");
      }, 8e3);
      let ultimateResult = [];
      executionResults.forEach((result) => {
        result.then((data) => {
          this.l("Data:", data);
          ultimateResult.push(...data);
        });
      });
      return ultimateResult;
    });
  }
  autoCompleteSelect(selectCard, handler) {
  }
  loadAndBind() {
    this.validateFormbuilderJSONFieldSetup();
    this.load(this.model);
  }
  onSave(model) {
    this.validateFormbuilderJSONFieldSetup();
    this.save(model);
  }
  /**
   * This method checks the response from the search API and returns the data from the dataPath
   * @param response the response from the search API
   * @param dataPath the path to the data in the response
   * @param setting the searchApiExecutionSetting that was used to call the API
   * @param addErrors if set to false then no errors will be added to the errors array
   * @returns 
   */
  validateResponseData(response, dataPath, setting, addErrors) {
    let retValue = void 0;
    if (!dataPath) {
      this.err("No dataPath defined");
      throw new Error("No dataPath defined");
    }
    if (response.info.success === false) {
      this.buildUserErrors(response);
    }
    try {
      if (typeof response.data === "string") {
        retValue = JSON.parse(response.data);
      }
    } catch (e) {
      retValue = "";
    }
    if (typeof response.data === "object") {
      retValue = response.data;
    }
    this.inf("querySearchAPI", retValue);
    let dataItems = getNestedProperty(retValue, dataPath);
    if (!dataItems) {
      this.err("No data found at path: " + dataPath);
      if (addErrors) {
        this.errors?.push({
          code: "DATA_ERROR",
          message: "No data found at path: " + dataPath,
          userMessage: "Results from the search API are not in the expected format, contact a system administrator.",
          additionalInfo: {
            responseUrl: response.response?.url || "",
            responseStatus: response.response?.status || "",
            responseStatusText: response.response?.statusText || "",
            responseData: response.data || "",
            widgetConfig: import_knockout2.default.toJS(this.options)
          }
        });
      }
      return [];
    }
    return dataItems;
  }
  refresh(newConfig) {
    this.loadAndBind();
  }
  reset(newConfig) {
  }
  setWidgetJsonSettings() {
    return Settings;
  }
  setThisComponentName() {
    return "ExternalMatterSearch";
  }
  setDefaults() {
    return Default;
  }
  setLocationOfDataToLoadAndSave() {
    if (this.options?.formBuilderFieldSerialisedData() && this.options?.formBuilderName()) {
      return "form-" + this.options?.formBuilderName() + "." + this.options?.formBuilderFieldSerialisedData();
    }
    return void 0;
  }
  getInputVisability() {
    let retValue = true;
    if (!this.options?.inputVisability()) {
      retValue = true;
    }
    if (typeof this.options?.inputVisability() === "boolean") {
      retValue = this.options?.inputVisability();
    }
    if (typeof this.options?.inputVisability() === "object") {
      if (!Array.isArray(this.options?.inputVisability())) {
        this.options?.inputVisability([this.options?.inputVisability()]);
      }
      if (this.options?.inputVisability() instanceof Array) {
        let rules = this.options?.inputVisability();
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          if (!rule.rule)
            continue;
          let ruleToEval = rule.rule();
          let dataContext = import_knockout2.default.toJS(this.model);
          retValue = evaluteRule(ruleToEval, dataContext);
        }
      }
    }
    let input = this.element.querySelector("#externalMatterSearch");
    if (input) {
      if (retValue === false) {
        input.style.display = "none";
      }
    }
    return retValue;
  }
  getConfiguration() {
    return this.configuration;
  }
  getSearchFieldPlacement() {
    return import_knockout2.default.toJS(this.options?.searchFields());
  }
  getSelectedIFieldPlacement() {
    let retValue = import_knockout2.default.toJS(this.options?.selectedFields());
    return retValue;
  }
  /**
   * Helper method to generate a field placement based on the field names passed in
   * @param fieldNames 
   * @returns 
   */
  autoGenerateIFeildPlacement(fieldNames) {
    return autoGenerateTemplate(fieldNames);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExternalMatterSearch
});
//! this is a function for debug purpose only
//! --> LocationToSaveOrLoadData <-- - this should be called at the end of this function to ensure that the options and configuration data is availabel to the child class
//! TODO Fix Typings
//! we do this so there is consistency between the search and selected templates
//! note does not include the data attribute as this is specific to the search template
/*! Bundled license information:

knockout/build/output/knockout-latest.js:
  (*!
   * Knockout JavaScript library v3.5.1
   * (c) The Knockout.js team - http://knockoutjs.com/
   * License: MIT (http://www.opensource.org/licenses/mit-license.php)
   *)

uri-js/dist/es5/uri.all.js:
  (** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js *)
*/
