import React, {useState} from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, Dialog,
  DialogActions, DialogContent, DialogContentText, Grid, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {Photo} from "../../../types";
import {selectDeletingPhoto} from "../photoGallerySlice";
import {deletePhoto, getData} from "../photoGalleryThunks";

interface state {
  photo: Photo;
}
const PhotoGalleryCard: React.FC<state>  = ({photo}) => {
  const user = useAppSelector(selectUser);
  const deleting = useAppSelector(selectDeletingPhoto);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const imgUrl = photo.image ? `${apiURL}/${photo.image}` : '';


  const onDelete = async () => {
    await dispatch(deletePhoto(photo._id));
    await dispatch(getData());
  };

  const onClickNavigateByPhoto = () => {
    setOpen(true);
  };
  const onClickNavigate = () => {
    navigate(`/photo-gallery/my-gallery?user=${photo.author._id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ width: '30%', margin: '1%' }}>
        <CardActionArea>
          <CardMedia onClick={onClickNavigateByPhoto} component="img" height="200" image={imgUrl} alt="Photo" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {photo.title}
            </Typography>
            <Typography onClick={onClickNavigate} gutterBottom variant="h5" component="div">
              {photo.author.displayName}
            </Typography>
            {user?.role === 'admin' && (
              <LoadingButton variant="contained" onClick={onDelete} disabled={deleting}>
                Delete
              </LoadingButton>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            <img src={imgUrl} alt="Photo" style={{ maxWidth: '100%', height: 'auto' }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container item alignItems="center" xs={7}>
            <Button onClick={handleClose}>Close</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PhotoGalleryCard;