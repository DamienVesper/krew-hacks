// ==UserScript==
// @name         Krew.io Hacks 3.0
// @namespace    https://tampermonkey.net/
// @version      2.0
// @description  Best mod for Krew.io!
// @author       DamienVesper
// @match        *://krew.io/*
// @match        *://*.krew.io/*
// @match        *://45.77.109.150/*
// @match        *://*.45.77.109.150/*
// @exclude      *://beta.krew.io/*
// @downloadURL  https://raw.githubusercontent.com/DamienVesper/krewio-hacks/master/index.js
// @updateURL    https://raw.githubusercontent.com/DamienVesper/krewio-hacks/master/index.js
// @run-at       document-end
// @grant        GM_xmlHttpRequest
// ==/UserScript==

/*
LEGAL
    - All code licensed under the Apache 2.0 License. Code copyright 2019 by DamienVesper. All rights reserved.
    - All code reproductions must include the below insigna.
    - Any reproductions of this and other related works that are found to be in violence of this code will be reported and removed.
                        ____                                            _
    |\   \      /      |    |                                          |_|
    | \   \    /       |____|  __   __   __   __   __    __ __   __ __      __   __
    | /    \  /        |      |  | |  | |  | |  | |  |  |  |  | |  |  | |  |  | |  |
    |/      \/         |      |    |__| |__| |    |__|_ |  |  | |  |  | |  |  | |__|
                                        |                                       |
                                        __|                                     __|
*/

//Default Configuration
let modules = {
    hacks: true,
    styling: false
},
hacks = {
    instaDock: true,
    autoDock: false,
    autoSail: false,
    autoClicker: false,
    autoMemberKick: false,
    autoPartySpam: false,
    keepGUI: true
},
styling = {
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    },
    backgroundColor: {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    },
    border: {
        color: {
            r: 0,
            g: 0,
            b: 0,
            a: 0    
        },
        type: `solid`,
        radius: `5px`,
    },
    opacity: {
        gui: 0.75,
        modals: 0.45
    }
},
keybinds = {
    sail: 84,
    abandonShip: 89,
    dock: 85
}

//Master Controller
const keyController = e => {
    let activeElement = document.activeElement.tagName.toLowerCase;
    if(activeElement == `input` || activeElement == `textarea`) return;
    switch(e.keyCode) {
        case keybinds.sail: document.querySelector(`#exit-island-button`).click(); break;
        case keybinds.abandonShip: document.querySelector(`#abandon-ship-button`).click(); break;
        case keybinds.dock: document.querySelector(`#btn-hacks-dock`).click();
        default: return;
    }
}

//Script Functions
const toggleModal = (action, modal) => action ? modal.style.display = `block`: modal.style.display = `none`;


//Data
const localStorage = action => {
    let settingsConfig = {
        color: {
            r: document.querySelector(`.colorMenu .r`).value,
            g: document.querySelector(`.colorMenu .g`).value,
            b: document.querySelector(`.colorMenu .b`).value,
            a: document.querySelector(`.colorMenu .a`).value
        },
        backgroundColor: {
            r: document.querySelector(`.backgroundColorMenu .r`).value,
            g: document.querySelector(`.backgroundColorMenu .g`).value,
            b: document.querySelector(`.backgroundColorMenu .b`).value,
            a: document.querySelector(`.backgroundColorMenu .a`).value
        },
        border: {
            color: {
                r: document.querySelector(`.borderMenu .colorSect .r`).value,
                g: document.querySelector(`.borderMenu .colorSect .g`).value,
                b: document.querySelector(`.borderMenu .colorSect .b`).value,
                a: document.querySelector(`.borderMenu .colorSect .a`).value
            },
            type: document.querySelector(`.borderMenu .type`).value,
            radius: document.querySelector(`.borderMenu .radius`).value,
        },
        opacity: {
            gui: document.querySelector(`.opacityMenu .gui`).value * 100,
            modals: document.querySelector(`.opacityMenu .modals`).value * 100
        }
    }
    (styling = settingsConfig).catch(err => console.err(`${err}\nFailed to set userdata. Additional logging may be shown above.`));
    let lsSettingConfig = localStorage.getItem(`settingConfig`);

    if(action == null) localStorage.setItem(`settingConfig`, styling);
    else if(action) lsSettingConfig ? styling = JSON.parse(lsSettingConfig) : localStorage.setItem(`settings`, JSON.stringify(styling));
    else if(!action) localStorage.setItem(`settingConfig`, JSON.stringify(settingsConfig));
    else return;
}

//Game Injection
const injectSettings = () => {
    //Create Hack Settings Modal
    let scriptSettingsModal = document.createElement(`div`);
    scriptSettingsModal.outerHTML = `
    <div class="absolute-center" id="script-settings-modal" style="width: 500px; height: 330px;">
    <div class = "modal-content">
        <div class = "btn btn-secondary btn-sm float-right toggle-script-settings"><i class="icofont icofont-ui-close"></i></div>
    </div>
    <h6 class="modal-title">Script Settings</h6>
    <div class="container">
        <h5>Hacks</h5>
        <div class="script-container hacks"></div>
        <h5>Styling</h5>
        <div class="script-container styling">
            <h6>Color</h6>
            <div class="colorMenu">
                <input type="number" class="r" min="0" max="255">
                <input type="number" class="g" min="0" max="255">
                <input type="number" class="b" min="0" max="255">
                <input type="number" class="a" min="0" max="255">
            </div>
            <h6>Background</h6>
            <div class="backgroundColorMenu">
                <input type="number" class="r" min="0" max="255">
                <input type="number" class="g" min="0" max="255">
                <input type="number" class="b" min="0" max="255">
                <input type="number" class="a" min="0" max="255">
            </div>
            <h6>Borders</h6>
            <div class="borderMenu">
                <div class="color">
                    <input type="number" class="r" min="0" max="255">
                    <input type="number" class="g" min="0" max="255">
                    <input type="number" class="b" min="0" max="255">
                    <input type="number" class="a" min="0" max="255">
                </div>
                <div class="other-info">
                    <select name="border-type" class="type"></select>
                    <input type="number" class="radius">
                    <select name="border-radius-unit" class="radius-unit"></select>
                </div>
            </div>
            <h6>Opacity</h6>
            <div class="opacityMenu">
                <input type="range" class="gui" min="0" max="100">
                <input type="range" class="modals" min="0" max="100">
            </div>
        </div>
    </div>
</div>`;
}
const injectButtons = () => {
    //Insert Krew Info Buttons
    let krewInfoDC = document.querySelectorAll(`#krew-div > div`)[1];
    let kiBR = document.querySelector(`#krew-div > div > br`);
    
    let dockBtn = document.createElement(`span`);
    dockBtn.outerHTML = `<span class="btn-primary btn btn-sm" id="dock-ship-btn" style="display: inline-block; padding-right: 5px;"><i class="icofont icofont-sail-boat-alt-1" style="margin-right: 5px;"></i>Dock</span>`;
    dockBtn.addEventListener(`click`, e => document.querySelector(`#docking-modal-button`).click());

    let crashServerBtn = document.createElement(`span`);
    crashServerBtn.outerHTML = `<span style="btn-danger btn btn-sm" id="crash-server-btn" style="display: inline-block;" style="padding-right: 5px;"><i class="icofont icofont-stop" style="margin-right: 5px;"></i>Crash</span>`;
    crashServerBtn.addEventListener(e => crashServer(e));

    krewInfoDC.insertBefore(dockBtn, kiBR);
    krewInfoDC.insertBefore(crashServerBtn, kiBR);

    //Insert Chat Buttons
    let cbWrapper = document.querySelector(`#chat-div`);
    document.querySelector(`#chat-div > a`).remove();

    let wikiBtn = document.createElement(`span`);
    wikiBtn.outerHTML = `<span class="btn-warning btn btn-sm" style="padding-right: 5px;"><i class="icofont icofont-ui-note" style="margin-right: 5px;"></i>Wiki`;
    wikiBtn.addEventListener(`click`, e => window.open(`https://krew-io.fandom.com/wiki/Krew.io_Wiki`));

    let discordBtn = document.createElement(`span`);
    discordBtn.outerHTML = `<span class="btn-success btn btn-sm" style="padding-right: 5px;"><i class="icofont icofont-comment" style="margin-right: 5px;"></i>Discord`;
    discordBtn.addEventListener(`click`, e => window.open(`https://discord.me/krew-io`));

    document.querySelector(`#hide-chat`).innerHTML = `<i class = "icofont icofont-simple-down" style = "margin-right: 5px;"></i>Hide Chat`;
    document.querySelector(`#show-chat`).innerHTML = `<i class = "icofont icofont-simple-up" style = "margin-right: 5px;"></i>Show Chat`;

    cbWrapper.appendChild(wikiBtn);
    cbWrapper.appendChild(discordBtn);

    let scriptSettings = document.querySelector(`#script-settings-modal`);
    let ssCB = document.querySelector(`#hack-settings-modal > .modal-content > .modal-header > .toggle-script-settings`);
    ssCB.addEventListener(`click`, e => scriptSettings.style.display = `none` ? scriptSettings.style.display = `block` : scriptSettings.style.display = `none`);
}
const injectCSS = () => {
    let scriptCSS = document.head.createElement(`style`);
    style.innerHTML = ``;

    let overlayCSS = document.head.createElement(`style`);
}
const injectStyling = styleHeader => {
    document.querySelectorAll(`*`).forEach(element => {
        element.style.color = `rgba(${styleHeader.color.r}, ${styleHeader.color.g}, ${styleHeader.color.b}, ${styleHeader.color.a});`;
        element.style.backgroundColor = `rgba(${styleHeader.backgroundColor.r}, ${styleHeader.backgroundColor.g}, ${styleHeader.backgroundColor.b}, ${styleHeader.backgroundColor.a});`;
    });
    document.querySelectorAll(`#game > *, #center-div, .popover-content, .modals`).forEach(element =>);
}
