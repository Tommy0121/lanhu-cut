/*
 * @Date: 2023-11-15 15:29:05
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-21 10:17:57
 * @FilePath: /chrome-extension/src/components/TokenForm.tsx
 */
import React, { useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { RepoContext, type RepoInfo } from '@/hooks/useRepoInfoContext';
const tempRepoInfo: RepoInfo = {
  token: '',
  domain: '',
};

const TokenForm = (): React.JSX.Element | null => {
  const { repoInfo, saveRepoInfo } = useContext(RepoContext);
  const handleSaveRepoInfo = (): void => {
    saveRepoInfo(tempRepoInfo);
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
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              // setRepoInfo({ ...repoInfo, token: e.target.value });
              tempRepoInfo.token = e.target.value;
            }}
            defaultValue={repoInfo.token}
            label="token"
            placeholder="请输入Gitlab Token"
            helperText=""
          />
        </div>
        <div>
          <TextField
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              // setRepoInfo({ ...repoInfo, domain: e.target.value });
              tempRepoInfo.domain = e.target.value;
            }}
            defaultValue={repoInfo.domain}
            label="域名"
            placeholder="请输入Gitlab 域名"
          />
        </div>
        <Button type="button" variant="contained" onClick={handleSaveRepoInfo}>
          提交
        </Button>
      </Box>
    </div>
  );
};

export default TokenForm;
