import { Button } from "react-bootstrap"
import "./styles.css"
import { useNavigate } from "react-router-dom"

export default function NewPlan(){
    const redirect = useNavigate();
    return(
        <div className="newPlan">
            <h2>NOVO PLANO</h2>
            <div className="formNewPlan">
                <Button variant="primary">Criar</Button>
                <Button variant="danger" onClick={() => {redirect("/")}}>Cancelar</Button>
            </div>
        </div>
    )
}