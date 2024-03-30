import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Photo, PhotoMutation} from "../../types";

export const getData = createAsyncThunk<Photo[]>(
  'photo-gallery/getData',
  async () => {
  try {
    const response = await axiosApi.get('/photo-gallery');
    return response.data;
  } catch (e) {
    return e;
  }
});

export const getDataByAuthor = createAsyncThunk<Photo[], string>(
  'photo-gallery/getDataByAuthor',
  async (id) => {
  try {
    const response = await axiosApi.get('/photo-gallery?user=' + id);
    return response.data;
  } catch (e) {
    return e;
  }
});

export const getOnePhoto = createAsyncThunk<Photo[], string>(
  'photo-gallery/getOnePhoto',
  async (id
) => {
  try {
    const response = await axiosApi.get('/photo-gallery/' + id);
    return response.data;
  } catch (e) {
    return e;
  }
});

export const createCardPhoto = createAsyncThunk<Photo, PhotoMutation>(
  'photo-gallery/new',
  async (id) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(id) as (keyof PhotoMutation)[];
      keys.forEach((key) => {
        const value = id[key];
        if (value !== null) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });
      const response = await axiosApi.post('/photo-gallery', formData);
      return response.data;
    } catch (e) {
      return e;
    }
  });


export const deletePhoto = createAsyncThunk<Photo, string>(
  'photo-gallery/delete',
  async (id) => {
  try {
    const response = await axiosApi.delete('/photo-gallery/' + id);
    return response.data;
  } catch (e) {
    return e;
  }
});