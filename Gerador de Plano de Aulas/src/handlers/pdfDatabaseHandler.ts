import type jsPDF from "jspdf"
import { supabase } from "../components/clients/supabaseClient"

export const uploadPdf = async (pdf:jsPDF) => {
    const fileName = `plan-${Date.now()}.pdf`

    const pdfBlob = pdf.output("blob") as Blob

    const {error} = await supabase.storage.from("plansBucket").upload(fileName, pdfBlob, {
        contentType: "application/pdf",
        upsert: false,
    })

    if(error){
        console.log(error.message)
        return
    }

    const {data} = supabase.storage.from("plansBucket").getPublicUrl(fileName);

    return data.publicUrl;
}

export const savePdf = async (theme:string, pdfUrl:string) => {
    const {data, error} = await supabase.from("classPlans").insert({user: (await supabase.auth.getSession()).data.session?.user.id, subject: theme, pdfUrl: pdfUrl}).select()

    if(error){
        console.log(error.message)
        return
    }

    return data[0].id
}

export const getPdfById = async (id:string) => {
    const {data, error} = await supabase.from("classPlans").select("*").eq("id", id)

    if(error){
        console.log(error.message)
        return
    }

    return data;
}

