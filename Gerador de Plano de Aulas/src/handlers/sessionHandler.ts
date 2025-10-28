import type { AuthSession } from "@supabase/supabase-js";
import { supabase } from "../components/clients/supabaseClient";

// Carrega a sessão atual
export const fetchSession = async () => {
    const curentSession = await supabase.auth.getSession();
    return curentSession.data.session;
}

export const setSessionListener = (setState: (session: AuthSession | null) => void) => {
    const {data: subscription} = supabase.auth.onAuthStateChange((_event, session) => {
      return setState(session);
    })

    return subscription;
}

// Função de logout
export const logout = async () => {
    await supabase.auth.signOut();
}