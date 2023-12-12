/*
 * @Author: tommyxia 709177815@qq.com
 * @Date: 2023-10-19 11:28:36
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 21:03:12
 * @FilePath: /chrome-extension/src/app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import DebugButton from './components/DebugButton';
import { isProd } from '@/utils/constants';
import TokenForm from './components/TokenForm';
import useRepoInfo from './hooks/useRepoInfoContext';
import ChooseProject from './components/ChooseProject';
export default function App(): React.JSX.Element {
  const { repoInfo, RepoContext, saveRepoInfo } = useRepoInfo();
  // 用参数控制填写token还是选择项目
  const isChoosePage =
    new URLSearchParams(window.location.search)?.get('isChoosePage')?.length ?? 0;

  return (
    <RepoContext.Provider value={{ repoInfo, saveRepoInfo }}>
      {isProd ? null : <DebugButton />}
      <ChooseProject />
      {/* {isChoosePage ? (
        <div></div>
      ) : (
        <div>
          {isProd ? null : <DebugButton />}
          {repoInfo.token ? null : <TokenForm />}
        </div>
      )} */}
    </RepoContext.Provider>
  );
}
