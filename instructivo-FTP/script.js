function generarDocumentoPDF() {
    const cliente = document.getElementById('cliente').value;
    const portal = document.getElementById('portal').value;

    // Actualiza el contenido dinámico
    document.getElementById('titulo').textContent = `FTP ${cliente}`;
    document.getElementById('contenido').textContent = `
        El siguiente documento explica los conceptos básicos para editar el layout.

        Carpeta Raíz:
        /portal-${portal}

        /portal-${portal}/Containers/base-cms:
        Aquí está el CSS para los títulos de los Containers del sitio.

        /portal-${portal}/Images:
        Son las imágenes del sitio cargadas para el contenido.
        ...
    `;

    // Utiliza html2canvas para capturar el contenido
    html2canvas(document.getElementById('contentToPDF')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`FTP_${cliente}.pdf`);
    }).catch(error => {
        console.error("Error generando el PDF: ", error);
    });
}
