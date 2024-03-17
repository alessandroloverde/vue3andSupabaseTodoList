import {onFetch} from "../App.vue"
import supabase from "../App.vue"
import { myAuth } from "../App.vue";
import { authStatus } from "../App.vue";


export default function useAuthUser() {
  const login = async () => {  
    const { data, error } = await supabase.auth.signInWithPassword({
        email: myAuth.login.email.value,
        password: myAuth.login.password.value
    });
  
    if (error) {
        alert('login fallito')
        console.error('Login fallito. Error logging in:', error.message, data);       
    } else {
        !authStatus.value
        alert('login')
  
        onFetch('tasks')
        onFetch('categories')
    }
  }

  const register = async () => {   
    const {data, error } = await supabase.auth.signUp({
        email: myAuth.register.email.value,
        password: myAuth.register.password.value
    })
  
    if (error) console.error('Registrazione fallita. Error logging in:', error.message);
    else console.log('Successo. User registed:', data.user);
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
  
    myAuth.login.email.value = ''
    myAuth.login.password.value = ''
  
    onFetch('tasks')
    onFetch('categories')
  
    if (error) throw error;
  }

  return {
    login,
    register,
    logout
  }
}

