import axios from "axios";

const getTodosPendientes = () => {
  const queryString = `{getTodos(type:"pendientes"){id,title,description,expirationDate,completed,priority,category{name}}}`;
  return axios.get(`${process.env.REACT_APP_APOLLO_URL}?query=${queryString}`);
};

const getTodosUrgentes = () => {
  const queryString = `{getTodos(type:"urgentes"){id,title,description,expirationDate,completed,priority,category{name}}}`;
  return axios.get(`${process.env.REACT_APP_APOLLO_URL}?query=${queryString}`);
};

const getTodosFinalizados = () => {
  const queryString = `{getTodos(type:"finalizados"){id,title,description,expirationDate,completed,priority,category{name}}}`;
  return axios.get(`${process.env.REACT_APP_APOLLO_URL}?query=${queryString}`);
};

const getTodosEliminados = () => {
  const queryString = `{getTodos(type:"papelera"){id,title,description,expirationDate,completed,priority,category{name}}}`;
  return axios.get(`${process.env.REACT_APP_APOLLO_URL}?query=${queryString}`);
};

const createTodo = (title, priority, category, description, expirationDate) => {
  const queryString = `mutation{addTodo(title:"${title}",priority:${priority},category:{name:"${category}"},description:"${description}",expirationDate:"${expirationDate}",completed:false){id,title,description,expirationDate,completed,priority}}`;
  return axios.post(
    `${process.env.REACT_APP_APOLLO_URL}`,
    { query: queryString },
    { headers: { "Content-Type": "application/json" } }
  );
};

const updateTodo = (id, data) => {
  // const {
  //   title,
  //   priority,
  //   category,
  //   description,
  //   expirationDate,
  //   completed
  // } = data;
  // const queryString = `mutation{updateTodo(id:"${id}",title:"${title}",priority:${priority},category:{name:"${category}"},description:"${description}",expirationDate:"${expirationDate}",completed:${completed}){id,title,description,expirationDate,completed,priority}}`;
  const queryString = `mutation{updateTodo(id:"${id}",data:"${data}"){id,title,description,expirationDate,completed,priority}}`;
  return axios.post(
    `${process.env.REACT_APP_APOLLO_URL}`,
    { query: queryString },
    { headers: { "Content-Type": "application/json" } }
  );
};

export {
  getTodosPendientes,
  getTodosUrgentes,
  getTodosFinalizados,
  getTodosEliminados,
  createTodo,
  updateTodo
};
