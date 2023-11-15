/*
 * @Author: tommyxia 709177815@qq.com
 * @Date: 2023-10-19 11:28:36
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-15 10:38:07
 * @FilePath: /chrome-extension/src/app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Button } from '@mui/material'
export default function App (): React.JSX.Element {
  const handleReload = async (): Promise<void> => {
    chrome.runtime.reload()
  }
  return <div>
    <Button variant="contained" onClick={handleReload}>重新加载插件</Button>
  </div>
}
