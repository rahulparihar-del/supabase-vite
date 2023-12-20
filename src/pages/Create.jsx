import React from 'react'
import supabase from '../Config/supabaseClient';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export default function Create() {

  const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [rating, setRating] = useState('');
    const [formError, setFormError] = useState(''); //errors

    const handleSubmit = async (e)=>{
      e.preventDefault()

      if(!title || !method || !rating){
        setFormError('Please fill in all the field correctly')
        return
      }


      // console.log(title, method, rating);

      const { data, error } = await supabase
      .from('todos')
      .insert([{ title, method, rating }])
      .select('*')



      if (error) {
        console.log(error)
        setFormError('Please fill in all the fields correctly.')
      }
      if (data) {
        console.log(data);
        navigate('/home')
      }
    }

    const  myInlineStyle = {
      color: 'red',
    }
    
  
  return (
    <>
    <NavBar></NavBar>
   <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Description:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Todos +</button>

        {formError && <p className="error" style={myInlineStyle}>{formError}</p>}
      </form>
    </div>
    </>
  );
}
