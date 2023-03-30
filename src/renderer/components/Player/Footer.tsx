import {
  Box,
  Grid,
  IconButton,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './style/Footer.module.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import LoopIcon from '@mui/icons-material/Loop';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { useSelector } from 'react-redux';
import { IState } from '../../state/IState';
import { ISoundPlayer } from '../../state/ISoundPlayer';
import { useDispatch } from 'react-redux';
import SoundPlayer from '../../SoundPlayer';
import { setIsPlaying, setPlayingIndex } from '../../slice/SoundPlayerSlice';
import { loadCallback, playNext } from './SoundUtil';

export const Footer: React.FC = () => {
  const { playingIndex, item, isPlaying, duration } = useSelector<
    IState,
    ISoundPlayer
  >(a => a.soundPlayer);
  const [volume, updateVolume] = useState(100);
  const [time, updateTime] = useState(0);
  const [getSeekTimer, updateGetSeekTimer] = useState<NodeJS.Timer>();
  const [nowTime, updateNowTime] = useState('-:-');
  const [maxTime, updateMaxTime] = useState('-:-');
  const [isLoop, updateIsLoop] = useState(false);
  const dispatch = useDispatch();
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    SoundPlayer.setVolume((newValue as number) / 100);
    updateVolume(newValue as number);
  };
  const handleTimeChange = (event: Event, newValue: number | number[]) => {
    SoundPlayer.seek((newValue as number) / 100);
    console.log(playingIndex, newValue);
    updateTime(newValue as number);
  };
  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      dispatch(setIsPlaying(true));
    } else {
      dispatch(setIsPlaying(false));
    }
    dispatch(setPlayingIndex(playingIndex));
  }, [playingIndex, isPlaying]);

  const back = useCallback(() => {
    dispatch(setPlayingIndex(playingIndex - 1));
    dispatch(setIsPlaying(true));
  }, [playingIndex, item]);

  const forward = useCallback(() => {
    dispatch(setPlayingIndex(playingIndex + 1));
    dispatch(setIsPlaying(true));
  }, [playingIndex, item]);
  const setLoop = () => {
    SoundPlayer.setLoop(!isLoop);
    updateIsLoop(!isLoop);
  };
  useEffect(() => {
    if (Math.floor(duration % 60) < 10) {
      updateMaxTime(
        `${Math.floor(duration / 60)}:0${Math.floor(duration % 60)}`,
      );
    } else {
      updateMaxTime(
        `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`,
      );
    }
  }, [duration]);
  useEffect(() => {
    SoundPlayer.load(item[playingIndex].path, loadCallback, playNext);
    updateTime(0);
  }, [playingIndex, item, SoundPlayer['src']]);
  useEffect(() => {
    if (isPlaying) {
      SoundPlayer.playSeek();
    } else {
      SoundPlayer.pause();
    }
  }, [isPlaying, SoundPlayer['src'], playingIndex]);
  useEffect(() => {
    clearInterval(getSeekTimer);
    const timer = setInterval(() => {
      if (!SoundPlayer.getPlayer()) {
        return;
      }
      const seek = SoundPlayer.getPlayer().seek();
      if (duration) {
        updateTime((seek / duration) * 100);
      }
      if (Math.floor(seek % 60) < 10) {
        updateNowTime(`${Math.floor(seek / 60)}:0${Math.floor(seek % 60)}`);
      } else {
        updateNowTime(`${Math.floor(seek / 60)}:${Math.floor(seek % 60)}`);
      }
    }, 100);
    updateGetSeekTimer(timer);
  }, [duration]);
  return (
    <Box className={styles.container} sx={{ bgcolor: 'secondary.main' }}>
      <Grid container>
        <Grid item xs={4}>
          {item[playingIndex]?.path}
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ lineHeight: '2.5rem', textAlign: 'center' }}>
            <IconButton>
              <ShuffleIcon />
            </IconButton>
            <IconButton onClick={back}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={togglePlay}>
              {isPlaying ? (
                <PauseCircleOutlineIcon />
              ) : (
                <PlayCircleOutlineIcon />
              )}
            </IconButton>
            <IconButton onClick={forward}>
              <SkipNextIcon />
            </IconButton>
            <IconButton
              onClick={setLoop}
              color={isLoop ? 'success' : 'default'}>
              <LoopIcon />
            </IconButton>
          </Box>
          <Box sx={{ lineHeight: '2.5rem' }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ width: '70%', margin: '0 auto' }}
              alignItems="center">
              <Typography sx={{ color: 'secondary.contrastText' }}>
                {nowTime}
              </Typography>
              <Slider
                aria-label="Time"
                value={time}
                size="small"
                onChange={handleTimeChange}
              />
              <Typography sx={{ color: 'secondary.contrastText' }}>
                {maxTime}
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ lineHeight: '5rem' }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ width: '50%', margin: '1.5rem auto' }}
            alignItems="center">
            <VolumeDownIcon />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleVolumeChange}
            />
            <VolumeUpIcon />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
