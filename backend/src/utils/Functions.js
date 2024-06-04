function codIncidencias(n) {
    const year = new Date().getFullYear().toString();
    const cons = n.toString().padStart(6, '0');
    const cod = `${year}-${cons}`;
    return cod;
}

function codDiagnostico(num_incidencia, n) {
    const cons = n.toString().padStart(2, '0');
    const cod = `DG-${cons}-${num_incidencia}`;
    return cod;
}

function codImagen(num_incidencia, n) {
    const cons = n.toString().padStart(2, '0');
    const cod = `IMG-${cons}-${num_incidencia}`;
    return cod;

}

function imageToBlob(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const blob = new Blob([reader.result], { type: image.type });
            resolve(blob);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(image);
    });
}

 function blobToImage(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

module.exports = {
    codIncidencias,
    codDiagnostico,
    codImagen,
    imageToBlob,
    blobToImage
};