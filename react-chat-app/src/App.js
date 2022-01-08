import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";

const App = () => (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={<Chat/>} />
        
    </Routes>
    </BrowserRouter>
);

export default App;