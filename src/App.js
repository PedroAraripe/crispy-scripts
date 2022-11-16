import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/home";
import RepositoryTemplate from "./pages/repository-template";
import Navbar from "./common/components/Navbar";

export default function App() {

  const search = useLocation().search;
  const querys = new URLSearchParams(search);
  const currentRepositoryName = querys.get('project');

  console.log({currentRepositoryName, isUpdated:"updated"})

  return (
    <>
      <Navbar currentRepositoryName={currentRepositoryName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:repositoryName" element={<RepositoryTemplate repository={{'name': 'teste'}} />} />
      </Routes>
    </>
  )
}