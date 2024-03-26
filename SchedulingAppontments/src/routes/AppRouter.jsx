// import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" index element={<HomePage />} />
      {/* {isAuthenticated && <Route path="/about" element={<AboutAuthor />} />}
        {isAuthenticated && <Route path="/newpost" element={<NewPost />} />}
        {isAuthenticated && (
          <Route path="/update-post" element={<UpdatePost />} />
        )}
        <Route path="/post" element={<Post />} />
        {isAuthenticated && <Route path="/logout" element={<Logout />} />}
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="*" element={<Authenticate />} /> */}
    </Routes>
  );
}
