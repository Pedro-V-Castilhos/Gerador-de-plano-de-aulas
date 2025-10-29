import { Button, Form} from "react-bootstrap"
import "./styles.css"
import { useNavigate } from "react-router-dom"
import { useGeneratePlan } from "../clients/geminiAiClient";
import { useState } from "react";
import { savePdf } from "../../handlers/pdfDatabaseHandler";

export default function NewPlan(){
    const [theme, setTheme] = useState<string>("")
    const [schoolLevel, setSchoolLevel] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const {aiResponse, error, generatePlan} = useGeneratePlan();

    const redirect = useNavigate();

    return(
        <div className="newPlan">
            <h2>NOVO PLANO</h2>
            <div className="formNewPlan">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tema:</Form.Label>
                        <Form.Control onChange={(e) => {setTheme(e.target.value)}} type="text" placeholder="Química orgânica" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nível escolar:</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => {setSchoolLevel(e.target.value)}}>
                            <option selected disabled>Nível escolar do plano....</option>
                            <option value="pré-escola">Pré - escola</option>
                            <option value="ensino fundamental I">Ensino Fundamental I</option>
                            <option value="ensino fundamental II">Ensino Fundamental II</option>
                            <option value="ensino médio">Ensino Médio</option>
                            <option value="faculdade">Faculdade</option>
                            <option value="especialização">Especialização</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Conteúdo do plano:</Form.Label>
                        <Form.Control as="textarea" rows={10} onChange={(e) => {setContent(e.target.value)}}></Form.Control><br/>
                    </Form.Group> 
                </Form>
                <Button variant="primary" onClick={async () => {
                    if(error){
                        console.log(error)
                    }else{
                        await generatePlan(theme, schoolLevel, content)
                        const idPdf = await savePdf(theme, aiResponse ?? "")
                        redirect(`/view/${idPdf}`)
                    }
                }}>Criar</Button>
                <Button variant="danger" onClick={() => {redirect("/")}}>Cancelar</Button>
            </div>
        </div>
    )
}