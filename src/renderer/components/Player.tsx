import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ISoundPlayer } from '../state/ISoundPlayer';
import { IState } from '../state/IState';
import { Footer } from './Player/Footer';
import { Item } from './Player/Item';
import styles from './style/Player.module.css';
export const Player: React.FC = () => {
  const { item } = useSelector<IState, ISoundPlayer>(a => a.soundPlayer);
  return (
    <Box className={styles.container}>
      {Object.keys(item).length === 0 ? (
        <Typography sx={{ color: 'secondary.contrastText' }}>
          選択されていません
        </Typography>
      ) : (
        <React.Fragment>
          <Box className={styles.items}>
            {Object.keys(item).map((key, index) => {
              return (
                <Item key={index} index={index} path={item[Number(key)].path} />
              );
            })}
          </Box>
          <Box className={styles.footer}>
            <Footer />
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
