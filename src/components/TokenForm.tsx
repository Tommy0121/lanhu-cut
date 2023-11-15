import React from 'react';
import { Box, TextField } from '@mui/material';

const TokenForm = (): React.JSX.Element | null => {
  const token = localStorage.getItem('XLIAN_GITLAB_TOKEN');
  return token ? null : (
    <div>
      <Box component={'form'} noValidate autoComplete="off">
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
          />
        </div>
      </Box>
    </div>
  );
};

export default TokenForm;
