import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {getDataByAuthor} from "./photoGalleryThunks";
import {selectLoadingPhoto, selectStateOfPhoto} from "./photoGallerySlice";
import { selectUser } from '../users/usersSlice';
import PhotoGalleryCard from "./components/PhotoGalleryCard";
const PhotoGalleryPageUser = () => {
  const dispatch = useAppDispatch();
  const photo = useAppSelector(selectStateOfPhoto);
  const loading = useAppSelector(selectLoadingPhoto);
  const user = useAppSelector(selectUser)!;

  useEffect(() => {
    dispatch(getDataByAuthor(user._id));
  }, [user._id]);
  return (
    <Container fixed>
      {loading && <CircularProgress />}
      {photo.length ? (
        <>
          <Typography textAlign="center" variant="h2">
            My photo gallery:
          </Typography>
          <Grid container gap={2}>
            {photo.map((el) => (
              <PhotoGalleryCard key={el._id} photo={el} />
            ))}
          </Grid>
        </>
      ) : (
        <Typography textAlign="center" variant="h2">
          Загруженных фото нету
        </Typography>
      )}
    </Container>
  );
};

export default PhotoGalleryPageUser;