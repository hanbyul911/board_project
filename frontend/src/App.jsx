import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./router/Home";
import List from "./router/List";
import Save from "./router/Save";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/save" element={<Save />}></Route>
          <Route path="/list" element={<List />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
