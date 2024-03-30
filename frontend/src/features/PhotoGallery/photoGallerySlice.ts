import {createSlice} from '@reduxjs/toolkit';
import {Photo} from "../../types";
import {createCardPhoto, deletePhoto, getData, getDataByAuthor, getOnePhoto} from "./photoGalleryThunks";
import {RootState} from "../../app/store";

interface Initial {
  photo: Photo[];
  loading: boolean;
  posting: boolean;
  deleting: boolean;
}
const initialState: Initial = {
  photo: [],
  loading: false,
  posting: false,
  deleting: false,
};

export const photoGallerySlice = createSlice({
  name: 'photo-gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.photo = action.payload;
      state.loading = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getDataByAuthor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDataByAuthor.fulfilled, (state, action) => {
      state.photo = action.payload;
      state.loading = false;
    });
    builder.addCase(getDataByAuthor.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getOnePhoto.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOnePhoto.fulfilled, (state, action) => {
      state.photo = action.payload;
      state.loading = false;
    });
    builder.addCase(getOnePhoto.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createCardPhoto.pending, (state) => {
      state.posting = true;
    });
    builder.addCase(createCardPhoto.fulfilled, (state) => {
      state.posting = false;
    });
    builder.addCase(createCardPhoto.rejected, (state) => {
      state.posting = false;
    });

    builder.addCase(deletePhoto.pending, (state) => {
      state.deleting = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state) => {
      state.deleting = false;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.deleting = false;
    });
  },
});

export const photoGalleryReducer = photoGallerySlice.reducer;
export const selectStateOfPhoto = (state: RootState) => state.photoGallery.photo;
export const selectLoadingPhoto= (state: RootState) => state.photoGallery.loading;
export const selectPostingPhoto = (state: RootState) => state.photoGallery.posting;
export const selectDeletingPhoto = (state: RootState) => state.photoGallery.deleting;