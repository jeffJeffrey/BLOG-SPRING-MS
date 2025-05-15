import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ShowPost from "./pages/ShowPost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import Team from "./pages/Team";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
         <Route path="/posts/:id" element={<ShowPost />} />
         <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutUs />} />
         <Route path="/team" element={<Team />} />

      </Routes>
    </Router>
  );
}
