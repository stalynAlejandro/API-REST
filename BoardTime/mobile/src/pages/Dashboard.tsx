import React,{ useState }  from 'react'
import { IonPage, IonRow, IonCol, IonInput, IonModal, IonList, IonItem, IonButton, IonIcon, IonHeader, IonToolbar, IonContent, IonTitle, IonLabel, IonItemSliding} from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { loadTask, deleteTask, createTask } from '../data/dataApi';
import { IUser, ITask } from '../data/user/user.reducer';
import { userLoadTasks, userLogout } from '../data/user/user.actions';
import { useHistory } from 'react-router'
import './Dashboard.scss'

// Dashbaord controlará las operaciones con las Tareas. 
// Primero se mostrarárn las tareas del usuario. ion-list.
// Se podrá crear tareas, ver los detalles y eliminar tareas.
// Para la creactión y eliminación se utilizan pantallas que se sobreponen a la lista. 
const Dashboard: React.FC = () => {

    const user = useSelector(state => state) as IUser;              // Usuario del store. Redux
    const dispatch = useDispatch()                                  // Para despachar acciones al reducer.
    const history = useHistory()                                    // Para navegar. Router

    const [showModalDetail, setShowModalDetail] = useState(false);  // Variable para controlar el modal de Detalles
    const [showModalCreate, setShowModalCreate] = useState(false);  // Variable para controlar el modal de Crear
    const [showTask, setShowTask] = useState({name: '', desc: ''})
    const [newTask, setNewTask] = useState({name:'', desc:''})

    const exitDashboard = () => {                                   // Cuando salimos de la app, borramos los datos del usuario
        dispatch(userLogout())
        history.push('/')
    }

    const loadUserTasks = async () => {                             // Recargar las tareas del Usuario
        const response = await loadTask(user.email, user.token);
        if(response){
            dispatch(userLoadTasks(response.tasks))
        }
    }

    const createUserTask = async () => {                            // Crear una tarea. 
        if(!showModalCreate)setShowModalCreate(true)
        else{
            const response = await createTask(user.email, user.token, newTask.name, newTask.desc);
            if(response){
                loadUserTasks()
                showTasks()
            }
            setNewTask({name:'', desc:''})
            setShowModalCreate(false)
        }
    }

    const deleteUserTask = async (_idTask: string) => {             // Borrar una tare
        const response = await deleteTask(_idTask, user.email, user.token);
        if(response){
            loadUserTasks()
            showTasks()
        }
    }

    const showUserTask = (_idTask: string) => {                     // Mostrar la Tarea en el modal
        const task = user.tasks.filter(t => t._id === _idTask)[0] as ITask
        setShowModalDetail(true)
        setShowTask({name: task.name, desc: task.desc})
    }

    const showTasks = () => {                                      // Devuelve la lista de las tareas del usuario
        return(
            user.tasks.map((t, i) => (
                <IonItemSliding key={i}>
                    <IonItem>
                        <IonLabel>
                            {t.name}
                        </IonLabel>
                        <IonButton onClick={() => deleteUserTask(t._id)}>Delete</IonButton>
                        <IonButton onClick={() => showUserTask(t._id)}>Details</IonButton>
                    </IonItem>
                </IonItemSliding>
            ))
        )
    }

    return (
        <IonPage id="dashboard-page">
            {/* Header */}
            <IonHeader>
                <IonToolbar>
                <IonButton fill="clear" onClick={exitDashboard}>
                        <IonIcon icon={arrowBackOutline} />
                    </IonButton>
                    <IonTitle> DashBoard </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent color="secondary">

                {/* Lista de las Tareas del Usuario */}
                <IonList>
                    {showTasks()}
                </IonList>

                {/* Modal para ver los detalles de una Tarea */}
                <IonModal isOpen={showModalDetail} cssClass='my-custom-class'>
                    <h2>Titulo: {showTask.name}</h2>
                    <p>Descripción: {showTask.desc}</p>
                    <IonButton onClick={() => setShowModalDetail(false)}>Close Modal</IonButton>
                </IonModal>

                {/* Modal para crear una Tarea */}
                <IonModal isOpen={showModalCreate} cssClass='my-custom-class'>

                    {/* Formulario para rellenar */}
                    <IonList>
                        <IonItem color="light">
                            <IonLabel position="stacked" color="secondary">Name Task</IonLabel>
                            <IonInput name="name" type="text" value={newTask.name} onIonChange={e => setNewTask({name:e.detail.value!, desc:newTask.desc})}></IonInput>
                        </IonItem>

                        <IonItem color="light">
                            <IonLabel position="stacked" color="secondary">Description: </IonLabel>
                            <IonInput name="desc" type="text" value={newTask.desc} onIonChange={e => setNewTask({name:newTask.name, desc:e.detail.value!})}></IonInput>
                        </IonItem>
                        <IonRow>
                            <IonCol>
                                <IonButton color="light" onClick={createUserTask} expand="block">Create</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonList>

                    {/* Cerramos el modal y no creamos la tarea */}
                    <IonButton onClick={() => setShowModalCreate(false)}>Close Modal</IonButton>

                </IonModal>

                {/* Abrimos el modal de crear Tareas */}
                <IonButton className="b-createTask" onClick={() => createUserTask()}>Create New Task</IonButton>

            </IonContent>
        </IonPage>
    )
}

export default Dashboard