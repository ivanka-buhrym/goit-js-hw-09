!function(){var t={body:document.querySelector("body"),startButton:document.querySelector("[data-start]"),stopButton:document.querySelector("[data-stop]")},o={timerId:null,onStartClick:function(){var o=this;this.timerId=setInterval((function(){var r=o.getRandomHexColor();t.body.style.backgroundColor=r,console.log(r),n(t.startButton),e(t.stopButton)}),1e3)},onStopClick:function(){clearInterval(this.timerId),n(t.stopButton),e(t.startButton)},getRandomHexColor:function(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}};function n(t){t.setAttribute("disabled","disabled")}function e(t){t.removeAttribute("disabled")}t.startButton.addEventListener("click",(function(){o.onStartClick()})),t.stopButton.addEventListener("click",(function(){o.onStopClick()}))}();
//# sourceMappingURL=01-color-switcher.14b03a7b.js.map