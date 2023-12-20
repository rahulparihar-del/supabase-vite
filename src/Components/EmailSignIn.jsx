import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabaseLogin from '../Config/supabaseLoginAuth';


export default function EmailSignIn({setToken}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();

        console.log("user: " ,{email, password});

        try{
            const { data, error } = await supabaseLogin.auth.signInWithPassword({
                email: email,
                password: password
              })
    
              if (error) {
                console.error('Login error:', error.message);
                setFormError('Invalid Password or Email')
              } else {
                console.log('Login successful');
                console.log(data);
                setToken(data)
                navigate('/home')
                
              }
        }
        catch (error) {
          console.error('Unexpected error during login:', error.message);
        }

    }

    const handleGoogleLogin = async () => {
      try {
        const { data, error } = await supabaseLogin.auth.signInWithOAuth({
          provider: 'google',
          options: {
            queryParams: {
              access_type: 'online',
              prompt: 'consent',
            },
          },
        })
    
        if (error) {
          console.error(error);
        } else {
          console.log('User signed in with Google :', user);
        }
      } catch (error) {
        console.error('Error Google sign-in:', error.message);
      }
      debugger
      console.log(data);
    };

    const  myInlineStyle = {
        color: 'red',
      }
  return (
   <>
      <div className="App">
         <form onSubmit={handleSubmit} className='formOne'>
         <h1>Sign In</h1>
            {/* Email ID */}
            <label htmlFor="email">Email: </label>
            <input
             type="email" 
             name='email'
             placeholder='Email'
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             required
            />

             {/* password  */}
             <label htmlFor="password">Password: </label>
            <input
             type="password" 
             name='password'
             placeholder='Password'
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             required
            />
             {formError && <p className="error" style={myInlineStyle}>{formError}</p>}

        <button type="submit" className="buttonOne">Sign In</button>
        <button type="button" onClick={handleGoogleLogin} className='googlebtn'>
          Login with Google
        </button>

        <div id="pariharmali56@gmail.com"
     data-client_id='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeWhxb2RreWRseWJlanp1aW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MjA2MjksImV4cCI6MjAxODE5NjYyOX0.IXJrzmsjOhFcZdqhc-rQd9rVO5UgRhir9wVj4otPXxI'
     data-login_uri='https://zsyhqodkydlybejzuina.supabase.co'
     data-auto_select="true">
    </div>

        <div className="SignIn">
        Don't have an account yet? <Link to={"/signUp"}>Sign Up</Link>
        </div>
         </form>
      </div>
   </>
  )
}
