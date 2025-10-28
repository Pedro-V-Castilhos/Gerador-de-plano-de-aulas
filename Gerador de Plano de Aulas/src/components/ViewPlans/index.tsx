import { useEffect, useState } from "react"
import type { Plan } from "../../types/plan"
import { fetchPlans } from "../../handlers/planHandler";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
                        <tr>
                            <td>{plan.subject}</td>
                            <td>{plan.urlPdf}</td>
                        </tr>
                    )
                })
                : <tr><td colSpan={2}>Nenhum plano criado</td></tr>
                }
            </tbody>
        </table>
        <Button variant="primary" onClick={() => redirect("/new")}>Novo plano</Button>
    </div>
)
}