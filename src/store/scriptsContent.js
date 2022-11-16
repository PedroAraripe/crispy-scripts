import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import scriptsNav from "../common/constants/scriptsList.js";

export const getData = createAsyncThunk(
  'scriptsContent/getData',
  async () => {
    const totalData = [];

    await Promise.all(scriptsNav.map(async (script) => {
      const url = `https://api.github.com/repos/PedroAraripe/${script.repositoryName}/contents/`;
      let { data } = await axios.get(url);

      data
        .filter(item => item.name.toUpperCase() !== "LICENSE")
        .map(item => {
          item.repository_name = script.repositoryName;

          totalData.push(item);
        })
    }));

    await Promise.all(totalData.map(async (script) => {
      const urlText = `https://api.github.com/repos/PedroAraripe/${script.repository_name}/contents/${script.name}/README.md`;
      const urlCode = `https://api.github.com/repos/PedroAraripe/${script.repository_name}/contents/${script.name}/run.sh`;

      let { data: dataText } = await axios.get(urlText);
      let { data: dataCode } = await axios.get(urlCode);

      script.script = {
        data_text: dataText,
        data_code: (dataCode),
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