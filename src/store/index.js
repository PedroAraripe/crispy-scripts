import { configureStore } from '@reduxjs/toolkit';
import scriptsContentReduce from './scriptsContent';
import bannerReduce from './banner.js';

export default configureStore({
  reducer: {
    scriptsContent : scriptsContentReduce,
    banner : bannerReduce,
  },
});