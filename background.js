/*
 * http://github.com/RintarouTW/SimplifiedFilter
 */

'use strict';

if (typeof (chrome.runtime) != "undefined") { // prevent error on the chrome-extension://

  chrome.runtime.onInstalled.addListener(function () {

    (async () => {

      let defaults = await import("./default.js"); // Default Options

      chrome.storage.local.set(defaults);

    })();

  });

  chrome.browserAction.onClicked.addListener(function (tab) {

    chrome.browserAction.getBadgeText({ tabId: tab.id }, function (text) {

      if (text == "Off") {

        //chrome.browserAction.setBadgeText({text: "0", tabId: tab.id});
        chrome.storage.local.set({ Enabled: true });

      } else if (text !== "") {

        //chrome.browserAction.setBadgeText({text: "Off", tabId: tab.id});
        chrome.storage.local.set({ Enabled: false });
      }

    });

  });

  chrome.runtime.onMessage.addListener(function (detail, sender, sendResponse) {

    console.log(detail.cmd);

    if (detail.cmd == "SetBage") {

      chrome.browserAction.setBadgeText({ text: detail.text, tabId: sender.tab.id });

      //console.log(detail.cmd + "/" + sender.tab.id);
    }

    sendResponse("resp");
  });

  console.log("background.js");

} else console.log("chrome.runtime is undefined");