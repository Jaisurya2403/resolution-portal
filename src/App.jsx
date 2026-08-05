import {Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup2 from "./components/Signup2";
import Signup from "./components/Signup";
import About from "./components/About";
import Settings from "./components/Settings";

function App() {
  return (
      // <Routes>
      //   <Route path="/" element={<HomePage />} />
      //   <Route path="/login" element={<Login />} />
      //   <Route path="/signup" element={<Signup />} />
      // </Routes>
      <div>
       <Settings/>
      </div>
    
  );
  
}

export default App;