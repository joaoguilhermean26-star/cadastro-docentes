function Welcome(props) {
  return (
    <div className="container mt-5">
      <div className="p-5 bg-light rounded">
        <h1>Bem-vindo(a)!</h1>
        <p className="lead">
          Sistema de cadastro de docentes da coordenação acadêmica.
        </p>
        <p>
          Hoje temos <strong>{props.total}</strong> docente(s) cadastrado(s).
          Use o menu acima para cadastrar um novo docente ou ver a lista.
        </p>
      </div>
    </div>
  )
}

export default Welcome
