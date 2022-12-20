import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AddEditUser from "./pages/AddEditUser";
import Home from "./pages/Home";
import Singin from "./pages/Login";
import SignInG from "./pages/SignInG";
// import Singup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<AddEditUser />}></Route>
          <Route path="/signup" element={<SignInG />}></Route>
          {/* <Route path="/signup" element={<Singup />}></Route> */}
          <Route path="/signin" element={<Singin />}></Route>
          <Route path="/update/:id" element={<AddEditUser />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
