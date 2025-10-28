import { supabase } from "../components/clients/supabaseClient";

export const fetchPlans = async () => {
    const {error, data} = await supabase.from("classPlans").select("*")
    
    if(error){
        console.log(error.message)
        return
    }

    return data;
}