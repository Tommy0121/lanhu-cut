/*
 * @Date: 2023-11-10 13:36:31
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 20:50:27
 * @FilePath: /chrome-extension/src/inject.ts
 */
(function () {
  const originDispatch = EventTarget.prototype.dispatchEvent;
  HTMLAnchorElement.prototype.dispatchEvent = function (event) {
    const nodeName = this.nodeName;
    const href = this.href;
    const filename = this.download;
    if (nodeName === 'A' && filename && /^blob:/.test(href)) {
      // 将内容post给popup并且让用户选择所上传的文件夹
      window.postMessage({
        type: 'intercept file',
        file: href,
      });
      console.warn(filename, href);
      return false;
    }
    return originDispatch.call(this, event);
  };
})();
