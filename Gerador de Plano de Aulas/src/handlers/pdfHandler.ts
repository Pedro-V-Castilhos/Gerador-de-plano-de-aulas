import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { marked } from "marked"

export const markdownToPdf = async (markdownContent: string) => {
    if(!markdownContent){
        return null
    }

    const htmlContent = await markdownToHtml(markdownContent)

    if(!htmlContent){
        return null
    }

    const tempElement = document.createElement("div")
    tempElement.style.position = "absolute";
    tempElement.style.left = '-9999px';      
    tempElement.style.width = '794px';       
    tempElement.style.padding = '30px';      
    tempElement.style.backgroundColor = '#fff';

    tempElement.innerHTML = htmlContent;

    document.body.appendChild(tempElement);

    try {
        const pdf = await generatePdfFromElement(tempElement);

        return pdf
    } catch (error) {
        console.error(error);
    } finally {
        document.body.removeChild(tempElement);
    }

    return null
}

const markdownToHtml = async (markdownContent: string) => {
    if(markdownContent){
        return await marked(markdownContent);
    }

    return null;
}

const generatePdfFromElement = async (htmlElement:HTMLElement) => {
    const canvas = await html2canvas(htmlElement, {
        scale: 2,
        useCORS: true,
    })

    const imgData = canvas.toDataURL("image/img")
    const pdf = new jsPDF("p", "mm", "a4")
    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    while(heightLeft >= 0){
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
    }

    return pdf
}