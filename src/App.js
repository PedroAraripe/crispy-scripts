import React from "react";
import {
  Routes,
  Route,
  HashRouter as Router,
} from "react-router-dom";

import Home from "./pages/Home";
import RepositoryTemplate from "./pages/ScriptArticle";
import Navbar from "./common/components/Navbar";
import WrapperContent from "./common/components/WrapperContentTemplate";

export default function App() {  
  return (
    <Router>
      <Navbar />

      <div className="py-5 my-lg-5"></div>

      <WrapperContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scripts"  element={<RepositoryTemplate />} />
        </Routes>
      </WrapperContent>
    </Router>
  )
}