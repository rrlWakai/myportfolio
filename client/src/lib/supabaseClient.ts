import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yywczaokogaljznguqch.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5d2N6YW9rb2dhbGp6bmd1cWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjYwMjcsImV4cCI6MjA4ODU0MjAyN30.hhbLKQ7U6_g85DY0UPok8eNWmW37xlViP3kVq1c1SdM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);