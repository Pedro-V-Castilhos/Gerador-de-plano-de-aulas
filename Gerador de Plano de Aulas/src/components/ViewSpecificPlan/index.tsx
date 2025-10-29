import { useParams } from "react-router-dom";

export default function ViewSpecificPlan(){
    const {pdfId} = useParams();

    return(<>{pdfId}</>)
}