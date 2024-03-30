import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getData} from "./photoGalleryThunks";
import {selectLoadingPhoto, selectStateOfPhoto} from "./photoGallerySlice";
import PhotoGalleryCard from "./components/PhotoGalleryCard";

const PhotoGallery:React.FC = () => {
  const dispatch = useAppDispatch();
  const photo = useAppSelector(selectStateOfPhoto);
  const loading = useAppSelector(selectLoadingPhoto)

  useEffect(() => {
    dispatch(getData());
  }, []);
  return (
    <Container fixed>
      {photo.length ? <>
          <Typography textAlign="center" variant="h4">
            Photo gallery:
          </Typography>
          <Grid container gap={2}>
            {loading ? <CircularProgress/> : photo.map((data) =>
              <PhotoGalleryCard key={Math.random()} photo={data}/>)}
          </Grid>
        </> :
        <Typography textAlign="center" variant="h4">Загруженных фотографии пока нет</Typography>
      }
    </Container>
  );
};

export default PhotoGallery;