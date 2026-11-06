function ListDocentes(props) {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Docentes Cadastrados</h2>

      {props.docentes.length === 0 && (
        <div className="alert alert-info">Nenhum docente cadastrado ainda.</div>
      )}

      {props.docentes.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Formação / Área</th>
                <th>Email Institucional</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {props.docentes.map((docente) => (
                <tr key={docente.id}>
                  <td>{docente.nome}</td>
                  <td>{docente.formacao}</td>
                  <td>{docente.emailInstitucional}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => props.onEdit(docente)}
                    >
                      Alterar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => props.onDelete(docente.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListDocentes
