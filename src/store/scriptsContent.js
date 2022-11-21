import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import scriptsNav from "../common/constants/scriptsList.js";

export const getData = createAsyncThunk(
  'scriptsContent/getData',
  async () => {
    const totalData = [];

    await Promise.allSettled(scriptsNav.map(async (script) => {
      const url = `https://api.github.com/repos/PedroAraripe/${script.repositoryName}/contents/`;
      const { data } = await axios.get(url);

      data
        .filter(item => item.name.toUpperCase() !== "LICENSE")
        .map(item => {
          item.repository = {
            name: script.name,
            repository_name: script.repositoryName,
          };

          totalData.push(item);
        })
    }));

    await Promise.allSettled(totalData.map(async (script) => {
      const urlText = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/contents/${script.name}/README.md`;
      const urlLastCommit = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/commits?path=${script.name}&page=1&per_page=1`;
      const urlCode = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/contents/${script.name}/run.sh`;

      const { data: dataText } = await axios.get(urlText);
      const { data: dataLastCommit } = await axios.get(urlLastCommit);
      const { data: dataCode } = await axios.get(urlCode);

      script.script = {
        data_text: dataText,
        last_commit: dataLastCommit[0],
        data_code: dataCode,
      };
    }));

    return totalData;
  }
);

const initialState = {
  value: []
};

export const scriptsContent = createSlice({
  name: 'scriptsContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.value = action.payload;
    })
  },
});

export default scriptsContent.reducer;