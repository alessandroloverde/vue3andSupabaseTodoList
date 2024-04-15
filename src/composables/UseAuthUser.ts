import { ref } from "vue"
import useSupabase from "./UseSupabase"

import type { Ref } from 'vue';
import type { User } from "@supabase/supabase-js";

const user: Ref<User | null> = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();

  /**
   * * Login
   */
  const login = async ({email, password}) => {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) { throw error }
  
      console.log('Login successful--USER', user);

      return user;
    } catch (error) {
      console.error('Login failed:', error.message);
      
      throw error;
    }
  };

  /**
   * * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
  };

  /**
   * * Register a new user with the provided email, password, and additional metadata.
   */
  const register = async ({email, password, ...meta}) => {
    const { data, error } = await supabase.auth.signUp({email, password, options: { data: meta }})

    console.log(user)
  };

  /**
   * * Check if the user is logged in or not (return boolean)
   */
  const isLoggedIn = () => {
    return !!user.value
  };

  const update = async (data) => {
    
  };

  /**
   * * Password reset
   */
  const sendPasswordResetEmail = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)

    return data
  };

  return {
    user,
    supabase,
    login,
    logout,
    register,
    isLoggedIn,
    update,
    sendPasswordResetEmail
  }

}




