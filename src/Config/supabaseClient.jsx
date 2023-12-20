import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://qiboewxxidijwpaxqjea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYm9ld3h4aWRpandwYXhxamVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyODAxNDUsImV4cCI6MjAxNzg1NjE0NX0.fFLtN-97-Q3bNI5jmafkdgKEjG5J9apLeHlM8tLZgaE';

const supabase = createClient(supabaseUrl ,supabaseKey);

export default supabase;