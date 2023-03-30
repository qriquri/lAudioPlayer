import { Box, IconButton, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { useSelector } from 'react-redux';
import { ISoundPlayer } from '../../state/ISoundPlayer';
import { IState } from '../../state/IState';
import styles from './style/Item.module.css';
import { setIsPlaying, setPlayingIndex } from '../../slice/SoundPlayerSlice';
import { useDispatch } from 'react-redux';
interface IProps {
  path: string;
  index: number;
}

export const Item: React.FC<IProps> = props => {
  const { playingIndex, isPlaying } = useSelector<IState, ISoundPlayer>(
    a => a.soundPlayer,
  );
  const dispatch = useDispatch();
  const togglePlay = useCallback(() => {
    if (props.index === playingIndex && isPlaying) {
      console.log('pause');
      dispatch(setPlayingIndex(props.index));
      dispatch(setIsPlaying(false));
    } else {
      console.log('play');
      dispatch(setPlayingIndex(props.index));
      dispatch(setIsPlaying(true));
    }
  }, [playingIndex, props.index, isPlaying]);

  return (
    <Box className={styles.container} sx={{ bgcolor: 'secondary.main' }}>
      <Box sx={{ display: 'inline-block', lineHeight: '4rem' }}>
        <IconButton onClick={togglePlay}>
          {props.index === playingIndex && isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
        </IconButton>
      </Box>
      <Typography
        className='abbreviated-string'
        variant="body1"
        sx={{
          display: 'inline-block',
          verticalAlign: 'top',
          lineHeight: '4rem',
          color: props.index === playingIndex ? 'success.main' : 'secondary.contrastText',
        }}>
        {props.path}
      </Typography>
    </Box>
  );
};
