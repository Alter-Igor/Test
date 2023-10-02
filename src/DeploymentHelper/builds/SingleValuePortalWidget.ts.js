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

// src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidget.ts
var SingleValuePortalWidget_exports = {};
__export(SingleValuePortalWidget_exports, {
  SingleValuePortalWidget: () => SingleValuePortalWidget
});
module.exports = __toCommonJS(SingleValuePortalWidget_exports);

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
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
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

// src/WebBased/Common/api/api.ts
async function executePost(api, postBody) {
  return (await executeFetch(api, "POST", postBody)).data;
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

// src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts
var ko2 = __toESM(require_knockout_latest());

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
var ko = __toESM(require_knockout_latest());
function toObservableObject(obj, existing) {
  if (!existing)
    existing = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "__ko_mapping__" && key !== "_host") {
      const value = obj[key];
      if (Array.isArray(value)) {
        if (!existing[key]) {
          existing[key] = ko.observableArray(value.map((item) => toObservableObject(item, {})));
        } else {
          existing[key](value.map((item) => toObservableObject(item, {})));
        }
      } else if (value !== null && typeof value === "object") {
        if (!existing[key]) {
          existing[key] = ko.observable(toObservableObject(value, {}));
        } else {
          existing[key](toObservableObject(value, existing[key]()));
        }
      } else {
        if (!existing[key]) {
          existing[key] = ko.observable(value);
        } else {
          existing[key](value);
        }
      }
    }
  }
  return existing;
}

// src/WebBased/Common/ObjectHelper.ts
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
function getValueFromKOObject(koObject) {
  if (typeof koObject === "function") {
    return koObject();
  }
  return koObject;
}
function gvko(koObject) {
  return getValueFromKOObject(koObject);
}

// src/Common/HtmlHelper.ts
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

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

// src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts
var DEBUG_DEFAULT = () => {
  let retValue = {
    supportRequestEnabled: false,
    enabled: true,
    logToConsole: true,
    showInAspect: false,
    liveConfig: false
  };
  return retValue;
};
var REFRESH_ON_DEFAULTS = {
  sharedoIdChanged: false,
  sharedoParentIdChanged: false,
  sharedoPhaseChanged: false
};
var DefaultDataSettings = {
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
  }
};

// src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts
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
    this.errors = ko2.observableArray();
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
      console.error("No configuration found in the sharedoConfiguration - check the aspect or widget config that ther eis a base configuration of configuration:{}");
      throw new Error("No configuration found in the sharedoConfiguration");
    }
    this.sharedoConfiguration.configuration.debug = $.extend(DEBUG_DEFAULT(), this.sharedoConfiguration.configuration.debug);
    this.sharedoConfiguration.configuration = $.extend(this.defaults, this.originalConfiguration.configuration);
    this.model = this.sharedoConfiguration._host?.model;
    this.blade = this.sharedoConfiguration._host?.blade;
    this.loaded = this.loaded || ko2.observable(false);
    this.sharedoId = this.sharedoConfiguration._host?.model.id || $ui.pageContext?.sharedoId || ko2.observable(void 0);
    if (!this.sharedoId || this.sharedoId()) {
      this.log("No sharedoId found");
    }
    this.sharedoTypeSystemName = this.sharedoConfiguration._host?.model?.sharedoTypeSystemName || $ui.pageContext?.sharedoTypeName || ko2.observable(void 0);
    if (!this.sharedoTypeSystemName || !this.sharedoTypeSystemName()) {
      this.log("No sharedoTypeSystemName found");
    }
    this.parentSharedoId = this.sharedoConfiguration._host?.model?.parentSharedoId || ko2.observable(void 0);
    this.phaseName = this.sharedoConfiguration._host?.model?.phaseName || $ui.pageContext?.phaseName || ko2.observable(void 0);
    this.phaseIsOpen = this.sharedoConfiguration._host?.model?.phaseIsOpen || $ui.pageContext?.phaseIsOpen || ko2.observable(void 0);
    this.validation = {};
    this.validationErrorCount = this.validationErrorCount || ko2.observable(0);
    this.applyComponentConfiguration(this.sharedoConfiguration.configuration);
    this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
    this.fireEvent("onInitialise", this.model);
  }
  applyComponentConfiguration(configuration) {
    let configurationAsObservables = toObservableObject(configuration, this.options);
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
    const serializedData = JSON.stringify(this.sharedoConfiguration, (key, value) => {
      if (key === "_host") {
        return void 0;
      }
      return value;
    }, 4);
    let config = ko2.observable(serializedData);
    this.liveConfigData = {
      config
    };
    let timeout = false;
    this.liveConfigDiv = this.createLiveConfigDiv();
    this.element.prepend(this.liveConfigDiv);
    setTimeout(() => {
      config.subscribe((newValue) => {
        if (timeout) {
          return;
        }
        setTimeout(() => {
          timeout = false;
          let newConfig = JSON.parse(config());
          this.applyComponentConfiguration(newConfig.configuration);
          this.liveConfigurationRefreshed();
        }, 500);
        timeout = true;
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
        $ui.events.subscribe(eventToWatch.eventPath(), (e) => {
          this.refreshComponent(eventToWatch.eventPath(), eventToWatch.methodToCall());
        }, this)
      );
    });
    let refreshOn = ko2.toJS(this._options?.refreshOn());
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
    let logItem = { eventPath, methodToCall, time: /* @__PURE__ */ new Date(), success: false };
    try {
      if (methodToCall) {
        console.log("Executing method", methodToCall);
        let componentToRefresh = this;
        if (!componentToRefresh[methodToCall]) {
          console.log(`Method not found on component ${this.thisComponentName}`, methodToCall);
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
      this.errors = ko2.observableArray();
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
    this.errors().forEach((error) => {
      let userMessageDiv = document.createElement("div");
      userMessageDiv.className = "ide-aspect-error-user-message";
      userMessageDiv.innerHTML = error.userMessage;
      userMessageDiv.onclick = () => {
        let detailedMessageDiv = document.createElement("div");
        detailedMessageDiv.className = "ide-aspect-error-detailed-message";
        const code = escapeHtml(error.code || "");
        const message = escapeHtml(error.message || "");
        const userMessage = escapeHtml(error.userMessage || "");
        const errorStack = escapeHtml(error.errorStack || "");
        const additionalInfo = JsonToHtmlConverter.convert(error.additionalInfo || {});
        const html = `
                            <div>
                            <h2>Error: ${code}</h2>
                            <p><strong>Message:</strong> ${message}</p>
                            <p><strong>User Message:</strong> ${userMessage}</p>
                            <p><strong>Stack:</strong> ${errorStack}</p>
                            <p><strong>Additional Info:</strong> ${additionalInfo}</p>
                            </div>`;
        detailedMessageDiv.innerHTML = html;
        $ui.errorDialog(detailedMessageDiv);
      };
      foreachDiv.appendChild(userMessageDiv);
      if (error.suggestions && error.suggestions.length > 0) {
        let suggestionsDiv = document.createElement("div");
        suggestionsDiv.className = "ide-aspect-error-suggestions";
        suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${error.suggestions.join("<br/>")}`;
        foreachDiv.appendChild(suggestionsDiv);
      }
      if (error.actions && error.actions.length > 0) {
        let actionsDiv = document.createElement("div");
        actionsDiv.className = "ide-aspect-error-actions";
        actionsDiv.innerHTML = `<b>Actions:</b><br/>${error.actions.join("<br/>")}`;
        foreachDiv.appendChild(actionsDiv);
      }
      if (error.internalSuggestions && error.internalSuggestions.length > 0) {
        let internalSuggestionsDiv = document.createElement("div");
        internalSuggestionsDiv.className = "ide-aspect-error-internal-suggestions";
        internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${error.internalSuggestions.join("<br/>")}`;
        foreachDiv.appendChild(internalSuggestionsDiv);
      }
    });
    if (this._options?.debug().supportRequestEnabled) {
      let actionDiv = document.createElement("div");
      actionDiv.className = "ide-aspect-error-support-action";
      errorContainerDiv.appendChild(actionDiv);
      let button = document.createElement("button");
      button.className = "btn btn-primary";
      button.innerText = "Create Support Task";
      actionDiv.appendChild(button);
    }
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
    this.log("Saving, model passed in we need to persist to", "green", dataToSave);
    if (this.LocationToSaveOrLoadData === void 0) {
      this.log("No location to save data to set - this method should be overriden", "red");
      return;
    }
    let dataToPersist = this._data;
    let currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
    if (currentData) {
      this.log(`Current data at location ${this.LocationToSaveOrLoadData} :`, "magenta", currentData);
    }
    if (!currentData) {
    }
    this.log(`New data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
    setNestedProperty(model, this.LocationToSaveOrLoadData, dataToPersist);
    this.l("Data saved", model);
  }
  async getData() {
    if (this._data) {
      return this._data;
    }
    let useParents = this._options?.dataSettings().getValueUsingParents();
    let shareDoId = this.sharedoId();
    let maxDepth = this._options?.dataSettings().maxDepth();
    let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData);
    if (LocationToSaveOrLoadData === void 0) {
      this.log("No location to load data from set - this method should be overriden", "red");
      return this._data;
    }
    this._data = getNestedProperty(this.model, LocationToSaveOrLoadData);
    if (this._data !== void 0) {
      this.l("Data found at location", this._data);
      this._data = ko2.toJS(this._data);
      return this._data;
    }
    if (this._data === void 0 && useParents === false && shareDoId) {
      return searchForAttributeRecursive(shareDoId, LocationToSaveOrLoadData, false).then((data) => {
        if (data.found) {
          this._data = data.value;
        }
        return this._data;
      });
    }
    if (this._data === void 0 && useParents === true) {
      let idToUser = this.sharedoId() || this.parentSharedoId();
      if (!idToUser) {
        this.log("No id to use for search both sharedoId and parentSharedoId are undefined");
        return this._data;
      }
      return searchForAttributeRecursive(idToUser, LocationToSaveOrLoadData, useParents, maxDepth).then((data) => {
        if (data.found) {
          this._data = data.value;
        }
        return this._data;
      });
    }
  }
  setData(value) {
    let valueToPersist = ko2.toJS(value);
    let previousValue = ko2.toJS(this._data);
    this._data = valueToPersist;
    this.fireValueChangedEvent("onDataBeforeChanged", { previousValue, newValue: valueToPersist });
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
    this.log("Loading data based on location to save", "green", this.LocationToSaveOrLoadData);
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
      debugSetting = ko2.toJS(this._options?.debug());
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
        console.log(`%c ${this.thisComponentName} - ${message}`, `color:${color}`, data);
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
    ;
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
      this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
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
      this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
    } else {
      this.log("blade.model.aspectData.formBuilder.formData found", "green");
    }
    model = model || {};
    model.aspectData = model.aspectData || {};
    model.aspectData.formBuilder = model.aspectData.formBuilder || { formData: {} };
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
      this.log(`Form builder does not contain field ${formbuilderField} `, "orange");
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

// src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts
var Default = {
  fieldPath: "title",
  title: null,
  calculatedValue: "",
  calculatedTitle: "",
  valueOnNotFound: "Not Found",
  formatter: "value",
  //if(priority.name === 'normal') {         return = '<span class="normal">Normal Priority</span>';     } else if(priority.name === 'high') {         return = '<span class="high">High Priority</span>';     } else if(priority.name === 'urgent') {         return = '<span class="urgent">Urgent Priority</span>';     } else {         return = '<span>Unknown Priority</span>';     }
  debug: DEBUG_DEFAULT(),
  eventsToReactTo: [
    {
      eventPath: "sharedo.core.case.phase-changed",
      methodToCall: "loadAndBind"
    },
    {
      eventPath: "sharedo.core.case.forms.phase.phase-changed",
      methodToCall: "loadAndBind"
    },
    {
      eventPath: "sharedo.updated",
      methodToCall: "loadAndBind"
    },
    {
      eventPath: "sharedo.core.case.sharedo-updated",
      methodToCall: "loadAndBind"
    }
  ],
  refreshOn: {
    sharedoIdChanged: true,
    sharedoParentIdChanged: true,
    sharedoPhaseChanged: true
  },
  dataSettings: {
    getValueUsingParents: false,
    maxDepth: 0
  }
};
var WidgetSettings = {
  type: "widget",
  "priority": 6e3,
  "designer": {
    "allowInPortalDesigner": false,
    "allowInSharedoPortalDesigner": true,
    "allowAspectAdapter": true,
    "title": "Single Value Aspect",
    "icon": "fa-cog",
    "description": "Single Value Aspect",
    "categories": ["UD - IDEAspects"],
    "isConfigurable": true,
    "configurationWidget": null,
    "defaultConfigurationJson": { configuration: Default }
  },
  "scripts": [],
  "styles": [
    "SingleValueAspect.css"
  ],
  "templates": [
    "SingleValueAspect.html"
  ],
  "menuTemplates": [],
  "components": []
};

// src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts
var SingleValueAspect = class extends BaseIDEAspect {
  liveConfigurationRefreshed() {
  }
  refresh(newConfig) {
  }
  reset(newConfig) {
  }
  setThisComponentName() {
    return "SingleValueAspect";
  }
  setWidgetJsonSettings() {
    return WidgetSettings;
  }
  setDefaults() {
    return Default;
  }
  // constructor(element: HTMLElement, configuration: ISingleValueAspectConfiguration, baseModel: any) {
  //     super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel)
  //     this.setup();
  // }
  setLocationOfDataToLoadAndSave() {
    return void 0;
  }
  // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind
  async setup() {
    this.setData({
      value: "",
      title: this.options?.title() || "Title Value"
    });
    this.options?.fieldPath.subscribe((newValue) => {
      this.log("Field path changed", "green", newValue);
      this.loadAndBind();
    });
    this.options?.calculatedTitle(this.options?.title() || "Title Value");
    this.options?.title.subscribe((newValue) => {
      this.log("Title changed", "green", newValue);
      if (newValue) {
        this.options?.calculatedTitle(newValue);
      }
    });
  }
  loadAndBind() {
    this.log("Loading data (model) passed in", "green");
    let sharedoId = this.sharedoId();
    if (!sharedoId) {
      this.log("No sharedoId passed in", "red");
      return;
    }
    if (!this.options?.fieldPath()) {
      this.log("No field path passed in", "red");
      return;
    }
    searchForAttributeRecursive(sharedoId, this.options?.fieldPath(), this.options?.dataSettings().getValueUsingParents(), this.options?.dataSettings().maxDepth()).then((data) => {
      if (!data || data.found == false) {
        this.log("No data returned", "red");
        this.options?.calculatedValue(this.options?.valueOnNotFound() || "");
      } else {
        let formattedValue = formatValue(data.value, this.options?.formatter() || "value");
        this.options?.calculatedValue(formattedValue || "");
      }
    });
  }
  async onSave(model) {
    this.log("No Save Implemented", "green");
  }
};

// src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts
var SingleValuePortalDefault = Default;
var WidgetSettings2 = {
  type: "widget",
  "priority": 6e3,
  "designer": {
    "allowInPortalDesigner": true,
    "allowInSharedoPortalDesigner": true,
    "allowAspectAdapter": false,
    "title": "Single Value Portal Widget",
    "icon": "fa-cog",
    "description": "Show a single value in a portal widget",
    "categories": ["UD - IDEAspects"],
    "isConfigurable": true,
    "configurationWidget": "PortalWidgets.SingleValuePortalWidgetDesigner",
    "defaultConfigurationJson": { configuration: Default }
  },
  "scripts": [],
  "styles": [
    "SingleValuePortalWidget.css"
  ],
  "templates": [
    "SingleValuePortalWidget.html"
  ],
  "menuTemplates": [],
  "components": []
};

// src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidget.ts
var thisWidgetSystemName = "SingleValuePortalWidget";
var SingleValuePortalWidget = class extends SingleValueAspect {
  liveConfigurationRefreshed() {
  }
  setThisComponentName() {
    return thisWidgetSystemName;
  }
  setDefaults() {
    return SingleValuePortalDefault;
  }
  setWidgetJsonSettings() {
    return WidgetSettings2;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SingleValuePortalWidget
});
//! --> LocationToSaveOrLoadData <-- - this should be called at the end of this function to ensure that the options and configuration data is availabel to the child class
/*! Bundled license information:

knockout/build/output/knockout-latest.js:
  (*!
   * Knockout JavaScript library v3.5.1
   * (c) The Knockout.js team - http://knockoutjs.com/
   * License: MIT (http://www.opensource.org/licenses/mit-license.php)
   *)
*/
