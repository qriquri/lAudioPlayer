import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import React, { useCallback } from 'react';
import styles from './style/SideBar.module.css';
export const SideBar: React.FC = () => {
  const clickSearch = useCallback(() => {
    window.electronAPI.sendMsg('open-dir-req')
  }, []);
  return (
    <Box className={styles.container}>
      <Box>
        <IconButton onClick={clickSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
