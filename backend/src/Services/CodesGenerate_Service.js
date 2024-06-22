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

module.exports = {
    codIncidencias,
    codDiagnostico,
    codImagen,
};