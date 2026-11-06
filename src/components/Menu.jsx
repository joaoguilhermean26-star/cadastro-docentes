function Menu(props) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <span className="navbar-brand">Cadastro de Docentes</span>
      <div className="navbar-nav me-auto">
        <button className="btn btn-outline-light me-2" onClick={props.onCadastrar}>
          Cadastrar
        </button>
        <button className="btn btn-outline-light me-2" onClick={props.onListar}>
          Listar
        </button>
      </div>
      <button className="btn btn-danger" onClick={props.onSair}>
        Sair
      </button>
    </nav>
  )
}

export default Menu
