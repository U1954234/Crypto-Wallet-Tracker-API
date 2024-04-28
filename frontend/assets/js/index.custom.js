const sidebarLinksWithDropdown = document.querySelectorAll(".v-main-link-container:has(.v-is-dropdown) .v-sidebar-link");
const backdrop = document.querySelector(".v-right-nav #v-backdrop");
const allTogglers = document.querySelectorAll("[data-target]");
const allToggleReceivers = document.querySelectorAll("[data-receiver]");
const allNotifTabs = document.querySelectorAll(".v-noti-dropdown [data-target]");
const mobileMenuToggler = document.querySelector(".v-right-nav .v-mobile-menu-toggler");
const sideBar = document.querySelector(".v-menu-sidebar");
const allTabsAndPillsButtonsTogglers = document.querySelectorAll(".v-menu-sidebar .nav-pills [data-bs-toggle='pill']");
const goBackToggler = document.querySelector("#v-main .v-go-back");
const dropdownTogglers = document.querySelectorAll("[data-v-target]");
const allCardTabPanes = document.querySelectorAll("#v-cards-tab-content .v-tab-pane-inner");

if (goBackToggler) {
	goBackToggler.addEventListener("click", function () {
		window.history.back();
	});
}

function checkLength(elementArray) {
	if (elementArray && elementArray.length) return true;
}
function hideElement(element, state = "active") {
	if (!element) {
		return;
	}
	element.classList.remove(state);
}
function showElement(element, state = "active") {
	if (element) {
		element.classList.add(state);
	}
}

function handleDropdownToggle(e) {
	e.stopPropagation();
	const target = this.getAttribute("data-v-target");
	if (target) {
		const dropdowns = document.querySelectorAll(`[data-v-receiver]`);
		dropdowns.forEach((currentDropdown) => {
			const attr = currentDropdown.getAttribute("data-v-receiver");
			if (attr === target) {
				if (currentDropdown.classList.contains("active")) {
					hideElement(currentDropdown, "active");
				} else {
					showElement(currentDropdown, "active");
				}
			} else {
				hideElement(currentDropdown, "active");
			}
		});
	}
}

function checkIfEleHasClassList(element) {
	if (element && element.classList.contains("active")) {
		return true;
	}
}

if (checkLength(document.querySelectorAll("[data-v-receiver]"))) {
	document.querySelectorAll("[data-v-receiver]").forEach((dropdown) => {
		const dropdownAttr = dropdown.getAttribute("data-v-receiver");
		const dropdownToggler = document.querySelector(`[data-v-target='${dropdownAttr}']`);
		const childrenButtons = dropdown.querySelectorAll("button");
		const childrenLiTags = dropdown.querySelectorAll("li");
		if (checkLength(childrenButtons) || checkLength(childrenLiTags)) {
			const arrayOfChildren = childrenButtons || childrenLiTags;
			arrayOfChildren.forEach((child) => {
				child.addEventListener("click", function () {
					if (checkIfEleHasClassList(dropdown) || checkIfEleHasClassList(dropdownToggler)) {
						hideElement(dropdown);
						hideElement(dropdownToggler);
					}
				});
			});
		}
	});
}

if (checkLength(dropdownTogglers)) {
	dropdownTogglers.forEach((toggler) => {
		toggler.addEventListener("click", handleDropdownToggle);
	});
}

function closeSideBarIfOpen() {
	if (!sideBar.classList.contains("active")) return;
	hideElement(mobileMenuToggler, "active");
	hideElement(sideBar, "active");
}

if (checkLength(allTabsAndPillsButtonsTogglers)) {
	allTabsAndPillsButtonsTogglers.forEach((pill) => {
		pill.addEventListener("click", closeSideBarIfOpen);
	});
}

if (mobileMenuToggler) {
	mobileMenuToggler.addEventListener("click", function (e) {
		e.stopPropagation();
		if (sideBar && sideBar.classList.contains("active")) {
			let self = this;
			hideElement(self, "active");
			hideElement(sideBar, "active");
		} else {
			showElement(this, "active");
			showElement(sideBar, "active");
		}
	});
}

function handleGeneralOutsideClick() {
	document.addEventListener("click", (e) => {
		e.stopPropagation();
		document.querySelectorAll("[data-v-receiver]").forEach((currentElement) => {
			if (!currentElement.contains(e.target) && currentElement.classList.contains("active")) {
				hideElement(currentElement);
			}
		});
	});
}

function handleDropdownOutsideClick() {
	document.addEventListener("click", (event) => {
		event.stopPropagation();
		allToggleReceivers.forEach((element) => {
			if (!element.contains(event.target) && element.getAttribute("data-v-expanded") === "true") {
				hideElement(backdrop, "show");
				element.setAttribute("data-v-expanded", "false");
			}
		});
	});
}

function handleNotificationToggle(event) {
	event.preventDefault();
	const self = this;
	const target = self.getAttribute("data-target");
	allNotifTabs.forEach((tabPill) => {
		if (target === tabPill.getAttribute("data-target")) {
			document.querySelectorAll(".v-noti-dropdown [data-receiver]").forEach((content) => {
				const contentAttr = content?.getAttribute("data-receiver");
				if (contentAttr === target) {
					content.classList.add("active");
				} else {
					content.classList.remove("active");
				}
			});
			tabPill.classList.add("active");
		} else {
			tabPill.classList.remove("active");
		}
	});
}
if (checkLength(allNotifTabs)) {
	allNotifTabs.forEach((toggleButton) => {
		toggleButton.addEventListener("click", handleNotificationToggle);
	});
}

function handleEachToggler(event) {
	event.stopPropagation();
	const target = this.getAttribute("data-target");
	const dropdown = document.querySelector(`.v-dropdown[data-receiver=${target}]`);
	const dataExpanded = dropdown?.getAttribute("data-v-expanded");
	if (dataExpanded === "true") {
		return dropdown?.setAttribute("data-v-expanded", "false");
	} else {
		backdrop.classList.add("show");
		dropdown?.setAttribute("data-v-expanded", "true");
	}
}
if (checkLength(allTogglers)) {
	allTogglers.forEach((toggler) => {
		toggler.addEventListener("click", handleEachToggler);
	});
}

function toggleSideBarLinkDropdown(event) {
	event.stopPropagation();
	const self = event.target;
	if (self && self.classList.contains("active")) {
		return hideElement(self, "active");
	}
	return showElement(self, "active");
}
if (checkLength(sidebarLinksWithDropdown)) {
	sidebarLinksWithDropdown.forEach((link) => {
		link.addEventListener("click", toggleSideBarLinkDropdown);
	});
}

if (checkLength(allCardTabPanes)) {
	allCardTabPanes.forEach((cardTabPane) => {
		const allCardFaceToggler = cardTabPane.querySelectorAll(".v-card-item .v-card-face-toggler");
		const cardsBothViews = cardTabPane.querySelectorAll(".v-card-item .v-card-face");
		const card = cardTabPane.querySelector(".v-card");

		allCardFaceToggler.forEach((toggler, _, togglersArr) => {
			toggler.addEventListener("click", function () {
				const cardAttrView = toggler.getAttribute("data-card-face-toggle-view");
				togglersArr.forEach((eachToggler) => {
					if (toggler === eachToggler && eachToggler.classList.contains("active")) {
						return;
					} else {
						cardsBothViews.forEach((cardFace) => {
							const cardView = cardFace.getAttribute("data-card-face-view");
							if (cardAttrView === cardView) {
								cardFace.classList.add("active");
								card.classList.add("active");
							} else {
								cardFace.classList.remove("active");
								card.classList.remove("active");
							}
						});
						eachToggler.classList.remove("active");
						toggler.classList.add("active");
					}
				});
			});
		});
	});
}

const allInputContainerWithPassToggles = document.querySelectorAll(".v-input:has(.v-toggler-password)");
if (checkLength(allInputContainerWithPassToggles)) {
	allInputContainerWithPassToggles.forEach((passWithToggle) => {
		const hideShowButton = passWithToggle.querySelector(".v-toggler-password");
		const passInput = passWithToggle.querySelector(".form-control");
		if (hideShowButton && passInput) {
			hideShowButton.addEventListener("click", function () {
				const typeOfInput = passInput.type;
				if (typeOfInput === "password") {
					passInput.type = "text";
					hideShowButton.textContent = "Hide";
				} else {
					passInput.type = "password";
					hideShowButton.textContent = "Show";
				}
			});
		}
	});
}

window.addEventListener("DOMContentLoaded", function () {
	if (window.location.pathname.includes("index" || "home")) {
		const btn = document.createElement("button");
		btn.setAttribute("data-bs-target", "#onWebLoad");
		btn.setAttribute("data-bs-toggle", "modal");
		btn.style.display = "none";
		document.body.appendChild(btn);
		btn.click();
		btn.remove();
	}
});

handleDropdownOutsideClick();
handleGeneralOutsideClick();
