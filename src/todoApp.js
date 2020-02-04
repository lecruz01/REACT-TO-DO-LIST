import React, { useState } from "react";
import NavBar from "./components/general/navbar/navbar";
import Main from "./components/general/main/main";
import { isMobile, isBrowser } from "react-device-detect";

function ToDoApp() {
  const [category, handleCategoryChange] = useState("pendientes");

  return (
    <div className="ToDoApp">
      <NavBar changeCategory={handleCategoryChange}></NavBar>
      {isMobile && <Main key={category} mobileCategory={category}></Main>}
      {isBrowser && <Main></Main>}
    </div>
  );
}

export default ToDoApp;
