!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define(t)
		: ((e = "undefined" != typeof globalThis ? globalThis : e || self).Card3d = t());
})(this, function () {
	"use strict";
	const e = [],
		t = { delta: 10, perspective: 500, startX: 0, startY: 0, glareOpacity: 0.5, axis: "all", scale: 1 };
	class n {
		constructor(n, i = {}) {
			(this.card3dElement = n),
				(this.config = i),
				(this.gyroOrigin = null),
				e.push({ element: n, instance: this }),
				(this.config = Object.assign({}, t, this.config)),
				this.config.stop ? this.stop() : this.start();
		}
		updateConfig(e = {}) {
			(this.config = Object.assign({}, t, e)), this.config.stop ? this.stop() : (this.stop(), this.start());
		}
		removeEventListener() {
			this.focusElement.removeEventListener("mousemove", this.eventMouseMoove),
				this.focusElement.removeEventListener("mouseout", this.eventMouseOut),
				this.config.gyroscopie && window.removeEventListener("deviceorientation", this.eventDeviceOrientation);
		}
		setupEventListener() {
			(this.eventMouseMoove = (e) => this.mousemove(e)),
				(this.eventMouseOut = () => this.mouseout()),
				this.focusElement.addEventListener("mousemove", this.eventMouseMoove),
				this.config.noReset || this.focusElement.addEventListener("mouseout", this.eventMouseOut),
				this.config.gyroscopie &&
					((this.eventDeviceOrientation = (e) => this.gyro(e)), window.addEventListener("deviceorientation", this.eventDeviceOrientation));
		}
		gyro(e) {
			const t = e.beta,
				n = e.gamma;
			"number" == typeof n && "number" == typeof t && this.mousemove({ clientY: t / 45, clientX: n / 45, gyroscopie: !0 });
		}
		stop() {
			const t = o(this.card3dElement);
			e.splice(t, 1), this.card3dElement.setAttribute("data-card3d-stop", "true"), this.reset();
		}
		reset() {
			(this.card3dElement.style.transform = ""),
				(this.card3dElement.style.transition = ""),
				this.glareElement && this.glareElement.remove(),
				this.removeEventListener();
		}
		applyGlare() {
			(this.glareElement = document.createElement("span")),
				this.glareElement.setAttribute(
					"style",
					"\n        will-change: transform;\n        position: absolute;\n        background-image: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);\n        pointer-event: none; \n        transform-origin: 0% 0%;\n        transform: translate(-50%, -50%) rotate(180deg);\n        opacity: 0;\n        z-index: 999;\n        "
				),
				this.card3dElement.appendChild(this.glareElement);
		}
		start() {
			(this.focusElement = this.config.fullPageListening ? document.body : this.card3dElement),
				this.setupEventListener(),
				this.config.glare && this.applyGlare(),
				(this.card3dElement.style.overflow = "hidden"),
				(this.card3dElement.style.willChange = "transform"),
				(this.card3dElement.style.transform = `\n        perspective(500px) \n        rotateX(${this.config.startY}deg) \n        rotateY(${this.config.startX}deg)\n        `);
		}
		mousemove(e) {
			if (!this.card3dElement.isConnected || !this.focusElement.isConnected) return void this.stop();
			this.card3dElement.style.transition = "";
			const t = this.config,
				n = t.reverse ? 1 : -1,
				i = this.card3dElement.getBoundingClientRect(),
				s = i.width / 2,
				o = i.height / 2,
				r = i.left + s,
				a = i.top + o,
				l = -1 * (r - e.clientX),
				d = a - e.clientY,
				c = this.focusElement !== this.card3dElement ? window.innerWidth / 2 : i.width / 2,
				h = this.focusElement !== this.card3dElement ? window.innerHeight / 2 : i.height / 2;
			let u = 0,
				g = 0;
			if (
				("gyroscopie" in e
					? (this.gyroOrigin || (this.gyroOrigin = { x: e.clientX, y: e.clientY }),
					  (u = (this.gyroOrigin.x - e.clientX) * t.delta),
					  (g = (this.gyroOrigin.y - e.clientY) * t.delta))
					: ("y" !== t.axis && (u = (l / c) * t.delta), "x" !== t.axis && (g = (d / h) * t.delta)),
				t.glare)
			) {
				const n = Math.atan2(e.clientX - r, -(e.clientY - a)) * (180 / Math.PI),
					s = 2 * (i.width > i.height ? i.width : i.height);
				(this.glareElement.style.opacity = t.glareOpacity.toString()),
					(this.glareElement.style.left = "50%"),
					(this.glareElement.style.top = "50%"),
					(this.glareElement.style.width = s + "px"),
					(this.glareElement.style.height = s + "px"),
					(this.glareElement.style.transform = `rotate(${n}deg) translate(-50%, -50%)`),
					(this.glareElement.style.display = "block");
			}
			this.card3dElement.style.transform = `\n        perspective(${t.perspective}px) \n        rotateX(${g * n}deg) \n        rotateY(${
				u * n
			}deg)\n        scale(${t.scale})\n        `;
		}
		mouseout() {
			(this.card3dElement.style.transition = "0.5s ease"),
				(this.card3dElement.style.transform = ""),
				this.glareElement && (this.glareElement.style.opacity = "0");
		}
	}
	function i(e) {
		return null != e && ("" === e || "true" === e);
	}
	function s(e) {
		const t = parseFloat(e);
		return isNaN(t) || "number" != typeof t ? void 0 : t;
	}
	function o(t) {
		return e.findIndex((e) => e.element === t);
	}
	function r(e) {
		var n, o, r, a, l, d;
		const c = e.dataset,
			h = i(c.card3dFullPageListening),
			u = i(c.card3dNoReset),
			g = i(c.card3dGlare),
			m = i(c.card3dReverse),
			f = i(c.card3dStop),
			p = i(c.card3dGyroscopie),
			v = null !== (n = s(c.card3dDelta)) && void 0 !== n ? n : t.delta,
			y = null !== (o = s(c.card3dPerspective)) && void 0 !== o ? o : t.perspective,
			E = null !== (r = s(c.card3dStartX)) && void 0 !== r ? r : t.startX,
			b = null !== (a = s(c.card3dStartY)) && void 0 !== a ? a : t.startY,
			w = null !== (l = s(c.card3dGlare)) && void 0 !== l ? l : t.glareOpacity,
			x = null !== (d = s(c.card3dScale)) && void 0 !== d ? d : t.scale;
		let O = "all";
		return (
			"x" === c.card3dAxis ? (O = "x") : "y" === c.card3dAxis && (O = "y"),
			{
				gyroscopie: p,
				stop: f,
				scale: x,
				delta: v,
				axis: O,
				noReset: u,
				reverse: m,
				fullPageListening: h,
				perspective: y,
				startX: E,
				startY: b,
				glare: g,
				glareOpacity: w,
			}
		);
	}
	function a(e) {
		var t, s;
		for (const a of e) {
			const e = -1 !== o(a),
				l = void 0 === (null === (t = a.dataset) || void 0 === t ? void 0 : t.card3d),
				d = i(null === (s = a.dataset) || void 0 === s ? void 0 : s.card3dStop);
			e || d || l || new n(a, r(a));
		}
	}
	return (
		document.addEventListener("DOMContentLoaded", function () {
			a(document.querySelectorAll("[data-card3d]")),
				new MutationObserver(function (t) {
					var n;
					const s = [];
					for (const a of null != t ? t : []) {
						if ("attributes" === a.type && a.attributeName.includes("data-card3d")) {
							const t = a.target,
								l = o(t),
								d = -1 !== l;
							i(null === (n = t.dataset) || void 0 === n ? void 0 : n.card3d) && -1 === l
								? s.push(t)
								: d && e[l].instance.updateConfig(r(e[l].element));
						}
						for (const e of a.addedNodes) s.push(e);
						for (const t of a.removedNodes) {
							const n = o(t);
							-1 !== n && e.splice(n, 1);
						}
					}
					s.length > 0 && a(s);
				}).observe(window.document.documentElement, { childList: !0, subtree: !0, attributes: !0 });
		}),
		n
	);
});
//# sourceMappingURL=card3d.js.map
