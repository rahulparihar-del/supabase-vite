import React, { useEffect , useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import supabase from '../Config/supabaseClient';
import NavBar from './NavBar';


export default function Update() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [formError, setFormError] = useState(''); //errors


  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!title || !method || !rating){
      setFormError('Please fill in all the field correctly')
      return
    }

    const {data, error} = await supabase
    .from('todos')
    .update({title, method, rating})
    .select('*')
    .eq('id', id);
    console.log(data);
    
    
    if(error){
      console.log(error);
      setFormError('Please fill in all the field correctly')
      setShowAlert(true);
    }
    
    if(data){
      console.log(data);
      navigate('/home')
    }
  }
  
  useEffect(()=>{
    const fetchTodos = async ()=>{
  
        const {data , error } = await supabase
        .from('todos')
        .select()
        .eq('id', id) // this is method which  allow us to pass in a couple of arguments 
        .single()
        
        
        if(error){
          navigate(" ", {replace: true})
        }
        
        if(data){
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
          console.log(data);
        }
    }

    fetchTodos();
  }, [id, navigate])

  const  myInlineStyle = {
    color: 'red',
  }
  return (
    <>
    <NavBar></NavBar>
    <div className='page Home'>
   <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>

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

        <button>Update +</button>

        {formError && <p className="error" style={myInlineStyle}>{formError}</p>}
      </form>

      

    </div>
    </>

  )
}
