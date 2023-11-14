/*
 * @Author: tommyxia 709177815@qq.com
 * @Date: 2023-10-25 12:11:54
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-09 11:09:44
 * @FilePath: /chrome-extension/index.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'chrome-types/index.d.ts'



declare global {
  interface Window {
    bbb: string
  }
  interface Document {
    bbb: string
  }
}
