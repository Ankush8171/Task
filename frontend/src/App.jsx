import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;