/*
 * @Date: 2023-11-15 14:33:04
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-15 17:25:30
 * @FilePath: /chrome-extension/src/components/debugButton.tsx
 */
import React from 'react';
import { Button } from '@mui/material';
import { env } from '@/utils/constants';

const DebugButton = (): React.JSX.Element | null => {
  const handleReload = async (): Promise<void> => {
    chrome.runtime.reload();
  };

  return env === 'development' ? (
    <Button variant="contained" onClick={handleReload}>
      重新加载插件
    </Button>
  ) : null;
};

export default DebugButton;
