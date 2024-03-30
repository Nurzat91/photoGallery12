import React, {useState} from 'react';
import { Card, Grid, TextField, Typography } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {PhotoMutation} from "../../../types";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from "react-router-dom";
import {createCardPhoto} from "../photoGalleryThunks";
import {selectPostingPhoto} from "../photoGallerySlice";

const PhotoGalleryForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectPostingPhoto);
  const [state, setState] = useState<PhotoMutation>({
    title: '',
    image: null,
  });

  const onSubmit = async (PhotoMutation: PhotoMutation) => {
    try {
      await dispatch(createCardPhoto(PhotoMutation)).unwrap();
      navigate('/');
    } catch (e) {
      throw new Error();
    }
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.title && state.image) {
      void onSubmit(state);
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files && files.length) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <Card variant="outlined">
      <Typography margin="20px" variant="h4">Add new photo gallery: </Typography>
      <form autoComplete="off" onSubmit={submitFormHandler}>
        <Grid container direction="row" spacing={2} sx={{marginY: '15px'}}>
          <Grid container item alignItems="center" xs={12}>
            <Grid item sx={{ paddingLeft: '20px', width: '20%' }}>
              <Typography variant="h6">Title</Typography>
            </Grid>
            <TextField
              sx={{margin: '20px', width: '70%'}}
              label="Title"
              name="title"
              value={state.title}
              onChange={inputChangeHandler}
              required
            />
          </Grid>
          <Grid container item xs={12} >
            <Grid item sx={{ paddingLeft: '20px', width: '20%' }}>
              <Typography variant="h6">Image</Typography>
            </Grid>
            <Grid item xs={6} sx={{margin: '20px', width: '70%'}}>
              <FileInput label="Image" onChange={fileInputChangeHandler} name="image"/>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <LoadingButton sx={{margin: '20px'}} loading={loading} type="submit" color="primary" variant="contained">
              Create photo
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default PhotoGalleryForm;