/*
 * @Author: tommyxia 709177815@qq.com
 * @Date: 2023-10-19 10:00:50
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-15 10:27:08
 * @FilePath: /chrome-extension/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRoot } from 'react-dom/client'
import App from './app'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import React from 'react'
import './global.scss'
const root = createRoot(document.getElementById('app') as Element)
root.render(<App />)
