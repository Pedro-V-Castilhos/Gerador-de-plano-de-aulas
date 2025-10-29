import { useParams } from "react-router-dom";
import { getPdfById } from "../../handlers/pdfDatabaseHandler";
import { useEffect, useState } from "react";
import type { Plan } from "../../types/plan";

export default function ViewSpecificPlan(){
    const [pdf, setPdf] = useState<Plan[]>([])
    const {pdfId} = useParams();

    useEffect(() => {
        const loadPlan = async () => {
            setPdf(await getPdfById(pdfId ?? "") ?? [])
        }

        loadPlan()
    }, [])

    return(
        pdf.length > 0
        ?<object data={pdf[0].pdfUrl} type="application/pdf">
            <p>Seu navegador não suporta PDFs. <a href="caminho/para/seu/arquivo.pdf" download>Baixe o arquivo aqui</a>.</p>
        </object>
        : <></>
    )
}