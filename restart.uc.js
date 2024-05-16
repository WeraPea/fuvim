// ==UserScript==
// @name           Restart with cleared startup cache
// @version        1.0.0
// @author         werapi
// @description    Press Ctrl+Shift+R to restart firefox and clear startup cache. Configure by changing modifiers and key values below.
// ==/UserScript==
(function () {
  let hotkey = {
    id: "key_restartCache",
    key: "R",
    modifiers: "accel shift",
    command: () => _ucUtils.restart(true),
  };
  _ucUtils.hotkeys.define(hotkey).autoAttach({ suppressOriginal: true });
})();
