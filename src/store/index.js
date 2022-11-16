import { configureStore } from '@reduxjs/toolkit';
import scriptsContentReduce from './scriptsContent.js';

export default configureStore({
  reducer: {
    scriptsContent : scriptsContentReduce,
  },
});