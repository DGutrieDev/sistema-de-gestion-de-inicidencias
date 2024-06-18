import React, { useEffect, useState } from "react";
import { IonContent, IonButton, IonToast, IonPage, IonRow, IonCol, IonSelect, IonSelectOption } from "@ionic/react";
import axios from "axios";
import "../styles/formularios.css";

interface FormAsignarProps {
    closeForm: () => void;
}

const FormAsignar: React.FC<FormAsignarProps> = ({ closeForm }) => {
    const [incidencias, setIncidencias] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [prioridad, setPrioridad] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [afectacion, setAfectacion] = useState([]);
    const [riesgo, setRiesgo] = useState([]);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastStateColor, setToastStateColor] = useState<string>('');
    async function cargarIncidencias() {
        try {
            const response = await axios.get("http://localhost:3000/api/incidencias/estado/sin-asignar");
            setIncidencias(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function cargarTecnicos() {
        try {
            const response = await axios.get("http://localhost:3000/api/usuarios/rol/tecnicos");
            setTecnicos(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function cargarPrioridad() {
        try {
            const response = await axios.get("http://localhost:3000/api/prioridad");
            setPrioridad(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function cargarCategoria() {
        try {
            const response = await axios.get("http://localhost:3000/api/categorias");
            setCategoria(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function cargarAfectacion() {
        try {
            const response = await axios.get("http://localhost:3000/api/afectacion");
            setAfectacion(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function cargarRiesgo() {
        try {
            const response = await axios.get("http://localhost:3000/api/riesgos");
            setRiesgo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        cargarIncidencias();
        cargarTecnicos();
        cargarPrioridad();
        cargarCategoria();
        cargarAfectacion();
        cargarRiesgo();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const id_incidencia = (document.querySelector('[name=incidencia]') as HTMLInputElement).value;
            const id_tecnico = (document.querySelector('[name=tecnico]') as HTMLInputElement).value;
            const id_prioridad = (document.querySelector('[name=prioridad]') as HTMLInputElement).value;
            const id_categoria = (document.querySelector('[name=categoria]') as HTMLInputElement).value;
            const id_afectacion = (document.querySelector('[name=afectacion]') as HTMLInputElement).value;
            const id_riesgo = (document.querySelector('[name=riesgo]') as HTMLInputElement).value;
            if (!id_incidencia || !id_tecnico || !id_prioridad || !id_categoria || !id_afectacion || !id_riesgo) {
                setToastStateColor('danger');
                setToastMessage('Todos los campos son requeridos');
                setShowToast(true);
            } else {
                const response = await axios.post('http://localhost:3000/api/incidencias/asignar', {
                    incidencia: id_incidencia,
                    usuario: id_tecnico,
                    prioridad: id_prioridad,
                    categoria: id_categoria,
                    afectacion: id_afectacion,
                    riesgo: id_riesgo
                });
                if (response.status === 201) {
                    setToastStateColor('success');
                    setToastMessage('Incidencia asignada exitosamente');
                    setShowToast(true);
                    setTimeout(() => {
                        setShowToast(false);
                        closeForm();
                    }, 1000);
                } else {
                    setToastStateColor('danger');
                    setToastMessage('Error al asignar la incidencia');
                    setShowToast(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <IonPage>
            <IonContent>
                <IonRow>
                    <IonCol size="12" sizeMd="6">
                        <form className="form_asignacion" onSubmit={handleSubmit}>
                            <IonSelect
                                name="incidencia"
                                className="input-fields"
                                interface="popover"
                                label="Incidencia"
                            >
                                {incidencias.map((incidencia: any) => (
                                    <IonSelectOption key={incidencia.CT_cod_incidencia} value={incidencia.CT_cod_incidencia}>
                                        {incidencia.CT_cod_incidencia} - {incidencia.CT_titulo}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                            <IonSelect
                                name="tecnico"
                                className="input-fields"
                                interface="popover"
                                label="Técnico"
                            >
                                {tecnicos.map((tecnico: any) => (
                                    <IonSelectOption key={tecnico.CT_cedula} value={tecnico.CT_cedula}>
                                        {tecnico.CT_cedula} - {tecnico.CT_nombre} {tecnico.CT_apellidoUno} {tecnico.CT_apellidoDos}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                            <IonSelect
                                name="prioridad"
                                className="input-fields"
                                interface="popover"
                                label="Prioridad"
                            >
                                {prioridad.map((prioridad: any) => (
                                    <IonSelectOption key={prioridad.CT_cod_prioridad} value={prioridad.CT_cod_prioridad}>
                                        {prioridad.CT_cod_prioridad} - {prioridad.CT_descrip_prioridad}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                            <IonSelect
                                name="categoria"
                                className="input-fields"
                                interface="popover"
                                label="Categoría"
                            >
                                {categoria.map((categoria: any) => (
                                    <IonSelectOption key={categoria.CT_cod_categoria} value={categoria.CT_cod_categoria}>
                                        {categoria.CT_cod_categoria} - {categoria.CT_descrip_categ}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                            <IonSelect
                                name="afectacion"
                                className="input-fields"
                                interface="popover"
                                label="Afectación"
                            >
                                {afectacion.map((afectacion: any) => (
                                    <IonSelectOption key={afectacion.CT_cod_afectacion} value={afectacion.CT_cod_afectacion}>
                                        {afectacion.CT_cod_afectacion} - {afectacion.CT_descrip_afec}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                            <IonSelect
                                name="riesgo"
                                className="input-fields"
                                interface="popover"
                                label="Riesgo"
                            >
                                {riesgo.map((riesgo: any) => (
                                    <IonSelectOption key={riesgo.CT_cod_riesgo} value={riesgo.CT_cod_riesgo}>
                                        {riesgo.CT_cod_riesgo} - {riesgo.CT_descrip_riesgo}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                            <IonButton type="submit" shape="round" className="button">Asignar</IonButton>
                        </form>
                    </IonCol>
                </IonRow>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={1000}
                    position="top"
                    color={toastStateColor}
                />
            </IonContent>
        </IonPage>
    );
};

export default FormAsignar;