import React from 'react';
import NavBar from './components/general/navbar/navbar';
import Main from './components/general/main/main';

function ToDoApp() {
  return (
    <div className="ToDoApp">
      <NavBar></NavBar>
      <Main></Main>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default ToDoApp;
