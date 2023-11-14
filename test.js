/*
 * @Date: 2023-11-09 10:13:03
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-09 10:13:18
 * @FilePath: /chrome-extension/test.js
 */
(function () {
  const originDispatch = EventTarget.prototype.dispatchEvent
  Object.defineProperty(HTMLAnchorElement.prototype, 'dispatchEvent', {
    writable: true,
    configurable: true,
    enumerable: true,
    value: function (event) {
      console.error(event)
      const { href } = this
      if (this.nodeName === 'A' && this.download) {
        return false
      }
      console.error(this, href)
      return originDispatch.apply(this, [event])
    }
  })
  console.error('asfdasdfasdf')
})()
