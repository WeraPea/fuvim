// ==UserScript==
// @name           Alt + {shift, _} + {h, l} to move/switch tabs around.
// @version        1.0.0
// @author         werapi
// ==/UserScript==
(function () {
  _ucUtils.prefs.set("ui.key.menuAccessKey", 0); // disable alt+key to interact with the menubar, TODO: replace with disabling alt+h menubar hotkey
  let hotkeyNext = {
    id: "key_goNext",
    key: "L",
    modifiers: "alt",
    command: () => {
      let currentIndex = gBrowser.tabs.indexOf(gBrowser.selectedTab);
      let nextIndex = (currentIndex + 1) % gBrowser.tabs.length;
      gBrowser.selectedTab = gBrowser.tabs[nextIndex];
    },
  };
  _ucUtils.hotkeys.define(hotkeyNext).autoAttach({ suppressOriginal: true });

  let hotkeyPrevious = {
    id: "key_goPrevious",
    key: "H",
    modifiers: "alt",
    command: () => {
      let currentIndex = gBrowser.tabs.indexOf(gBrowser.selectedTab);
      let previousIndex =
        (currentIndex - 1 + gBrowser.tabs.length) % gBrowser.tabs.length;
      gBrowser.selectedTab = gBrowser.tabs[previousIndex];
    },
  };
  _ucUtils.hotkeys
    .define(hotkeyPrevious)
    .autoAttach({ suppressOriginal: true });

  let hotkeySwitchNext = {
    id: "key_switchNext",
    key: "L",
    modifiers: "alt shift",
    command: () => {
      gBrowser.moveTabForward();
    },
  };
  _ucUtils.hotkeys
    .define(hotkeySwitchNext)
    .autoAttach({ suppressOriginal: true });

  let hotkeySwitchPrevious = {
    id: "key_switchPrevious",
    key: "H",
    modifiers: "alt shift",
    command: () => {
      gBrowser.moveTabBackward();
    },
  };
  _ucUtils.hotkeys
    .define(hotkeySwitchPrevious)
    .autoAttach({ suppressOriginal: true });
})();
