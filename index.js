// ==UserScript==
// @name         Krew.io Hacks 3.0
// @namespace    https://tampermonkey.net/
// @version      2.9.2b
// @description  Best hacks for krew.io!
// @author       DamienVesper
// @match        *://krew.io/
// @match        *://*.krew.io/
// @exclude      *://beta.krew.io/
// @exclude      *://*.beta.krew.io/
// @downloadURL  https://raw.githubusercontent.com/DamienVesper/krewio-hacks/3.0-dev/index.js
// @updateURL    https://raw.githubusercontent.com/DamienVesper/krewio-hacks/3.0-dev/index.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /*
    LEGAL
     - All code licensed under the Apache 2.0 License on GitHub. Code copyright 2019 by DamienVesper. All rights reserved.
     - Any reproductions of this and other related works that are found to be in violence of this code will be reported and removed.

    TODO
     - Kicking Members as Krew Hack [PRIORITY]
     - Max Shop Menu [PRIORITY]
     - Dark Mode
     - Latency Customizer
     - Keybinds
     - Keybind List
     - Keybind Customization
     - Hack Toggling Settings
     - Volume Settings

    DISCONTINUED
     - Rebuild Inputs into Forms
    */

    //Initialize Variables
    var togglesSettingsController = {
        hackInstaDock: true,
        hackSpamSail: false,
        hackSpamParties: false,
        hackAutoKick: false,
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
        toggleTopLeft: true,
        toggleTopRight: true,
        toggleCenterRight: true,
        toggleBottomLeft: true,
        toggleBottomCenter: true,
        toggleBottomRight: true
    };
    var soundController = {
        volumeSFX: 100,
        volumeRadio: 100
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
    function updateVariables() {
        togglesSettingsController.hackInstaDock = document.querySelector(``).checked;
        togglesSettingsController.hackSpamSail = document.querySelector(``).checked;
        togglesSettingsController.hackSpamParties = document.querySelector(``).checked;
        togglesSettingsController.hackAutoKick = document.querySelector(``).checked;

        /*
        keybindController.toggleSpamSail = null;
        keybindController.toggleSpamParties = null;
        keybindController.toggleAutoKick = null;
        keybindController.clickSail = null;
        keybindController.clickAbandonShip = null;
        keybindController.clickDock = null;
        */

        cssController.colorR = document.querySelector(``).value;
        cssController.colorG = document.querySelector(``).value;
        cssController.colorB = document.querySelector(``).value;
        cssController.backgroundColorR = document.querySelector(``).value;
        cssController.backgroundColorB = document.querySelector(``).value;
        cssController.backgroundColorG = document.querySelector(``).value;
        cssController.opacityGUI = document.querySelector(``).value;
        cssController.opacityModal = document.querySelector(``).value;

        miscellaneousController.toggleTopLeft = document.querySelector(``).checked;
        miscellaneousController.toggleTopRight = document.querySelector(``).checked;
        miscellaneousController.toggleCenterRight = document.querySelector(``).checked;
        miscellaneousController.toggleBottomLeft = document.querySelector(``).checked;
        miscellaneousController.toggleBottomCenter = document.querySelector(``).checked;
        miscellaneousController.toggleBottomRight = document.querySelector(``).checked;

        soundController.volumeSFX = document.querySelector(``).value;
        soundController.volumeRadio = document.querySelector(``).value;
    }
    function keyController(e) {
        if(document.activeElement.tagName.toString().toLowerCase() == `input`) return console.error(`Failed to execute keyController(${e}) as current element focus is an input or the hack settings modal is open.`);
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

    //Display Functions
    function addCSS() {
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

` //.btn-secondary {}
+ `.btn-secondary:hover {
    color: #663399;
}
`;
    }
    function addSettings() {
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
<h5>Hack Toggling</h5>
<div class = "settings-container">
    <input class = "slider" id = "hack-instaDock" type = "checkbox" name = "hack-" checked />,span style = "margin-left: 5px;">Insta Dock</span>
    <input class = "slider" id = "hack-spamSail" type = "checkbox" name = "hack-" />,span style = "margin-left: 5px;">Spam Sail</span>
    <input class = "slider" id = "hack-spamKrews" type = "checkbox" name = "hack-" />,span style = "margin-left: 5px;">Spam Krews</span>
    <input class = "slider" id = "hack-autoMemberKick" type = "checkbox" name = "hack-" />,span style = "margin-left: 5px;">Auto Member Kick</span>
</div>
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
    }
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
        chatButtonsDiv.insertBefore(wikiButton, hideChatButton);
        wikiButton.addEventListener(`click`, function() {
            window.open(`https://krew-io.fandom.com/wiki/Krew.io_Wiki/`);
        });

        let hackDiscordButton = document.createElement(`span`);
        hackDiscordButton.innerHTML = `<i class = "icofont icofont-ui-message" style = "margin-right: 5px;"></i>Hack Discord`;
        hackDiscordButton.classList.add(`btn`, `btn-sm`, `btn-primary`, `btn-secondary`); //.btn-secondary
        chatButtonsDiv.appendChild(hackDiscordButton);
        hackDiscordButton.addEventListener(`click`, function() {
            window.open(`https://discord.me/iocommunity/`);
        });

        let discordButton = document.querySelector(`#chat-div > a`);
        discordButton.innerHTML = `<i class = "icofont icofont-comment" style = "margin-right: 5px;"></i>Discord`;

        hideChatButton.innerHTML = `<i class = "icofont icofont-simple-down" style = "margin-right: 5px;"></i>Hide Chat`;
        showChatButton.innerHTML = `<i class = "icofont icofont-simple-up" style = "margin-right: 5px;"></i>Show Chat`;
    }
    function makeOverlay() {
        let shipStatusOverlay = document.querySelector(`#ship-status-modal`);
        let krewOverlay = document.querySelector(`#krew-list-modal`);
        let customizableOverlays = document.querySelectorAll(`#ship-status-modal, #krew-list-modal, #chat-div, #leaderboard, #hack-settings-modal`);
        let shopOverlay = document.querySelector(`#shopping-modal`);
        let earnGold = document.querySelector(`#earn-gold`);
        let goldArea = document.querySelector(`#gold-div`);
        let miniMap = document.querySelector(`#minimap-container`);
        let chatArea = document.querySelector(`#chat-div`);
        let chatBtn = document.querySelector(`#show-chat`);
        let toggleKrewListBtn = document.querySelector(`#toggle-krew-list-modal-button`);
        let toggleShipStatusBtn = document.querySelector(`.togle-ship-status-button`);

        shipStatusOverlay.style.top = `35%`;
        shipStatusOverlay.style.left = `14.25%`;
        krewOverlay.style.top = `0`;
        krewOverlay.style.right = `250px`;
        shopOverlay.style.top = `0`;
        shopOverlay.style.right = `250px`;
        chatArea.style.right = `0`;
        chatArea.style.bottom = `0`;
        miniMap.style.left = `15px`;
        miniMap.style.bottom = `-30px`;
        goldArea.style.left = `0`;
        goldArea.style.bottom = `275px`;
        earnGold.style.left = `25px`;
        earnGold.style.bottom = `375px`;
        chatBtn.style.right = `0`;
        chatBtn.style.bottom = `0`;

        toggleKrewListBtn.click();
        toggleShipStatusBtn.click();
    }
    function randomStyles() {
        document.querySelector(`.my-krew-name`).style.marginRight = `5px`;
        let allElements = document.querySelectorAll(`*`);
        for(let i = 0; i < allElements.length; i++) {
            allElements[i].style.transition = `0.3s`;
        };
    }

    //Hack Functions
    function instaDock() {
        let dockButton = document.querySelector(`#docking-modal-button`);
        dockButton.innerHTML = `Dock (z)`;
        dockButton.classList.remove(`disabled`);
        dockButton.classList.add(`enabled`);
    }
    function spamSail() {
        let sailButton = document.querySelector(`#exit-island-button`);
        sailButton.click();
    }
    function autoMemberKick() {
        let kickMemberButtons = document.querySelectorAll(``);
        if(!kickMemberButtons || kickMemberButtons.length == 0) return console.error(`Could not find any members to kick or you are not kaptain of the ship.`);
        for(let i = 0; i < kickMemberButtons.length; i++) {
            kickMemberButtons.click();
        }
    }
    function shopHacks() {
        let shoppingModal = document.querySelector(`#shopping-modal`);
        let itemsButton = document.querySelector(``);
        let shipsButton = document.querySelector(``);
        let cargoButton = document.querySelector(``);

        if(cargoButton) return;
        else if(itemsButton) {
            let itemsArea = document.querySelector(``);
            let newItemsArea = ``;
            function Item(name, description, cost, id) {
                let itemContainer = document.createElement(`tr`);
                let nameArea = document.createElement(`td`);
                let descriptionArea = document.createElement(`td`);
                let costArea = document.createElement(`td`);
                let idArea = document.createElement(`td`);
                let idButton = document.createElement(`button`);

                nameArea.innerHTML = name;
                descriptionArea.innerHTML = description;
                costArea.innerHTML = cost;
                idButton.id = `${id}`;

                itemContainer.appendChild(nameArea);
                itemContainer.appendChild(descriptionArea);
                itemContainer.appendChild(costArea);

                idButton.classList.add(`btn-primary`);
                idArea.appendChild(idButton);
                itemContainer.appendChild(idArea);
            }

            newItemsArea += new Item(`Cannon`, `Allows shooting for seadog`, 500, null);
            newItemsArea += new Item(`Fishing Rod`, `Allows fishing for seadog`, 500, null);
            newItemsArea += new Item(`Fire Rate Upgrade`, `1% Fire Rate`, 4000, null);
            newItemsArea += new Item(`Distance Upgrade`, `1% Distance`, 3000, null);
            newItemsArea += new Item(`Damage Upgrade`, `+1 Damage`, 5000, null);
            newItemsArea += new Item(`Ship Speed Upgrade`, `+0.01 Ship Speed
Only works if you are kaptain`, null);
            newItemsArea += new Item(`Steel Barrel`, `30% Distance`, 30000, null);
            newItemsArea += new Item(`Sinker's Gloves`, `30% Fire Rate`, 40000, null);
            newItemsArea += new Item(`Air Pegleg`, `+1 Ship Speed
Only works if you are kaptain`, 35000, null);
            newItemsArea += new Item(`Drifter`, `+0.1 Ship Speed
+4 Damage`, 25000, null);
            newItemsArea += new Item(`Bruiser`, `10% Fire Rate
+4 Damage`, 20000, null);
            newItemsArea += new Item(`Blue Gunpowder`, `+10 Damage`, 50000, null);
            newItemsArea += new Item(`Demolisher`, `25% Fire Rate
+8 Damage`, 70000, null);
            itemsArea.innerHTML = `
<table>
    <th>
        <td>Name</td>
        <td>Description</td>
        <td>Cost</td>
        <td>Actions</td>
    </th>
    ${newItemsArea}
</table>
`;
        }
        else if (shipsButton) {
            let shipsArea = document.querySelector(``);
            let newShipsArea = ``;
            function Ship(name, health, krew, cargo, speed, cost, id) {
                let shipContainer = document.createElement(`tr`);
                let nameArea = document.createElement(`td`);
                let healthArea = document.createElement(`td`);
                let krewArea = document.createElement(`td`);
                let cargoArea = document.createElement(`td`);
                let speedArea = document.createElement(`td`);
                let costArea = document.createElement(`td`);
                let idArea = document.createElement(`td`);
                let idButton = document.createElement(`button`);

                nameArea.innerHTML = name;
                healthArea.innerHTML = health;
                krewArea.innerHTML = krew;
                cargoArea.innerHTML = cargo;
                speedArea.innerHTML = speed;
                costArea.innerHTML = cost;
                idButton.id = `${id}`;

                shipContainer.appendChild(nameArea);
                shipContainer.appendChild(healthArea);
                shipContainer.appendChild(krewArea);
                shipContainer.appendChild(cargoArea);
                shipContainer.appendChild(speedArea);
                shipContainer.appendChild(costArea);
                shipContainer.appendChild(idArea);

                idButton.classList.add(`btn-primary`);
                idArea.appendChild(idButton);
                return shipContainer;
            }

            newShipsArea += new Ship(`Wood Plank`, 25, 1, 50, 6.5, 0, null);
            newShipsArea += new Ship(`Raft 1`, 50, 1, 100, 5.9, 500, null);
            newShipsArea += new Ship(`Raft 2`, 100, 2, 200, 5.8, 1300, null);
            newShipsArea += new Ship(`Raft 3`, 150, 3, 300, 5.7, 2400, null);
            newShipsArea += new Ship(`Baby Fancy`, 300, 3, 500, 5.9, 3600, null);
            newShipsArea += new Ship(`Baby Fancy 2`, 500, 3, 600, 5.9, 18000, null);
            newShipsArea += new Ship(`Trader 1`, 300, 4, 2000, 4.5, 5200, null);
            newShipsArea += new Ship(`Trader 2`, 450, 6, 4000, 4.5, 15000, null);
            newShipsArea += new Ship(`Trader 3`, 600, 6, 6000, 4.5, 3000, null);
            newShipsArea += new Ship(`Boat 1`, 300, 5, 500, 5.9, 4500, null);
            newShipsArea += new Ship(`Boat 2`, 500, 6, 600, 5.8, 6700, null);
            newShipsArea += new Ship(`Boat 3`, 500, 7, 750, 5.7, 16000, null);
            newShipsArea += new Ship(`Destroyer 1`, 1200, 12, 1200, 5.8, 50000, null);
            newShipsArea += new Ship(`Destroyer 2`, 1800, 14, 1800, 5.7, 70000, null);
            newShipsArea += new Ship(`Destroyer 3`, 2600, 16, 2600, 5.6, 85000, null);
            newShipsArea += new Ship(`Royal Fortune`, 1000, null, 1000, 6, 105000, null);
            newShipsArea += new Ship(`Royal Fortune 2`, 1500, null, 1500, 5.9, 12000, null);
            newShipsArea += new Ship(`Calm Spirit`, null, 18, null, 5.9, null, null);
            newShipsArea += new Ship(`Calm Spirit 2`, 1800, 18, null, 5.9, 180000, null);
            newShipsArea += new Ship(`Queen Barb's Justice`, 3000, 20, 3000, 5.9, 200000, null);
            newShipsArea += new Ship(`Queen Barb's Justice 2`, 4000, 25, 4000, 5.8, 350000, null);

            shipsArea.innerHTML = `
<table>
    <th>
       <td>Name</td>
       <td>Health</td>
       <td>Krew</td>
       <td>Cargo</td>
       <td>Speed</td>
       <td>Cost</td>
       <td>Actions</td>
    </th>
    ${newShipsArea}
</table>
`;
        }
        else return console.error(`Could not determine current pane of the shops menu.`);
    }
    function allowMemberKick() {
        let memberAreas = document.querySelectorAll(``);
        function memberKickButton() {
            let memberKickWrapper = document.createElement(`td`);
            let memberKickSpan = document.createElement(`span`);
            memberKickSpan.innerHTML = `<i class = "icofont icofont-ui-close"></i>`;
            memberKickSpan.classList.add(`btn`, `btn-red`, `btn-member-kick`);
            memberKickWrapper.appendChild(memberKickSpan);
            return memberKickWrapper;
        };

        if(!memberAreas || memberAreas.length == 0 || memberAreas.length == 1) return;
        for(let i = 0; i < memberAreas.length; i++) {
            let memberKick = new memberKickButton();
            memberAreas[i].appendChild(memberKick);
        }
    }
    function spamKrews() {
        let joinKrewButtons = document.querySelectorAll(``);
        for(let i = 0; i < joinKrewButtons.length; i++) {
            joinKrewButtons[i].click();
        }
    }
    function keepGUI() {
        let keepButtons = document.querySelector(`#exit-island-button, #abandon-ship-button, #hacks-dock-button`);
        for(let i = 0; i < keepButtons.length; i++) {
            keepButtons[i].style.display = `block`;
        }
        let disabledElements = document.querySelectorAll(`input:disabled, button:disabled, select:disabled, option:disabled`);
        for(let i = 0; i < disabledElements.length; i++) {
            disabledElements[i].disabled = false;
        }
        let otherDisabledElements = document.querySelectorAll(`.disabled`);
        for(let i = 0; i < otherDisabledElements.length; i++) {
            otherDisabledElements[i].classList.remove(`disabled`);
            otherDisabledElements[i].classList.add(`enabled`);
        }
    }

    //Runtime Functions
    function singleRuntime() {
        addCSS();
        addSettings();
        addHackElements();
        setTimeout(makeOverlay, 500);
        randomStyles();
        localStorageLoad();
        document.addEventListener(`keydown`, function(e){keyController(e)});
    }
    function mainRuntime() {
        updateVariables();
        localStorageSave();
    }

    //Main Code
    singleRuntime();
    setInterval(mainRuntime, 100);
})();
