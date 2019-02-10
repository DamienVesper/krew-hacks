// ==UserScript==
// @name         Krew.io Hacks 2.0
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  Best mod for Krew.io!
// @author       DamienVesper
// @match        *://krew.io/*
// @match        *://*.krew.io/*
// @exclude      *://beta.krew.io/*
// @downloadURL  https://raw.githubusercontent.com/DamienVesper/krewio-hacks/master/index.js
// @updateURL    https://raw.githubusercontent.com/DamienVesper/krewio-hacks/master/index.js
// @grant        none
// ==/UserScript==
(function() {
	'use strict';

	//Master Controllers
	var modulesController = {
		hacks: true,
		style: true,
		keybinds: false,
		scriptConsole: true,
		scriptSettings: false
	}
	var hacksController = {
		instaDock: true,
		autoDock: false,
		autoSail: false,
		autoClicker: false, //TO BE REPLACED BY autoCannon() AND autoFish() IN 3.0 UPDATE
		//autoCannon: false, FOR 3.0 UPDATE
		//autoFish: false FOR 3.0 UPDATE
		autoMemberKick: false,
		autoPartySpam: false,
        keepGUI: true
	}
	var cssController = {
        color: `#1e90ff`,
        backgroundColorR: "0",
        backgroundColorG: "0",
        backgroundColorB: "0",
        borderColor: `#1e90ff`,
        borderType: `solid`,
        borderRadius: `5px`,
        normalOpacity: `1`,
        abnormalOpacity: `0.45`
    }
	var keybindController = {
		toggleAutoClicker: 77,
		toggleDockingModal: 75,
		toggleAutoMemberKick: 78,
		toggleAutoPartySpam: 66,
		hitSailBtn: 67,
		hitAbandonShipBtn: 88,
		hitDockBtn: 90
	}
	function keyController (e) {
        if(document.activeElement.tagName.toLowerCase() == `input`) return;
        else if(document.activeElement.tagName.toLowerCase() != `input`) {
            switch(e.keyCode) {/*
                case keybindController.toggleAutoClicker:
                    if(hacksController.autoClicker) hacksController.autoClicker = false;
                    else if(!hacksController.autoClicker) hacksController.autoClicker = true;
                    else return;
                    break;*/
                case keybindController.toggleDockingModal:
                    if(modals.docking.style.display != `none`) toggleModal(`hide`, modals.docking);
                    else if(modals.docking.style.display == `none`) toggleModal(`show`, modals.docking);
                    else return;
                    break;
				case keybindController.hitSailBtn:
					document.querySelector(`#exit-island-button`).click();
					break;
				case keybindController.hitAbandonShipBtn:
					document.querySelector(`#abandon-ship-button`).click();
				case keybindController.hitDockButton:
					document.querySelector(`#btn-hacks-dock`).click();
                default:
                    return;
            }
        }
        else return;
	}
  //Modals
    var modals = {
        departure: document.querySelector(`#departure-modal`), //Needs checking
        docking: document.querySelector(`#docking-modal`),
    }
	//EZ Functions
	function toggleModal(action, modalVar) {
		if(action == `hide`) modalVar.style.display = `none`;
		else if(action == `show`) modalVar.style.display = `block`;
		else return;
    }

    //Other Not-So EZ Functions
    function getLocalStorage() {
        let color = document.querySelector(`#css-color`).value;
        let backgroundColorR = document.querySelector(`#css-backgroundColorR`).value;
        let backgroundColorG = document.querySelector(`#css-backgroundColorG`).value;
        let backgroundColorB = document.querySelector(`#css-backgroundColorB`).value;
        let borderTypeInputs = document.querySelector(`input[name = "borderTypeSelect"]`);
        let borderColor = document.querySelector(`#css-borderColor`).value;
        let normalOpacity = document.querySelector(`#css-mod-opacity`).value;
        let abnormalOpacity = document.querySelector(`#css-gui-opacity`).value;

        if(localStorage.getItem(`color`)) cssController.color = localStorage.getItem(`color`);
        else if(!localStorage.getItem(`color`)) localStorage.setItem(`color`, color);
        else return;

        if(localStorage.getItem(`backgroundColorR`)) cssController.backgroundColorR = localStorage.getItem(`backgroundColorR`);
        else if(!localStorage.getItem(`backgroundColorR`)) localStorage.setItem(`backgroundColorR`, backgroundColorR);
        else return;

        if(localStorage.getItem(`backgroundColorG`)) cssController.backgroundColorG = localStorage.getItem(`backgroundColorG`);
        else if(!localStorage.getItem(`backgroundColorG`)) localStorage.setItem(`backgroundColorG`, backgroundColorG);
        else return;

        if(localStorage.getItem(`backgroundColorB`)) cssController.backgroundColorB = localStorage.getItem(`backgroundColorB`);
        else if(!localStorage.getItem(`backgroundColorB`)) localStorage.setItem(`backgroundColorB`, backgroundColorB);
        else return;

        if(localStorage.getItem(`borderType`)) cssController.borderType = localStorage.getItem(`borderType`);
        else if(!localStorage.getItem(`borderType`)) localStorage.setItem(`borderType`, document.querySelector(`input[name = "borderTypeSelect"]:checked`).value.toLowerCase());
        else return;

        if(localStorage.getItem(`borderColor`)) cssController.borderColor = localStorage.getItem(`borderColor`);
        else if(!localStorage.getItem(`borderColor`)) localStorage.setItem(`borderColor`, borderColor);
        else return;

        if(localStorage.getItem(`normalOpacity`)) cssController.normalOpacity = localStorage.getItem(`normalOpacity`);
        else if(!localStorage.getItem(`normalOpacity`)) localStorage.setItem(`normalOpacity`, normalOpacity / 100);
        else return;

        if(localStorage.getItem(`abnormalOpacity`)) cssController.abnormalOpacity = localStorage.getItem(`abnormalOpacity`);
        else if(!localStorage.getItem(`abnormalOpacity`)) localStorage.setItem(`abnormalOpacity`, abnormalOpacity / 100);
        else return;

        document.querySelector(`#css-color`).value = cssController.color;
        document.querySelector(`#css-backgroundColorB`).value = cssController.backgroundColorR;
        document.querySelector(`#css-backgroundColorG`).value = cssController.backgroundColorG;
        document.querySelector(`#css-backgroundColorB`).value = cssController.backgroundColorB;
        backgroundColorB = cssController.backgroundColorB;
        for(let i = 0; i < borderTypeInputs.length; i++) {
            if(borderTypeInputs[i].value.toLowerCase() == localStorage.getItem(`borderType`).toLowerCase()) borderTypeInputs[i].checked = true;
            else if(!borderTypeInputs[i].value.toLowerCase() == localStorage.getItem(`borderType`).toLowerCase()) borderTypeInputs[i].checked = false;
            else return;
        }
        document.querySelector(`#css-borderColor`).value = cssController.borderColor;
        document.querySelector(`#css-mod-opacity`).value = cssController.normalOpacity * 100;
        document.querySelector(`#css-gui-opacity`).value = cssController.abnormalOpacity * 100;
        /*
                color = cssController.color;
        backgroundColorR = cssController.backgroundColorR;
        backgroundColorG = cssController.backgroundColorG;
        backgroundColorB = cssController.backgroundColorB;
        for(let i = 0; i < borderTypeInputs.length; i++) {
            if(borderTypeInputs[i].value.toLowerCase() == localStorage.getItem(`borderType`).toLowerCase()) borderTypeInputs[i].checked = true;
            else if(!borderTypeInputs[i].value.toLowerCase() == localStorage.getItem(`borderType`).toLowerCase()) borderTypeInputs[i].checked = false;
            else return;
        }
        borderColor = cssController.borderColor;
        normalOpacity = cssController.normalOpacity * 100;
        abnormalOpacity = cssController.abnormalOpacity * 100;*/
    };
    function getCSSValues() {
        let color = document.querySelector(`#css-color`).value.toLowerCase();
        let backgroundColorR = document.querySelector(`#css-backgroundColorR`).value;
        let backgroundColorG = document.querySelector(`#css-backgroundColorG`).value;
        let backgroundColorB = document.querySelector(`#css-backgroundColorB`).value;
        let borderType = document.querySelector(`input[name = "borderTypeSelect"]:checked`).value.toLowerCase();
        let borderColor = document.querySelector(`#css-borderColor`).value.toLowerCase();
        let normalOpacity = document.querySelector(`#css-mod-opacity`).value / 100;
        let abnormalOpacity = document.querySelector(`#css-gui-opacity`).value / 100;

        cssController.color = color;
        cssController.backgroundColorR = backgroundColorR;
        cssController.backgroundColorG = backgroundColorG;
        cssController.backgroundColorB = backgroundColorB;
        cssController.borderType = borderType;
        cssController.borderColor = borderColor;
        cssController.normalOpacity = normalOpacity;
        cssController.abnormalOpacity = abnormalOpacity;

        localStorage.setItem(`color`, color);
        localStorage.setItem(`backgroundColorR`, backgroundColorR);
        localStorage.setItem(`backgroundColorG`, backgroundColorG);
        localStorage.setItem(`backgroundColorB`, backgroundColorB);
        localStorage.setItem(`borderType`, borderType);
        localStorage.setItem(`borderColor`, borderColor);
        localStorage.setItem(`normalOpacity`, normalOpacity);
        localStorage.setItem(`abnormalOpacity`, abnormalOpacity);
    };

    //HTML
    function addCSSStyling() {
        let style = document.createElement(`style`);
        document.head.appendChild(style);
        style.innerHTML = `
.script-input {
    display: block;
    width: auto;
    padding: .5rem .75rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #55595c;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid ${"rgba(0, 0, 0, 0.15)"};
    border-radius: .25rem;
}
.css-flex-line {
    display: flex;
}
.settings-container {
    border-top: 1px solid ${"rgba(0, 0, 0, 0.15)"};
    padding: 5px 0px;
}
.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #55595c;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #55595c;
    cursor: pointer;
}
`;
    };
    function addSettingsHTML() {
        //Make Modal
        let hackSettingsDiv = document.createElement(`div`);
        hackSettingsDiv.id = `hack-settings-modal`;
        hackSettingsDiv.classList.add(`absolute-center`);
        hackSettingsDiv.style.height = `425px`;
        hackSettingsDiv.style.width = `675px`;
        hackSettingsDiv.innerHTML = `
<div class = "modal-content" style="transition: all 0.3s ease 0s;">
    <div class = "modal-header" style="transition: all 0.3s ease 0s;">
        <div class = "btn btn-secondary btn-sm float-right toggle-hack-settings-button" style = "transition: all 0.3s ease 0s;"><i class = "icofont icofont-ui-close" style="transition: all 0.3s ease 0s;"></i>
    </div>
    <h6 class = "modal-title" style = "transition: all 0.3s ease 0s;">Hack Settings</h6>
</div>
<div class="container" style="margin-top: 15px; transition: all 0.3s ease 0s;"></div>`;

        let gameUI = document.querySelector(`#game-ui`);
        document.body.insertBefore(hackSettingsDiv, gameUI);
        document.querySelector(`#hack-settings-modal .container`).style.overflowY = `auto`;
        document.querySelector(`#hack-settings-modal .container`).style.height = `300px`;
        document.querySelector(`#hack-settings-modal`).style.display = `none`;

        //Make Text to go in Modal
        let settingsHTML = ``;
        settingsHTML = `
<h5>Color Scheme</h3>
<div class = "settings-container">
    <br/>
    <h6>Basic Coloring</h4>
    <label>Color:</label> <input id = "css-color" class = "script-input" type = "text" placeholder = "#RRGGBB" maxlength = "7" value = "#1E90FF" />
    <label class = "css-label">Background Color:</label>
    <div class = "css-flex-line">
        <span style = "margin-right: 5px;"><input id = "css-backgroundColorR" class = "script-input" type = "number" placeholder = "RRR" maxlength = "3" value = "0" min = "0" max = "255" /></span>
        <span style = "margin-right: 5px;"><input id = "css-backgroundColorG" class = "script-input" type = "number" placeholder = "GGG" maxlength = "3" value = "0" min = "0" max = "255" /></span>
        <span>                             <input id = "css-backgroundColorB" class = "script-input" type = "number" placeholder = "BBB" maxlength = "3" value = "0" min = "0" max = "255" /></span>
    </div>
    <br/>
    <h6>Bordering</h6>
    <label>Border Type:</label>
    <br/>
    <input class = "css-borderType" name = "borderTypeSelect" type = "radio" value = "solid" checked /><span style = "margin-left: 5px;">Solid</span>
    <br/>
    <input class = "css-borderType" name = "borderTypeSelect" type = "radio" value = "dotted" /><span style = "margin-left: 5px;">Dotted</span>
    <br/>
    <input class = "css-borderType" name = "borderTypeSelect" type = "radio" value = "dashed" /><span style = "margin-left: 5px;">Dashed</span>
    <br/><br/>
    <label>Border Color:</label> <input id = "css-borderColor" class = "script-input" type = "text" placeholder = "#RRGGBB" maxlength = "7" value = "#1E90FF" />
    <br/>
    <h6>Transparency</h6>
    Modal Opacity: <div class = "slidercontainer"><input id = "css-mod-opacity" class = "slider css-slider css-op-gui" type = "range" min = "0" max = "100" value = "100" /></div>
    <br/>
    GUI Opacity: <div class = "slidercontainer"><input id = "css-gui-opacity" class = "slider css-slider css-op-gui" type = "range"  min = "0" max = "100" value = "45" /></div>
</div>
`;

        //Add Modal Text to Modal
        let hackSettingsContentContainer = document.querySelector(`#hack-settings-modal > .modal-content > .container`);
        hackSettingsContentContainer.innerHTML = settingsHTML;
    };
    function addHackElements() {
        let krewDiv = document.querySelector(`#krew-div`);
        let krewDivForm = document.querySelector(`#krew-div > .form-inline`);
        let krewDivFormGroup = document.querySelector(`#krew-div > .form-inline > .form-group`);
        let gameSettingsBtn = document.querySelector(`.toggle-ship-status-button`);
        let codeSettingsBtn = document.createElement(`div`);
        codeSettingsBtn.innerHTML = `<i class = "icofont icofont-code"></i>`;
        codeSettingsBtn.classList.add(`btn`, `btn-secondary`, `btn-sm`, `float-sm-right`, `toggle-hack-settings-button`);
        codeSettingsBtn.style.marginRight = `5px`;
        krewDivForm.insertBefore(codeSettingsBtn, krewDivFormGroup);
        codeSettingsBtn.addEventListener(`click`, function() {
            let hackSettings = document.querySelector(`#hack-settings-modal`);
            if(hackSettings.style.display != `none`) hackSettings.style.display = `none`;
            else if(hackSettings.style.display == `none`) hackSettings.style.display = `block`;
            else return;
        });

        krewDiv.style.width = `auto`;

        let krewSettingsDivChild = document.querySelectorAll(`#krew-div > div`)[1];
        let breakElement = document.querySelector(`#krew-div > div > br`);
        let dockBtn = document.createElement(`span`);
        dockBtn.classList.add(`btn-primary`, `btn`, `btn-sm`);
        dockBtn.innerHTML = `<i class = "icofont icofont-sail-boat-alt-1" style = "margin-right: 5px;"></i>Dock`;
        dockBtn.style.display = `inline-block`;
        dockBtn.id = `btn-hacks-dock`;
        dockBtn.addEventListener(`click`, function() {
            let dockingButton = document.querySelector(`#docking-modal-button`);
            dockingButton.click();
        });
        krewSettingsDivChild.insertBefore(dockBtn, breakElement);

        let hacksXButton = document.querySelector(`#hack-settings-modal > .modal-content > .modal-header > .toggle-hack-settings-button`);
        hacksXButton.addEventListener(`click`, function() {
            let hackSettings = document.querySelector(`#hack-settings-modal`);
            if(hackSettings.style.display != `none`) hackSettings.style.display = `none`;
            else if(hackSettings.style.display == `none`) hackSettings.style.display = `block`;
            else return;
        });

        let chatButtonsDiv = document.querySelector(`#chat-div`);
        let hideChatButton = document.querySelector(`#hide-chat`);
        let showChatButton = document.querySelector(`#show-chat`);
        let wikiButton = document.createElement(`span`);
        wikiButton.innerHTML = `<i class = "icofont icofont-ui-note" style = "margin-right: 5px;"></i>Wiki`;
        wikiButton.classList.add(`btn`, `btn-sm`, `btn-warning`);
        //wikiButton.style.backgroundColor = `#663399`;
        //wikiButton.style.borderColor = `#663399`;
        chatButtonsDiv.insertBefore(wikiButton, hideChatButton);
        wikiButton.addEventListener(`click`, function() {
            window.open(`https://krew-io.fandom.com/wiki/Krew.io_Wiki`);
        });
        let discordButton = document.querySelector(`#chat-div > a`);
        discordButton.innerHTML = `<i class = "icofont icofont-comment" style = "margin-right: 5px;"></i>Discord`;

        hideChatButton.innerHTML = `<i class = "icofont icofont-simple-down" style = "margin-right: 5px;"></i>Hide Chat`;
        showChatButton.innerHTML = `<i class = "icofont icofont-simple-up" style = "margin-right: 5px;"></i>Show Chat`;
    };

    //CSS
    function addCSS(color, bColorR, bColorG, bColorB, borderType, borderColor, normalOpacity, abnormalOpacity) {
        //Normal Element Styling
        let colorElements = document.querySelectorAll(`*`);
        for(let i = 0; i < colorElements.length; i++) { colorElements[i].style.color = `${color}`; }
        let backgroundColorElements = document.querySelectorAll(`*`);
        for(let i = 0; i < backgroundColorElements.length; i++) { backgroundColorElements[i].style.backgroundColor = "rgb(" + bColorR + ", " + bColorG + ", " + bColorB + ");"}
        let borderElements = document.querySelectorAll(`#krew-div, #chat-div, #experience-ui, #gold-div, #earn-gold, .modal-content, input, select`);
        for(let i = 0; i < borderElements.length; i++) { borderElements[i].style.border = `2px ${borderType} ${borderColor}`; }

        //Opacity Elements
        let normalOpacityElements = document.querySelectorAll(`.modal, .modal-content`);
        for(let i = 0; i < normalOpacityElements.length; i++) { normalOpacityElements[i].style.opacity = `${normalOpacity}`; }
        let abnormalOpacityElements = document.querySelectorAll(`#krew-hud, #chat-div, #experience-ui, #gold-div, #earn-gold, #leaderboard, #center-div`);
        for(let i = 0; i < abnormalOpacityElements.length; i++) { abnormalOpacityElements[i].style.opacity = `${abnormalOpacity}`; }
    };

    //Hacks
	function instaDock() {
		let dockingButton = document.querySelector(`#docking-modal-button`);
		let oldTextNode = document.querySelector(`#docking-time`);
		let newTextNode = document.createTextNode(`Dock (z)`);
		dockingButton.classList.remove(`disabled`);
		dockingButton.classList.add(`enabled`);
	};
	function autoDock() {
        let dockingButton = document.querySelector(`#docking-modal-button`);
        if(dockingButton.style.display != `none` && dockingButton) dockingButton.click();
    };
	function autoSail() {
        let sailButton = document.querySelector(`#exit-island-button`);
        if(sailButton.style.display != `none` && sailButton) sailButton.click();
    };
	function autoClicker() {
        let canvasElement = document.querySelector(`canvas`);
        canvasElement.click();
    };
	function autoMemberKick() {
        let memberKickButtons = document.querySelectorAll(`.btn-player-kick`);
        if(!memberKickButtons) return;
        for(let i = 0; i < memberKickButtons.length; i++) {
            memberKickButtons.click();
        }
    };
    function autoAbandonShip() {
    	let abandonShipButton = document.querySelector(`#abandon-ship-button`);
        let sailButton = document.querySelector(`#exit-island-button`);
        if(sailButton.style.display != `none` || !sailButton) return;
        if(abandonShipButton.style.display != `none`) {}
        abandonShipButton.click();
	};
	function autoPartySpam() {
        let joinKrewButtons = document.querySelectorAll(`.krews-list > div > table > tbody > td > button`);
        for(let i = 0; i < joinKrewButtons.length; i++) {
            joinKrewButtons[i].click();
        }
    };
    function keepGUI() {
        let showElements = document.querySelectorAll(`#krew-div, #island-menu-div, #exit-island-button, #abandon-ship-button`);
        for(let i = 0; i < showElements.length; i++) {
            showElements[i].style.display = `inline-block`;
        }
    };

	//Master Script
	function scriptMaster() {
		if(hacksController.instaDock) instaDock();
        if(hacksController.keepGUI) keepGUI();
        if(modulesController.style) {
            getCSSValues();
            addCSS(cssController.color, cssController.backgroundColorR, cssController.backgroundColorG, cssController.backgroundColorB, cssController.borderType, cssController.borderColor, cssController.normalOpacity, cssController.abnormalOpacity);
        }
        //Random Style Codes
        document.querySelector(`.my-krew-name`).style.marginRight = `5px`;
        let allElements = document.querySelectorAll(`*`);
        for(let i = 0; i < allElements.length; i++) { allElements[i].style.transition = `0.3s`; };
	}

	//Script Functionality
    addCSSStyling();
    addSettingsHTML();
    getLocalStorage();
    addHackElements();
	document.addEventListener(`keydown`, keyController);
	setInterval(scriptMaster, 100);
})();
