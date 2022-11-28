import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import scriptsNav from "../common/constants/scriptsList.js";

// const token=''
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

async function getScriptsPreview(projectName) {
  const foldersScripts = [];

  const scriptsCategories = scriptsNav.filter(script => {
    return !projectName ? true: projectName === script.repositoryName; 
  });

  await Promise.allSettled(scriptsCategories.map(async (script) => {
      const url = `https://api.github.com/repos/PedroAraripe/${script.repositoryName}/contents/`;
      const { data } = await axios.get(url);

      let sugestedScript = data.filter(item => item.name.toLowerCase() !== "LICENSE".toLowerCase() && item.name.toLowerCase() !== ".gitignore".toLowerCase());

      if(!projectName) {
        sugestedScript = [sugestedScript[0]];
      }

      sugestedScript.forEach(scriptItem => {
        foldersScripts.push({
          ...scriptItem,
          repository: {
            repository_name: script.repositoryName,
            name: script.name,
            file_termination: script.codeFile,
          }
        });
      })
    }));

    await Promise.allSettled(foldersScripts.map(async (script) => {
      const urlText = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/contents/${script.name}/README.md`;
      const urlLastCommit = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/commits?path=${script.name}`;

      const { data: dataText } = await axios.get(urlText);
      const { data: dataLastCommit } = await axios.get(urlLastCommit);

      script.script = {
        data_text: dataText,
        last_commit: dataLastCommit[0],
      };
    }));

    return foldersScripts;

} 

export const getData = createAsyncThunk(
  'scriptsContent/getData',
  getScriptsPreview
);

export const getScriptData = createAsyncThunk(
  'scriptsContent/getScriptData',
  async ({projectName, scriptName}) => {
    const script = scriptsNav.find(script => script.repositoryName === projectName);
    
    if(!script) {
      return {};
    }

    const currentScriptData = {
      repositoryName: projectName,
      name: scriptName,
      file_termination: script.codeFile
    };

    console.log({script})

    const urlText = `https://api.github.com/repos/PedroAraripe/${projectName}/contents/${scriptName}/README.md`;
    const urlLastCommit = `https://api.github.com/repos/PedroAraripe/${projectName}/commits?path=${scriptName}&page=1&per_page=1`;
    const urlCode = `https://api.github.com/repos/PedroAraripe/${projectName}/contents/${scriptName}/${script.codeFile}`;

    const { data: dataText } = await axios.get(urlText);
    const { data: dataLastCommit } = await axios.get(urlLastCommit);
    const { data: dataCode } = await axios.get(urlCode);

    currentScriptData.script = {
      data_text: dataText,
      last_commit: dataLastCommit[0],
      data_code: dataCode,
      script_language: script.name.toLowerCase(),
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

    builder.addCase(getScriptData.fulfilled, (state, action) => {
      state.current_script = action.payload;
    })
  },
});

export default scriptsContent.reducer;