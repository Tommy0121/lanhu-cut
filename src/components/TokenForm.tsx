/*
 * @Date: 2023-11-15 15:29:05
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2024-01-04 09:42:39
 * @FilePath: /chrome-extension/src/components/TokenForm.tsx
 */
import React, { useContext, useRef, useState } from 'react';
import { Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import { RepoContext, type RepoInfo } from '@/hooks/useRepoInfoContext';

const TokenForm = (): React.JSX.Element | null => {
  const { repoInfo, saveRepoInfo } = useContext(RepoContext);
  const tempRepoInfo = useRef<RepoInfo>(repoInfo);
  const [open, setOpen] = useState(false);
  tempRepoInfo.current = repoInfo;
  const handleSaveRepoInfo = async (): Promise<void> => {
    await saveRepoInfo(tempRepoInfo.current);
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    <div>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 2, width: '280px' },
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
        <div>
          <TextField
            key={repoInfo.baseOSSUrl}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              tempRepoInfo.current.baseOSSUrl = e.target.value;
            }}
            defaultValue={repoInfo.baseOSSUrl}
            label="oss域名(如果有前缀路径也请带上)"
            placeholder="请输入oss域名"
          />
        </div>
        <Button type="button" variant="contained" onClick={handleSaveRepoInfo}>
          保存
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        message=""
        key={'top' + 'center'}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          保存成功
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TokenForm;
