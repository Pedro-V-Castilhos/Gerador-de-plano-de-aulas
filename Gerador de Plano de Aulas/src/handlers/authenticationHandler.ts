import { supabase } from "../components/clients/supabaseClient";

// CADASTRO
export const signUp = async (email:string, password:string) => {
    const {error} = await supabase.auth.signUp({email, password});
    if(error){
        console.log(`Erro ao realizar cadastro: ${error.message}`);
        return
    }
}

// LOGIN
export const signIn = async (email: string, password:string) => {
    const {error} = await supabase.auth.signInWithPassword({email, password});
    if(error){
        console.log(`Erro ao realizar login: ${error.message}`)
        return
    }
}