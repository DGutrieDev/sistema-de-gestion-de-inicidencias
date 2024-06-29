import React, { useEffect, useState } from "react";
import { IonContent, IonButton, IonToast, IonPage, IonRow, IonCol, IonSelect, IonSelectOption, IonInput, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonNote } from "@ionic/react";
import { getIncidencias, getTecnicos, getPrioridad, getCategoria, getAfectacion, getRiesgo } from "../utils/cargarDatos_Encargado";
import { useAuth } from "../Auth/authContext";
import axios from "axios";
import { useHistory } from "react-router";
import "../styles/formularios.css";

const Asignar_Incidencias: React.FC = () => {
    const { isAuthenticated, usuario } = useAuth();
    const history = useHistory();
    const Host = import.meta.env.VITE_BASE_URL;
    const [incidencias, setIncidencias] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [prioridad, setPrioridad] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [afectacion, setAfectacion] = useState([]);
    const [riesgo, setRiesgo] = useState([]);

    const [incidencia, setIncidencia] = useState('');
    const [tecnico, setTecnico] = useState('');
    const [prioridad_, setPrioridad_] = useState('');
    const [categoria_, setCategoria_] = useState('');
    const [afectacion_, setAfectacion_] = useState('');
    const [riesgo_, setRiesgo_] = useState('');
    const [duracion, setDuracion] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!incidencia || !tecnico || !prioridad_ || !categoria_ || !afectacion_ || !riesgo_ || !duracion) {
            alert('Por favor llene todos los campos');
            return;
        }
        try {
            const res = await axios.post(`${Host}/encargados/asignar`, {
                cod_Incidencia: incidencia,
                ids_Tecnicos: tecnico,
                prioridad: prioridad_,
                categoria: categoria_,
                afectacion: afectacion_,
                riesgo: riesgo_,
                duracion: duracion
            });
            if (res.status === 201) {
                alert('Incidencia asignada con exito');
                history.push('/Home');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const incidenciasData = await getIncidencias();
            const tecnicosData = await getTecnicos();
            const prioridadData = await getPrioridad();
            const categoriaData = await getCategoria();
            const afectacionData = await getAfectacion();
            const riesgoData = await getRiesgo();

            setIncidencias(incidenciasData.incidencias);
            setTecnicos(tecnicosData.tecnicos);
            setPrioridad(prioridadData.prioridades);
            setCategoria(categoriaData.categorias);
            setAfectacion(afectacionData.afectaciones);
            setRiesgo(riesgoData.riesgos);
        };
        if (isAuthenticated && usuario) fetchData();
    }, [isAuthenticated, usuario]);

    return (
        <IonPage>
            <IonHeader className='custom-header'>
                <IonToolbar className='custom-toolbar'>
                    <IonButtons slot="start" className='btns'>
                        <IonMenuButton className='btn_menu' />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRow>
                    <IonCol size="12" sizeMd="6">
                        <br />
                        <IonNote className='note'>Asignar Incidencias</IonNote>
                        <br />
                        <form className="form_asignacion" onSubmit={handleSubmit}>
                            <IonSelect
                                name="incidencia"
                                className="input-fields"

                                label="Incidencia"
                                onIonChange={(e) => setIncidencia(e.detail.value)}
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

                                label="Técnico"
                                onIonChange={(e) => setTecnico(e.detail.value)}
                                multiple
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

                                label="Prioridad"
                                onIonChange={(e) => setPrioridad_(e.detail.value)}
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

                                label="Categoría"
                                onIonChange={(e) => setCategoria_(e.detail.value)}
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

                                label="Afectación"
                                onIonChange={(e) => setAfectacion_(e.detail.value)}
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

                                label="Riesgo"
                                onIonChange={(e) => setRiesgo_(e.detail.value)}
                            >
                                {riesgo.map((riesgo: any) => (
                                    <IonSelectOption key={riesgo.CT_cod_riesgo} value={riesgo.CT_cod_riesgo}>
                                        {riesgo.CT_cod_riesgo} - {riesgo.CT_descrip_riesgo}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                            <IonInput
                                name="duracion"
                                className="input-fields"
                                placeholder="Duración estimada de la Incidencia"
                                onIonChange={(e) => setDuracion(e.detail.value!)}
                            >

                            </IonInput>
                            <IonButton className='button_form' shape='round' type='submit'>Asignar</IonButton>
                            <IonButton className='button_form' shape='round' type='button' color={'danger'} onClick={() => history.push('/Home')}>Cancelar</IonButton>
                        </form>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default Asignar_Incidencias;