import './static/css/app.css'
import { useState } from 'react'

export default function App() {

  const [tareas, setTareas] = useState([])
  const [tareasCompletadas,setTareasCompletadas] = useState([])

  const [inputTarea, setInputTarea] = useState("")

  function handleInputTarea(event) {
    setInputTarea(event.target.value)
  }

  function handleForm(event) {
    event.preventDefault()
    const nuevaTarea = {
      id: Date.now(),
      texto: inputTarea
    }
    setTareas([...tareas, nuevaTarea])
    setInputTarea("")
  }

  function handleTareaCompleta(id){
    const tareaCompletada = tareas.find(tarea => tarea.id === id)
    setTareasCompletadas([...tareasCompletadas, tareaCompletada])
    setTareas(tareas.filter(tarea => tarea.id != id))
  }

  function handleTareaEliminada(id){
    setTareas(tareas.filter(tarea => tarea.id != id))
  }

  return (
    <div className="contenedor">
      <h1 className='titulo'>Listado de tareas</h1>
      <hr />
      <div className="formulario">
        <h2>Agregar tarea</h2>
        <form onSubmit={handleForm} autoComplete='off'>
          <input type="text" onChange={handleInputTarea} value={inputTarea} placeholder='Ingrese una tarea' autoComplete='off' />
          <input type="submit" value="➕" />
        </form>
      </div>

      <div className="listado-tareas">

        <div className="tareas">
          <h2>Tareas pendientes</h2>
          <ul>
            {tareas.map((tarea) => (
              <li 
                key={tarea.id}>
                {tarea.texto}
                <button onClick={() => handleTareaCompleta(tarea.id)}>✅</button>
                <button onClick={() => handleTareaEliminada(tarea.id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tareas">
          <h2>Tareas completadas</h2>
          <ul>
            {tareasCompletadas.map((tarea) => (
              <li key={tarea.id}>
                {tarea.texto}
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  )
}
