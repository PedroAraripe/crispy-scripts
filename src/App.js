import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";

import Home from "./pages/home";
import Navbar from "./common/components/Navbar";

export default function App() {

  const search = useLocation().search;
  const querys = new URLSearchParams(search);
  const currentRepositoryName = querys.get('project');

  console.log({currentRepositoryName})

  return (
    <>
      <Navbar currentRepositoryName={currentRepositoryName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<Home />} />
      </Routes>
    </>
  )
}