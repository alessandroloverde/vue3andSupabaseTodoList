import { createClient } from '@supabase/supabase-js';
import useAuthUser from "@/composables/UseAuthUser";

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

supabase.auth.onAuthStateChange((event, session) => {
    // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
    // the session contains info about the current session most importanly the user dat
    const { user } = useAuthUser();
  
    // if the user exists in the session we're logged in and we can set our user reactive ref
    user.value = session?.user || null;
  });

export default function useSupabase() {
    return { supabase };
}