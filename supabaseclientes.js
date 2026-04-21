//import { createClient } from '@supabase/supabase-js'
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://pezhgrfmtwstyqwmjqen.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlemhncmZtdHdzdHlxd21qcWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1Njg4MjYsImV4cCI6MjA5MTE0NDgyNn0.WpwEna0nUFbAnAPEnyghcoGi0_AnaacgMQa4SgZnYLk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
