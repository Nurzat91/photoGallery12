import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
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
  let imgUrl;
  if (photo.image) {
    imgUrl = `${apiURL}/${photo.image}`;
  }


  const onDelete = async () => {
    await dispatch(deletePhoto(photo._id));
    await dispatch(getData());
  };

  const onClickNavigate = () => {
    navigate(`/photo-gallery/my-gallery?user=${photo.author._id}`);
  };

  return (
    <Card sx={{width: '30%', margin: '1%'}}>
      <CardMedia onClick={onClickNavigate} component="img" height="200" image={imgUrl} alt="Photo"/>
      <CardContent>
        <CardActionArea>
          <Typography gutterBottom variant="h6" component="div">
            {photo.title}
          </Typography>
          <Typography onClick={onClickNavigate} gutterBottom variant="h5" component="div">
            {photo.author.displayName}
          </Typography>
        </CardActionArea>
        {user?.role === 'admin' ? (
          <LoadingButton variant="contained" onClick={onDelete} loading={deleting}>
            Delete
          </LoadingButton>
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoGalleryCard;