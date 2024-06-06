import { useEffect } from "react";
import {
  ShowNumber,
  DeleteNumber,
  EditNumber,
  AddNumber,
} from "./components/index.js";
import { Home } from "./pages/index.js";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/number/add" element={<AddNumber />} />
      <Route path="/number/details/:id" element={<ShowNumber />} />
      <Route path="/number/edit/:id" element={<EditNumber />} />
      <Route path="/number/delete/:id" element={<DeleteNumber />} />
    </Routes>
  );
}

export default App;
