import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginContextProvider } from "./context/login-context";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route index path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
