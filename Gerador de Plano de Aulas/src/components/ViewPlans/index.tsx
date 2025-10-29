import { useEffect, useState } from "react"
import type { Plan } from "../../types/plan"
import { fetchPlans } from "../../handlers/planHandler";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css"

export default function ViewPlans(){
    const [plans, setPlans] = useState<Plan[]>([]);
    const redirect = useNavigate();

    useEffect(() => {
        const loadPlans = async () => {
            setPlans(await fetchPlans() ?? []);
        }

        loadPlans();
    }, [])

    return(
    <div className="viewPlans">
        <Button variant="primary" onClick={() => redirect("/new")}>Novo plano</Button>
        <br/>
        <table>
            <thead>
                <tr>
                    <th>Tema</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                {plans.length != 0
                ? plans.map((plan) => {
                    return(
                        <tr key={plan.id}>
                            <td>{plan.subject}</td>
                            <td><Link to={`/view/${plan.id}`}>{plan.pdfUrl}</Link></td>
                        </tr>
                    )
                })
                : <tr><td colSpan={2}>Nenhum plano criado</td></tr>
                }
            </tbody>
        </table>
    </div>
)
}