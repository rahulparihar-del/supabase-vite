import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {

 

  return (
    <nav>
      <h1>Crud App - SupaBase</h1>
      <Link to="/home">
        Home
      </Link>
      <Link to="/create">Create</Link>
    <Link to="/">LogOut</Link>
    </nav>
  );
}
