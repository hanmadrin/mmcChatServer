

!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).io = e() }(this, (function () { "use strict"; function t(e) { return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, t(e) } function e(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } function n(t, e) { for (var n = 0; n < e.length; n++) { var r = e[n]; r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r) } } function r(t, e, r) { return e && n(t.prototype, e), r && n(t, r), t } function i() { return i = Object.assign || function (t) { for (var e = 1; e < arguments.length; e++) { var n = arguments[e]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]) } return t }, i.apply(this, arguments) } function o(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && a(t, e) } function s(t) { return s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) { return t.__proto__ || Object.getPrototypeOf(t) }, s(t) } function a(t, e) { return a = Object.setPrototypeOf || function (t, e) { return t.__proto__ = e, t }, a(t, e) } function c() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () { }))), !0 } catch (t) { return !1 } } function u(t, e, n) { return u = c() ? Reflect.construct : function (t, e, n) { var r = [null]; r.push.apply(r, e); var i = new (Function.bind.apply(t, r)); return n && a(i, n.prototype), i }, u.apply(null, arguments) } function h(t) { var e = "function" == typeof Map ? new Map : void 0; return h = function (t) { if (null === t || (n = t, -1 === Function.toString.call(n).indexOf("[native code]"))) return t; var n; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== e) { if (e.has(t)) return e.get(t); e.set(t, r) } function r() { return u(t, arguments, s(this).constructor) } return r.prototype = Object.create(t.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), a(r, t) }, h(t) } function f(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t } function l(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return f(t) } function p(t) { var e = c(); return function () { var n, r = s(t); if (e) { var i = s(this).constructor; n = Reflect.construct(r, arguments, i) } else n = r.apply(this, arguments); return l(this, n) } } function d(t, e, n) { return d = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) { var r = function (t, e) { for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = s(t));); return t }(t, e); if (r) { var i = Object.getOwnPropertyDescriptor(r, e); return i.get ? i.get.call(n) : i.value } }, d(t, e, n || t) } function y(t, e) { (null == e || e > t.length) && (e = t.length); for (var n = 0, r = new Array(e); n < e; n++)r[n] = t[n]; return r } function v(t, e) { var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"]; if (!n) { if (Array.isArray(t) || (n = function (t, e) { if (t) { if ("string" == typeof t) return y(t, e); var n = Object.prototype.toString.call(t).slice(8, -1); return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? y(t, e) : void 0 } }(t)) || e && t && "number" == typeof t.length) { n && (t = n); var r = 0, i = function () { }; return { s: i, n: function () { return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] } }, e: function (t) { throw t }, f: i } } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") } var o, s = !0, a = !1; return { s: function () { n = n.call(t) }, n: function () { var t = n.next(); return s = t.done, t }, e: function (t) { a = !0, o = t }, f: function () { try { s || null == n.return || n.return() } finally { if (a) throw o } } } } var g = Object.create(null); g.open = "0", g.close = "1", g.ping = "2", g.pong = "3", g.message = "4", g.upgrade = "5", g.noop = "6"; var m = Object.create(null); Object.keys(g).forEach((function (t) { m[g[t]] = t })); for (var k = { type: "error", data: "parser error" }, b = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob), w = "function" == typeof ArrayBuffer, _ = function (t, e, n) { var r, i = t.type, o = t.data; return b && o instanceof Blob ? e ? n(o) : A(o, n) : w && (o instanceof ArrayBuffer || (r = o, "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(r) : r && r.buffer instanceof ArrayBuffer)) ? e ? n(o) : A(new Blob([o]), n) : n(g[i] + (o || "")) }, A = function (t, e) { var n = new FileReader; return n.onload = function () { var t = n.result.split(",")[1]; e("b" + t) }, n.readAsDataURL(t) }, E = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", O = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), R = 0; R < E.length; R++)O[E.charCodeAt(R)] = R; var T = "function" == typeof ArrayBuffer, C = function (t, e) { if ("string" != typeof t) return { type: "message", data: S(t, e) }; var n = t.charAt(0); return "b" === n ? { type: "message", data: B(t.substring(1), e) } : m[n] ? t.length > 1 ? { type: m[n], data: t.substring(1) } : { type: m[n] } : k }, B = function (t, e) { if (T) { var n = function (t) { var e, n, r, i, o, s = .75 * t.length, a = t.length, c = 0; "=" === t[t.length - 1] && (s--, "=" === t[t.length - 2] && s--); var u = new ArrayBuffer(s), h = new Uint8Array(u); for (e = 0; e < a; e += 4)n = O[t.charCodeAt(e)], r = O[t.charCodeAt(e + 1)], i = O[t.charCodeAt(e + 2)], o = O[t.charCodeAt(e + 3)], h[c++] = n << 2 | r >> 4, h[c++] = (15 & r) << 4 | i >> 2, h[c++] = (3 & i) << 6 | 63 & o; return u }(t); return S(n, e) } return { base64: !0, data: t } }, S = function (t, e) { return "blob" === e && t instanceof ArrayBuffer ? new Blob([t]) : t }, N = String.fromCharCode(30); function x(t) { if (t) return function (t) { for (var e in x.prototype) t[e] = x.prototype[e]; return t }(t) } x.prototype.on = x.prototype.addEventListener = function (t, e) { return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this }, x.prototype.once = function (t, e) { function n() { this.off(t, n), e.apply(this, arguments) } return n.fn = e, this.on(t, n), this }, x.prototype.off = x.prototype.removeListener = x.prototype.removeAllListeners = x.prototype.removeEventListener = function (t, e) { if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this; var n, r = this._callbacks["$" + t]; if (!r) return this; if (1 == arguments.length) return delete this._callbacks["$" + t], this; for (var i = 0; i < r.length; i++)if ((n = r[i]) === e || n.fn === e) { r.splice(i, 1); break } return 0 === r.length && delete this._callbacks["$" + t], this }, x.prototype.emit = function (t) { this._callbacks = this._callbacks || {}; for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], r = 1; r < arguments.length; r++)e[r - 1] = arguments[r]; if (n) { r = 0; for (var i = (n = n.slice(0)).length; r < i; ++r)n[r].apply(this, e) } return this }, x.prototype.emitReserved = x.prototype.emit, x.prototype.listeners = function (t) { return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [] }, x.prototype.hasListeners = function (t) { return !!this.listeners(t).length }; var L = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")(); function P(t) { for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)n[r - 1] = arguments[r]; return n.reduce((function (e, n) { return t.hasOwnProperty(n) && (e[n] = t[n]), e }), {}) } var j = setTimeout, q = clearTimeout; function I(t, e) { e.useNativeTimers ? (t.setTimeoutFn = j.bind(L), t.clearTimeoutFn = q.bind(L)) : (t.setTimeoutFn = setTimeout.bind(L), t.clearTimeoutFn = clearTimeout.bind(L)) } var D, F = function (t) { o(r, t); var n = p(r); function r(t, i, o) { var s; return e(this, r), (s = n.call(this, t)).description = i, s.context = o, s.type = "TransportError", s } return r }(h(Error)), M = function (t) { o(i, t); var n = p(i); function i(t) { var r; return e(this, i), (r = n.call(this)).writable = !1, I(f(r), t), r.opts = t, r.query = t.query, r.readyState = "", r.socket = t.socket, r } return r(i, [{ key: "onError", value: function (t, e, n) { return d(s(i.prototype), "emitReserved", this).call(this, "error", new F(t, e, n)), this } }, { key: "open", value: function () { return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this } }, { key: "close", value: function () { return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this } }, { key: "send", value: function (t) { "open" === this.readyState && this.write(t) } }, { key: "onOpen", value: function () { this.readyState = "open", this.writable = !0, d(s(i.prototype), "emitReserved", this).call(this, "open") } }, { key: "onData", value: function (t) { var e = C(t, this.socket.binaryType); this.onPacket(e) } }, { key: "onPacket", value: function (t) { d(s(i.prototype), "emitReserved", this).call(this, "packet", t) } }, { key: "onClose", value: function (t) { this.readyState = "closed", d(s(i.prototype), "emitReserved", this).call(this, "close", t) } }]), i }(x), U = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), V = {}, H = 0, K = 0; function Y(t) { var e = ""; do { e = U[t % 64] + e, t = Math.floor(t / 64) } while (t > 0); return e } function z() { var t = Y(+new Date); return t !== D ? (H = 0, D = t) : t + "." + Y(H++) } for (; K < 64; K++)V[U[K]] = K; function W(t) { var e = ""; for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n])); return e } function $(t) { for (var e = {}, n = t.split("&"), r = 0, i = n.length; r < i; r++) { var o = n[r].split("="); e[decodeURIComponent(o[0])] = decodeURIComponent(o[1]) } return e } var J = !1; try { J = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest } catch (t) { } var X = J; function G(t) { var e = t.xdomain; try { if ("undefined" != typeof XMLHttpRequest && (!e || X)) return new XMLHttpRequest } catch (t) { } if (!e) try { return new (L[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP") } catch (t) { } } function Q() { } var Z = null != new G({ xdomain: !1 }).responseType, tt = function (t) { o(s, t); var n = p(s); function s(t) { var r; if (e(this, s), (r = n.call(this, t)).polling = !1, "undefined" != typeof location) { var i = "https:" === location.protocol, o = location.port; o || (o = i ? "443" : "80"), r.xd = "undefined" != typeof location && t.hostname !== location.hostname || o !== t.port, r.xs = t.secure !== i } var a = t && t.forceBase64; return r.supportsBinary = Z && !a, r } return r(s, [{ key: "name", get: function () { return "polling" } }, { key: "doOpen", value: function () { this.poll() } }, { key: "pause", value: function (t) { var e = this; this.readyState = "pausing"; var n = function () { e.readyState = "paused", t() }; if (this.polling || !this.writable) { var r = 0; this.polling && (r++, this.once("pollComplete", (function () { --r || n() }))), this.writable || (r++, this.once("drain", (function () { --r || n() }))) } else n() } }, { key: "poll", value: function () { this.polling = !0, this.doPoll(), this.emitReserved("poll") } }, { key: "onData", value: function (t) { var e = this; (function (t, e) { for (var n = t.split(N), r = [], i = 0; i < n.length; i++) { var o = C(n[i], e); if (r.push(o), "error" === o.type) break } return r })(t, this.socket.binaryType).forEach((function (t) { if ("opening" === e.readyState && "open" === t.type && e.onOpen(), "close" === t.type) return e.onClose({ description: "transport closed by the server" }), !1; e.onPacket(t) })), "closed" !== this.readyState && (this.polling = !1, this.emitReserved("pollComplete"), "open" === this.readyState && this.poll()) } }, { key: "doClose", value: function () { var t = this, e = function () { t.write([{ type: "close" }]) }; "open" === this.readyState ? e() : this.once("open", e) } }, { key: "write", value: function (t) { var e = this; this.writable = !1, function (t, e) { var n = t.length, r = new Array(n), i = 0; t.forEach((function (t, o) { _(t, !1, (function (t) { r[o] = t, ++i === n && e(r.join(N)) })) })) }(t, (function (t) { e.doWrite(t, (function () { e.writable = !0, e.emitReserved("drain") })) })) } }, { key: "uri", value: function () { var t = this.query || {}, e = this.opts.secure ? "https" : "http", n = ""; !1 !== this.opts.timestampRequests && (t[this.opts.timestampParam] = z()), this.supportsBinary || t.sid || (t.b64 = 1), this.opts.port && ("https" === e && 443 !== Number(this.opts.port) || "http" === e && 80 !== Number(this.opts.port)) && (n = ":" + this.opts.port); var r = W(t); return e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + (r.length ? "?" + r : "") } }, { key: "request", value: function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; return i(t, { xd: this.xd, xs: this.xs }, this.opts), new et(this.uri(), t) } }, { key: "doWrite", value: function (t, e) { var n = this, r = this.request({ method: "POST", data: t }); r.on("success", e), r.on("error", (function (t, e) { n.onError("xhr post error", t, e) })) } }, { key: "doPoll", value: function () { var t = this, e = this.request(); e.on("data", this.onData.bind(this)), e.on("error", (function (e, n) { t.onError("xhr poll error", e, n) })), this.pollXhr = e } }]), s }(M), et = function (t) { o(i, t); var n = p(i); function i(t, r) { var o; return e(this, i), I(f(o = n.call(this)), r), o.opts = r, o.method = r.method || "GET", o.uri = t, o.async = !1 !== r.async, o.data = void 0 !== r.data ? r.data : null, o.create(), o } return r(i, [{ key: "create", value: function () { var t = this, e = P(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref"); e.xdomain = !!this.opts.xd, e.xscheme = !!this.opts.xs; var n = this.xhr = new G(e); try { n.open(this.method, this.uri, this.async); try { if (this.opts.extraHeaders) for (var r in n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0), this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(r) && n.setRequestHeader(r, this.opts.extraHeaders[r]) } catch (t) { } if ("POST" === this.method) try { n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") } catch (t) { } try { n.setRequestHeader("Accept", "*/*") } catch (t) { } "withCredentials" in n && (n.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (n.timeout = this.opts.requestTimeout), n.onreadystatechange = function () { 4 === n.readyState && (200 === n.status || 1223 === n.status ? t.onLoad() : t.setTimeoutFn((function () { t.onError("number" == typeof n.status ? n.status : 0) }), 0)) }, n.send(this.data) } catch (e) { return void this.setTimeoutFn((function () { t.onError(e) }), 0) } "undefined" != typeof document && (this.index = i.requestsCount++, i.requests[this.index] = this) } }, { key: "onError", value: function (t) { this.emitReserved("error", t, this.xhr), this.cleanup(!0) } }, { key: "cleanup", value: function (t) { if (void 0 !== this.xhr && null !== this.xhr) { if (this.xhr.onreadystatechange = Q, t) try { this.xhr.abort() } catch (t) { } "undefined" != typeof document && delete i.requests[this.index], this.xhr = null } } }, { key: "onLoad", value: function () { var t = this.xhr.responseText; null !== t && (this.emitReserved("data", t), this.emitReserved("success"), this.cleanup()) } }, { key: "abort", value: function () { this.cleanup() } }]), i }(x); if (et.requestsCount = 0, et.requests = {}, "undefined" != typeof document) if ("function" == typeof attachEvent) attachEvent("onunload", nt); else if ("function" == typeof addEventListener) { addEventListener("onpagehide" in L ? "pagehide" : "unload", nt, !1) } function nt() { for (var t in et.requests) et.requests.hasOwnProperty(t) && et.requests[t].abort() } var rt = "function" == typeof Promise && "function" == typeof Promise.resolve ? function (t) { return Promise.resolve().then(t) } : function (t, e) { return e(t, 0) }, it = L.WebSocket || L.MozWebSocket, ot = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), st = function (t) { o(i, t); var n = p(i); function i(t) { var r; return e(this, i), (r = n.call(this, t)).supportsBinary = !t.forceBase64, r } return r(i, [{ key: "name", get: function () { return "websocket" } }, { key: "doOpen", value: function () { if (this.check()) { var t = this.uri(), e = this.opts.protocols, n = ot ? {} : P(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity"); this.opts.extraHeaders && (n.headers = this.opts.extraHeaders); try { this.ws = ot ? new it(t, e, n) : e ? new it(t, e) : new it(t) } catch (t) { return this.emitReserved("error", t) } this.ws.binaryType = this.socket.binaryType || "arraybuffer", this.addEventListeners() } } }, { key: "addEventListeners", value: function () { var t = this; this.ws.onopen = function () { t.opts.autoUnref && t.ws._socket.unref(), t.onOpen() }, this.ws.onclose = function (e) { return t.onClose({ description: "websocket connection closed", context: e }) }, this.ws.onmessage = function (e) { return t.onData(e.data) }, this.ws.onerror = function (e) { return t.onError("websocket error", e) } } }, { key: "write", value: function (t) { var e = this; this.writable = !1; for (var n = function (n) { var r = t[n], i = n === t.length - 1; _(r, e.supportsBinary, (function (t) { try { e.ws.send(t) } catch (t) { } i && rt((function () { e.writable = !0, e.emitReserved("drain") }), e.setTimeoutFn) })) }, r = 0; r < t.length; r++)n(r) } }, { key: "doClose", value: function () { void 0 !== this.ws && (this.ws.close(), this.ws = null) } }, { key: "uri", value: function () { var t = this.query || {}, e = this.opts.secure ? "wss" : "ws", n = ""; this.opts.port && ("wss" === e && 443 !== Number(this.opts.port) || "ws" === e && 80 !== Number(this.opts.port)) && (n = ":" + this.opts.port), this.opts.timestampRequests && (t[this.opts.timestampParam] = z()), this.supportsBinary || (t.b64 = 1); var r = W(t); return e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + (r.length ? "?" + r : "") } }, { key: "check", value: function () { return !(!it || "__initialize" in it && this.name === i.prototype.name) } }]), i }(M), at = { websocket: st, polling: tt }, ct = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, ut = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"]; function ht(t) { var e = t, n = t.indexOf("["), r = t.indexOf("]"); -1 != n && -1 != r && (t = t.substring(0, n) + t.substring(n, r).replace(/:/g, ";") + t.substring(r, t.length)); for (var i, o, s = ct.exec(t || ""), a = {}, c = 14; c--;)a[ut[c]] = s[c] || ""; return -1 != n && -1 != r && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a.pathNames = function (t, e) { var n = /\/{2,9}/g, r = e.replace(n, "/").split("/"); "/" != e.substr(0, 1) && 0 !== e.length || r.splice(0, 1); "/" == e.substr(e.length - 1, 1) && r.splice(r.length - 1, 1); return r }(0, a.path), a.queryKey = (i = a.query, o = {}, i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function (t, e, n) { e && (o[e] = n) })), o), a } var ft = function (n) { o(a, n); var s = p(a); function a(n) { var r, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; return e(this, a), r = s.call(this), n && "object" === t(n) && (o = n, n = null), n ? (n = ht(n), o.hostname = n.host, o.secure = "https" === n.protocol || "wss" === n.protocol, o.port = n.port, n.query && (o.query = n.query)) : o.host && (o.hostname = ht(o.host).host), I(f(r), o), r.secure = null != o.secure ? o.secure : "undefined" != typeof location && "https:" === location.protocol, o.hostname && !o.port && (o.port = r.secure ? "443" : "80"), r.hostname = o.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), r.port = o.port || ("undefined" != typeof location && location.port ? location.port : r.secure ? "443" : "80"), r.transports = o.transports || ["polling", "websocket"], r.readyState = "", r.writeBuffer = [], r.prevBufferLen = 0, r.opts = i({ path: "/engine.io", agent: !1, withCredentials: !1, upgrade: !0, timestampParam: "t", rememberUpgrade: !1, rejectUnauthorized: !0, perMessageDeflate: { threshold: 1024 }, transportOptions: {}, closeOnBeforeunload: !0 }, o), r.opts.path = r.opts.path.replace(/\/$/, "") + "/", "string" == typeof r.opts.query && (r.opts.query = $(r.opts.query)), r.id = null, r.upgrades = null, r.pingInterval = null, r.pingTimeout = null, r.pingTimeoutTimer = null, "function" == typeof addEventListener && (r.opts.closeOnBeforeunload && addEventListener("beforeunload", (function () { r.transport && (r.transport.removeAllListeners(), r.transport.close()) }), !1), "localhost" !== r.hostname && (r.offlineEventListener = function () { r.onClose("transport close", { description: "network connection lost" }) }, addEventListener("offline", r.offlineEventListener, !1))), r.open(), r } return r(a, [{ key: "createTransport", value: function (t) { var e = i({}, this.opts.query); e.EIO = 4, e.transport = t, this.id && (e.sid = this.id); var n = i({}, this.opts.transportOptions[t], this.opts, { query: e, socket: this, hostname: this.hostname, secure: this.secure, port: this.port }); return new at[t](n) } }, { key: "open", value: function () { var t, e = this; if (this.opts.rememberUpgrade && a.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket"; else { if (0 === this.transports.length) return void this.setTimeoutFn((function () { e.emitReserved("error", "No transports available") }), 0); t = this.transports[0] } this.readyState = "opening"; try { t = this.createTransport(t) } catch (t) { return this.transports.shift(), void this.open() } t.open(), this.setTransport(t) } }, { key: "setTransport", value: function (t) { var e = this; this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (function (t) { return e.onClose("transport close", t) })) } }, { key: "probe", value: function (t) { var e = this, n = this.createTransport(t), r = !1; a.priorWebsocketSuccess = !1; var i = function () { r || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (function (t) { if (!r) if ("pong" === t.type && "probe" === t.data) { if (e.upgrading = !0, e.emitReserved("upgrading", n), !n) return; a.priorWebsocketSuccess = "websocket" === n.name, e.transport.pause((function () { r || "closed" !== e.readyState && (f(), e.setTransport(n), n.send([{ type: "upgrade" }]), e.emitReserved("upgrade", n), n = null, e.upgrading = !1, e.flush()) })) } else { var i = new Error("probe error"); i.transport = n.name, e.emitReserved("upgradeError", i) } }))) }; function o() { r || (r = !0, f(), n.close(), n = null) } var s = function (t) { var r = new Error("probe error: " + t); r.transport = n.name, o(), e.emitReserved("upgradeError", r) }; function c() { s("transport closed") } function u() { s("socket closed") } function h(t) { n && t.name !== n.name && o() } var f = function () { n.removeListener("open", i), n.removeListener("error", s), n.removeListener("close", c), e.off("close", u), e.off("upgrading", h) }; n.once("open", i), n.once("error", s), n.once("close", c), this.once("close", u), this.once("upgrading", h), n.open() } }, { key: "onOpen", value: function () { if (this.readyState = "open", a.priorWebsocketSuccess = "websocket" === this.transport.name, this.emitReserved("open"), this.flush(), "open" === this.readyState && this.opts.upgrade && this.transport.pause) for (var t = 0, e = this.upgrades.length; t < e; t++)this.probe(this.upgrades[t]) } }, { key: "onPacket", value: function (t) { if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type) { case "open": this.onHandshake(JSON.parse(t.data)); break; case "ping": this.resetPingTimeout(), this.sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"); break; case "error": var e = new Error("server error"); e.code = t.data, this.onError(e); break; case "message": this.emitReserved("data", t.data), this.emitReserved("message", t.data) } } }, { key: "onHandshake", value: function (t) { this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.maxPayload = t.maxPayload, this.onOpen(), "closed" !== this.readyState && this.resetPingTimeout() } }, { key: "resetPingTimeout", value: function () { var t = this; this.clearTimeoutFn(this.pingTimeoutTimer), this.pingTimeoutTimer = this.setTimeoutFn((function () { t.onClose("ping timeout") }), this.pingInterval + this.pingTimeout), this.opts.autoUnref && this.pingTimeoutTimer.unref() } }, { key: "onDrain", value: function () { this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emitReserved("drain") : this.flush() } }, { key: "flush", value: function () { if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) { var t = this.getWritablePackets(); this.transport.send(t), this.prevBufferLen = t.length, this.emitReserved("flush") } } }, { key: "getWritablePackets", value: function () { if (!(this.maxPayload && "polling" === this.transport.name && this.writeBuffer.length > 1)) return this.writeBuffer; for (var t, e = 1, n = 0; n < this.writeBuffer.length; n++) { var r = this.writeBuffer[n].data; if (r && (e += "string" == typeof (t = r) ? function (t) { for (var e = 0, n = 0, r = 0, i = t.length; r < i; r++)(e = t.charCodeAt(r)) < 128 ? n += 1 : e < 2048 ? n += 2 : e < 55296 || e >= 57344 ? n += 3 : (r++, n += 4); return n }(t) : Math.ceil(1.33 * (t.byteLength || t.size))), n > 0 && e > this.maxPayload) return this.writeBuffer.slice(0, n); e += 2 } return this.writeBuffer } }, { key: "write", value: function (t, e, n) { return this.sendPacket("message", t, e, n), this } }, { key: "send", value: function (t, e, n) { return this.sendPacket("message", t, e, n), this } }, { key: "sendPacket", value: function (t, e, n, r) { if ("function" == typeof e && (r = e, e = void 0), "function" == typeof n && (r = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) { (n = n || {}).compress = !1 !== n.compress; var i = { type: t, data: e, options: n }; this.emitReserved("packetCreate", i), this.writeBuffer.push(i), r && this.once("flush", r), this.flush() } } }, { key: "close", value: function () { var t = this, e = function () { t.onClose("forced close"), t.transport.close() }, n = function n() { t.off("upgrade", n), t.off("upgradeError", n), e() }, r = function () { t.once("upgrade", n), t.once("upgradeError", n) }; return "opening" !== this.readyState && "open" !== this.readyState || (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", (function () { t.upgrading ? r() : e() })) : this.upgrading ? r() : e()), this } }, { key: "onError", value: function (t) { a.priorWebsocketSuccess = !1, this.emitReserved("error", t), this.onClose("transport error", t) } }, { key: "onClose", value: function (t, e) { "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (this.clearTimeoutFn(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), "function" == typeof removeEventListener && removeEventListener("offline", this.offlineEventListener, !1), this.readyState = "closed", this.id = null, this.emitReserved("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0) } }, { key: "filterUpgrades", value: function (t) { for (var e = [], n = 0, r = t.length; n < r; n++)~this.transports.indexOf(t[n]) && e.push(t[n]); return e } }]), a }(x); ft.protocol = 4; var lt = "function" == typeof ArrayBuffer, pt = Object.prototype.toString, dt = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === pt.call(Blob), yt = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === pt.call(File); function vt(t) { return lt && (t instanceof ArrayBuffer || function (t) { return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer }(t)) || dt && t instanceof Blob || yt && t instanceof File } function gt(e, n) { if (!e || "object" !== t(e)) return !1; if (Array.isArray(e)) { for (var r = 0, i = e.length; r < i; r++)if (gt(e[r])) return !0; return !1 } if (vt(e)) return !0; if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return gt(e.toJSON(), !0); for (var o in e) if (Object.prototype.hasOwnProperty.call(e, o) && gt(e[o])) return !0; return !1 } function mt(t) { var e = [], n = t.data, r = t; return r.data = kt(n, e), r.attachments = e.length, { packet: r, buffers: e } } function kt(e, n) { if (!e) return e; if (vt(e)) { var r = { _placeholder: !0, num: n.length }; return n.push(e), r } if (Array.isArray(e)) { for (var i = new Array(e.length), o = 0; o < e.length; o++)i[o] = kt(e[o], n); return i } if ("object" === t(e) && !(e instanceof Date)) { var s = {}; for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (s[a] = kt(e[a], n)); return s } return e } function bt(t, e) { return t.data = wt(t.data, e), t.attachments = void 0, t } function wt(e, n) { if (!e) return e; if (e && e._placeholder) return n[e.num]; if (Array.isArray(e)) for (var r = 0; r < e.length; r++)e[r] = wt(e[r], n); else if ("object" === t(e)) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (e[i] = wt(e[i], n)); return e } var _t; !function (t) { t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK" }(_t || (_t = {})); var At = function () { function t(n) { e(this, t), this.replacer = n } return r(t, [{ key: "encode", value: function (t) { return t.type !== _t.EVENT && t.type !== _t.ACK || !gt(t) ? [this.encodeAsString(t)] : (t.type = t.type === _t.EVENT ? _t.BINARY_EVENT : _t.BINARY_ACK, this.encodeAsBinary(t)) } }, { key: "encodeAsString", value: function (t) { var e = "" + t.type; return t.type !== _t.BINARY_EVENT && t.type !== _t.BINARY_ACK || (e += t.attachments + "-"), t.nsp && "/" !== t.nsp && (e += t.nsp + ","), null != t.id && (e += t.id), null != t.data && (e += JSON.stringify(t.data, this.replacer)), e } }, { key: "encodeAsBinary", value: function (t) { var e = mt(t), n = this.encodeAsString(e.packet), r = e.buffers; return r.unshift(n), r } }]), t }(), Et = function (n) { o(a, n); var i = p(a); function a(t) { var n; return e(this, a), (n = i.call(this)).reviver = t, n } return r(a, [{ key: "add", value: function (t) { var e; if ("string" == typeof t) (e = this.decodeString(t)).type === _t.BINARY_EVENT || e.type === _t.BINARY_ACK ? (this.reconstructor = new Ot(e), 0 === e.attachments && d(s(a.prototype), "emitReserved", this).call(this, "decoded", e)) : d(s(a.prototype), "emitReserved", this).call(this, "decoded", e); else { if (!vt(t) && !t.base64) throw new Error("Unknown type: " + t); if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet"); (e = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, d(s(a.prototype), "emitReserved", this).call(this, "decoded", e)) } } }, { key: "decodeString", value: function (t) { var e = 0, n = { type: Number(t.charAt(0)) }; if (void 0 === _t[n.type]) throw new Error("unknown packet type " + n.type); if (n.type === _t.BINARY_EVENT || n.type === _t.BINARY_ACK) { for (var r = e + 1; "-" !== t.charAt(++e) && e != t.length;); var i = t.substring(r, e); if (i != Number(i) || "-" !== t.charAt(e)) throw new Error("Illegal attachments"); n.attachments = Number(i) } if ("/" === t.charAt(e + 1)) { for (var o = e + 1; ++e;) { if ("," === t.charAt(e)) break; if (e === t.length) break } n.nsp = t.substring(o, e) } else n.nsp = "/"; var s = t.charAt(e + 1); if ("" !== s && Number(s) == s) { for (var c = e + 1; ++e;) { var u = t.charAt(e); if (null == u || Number(u) != u) { --e; break } if (e === t.length) break } n.id = Number(t.substring(c, e + 1)) } if (t.charAt(++e)) { var h = this.tryParse(t.substr(e)); if (!a.isPayloadValid(n.type, h)) throw new Error("invalid payload"); n.data = h } return n } }, { key: "tryParse", value: function (t) { try { return JSON.parse(t, this.reviver) } catch (t) { return !1 } } }, { key: "destroy", value: function () { this.reconstructor && this.reconstructor.finishedReconstruction() } }], [{ key: "isPayloadValid", value: function (e, n) { switch (e) { case _t.CONNECT: return "object" === t(n); case _t.DISCONNECT: return void 0 === n; case _t.CONNECT_ERROR: return "string" == typeof n || "object" === t(n); case _t.EVENT: case _t.BINARY_EVENT: return Array.isArray(n) && n.length > 0; case _t.ACK: case _t.BINARY_ACK: return Array.isArray(n) } } }]), a }(x), Ot = function () { function t(n) { e(this, t), this.packet = n, this.buffers = [], this.reconPack = n } return r(t, [{ key: "takeBinaryData", value: function (t) { if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) { var e = bt(this.reconPack, this.buffers); return this.finishedReconstruction(), e } return null } }, { key: "finishedReconstruction", value: function () { this.reconPack = null, this.buffers = [] } }]), t }(), Rt = Object.freeze({ __proto__: null, protocol: 5, get PacketType() { return _t }, Encoder: At, Decoder: Et }); function Tt(t, e, n) { return t.on(e, n), function () { t.off(e, n) } } var Ct = Object.freeze({ connect: 1, connect_error: 1, disconnect: 1, disconnecting: 1, newListener: 1, removeListener: 1 }), Bt = function (t) { o(i, t); var n = p(i); function i(t, r, o) { var s; return e(this, i), (s = n.call(this)).connected = !1, s.receiveBuffer = [], s.sendBuffer = [], s.ids = 0, s.acks = {}, s.flags = {}, s.io = t, s.nsp = r, o && o.auth && (s.auth = o.auth), s.io._autoConnect && s.open(), s } return r(i, [{ key: "disconnected", get: function () { return !this.connected } }, { key: "subEvents", value: function () { if (!this.subs) { var t = this.io; this.subs = [Tt(t, "open", this.onopen.bind(this)), Tt(t, "packet", this.onpacket.bind(this)), Tt(t, "error", this.onerror.bind(this)), Tt(t, "close", this.onclose.bind(this))] } } }, { key: "active", get: function () { return !!this.subs } }, { key: "connect", value: function () { return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), "open" === this.io._readyState && this.onopen()), this } }, { key: "open", value: function () { return this.connect() } }, { key: "send", value: function () { for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)e[n] = arguments[n]; return e.unshift("message"), this.emit.apply(this, e), this } }, { key: "emit", value: function (t) { if (Ct.hasOwnProperty(t)) throw new Error('"' + t + '" is a reserved event name'); for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)n[r - 1] = arguments[r]; n.unshift(t); var i = { type: _t.EVENT, data: n, options: {} }; if (i.options.compress = !1 !== this.flags.compress, "function" == typeof n[n.length - 1]) { var o = this.ids++, s = n.pop(); this._registerAckCallback(o, s), i.id = o } var a = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable, c = this.flags.volatile && (!a || !this.connected); return c || (this.connected ? (this.notifyOutgoingListeners(i), this.packet(i)) : this.sendBuffer.push(i)), this.flags = {}, this } }, { key: "_registerAckCallback", value: function (t, e) { var n = this, r = this.flags.timeout; if (void 0 !== r) { var i = this.io.setTimeoutFn((function () { delete n.acks[t]; for (var r = 0; r < n.sendBuffer.length; r++)n.sendBuffer[r].id === t && n.sendBuffer.splice(r, 1); e.call(n, new Error("operation has timed out")) }), r); this.acks[t] = function () { n.io.clearTimeoutFn(i); for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)r[o] = arguments[o]; e.apply(n, [null].concat(r)) } } else this.acks[t] = e } }, { key: "packet", value: function (t) { t.nsp = this.nsp, this.io._packet(t) } }, { key: "onopen", value: function () { var t = this; "function" == typeof this.auth ? this.auth((function (e) { t.packet({ type: _t.CONNECT, data: e }) })) : this.packet({ type: _t.CONNECT, data: this.auth }) } }, { key: "onerror", value: function (t) { this.connected || this.emitReserved("connect_error", t) } }, { key: "onclose", value: function (t, e) { this.connected = !1, delete this.id, this.emitReserved("disconnect", t, e) } }, { key: "onpacket", value: function (t) { if (t.nsp === this.nsp) switch (t.type) { case _t.CONNECT: if (t.data && t.data.sid) { var e = t.data.sid; this.onconnect(e) } else this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)")); break; case _t.EVENT: case _t.BINARY_EVENT: this.onevent(t); break; case _t.ACK: case _t.BINARY_ACK: this.onack(t); break; case _t.DISCONNECT: this.ondisconnect(); break; case _t.CONNECT_ERROR: this.destroy(); var n = new Error(t.data.message); n.data = t.data.data, this.emitReserved("connect_error", n) } } }, { key: "onevent", value: function (t) { var e = t.data || []; null != t.id && e.push(this.ack(t.id)), this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e)) } }, { key: "emitEvent", value: function (t) { if (this._anyListeners && this._anyListeners.length) { var e, n = v(this._anyListeners.slice()); try { for (n.s(); !(e = n.n()).done;) { e.value.apply(this, t) } } catch (t) { n.e(t) } finally { n.f() } } d(s(i.prototype), "emit", this).apply(this, t) } }, { key: "ack", value: function (t) { var e = this, n = !1; return function () { if (!n) { n = !0; for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++)i[o] = arguments[o]; e.packet({ type: _t.ACK, id: t, data: i }) } } } }, { key: "onack", value: function (t) { var e = this.acks[t.id]; "function" == typeof e && (e.apply(this, t.data), delete this.acks[t.id]) } }, { key: "onconnect", value: function (t) { this.id = t, this.connected = !0, this.emitBuffered(), this.emitReserved("connect") } }, { key: "emitBuffered", value: function () { var t = this; this.receiveBuffer.forEach((function (e) { return t.emitEvent(e) })), this.receiveBuffer = [], this.sendBuffer.forEach((function (e) { t.notifyOutgoingListeners(e), t.packet(e) })), this.sendBuffer = [] } }, { key: "ondisconnect", value: function () { this.destroy(), this.onclose("io server disconnect") } }, { key: "destroy", value: function () { this.subs && (this.subs.forEach((function (t) { return t() })), this.subs = void 0), this.io._destroy(this) } }, { key: "disconnect", value: function () { return this.connected && this.packet({ type: _t.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this } }, { key: "close", value: function () { return this.disconnect() } }, { key: "compress", value: function (t) { return this.flags.compress = t, this } }, { key: "volatile", get: function () { return this.flags.volatile = !0, this } }, { key: "timeout", value: function (t) { return this.flags.timeout = t, this } }, { key: "onAny", value: function (t) { return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this } }, { key: "prependAny", value: function (t) { return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this } }, { key: "offAny", value: function (t) { if (!this._anyListeners) return this; if (t) { for (var e = this._anyListeners, n = 0; n < e.length; n++)if (t === e[n]) return e.splice(n, 1), this } else this._anyListeners = []; return this } }, { key: "listenersAny", value: function () { return this._anyListeners || [] } }, { key: "onAnyOutgoing", value: function (t) { return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this } }, { key: "prependAnyOutgoing", value: function (t) { return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this } }, { key: "offAnyOutgoing", value: function (t) { if (!this._anyOutgoingListeners) return this; if (t) { for (var e = this._anyOutgoingListeners, n = 0; n < e.length; n++)if (t === e[n]) return e.splice(n, 1), this } else this._anyOutgoingListeners = []; return this } }, { key: "listenersAnyOutgoing", value: function () { return this._anyOutgoingListeners || [] } }, { key: "notifyOutgoingListeners", value: function (t) { if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) { var e, n = v(this._anyOutgoingListeners.slice()); try { for (n.s(); !(e = n.n()).done;) { e.value.apply(this, t.data) } } catch (t) { n.e(t) } finally { n.f() } } } }]), i }(x); function St(t) { t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0 } St.prototype.duration = function () { var t = this.ms * Math.pow(this.factor, this.attempts++); if (this.jitter) { var e = Math.random(), n = Math.floor(e * this.jitter * t); t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n } return 0 | Math.min(t, this.max) }, St.prototype.reset = function () { this.attempts = 0 }, St.prototype.setMin = function (t) { this.ms = t }, St.prototype.setMax = function (t) { this.max = t }, St.prototype.setJitter = function (t) { this.jitter = t }; var Nt = function (n) { o(s, n); var i = p(s); function s(n, r) { var o, a; e(this, s), (o = i.call(this)).nsps = {}, o.subs = [], n && "object" === t(n) && (r = n, n = void 0), (r = r || {}).path = r.path || "/socket.io", o.opts = r, I(f(o), r), o.reconnection(!1 !== r.reconnection), o.reconnectionAttempts(r.reconnectionAttempts || 1 / 0), o.reconnectionDelay(r.reconnectionDelay || 1e3), o.reconnectionDelayMax(r.reconnectionDelayMax || 5e3), o.randomizationFactor(null !== (a = r.randomizationFactor) && void 0 !== a ? a : .5), o.backoff = new St({ min: o.reconnectionDelay(), max: o.reconnectionDelayMax(), jitter: o.randomizationFactor() }), o.timeout(null == r.timeout ? 2e4 : r.timeout), o._readyState = "closed", o.uri = n; var c = r.parser || Rt; return o.encoder = new c.Encoder, o.decoder = new c.Decoder, o._autoConnect = !1 !== r.autoConnect, o._autoConnect && o.open(), o } return r(s, [{ key: "reconnection", value: function (t) { return arguments.length ? (this._reconnection = !!t, this) : this._reconnection } }, { key: "reconnectionAttempts", value: function (t) { return void 0 === t ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this) } }, { key: "reconnectionDelay", value: function (t) { var e; return void 0 === t ? this._reconnectionDelay : (this._reconnectionDelay = t, null === (e = this.backoff) || void 0 === e || e.setMin(t), this) } }, { key: "randomizationFactor", value: function (t) { var e; return void 0 === t ? this._randomizationFactor : (this._randomizationFactor = t, null === (e = this.backoff) || void 0 === e || e.setJitter(t), this) } }, { key: "reconnectionDelayMax", value: function (t) { var e; return void 0 === t ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, null === (e = this.backoff) || void 0 === e || e.setMax(t), this) } }, { key: "timeout", value: function (t) { return arguments.length ? (this._timeout = t, this) : this._timeout } }, { key: "maybeReconnectOnOpen", value: function () { !this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect() } }, { key: "open", value: function (t) { var e = this; if (~this._readyState.indexOf("open")) return this; this.engine = new ft(this.uri, this.opts); var n = this.engine, r = this; this._readyState = "opening", this.skipReconnect = !1; var i = Tt(n, "open", (function () { r.onopen(), t && t() })), o = Tt(n, "error", (function (n) { r.cleanup(), r._readyState = "closed", e.emitReserved("error", n), t ? t(n) : r.maybeReconnectOnOpen() })); if (!1 !== this._timeout) { var s = this._timeout; 0 === s && i(); var a = this.setTimeoutFn((function () { i(), n.close(), n.emit("error", new Error("timeout")) }), s); this.opts.autoUnref && a.unref(), this.subs.push((function () { clearTimeout(a) })) } return this.subs.push(i), this.subs.push(o), this } }, { key: "connect", value: function (t) { return this.open(t) } }, { key: "onopen", value: function () { this.cleanup(), this._readyState = "open", this.emitReserved("open"); var t = this.engine; this.subs.push(Tt(t, "ping", this.onping.bind(this)), Tt(t, "data", this.ondata.bind(this)), Tt(t, "error", this.onerror.bind(this)), Tt(t, "close", this.onclose.bind(this)), Tt(this.decoder, "decoded", this.ondecoded.bind(this))) } }, { key: "onping", value: function () { this.emitReserved("ping") } }, { key: "ondata", value: function (t) { this.decoder.add(t) } }, { key: "ondecoded", value: function (t) { this.emitReserved("packet", t) } }, { key: "onerror", value: function (t) { this.emitReserved("error", t) } }, { key: "socket", value: function (t, e) { var n = this.nsps[t]; return n || (n = new Bt(this, t, e), this.nsps[t] = n), n } }, { key: "_destroy", value: function (t) { for (var e = 0, n = Object.keys(this.nsps); e < n.length; e++) { var r = n[e]; if (this.nsps[r].active) return } this._close() } }, { key: "_packet", value: function (t) { for (var e = this.encoder.encode(t), n = 0; n < e.length; n++)this.engine.write(e[n], t.options) } }, { key: "cleanup", value: function () { this.subs.forEach((function (t) { return t() })), this.subs.length = 0, this.decoder.destroy() } }, { key: "_close", value: function () { this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close"), this.engine && this.engine.close() } }, { key: "disconnect", value: function () { return this._close() } }, { key: "onclose", value: function (t, e) { this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, e), this._reconnection && !this.skipReconnect && this.reconnect() } }, { key: "reconnect", value: function () { var t = this; if (this._reconnecting || this.skipReconnect) return this; var e = this; if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1; else { var n = this.backoff.duration(); this._reconnecting = !0; var r = this.setTimeoutFn((function () { e.skipReconnect || (t.emitReserved("reconnect_attempt", e.backoff.attempts), e.skipReconnect || e.open((function (n) { n ? (e._reconnecting = !1, e.reconnect(), t.emitReserved("reconnect_error", n)) : e.onreconnect() }))) }), n); this.opts.autoUnref && r.unref(), this.subs.push((function () { clearTimeout(r) })) } } }, { key: "onreconnect", value: function () { var t = this.backoff.attempts; this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t) } }]), s }(x), xt = {}; function Lt(e, n) { "object" === t(e) && (n = e, e = void 0); var r, i = function (t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 ? arguments[2] : void 0, r = t; n = n || "undefined" != typeof location && location, null == t && (t = n.protocol + "//" + n.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? n.protocol + t : n.host + t), /^(https?|wss?):\/\//.test(t) || (t = void 0 !== n ? n.protocol + "//" + t : "https://" + t), r = ht(t)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/"; var i = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host; return r.id = r.protocol + "://" + i + ":" + r.port + e, r.href = r.protocol + "://" + i + (n && n.port === r.port ? "" : ":" + r.port), r }(e, (n = n || {}).path || "/socket.io"), o = i.source, s = i.id, a = i.path, c = xt[s] && a in xt[s].nsps; return n.forceNew || n["force new connection"] || !1 === n.multiplex || c ? r = new Nt(o, n) : (xt[s] || (xt[s] = new Nt(o, n)), r = xt[s]), i.query && !n.query && (n.query = i.queryKey), r.socket(i.path, n) } return i(Lt, { Manager: Nt, Socket: Bt, io: Lt, connect: Lt }), Lt }));

const globals = {
    socket: io(),
    admins: ["Michael Ritter", "Jason Matthews", "Katie Wilson", "Md Hasan Mahmud Rimon", "Brittney Young", "Tanveen Hasan"],
    automationTimes: [
        { title: '30 seconds', value: 30 },
        { title: '1 minute', value: 60 },
        { title: '2 minutes', value: 120 },
        { title: '5 minutes', value: 300 },
        { title: '10 minutes', value: 600 },
        { title: '30 minutes', value: 1800 },
        { title: '1 hour', value: 3600 },
    ],
    mondayFetch: {
        appraisalCounterBoard: 1255820475,
        borEffortBoardId: 1250230293,
        columnValuesIds: {
            borEffortBoard: {
                person: 'person',
                url: 'text7',
                status: 'status',
            },
            appraisalCounterBoard: {
                status: 'status',
            }
        },
        statuses: {
            borEffortBoard: {
                unVerified: 5,
                verified: 1,
                bad: 4,
                verifiedWithVin: 17,
            }
        },
        allStatuses: {
            borEffortBoard: [

                "Verified",
                "BAD",
                "Verified W/Vin",
                "1st MSG",
                "HELP",
                "MSG 1st Offer",
                "Seller Counter",
                "Multi-Counter",
                "MSG Counter",
                "BOR Form",
                "BOR",
                "I Passed",
                "Vin# Bad",
                "No Deal",
                "Told To Pass",
                "Will Send Vin",
                "2nd 1st Msg",
                "Auto Vin",
                "Link Gone",
                "Close Counter!",
                "Manual",
                "See Field Note",
                "FlwUpOffer",
                "GM Help",
                "Sup Help",
                "VIN",
                "See My Note",
                "Unverified",
                "Adj/Decline BOR- Pass",
                "Pass",
                "2nd BOR",
                "Invalid Vin",
                "Pass $",
                "Initial Offer",
                "$$toldtopass",
                "Adj/Declined BOR- Pass",
                "$To Acquire!",
                "NEEDS TEXT",
                "Close Initial Offer",
                "Archived",
                "Restored",
                "NEED FORM",
                "Waiting"
            ]
        },
        allColumnIds: {
            borEffortBoard: {
                // URL
                "text7": {
                    title: "URL",
                    type: "url",
                    editable: false
                },
                // Status
                "status": {
                    title: "Status",
                    type: "status",
                    editable: true
                },
                // Date
                "date4": {
                    title: "Date",
                    type: "date",
                    editable: true
                },
                // Vin#
                "text6": {
                    title: "Vin#",
                    type: "text",
                    editable: true
                },
                // Files
                "files": {
                    title: "Files",
                    type: "files",
                    editable: false
                },
                // MMC Offer$
                "numbers9": {
                    title: "MMC Offer$",
                    type: "number",
                    editable: true
                },
                // Seller Counter$
                "numbers7": {
                    title: "Seller Counter$",
                    type: "number",
                    editable: true
                },
                // Price$
                "numbers4": {
                    title: "Price$",
                    type: "number",
                    editable: false
                },
                // Year
                "text": {
                    title: "Year",
                    type: "text",
                    editable: false
                },
                // Vehicle
                "text_1": {
                    title: "Vehicle",
                    type: "text",
                    editable: false
                },
                // Mileage
                "text_2": {
                    title: "Mileage",
                    type: "text",
                    editable: false
                },
                // person
                "person": {
                    title: "Person",
                    type: "text",
                    editable: false,
                },
                // FB CODE
                "text84": {
                    title: "FB CODE",
                    type: "text",
                    editable: false,
                },
                // Apart From Counter
                "formula": {
                    title: "Apart From Counter",
                    type: "number",
                    editable: false
                },
                // KBB Fair$
                "numbers1": {
                    title: "KBB Fair$",
                    type: "number",
                    editable: false
                },
                // KBB TIV
                "numbers41": {
                    title: "KBB TIV",
                    type: "number",
                    editable: false
                },
                // Apart From TIV
                "formula7": {
                    title: "Apart From TIV",
                    type: "number",
                    editable: false
                },
                // Ave Mkt Price$
                "numbers6": {
                    title: "Ave Mkt Price$",
                    type: "number",
                    editable: false
                },
                // JDP $
                "numbers_19": {
                    title: "JDP $",
                    type: "number",
                    editable: false
                },
                // Ave $ MMR
                "numbers_2": {
                    title: "Ave $ MMR",
                    type: "number",
                    editable: false
                },
                // State
                "text_3": {
                    title: "State",
                    type: "text",
                    editable: false
                },
                // List Code
                "text5": {
                    title: "List Code",
                    type: "text",
                    editable: false
                },
                //  Mileage/Year
                "text61": {
                    title: "Mi/Yr",
                    type: "text",
                    editable: false
                }
            }
        }
    },

};

const db = {};
const complexes = {
    validUser: async () => {
        // return true;
        if (localStorage.getItem('Authorization')) {
            const query = `
                query {
                    me {
                        name,
                        id,
                        email
                    }
                }
            `;
            let mondayResponse = {};
            try {
                mondayResponse = await functions.mondayFetch(query);
            } catch (e) {
                return false;
            }
            if (mondayResponse.ok) {
                const mondayResponseJson = await mondayResponse.json();
                localStorage.setItem('userId', mondayResponseJson.data.me.id);
                localStorage.setItem('userName', mondayResponseJson.data.me.name || mondayResponseJson.data.me.email);
                return true;
            } else {
                // localStorage.removeItem('Authorization');
                return false;
            }
        } else {
            return false;
        }
    }
};
const functions = {
    mondayFetch: async (query, files = null, version = '2023-07') => {
        const headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('Authorization'));
        headers.append('API-Version', version);

        const formData = new FormData();
        formData.append('query', query);
        if (files) {
            formData.append('variables[file]', files);
        }
        const request = {
            method: 'POST',
            headers,
            body: formData
        }
        const mondayResponse = await fetch(
            `https://api.monday.com/v2`,
            request
        );
        return mondayResponse;
    },
    sleep: async (ms) => {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    },
    americanHour: () => {
        return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })).getHours();
    },
    showImageBigger: (e) => {
        const image = e.target;
        const url = image.src;
        const contentImage = () => {
            const content = document.createElement('div');
            content.classList = 'w-1000px h-700px';
            content.style.backgroundImage = `url(${url})`;
            content.style.backgroundSize = 'contain';
            content.style.backgroundRepeat = 'no-repeat';
            content.style.backgroundPosition = 'center';
            return content;
        };
        controllers.popup({
            state: true,
            content: contentImage(),
            options: {
                backDrop: true,
                removeButton: true,
                removeButtonSize: 70,
                backDropColor: 'rgba(0,0,0,0.5)',
            }
        })
    },
    getImageFromUrl: async (url) => {
        // get uploadable image from url
        const image = await fetch(url);
        const imageBlob = await image.blob();
        const file = new File([imageBlob], "image.jpg", { type: "image/jpeg" });
        return file;
    },
    updateSocket: async (data) => {
        globals.socket.connect();
        globals.socket.emit('update', data)
    }
};
const callbacks = {
    selectAccountMultipleChoice: async (e) => {
        const fb_id = e.target.getAttribute('data-fb_id');
        window.history.pushState({}, '', `/account/${fb_id}`);
        controllers.popup({
            state: true,
            content: popups.loader(),
            options: {
                removeButton: false,
                backDrop: false,
            }
        })
        await view();
    },

};
const popups = {
    login: ({ state }) => {
        const content = document.createElement('div');
        content.classList = 'h-300px w-500px d-flex flex-column justify-content-evenly align-items-center bg-dark box-shadow-dark border-radius-10px px-20px';
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        const loginTitle = document.createElement('div');
        loginTitle.innerText = 'Please, Provide your API token to continue!';
        loginTitle.classList = 'text-center font-header';
        const loginInput = document.createElement('input');
        let borderColor = '';
        switch (state) {
            case 'new':
                borderColor = 'white';
                break;
            case 'error':
                borderColor = 'red';
                break;
            default:
                borderColor = 'white';
        }
        loginInput.classList = `w-100p h-40px border-radius-5px bg-dark font-normal focus-outline-none line-${borderColor}-border px-5px`;
        loginInput.placeholder = 'API token';
        const loginButton = document.createElement('div');
        loginButton.classList = 'text-center font-normal cursor-pointer align-self-center bg-primary border-radius-5px p-15px';
        loginButton.innerText = 'Start with this API token';
        loginButton.addEventListener('click', async () => {
            if (loginInput.value) {
                controllers.popup({ state: true, content: popups.loader(), options: { backDrop: false, removeButton: false } });
                localStorage.setItem('Authorization', loginInput.value);
                if (await complexes.validUser()) {
                    await view();
                    controllers.popup({ state: false });
                } else {
                    controllers.popup({ state: true, content: popups.login({ state: 'error' }), options: { backDrop: false, removeButton: false } });
                }
            }
        });
        content.append(loginTitle, loginInput, loginButton);
        return content;
    },
    loader: () => {
        return components.loaderCircle({ size: 40 });
    },
    multipleChoice: ({ title, items, callback }) => {
        const content = document.createElement('div');
        content.classList = 'h-250px maxw-1000px bg-dark box-shadow-dark border-radius-10px px-5px d-flex flex-column';
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        const titleDiv = document.createElement('div');
        titleDiv.classList = 'font-header text-center text-white w-100p py-10px mt-10px';
        titleDiv.innerText = title;
        const itemsDiv = document.createElement('div');
        itemsDiv.classList = 'd-flex overflow-x-auto m-20px pb-20px';
        for (let i = 0; i < items.length; i += 5) {
            const columnHolder = document.createElement('div');
            columnHolder.classList = 'd-flex flex-column align-items-center';
            for (let j = i; j < i + 5; j++) {
                if (items[j]) {
                    const itemButton = document.createElement('button');
                    itemButton.classList = 'btn cursor-pointer border-radius-5px text-white bg-primary font-normal border-0 p-10px m-5px w-200px position-relative white-space-nowrap overflow-hidden text-overflow-ellipsis';
                    itemButton.innerText = `(${items[j].total}) ${items[j].fb_user_name}`;
                    itemButton.setAttribute('data-fb_id', items[j].fb_id);
                    // if(items[j].unseen>0){
                    //     const unseenDiv = document.createElement('div');
                    //     unseenDiv.classList = 'bg-danger border-round position-absolute top-0 right-0 font-normal text-white w-20px h-20px d-flex justify-content-center align-items-center';
                    //     unseenDiv.innerText = items[j].unseen;
                    //     itemButton.append(unseenDiv);
                    // }
                    itemButton.onclick = callback;
                    columnHolder.append(itemButton);
                }
            }
            itemsDiv.append(columnHolder);
        }
        content.append(titleDiv, itemsDiv);
        return content;
    },
    chooseStatus: ({ title, options, callback }) => {
        const content = document.createElement('div');
        content.classList = 'maxw-1000px bg-dark box-shadow-dark border-radius-10px px-5px d-flex flex-column';
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        const titleDiv = document.createElement('div');
        titleDiv.classList = 'font-header text-center text-white w-100p py-10px mt-10px';
        titleDiv.innerText = title;
        const itemsDiv = document.createElement('div');
        itemsDiv.classList = 'd-flex overflow-x-auto m-20px pb-20px thick-scrollbar';
        // console.log(options);
        for (let i = 0; i < options.length; i += 11) {
            const columnHolder = document.createElement('div');
            columnHolder.classList = 'd-flex flex-column align-items-center';
            for (let j = i; j < i + 11; j++) {
                if (options[j]) {
                    const itemButton = document.createElement('button');
                    itemButton.classList = 'btn cursor-pointer border-radius-5px bg-dark text-white box-shadow-inset font-normal border-0 p-10px m-5px w-200px position-relative white-space-nowrap overflow-hidden text-overflow-ellipsis';
                    itemButton.innerText = options[j];
                    itemButton.setAttribute('data-status', options[j]);
                    itemButton.onclick = callback;
                    columnHolder.append(itemButton);
                }
            }
            itemsDiv.append(columnHolder);
        }
        content.append(titleDiv, itemsDiv);
        return content;
    },
    warning: ({ title, message }) => {
        const content = document.createElement('div');
        content.classList = 'h-300px w-500px d-flex flex-column justify-content-evenly align-items-center bg-dark box-shadow-dark border-radius-10px px-20px';
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        const warningTitle = document.createElement('div');
        warningTitle.innerText = title;
        warningTitle.classList = 'text-center font-header';
        const warningMessage = document.createElement('div');
        warningMessage.innerText = message;
        warningMessage.classList = 'text-center font-normal';
        const warningButton = document.createElement('div');
        warningButton.classList = 'text-center font-normal cursor-pointer align-self-center bg-primary border-radius-5px p-15px';
        warningButton.innerText = 'Choose another account';
        warningButton.addEventListener('click', async () => {
            window.history.pushState({}, '', `/`);
            await view();
        });
        content.append(warningTitle, warningMessage, warningButton);
        return content;
    },
    confirmation: ({ title, message, callback }) => {
        const content = document.createElement('div');
        content.classList = 'h-300px w-500px d-flex flex-column justify-content-evenly align-items-center bg-dark box-shadow-dark border-radius-10px px-20px';
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        const warningTitle = document.createElement('div');
        warningTitle.innerText = title;
        warningTitle.classList = 'text-center font-header';
        const warningMessage = document.createElement('div');
        warningMessage.innerText = message;
        warningMessage.classList = 'text-center font-normal';
        const warningButton = document.createElement('div');
        warningButton.classList = 'text-center font-normal cursor-pointer align-self-center bg-primary border-radius-5px p-15px';
        warningButton.innerText = 'Yes';
        warningButton.addEventListener('click', async () => {
            await callback();
        });
        content.append(warningTitle, warningMessage, warningButton);
        return content;
    },
};
const dataLoads = {
    viewItemsMondayItems: async (ids) => {
        const query = `
            query{
                items(ids:[${ids.join(',')}],exclude_nonactive:false,limit:500){
                    name,
                    id,
                    state,
                    column_values(ids:["status"]){
                        text
                    },
                    board{
                        name
                    }
                }
            }
        `;
        const mondayItemsDataJSON = await functions.mondayFetch(query);
        const mondayItemsData = await mondayItemsDataJSON.json();
        const mondayItems = mondayItemsData.data.items;
        const items = [];
        for (let i = 0; i < mondayItems.length; i++) {
            const mondayItem = mondayItems[i];
            const item = {
                id: mondayItem.id,
                name: mondayItem.name,
                state: mondayItem.state,
                status: mondayItem.column_values[0].text,
                board: mondayItem.board.name,
            }
            items.push(item);
        }
        return items;
    },
    viewItemsServerIds: async () => {
        const url = new URL(window.location.href);
        const page = (url.searchParams.get('page') || 1) <= 0 ? 1 : (url.searchParams.get('page') || 1);
        if (url.searchParams.get('page') != page) {
            url.searchParams.set('page', page);
            window.history.pushState({}, null, url)
        }
        const itemFromServerJSON = await fetch('/api/viewItemsServerIds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page })
        });
        const itemFromServer = await itemFromServerJSON.json();
        const item_ids = itemFromServer.map(item => item.item_id);
        return item_ids;
    },
    uploadImage: async (url) => {
        const image = functions.getImageFromUrl(url);
        // upload file to monday.com
        const query = `
            mutation{
                add_file_to_update(update_id: 1724146845, file: "${image}"){
                    id
            }
        `;
        const responseJson = await functions.mondayFetch(query);
        const response = responseJson.json();
        // console.log(response);
    },
    facebookAccounts: async () => {
        const accountsJson = await fetch('/api/facebookAccounts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const accounts = await accountsJson.json();
        return accounts;
    },
    facebookAccountsWithDetails: async () => {
        const accountsJson = await fetch('/api/facebookAccountsWithDetails', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const accounts = await accountsJson.json();
        return accounts;
    },
    facebookAccountItemCount: async () => {
        const url = new URL(window.location.href);
        const path = url.pathname;
        const fb_id = path.split('/')[2];
        const ItemCountJSON = await fetch('/api/facebookAccountItemCount', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fb_id })
        });
        const ItemCount = await ItemCountJSON.json();
        // console.log(ItemCount);
        return ItemCount.count;
    },
    sendUpdates: async ({ item_id, body }) => {
        // body = JSON.stringify(body);
        const query = `
            mutation{
                create_update(item_id:${item_id},body:"${body}"){
                    creator{
                        name,
                        email,
                        photo_small
                    },
                    created_at,
                    text_body,
                    assets {
                        public_url
                    }
                }
            }
        `;
        const responseJSON = await functions.mondayFetch(query);
        const response = await responseJSON.json();
        if (response.data != null) {
            return response.data.create_update;
        } else {
            return null;
        }
    },
    sendMessage: async ({ message, userName }) => {
        const url = new URL(window.location.href);
        const path = url.pathname;
        const fb_id = path.split('/')[2];
        const item_id = url.searchParams.get('item_id');
        const messageJson = await fetch('/api/sendMessage', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id, message, userName, fb_id })
        });
        const messageResponse = await messageJson.json();
        return messageResponse;
    },
    changeMessagePriority: async ({ item_id, priority }) => {
        const url = new URL(window.location.href);
        const path = url.pathname;
        const fb_id = path.split('/')[2];
        const messageJson = await fetch('/api/changeMessagePriority', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id, priority, fb_id })
        });
        const messageResponse = await messageJson.json();
        return messageResponse;
    },
    accountMessages: async () => {
        const url = new URL(window.location.href);
        const path = url.pathname;
        const fb_id = path.split('/')[2];
        const userName = window.localStorage.getItem('userName');
        const itemsJson = await fetch('/api/accountMessages', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fb_id, userName })
        });
        const { items, fb_user_name } = await itemsJson.json();
        if (!fb_user_name) {
            return null;
        } else {
            const item_ids = items.map(item => item.item_id);
            const itemObj = {};
            const lastMessageObj = {};
            for (let i = 0; i < items.length; i++) {
                itemObj[items[i].item_id] = items[i].has_unread_message;
                lastMessageObj[items[i].item_id] = items[i].last_message;
            }
            // console.log(itemObj);
            // const query = `
            //     query {
            //         boards(ids:[${globals.mondayFetch.borEffortBoardId}]){
            //             items(ids:[${item_ids}],exclude_nonactive:true,limit:500){
            //                 name,
            //                 id,
            //                 column_values(ids:["${globals.mondayFetch.columnValuesIds.borEffortBoard.status}"]){
            //                     text
            //                 }
            //             }
            //         }
            //     }
            // `;
            const query = `
                query {
                    boards(ids:[${globals.mondayFetch.borEffortBoardId}]){
                        items_page(limit:500,query_params:{ids:[${item_ids}]}){
                            items{
                                name,
                                id,
                                column_values(ids:["${globals.mondayFetch.columnValuesIds.borEffortBoard.status}"]){
                                    text
                                }
                            }
                        }
                    }
                }
            `;
            const mondayItemsDataJson = await functions.mondayFetch(query);
            const mondayItemsdata = await mondayItemsDataJson.json();
            // const mondayItems = mondayItemsdata.data.boards[0].items;
            // const finalItems= [];
            const mondayItems = mondayItemsdata.data.boards[0].items_page.items;
            const finalItems = [];

            for (let i = 0; i < mondayItems.length; i++) {
                const item = {};
                item.item_id = mondayItems[i].id;
                item.fb_seller_name = mondayItems[i].name;
                item.status = mondayItems[i].column_values[0].text;
                item.has_unread_message = itemObj[mondayItems[i].id];
                item.last_message = lastMessageObj[mondayItems[i].id];
                finalItems.push(item);
            }
            if (finalItems.length > 0) {
                return { items: finalItems, fb_user_name };
            } else {
                return null;
            }
        }

    },
    singleItemMessage: async ({ force = false }) => {
        const url = new URL(window.location.href);
        const path = url.pathname;
        const fb_id = path.split('/')[2];
        const item_id = url.searchParams.get('item_id');
        // get userName from localStorage
        const userName = localStorage.getItem('userName');
        const allMessageSection = document.getElementById('allMessageSection');
        const itemInAllMessageSection = allMessageSection.querySelector(`[data-item_id="${item_id}"]`);
        if (!item_id || !itemInAllMessageSection) {
            return null;
        } else {
            const messagesDataJson = await fetch('/api/singleItemMessage', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id, force, userName })
            });
            const singleItemData = await messagesDataJson.json();
            singleItemData.fb_id = fb_id;
            return singleItemData;
        }
    },
    messageScript: async () => {
        const url = new URL(window.location.href);
        const item_id = url.searchParams.get('item_id');
        if (!item_id) {
            return null;
        } else {
            const scriptJson = await fetch('/api/messageScript', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const script = await scriptJson.json();
            return script;
        }
    },
    deleteScript: async ({ id }) => {
        const scriptJson = await fetch('/api/deleteScript', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        const script = await scriptJson.json();
        return script;
    },
    addScript: async ({ script }) => {
        const scriptJson = await fetch('/api/addScript', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ script })
        });
        const scriptResponse = await scriptJson.json();
        return scriptResponse;
    },
    updateScript: async ({ script }) => {
        const scriptJson = await fetch('/api/updateScript', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ script })
        });
        const scriptResponse = await scriptJson.json();
        return scriptResponse;
    },
    mondayItem: async () => {
        const url = new URL(window.location.href);
        const item_id = url.searchParams.get('item_id');
        const allColumnIds = Object.keys(globals.mondayFetch.allColumnIds.borEffortBoard);
        if (!item_id) {
            return null;
        } else {
            // const query = `
            //     query{
            //         boards(ids:[${globals.mondayFetch.borEffortBoardId}]){
            //             items(ids:[${item_id}]){
            //                 name,
            //                 id,
            //                 column_values(ids:[${allColumnIds.map(id=>`"${id}"`)}]){
            //                     text,
            //                     id,
            //                 },
            //                 updates{
            //                     body,
            //                     text_body,
            //                     created_at,
            //                     assets {
            //                         public_url
            //                     }
            //                     creator{
            //                         name,
            //                         email,
            //                         photo_small
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // `;
            const query = `
                query{
                    boards(ids:[${globals.mondayFetch.borEffortBoardId}]){
                    items_page(query_params:{ids:[${item_id}]}){
                        items{
                            name,
                            id,
                            column_values(ids:[${allColumnIds.map(id => `"${id}"`)}]){
                                text,
                                id,
                            },
                            updates{
                                body,
                                text_body,
                                created_at,
                                assets {
                                    public_url
                                }
                                creator{
                                    name,
                                    email,
                                    photo_small
                                }
                            }
                        }
        }
                    }
                }
            `;
            const mondayItemsDataJson = await functions.mondayFetch(query);
            const mondayItemsdata = await mondayItemsDataJson.json();
            if (mondayItemsdata.data != null) {
                // if (mondayItemsdata.data.boards[0].items.length > 0) {
                //     return mondayItemsdata.data.boards[0].items[0];
                // } else {
                //     return null;
                // }
                if (mondayItemsdata.data.boards[0].items_page.items.length > 0) {
                    return mondayItemsdata.data.boards[0].items_page.items[0];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }

    },
    deleteFilesColumnValue: async ({ item_id, column_id }) => {
        const allColumnIds = Object.keys(globals.mondayFetch.allColumnIds.borEffortBoard);
        const query = `
            mutation {
                change_column_value (
                    item_id: ${item_id},
                    column_id:"${column_id}",
                    board_id: ${globals.mondayFetch.borEffortBoardId},
                    value:"{\\"clear_all\\": true}"
                ){
                    name,
                    id,
                    column_values(ids:[${allColumnIds.map(id => `"${id}"`)}]){
                        text,
                        id,
                    },
                    updates{
                        text_body,
                        assets {
                            public_url
                        }
                        creator{
                            name,
                            email,
                            photo_small
                        }
                    }
                }
            }
        `;
        const mondayItemDataJSON = await functions.mondayFetch(query);
        const mondayItemData = await mondayItemDataJSON.json();
        return mondayItemData;
    },
    uploadFileToMondayColumn: async ({ item_id, column_id, file }) => {
        const allColumnIds = Object.keys(globals.mondayFetch.allColumnIds.borEffortBoard);
        const query = `
            mutation ($file: File!) { 
                add_file_to_column (file: $file, item_id: ${item_id}, column_id: "${column_id}") { 
                    id, 
                } 
            }
        `;
        const mondayItemDataJSON = await functions.mondayFetch(query, file);
        const mondayItemData = await mondayItemDataJSON.json();
        const mondayItem = await dataLoads.mondayItem();
        return mondayItem;

        // return mondayItemData;
    },
    updateBorEffortSimpleColumnValue: async ({ item_id, column_id, value }) => {
        const allColumnIds = Object.keys(globals.mondayFetch.allColumnIds.borEffortBoard);
        const query = `
            mutation{
                change_simple_column_value(board_id:${globals.mondayFetch.borEffortBoardId} ,item_id:${item_id},column_id:"${column_id}",value:"${value}"){
                    name,
                    id,
                    column_values(ids:[${allColumnIds.map(id => `"${id}"`)}]){
                        text,
                        id,
                    },
                    updates{
                        text_body,
                        assets {
                            public_url
                        }
                        creator{
                            name,
                            email,
                            photo_small
                        }
                    }
                }
            }
        `;
        const mondayItemsDataJson = await functions.mondayFetch(query);
        const mondayItemsdata = await mondayItemsDataJson.json();
        return mondayItemsdata;
    },
    deleteItemFromServer: async ({ item_id, fb_id }) => {
        // console.log('deleteItemFromServer');
        if (item_id) {
            const query = `
                query{
                    items(ids: [${item_id}]){
                        board{
                            id
                        }
                    }
                }
            `;
            const boardDataJSON = await functions.mondayFetch(query);
            const boardData = await boardDataJSON.json();
            const boardId = boardData.data.items[0].board.id;
            if (boardId == globals.mondayFetch.borEffortBoardId || boardId == globals.mondayFetch.appraisalCounterBoard) {
                const columnId = boardId == globals.mondayFetch.borEffortBoardId ? globals.mondayFetch.columnValuesIds.borEffortBoard.status : globals.mondayFetch.columnValuesIds.appraisalCounterBoard.status;
                const query = `
                    mutation {
                        change_simple_column_value(
                            item_id: ${item_id}, 
                            board_id: ${boardId}, 
                            column_id: "${columnId}", 
                            value: "Link Gone") {
                            id
                        }
                    }
                `;
                const itemDataJSON = await functions.mondayFetch(query);
                const itemData = await itemDataJSON.json();
                const query1 = `
                    mutation {
                        archive_item(item_id: ${item_id}) {
                            id
                        }
                    }
                `;
                const itemDataJSON1 = await functions.mondayFetch(query1);
                const itemData1 = await itemDataJSON1.json();
            }
            const deleteItem = await fetch(`/api/deleteItemFromServer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item_id: `${item_id}`,
                    fb_id: `${fb_id}`,
                })
            });
            await deleteItem.json();
        }
    },
    archiveItemOnServer: async ({ item_id, fb_id }) => {
        // console.log('archiveItemOnServer');
        if (item_id) {
            const query = `
                query{
                    items(ids: [${item_id}]){
                        board{
                            id
                        }
                    }
                }
            `;
            const boardDataJSON = await functions.mondayFetch(query);
            const boardData = await boardDataJSON.json();
            const boardId = boardData.data.items[0].board.id;
            if (boardId == globals.mondayFetch.borEffortBoardId) {
                const columnId = globals.mondayFetch.columnValuesIds.borEffortBoard.status;
                const query = `
                    mutation {
                        change_simple_column_value(
                            item_id: ${item_id}, 
                            board_id: ${boardId}, 
                            column_id: "${columnId}", 
                            value: "Archived") {
                            id
                        }
                    }
                `;
                const itemDataJSON = await functions.mondayFetch(query);
                const itemData = await itemDataJSON.json();
            }
            const archiveItem = await fetch(`/api/archiveItemOnServer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item_id: `${item_id}`,
                    fb_id: `${fb_id}`,
                })
            });
            await archiveItem.json();
        }
    },
    getAccountControls: async () => {
        const accountControls = await fetch(`/api/getAccountControls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const accountControlsData = await accountControls.json();
        return accountControlsData;
    },
    updateAccountControls: async (data) => {
        const accountControls = await fetch(`/api/updateAccountControls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        const accountControlsData = await accountControls.json();
        return accountControlsData;
    },
    getDashBoardData: async () => {
        const dashBoardData = await fetch(`/api/getDashBoardData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const dashBoardDataData = await dashBoardData.json();
        return dashBoardDataData;
    },
    getActiveItemIdsOnMonday: async (allIds) => {
        const query = `
            query{
                boards(ids:[${globals.mondayFetch.borEffortBoardId}]){
                    items_page(limit:500,ids:[${allIds.map(id => `${id}`)}]){
                        items{
                            id
                        }
                    }
                }
            }
        `;
        const mondayItemsDataJson = await functions.mondayFetch(query);
        const mondayItemsdata = await mondayItemsDataJson.json();
        // return mondayItemsdata.data.boards[0].items.map(item => item.id);
        return mondayItemsdata.data.boards[0].items_page.items.map(item => item.id);
    },
    getActivities: async () => {
        const activities = await fetch(`/api/getActivities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const activitiesData = await activities.json();
        return activitiesData;
    },
    getLaserAutovinActivities: async () => {
        const activities = await fetch(`/vauto/getLaserAutovinActivities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const activitiesData = await activities.json();
        // console.log(activitiesData)
        return activitiesData;
    },
    getAllAutomationBoardStatuses: async () => {
        const query = `
            query{
                boards(ids:["1256102324","1250230293","1255820475","4272060367","1252504293","3353179014","1256338022"]){
                    id,
                    name,
                    columns(ids:["status"]){
                        settings_str
                    },
                    groups{
                        id,
                        title,
                    }
                }
            }
        `;
        const mondayItemsDataJson = await functions.mondayFetch(query, null, '2024-01');
        const mondayItemsdata = await mondayItemsDataJson.json();
        const boards = mondayItemsdata.data.boards;
        return boards;
    },
};
const controllers = {
    ground: () => {
        const main = document.createElement('div');
        main.id = 'main';
        const popup = document.createElement('div');
        popup.id = 'popup';
        const notify = document.createElement('div');
        notify.id = 'notify';
        notify.classList = 'position-fixed right-30px top-30px zindex-8 overflow-y-auto w-200px h-100vh pointer-events-none';
        document.body.replaceChildren(main, popup, notify);
    },
    secondaryGround: () => {
        const main = document.getElementById('main');
        main.classList = 'h-100vh w-100p d-flex';
        const allMessageSection = document.createElement('div');
        allMessageSection.id = 'allMessageSection';
        allMessageSection.classList = 'minw-200px maxw-250px w-100p h-100vh d-flex flex-column p-0 m-0 box-shadow-inset-right overflow-y-auto';

        const singleMessageSection = document.createElement('div');
        singleMessageSection.id = 'singleMessageSection';
        singleMessageSection.classList = 'minw-400px maxw-600px w-100p h-100vh box-shadow-inset-right d-flex flex-column align-items-center justify-content-center text-white';

        const messageScriptSection = document.createElement('div');
        messageScriptSection.id = 'messageScriptSection';
        messageScriptSection.classList = 'minw-300px w-100p h-100vh box-shadow-inset-right overflow-y-auto';


        const mondayItemSection = document.createElement('div');
        mondayItemSection.id = 'mondayItemSection';
        mondayItemSection.classList = 'minw-400px maxw-400px w-100p h-100vh box-shadow-inset d-flex flex-column align-items-center justify-content-center text-white';

        main.replaceChildren(allMessageSection, singleMessageSection, messageScriptSection, mondayItemSection);

    },
    allMessage: (messageData) => {
        const allMessageSection = document.getElementById('allMessageSection');
        if (!messageData) {
            allMessageSection.classList.add('justify-content-center');
            allMessageSection.classList.add('align-items-center');
            allMessageSection.classList.add('text-white');
            const noMessage = document.createElement('div');
            noMessage.classList = 'text-center';
            noMessage.innerHTML = 'No item message on Bor Effort';
            const selectOtherAccount = document.createElement('button');
            selectOtherAccount.classList = 'btn cursor-pointer border-radius-5px text-white bg-primary font-normal border-0 p-10px my-5px position-relative white-space-nowrap overflow-hidden text-overflow-ellipsis';
            selectOtherAccount.innerHTML = 'Select another account';
            selectOtherAccount.addEventListener('click', async () => {
                controllers.popup({
                    state: true,
                    content: popups.loader(),
                    options: {
                        removeButton: false,
                        backDrop: false,
                    }
                })
                const accountData = await dataLoads.facebookAccountsWithDetails();
                const accountMultipleChoiceContent = popups.multipleChoice({
                    title: 'Select accounts to work with',
                    items: accountData,
                    callback: callbacks.selectAccountMultipleChoice
                });
                controllers.popup({
                    state: true,
                    content: accountMultipleChoiceContent,
                    options: {
                        backdrop: true,
                        removeButton: true
                    }
                });
            });
            allMessageSection.replaceChildren(noMessage, selectOtherAccount);
        } else {
            const filterMessageValue = new URL(window.location.href).searchParams.get('filterMessage') || 'all';
            // console.log(`filterMessage`, filterMessage);
            const header = document.createElement('div');
            header.classList = 'p-10px position-sticky top-0 bg-dark box-shadow-inset-bottom  zindex-2';
            const headerTop = document.createElement('div');
            headerTop.classList = 'd-flex justify-content-between align-items-center';
            const headerSelect = document.createElement('button');
            headerSelect.classList = 'btn cursor-pointer border-radius-5px w-100p text-white bg-primary font-normal border-0 p-10px my-5px position-relative white-space-nowrap overflow-hidden text-overflow-ellipsis';
            headerSelect.innerText = messageData.fb_user_name;
            headerSelect.addEventListener('click', async () => {
                controllers.popup({
                    state: true,
                    content: popups.loader(),
                    options: {
                        removeButton: false,
                        backDrop: false,
                    }
                });
                const accountData = await dataLoads.facebookAccountsWithDetails();
                const accountMultipleChoiceContent = popups.multipleChoice({
                    title: 'Select accounts to work with',
                    items: accountData,
                    callback: callbacks.selectAccountMultipleChoice
                });
                controllers.popup({
                    state: true,
                    content: accountMultipleChoiceContent,
                    options: {
                        backdrop: true,
                        removeButton: true
                    }
                });
            });
            const headerReload = document.createElement('button');
            headerReload.classList = 'btn border-round text-white box-shadow-inset bg-dark border-0 ml-5px w-30px h-30px font-header';
            headerReload.innerHTML = '&#8634;';
            headerReload.addEventListener('click', async () => {
                controllers.popup({
                    state: true,
                    content: popups.loader(),
                    options: {
                        removeButton: false,
                        backDrop: false,
                    }
                })
                await view();
                controllers.popup({ state: false, });
            });
            headerTop.replaceChildren(headerSelect, headerReload);
            const headerBottom = document.createElement('div');
            headerBottom.classList = 'd-flex justify-content-between align-items-center';
            const filterMessageSelect = document.createElement('select');
            filterMessageSelect.classList = 'btn text-white box-shadow-inset bg-dark border-0 ml-5px w-100p h-30px font-header';
            const filterMessageOptions = [
                { value: 'all', text: "All Messages" },
                { value: "new", text: "New Messages" },
                { value: "unanswered", text: "Unanswered Messages" },
                { value: "answered", text: "Answered Messages" },
            ];
            filterMessageOptions.forEach((option) => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.text = option.text;
                if (option.value == filterMessageValue) {
                    optionElement.selected = true;
                }
                filterMessageSelect.appendChild(optionElement);
            });
            filterMessageSelect.addEventListener('change', () => {
                controllers.messageFilterChanged(filterMessageSelect.value);
            });
            headerBottom.replaceChildren(filterMessageSelect);
            header.replaceChildren(headerTop, headerBottom);

            const body = document.createElement('div');
            body.classList = 'h-100p overflow-y-scroll box-shadow-inset-top';
            const items = messageData.items;
            // uniques statues
            const statuses = [...new Set(items.map(item => item.status))];
            // divide by statuses 
            const dividedItems = {};
            for (const item of items) {
                dividedItems[item.status] = dividedItems[item.status] || [];
                dividedItems[item.status].push(item);
            }
            for (const status of statuses) {
                const title = document.createElement('div');
                title.classList = 'py-5px px-10px text-white font-sub box-shadow-inset bg-secondary';
                title.innerText = status;
                const statusItems = dividedItems[status];
                const statusItemsContainer = document.createElement('div');
                statusItemsContainer.classList = 'p-10px d-flex flex-column';
                statusItemsContainer.setAttribute('data-status_content', status);
                for (const item of statusItems) {
                    // console.log(item);
                    const itemBox = document.createElement('div');
                    // const signal = document.createElement('div');
                    // signal.classList = 'w-10px h-10px border-round d-inline-block mr-5px position-absolute right-10px top-10px';
                    // signal.setAttribute('data-signal',(item.has_unread_message)?'unread':'read');

                    itemBox.classList = 'py-15px cursor-pointer font-normal my-5px px-5px position-relative single_message_item_archive_feature_parent';
                    itemBox.setAttribute('data-last_message', item.has_unread_message ? 'new' : item.last_message);
                    // filtering
                    itemBox.setAttribute('data-filter', 'messageFilter');
                    itemBox.setAttribute('data-visibility', 'show');
                    if (filterMessageValue == 'new') {
                        const lastMessage = itemBox.getAttribute('data-last_message');
                        if (lastMessage != 'new') {
                            itemBox.setAttribute('data-visibility', 'hide');
                        }
                    } else if (filterMessageValue == 'unanswered') {
                        const lastMessage = itemBox.getAttribute('data-last_message');
                        if (lastMessage != 'seller') {
                            itemBox.setAttribute('data-visibility', 'hide');
                        }
                    } else if (filterMessageValue == 'answered') {
                        const lastMessage = itemBox.getAttribute('data-last_message');
                        if (lastMessage != 'me') {
                            itemBox.setAttribute('data-visibility', 'hide');
                        }
                    }

                    // filtering
                    if (item.item_id == new URL(window.location.href).searchParams.get('item_id')) {
                        itemBox.setAttribute('data-selected', 'yes');
                    }
                    itemBox.setAttribute('data-item_id', item.item_id);
                    itemBox.setAttribute('data-fb_seller_name', item.fb_seller_name);

                    itemBox.innerText = item.fb_seller_name;
                    const fb_id = window.location.pathname.split('/')[2];
                    itemBox.append(components.archiveOptions({ item_id: item.item_id, fb_id: fb_id }));
                    // itemBox.append(signal);
                    itemBox.addEventListener('click', async () => {
                        window.history.pushState({}, "", `?item_id=${item.item_id}`);
                        controllers.popup({
                            state: true,
                            content: popups.loader(),
                            options: {
                                removeButton: false,
                                backDrop: false,
                            }
                        })
                        const singleItem = await dataLoads.singleItemMessage({ force: false });
                        const messageScript = await dataLoads.messageScript();
                        const mondayItem = await dataLoads.mondayItem();
                        controllers.singleItemMessage(singleItem);
                        controllers.messageScript(messageScript);
                        controllers.mondayItem({ itemData: mondayItem, choice: 'columns' });
                    });
                    statusItemsContainer.append(itemBox);
                }
                body.append(title, statusItemsContainer);
            }
            allMessageSection.replaceChildren(header, body);
        }
    },
    messageFilterChanged: (value) => {
        // update url
        const url = new URL(window.location.href);
        url.searchParams.set('filterMessage', value);
        window.history.pushState({}, "", url);
        const messageFilterItems = document.querySelectorAll('[data-filter="messageFilter"]');
        for (const item of messageFilterItems) {
            item.setAttribute('data-visibility', 'show');
            if (value == 'new') {
                const lastMessage = item.getAttribute('data-last_message');
                if (lastMessage != 'new') {
                    item.setAttribute('data-visibility', 'hide');
                }
            } else if (value == 'unanswered') {
                const lastMessage = item.getAttribute('data-last_message');
                if (lastMessage != 'seller') {
                    item.setAttribute('data-visibility', 'hide');
                }
            } else if (value == 'answered') {
                const lastMessage = item.getAttribute('data-last_message');
                if (lastMessage != 'me') {
                    item.setAttribute('data-visibility', 'hide');
                }
            }
        }

    },
    notifyLastMessageFromMe: (data) => {
        const allMessageSection = document.getElementById('allMessageSection');
        const messageItem = allMessageSection.querySelector(`[data-item_id="${data.item_id}"]`);
        if (messageItem) {
            const lastMessage = messageItem.getAttribute('data-last_message');
            if (lastMessage != 'new') {
                messageItem.setAttribute('data-last_message', 'me');
            }
        }

    },
    messageIsSeen: (data) => {
        const allMessageSection = document.getElementById('allMessageSection');
        const messageItem = allMessageSection.querySelector(`[data-item_id="${data.item_id}"]`);
        if (messageItem) {
            messageItem.setAttribute('data-last_message', data.last_message);
        }
    },
    itemRemoved: (data) => {
        const allMessageSection = document.getElementById('allMessageSection');
        const messageItem = allMessageSection.querySelector(`[data-item_id="${data.item_id}"]`);
        if (messageItem) {
            messageItem.remove();
        }
        const url = new URL(window.location.href);
        if (url.searchParams.get('item_id') == data.item_id) {
            url.searchParams.delete('item_id');
            window.history.pushState({}, `${url.href}`);
            controllers.singleItemMessage(null);
            controllers.mondayItem({ itemData: null, choice: 'columns' });
        }
    },
    singleItemMessage: (itemData) => {
        // console.log(itemData);
        functions.updateSocket({
            item_id: new URL(window.location.href).searchParams.get('item_id'),
            fb_id: new URL(window.location.href).pathname.split('/')[2],
        });
        const singleMessageSection = document.getElementById('singleMessageSection');
        if (!itemData) {
            singleMessageSection.classList = 'minw-400px maxw-600px w-100p h-100vh box-shadow-inset-right d-flex flex-column align-items-center justify-content-center text-white';
            singleMessageSection.innerText = 'Please Choose a valid Item';
            controllers.popup({ state: false });
        } else {
            const has_last_owner = itemData.has_last_owner;
            if (has_last_owner) {
                const confirmationPopup = popups.confirmation({
                    title: 'Someone is already using this Chat!',
                    message: 'Do you want to take over this chat?',
                    callback: async () => {
                        controllers.popup({
                            state: true,
                            content: popups.loader(),
                            options: {
                                removeButton: false,
                                backDrop: false,
                            }
                        });
                        const itemData = await dataLoads.singleItemMessage({ force: true })
                        controllers.singleItemMessage(itemData);
                    }
                });
                controllers.popup({
                    state: true,
                    content: confirmationPopup,
                    options: {
                        removeButton: true,
                        backDrop: false,
                    }
                });
            } else {
                singleMessageSection.classList = 'minw-400px maxw-600px w-100p h-100vh box-shadow-inset d-flex d-flex flex-column';

                const header = document.createElement('div');
                header.classList = 'p-10px position-sticky top-0 bg-dark box-shadow-inset-bottom d-flex justify-content-between align-items-center mx-5px';
                const title = document.createElement('div');
                title.classList = 'text-white font-header p-10px text-center w-100p';
                const fb_seller_name = document.querySelector(`[data-item_id="${itemData.item_id}"][data-fb_seller_name]`).getAttribute('data-fb_seller_name');
                title.innerText = fb_seller_name;
                header.append(title);
                const chat = document.createElement('div');
                chat.classList = 'h-100p overflow-y-auto box-shadow-inset-top';
                chat.id = 'singleMessageChat';
                const messages = itemData.messages;

                for (const message of messages) {
                    const messageBox = components.singleMessageOne(message);
                    chat.append(messageBox);
                }

                const footer = document.createElement('div');
                footer.classList = 'bg-dark box-shadow-inset p-0 m-0 position-relative';
                const textarea = document.createElement('textarea');
                // textarea.setAttribute('data-gramm', 'false');
                textarea.id = 'messagInputArea';
                textarea.classList = 'w-100p-n10px h-100px border-0 bg-grey text-white font-sub box-shadow-inset resize-none p-5px m-0 mb-10px';
                const sendButton = document.createElement('button');
                sendButton.classList = 'btn border-round text-white box-shadow-inset bg-dark border-0 w-50px h-50px font-normal position-absolute top-0 right-0 opacity-50';
                const sendIcon = document.createElement('span');
                sendIcon.classList = 'fs-40px line-height-50';
                sendIcon.innerHTML = '&#x203A;';
                sendButton.append(sendIcon);
                sendButton.addEventListener('click', async () => {
                    const message = textarea.value;
                    const userName = window.localStorage.getItem('userName');
                    if (message && userName) {
                        controllers.popup({
                            state: true,
                            content: popups.loader(),
                        });
                        const response = await dataLoads.sendMessage({ message, userName });
                        if (response.status == 'success') {
                            // const chat = document.getElementById('singleMessageChat');
                            // const messageBox = components.singleMessageOne({sent_from:'me',message:message,type:'text',mmc_user:userName,status:'unsent'});
                            // chat.append(messageBox);
                            controllers.notify({ data: "Message Sent", type: 'success' });
                            textarea.value = '';
                        } else {
                            // controllers.singleMessageNew({sent_from:'me',message:message,type:'text',sending:true,mmc_user:userName,status:'unsent'});
                            controllers.notify({ data: response.message, type: 'danger' });
                        }

                        controllers.popup({
                            state: false,
                            content: popups.loader(),
                        });
                    } else if (!userName) {
                        controllers.notify({ data: 'Please! Refresh the page. Cannot recongnize you!!', type: 'danger' });
                    }
                });
                footer.append(textarea, sendButton);


                singleMessageSection.replaceChildren(header, chat, footer);
                const selected = document.querySelector(`[data-item_id][data-fb_seller_name][data-selected="yes"]`);
                if (selected) {
                    selected.removeAttribute('data-selected');
                }
                document.querySelector(`[data-item_id="${itemData.item_id}"][data-fb_seller_name]`).setAttribute('data-selected', 'yes');
                controllers.popup({ state: false });
            }
        }


    },
    singleMessageNew: (messageData) => {
        const chat = document.getElementById('singleMessageChat');
        if (messageData.type == 'image') {
            const messageBox = components.singleMessageOne(messageData);
            chat.append(messageBox);
        } else if (messageData.type == 'text') {
            const sendingMessages = document.querySelectorAll(`[data-sending="yes"]`);
            for (const sendingMessage of sendingMessages) {
                if (messageData.message == sendingMessage.innerText) {
                    sendingMessage.remove();
                }
            }
            const messageBox = components.singleMessageOne(messageData);
            chat.append(messageBox);
        } else if (messageData.type == 'file') {
            const messageBox = components.singleMessageOne(messageData);
            chat.append(messageBox);
        }
    },
    messageScript: (scripts) => {

        const scriptsManipulation = (scripts, groupName) => {
            const messageScriptSection = document.getElementById('messageScriptSection');
            if (!scripts) {
                const noScript = document.createElement('div');
                noScript.classList = 'w-100p h-100p d-flex flex-column align-items-center justify-content-center text-white';
                noScript.innerText = 'No script found';
                messageScriptSection.replaceChildren(noScript);
                return;
            }

            messageScriptSection.replaceChildren();
            const header = document.createElement('div');
            header.classList = 'p-10px position-sticky top-0 bg-dark box-shadow-inset-bottom mx-5px zindex-2';
            const title = document.createElement('div');
            title.classList = 'text-white font-header p-10px text-center w-100p';
            title.innerText = 'Message Scripts';

            header.append(title);

            messageScriptSection.append(header);

            const groupBox = () => {
                // scripts of script 
                // script.options.group
                const groups = [...new Set(scripts.map(script => script.options.group))];
                const holder = document.createElement('div');
                // flex grid
                holder.classList = 'd-flex flex-wrap position-sticky top-58px zindex-3 bg-dark box-shadow-inset p-5px';

                for (const group of groups) {
                    const groupBox = document.createElement('div');
                    groupBox.classList = 'border-radius-10px box-shadow-inset bg-secondary btn p-10px m-5px cursor-pointer border-radius-5px';
                    const groupTitle = document.createElement('div');
                    groupTitle.classList = 'font-sub ';
                    if (group == groupName) {
                        groupTitle.classList.add('text-dark')
                    } else {
                        groupTitle.classList.add('text-white')
                    }
                    groupTitle.innerText = group;
                    groupBox.append(groupTitle);
                    groupBox.addEventListener('click', () => {
                        scriptsManipulation(scripts, groupName == groupBox.innerText ? null : groupBox.innerText);

                    });
                    holder.append(groupBox);
                }
                return holder;
            };
            messageScriptSection.append(groupBox());
            const addNew = () => {
                const holder = document.createElement('div');
                holder.classList = "w-100p py-10px text-center";
                const addButton = document.createElement('button');
                addButton.classList = "bg-dark text-success border-0 box-shadow-inset btn p-10px";
                addButton.onclick = () => {
                    holder.replaceWith(singleScript({
                        script: {
                            code: '',
                            content: '',
                            options: {
                                group: '',
                                name: '',
                            }
                        },
                        editing: true,
                        adding: true
                    }))
                };
                const addIcon = document.createElement('div');
                addIcon.classList = "line-height-1"
                addIcon.innerHTML = 'Add New Script'
                addButton.append(addIcon);
                holder.append(addButton);

                return holder;
            };
            if (groupName == null) {
                messageScriptSection.append(addNew());
            }
            const inputWithText = ({ height, value, text, type, tag }) => {
                const main = document.createElement('div');
                main.classList = 'w-100p d-flex flex-column justify-content-end';
                main.style.height = `${height}px`;
                const inputHolder = document.createElement('div');
                inputHolder.classList = 'w-100p position-relative';
                inputHolder.style.height = `${height - 20}px`;
                const input = document.createElement(tag || 'input');
                input.classList = 'w-100p h-100p-n10px box-shadow-inset border-0 focus-outline-none color-white px-5px pt-10px bg-transparent text-white resize-none';
                input.type = 'text';
                input.setAttribute('data-type', type);
                input.name = name;
                input.style.fontSize = `${16}px`;
                input.value = value;
                const label = document.createElement('div');
                label.classList = 'position-absolute text-dark font-sub box-shadow-inset w-max-content w-max-80p white-space-nowrap overflow-hidden text-overflow-ellipsis px-5px';
                label.style.backgroundColor = 'rgb(255, 255, 255)';
                label.style.top = `-${10}px`;
                label.style.left = '0px';
                label.style.fontSize = `${15}px`;
                label.style.lineHeight = `${18}px`;
                label.style.height = `${18}px`;
                label.innerText = text;
                inputHolder.append(input, label);
                main.append(inputHolder);
                return main;
            };
            const singleScript = ({ script, editing, adding }) => {
                let updatedScript = JSON.parse(JSON.stringify(script));
                const checkScript = () => {
                    if (JSON.stringify(updatedScript) != JSON.stringify(script)) {
                        saveButton.disabled = false;
                        saveButton.classList.remove('cursor-not-allowed', 'bg-secondary');
                        saveButton.classList.add('cursor-pointer', 'bg-primary');

                    } else {
                        saveButton.disabled = true;
                        saveButton.classList.add('cursor-not-allowed', 'bg-secondary');
                        saveButton.classList.remove('cursor-pointer', 'bg-primary');
                    }
                };
                const holder = document.createElement('div');

                const editButton = document.createElement('button');
                editButton.classList = 'btn border-round text-white box-shadow-inset bg-secondary border-0 w-30px h-30px position-absolute right-0 top-0';
                const editIcon = document.createElement('span');
                editIcon.classList = 'fs-20px line-height-1';
                editIcon.innerHTML = '&#x270E;';
                editButton.append(editIcon);
                editButton.addEventListener('click', () => {
                    holder.replaceWith(singleScript({ script, editing: true }));
                });
                const saveButton = document.createElement('button');
                saveButton.classList = 'btn border-round text-white box-shadow-inset bg-secondary border-0 w-40px h-40px';
                const saveIcon = document.createElement('span');
                saveIcon.classList = 'fs-20px line-height-1 text-white';
                saveIcon.innerHTML = '&#x2714;';
                saveButton.append(saveIcon);
                saveButton.setAttribute("disabled", "disabled");
                saveButton.addEventListener('click', async () => {
                    if (adding) {
                        const response = await dataLoads.addScript({ script: updatedScript })
                        if (response.status == 'success') {
                            script = JSON.parse(JSON.stringify(updatedScript));
                            scripts = [script, ...scripts];
                            scriptsManipulation(scripts, script.options.group);
                            controllers.notify({ data: "Script Added", type: 'success' });
                        } else {
                            controllers.notify({ data: response.message, type: 'danger' });
                        }
                        // holder.replaceWith(singleScript({script,editing:false}));
                    } else {
                        const response = await dataLoads.updateScript({ id: script.id, script: updatedScript });
                        if (response.status == 'success') {
                            script = JSON.parse(JSON.stringify(updatedScript));
                            const scriptIndex = (() => {
                                for (let i = 0; i < scripts.length; i++) {
                                    if (scripts[i].id == script.id) {
                                        return i;
                                    }
                                }
                            })();
                            scripts[scriptIndex] = script;
                            scriptsManipulation(scripts, script.options.group);
                            controllers.notify({ data: "Script Updated", type: 'success' });
                        } else {
                            controllers.notify({ data: response.message, type: 'danger' });
                        }
                        // holder.replaceWith(singleScript({script,editing:false}));
                    }
                });

                const cancelButton = document.createElement('button');
                cancelButton.classList = 'btn text-white box-shadow-inset bg-secondary p-10px border-0 border-radius-10px';
                const cancelIcon = document.createElement('span');
                cancelIcon.classList = 'fs-20px line-height-1';
                cancelIcon.innerText = 'Cancel';
                cancelButton.append(cancelIcon);
                cancelButton.addEventListener('click', () => {
                    if (adding) {
                        holder.replaceWith(addNew());
                    } else {
                        holder.replaceWith(singleScript({ script, editing: false }));
                    }

                });

                const deleteButton = document.createElement('button');
                deleteButton.classList = 'btn border-round text-white box-shadow-inset bg-secondary border-0 w-40px h-40px';
                const deleteIcon = document.createElement('span');
                deleteIcon.classList = 'fs-20px line-height-1 text-danger';
                deleteIcon.innerHTML = '&#x2716;';
                deleteButton.append(deleteIcon);
                deleteButton.addEventListener('click', async () => {
                    const confirmationPopup = popups.confirmation({
                        title: 'Are you sure?',
                        message: 'Do you want to delete this script?',
                        callback: async () => {
                            const response = await dataLoads.deleteScript({ id: script.id });
                            if (response.status == 'success') {
                                holder.remove();
                            } else {
                                controllers.notify({ data: response.message, type: 'danger' });
                            }
                            // state false
                            controllers.popup({ state: false });
                        }
                    });
                    controllers.popup({
                        state: true,
                        content: confirmationPopup,
                        options: {
                            removeButton: true,
                            backDrop: false,
                        }
                    });
                });

                if (!editing) {
                    holder.classList = 'p-5px bg-dark border-radius-5px m-5px box-shadow-inset cursor-pointer position-relative';

                    const topHolder = document.createElement('div');
                    topHolder.classList = 'show-button-on-hover';
                    const scriptTitle = document.createElement('div');
                    scriptTitle.classList = 'text-info font-sub p-5px';
                    scriptTitle.innerText = script.options.name || script.code;
                    topHolder.append(scriptTitle, editButton);
                    const scriptContent = document.createElement('div');
                    scriptContent.classList = 'text-white font-sub box-shadow-inset p-10px  cursor-pointer break-word ';
                    scriptContent.innerText = script.content;
                    scriptContent.addEventListener('click', (e) => {
                        const message = e.target.innerText;
                        const textarea = document.querySelector('#messagInputArea');
                        textarea.value = message;
                        textarea.focus();
                    });
                    holder.append(topHolder, scriptContent);
                } else {
                    holder.classList = 'p-5px bg-secondary border-radius-5px m-10px box-shadow-inset';
                    const nameValue = script.options.name;
                    const groupValue = script.options.group;
                    const codeValue = script.code;
                    const contentValue = script.content;
                    const name = inputWithText({
                        height: 60,
                        value: nameValue,
                        text: 'Name',
                        type: 'text',
                    })
                    name.oninput = (e) => {
                        updatedScript.options.name = e.target.value;
                        checkScript();
                    };
                    const group = inputWithText({
                        height: 60,
                        value: groupValue,
                        text: 'Group',
                        type: 'text',
                    });
                    group.oninput = (e) => {
                        updatedScript.options.group = e.target.value;
                        checkScript();
                    }
                    const code = inputWithText({
                        height: 60,
                        value: codeValue,
                        text: 'Code',
                        type: 'text',
                    });
                    code.oninput = (e) => {
                        updatedScript.code = e.target.value;
                        checkScript();
                    }
                    const content = inputWithText({
                        height: 200,
                        value: contentValue,
                        text: 'Content',
                        type: 'text',
                        tag: 'textarea',
                    });
                    content.oninput = (e) => {
                        updatedScript.content = e.target.value;
                        checkScript();
                    }
                    const actions = document.createElement('div');
                    actions.classList = 'd-flex justify-content-around align-items-center';
                    actions.append(adding ? '' : deleteButton, cancelButton, saveButton);
                    holder.append(name, group, code, content, actions);
                }
                return holder;
            };

            for (const script of scripts) {
                if (groupName != null) {
                    if (script.options.group != groupName) {
                        continue;
                    }
                }
                messageScriptSection.append(singleScript({ script, editing: false }));
            }

        };
        scriptsManipulation(scripts, null);




    },
    mondayItem: ({ itemData, choice }) => {
        const mondayItemSection = document.getElementById('mondayItemSection');
        if (!itemData) {
            const noItem = document.createElement('div');
            noItem.classList = 'w-100p h-100p d-flex flex-column align-items-center justify-content-center text-white';
            noItem.innerText = 'Not a valid item';
            mondayItemSection.replaceChildren(noItem);
        } else {
            console.log(itemData);
            db.mondayItem = itemData;
            const header = document.createElement('div');
            header.classList = 'position-sticky top-0 bg-dark box-shadow-inset-bottom d-flex justify-content-between align-items-center w-100p';
            const content = document.createElement('div');
            content.classList = 'h-100p overflow-y-auto box-shadow-inset-top w-100p';
            mondayItemSection.replaceChildren(header, content);
            const columnsButton = document.createElement('div');
            columnsButton.classList = 'btn w-50p font-header text-white p-20px text-center cursor-pointer';
            columnsButton.setAttribute('data-selected', 'yes');
            columnsButton.innerText = 'Columns';
            columnsButton.addEventListener('click', () => {
                buildColumns();
            });
            const updatesButton = document.createElement('div');
            updatesButton.classList = 'btn w-50p font-header text-white p-20px text-center cursor-pointer';
            updatesButton.innerText = 'Updates';
            updatesButton.addEventListener('click', () => {
                columnsButton.setAttribute('data-selected', 'yes');
                updatesButton.removeAttribute('data-selected');
                buildUpdates();
            });
            header.append(columnsButton, updatesButton);
            const buildColumns = () => {
                updatesButton.removeAttribute('data-selected');
                columnsButton.setAttribute('data-selected', 'yes');
                content.replaceChildren();
                const columnIds = Object.keys(globals.mondayFetch.allColumnIds.borEffortBoard);
                for (const columnId of columnIds) {
                    // for(const column of itemData.column_values){
                    const column = itemData.column_values.find(column => column.id == columnId);
                    const storedValue = globals.mondayFetch.allColumnIds.borEffortBoard[columnId];
                    const storedStatuses = globals.mondayFetch.allStatuses.borEffortBoard;
                    const columnBox = document.createElement('div');
                    const columnTitle = document.createElement('div');
                    columnBox.classList = 'p-10px bg-dark mx-5px d-flex justify-content-between align-items-center';
                    columnTitle.classList = 'text-white font-sub p-5px w-150px h-30px white-space-nowrap overflow-hidden text-overflow-ellipsis';
                    columnTitle.innerText = storedValue.title;
                    columnBox.append(columnTitle);

                    if (storedValue.editable) {
                        const updateValue = async (e) => {
                            const input = e.target;
                            const item_id = itemData.id;
                            const column_id = column.id;
                            const value = input.value;
                            console.log('was going to update the value');
                            console.log(`item_id: ${item_id}, column_id: ${column_id}, value: ${value}`);
                            const updateData = await dataLoads.updateBorEffortSimpleColumnValue({ item_id, column_id, value });
                            if (updateData.data == null) {
                                controllers.notify({ data: 'Item update Failed', type: 'warning' });
                            } else {
                                itemData = updateData.data.change_simple_column_value;
                                db.mondayItem = itemData;
                                controllers.notify({ data: 'Item Successfully Updated', type: 'primary' });
                            }
                        };
                        if (storedValue.type == 'status') {
                            // status with multipleChoice
                            const hiddenInput = document.createElement('input');
                            hiddenInput.type = 'hidden';
                            hiddenInput.value = column.text;
                            hiddenInput.onchange = updateValue;
                            const statusBox = document.createElement('button');
                            statusBox.classList = 'btn cursor-pointer border-radius-5px w-200px h-40px text-white bg-primary font-normal border-0 p-5px my-5px white-space-nowrap overflow-hidden text-overflow-ellipsis';
                            statusBox.innerText = column.text;
                            statusBox.addEventListener('click', () => {
                                const choiceContent = popups.chooseStatus({
                                    title: 'Select Status',
                                    options: storedStatuses,
                                    callback: async (e) => {
                                        const status = e.target.getAttribute('data-status');
                                        if (status != hiddenInput.value) {
                                            hiddenInput.value = status;
                                            hiddenInput.dispatchEvent(new Event('change'));
                                            statusBox.innerText = status;
                                        }
                                        controllers.popup({ state: false });
                                    },
                                });
                                controllers.popup({
                                    state: true,
                                    content: choiceContent,
                                    options: {
                                        backDrop: true,
                                        removeButton: true,
                                    }
                                })
                            });
                            columnBox.append(hiddenInput, statusBox);
                        } else if (storedValue.type == 'date') {
                            // editable date
                            const input = document.createElement('input');
                            input.classList = 'text-white bg-dark font-sub p-5px w-200px h-30px white-space-nowrap overflow-hidden text-overflow-ellipsis border-0 box-shadow-inset';
                            input.type = 'date';
                            input.value = `${column.text}`;
                            input.onchange = updateValue;
                            columnBox.append(input);
                        } else {
                            // text with input
                            const input = document.createElement('input');
                            input.classList = 'text-white bg-dark font-sub p-5px w-200px h-30px white-space-nowrap overflow-hidden text-overflow-ellipsis border-0 box-shadow-inset';
                            input.value = column.text;
                            input.onchange = updateValue;
                            input.type = 'text';
                            columnBox.append(input);
                            if (storedValue.type == 'number') {
                                const changeToInetger = (e) => {
                                    const target = e.target;
                                    // get digits as string
                                    const digits = target.value.replace(/[^0-9.]/g, '');
                                    target.value = digits;
                                };
                                input.onkeydown = changeToInetger;
                                input.onkeyup = changeToInetger;
                                input.onpaste = changeToInetger;
                            }
                        }
                    } else {
                        const columnValue = document.createElement('div');
                        columnValue.classList = 'position-relative text-white text-center font-sub w-200px p-5px h-30px white-space-nowrap overflow-hidden text-overflow-ellipsis align-items-center box-shadow-inset line-height-30px border-radius-5px';
                        if (storedValue.type === 'url') {
                            const link = document.createElement('a');
                            link.classList = 'text-white';
                            link.href = column.text;
                            link.target = '_blank';
                            link.innerText = column.text;
                            columnValue.append(link);
                        } else if (storedValue.type == 'files') {
                            if (column.text == '') {
                                const addButton = components.addButton({});
                                const file = document.createElement('input');
                                file.type = 'file';
                                file.multiple = false;
                                file.style.display = 'none';
                                addButton.append(file);
                                addButton.addEventListener('click', () => {
                                    file.click();
                                });

                                file.addEventListener('change', async (e) => {
                                    controllers.popup({
                                        state: true,
                                        content: popups.loader(),
                                        options: {
                                            backDrop: false,
                                            removeButton: false,
                                        }
                                    });
                                    const updateData = await dataLoads.uploadFileToMondayColumn({
                                        item_id: itemData.id,
                                        column_id: columnId,
                                        file: e.target.files[0],
                                    });

                                    itemData = updateData;
                                    controllers.notify({ data: 'Files Successfully Deleted', type: 'primary' });
                                    controllers.popup({ state: false });
                                    // console.log(updateData)
                                    buildColumns();

                                    // formdata.append("query", "mutation ($file: File!) { \n  add_file_to_column (file: $file, item_id: 3251228063, column_id: \"files\") { \n    id \n  } \n}");


                                });
                                columnValue.append(addButton);

                            } else {
                                // columnValue.classList.add = 'position-relative';
                                const files = column.text.split(',');
                                const crossButton = components.crossButton({ size: 15 });
                                console.log(files)
                                for (const file of files) {
                                    const fileLink = document.createElement('a');
                                    const fileType = file.split('.').pop();
                                    fileLink.setAttribute('data-type', fileType);
                                    fileLink.classList = 'file-icon bg-transparent mx-5px';
                                    fileLink.href = file
                                    fileLink.target = '_blank';
                                    columnValue.append(fileLink);
                                }
                                const crossButtonHolder = document.createElement('div');
                                crossButtonHolder.classList = 'position-absolute top-0 right-10px h-100p d-flex align-items-center justify-content-center';
                                crossButtonHolder.append(crossButton);
                                columnValue.append(crossButtonHolder);
                                crossButton.onclick = async () => {
                                    controllers.popup({
                                        state: true,
                                        content: popups.loader(),
                                        options: {
                                            backDrop: false,
                                            removeButton: false,
                                        }
                                    });
                                    const updateData = await dataLoads.deleteFilesColumnValue({
                                        item_id: itemData.id,
                                        column_id: columnId,
                                    });
                                    if (updateData.data == null) {
                                        controllers.notify({ data: 'File Deletion Failed', type: 'warning' });
                                    } else {
                                        itemData = updateData.data.change_column_value;
                                        controllers.notify({ data: 'Files Successfully Deleted', type: 'primary' });
                                    }
                                    controllers.popup({ state: false });
                                    // console.log(updateData)
                                    buildColumns();
                                };
                            }

                        } else {

                            columnValue.innerText = column.text;
                        }
                        columnBox.append(columnValue);
                    }

                    content.append(columnBox);
                }
            };
            const buildUpdates = () => {
                columnsButton.removeAttribute('data-selected');
                updatesButton.setAttribute('data-selected', 'yes');
                content.replaceChildren();
                const updates = itemData.updates;
                const updateBox = document.createElement('div');
                updateBox.classList = 'bg-dark box-shadow-inset h-100p-n120px overflow-y-auto w-100p';
                for (const update of updates) {
                    console.log(update);
                    const creator_name = update.creator.name || update.creator.email;
                    const creator_photo = update.creator.photo_small;
                    const singleUpdate = document.createElement('div');
                    singleUpdate.classList = 'box-shadow-inset p-10px mx-10px my-20px border-radius-5px bg-dark ';
                    const updateHeader = document.createElement('div');
                    updateHeader.classList = 'd-flex justify-content-between align-items-center p-10px box-shadow-inset';
                    const creatorPhoto = document.createElement('img');
                    creatorPhoto.classList = 'w-30px h-30px border-round';
                    creatorPhoto.src = creator_photo;
                    const creatorName = document.createElement('div');
                    creatorName.classList = 'text-white font-sub p-5px';
                    creatorName.innerText = creator_name;
                    const headerUserPart = document.createElement('div');
                    headerUserPart.classList = 'd-flex align-items-center';
                    headerUserPart.append(creatorPhoto, creatorName);
                    const headerTimePart = document.createElement('div');
                    headerTimePart.classList = 'text-white font-sub p-5px box-shadow-inset';
                    headerTimePart.innerText = (new Date(update.created_at).toLocaleString());
                    updateHeader.append(headerUserPart, headerTimePart);
                    const updateBody = document.createElement('div');
                    if (update.text_body) {
                        const textBody = document.createElement('div');
                        textBody.classList = 'text-white font-sub p-5px';
                        textBody.innerText = update.text_body;
                        updateBody.append(textBody);
                    }
                    if (update.assets.length > 0) {
                        const assets = document.createElement('div');
                        assets.classList = 'd-flex flex-wrap';
                        for (const asset of update.assets) {
                            const assetBox = document.createElement('div');
                            assetBox.classList = 'p-5px';
                            const assetImg = document.createElement('img');
                            assetImg.onclick = functions.showImageBigger;
                            assetImg.classList = 'w-100px border-radius-5px';
                            assetImg.src = asset.public_url;
                            assetBox.append(assetImg);
                            assets.append(assetBox);
                        }
                        updateBody.append(assets);
                    }
                    if (update.text_body == '' && update.assets.length == 0 && update.body != '') {
                        console.log(update.body);
                        const dynamic = document.createElement('div');
                        dynamic.classList = 'text-white font-sub p-5px d-flex flex-wrap';
                        dynamic.innerHTML = update.body;
                        const allImages = dynamic.querySelectorAll('img');
                        for (const image of allImages) {
                            image.onclick = functions.showImageBigger;
                            image.classList = 'w-100p';
                        }
                        updateBody.append(dynamic);
                        console.log()
                    }
                    singleUpdate.append(updateHeader, updateBody);
                    updateBox.append(singleUpdate);
                }
                content.append(updateBox);
                const footer = document.createElement('div');
                footer.classList = 'h-110px w-100p position-relative bottom-0 p-0';
                const footerContent = document.createElement('div');
                footerContent.classList = 'w-100p h-110px position-relative d-flex justify-content-center align-items-center p-0';
                const textarea = document.createElement('textarea');
                textarea.classList = 'w-100p-n10px h-110px border-0 bg-grey text-white font-sub box-shadow-inset resize-none p-0 m-0';
                const sendButton = document.createElement('button');
                sendButton.classList = 'btn border-round text-white box-shadow-inset bg-dark border-0 w-50px h-50px font-normal position-absolute top-0 right-0 opacity-50';
                const sendIcon = document.createElement('span');
                sendIcon.classList = 'fs-40px line-height-50';
                sendIcon.innerHTML = '&#x203A;';
                sendButton.append(sendIcon);
                sendButton.addEventListener('click', async () => {
                    const message = textarea.value;
                    if (message) {
                        const response = await dataLoads.sendUpdates({ body: message, item_id: itemData.id });
                        console.log(response);
                        if (response != null) {
                            textarea.value = '';
                            itemData.updates.unshift(response);
                            buildUpdates();
                            controllers.notify({ data: 'Update sent', type: 'success' });
                        } else {
                            controllers.notify({ data: 'Update not sent', type: 'danger' });
                        }
                    }
                });
                footerContent.append(textarea, sendButton);
                footer.append(footerContent);
                content.append(footer);
            };
            if (choice == 'columns') {
                buildColumns();
            } else if (choice == 'updates') {
                buildUpdates();
            }
        }
    },
    popup: ({ state, content, options = { backDrop: true, removeButton: true, removeButtonSize: 20, backDropColor: 'rgba(0,0,0,0)' } }) => {
        const popup = document.getElementById('popup');
        const removePopup = () => {
            popup.classList = '';
            popup.replaceChildren();
        };
        removePopup();
        if (state) {
            popup.classList = 'h-100vh w-100vw d-flex flex-column justify-content-center align-items-center position-fixed top-0 left-0 zindex-3';
            popup.style.backgroundColor = options.backDropColor;
            const popupContent = document.createElement('div');
            popupContent.append(content);
            popupContent.classList = 'position-relative';
            popup.append(popupContent);
            if (options.removeButton) {
                const crossButtonHolder = document.createElement('div');
                crossButtonHolder.classList = 'position-absolute top-0 right-0';
                crossButtonHolder.append(components.crossButton({ size: options.removeButtonSize }));
                crossButtonHolder.addEventListener('click', () => {
                    removePopup();
                });
                popupContent.append(crossButtonHolder);
            }
            if (options.backDrop) {
                popup.addEventListener('click', () => {
                    removePopup();
                });
            }
        }
    },
    notify: async ({ data, type }) => {
        const notify = document.getElementById('notify');
        const newNotification = document.createElement('div');
        newNotification.classList = 'cursor-pointer my-10px';
        const notification = document.createElement('div');
        notification.classList = 'text-white p-10px border-radius-5px opacity-80';
        notification.classList.add(`bg-${type}`);
        notification.innerText = data;
        newNotification.append(notification);
        notify.appendChild(newNotification);
        newNotification.onclick = () => {
            newNotification.remove();
        }
        await functions.sleep(3000);
        newNotification.remove();
    },
    itemArchiving: async ({ item_id, fb_id, action, force }) => {
        if (action == 'delete') {
            if (force) {
                controllers.popup({
                    state: true,
                    content: popups.loader(),
                    options: { backDrop: false, removeButton: false }
                });
                try {
                    await dataLoads.deleteItemFromServer({ item_id, fb_id });
                    controllers.notify({ data: 'Item deleted', type: 'success' });
                } catch (e) {
                    console.log(e);
                    controllers.notify({ data: 'Item not deleted', type: 'danger' });
                }
                controllers.popup({ state: false });
            } else {
                controllers.popup({
                    state: true,
                    content: popups.confirmation({
                        title: 'Delete item',
                        message: 'Are you sure? This action will delete the item from Interface and mark as Archived in Monday.com',
                        callback: async () => {
                            await controllers.itemArchiving({ item_id, fb_id, action: 'delete', force: true });
                        }
                    }),
                    options: {
                        backDrop: true,
                        removeButton: true,
                    }
                });
            }
        } else if (action == 'archive') {
            if (force) {
                controllers.popup({
                    state: true,
                    content: popups.loader(),
                    options: { backDrop: false, removeButton: false }
                });
                await dataLoads.archiveItemOnServer({ item_id, fb_id });
                controllers.popup({ state: false });
            } else {
                controllers.popup({
                    state: true,
                    content: popups.confirmation({
                        title: 'Archive item',
                        message: 'Are you sure? You will not be able to see this item unless seller message back',
                        callback: async () => {
                            await controllers.itemArchiving({ item_id, fb_id, action: 'archive', force: true });
                        }
                    }),
                    options: {
                        backDrop: true,
                        removeButton: true,
                    }
                });
            }
        }
    },
    singleAccountControl: (data) => {
        let updatedData = JSON.parse(JSON.stringify(data));
        const checkUpdates = () => {
            if (JSON.stringify(updatedData) != JSON.stringify(data)) {
                saveButton.disabled = false;
                saveButton.classList.remove('cursor-not-allowed', 'bg-secondary');
                saveButton.classList.add('cursor-pointer', 'bg-primary');

            } else {
                saveButton.disabled = true;
                saveButton.classList.add('cursor-not-allowed', 'bg-secondary');
                saveButton.classList.remove('cursor-pointer', 'bg-primary');
            }
        };
        const updateValue = (e) => {
            // e.preventDefault();
            // console.log(data);
            // console.log(updatedData);
            updatedData[e.target.name] = e.target.type == 'checkbox' ? e.target.checked : e.target.getAttribute('data-type') == 'number' ? parseInt(e.target.value) : e.target.value;
            checkUpdates();
        }
        const controlHolder = document.createElement('div');
        controlHolder.classList = 'w-400px h-100p  flex-shrink-0';
        const controlBoard = document.createElement('div');
        controlBoard.classList = 'w-100p-n40px h-100p-n40px m-20px box-shadow-inset overflow-y-auto';
        controlBoard.setAttribute('data-control', 'holder');
        const header = document.createElement('div');
        header.classList = 'd-flex justify-content-center box-shadow-inset text-white text-center align-items-center position-sticky top-0 h-40px bg-dark zindex-1';
        const deviceId = document.createElement('div');
        deviceId.innerText = data.deviceId;
        const saveButton = document.createElement('button');
        saveButton.classList = 'text-center font-normal align-self-center bg-secondary border-radius-5px p-5px h-30px position-absolute right-0 top-0 cursor-not-allowed';
        saveButton.innerText = 'Update';
        saveButton.disabled = true;
        saveButton.addEventListener('click', async (e) => {
            e.preventDefault();
            controllers.popup({
                state: true,
                content: popups.loader(),
                options: { backDrop: false, removeButton: false }
            });
            try {
                const intermediateData = JSON.parse(JSON.stringify(updatedData));
                await dataLoads.updateAccountControls(updatedData);
                data = intermediateData;
                checkUpdates();
                controllers.notify({ data: 'Account control updated', type: 'success' });
            } catch (e) {
                console.log(e);
                controllers.notify({ data: "Couldn't update properly", type: 'danger' });
            }
            controllers.popup({ state: false });
        });
        header.append(deviceId, saveButton);
        const mainSwitch = components.slideSwitchWithText({ backgroundOn: 'rgb(29, 160, 80)', value: data.mainSwitch, text: 'Main Switch', name: 'mainSwitch' });
        const mainSwitchInput = mainSwitch.querySelector('input');
        mainSwitchInput.addEventListener('change', updateValue);

        const debugSwitch = components.slideSwitchWithText({ backgroundOn: 'rgb(29, 160, 80)', value: data.debugSwitch, text: 'Debug Switch', name: 'debugSwitch' });
        const debugSwitchInput = debugSwitch.querySelector('input');
        debugSwitchInput.addEventListener('change', updateValue);

        const textEventListener = (elm, callback) => {
            elm.addEventListener('change', callback);
            elm.addEventListener('input', callback);
            elm.addEventListener('paste', callback);

        }
        const accountName = components.inputWithText({ text: 'Account Name', value: data.accountName, type: 'text', name: 'accountName' });
        const accountNameInput = accountName.querySelector('input');
        textEventListener(accountNameInput, updateValue);

        const readMessageLimit = components.inputWithText({ text: 'Read Message Limit', value: data.readMessageLimit, type: 'number', name: 'readMessageLimit' });
        const readMessageLimitInput = readMessageLimit.querySelector('input');
        textEventListener(readMessageLimitInput, updateValue);

        const readMessageDays = components.inputWithText({ text: 'Read Message Days', value: data.readMessageDays, type: 'number', name: 'readMessageDays' });
        const readMessageDaysInput = readMessageDays.querySelector('input');
        textEventListener(readMessageDaysInput, updateValue);

        const accountHourSettings = (() => {
            const mainHolder = document.createElement('div');
            mainHolder.classList = 'w-100p pt-10px box-shadow-inset';
            const regularButton = document.createElement('button');
            regularButton.classList = 'h-30px bg-secondary text-white border-radius-5px px-15px';
            regularButton.innerText = 'Regular';
            regularButton.setAttribute('data-type', 'regular');
            const weekendButton = document.createElement('button');
            weekendButton.classList = 'h-30px bg-secondary text-white border-radius-5px px-15px';
            weekendButton.innerText = 'Weekend';
            weekendButton.setAttribute('data-type', 'weekend');
            const buttonHolder = document.createElement('div');
            buttonHolder.classList = 'w-100p d-flex justify-content-around py-10px';
            buttonHolder.append(regularButton, weekendButton);
            const title = document.createElement('div');
            title.classList = 'w-100p text-center text-white fs-12px';
            title.innerText = 'Set Timeline';
            buttonHolder.append(regularButton, weekendButton);
            mainHolder.append(title, buttonHolder);

            const workHours = {
                'regular': [9, 10, 11, 12, 14, 15, 16, 17, 18],
                'weekend': [10, 11, 12, 13, 14],
                'all': [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            }
            const changeInputValues = (e) => {
                const element = e.target;
                const commonHour = 10;
                const type = element.getAttribute('data-type');
                const mainHolder = element.closest('[data-control="holder"]');
                const commonHourTime = {
                    n: mainHolder.querySelector(`[name="h${commonHour}_n"]`).value,
                    r: mainHolder.querySelector(`[name="h${commonHour}_r"]`).value,
                }
                const validHours = workHours[type];
                const allHours = workHours['all'];
                for (let i = 0; i < allHours.length; i++) {
                    const hour = allHours[i];
                    const isValidHour = validHours.includes(hour);
                    const newMessageTime = mainHolder.querySelector(`[name="h${hour}_n"]`);
                    const replyMessageTime = mainHolder.querySelector(`[name="h${hour}_r"]`);
                    const hourTime = {
                        n: newMessageTime.value,
                        r: replyMessageTime.value,
                    }
                    if (hourTime.n != commonHourTime.n || !isValidHour) {
                        newMessageTime.value = isValidHour ? commonHourTime.n : 0;
                        newMessageTime.dispatchEvent(new Event('change'));
                    }
                    if (hourTime.r != commonHourTime.r || !isValidHour) {
                        replyMessageTime.value = isValidHour ? commonHourTime.r : 0;
                        replyMessageTime.dispatchEvent(new Event('change'));
                    }
                }
            }
            regularButton.addEventListener('click', changeInputValues)
            weekendButton.addEventListener('click', changeInputValues)
            return mainHolder;
        })();


        controlBoard.append(header, mainSwitch, debugSwitch, accountHourSettings, accountName, readMessageLimit, readMessageDays);
        const updateHourlyValue = (e) => {
            const keys = e.target.name.split('_');
            const hourKey = keys[0];
            const optionKey = keys[1];
            updatedData.hourlyLimitData[hourKey][optionKey] = parseInt(e.target.value);
            checkUpdates();
        };
        let hourlyLimitData = data.hourlyLimitData;
        const hours = Object.keys(hourlyLimitData);
        for (let i = 0; i < hours.length; i++) {

            const hour = hours[i].match(/\d/g).join('');
            const hourBlockHolder = document.createElement('div');
            hourBlockHolder.classList = 'w-100p h-120px d-flex justify-content-between align-items-center box-shadow-inset';
            const title = document.createElement('div');
            title.classList = 'text-white font-normal justify-content-center text-center align-items-center d-flex w-80px h-100p box-shadow-inset bg-black';
            title.innerHTML = `${hour}:00<br>to<br>${hour}:59`;
            const inputs = document.createElement('div');
            inputs.classList = 'w-100p h-100p d-flex flex-column justify-content-between align-items-center box-shadow-inset';
            const newMessageLimit = components.inputWithText({ text: 'New Message Limit', value: hourlyLimitData[hours[i]].n, type: 'number', name: `${hours[i]}_n` });
            const newMessageLimitInput = newMessageLimit.querySelector('input');
            textEventListener(newMessageLimitInput, updateHourlyValue);

            const repliesLimit = components.inputWithText({ text: 'Replies Limit', value: hourlyLimitData[hours[i]].r, type: 'number', name: `${hours[i]}_r` });
            const repliesLimitInput = repliesLimit.querySelector('input');
            textEventListener(repliesLimitInput, updateHourlyValue);


            inputs.append(newMessageLimit, repliesLimit);
            hourBlockHolder.append(title, inputs);
            controlBoard.append(hourBlockHolder);
        }
        controlHolder.append(controlBoard);
        return controlHolder;
    },
    activityVisualizer: (data, newMessage) => {
        const hourCount = 8;
        const height = 800;
        const width = 1500;
        const holder = document.createElement('div');
        holder.style.height = `${height}px`;
        holder.style.width = `${width}px`;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList = 'box-shadow-inset';
        svg.setAttribute('height', height);
        svg.setAttribute('width', width);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

        // unique mmc_user
        const uniqueusers = data.map((d) => d.mmc_user).filter((v, i, a) => a.indexOf(v) === i && v != '' && v != null);

        const presentHour = functions.americanHour();
        // get previous 8 hours
        const hours = [];
        for (let i = 0; i < hourCount; i++) {
            const hour = `${(presentHour - i + 24) % 24}`.length == 2 ? `${(presentHour - i + 24) % 24}` : `0${(presentHour - i + 24) % 24}`;

            hours.push({
                hour: `${hour}:00`
            });
        }


        const xAxisUnit = width / (hours.length + 1);
        const yAxisUnit = height / (uniqueusers.length + 1);


        // draw y axis units
        for (let i = 0; i < uniqueusers.length; i++) {
            const y = yAxisUnit * (i) + yAxisUnit / 2;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', xAxisUnit / 2);
            text.setAttribute('y', y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('alignment-baseline', 'middle');
            text.setAttribute('fill', '#fff');
            text.innerHTML = uniqueusers[i];
            svg.append(text);
        }
        // draw x axis units
        for (let i = hours.length; i >= 1; i--) {
            const x = xAxisUnit * (hours.length - i) + xAxisUnit / 2 * 3;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', yAxisUnit * uniqueusers.length + yAxisUnit / 2);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('alignment-baseline', 'middle');
            // color white
            text.setAttribute('fill', '#fff');
            text.innerHTML = hours[i - 1].hour;
            svg.append(text);
        }
        // draw y axis lines
        for (let i = 1; i <= uniqueusers.length; i++) {
            const y = yAxisUnit * i;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 0);
            line.setAttribute('y1', y);
            line.setAttribute('x2', width);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', '#fff');
            line.setAttribute('stroke-opacity', 0.05);
            svg.append(line);
        }
        // draw x axis lines
        for (let i = 1; i <= hours.length; i++) {
            const x = xAxisUnit * i;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', 0);
            line.setAttribute('x2', x);
            line.setAttribute('y2', height);
            line.setAttribute('stroke', '#fff');
            line.setAttribute('stroke-opacity', 0.2);
            svg.append(line);
        }
        // draw data boxes
        const sectioninEachHour = 10;
        const totalHours = hours.length;
        const startingTimeStamp = Math.floor((new Date().getTime() - 60 * 60 * 1000 * (hours.length - 1)) / (3600 * 1000)) * 3600 * 1000;
        const totalSection = totalHours * sectioninEachHour;
        for (let i = 0; i < uniqueusers.length; i++) {

            const userdatas = data.filter((d) => d.mmc_user == uniqueusers[i]);
            const dataInEachSection = {};



            for (let j = 0; j < totalSection; j++) {
                const sectionStarts = startingTimeStamp + (j * 60 / sectioninEachHour * 60 * 1000);
                const sectionEnds = startingTimeStamp + ((j + 1) * 60 / sectioninEachHour * 60 * 1000);
                // difference between starts and 
                dataInEachSection[j] = userdatas.filter((d) => {
                    // console.log(`${new Date(d.timestamp*1)} #### ${new Date(sectionStarts)}`);
                    return d.timestamp > sectionStarts && d.timestamp <= sectionEnds
                }).length;

            }
            // break;
            // highest nearest 5
            const highest = Math.ceil(Math.max(...Object.values(dataInEachSection)) / 5) * 5;

            for (let j = 0; j < totalSection; j++) {
                const x = xAxisUnit * (j / sectioninEachHour + 1);
                const y = yAxisUnit * (i + 1);
                const width = xAxisUnit / sectioninEachHour;
                const height = yAxisUnit * (dataInEachSection[j] / highest);
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', x);
                rect.setAttribute('y', y - height);
                rect.setAttribute('width', width);
                rect.setAttribute('height', height);
                rect.setAttribute('fill', `rgba(255,255,255,${dataInEachSection[j] / highest})`);
                // show number on hover
                rect.setAttribute('data-number', dataInEachSection[j]);
                // hover effect
                rect.addEventListener('mouseover', function () {
                    const number = this.getAttribute('data-number');
                    const x = this.getAttribute('x');
                    const y = this.getAttribute('y');
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', x);
                    text.setAttribute('y', y);
                    text.setAttribute('text-anchor', 'middle');
                    text.setAttribute('alignment-baseline', 'middle');
                    text.setAttribute('fill', '#fff');
                    text.innerHTML = number;
                    svg.append(text);
                    this.addEventListener('mouseout', function () {
                        text.remove();
                    });
                });
                svg.append(rect);
            }
            // break;
            // console.log(highest);
        }
        // console.log(totalSection);
        let errorState = false;
        for (let i = 0; i < totalSection; i++) {
            // console.log('here');
            const sectionStarts = startingTimeStamp + (i * 60 / sectioninEachHour * 60 * 1000);
            const sectionEnds = startingTimeStamp + ((i + 1) * 60 / sectioninEachHour * 60 * 1000);
            // difference between starts and 
            const dataInSection = data.filter((d) => {
                // console.log(`${new Date(d.timestamp*1)} #### ${new Date(sectionStarts)}`);
                return d.timestamp > sectionStarts && d.timestamp <= sectionEnds
            }).length;

            // console.log(dataInSection)

            if (dataInSection == 0) {
                const newMessageInsection = newMessage.filter((d) => {
                    return d.timestamp > sectionStarts && d.timestamp <= sectionEnds
                });
                const newMessageCount = newMessageInsection.length;
                const drawErrorRect = () => {
                    const x = xAxisUnit * (i / sectioninEachHour + 1);
                    const y = yAxisUnit * (uniqueusers.length + 1);
                    const width = xAxisUnit / sectioninEachHour;
                    const height = yAxisUnit;
                    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    rect.setAttribute('x', x);
                    rect.setAttribute('y', y - height);
                    rect.setAttribute('width', width);
                    rect.setAttribute('height', height);
                    rect.setAttribute('fill', `rgba(255,0,0,0.5)`);
                    // show time on hover
                    rect.setAttribute('data-number', newMessageInsection.map((d) => new Date(d.timestamp * 1).toLocaleTimeString()).join(','));
                    // hover effect
                    rect.addEventListener('mouseover', function () {
                        const number = this.getAttribute('data-number');
                        const x = this.getAttribute('x');
                        const y = this.getAttribute('y');
                        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        text.setAttribute('x', x);
                        text.setAttribute('y', y);
                        text.setAttribute('text-anchor', 'middle');
                        text.setAttribute('alignment-baseline', 'middle');
                        text.setAttribute('fill', 'rgba(255,255,255,0.5)');
                        text.innerHTML = number;
                        svg.append(text);
                        this.addEventListener('mouseout', function () {
                            text.remove();
                        });
                    });
                    svg.append(rect);
                };
                if (errorState) {
                    console.log('here')
                    drawErrorRect();
                    // return true;
                } else if (newMessageCount > 0) {
                    // draw rect
                    errorState = true;
                    drawErrorRect();

                }
            } else {
                errorState = false;
            }
        }


        holder.append(svg);
        return holder;
    },
};
const components = {
    crossButton: ({ size = 30, options = { color: 'white' } }) => {
        const designCross = document.createElement('div');
        const crossButton = document.createElement('div');
        const designCrossFirst = document.createElement('div');
        const designCrossSecond = document.createElement('div');
        designCrossFirst.classList = 'first';
        designCrossSecond.classList = 'second';
        designCrossFirst.style.backgroundColor = options.color;
        designCrossSecond.style.backgroundColor = options.color;
        designCross.append(designCrossFirst, designCrossSecond);
        designCross.classList = 'design-cross';
        designCross.style.height = `${size}px`;
        designCross.style.width = `${size}px`;
        designCrossFirst.style.left = `${size / 2 - (size / 100 * 5)}px`;
        designCrossSecond.style.left = `${size / 2 - (size / 100 * 5)}px`;
        designCrossFirst.style.height = `${size}px`;
        designCrossSecond.style.height = `${size}px`;
        designCrossFirst.style.width = `${size / 100 * 10}px`;
        designCrossSecond.style.width = `${size / 100 * 10}px`;
        designCrossFirst.style.borderRadius = `${size / 100 * 10}px`;
        designCrossSecond.style.borderRadius = `${size / 100 * 10}px`;
        crossButton.classList = 'position-relative d-flex justify-content-center align-items-center cursor-pointer';
        crossButton.style.height = `${size}px`;
        crossButton.style.width = `${size}px`;
        crossButton.append(designCross);
        return crossButton;
    },
    addButton: ({ size = 30, options = { color: 'white' } }) => {
        const sendButton = document.createElement('span');
        sendButton.classList = 'btn cursor-pointer p-5px bg-grey opacity-50 box-shadow-inset';
        const sendIcon = document.createElement('span');
        sendIcon.style.fontSize = `${size - 10}px`;
        sendIcon.style.color = options.color;
        sendIcon.innerHTML = '+';
        sendButton.append(sendIcon);
        return sendButton;
    },
    banButton: ({ size = 30, options = { color: 'white' } }) => {
        const designBan = document.createElement('div');
        const banButton = document.createElement('div');
        const designBanFirst = document.createElement('div');
        const designBanSecond = document.createElement('div');
        designBanFirst.classList = 'first';
        designBanSecond.classList = 'second';
        designBanSecond.style.backgroundColor = options.color;
        designBan.append(designBanFirst, designBanSecond);
        designBan.classList = 'design-ban';
        designBan.style.height = `${size}px`;
        designBan.style.width = `${size}px`;
        designBanFirst.style.left = '0px';
        designBanFirst.style.top = `0px`;
        designBanFirst.style.height = `${size}px`;
        designBanFirst.style.width = `${size}px`;
        designBanFirst.style.boxShadow = `inset 0px 0px 0px ${size / 100 * 10}px ${options.color}`;
        designBanSecond.style.left = `${size / 2 - (size / 100 * 5)}px`;
        designBanSecond.style.height = `${size}px`;
        designBanSecond.style.width = `${size / 100 * 10}px`;
        designBanSecond.style.borderRadius = `${size / 100 * 10}px`;
        banButton.classList = 'position-relative d-flex justify-content-center align-items-center cursor-pointer';
        banButton.style.height = `${size}px`;
        banButton.style.width = `${size}px`;
        banButton.append(designBan);
        return banButton;
    },
    loaderCircle: ({ size = 30 }) => {
        const loaderCircle = document.createElement('div');
        loaderCircle.classList = 'loader-circle';
        loaderCircle.style.height = `${size}px`;
        loaderCircle.style.width = `${size}px`;
        loaderCircle.style.borderRadius = `${size}px`;
        loaderCircle.style.borderTop = `${size / 7.5}px solid blue`;
        loaderCircle.style.borderRight = `${size / 7.5}px solid green`;
        loaderCircle.style.borderBottom = `${size / 7.5}px solid red`;
        loaderCircle.style.borderLeft = `${size / 7.5}px solid pink`;
        return loaderCircle;
    },
    singleMessageOne: (message) => {
        console.log(message)
        const messageBox = document.createElement('div');
        messageBox.classList = 'p-10px d-flex';
        if (message.sent_from == 'seller') {
            messageBox.classList.add('justify-content-start');
        } else {
            messageBox.classList.add('justify-content-end');
            messageBox.title = message.mmc_user;
            if (message.sending == true) {
                messageBox.setAttribute('data-sending', 'yes');
            }
        }
        const messageContent = document.createElement('div');
        messageBox.append(messageContent);
        messageContent.classList = 'p-10px bg-grey font-sub w-80p border-radius-5px box-shadow-inset position-relative';

        const timebox = document.createElement('div');
        timebox.classList = 'font-10px text-grey box-shadow-inset p-5px mb-10px';
        timebox.innerText = new Date(parseInt(message.timestamp)).toLocaleString();
        messageContent.append(timebox);

        if (message.type == 'text') {
            const messageText = document.createElement('span');
            messageText.innerText = message.message;
            messageContent.append(messageText);
            // field reps unsent message
            if (message.status == 'unsent') {

                const prioritySelecttionBox = components.prioritySelecttion(message);
                messageContent.append(prioritySelecttionBox);
            }
        } else if (message.type == 'file') {
            const file = document.createElement('a');
            file.href = message.message;
            file.innerText = "View File";
            file.target = '_blank';
            messageContent.append(file);
        } else if (message.type == 'image') {
            const url = message.message;
            const image = document.createElement('img');
            image.classList = 'w-100p';
            image.src = url;
            image.onclick = functions.showImageBigger;
            const sendButton = document.createElement('div');
            sendButton.classList = 'btn cursor-pointer position-absolute right-10px top-10px p-10px border-round bg-grey opacity-50 h-30px w-30px d-flex justify-content-center align-items-center';
            const sendIcon = document.createElement('span');
            sendIcon.classList = 'fs-40px';
            sendIcon.innerHTML = '+';
            sendButton.append(sendIcon);
            sendButton.addEventListener('click', async () => {
                const message = `<img src='${url}'>`;
                if (message) {
                    controllers.popup({
                        state: true,
                        content: popups.loader(),
                        options: {
                            removeButton: false,
                            backDrop: false,
                        }
                    });
                    const url = new URL(window.location.href);
                    const item_id = url.searchParams.get('item_id');
                    const response = await dataLoads.sendUpdates({ body: message, item_id: item_id });
                    if (response != null) {
                        const mondayItemData = await dataLoads.mondayItem();
                        controllers.mondayItem({ itemData: mondayItemData, choice: 'updates' });
                        controllers.notify({ data: 'Update sent', type: 'success' });
                    } else {
                        controllers.notify({ data: 'Update not sent', type: 'danger' });
                    }
                    controllers.popup({ state: false });
                }
            });
            messageContent.append(image, sendButton);
        } else if (message.type == 'video') {
            const url = message.message;
            const video = document.createElement('video');
            video.classList = 'w-100p';
            video.src = url;
            video.controls = true;
            // playinline
            video.setAttribute('playsinline', '');
            messageContent.append(video);
        }
        return messageBox;
    },
    prioritySelecttion: ({ item_id, priority = 1 }) => {
        const prioritySelecttionBox = document.createElement('div');
        prioritySelecttionBox.classList = 'h-50px box-shadow-inset mt-10px d-flex justify-content-evenly align-items-center';
        const priorityColors = ['green', 'yellow', 'red'];
        for (i = 1; i <= 3; i++) {
            const priorityBox = document.createElement('div');
            priorityBox.classList = `h-30px w-30px border-round cursor-pointer box-shadow-inset-${priorityColors[i - 1]}`;
            priorityBox.setAttribute('data-priority', `${i}`);
            if (i == priority) {
                priorityBox.classList.add(`bg-${priorityColors[i - 1]}`);
            }
            priorityBox.addEventListener('click', async () => {
                // console.log(id);
                const response = await dataLoads.changeMessagePriority({ item_id, priority: (priorityBox.getAttribute('data-priority') * 1) });
                if (response.status == 'error') {
                    controllers.notify({ data: response.message, type: 'danger' });
                    return;
                }
                const allboxes = prioritySelecttionBox.querySelectorAll('[data-priority]');
                for (box of allboxes) {
                    const priority = box.getAttribute('data-priority') * 1;
                    box.classList.remove(`bg-${priorityColors[priority - 1]}`);
                }
                priorityBox.classList.add(`bg-${priorityColors[(priorityBox.getAttribute('data-priority') * 1) - 1]}`);
                controllers.notify({ data: "Priority Updated", type: 'success' });
            });
            prioritySelecttionBox.append(priorityBox);
        }
        return prioritySelecttionBox;
    },
    archiveOptions: ({ item_id, fb_id }) => {
        console.log(fb_id);
        const archiveHolder = document.createElement('div');
        archiveHolder.onclick = (e) => { e.stopPropagation() };
        archiveHolder.classList = 'position-absolute top-0 right-0 single_message_item_archive_feature_holder h-100p w-100px opacity-0 box-shadow-inset';
        const archiveOptions = document.createElement('div');
        archiveOptions.classList = 'd-flex justify-content-evenly align-items-center h-100p w-100p';
        const deleteButton = components.crossButton({ size: 25, options: { color: 'red' } });
        deleteButton.setAttribute('data-action', 'delete');
        deleteButton.setAttribute('data-item_id', item_id);
        deleteButton.title = 'Delete Item';
        deleteButton.onclick = async () => { await controllers.itemArchiving({ action: 'delete', item_id: item_id, fb_id }) };
        const archiveButton = components.banButton({ size: 25, options: { color: 'yellow' } });
        archiveButton.setAttribute('data-action', 'archive');
        archiveButton.setAttribute('data-item_id', item_id);
        archiveButton.title = 'Archive Item';
        archiveButton.onclick = async () => { await controllers.itemArchiving({ action: 'archive', item_id: item_id, fb_id }) };
        archiveOptions.append(archiveButton, deleteButton);
        archiveHolder.append(archiveOptions);
        return archiveHolder;
    },
    slideSwitchWithText: ({ height = 50, backgroundOn = 'skyblue', backgroundOff = 'black', value = false, text = 'Slider Status', textSize = '14', textColor = 'white', name }) => {
        const main = document.createElement('div');
        main.classList = 'position-relative w-100p d-flex flex-column justify-content-evenly align-items-center transition-1s box-shadow-inset';
        main.style.height = `${height}px`;
        const sliderText = document.createElement('div');
        sliderText.classList = 'text-center';
        sliderText.innerText = `${text}: ${value ? 'On' : 'Off'}`;
        sliderText.style.fontSize = `${textSize}px`;
        sliderText.style.color = textColor;

        const slideSwitchLabel = document.createElement('label');
        slideSwitchLabel.classList = `w-100px cursor-pointer border-radius-5px position-relative transition-1s`;

        slideSwitchLabel.style.height = `${height / 2.2}px`;
        slideSwitchLabel.style.width = `${height * 1.1}px`;
        const input = document.createElement('input');
        input.classList = 'opacity-0 w-0 h-0';
        input.name = name;
        input.type = 'checkbox';
        input.checked = value;
        const sliderHolder = document.createElement('div');
        sliderHolder.classList = `w-100p h-100p position-absolute top-0 left-0 d-flex flex-column align-items-center `;
        const slider = document.createElement('div');
        slider.classList = `position-absolute transition-p5s`;
        slider.style.height = `${height / 2.2 * 85 / 100}px`;
        slider.style.width = `${height * 1.1 * 85 / 100 / 2}px`;
        const heightDifference = height / 2.2 - height / 2.2 * 85 / 100;
        const widthDifference = height * 1.1 - height * 1.1 * 85 / 100;
        slider.style.top = `${heightDifference / 2}px`;
        slider.style.left = value ? `${widthDifference / 2 + height * 1.1 * 85 / 100 / 2}px` : `${widthDifference / 2}px`;
        sliderHolder.append(slider);
        slideSwitchLabel.append(input, sliderHolder);

        main.style.backgroundColor = value ? backgroundOn : 'transparent';
        slideSwitchLabel.style.backgroundColor = value ? backgroundOff : backgroundOn;
        slider.style.backgroundColor = value ? backgroundOn : backgroundOff;

        input.onchange = () => {
            const value = input.checked;
            slider.style.left = value ? `${widthDifference / 2 + height * 1.1 * 85 / 100 / 2}px` : `${widthDifference / 2}px`;
            main.style.backgroundColor = value ? backgroundOn : 'transparent';
            slideSwitchLabel.style.backgroundColor = value ? backgroundOff : backgroundOn;
            slider.style.backgroundColor = value ? backgroundOn : backgroundOff;
            sliderText.innerText = `${text}: ${value ? 'On' : 'Off'}`;
        };

        main.append(sliderText, slideSwitchLabel);
        return main;
    },
    inputWithText: ({ height = 60, value = '', text = 'Input Label', type = 'text', name, maxNum = 10 }) => {
        const main = document.createElement('div');
        main.classList = 'w-100p d-flex flex-column justify-content-end box-shadow-inset';
        main.style.height = `${height}px`;
        const inputHolder = document.createElement('div');
        inputHolder.classList = 'w-100p position-relative';
        inputHolder.style.height = `${height * 65 / 100}px`;
        const input = document.createElement('input');
        input.classList = 'w-100p-n10px h-100p-n10px box-shadow-inset border-0 focus-outline-none color-white px-5px pt-10px bg-transparent text-white';
        input.type = 'text';
        input.setAttribute('data-type', type);
        input.name = name;
        input.style.fontSize = `${height * 26 / 100}px`;
        input.value = value;
        if (type == 'number') {
            // turn text into number
            const changeIntoNumbers = () => {
                const text = input.value;
                const numbers = [];
                for (let i = 0; i < text.length; i++) {
                    if (text[i] >= '0' && text[i] <= '9') {
                        numbers.push(text[i]);
                    }
                }
                input.value = numbers.join('') * 1;
                if (text * 1 > maxNum) {
                    input.value = maxNum;
                }
            }
            input.oninput = changeIntoNumbers;
            input.onchange = changeIntoNumbers;
            input.onpaste = changeIntoNumbers;
        }
        const label = document.createElement('div');
        label.classList = 'position-absolute text-dark font-sub box-shadow-inset w-max-content w-max-80p white-space-nowrap overflow-hidden text-overflow-ellipsis px-5px';
        label.style.backgroundColor = 'rgb(255, 255, 255)';
        label.style.top = `-${height * 15 / 100}px`;
        label.style.left = '0px';
        label.style.fontSize = `${height * 25 / 100}px`;
        label.style.lineHeight = `${height * 30 / 100}px`;
        label.style.height = `${height * 30 / 100}px`;
        label.innerText = text;
        inputHolder.append(input, label);
        main.append(inputHolder);
        return main;
    }
}
const pages = {
    loadRawItem: async () => {
        const main = document.getElementById('main');
        main.classList = 'h-100vh d-flex flex-column justify-content-center align-items-center bg-dark';
        const text = document.createElement('span');
        text.classList = 'text-center font-header';
        text.innerText = 'Load items from monday.com';
        const groupNameInput = document.createElement('input');
        groupNameInput.classList = 'w-500px h-40px border-radius-5px bg-dark font-normal focus-outline-none line-white-border my-20px';
        groupNameInput.placeholder = 'Group name';
        // const itemCountInput = document.createElement('input');
        // itemCountInput.classList = 'w-100p h-40px border-radius-5px bg-dark font-normal focus-outline-none line-white-border px-5px';
        // itemCountInput.placeholder = 'Items count';
        // itemCountInput.type = 'number';
        const loadButton = document.createElement('button');
        loadButton.classList = 'text-center font-normal cursor-pointer align-self-center bg-primary border-radius-5px p-15px';
        loadButton.innerText = 'Load items';
        loadButton.addEventListener('click', async () => {
            const groupName = groupNameInput.value;
            // const itemCount = itemCountInput.value;
            if (groupName) {
                // globals boradId
                const query = `
                    query{
                        boards(ids:[${globals.mondayFetch.borEffortBoardId}]){
                            groups{
                                id,title
                            }
                        }
                    }
                `;
                try {
                    const mondayResponse = await functions.mondayFetch(query);
                    const mondayResponseJson = await mondayResponse.json();
                    const groups = mondayResponseJson.data.boards[0].groups;
                    const group = groups.find(group => group.title === groupName);
                    if (group) {
                        const groupId = group.id;
                        console.log(`Group id ${groupId}`);
                        const query = `
                            query{
                                boards(ids:[${globals.mondayFetch.borEffortBoardId}]){
                                    groups(ids:"${groupId}"){
                                        items_page{
                                            items{
                                                name
                                                id,
                                                column_values(ids:["${globals.mondayFetch.columnValuesIds.borEffortBoard.status}"]){
                                                    value
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        `;
                        const mondayResponse = await functions.mondayFetch(query);
                        const mondayResponseJson = await mondayResponse.json();
                        // const items = mondayResponseJson.data.boards[0].groups[0].items;
                        const items = mondayResponseJson.data.boards[0].groups[0].items_page.items;
                        // where column values is "verified"
                        items.forEach(item => {
                            console.log(`${item.id} ${item.column_values[0].value}`);
                        });
                        const verifiedItems = items.filter(item => JSON.parse(item.column_values[0].value).index == globals.mondayFetch.statuses.borEffortBoard.verified);
                        const verifiedItemIds = verifiedItems.map(item => item.id);
                        if (verifiedItemIds.length > 0) {
                            console.log(`Verified items length ${verifiedItemIds.length}`);
                            const uploadItems = await fetch('/api/uploadRawItems', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ items: verifiedItemIds })
                            });
                            if (uploadItems.status === 200) {
                                controllers.notify({ type: 'success', data: 'Items uploaded successfully' });
                            } else {
                                controllers.notify({ type: 'danger', data: 'Items upload failed' });
                            }
                        } else {
                            controllers.notify({ type: 'warning', data: 'No items found with status "verified"' });
                        }
                    } else {
                        controllers.notify({ type: 'warning', data: 'Group not found!' });
                    }
                } catch (e) {
                    controllers.notify({ type: 'danger', data: 'Error while loading items' });
                    console.log(e);
                }

            } else {
                controllers.notify({ type: 'warning', data: 'Please, provide group name and items count' });
            }
        });
        main.replaceChildren(text, groupNameInput, loadButton);
        controllers.popup({ state: false });
    },
    notFound: async () => {
        const main = document.getElementById('main');
        main.classList = 'h-100vh w-100p d-flex flex-column justify-content-center align-items-center bg-dark';
        const text = document.createElement('span');
        text.classList = 'text-center font-header';
        text.innerText = 'Sorry! I think you are in the wrong place';
        // add confused image(/public/confused.png) to page
        const image = document.createElement('img');
        image.src = '/public/picture/confused.png';
        image.classList = 'h-100px w-100px my-20px';
        // home redirect button
        const homeButton = document.createElement('button');
        homeButton.classList = 'btn text-center font-normal cursor-pointer align-self-center bg-secondary border-radius-5px p-15px';
        homeButton.innerText = 'Home';
        homeButton.addEventListener('click', async () => {
            window.history.pushState({}, null, '/');
            await view();
        });
        main.replaceChildren(text, image, homeButton);
        controllers.popup({ state: false });
    },
    singleAccount: async () => {
        controllers.secondaryGround();
        const accountData = await dataLoads.facebookAccountsWithDetails();
        const accountMultipleChoiceContent = popups.multipleChoice({
            title: 'Select accounts to work with',
            items: accountData,
            callback: callbacks.selectAccountMultipleChoice
        });
        controllers.popup({
            state: true,
            content: accountMultipleChoiceContent,
            options: {
                backdrop: false,
                removeButton: false
            }
        });
    },
    account: async () => {
        const url = new URL(window.location.href);
        const path = url.pathname;
        const fb_id = path.split('/')[2];
        controllers.secondaryGround();
        const accountItemCount = await dataLoads.facebookAccountItemCount();
        if (accountItemCount > 0) {
            const allMessageData = await dataLoads.accountMessages();
            controllers.allMessage(allMessageData);
            const item_id = url.searchParams.get('item_id');

            const singleMessageData = await dataLoads.singleItemMessage({ force: false });
            controllers.singleItemMessage(singleMessageData);
            const messageScriptData = await dataLoads.messageScript();
            controllers.messageScript(messageScriptData);
            const mondayItemdata = await dataLoads.mondayItem();
            controllers.mondayItem({ itemData: mondayItemdata, choice: 'columns' });


        } else {
            controllers.popup({
                state: true,
                content: popups.warning({
                    title: 'No items found',
                    message: 'This account has no items to work with'
                }),
                options: {
                    backdrop: true,
                    removeButton: true
                }
            });
        }
    },
    itemsView: async () => {
        const viewItemsServerIds = await dataLoads.viewItemsServerIds();
        const mondayItems = await dataLoads.viewItemsMondayItems(viewItemsServerIds);
        const main = document.getElementById('main');
        main.classList = 'd-flex flex-wrap';
        for (let i = 0; i < mondayItems.length; i++) {
            const mondayItem = mondayItems[i];
            const item = document.createElement('div');
            item.classList = 'w-300px box-shadow-inset font-normal fs-20px';
            item.innerHTML = `
                ${mondayItem.name}<br>
                ${mondayItem.id}<br>
                ${mondayItem.status}<br>
                ${mondayItem.board}<br>
                ${mondayItem.state}<br>
            `;
            const button = document.createElement('button');
            button.innerText = 'delete from database';
            button.setAttribute('data-item_id', mondayItem.id);
            button.onclick = async () => {
                const item_id = button.getAttribute('data-item_id');
                const deleteItem = await fetch('/api/deleteItemFromServer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ item_id })
                });
                if (deleteItem.status === 200) {
                    item.remove();
                }
            };
            item.append(button);
            main.append(item);
        }
        controllers.popup({ state: false });
    },
    home: async () => {
        const main = document.getElementById('main');
        main.classList = 'h-100vh w-100p d-flex flex-column justify-content-evenly align-items-center bg-dark';
        const linksData = {
            account: 'FB Chat Interface',
            loadItems: 'Add Verified items from Monday',
            accountControlLink: 'Automation Account Control',
            dashboard: 'Dashboard',
            itemsView: 'Raw Items View',
        }
        main.replaceChildren();
        for (const link in linksData) {
            const linkElement = document.createElement('a');
            linkElement.href = '/' + link;
            linkElement.classList = 'btn box-shadow-inset d-block p-20px border-radius-5px text-white link-decoration-none';
            linkElement.innerText = linksData[link];
            main.append(linkElement);
        }
        const userName = localStorage.getItem('userName');
        const admins = globals.admins;
        if (admins.includes(userName)) {
            const adminLinksData = {
                activities: 'Activities',
                laserAutovinDashboard: 'Laser Autovin Dashboard',
                laserAutovinActivities: 'Laser Autovin Activities',
                mondayManagement: 'Monday Management',
            };
            for (const link in adminLinksData) {
                const linkElement = document.createElement('a');
                linkElement.href = '/' + link;
                linkElement.classList = 'btn box-shadow-inset d-block p-20px border-radius-5px text-white link-decoration-none';
                linkElement.innerText = adminLinksData[link];
                main.append(linkElement);
            }
        }
        controllers.popup({ state: false });
    },
    accountControl: async () => {
        const main = document.getElementById('main');
        main.classList = 'h-100vh w-100p overflow-x-auto d-flex bg-dark p-30px cursor-pointer';
        let isDown = false;
        let startX;
        let scrollLeft;

        main.addEventListener('mousedown', (e) => {
            isDown = true;
            main.classList.add('cursor-grabbing');
            startX = e.pageX - main.offsetLeft;
            scrollLeft = main.scrollLeft;
        });
        main.addEventListener('mouseleave', () => {
            isDown = false;
            main.classList.remove('cursor-grabbing');
        });
        main.addEventListener('mouseup', () => {
            isDown = false;
            main.classList.remove('cursor-grabbing');
        });
        main.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - main.offsetLeft;
            const walk = (x - startX) * 1;
            main.scrollLeft = scrollLeft - walk;
        });


        const accountControlData = await dataLoads.getAccountControls();
        for (let i = 0; i < accountControlData.length; i++) {
            let hourlyLimitData = accountControlData[i].hourlyLimitData;
            hourlyLimitData = JSON.parse(hourlyLimitData);
            accountControlData[i].hourlyLimitData = hourlyLimitData;
            const singleAccountControl = controllers.singleAccountControl(accountControlData[i]);
            main.append(singleAccountControl);
        }
        controllers.popup({ state: false });
    },
    dashBoard: async () => {
        const main = document.getElementById('main');
        let dashBoardData = await dataLoads.getDashBoardData();
        const sellerRepliesCorrectionOnDashBoard = async (dashBoardData) => {
            const fb_ids = dashBoardData.map((item) => item.fb_id);
            const sellerRepliedItemId = {};
            for (let i = 0; i < dashBoardData.length; i++) {
                const item = dashBoardData[i];
                const fb_id = item.fb_id;
                sellerRepliedItemId[fb_id] = item.sellerReplies;
                item.sellerReplies = 0;
            }
            const sellerRepliedItemIds = [];
            for (const fb_id in sellerRepliedItemId) {
                sellerRepliedItemIds.push(...sellerRepliedItemId[fb_id]);
            }
            const activeSellerRepliedItemIds = await dataLoads.getActiveItemIdsOnMonday(sellerRepliedItemIds);
            for (let i = 0; i < dashBoardData.length; i++) {
                const item = dashBoardData[i];
                const fb_id = item.fb_id;
                const sellerReplies = sellerRepliedItemId[fb_id];
                for (let j = 0; j < sellerReplies.length; j++) {
                    const sellerReply = sellerReplies[j];
                    if (activeSellerRepliedItemIds.includes(sellerReply)) {
                        item.sellerReplies++;
                    }
                }
            }
            // console.log(activeSellerRepliedItemIds);
            // console.log(sellerRepliedItemId);
            // console.log(sellerRepliedItemIds);
            return dashBoardData;
        };
        dashBoardData = await sellerRepliesCorrectionOnDashBoard(dashBoardData);


        main.classList = 'w-100vw h-100vh d-flex flex-column align-items-center justify-content-center bg-dark';
        const dataSet = {
            'name': 'Account Name',
            'health': "Health",
            'sellerReplies': 'Seller Replies',
            'firstMessageInHour': 'First Message in Hour',
            'repliesInHour': 'Replies in Hour',
            'totalSentInHour': 'Total Sent in Hour',
            'firstMessageInDay': 'First Message in Day',
            'repliesInday': 'Replies in Day',
            'totalSentInDay': 'Total Sent in Day',
            'quedFirstMessage': 'Qued First Message',
            'quedReplies': 'Qued Replies',
            'redQuedReplies': 'Red',
            'yellowQuedReplies': 'Yellow',
            'greenQuedReplies': 'Green',
        }
        const dataSetKeys = Object.keys(dataSet);
        const table = document.createElement('table');
        const tableHeader = document.createElement('tr');
        for (let i = 0; i < dataSetKeys.length; i++) {
            const key = dataSetKeys[i];
            const td = document.createElement('td');
            td.innerText = dataSet[key];
            td.classList = 'text-white box-shadow-inset p-10px';
            tableHeader.append(td);
        }
        table.append(tableHeader);

        for (let i = 0; i < dashBoardData.length; i++) {
            const singleUser = dashBoardData[i];
            const tr = document.createElement('tr');
            for (let i = 0; i < dataSetKeys.length; i++) {
                const key = dataSetKeys[i];

                const td = document.createElement('td');
                if (key == 'sellerReplies') {
                    const a = document.createElement('a');
                    a.href = `/account/${singleUser.fb_id}/?filterMessage=new`;
                    a.innerText = singleUser[key];
                    td.append(a);
                } else if (key == 'health') {
                    const value = singleUser[key];
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = value;
                    input.classList = 'w-100px h-100p border-0 bg-transparent text-white';
                    input.addEventListener('change', async (e) => {
                        // setHealthMeta
                        const value = input.value;
                        const key = singleUser.name;
                        const response = await fetch('/api/setHealthMeta', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ key, value })
                        });
                        const data = await response.json();
                        // notify
                        controllers.notify({ data: data.message, type: data.status });
                    })
                    td.append(input);
                } else {
                    td.innerText = singleUser[key];
                }
                td.classList = 'text-white box-shadow-inset p-10px';
                tr.append(td);
            }
            table.append(tr);
        }
        main.append(table);
        controllers.popup({ state: false });
    },
    activities: async () => {
        const activitiesData = await dataLoads.getActivities();
        const main = document.getElementById('main');
        main.replaceChildren();
        const visual = controllers.activityVisualizer(activitiesData.fieldRepActivities, activitiesData.messageActivities);
        main.append(visual);
        // console.log(activities);
        controllers.popup({ state: false });
    },
    laserAutovinDashboard: async () => {
        const state = {
            data: [],
        };
        const getAllUsersWithData = async () => {
            try {
                const response = await fetch('/vauto/get-all-users-with-data', {
                    method: 'GET',
                });
                const data = await response.json();
                if (response.status !== 200) {
                    controllers.notify({ data: data.message, type: 'danger' });
                }
                return data;
            } catch (err) {
                console.log(err);
            }
        };
        const labelWithInput = (labelText, inputType, inputPlaceholder) => {
            const label = document.createElement('label');
            label.innerText = labelText;
            const input = document.createElement('input');
            input.setAttribute('type', inputType);
            if (inputType === 'password') {
                input.addEventListener('focus', () => {
                    input.setAttribute('type', 'text');
                });
                input.addEventListener('blur', () => {
                    input.setAttribute('type', 'password');
                });
            }
            input.setAttribute('placeholder', inputPlaceholder);
            const labelWithInput = document.createElement('div');
            labelWithInput.classList.add('label-with-input');
            labelWithInput.appendChild(label);
            labelWithInput.appendChild(input);
            return labelWithInput;
        };
        const userCard = (index) => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            const userHeaderSection = document.createElement('div');
            userHeaderSection.classList.add('user-header-section');
            const inputDiv = document.createElement('div');
            inputDiv.classList.add('input-div');
            inputDiv.appendChild(labelWithInput('Username', 'text', 'Username'));
            inputDiv.children[0].children[1].value = state.data[index].username;
            inputDiv.children[0].children[1].addEventListener('keyup', (e) => {
                const saveButton = document.querySelector(`[data-key="${index}-save"]`);
                if (e.target.value !== state.data[index].username) {
                    state.data[index].username = e.target.value;
                    saveButton.classList.remove('disabled-button');
                    saveButton.removeAttribute('disabled');
                    saveButton.classList.add('save-button');
                } else {
                    saveButton.classList.add('disabled-button');
                    saveButton.setAttribute('disabled', 'true');
                }
            });
            inputDiv.appendChild(labelWithInput('Password', 'password', 'Password'));
            inputDiv.children[1].children[1].value = state.data[index].password;
            inputDiv.children[1].children[1].addEventListener('keyup', (e) => {
                const saveButton = document.querySelector(`[data-key="${index}-save"]`);
                if (e.target.value !== state.data[index].password) {
                    state.data[index].password = e.target.value;
                    saveButton.classList.remove('disabled-button');
                    saveButton.removeAttribute('disabled');
                    saveButton.classList.add('save-button');
                } else {
                    saveButton.classList.add('disabled-button');
                    saveButton.setAttribute('disabled', 'true');
                }
            });
            inputDiv.appendChild(labelWithInput('Display Name', 'text', 'Display Name'));
            inputDiv.children[2].children[1].value = state.data[index].display_name;
            inputDiv.children[2].children[1].addEventListener('keyup', (e) => {
                const saveButton = document.querySelector(`[data-key="${index}-save"]`);
                if (e.target.value !== state.data[index].display_name) {
                    state.data[index].display_name = e.target.value;
                    saveButton.classList.remove('disabled-button');
                    saveButton.removeAttribute('disabled');
                    saveButton.classList.add('save-button');
                } else {
                    saveButton.classList.add('disabled-button');
                    saveButton.setAttribute('disabled', 'true');
                }
            });
            inputDiv.appendChild(labelWithInput('Device Id', 'text', 'Device Id'));
            inputDiv.children[3].children[1].value = state.data[index].device_id;
            inputDiv.children[3].children[1].addEventListener('keyup', (e) => {
                const saveButton = document.querySelector(`[data-key="${index}-save"]`);
                if (e.target.value !== state.data[index].device_id) {
                    state.data[index].device_id = e.target.value;
                    saveButton.classList.remove('disabled-button');
                    saveButton.removeAttribute('disabled');
                    saveButton.classList.add('save-button');
                } else {
                    saveButton.classList.add('disabled-button');
                    saveButton.setAttribute('disabled', 'true');
                }
            });
            userHeaderSection.appendChild(inputDiv);
            const userCurrent = document.createElement('div');
            userCurrent.classList.add('user-current');
            userCurrent.setAttribute('data-key', `${index}-current`);
            const currentSpan = document.createElement('span');
            currentSpan.innerText = `Current: ${state.data[index].current} / `;
            const maxSpan = document.createElement('span');
            maxSpan.innerText = `${state.data[index].max}`;
            maxSpan.setAttribute('contenteditable', 'true');
            maxSpan.style.minWidth = '50px';
            maxSpan.style.display = 'inline-block';
            maxSpan.addEventListener('keyup', (e) => {
                const getNumber = e.target.innerText.match(/\d+/g) || 0;
                if (state.data[index].current <= parseInt(getNumber)) {
                    maxSpan.innerText = parseInt(getNumber);
                    const saveButton = document.querySelector(`[data-key="${index}-save"]`);
                    if (e.target.innerText !== state.data[index].max) {
                        state.data[index].max = parseInt(getNumber);
                        saveButton.classList.remove('disabled-button');
                        saveButton.removeAttribute('disabled');
                        saveButton.classList.add('save-button');
                    } else {
                        saveButton.classList.add('disabled-button');
                        saveButton.setAttribute('disabled', 'true');
                    }
                } else {
                    maxSpan.innerText = state.data[index].current;
                }
            });
            const saveButton = document.createElement('button');
            saveButton.innerText = 'Save';
            saveButton.classList.add('disabled-button');
            saveButton.setAttribute('data-key', `${index}-save`);
            saveButton.setAttribute('disabled', 'true');
            saveButton.addEventListener('click', async () => {
                console.log(state.data[index]);
                console.log(`/vauto/update-data/${state.data[index].id}`);
                const response = await fetch(`/vauto/update-data/${state.data[index].id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(state.data[index]),
                });

                const data = await response.json();
                if (response.status !== 200) {
                    controllers.notify({ data: data.message, type: 'danger' });
                } else {
                    controllers.notify({ data: data.message, type: 'success' });
                    saveButton.classList.add('disabled-button');
                    saveButton.setAttribute('disabled', 'true');
                }
            });
            userCurrent.appendChild(currentSpan);
            userCurrent.appendChild(maxSpan);
            userCurrent.appendChild(saveButton);
            userHeaderSection.appendChild(userCurrent);
            userCard.appendChild(userHeaderSection);
            return userCard;
        };
        const singleBar = (index, parsedTimeData, key, max) => {
            const singleBar = document.createElement('div');
            singleBar.classList.add('single-bar');
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.setAttribute('data-key', `${index}-${key}-bar`);
            bar.style.height = `${parsedTimeData[key] / max * 100}%`;
            singleBar.appendChild(bar);
            return singleBar;
        };
        const barChartDiv = (index) => {
            const { time_data: parsedTimeData, current, max } = state.data[index];
            const barChartDiv = document.createElement('div');
            barChartDiv.classList.add('bar-chart-div');
            barChartDiv.style.height = '300px';
            const barChart = document.createElement('div');
            barChart.classList.add('bar-chart');
            Object.keys(parsedTimeData).forEach(key => {
                barChart.appendChild(singleBar(index, parsedTimeData, key, max));
            });
            barChartDiv.appendChild(barChart);
            const chartText = document.createElement('div');
            chartText.classList.add('chart-text');
            Object.keys(parsedTimeData).forEach(key => {
                const singleChartText = document.createElement('div');
                singleChartText.classList.add('single-chart-text');

                const chartControlDiv = document.createElement('div');
                chartControlDiv.classList.add('chart-control-div');
                chartControlDiv.appendChild(barChangeButton(index, key, '-'));
                const counter = document.createElement('span');
                counter.classList.add('counter');
                counter.innerText = state.data[index].time_data[key];
                counter.setAttribute('data-key', `${index}-${key}`);
                chartControlDiv.appendChild(counter);
                chartControlDiv.appendChild(barChangeButton(index, key, '+'));

                singleChartText.appendChild(chartControlDiv);
                singleChartText.appendChild(barLabelDiv(key));

                chartText.appendChild(singleChartText);
            });
            barChartDiv.appendChild(chartText);
            Array(6).fill(0).forEach((_, i) => {
                const barChartLine = document.createElement('div');
                barChartLine.classList.add('bar-chart-line');
                barChartLine.style.bottom = `${(i) * 20}%`;
                barChart.appendChild(barChartLine);
                const count = document.createElement('div');
                count.style.position = 'absolute';
                count.style.left = '-10px';
                count.style.bottom = '-10px';
                barChartLine.appendChild(count);
                count.innerText = parseInt(max * (i) / 5);
            });
            return barChartDiv;
        };
        const barLabelDiv = (key) => {
            const barText = document.createElement('div');
            barText.classList.add('bar-text');
            barText.innerText = parseInt(key.replace('h', '')) > 12 ? `${parseInt(key.replace('h', '')) - 12}:00 PM` : `${parseInt(key.replace('h', ''))}:00 AM`;
            return barText;
        }
        const barChangeButton = (index, key, type) => {
            const data = state.data[index];
            const barChangeButton = document.createElement('button');
            barChangeButton.classList.add('bar-change-button');
            barChangeButton.innerText = type;
            barChangeButton.addEventListener('click', () => {
                const counterDiv = document.querySelector(`[data-key="${index}-${key}"]`);
                const bar = document.querySelector(`[data-key="${index}-${key}-bar"]`);
                const current = document.querySelector(`[data-key="${index}-current"] span:first-child`);
                if (type === '+') {
                    const total = Object.keys(data.time_data).reduce((acc, key) => acc + data.time_data[key], 0);
                    if (total >= data.max) return;
                    state.data[index].time_data[key]++;
                    state.data[index].current++;
                    counterDiv.innerText = state.data[index].time_data[key];
                    bar.style.height = `${state.data[index].time_data[key] / state.data[index].max * 100}%`;
                    current.innerText = `Current: ${total + 1} / `;
                    const saveButton = document.querySelector(`[data-key="${index}-save"]`);
                    saveButton.classList.remove('disabled-button');
                    saveButton.removeAttribute('disabled');
                    saveButton.classList.add('save-button');
                } else {
                    if (state.data[index].time_data[key] <= 0) return;
                    state.data[index].time_data[key]--;
                    state.data[index].current--;
                    counterDiv.innerText = state.data[index].time_data[key];
                    bar.style.height = `${state.data[index].time_data[key] / state.data[index].max * 100}%`;
                    const total = Object.keys(data.time_data).reduce((acc, key) => acc + data.time_data[key], 0);
                    current.innerText = `Current: ${total} / `;
                    const saveButton = document.querySelector(`[data-key="${index}-save"]`);
                    saveButton.classList.remove('disabled-button');
                    saveButton.removeAttribute('disabled');
                    saveButton.classList.add('save-button');
                }
            });
            return barChangeButton;
        };
        const body = document.querySelector('#main');
        const dashboardPage = document.createElement('div');
        dashboardPage.classList.add('dashboard-page');
        const dashboardHeader = document.createElement('div');
        dashboardHeader.classList.add('dashboard-header');
        const dashboardPageTitle = document.createElement('h1');
        dashboardPageTitle.classList.add('dashboard-page-title');
        dashboardPageTitle.innerText = 'Laser Autovin';
        const response = await getAllUsersWithData();
        console.log(response);
        state.data = response.map(dt => ({ ...dt, time_data: JSON.parse(dt.time_data) }));
        dashboardHeader.appendChild(dashboardPageTitle);
        dashboardPage.appendChild(dashboardHeader);
        state.data.forEach((user, index) => {
            const userCardDiv = userCard(index);
            userCardDiv.appendChild(barChartDiv(index));
            dashboardPage.appendChild(userCardDiv);
        });

        body.replaceChildren(dashboardPage);
        controllers.popup({ state: false });
    },
    laserAutovinActivities: async () => {
        const activitiesData = await dataLoads.getLaserAutovinActivities();
        const main = document.getElementById('main');
        main.replaceChildren();
        const visual = controllers.activityVisualizer(activitiesData.fieldRepActivities, activitiesData.messageActivities);
        main.append(visual);
        // console.log(activities);
        controllers.popup({ state: false });
    },
    mondayManagement: async () => {
        const main = document.getElementById('main');
        main.classList = 'h-100vh w-100p d-flex justify-content-center align-items-center bg-dark';
        const setupSection = document.createElement('div');
        setupSection.classList = 'w-700px h-100p box-shadow-inset bg-dark position-relative overflow-y-auto';
        main.append(setupSection);
        // getAllAutomationBoardStatuses
        const allAutomationBoardStatuses = await dataLoads.getAllAutomationBoardStatuses();
        const topSection = document.createElement('div');
        topSection.classList = 'position-sticky top-0 box-shadow-inset bg-dark';
        const title = document.createElement('div');
        title.classList = 'w-100p h-50px d-flex justify-content-center align-items-center text-white fs-20px';
        title.innerText = 'Automation Management';
        const addingSection = document.createElement('div');
        addingSection.classList = 'p-10px';
        // automation adding text
        const currentBoardSpan = document.createElement('span');
        const span1 = document.createElement('span');
        span1.classList = 'text-white fs-30px line-height-40px';
        span1.innerText = 'If an item of';
        // const setSelectToSelectedValue = (select)=>{
        //     const getTextWidth = (text, font)=>{
        //         const canvas = document.createElement('canvas');
        //         const context = canvas.getContext('2d');
        //         context.font = font || getComputedStyle(document.body).font;

        //         const metrics = context.measureText(text);
        //         return metrics.width;
        //     }
        //     const selectedOption = select.options[select.selectedIndex];
        //     const textWidth = getTextWidth(selectedOption.text, select.style.font);

        //     // Set the width of the select element based on the width of the selected option's text
        //     select.style.width = textWidth*1.5 + 'px';
        // }
        const currentBoardSelect = document.createElement('select');
        currentBoardSelect.name = 'currentBoard';
        currentBoardSelect.classList = 'text-center fs-20px bg-dark font-normal focus-outline-none border-0 mx-10px border-bottom-1px px-5px dropdown-appearance-none';
        currentBoardSpan.append(span1, currentBoardSelect);
        // setSelectToSelectedValue(select1);
        // select1.onchange = ()=>{
        //     setSelectToSelectedValue(select1);
        // };

        const statusSpan = document.createElement('span');
        const span2 = document.createElement('span');
        span2.classList = 'text-white fs-30px line-height-40px';
        span2.innerText = ' has ';
        const statusSelect = document.createElement('select');
        statusSelect.classList = 'text-center fs-20px bg-dark font-normal focus-outline-none border-0 mx-10px border-bottom-1px px-5px dropdown-appearance-none';
        statusSelect.name = 'status';
        const span3 = document.createElement('span');
        span3.classList = 'text-white fs-30px line-height-40px';
        span3.innerText = 'status';
        statusSpan.append(span2, statusSelect, span3);


        const destinationBoardSpan = document.createElement('span');
        const span4 = document.createElement('span');
        span4.classList = 'text-white fs-30px line-height-40px';
        span4.innerText = ', then move item to';
        const destinationBoardSelect = document.createElement('select');
        destinationBoardSelect.name = 'destinationBoard';
        destinationBoardSelect.classList = 'text-center fs-20px bg-dark font-normal focus-outline-none border-0 mx-10px border-bottom-1px px-5px dropdown-appearance-none';
        destinationBoardSpan.append(span4, destinationBoardSelect)

        const groupSpan = document.createElement('span');
        const span5 = document.createElement('span');
        span5.classList = 'text-white fs-30px line-height-40px';
        span5.innerText = ' inside group';
        const groupSelect = document.createElement('select');
        groupSelect.name = 'group';
        groupSelect.classList = 'text-center fs-20px bg-dark font-normal focus-outline-none border-0 mx-10px border-bottom-1px px-5px dropdown-appearance-none';
        const span6 = document.createElement('span');
        span6.classList = 'text-white fs-30px line-height-40px';
        span6.innerText = '.';
        groupSpan.append(span5, groupSelect, span6);

        const timeSpan = document.createElement('span');
        const span7 = document.createElement('span');
        span7.classList = 'text-white fs-30px line-height-40px';
        span7.innerText = ' Do it every ';
        const timeSelect = document.createElement('select');
        timeSelect.name = 'time';
        timeSelect.classList = 'text-center fs-20px bg-dark font-normal focus-outline-none border-0 mx-10px border-bottom-1px px-5px dropdown-appearance-none';
        const span8 = document.createElement('span');
        span8.classList = 'text-white fs-30px line-height-40px';
        span8.innerText = ' .';
        timeSpan.append(span7, timeSelect, span8);

        const addButton = document.createElement('button');
        addButton.classList = 'btn bg-secondary text-white border-radius-5px p-10px mx-auto w-150px mt-20px';
        addButton.innerText = 'Add Automation';
        addButton.onclick = async () => {
            const currentBoardSelectValue = currentBoardSelect.value;
            const statusSelectValue = statusSelect.value;
            const destinationBoardSelectValue = destinationBoardSelect.value;
            const groupSelectValue = groupSelect.value;
            const timeSelectValue = timeSelect.value;
            if (currentBoardSelectValue == '' || statusSelectValue == '' || destinationBoardSelectValue == '' || groupSelectValue == '' || timeSelectValue == '') {
                controllers.notify({ data: 'Please fill all fields', type: 'danger' });
                return;
            }
            const data = JSON.stringify({
                currentBoardSelectValue,
                statusSelectValue,
                destinationBoardSelectValue,
                groupSelectValue,
                timeSelectValue
            });

            const response = await fetch('/api/addAutomationMeta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data })
            });
            const responseData = await response.json();
            controllers.notify({ data: responseData.message, type: responseData.status });
            const newAutomation = document.createElement('div');
            newAutomation.innerText = generateAutomationText(responseData.id, currentBoardSelectValue, statusSelectValue, destinationBoardSelectValue, groupSelectValue, timeSelectValue);
            allAutomationSection.append(newAutomation);
        }

        const generateAutomationText = (id, currentBoardSelectValue, statusSelectValue, destinationBoardSelectValue, groupSelectValue, timeSelectValue) => {
            const currentBoardName = (() => {
                try {
                    return allAutomationBoardStatuses.find(status => status.id == currentBoardSelectValue).name
                } catch (e) {
                    return 'UNDEFINED';
                }
            })();
            const statusName = (() => {
                try {
                    return JSON.parse(allAutomationBoardStatuses.find(status => status.id == currentBoardSelectValue).columns[0].settings_str).labels[statusSelectValue]
                } catch (e) {
                    return 'UNDEFINED';
                }
            })();
            // const destinationBoardName = allAutomationBoardStatuses.find(status=>status.id==destinationBoardSelectValue).name;
            const destinationBoardName = (() => {
                try {
                    return allAutomationBoardStatuses.find(status => status.id == destinationBoardSelectValue).name
                } catch (e) {
                    return 'UNDEFINED';
                }
            })();
            // const groupName = allAutomationBoardStatuses.find(status=>status.id==destinationBoardSelectValue).groups.find(group=>group.id==groupSelectValue).title;
            const groupName = (() => {
                try {
                    return allAutomationBoardStatuses.find(status => status.id == destinationBoardSelectValue).groups.find(group => group.id == groupSelectValue).title
                } catch (e) {
                    return 'UNDEFINED';
                }
            })();
            // globals.automationTimes
            const timeName = (() => {
                try {
                    return globals.automationTimes.find(time => time.value == timeSelectValue).title
                } catch (e) {
                    return 'UNDEFINED';
                }
            })();
            const automationText = `If an item of <span class="text-style-underline">${currentBoardName}</span> has <span class="text-style-underline">${statusName}</span> status, then move item to <span class="text-style-underline">${destinationBoardName}</span> inside group <span class="text-style-underline">${groupName}</span>. Do it every <span class="text-style-underline">${timeName}</span>.`;
            const automationTextDiv = document.createElement('div');
            automationTextDiv.classList = 'text-white fs-20px line-height-30px';
            automationTextDiv.innerHTML = automationText;

            const deleteButton = document.createElement('button');
            deleteButton.classList = 'btn bg-secondary text-white border-radius-5px p-10px mx-auto w-150px mt-20px';
            // delete icon html entity
            deleteButton.innerHTML = '&#10006;';
            const automationDiv = document.createElement('div');
            automationDiv.classList = 'd-flex justify-content-center align-items-center';
            automationDiv.append(automationTextDiv, deleteButton);
            deleteButton.onclick = async () => {
                const response = await fetch('/api/deleteAutomationMeta', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id })
                });
                const responseData = await response.json();
                controllers.notify({ data: responseData.message, type: responseData.status });
                automationDiv.remove();
            }


            allAutomationSection.append(automationDiv);
        }
        addingSection.append(currentBoardSpan, statusSpan, destinationBoardSpan, groupSpan, timeSpan, addButton);
        const updateChanges = (e) => {
            if (currentBoardSelect.value == '') {
                statusSelect.value = '';
                destinationBoardSelect.value = '';
                groupSelect.value = '';
                timeSelect.value = '';
                statusSelect.replaceChildren();
                destinationBoardSelect.replaceChildren();
                groupSelect.replaceChildren();
                timeSelect.replaceChildren();
                statusSpan.style.display = 'none';
                destinationBoardSpan.style.display = 'none';
                groupSpan.style.display = 'none';
                timeSpan.style.display = 'none';
                addButton.style.display = 'none';
                for (let i = 0; i < allAutomationBoardStatuses.length; i++) {
                    if (i == 0) {
                        const option = document.createElement('option');
                        option.value = '';
                        option.innerText = 'Select Board';
                        option.disabled = true;
                        option.selected = true;
                        currentBoardSelect.append(option);
                    }
                    const status = allAutomationBoardStatuses[i];
                    const option = document.createElement('option');
                    option.value = status.id;
                    option.innerText = status.name;
                    currentBoardSelect.append(option);
                }
                return;
            } else {
                if (e?.target?.name == 'currentBoard') {
                    statusSelect.value = '';
                    destinationBoardSelect.value = '';
                    groupSelect.value = '';
                    timeSelect.value = '';
                    statusSelect.replaceChildren();
                    destinationBoardSelect.replaceChildren();
                    groupSelect.replaceChildren();
                    timeSelect.replaceChildren();
                    statusSpan.style.display = 'none';
                    destinationBoardSpan.style.display = 'none';
                    groupSpan.style.display = 'none';
                    timeSpan.style.display = 'none';
                }
                statusSpan.style.display = 'inline';
            }
            const currentBoardSelectValue = currentBoardSelect.value;
            if (statusSelect.value == '') {
                destinationBoardSelect.value = '';
                groupSelect.value = '';
                timeSelect.value = '';
                destinationBoardSelect.replaceChildren();
                groupSelect.replaceChildren();
                timeSelect.replaceChildren();
                destinationBoardSpan.style.display = 'none';
                groupSpan.style.display = 'none';
                timeSpan.style.display = 'none';
                addButton.style.display = 'none';
                const statuses = JSON.parse(allAutomationBoardStatuses.find(status => status.id == currentBoardSelectValue).columns[0].settings_str).labels;
                const statusIds = Object.keys(statuses);
                for (let i = 0; i < statusIds.length; i++) {
                    if (i == 0) {
                        const option = document.createElement('option');
                        option.value = '';
                        option.innerText = 'Select Status';
                        option.disabled = true;
                        option.selected = true;
                        statusSelect.append(option);
                    }
                    const status = statuses[statusIds[i]];
                    const option = document.createElement('option');
                    option.value = statusIds[i];
                    option.innerText = status;
                    statusSelect.append(option);
                }
                return;
            } else {
                if (e?.target?.name == 'status') {
                    destinationBoardSelect.value = '';
                    groupSelect.value = '';
                    timeSelect.value = '';
                    destinationBoardSelect.replaceChildren();
                    groupSelect.replaceChildren();
                    timeSelect.replaceChildren();
                    destinationBoardSpan.style.display = 'none';
                    groupSpan.style.display = 'none';
                    timeSpan.style.display = 'none';
                }
                destinationBoardSpan.style.display = 'inline';
            }

            const statusSelectValue = statusSelect.value;
            if (destinationBoardSelect.value == '') {
                groupSelect.value = '';
                timeSelect.value = '';
                groupSelect.replaceChildren();
                timeSelect.replaceChildren();
                groupSpan.style.display = 'none';
                timeSpan.style.display = 'none';
                addButton.style.display = 'none';
                // remove currentBoardSelect value from destinationBoardSelect
                const destinationBoards = allAutomationBoardStatuses.filter(status => status.id != currentBoardSelectValue);
                for (let i = 0; i < destinationBoards.length; i++) {
                    if (i == 0) {
                        const option = document.createElement('option');
                        option.value = '';
                        option.innerText = 'Select Board';
                        option.disabled = true;
                        option.selected = true;
                        destinationBoardSelect.append(option);
                    }
                    const board = destinationBoards[i];
                    const option = document.createElement('option');
                    option.value = board.id;
                    option.innerText = board.name;
                    destinationBoardSelect.append(option);
                }
                return;
            } else {
                if (e?.target?.name == 'destinationBoard') {
                    groupSelect.value = '';
                    timeSelect.value = '';
                    groupSelect.replaceChildren();
                    timeSelect.replaceChildren();
                    groupSpan.style.display = 'none';
                    timeSpan.style.display = 'none';
                }
                groupSpan.style.display = 'inline';
            }

            const destinationBoardSelectValue = destinationBoardSelect.value;
            if (groupSelect.value == '') {
                timeSelect.value = '';
                timeSelect.replaceChildren();
                timeSpan.style.display = 'none';
                addButton.style.display = 'none';
                const groups = allAutomationBoardStatuses.find(status => status.id == destinationBoardSelectValue).groups;
                for (let i = 0; i < groups.length; i++) {
                    if (i == 0) {
                        const option = document.createElement('option');
                        option.value = '';
                        option.innerText = 'Select Group';
                        option.disabled = true;
                        option.selected = true;
                        groupSelect.append(option);
                    }
                    const group = groups[i];
                    const option = document.createElement('option');
                    option.value = group.id;
                    option.innerText = group.title;
                    groupSelect.append(option);
                }
                return;
            } else {
                if (e?.target?.name == 'group') {
                    timeSelect.value = '';
                    timeSelect.replaceChildren();
                    timeSpan.style.display = 'none';
                }
                timeSpan.style.display = 'inline';
            }

            const groupSelectValue = groupSelect.value;
            if (timeSelect.value == '') {
                timeSelect.replaceChildren();
                // 30 seconds, 1min, 2 min, 5min, 10 min, 30 min, 1hh ..{title: "30 seconds", value: 30}

                const times = globals.automationTimes;
                for (let i = 0; i < times.length; i++) {
                    if (i == 0) {
                        const option = document.createElement('option');
                        option.value = '';
                        option.innerText = 'Select Time';
                        option.disabled = true;
                        option.selected = true;
                        timeSelect.append(option);
                    }
                    const time = times[i];
                    const option = document.createElement('option');
                    option.value = time.value;
                    option.innerText = time.title;
                    timeSelect.append(option);
                }
                return;
            } else {
                addButton.style.display = 'block';
            }



        };
        updateChanges();
        currentBoardSelect.onchange = updateChanges;
        statusSelect.onchange = updateChanges;
        destinationBoardSelect.onchange = updateChanges;
        groupSelect.onchange = updateChanges;
        timeSelect.onchange = updateChanges;


        topSection.append(title, addingSection);

        const allAutomationSection = document.createElement('div');
        allAutomationSection.classList = 'p-10px mt-30px';
        const allAutomations = await fetch('/api/getAllAutomationMeta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const allAutomationsData = await allAutomations.json();
        for (let i = 0; i < allAutomationsData.length; i++) {
            const automation = JSON.parse(allAutomationsData[i].value);
            console.log(automation)
            const automationDiv = generateAutomationText(allAutomationsData[i].id, automation.currentBoardSelectValue, automation.statusSelectValue, automation.destinationBoardSelectValue, automation.groupSelectValue, automation.timeSelectValue);
            allAutomationSection.append(automationDiv);
        }
        setupSection.append(topSection, allAutomationSection);
        controllers.popup({ state: false });

    },
};
// window.history.pushState({}, '', `/account/${fb_id}`);
const view = async () => {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const userName = localStorage.getItem('userName');
    const admins = globals.admins;
    if (path == '/') {
        await pages.home();
    } else if (path == '/loadItems' || path == '/loadItems/') {
        await pages.loadRawItem();
    } else if (path == '/account' || path == '/account/') {
        await pages.singleAccount();
    } else if (path.match(/\/account\/\d+/)) {
        await pages.account();
    } else if (path == '/itemsView' || path == '/itemsView/') {
        await pages.itemsView();
    } else if (path == '/accountControlLink' || path == '/accountControlLink/') {
        await pages.accountControl();
    } else if (path == '/dashboard' || path == '/dashboard/') {
        await pages.dashBoard();
    } else if ((path == '/activities' || path == '/activities/') && admins.includes(userName)) {
        await pages.activities();
    } else if ((path == '/laserAutovinDashboard' || path == '/laserAutovinDashboard/') && admins.includes(userName)) {
        await pages.laserAutovinDashboard();
    } else if ((path == '/laserAutovinActivities' || path == '/laserAutovinActivities/') && admins.includes(userName)) {
        await pages.laserAutovinActivities();
    } else if ((path == '/mondayManagement' || path == '/mondayManagement/') && admins.includes(userName)) {
        await pages.mondayManagement();
    } else {
        await pages.notFound();
    }
};

(async () => {
    controllers.ground();
    controllers.popup({ state: true, content: popups.loader(), options: { backDrop: false, removeButton: false } });
    if (await complexes.validUser()) {
        await view();
    } else {
        controllers.popup({ state: true, content: popups.login({ state: 'new' }), options: { backDrop: false, removeButton: false } });
    }
    window.onpopstate = async () => {
        await view();
    }
})();
globals.socket.on('response', async (response) => {
    const { action, data } = response;
    switch (action) {
        case 'newMessageFromMe':
            controllers.singleMessageNew(data);
            break;
        case 'notifyLastMessageFromMe':
            controllers.notifyLastMessageFromMe(data);
            break;
        case 'messageIsSeen':
            controllers.messageIsSeen(data);
            break;
        case 'itemRemoved':
            controllers.itemRemoved(data);
            break;
    }
});




