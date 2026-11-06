import { useState } from 'react'
import Login from './components/Login.jsx'
import Menu from './components/Menu.jsx'
import Welcome from './components/Welcome.jsx'
import DocenteForm from './components/DocenteForm.jsx'
import ListDocentes from './components/ListDocentes.jsx'

function App() {
  var [logged, setLogged] = useState(false)
  var [docentes, setDocentes] = useState([])
  var [activeScreen, setActiveScreen] = useState('welcome')
  var [docenteToEdit, setDocenteToEdit] = useState(null)
  var [nextId, setNextId] = useState(1)

  function handleLogin() {
    setLogged(true)
    setActiveScreen('welcome')
  }

  function handleLogout() {
    setLogged(false)
    setDocenteToEdit(null)
  }

  // Create
  function handleSubmit(novoDocente) {
    novoDocente.id = nextId
    setNextId(nextId + 1)
    setDocentes(docentes.concat(novoDocente))
    setActiveScreen('listar')
  }

  // Update
  function handleUpdateDocente(docenteAtualizado) {
    var novaLista = docentes.map(function (d) {
      if (d.id === docenteAtualizado.id) {
        return docenteAtualizado
      }
      return d
    })
    setDocentes(novaLista)
    setDocenteToEdit(null)
    setActiveScreen('listar')
  }

  // Delete
  function handleDeleteDocente(id) {
    var novaLista = docentes.filter(function (d) {
      return d.id !== id
    })
    setDocentes(novaLista)
  }

  function handleEdit(docente) {
    setDocenteToEdit(docente)
    setActiveScreen('cadastrar')
  }

  function irParaCadastrar() {
    setDocenteToEdit(null)
    setActiveScreen('cadastrar')
  }

  function irParaListar() {
    setDocenteToEdit(null)
    setActiveScreen('listar')
  }

  if (!logged) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div>
      <Menu
        onCadastrar={irParaCadastrar}
        onListar={irParaListar}
        onSair={handleLogout}
      />

      {activeScreen === 'welcome' && <Welcome total={docentes.length} />}

      {activeScreen === 'cadastrar' && (
        <DocenteForm
          key={docenteToEdit ? docenteToEdit.id : 'novo'}
          docenteToEdit={docenteToEdit}
          onSubmit={handleSubmit}
          onUpdate={handleUpdateDocente}
          onCancel={irParaListar}
        />
      )}

      {activeScreen === 'listar' && (
        <ListDocentes
          docentes={docentes}
          onEdit={handleEdit}
          onDelete={handleDeleteDocente}
        />
      )}
    </div>
  )
}

export default App
