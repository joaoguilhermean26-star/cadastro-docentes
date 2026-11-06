import { useState } from 'react'

function Login(props) {
  var [usuario, setUsuario] = useState('')
  var [senha, setSenha] = useState('')
  var [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // login simples so pra simular a autenticacao (usuario: admin / senha: 123)
    if (usuario === 'admin' && senha === '123') {
      setErro('')
      props.onLogin()
    } else {
      setErro('Usuário ou senha inválidos')
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">Usuário</label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    className="form-control"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    className="form-control"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
                {erro && <div className="alert alert-danger">{erro}</div>}
                <button type="submit" className="btn btn-primary w-100">Entrar</button>
              </form>
              <p className="text-muted text-center mt-3 mb-0">Dica: admin / 123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
