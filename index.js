// ==UserScript==
// @name         Krew.io Hacks 3.0
// @namespace    http://tampermonkey.net/
// @version      2.9.1b
// @description  Best hack for krew.io!
// @author       DamienVesper
// @match        *://krew.io/
// @match        *://*.krew.io/
// @exclude      *://beta.krew.io/
// @exclude      *://*.beta.krew.io/
// @downloadURL  https://raw.githubusercontent.com/DamienVesper/krewio-hacks/master/index.js
// @updateURL    https://raw.githubusercontent.com/DamienVesper/krewio-hacks/master/index.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /*
    LEGAL
     - All code licensed under the Apache 2.0 License on GitHub.
     - Any reproductions of this and other related works that are found to be in violence of this code will be reported and removed.

    TODO
     - Rebuild Code
     - Dark Mode
     - Spam Sail
     - Spam Parties
     - Latency Customizer
     - Rebuild Inputs into Forms
    */

    //Initialize Variables
    var togglesSettingsController = {
        hackSpamSail: null,
        hackSpamParties: null
    };
    var keybindController = {
        toggleSpamSail: null,
        toggleSpamParties: null,
        toggleAutoKick: null,
        clickSail: null,
        clickAbandonShip: null,
        clickDock: null
    };
    var cssController = {
        colorR: null,
        colorG: null,
        colorB: null,
        backgroundColorR: null,
        backgroundColorB: null,
        backgroundColorG: null,
        opacityGUI: null,
        opacityModal: null
    };
    var miscellaneousController = {
        toggleTopLeft: null,
        toggleTopRight: null,
        toggleCenterRight: null,
        toggleBottomLeft: null,
        toggleBottomCenter: null,
        toggleBottomRight: null
    };
    var soundController = {
        volumeSFX: null,
        volumeMusic: null,
        volumeRadio: null
    };

    //Controller Functions
    function localStorageLoad() {
        if(localStorage.getItem(`hackToggles`)) togglesSettingsController = JSON.parse(localStorage.getItem(`hackToggles`));
        else if(!localStorage.getItem(`hackToggles`)) {
            localStorage.setItem(`hackToggles`, JSON.stringify(togglesSettingsController));
        }
        else return console.error(`Failed to identify localStorage item "hackToggles".`);

        if(localStorage.getItem(`hackKeybinds`)) keybindController = JSON.parse(localStorage.getItem(`hackKeybinds`));
        else if(!localStorage.getItem(`hackKeybinds`)) {
            localStorage.setItem(`hackSettings`, JSON.stringify(keybindController));
        }
        else return console.error(`Failed to identify localStorage item "hackKeybinds".`);

        if(localStorage.getItem(`hackCSS`)) cssController = JSON.parse(localStorage.getItem(`hackCSS`));
        else if(!localStorage.getItem(`hackCSS`)) {
            localStorage.setItem(`hackCSS`, JSON.stringify(cssController));
        }
        else return console.error(`Failed to identify localStorage item "hackCSS".`);

        if(localStorage.getItem(`hackMiscellaneous`)) miscellaneousController = JSON.parse(localStorage.getItem(`hackMiscellaneous`));
        else if(!localStorage.getItem(`hackMiscellaneous`)) {
            localStorage.setItem(`hackMiscellaneous`, JSON.stringify(miscellaneousController));
        }
        else return console.error(`Failed to identify localStorage item "hackMiscellaneous".`);

        if(localStorage.getItem(`hackSounds`)) soundController = JSON.parse(localStorage.getItem(`hackSounds`));
        else if(!localStorage.getItem(`hackSounds`)) {
            localStorage.setItem(`hackSounds`, JSON.stringify(soundController));
        }
        else return console.error(`Failed to identify localStorage item "hackKeybinds".`);
    }
    function localStorageSave() {
        localStorage.setItem(`hackSettings`, JSON.stringify(togglesSettingsController));
        localStorage.setItem(`hackKeybinds`, JSON.stringify(keybindController));
        localStorage.setItem(`hackCSS`, JSON.stringify(cssController));
        localStorage.setItem(`hackMiscellaneous`, JSON.stringify(miscellaneousController));
        localStorage.setItem(`hackSounds`, JSON.stringify(soundController));
    }
    function keyController(e) {
        if(document.activeElement.tagName.toString().toLowerCase() == `input`) return console.error(`Failed to execute keyController(${e}) as current element focus is an input or the hack settings modal is open.`);// || document.querySelector(`#hack-settings-modal`).style.display == `block`) return console.error(`Failed to execute keyController(${e}) as current element focus is an input or the hack settings modal is open.`);
        else {
            switch(e.keyCode) {

                //Modal Toggling
                case keybindController.toggleSpamSail:
                    if(document.querySelector(`#hacks-toggleSpamSail`)) {
                        if(document.querySelector(`#hacks-toggleSpamSail`).checked) document.querySelector(`#hacks-toggleSpamSail`).checked = false;
                        else if(!document.querySelector(`#hacks-toggleSpamSail`).checked) document.querySelector(`#hacks-toggleSpamSail`).checked = true;
                        else return console.error(`Failed to process attribute "checked" of hack setting.`);
                    }
                    else return console.error(`Could not find hack setting "toggleSpamSail".`);
                    break;
                case keybindController.toggleSpamParties:
                    if(document.querySelector(`#hacks-toggleSpamParties`)) {
                        if(document.querySelector(`#hacks-toggleSpamParties`).checked) document.querySelector(`#hacks-toggleSpamParties`).checked = false;
                        else if(!document.querySelector(`#hacks-toggleSpamParties`).checked) document.querySelector(`#hacks-toggleSpamParties`).checked = true;
                        else return console.error(`Failed to process attribute "checked" of hack setting.`);
                    }
                    else return console.error(`Could not find hack setting "toggleSpamParties".`);
                    break;
                case keybindController.toggleAutoKick:
                    if(document.querySelector(`#hacks-toggleAutoKick`)) {
                        if(document.querySelector(`#hacks-toggleAutoKick`).checked) document.querySelector(`#hacks-toggleAutoKick`).checked = false;
                        else if(!document.querySelector(`#hacks-toggleAutoKick`).checked) document.querySelector(`#hacks-toggleAutoKick`).checked = true;
                        else return console.error(`Failed to process attribute "checked" of hack setting.`);
                    }
                    else return console.error(`Could not find hack setting "toggleAutoKick".`);
                    break;
                case keybindController.toggleKeepGUIElements:
                    if(document.querySelector(`#hacks-toggleKeepGUIElements`)) {
                        if(document.querySelector(`#hacks-toggleKeepGUIElements`).checked) document.querySelector(`#hacks-toggleKeepGUIElements`).checked = false;
                        else if(!document.querySelector(`#hacks-toggleKeepGUIElements`).checked) document.querySelector(`#hacks-toggleKeepGUIElements`).checked = true;
                        else return console.error(`Failed to process attribute "checked" of hack setting.`);
                    }
                    else return console.error(`Could not find hack setting "toggleKeepGUIElements".`);
                    break;
                //TopLeft ButtonNav
                case keybindController.clickSail:
                    document.querySelector(`#exit-island-button`).click();
                    break;
                case keybindController.clickAbandonShip:
                    document.querySelector(`#abandon-ship-button`).click();
                    break;
                case keybindController.clickDock:
                    document.querySelector(`#hack-dock-button`).click();
                    break;
                default:
                    return console.log(`There is no associated keybind with key "${e.key}".`);
            }
        }
    }

    function singleRuntime() {
        localStorageLoad();
        document.addEventListener(`keydown`, function(e){keyController(e)});
    }
    function mainRuntime() {
        localStorageSave();
    }
    singleRuntime();
    setInterval(mainRuntime, 100);
})();
