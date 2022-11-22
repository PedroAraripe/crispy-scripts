import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import scriptsNav from "../common/constants/scriptsList.js";
import { getQueryParams } from '../common/utils/routerHelpers.js';

export const getData = createAsyncThunk(
  'scriptsContent/getData',
  async () => {
    
    const { project_name }= getQueryParams();
    const totalData = [];

    
    const scriptsItems = scriptsNav.filter(script => {
      if(project_name) {
        return script.repositoryName === project_name;
      }
      
      return true;
      
    });
    
    console.log({scriptsItems, project_name})
    await Promise.allSettled(scriptsItems.map(async (script) => {
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

// export const getScriptCategoryData = createAsyncThunk(
//   'scriptsContent/getScriptCategoryData',
//   async (repositoryName) => {
//     const totalData = [];
//     const script = scriptsNav.find(script => script.repositoryName === repositoryName);

//     if(!script) {
//       return undefined;
//     }

//     const url = `https://api.github.com/repos/PedroAraripe/${script.repositoryName}/contents/`;
//     const { data } = await axios.get(url);

//     data
//       .filter(item => item.name.toUpperCase() !== "LICENSE")
//       .map(item => {
//         item.repository = {
//           name: script.name,
//           repository_name: script.repositoryName,
//         };

//         totalData.push(item);
//       })

//     await Promise.allSettled(totalData.map(async (script) => {
//       const urlText = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/contents/${script.name}/README.md`;
//       const urlLastCommit = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/commits?path=${script.name}&page=1&per_page=1`;
//       const urlCode = `https://api.github.com/repos/PedroAraripe/${script.repository.repository_name}/contents/${script.name}/run.sh`;

//       const { data: dataText } = await axios.get(urlText);
//       const { data: dataLastCommit } = await axios.get(urlLastCommit);
//       const { data: dataCode } = await axios.get(urlCode);

//       script.script = {
//         data_text: dataText,
//         last_commit: dataLastCommit[0],
//         data_code: dataCode,
//       };
//     }));

//     return totalData;
//   }
// );

export const getScriptData = createAsyncThunk(
  'scriptsContent/getScriptData',
  async ({projectName, scriptName}) => {
    const currentScriptData = {
      repositoryName: projectName,
      name: scriptName,
    };

    
    const urlText = `https://api.github.com/repos/PedroAraripe/${projectName}/contents/${scriptName}/README.md`;
    const urlLastCommit = `https://api.github.com/repos/PedroAraripe/${projectName}/commits?path=${scriptName}&page=1&per_page=1`;
    const urlCode = `https://api.github.com/repos/PedroAraripe/${projectName}/contents/${scriptName}/run.sh`;

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