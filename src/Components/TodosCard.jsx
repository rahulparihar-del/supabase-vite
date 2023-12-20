import { Link } from "react-router-dom";
import supabase from "../Config/supabaseClient";

const TodosCard = ({ todo, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .select('*')
      .eq("id", todo.id);

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(todo.id);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{todo.title}</h3>
      <p>{todo.method}</p>
      <div className="rating">{todo.rating}</div>
      <div className="buttons">
        <Link to={"/" + todo.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default TodosCard;
