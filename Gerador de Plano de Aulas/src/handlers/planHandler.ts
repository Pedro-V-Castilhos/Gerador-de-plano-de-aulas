import { supabase } from "../components/clients/supabase-client";

export const fetchPlans = async () => {
    const {error, data} = await supabase.from("classPlans").select("*")
    
    if(error){
        console.log(error.message)
        return
    }

    return data;
}