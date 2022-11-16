import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home";
import RepositoryTemplate from "./pages/repository-template";
import Navbar from "./common/components/Navbar";
import WrapperContent from "./common/components/WrapperContentTemplate";

export default function App() {  
  return (
    <>
      <Navbar />

      <div className="py-5 my-lg-5"></div>

      <WrapperContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scripts"  element={<RepositoryTemplate />} />
        </Routes>
      </WrapperContent>
      
    </>
  )
}