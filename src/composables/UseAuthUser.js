import { onFetch } from "../App.vue"
import supabase from "../App.vue"
import { ref } from "vue"

const user = ref(null)

export default function useAuthUser() {
  const login = async ({email, password}) => {

  };
  const logout = async () => {

  };
  const register = async ({email, password}) => {

  };
  const isLoggedIn = () => {};
  const update = async (data) => {
    
  };
  const sendPasswordResetEmail = async (email) => {

  };

  return {
    login,
    logout,
    register,
    isLoggedIn,
    update,
    sendPasswordResetEmail
  }

}




