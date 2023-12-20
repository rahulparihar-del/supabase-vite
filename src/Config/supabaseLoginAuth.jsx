import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://zsyhqodkydlybejzuina.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeWhxb2RreWRseWJlanp1aW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MjA2MjksImV4cCI6MjAxODE5NjYyOX0.IXJrzmsjOhFcZdqhc-rQd9rVO5UgRhir9wVj4otPXxI';

const supabaseLogin = createClient(supabaseUrl ,supabaseKey);

export default supabaseLogin;