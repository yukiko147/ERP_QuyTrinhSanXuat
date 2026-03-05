// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mutfdyfrhquutmfcsgdn.supabase.co";// Project URL"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11dGZkeWZyaHF1dXRtZmNzZ2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDcxODgsImV4cCI6MjA3OTkyMzE4OH0.UcanNlcdhjGVlJ-E91gQfRuXIm58sIJgb-q1BTp6m-o";                      // anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);