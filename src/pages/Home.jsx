import React from "react";
import supabase from "../Config/supabaseClient";
import { useEffect, useState } from "react";
import TodosCard from "../Components/todosCard";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
``

//components

export default function Home({token}) {
  /* We need some state to store the todos once we fetch them and 
  also to handle any errors that may occur during the fetch process */

  //1: Fetch erros
  const [fetchError, setFetchError] = useState(null);

  //2: To store data in this values when we successfully fetch it from database
  const [todos, setTodos] = useState(null);

  //
  const handleDelete = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((sm) => sm.id !== id);
    });
  };

  //  To fetch data, we will use useEffect
  useEffect(() => {
    //will use await which is asynchronous inside it
    const fetchTodos = async () => {
      //inside we will use supabase to fetch the data
      const { data, error } = await supabase.from("todos").select("*");

      if (error) {
        setFetchError("Could not fetch the todos");
        setTodos(null);
        console.log(error);
      }

      if (data) {
        setTodos(data);
        setFetchError(null);
        console.log(data);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
    <NavBar></NavBar>
    <div className="page Home">
      <h2 className="h11">Name: {token.user.user_metadata.full_name}</h2>
      {fetchError && <p>{fetchError}</p>}
      {todos && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {todos.map((todo) => (
              <TodosCard key={todo.id} todo={todo} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>

    </>
  );
}
