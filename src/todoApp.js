import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import NavBar from "./components/general/navbar/navbar";
import Main from "./components/general/main/main";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function ToDoApp() {
  return (
    <ApolloProvider client={client}>
      <div className="ToDoApp">
        <NavBar></NavBar>
        <Main></Main>
        {/* <Footer></Footer> */}
      </div>
    </ApolloProvider>
  );
}

export default ToDoApp;
