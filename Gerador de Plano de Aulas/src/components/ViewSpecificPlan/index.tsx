import { useNavigate, useParams } from "react-router-dom";
import { getPdfById } from "../../handlers/pdfDatabaseHandler";
import { useEffect, useState } from "react";
import type { Plan } from "../../types/plan";
import "./styles.css"
import { Button } from "react-bootstrap";

export default function ViewSpecificPlan(){
    const [pdf, setPdf] = useState<Plan[]>([])
    const {pdfId} = useParams();
    const redirect = useNavigate();

    useEffect(() => {
        const loadPlan = async () => {
            setPdf(await getPdfById(pdfId ?? "") ?? [])
        }

        loadPlan()
    }, [])

    return(
        pdf.length > 0
        ?<div className="viewPdf">
            <h2>Plano gerado sobre {pdf[0].subject}:</h2>
            {pdf[0].id}
            <object data={pdf[0].pdfUrl} type="application/pdf">
                <p>Seu navegador não suporta PDFs. <a href="caminho/para/seu/arquivo.pdf" download>Baixe o arquivo aqui</a>.</p>
            </object>
            <Button variant="primary" onClick={() => {redirect("/")}}>Voltar</Button>
        </div>
        : <>Carregando...</>
    )
}