(function () {
  window.bbb = '1'
  window.EventTarget.prototype.dispatchEvent = function () { console.log('aaa'); return false }
})()
