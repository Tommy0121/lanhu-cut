/*
 * @Date: 2023-11-15 15:29:05
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-29 14:06:30
 * @FilePath: /chrome-extension/src/components/TokenForm.tsx
 */
import React, { useContext, useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { RepoContext, type RepoInfo } from '@/hooks/useRepoInfoContext';

const TokenForm = (): React.JSX.Element | null => {
  const { repoInfo, saveRepoInfo } = useContext(RepoContext);
  const tempRepoInfo = useRef<RepoInfo>(repoInfo);
  tempRepoInfo.current = repoInfo;
  const handleSaveRepoInfo = (): void => {
    saveRepoInfo(tempRepoInfo.current);
  };
  return (
    <div>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 2 },
          '& .MuiButtonBase-root': { m: 2 },
        }}
        component={'form'}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            key={repoInfo.token}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              tempRepoInfo.current.token = e.target.value;
            }}
            defaultValue={repoInfo.token}
            label="token"
            placeholder="请输入Gitlab Token"
            helperText=""
          />
        </div>
        <div>
          <TextField
            key={repoInfo.domain}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              tempRepoInfo.current.domain = e.target.value;
            }}
            defaultValue={repoInfo.domain}
            label="域名"
            placeholder="请输入Gitlab 域名"
          />
        </div>
        <div>
          <TextField
            key={repoInfo.projectId}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              tempRepoInfo.current.projectId = e.target.value;
            }}
            defaultValue={repoInfo.projectId}
            label="图库项目Id"
            placeholder="请输入图库项目Id"
          />
        </div>
        <Button type="button" variant="contained" onClick={handleSaveRepoInfo}>
          保存
        </Button>
      </Box>
    </div>
  );
};

export default TokenForm;
