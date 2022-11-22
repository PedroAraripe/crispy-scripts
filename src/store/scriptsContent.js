import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import scriptsNav from "../common/constants/scriptsList.js";

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.API_KEY}`;

export const getData = createAsyncThunk(
  'scriptsContent/getData',
  async (projectName) => {
    const totalData = [];

    const scriptsItems = scriptsNav.filter(script => {
      if(projectName) {
        return script.repositoryName === projectName;
      }
      
      return true;
      
    });
    
    await Promise.allSettled(scriptsItems.map(async (script) => {
      const url = `https://api.github.com/repos/PedroAraripe/${script.repositoryName}/contents/`;
      const { data } = await axios.get(url);

      data
        .filter(item => item.name.toUpperCase() !== "LICENSE")
        .map(item => {
          item.repository = {
            name: script.name,
            repository_name: script.repositoryName,
            repository_file_termination: script.fileTermination,
          };

          totalData.push(item);
        })
    }));

    await Promise.allSettled(totalData.map(async (script) => {
      const urlText = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/contents/${script.name}/README.md`;
      const urlLastCommit = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/commits?path=${script.name}&page=1&per_page=1`;
      const urlCode = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/contents/${script.name}/run.${script.repository.repository_file_termination}`;

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

export const getScriptData = createAsyncThunk(
  'scriptsContent/getScriptData',
  async ({projectName, scriptName}) => {
    const currentScriptData = {
      repositoryName: projectName,
      name: scriptName,
    };

    const script = scriptsNav.find(script => script.repositoryName === projectName);

    const urlText = `https://api.github.com/repos/PedroAraripe/${projectName}/contents/${scriptName}/README.md`;
    const urlLastCommit = `https://api.github.com/repos/PedroAraripe/${projectName}/commits?path=${scriptName}&page=1&per_page=1`;
    const urlCode = `https://api.github.com/repos/PedroAraripe/${projectName}/contents/${scriptName}/run.${script.fileTermination}`;

    const { data: dataText } = await axios.get(urlText);
    const { data: dataLastCommit } = await axios.get(urlLastCommit);
    const { data: dataCode } = await axios.get(urlCode);

    currentScriptData.script = {
      data_text: dataText,
      last_commit: dataLastCommit[0],
      data_code: dataCode,
    };

    return currentScriptData;
  }
);

const initialState = {
  value: [],
  current_script: {},
};

export const scriptsContent = createSlice({
  name: 'scriptsContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.value = action.payload;
    })

    // builder.addCase(getScriptCategoryData.fulfilled, (state, action) => {
    //   state.value = action.payload;
    // })

    builder.addCase(getScriptData.fulfilled, (state, action) => {
      state.current_script = action.payload;
    })
  },
});

export default scriptsContent.reducer;