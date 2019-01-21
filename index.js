// ==UserScript==
// @name         Krew.io Hacks
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Best mod for Krew.io!
// @author       DamienVesper
// @match        *://krew.io/*
// @match        *://*.krew.io/*
// @grant        none
// ==/UserScript==


//Master Controllers
var keybindController = {
	showDockingModal: 82,
	hideDockingModal: 70
}
var hackController = {
	instaDock: true,
	autoCannon: false,
	autoFish: false,
	autoSail: false,
	autoDock: false
	//autoKrewSpam: false
	//autoMemberKick: false
}
var cssController = {
    borderColor: "",
    guiColor: "",
    guiBackgroundColor: "",
    modalColor: "",
    modalBackgroundColor: "",
}
var modals = {
    dockingModal: document.querySelector(`#docking-modal`)
}
function keyController(e) {
	switch(e.keyCode) {
		case keybindController.showInstaDock:
            modals.dockingModal.style.display = `block`;
            break;
		case keybindController.hideInstaDock:
            modals.dockingModal.style.display = `none`;
            break;/*
		case keybindController.toggleInstaDock:
		break;*/
	}
}

//CSS Styling
function getCSS() {}
function setCSS() {}

//Hacks
function instaDock() {
	let dockingButton = document.querySelector(`#docking-modal-button`);
	let existingTextNode = document.querySelector(`#docking-time`);
	let dockingTextNode = document.createTextNode(`Dock (z)`);

	existingTextNode.remove();
	dockingButton.addChild(dockingTextNode);
	dockingButton.classList.remove(`disabled`);
	dockingButton.classList.add(`enabled`);
}
function autoMemberKick() {
	let kickButtons = document.querySelectorAll(`.btn-player-kick`);
	for(let i = 0; i < kickButtons.length; i++) {
		kickButtons[i].click();
		kickButtons[i].dispatchEvent(upEvent);
	}
}
function autoSail() {
	let sailButton = document.querySelector(`#exit-island-button`);
	sailButton.click();
	sailButton.dispatchEvent(upEvent);
}
function autoDock() {
	let dockingModal = document.querySelector(`#docking-modal`);
	let dockButton = document.querySelector(`#docking-modal-button`);
	if(dockingModal.style.display != `none`) {
		dockButton.click();
		dockButton.dispatchEvent(upEvent);
	}
}
function autoAbandonShip() {
	let abandonShipButton = document.querySelector(`#abandon-ship-button`);
	let sailButton = document.querySelector(`#exit-island-button`);
	if(sailButton.style.display == `none`) {
		abandonShipButton.click();
		abandonShipButton.dispatchEvent(upEvent);
	}
}
function autoKrewSpam() {
	let joinKrewButtons = document.querySelectorAll(`.krews-list > div > table > tbody > td > button`);
	for(let i = 0; i < joinKrewButtons.length; i++) {
		joinKrewButtons[i].click();
		joinKrewButtons[i].dispatchEvent(upEvent);
	}
}

//var keyHandle = document.createTextNode('window.onkeyup = function(e) {var key = e.keyCode ? e.keyCode : e.inwhich;}')



function fullRunScript() {
	if(hackController.instaDock) instaDock();
	if(hackController.autoMemberKick) autoMemberKick();
	if(hackController.autoSail) autoSail();
	if(hackController.autoDock) autoDock();
}

document.addEventListener(`keydown`, function(e) {keyController(e)});
setInterval(fullRunScript, 100);
