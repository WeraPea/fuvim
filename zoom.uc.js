// ==UserScript==
// @name           Ctrl + shift + {j, k} to zoom in/out tabs around.
// @version        1.0.0
// @author         werapi
// ==/UserScript==
let zoom = {
  get value() {
    return _ucUtils.prefs.get("browser.zoom.full").value
      ? gBrowser.fullZoom
      : gBrowser.textZoom;
  },
  set value(newValue) {
    if (_ucUtils.prefs.get("browser.zoom.full").value) {
      gBrowser.fullZoom = newValue;
    } else {
      gBrowser.textZoom = newValue;
    }
  },
  increase() {
    let maxZoom = _ucUtils.prefs.get("zoom.maxPercent").value / 100;
    if (clamp()) {
      this.value = this.value * 1.1 <= maxZoom ? this.value * 1.1 : maxZoom;
    } else {
      this.value = this.value * 1.1 <= maxZoom ? this.value * 1.1 : this.value;
    }
  },
  decrease() {
    let minZoom = _ucUtils.prefs.get("zoom.minPercent").value / 100;
    if (clamp()) {
      this.value = this.value / 1.1 >= minZoom ? this.value / 1.1 : minZoom;
    } else {
      this.value = this.value / 1.1 >= minZoom ? this.value / 1.1 : this.value;
    }
  },
};

clamp = () => {
  _ucUtils.prefs.get("fuvim.clampZoom").defaultTo(false);
  return _ucUtils.prefs.get("fuvim.clampZoom").value;
};

(function () {
  let hotkeyZoomIn = {
    id: "key_zoomIn",
    key: "K",
    modifiers: "accel shift",
    command: () => {
      zoom.increase();
    },
  };
  _ucUtils.hotkeys.define(hotkeyZoomIn).autoAttach({ suppressOriginal: true });

  let hotkeyZoomOut = {
    id: "key_zoomOut",
    key: "J",
    modifiers: "accel shift",
    command: () => {
      zoom.decrease();
    },
  };
  _ucUtils.hotkeys.define(hotkeyZoomOut).autoAttach({ suppressOriginal: true });

  let hotkeyZoomReset = {
    id: "key_zoomReset",
    keycode: "VK_BACK",
    modifiers: "accel,shift",
    command: "cmd_key_zoomReset",
  };
  let hotkeyZoomResetCommand = {
    id: hotkeyZoomReset.command,
    command: () => {
      zoom.value = 1;
    },
  };
  new _ucUtils.hotkeys(hotkeyZoomReset, hotkeyZoomResetCommand).autoAttach({
    suppressOriginal: true,
  });
})();
