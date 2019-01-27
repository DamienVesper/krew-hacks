// ==UserScript==
// @name         Krew.io Hacks 2.0
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Best mod for Krew.io!
// @author       DamienVesper
// @match        *://krew.io/*
// @match        *://*.krew.io/*
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
        padding: `5px`,
        margin: `5px`
    }
	var keybindController = {
		toggleAutoClicker: 69,
		toggleDockingModal: 70,
		toggleAutoMemberKick: 90,
		toggleAutoPartySpam: 88
	}
	function keyController (e) {
		switch(e.keyCode) {
			case keybindController.toggleAutoClicker:
				if(hacksController.autoClicker) hacksController.autoClicker = false;
				else if(!hacksController.autoClicker) hacksController.autoClicker = true;
				else return;
				break;
			case keybindController.toggleDockingModal:
				if(modals.docking.style.display != `none`) toggleModal(`hide`, modals.docking);
				else if(modals.docking.style.display == `none`) toggleModal(`show`, modals.docking);
				else return;
				break;
			default:
				return;
		}
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
<div class="modal-content" style="transition: all 0.3s ease 0s;">
    <div class="modal-header" style="transition: all 0.3s ease 0s;">
        <div class="btn btn-secondary btn-sm float-right toggle-hack-settings-button" style = "transition: all 0.3s ease 0s;"><i class = "icofont icofont-ui-close" style="transition: all 0.3s ease 0s;"></i>
    </div>
    <h6 class="modal-title" style="transition: all 0.3s ease 0s;">Hack Settings</h6>
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
        <span style = "margin-right: 5px;"><input id = "css-color" class = "script-input" type = "number" placeholder = "RRR" maxlength = "3" value = "0" min = "0" max = "255" /></span>
        <span style = "margin-right: 5px;"><input id = "css-color" class = "script-input" type = "number" placeholder = "GGG" maxlength = "3" value = "0" min = "0" max = "255" /></span>
        <span><input id = "css-color" class = "script-input" type = "number" placeholder = "BBB" maxlength = "3" value = "0" min = "0" max = "255" /></span>
    </div>
    <br/>
    <h6>Bordering</h6>
    <label>Border Type:</label>
    <br/>
    <input class = "css-borderType" name = "css-borderTypeSelect" type = "radio" value = "solid" checked /><span style = "margin-left: 5px;">Solid</span>
    <br/>
    <input class = "css-borderType" name = "css-borderTypeSelect" type = "radio" value = "dotted" /><span style = "margin-left: 5px;">Dotted</span>
    <br/>
    <input class = "css-borderType" name = "css-borderTypeSelect" type = "radio" value = "dashed" /><span style = "margin-left: 5px;">Dashed</span>
    <br/><br/>
    <label>Border Color:</label> <input id = "css-color" class = "script-input" type = "text" placeholder = "#RRGGBB" maxlength = "7" value = "#1E90FF" />
    <br/>
    <h6>Transparency</h6>
    Modal Opacity: <div class = "slidercontainer"><input class = "slider css-slider css-op-gui" name = "css-op-gui" type = "range" min = "0" max = "100" value = "100" /></div>
    <br/>
    GUI Opacity: <div class = "slidercontainer"><input class = "slider css-slider css-op-gui" name = "css-op-gui" type = "range"  min = "0" max = "100" value = "45" /></div>
</div>
`;
        /*
        cssHTML += `<h3 style = "text-align: center;">Zombs.io Color Scheme</h3>`;
        cssHTML += `<h4>Color:<button class = "scriptCSS-button scriptCSS-randColorButton">Randomize</button></h4>`;
        cssHTML += `<input class = "scriptCSS-input scriptCSS-color" type = "text" maxlength = "7" placeholder = "#RRGGBB" value = "#1E90FF" />`;
        cssHTML += `<br/><br/>`;
        cssHTML += `<h4>Background Color:<button class = "scriptCSS-button scriptCSS-randBackgroundColorButton">Randomize</button></h4>`;
        cssHTML += `<br/>`;
        cssHTML += `<div class = "scriptCSS-group" style = "display: flex">`;
        cssHTML += `<span class = "scriptCSS-span">R</span><input class = "scriptCSS-input scriptCSS-backgroundColor-R" type = "number" maxlength = "3" min = "0" max = "255" placeholder = "RRR" value = "0" />`;
        cssHTML += `<span class = "scriptCSS-span">G</span><input class = "scriptCSS-input scriptCSS-backgroundColor-G" type = "number" maxlength = "3" min = "0" max = "255" placeholder = "GGG" value = "0" />`;
        cssHTML += `<span class = "scriptCSS-span">B</span><input class = "scriptCSS-input scriptCSS-backgroundColor-B" type = "number" maxlength = "3" min = "0" max = "255" placeholder = "BBB" value = "0" />`;
        cssHTML += `</div><br/>`;
        cssHTML += `<br/>`;
        cssHTML += `<h4>Border Type<button class = "scriptCSS-button scriptCSS-randBorderTypeButton">Randomize</button></h4>`;
        cssHTML += `<div class = "scriptCSS-group" style = "display: flex">`;
        cssHTML += `<div style = "padding: 0px 14px"><input class = "scriptCSS-borderType" type = "radio" name = "scriptCSS-borderTypeSelect" value = "solid" checked />Solid</div>`;
        cssHTML += `<div style = "padding: 0px 14px"><input class = "scriptCSS-borderType" type = "radio" name = "scriptCSS-borderTypeSelect" value = "dotted" />Dotted</div>`;
        cssHTML += `<div style = "padding: 0px 14px"><input class = "scriptCSS-borderType" type = "radio" name = "scriptCSS-borderTypeSelect" value = "dashed" />Dashed</div>`;
        cssHTML += `</div><br/>`;
        cssHTML += `<h4>Border Color:<button class = "scriptCSS-button scriptCSS-randBorderColorButton">Randomize</button></h4>`;
        cssHTML += `<input class = "scriptCSS-input scriptCSS-borderColor" type = "text" maxlength = "7" placeholder = "#RRGGBB" value = "#1E90FF" />`;
        cssHTML += `<br/>`;
        cssHTML += `<br/>`;
        cssHTML += `<button class = "scriptCSS-button scriptCSS-submitButton">Change CSS</button><button class = "scriptCSS-button scriptCSS-randAllButton">Randomize All</button>`;
        cssHTML += `<br/>`;
        cssHTML += `<br/>`;*/

        //Add Modal Text to Modal
        let hackSettingsContentContainer = document.querySelector(`#hack-settings-modal > .modal-content > .container`);
        hackSettingsContentContainer.innerHTML = settingsHTML;
    };
    function addHelpHTML() {};
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

        let helpBtn = document.createElement(`div`);
        helpBtn.innerHTML = `<i class = "icofont icofont-question"></i>`;
        helpBtn.classList.add(`btn`, `btn-secondary`, `btn-sm`, `float-sm-right`, `toggle-help-button`);
        helpBtn.style.marginRight = `5px`;
        krewDivForm.insertBefore(helpBtn, krewDivFormGroup);

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

        //Hack Chat Functionality
/*
<li class="nav-item" style="transition: all 0.3s ease 0s;">
  <a class="nav-link active" id="chat-hacks" href="#" style="transition: all 0.3s ease 0s;">Hacks
    <i id="hacks-chat-alert" class="icofont icofont-speech-comments" style="transition: all 0.3s ease 0s; display: none;"></i>
  </a>
</li>
*/
    };

    //CSS
    function addCSS(color, backgroundColor, borderSize, borderColor, borderRadius, padding, margin, normalOpacity, abnormalOpacity) {
        //Normal Element Styling
        let colorElements = document.querySelectorAll(``);
        for(let i = 0; i < colorElements.length; i++) {}
        let backgroundColorElements = document.querySelectorAll(``);
        for(let i = 0; i < backgroundColorElements.length; i++) {}
        let borderElements = document.querySelectorAll(``);
        for(let i = 0; i < borderElements.length; i++) {}

        //Form Element Styling
        /*let formElements = document.querySelectorAll(`button, input, select, option`);
        for(let i = 0; i < formElements.length; i++) {
            if(formElements[i].tagName == `BUTTON` || formElements[i].type) {}
            formElements[i].style.
            formElements[i].style.
            formElements[i].style.
        }*/

        //Padding Elements
        let padLeftElements = document.querySelectorAll(``);
        for(let i = 0; i < padLeftElements.length; i++) { padLeftElements[i].style.paddingLeft = `${padding}px`; }
        let padRightElements = document.querySelectorAll(``);
        for(let i = 0; i < padRightElements.length; i++) { padRightElements[i].style.paddingLeft = `${padding}px`; }
        let padTopElements = document.querySelectorAll(``);
        for(let i = 0; i < padTopElements.length; i++) { padTopElements[i].style.paddingLeft = `${padding}px`; }
        let padBottomElements = document.querySelectorAll(``);
        for(let i = 0; i < padBottomElements.length; i++) { padBottomElements[i].style.paddingLeft = `${padding}px`; }

        //Margin Elements
        let marginLeftElements = document.querySelectorAll(``);
        for(let i = 0; i < marginLeftElements.length; i++) { marginLeftElements[i].style.marginLeft = `${margin}px`; }
        let marginRightElements = document.querySelectorAll(``);
        for(let i = 0; i < marginRightElements.length; i++) { marginRightElements[i].style.marginRight = `${margin}px`; }
        let marginTopElements = document.querySelectorAll(``);
        for(let i = 0; i < marginTopElements.length; i++) { marginTopElements[i].style.marginTop = `${margin}px`; }
        let marginBottomElements = document.querySelectorAll(``);
        for(let i = 0; i < marginBottomElements.length; i++) { marginBottomElements[i].style.marginBottom = `${margin}px`; }

        //Opacity Elements
        let normalOpacityElements = document.querySelectorAll(``);
        for(let i = 0; i < normalOpacityElements.length; i++) { normalOpacityElements.style.opacity = `${normalOpacity}`; }
        let abnormalOpacityElements = document.querySelectorAll(``);
        for(let i = 0; i < abnormalOpacityElements.length; i++) { normalOpacityElements.style.opacity = `${abnormalOpacity}`; }
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
        //if(modulesController.scriptCSS) addCSS();
        //else if(!modulesController.scriptCSS) removeCSS();

        //Random Style Codes
        document.querySelector(`.my-krew-name`).style.marginRight = `5px`;
        let allElements = document.querySelectorAll(`*`);
        for(let i = 0; i < allElements.length; i++) { allElements[i].style.transition = `0.3s`; };
	}

	//Script Functionality
    addCSSStyling();
    addSettingsHTML();
    addHackElements();
	document.addEventListener(`keydown`, keyController);
	setInterval(scriptMaster, 100);
})();
