import { useState } from 'react'

var ufs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

// pega so os numeros de um texto
function somenteNumeros(texto) {
  var resultado = ''
  for (var i = 0; i < texto.length; i++) {
    var c = texto.charAt(i)
    if (c >= '0' && c <= '9') {
      resultado = resultado + c
    }
  }
  return resultado
}

// mascara 000.000.000-00
function maskCPF(valor) {
  var n = somenteNumeros(valor).slice(0, 11)
  var r = n.slice(0, 3)
  if (n.length > 3) r = r + '.' + n.slice(3, 6)
  if (n.length > 6) r = r + '.' + n.slice(6, 9)
  if (n.length > 9) r = r + '-' + n.slice(9, 11)
  return r
}

// mascara (00) 00000-0000
function maskTelefone(valor) {
  var n = somenteNumeros(valor).slice(0, 11)
  var r = ''
  if (n.length > 0) r = '(' + n.slice(0, 2)
  if (n.length > 2) r = r + ') ' + n.slice(2, 7)
  if (n.length > 7) r = r + '-' + n.slice(7, 11)
  return r
}

// mascara 00000-000
function maskCEP(valor) {
  var n = somenteNumeros(valor).slice(0, 8)
  var r = n.slice(0, 5)
  if (n.length > 5) r = r + '-' + n.slice(5, 8)
  return r
}

function DocenteForm(props) {
  var docenteToEdit = props.docenteToEdit

  // um useState pra cada campo
  var [nome, setNome] = useState(docenteToEdit ? docenteToEdit.nome : '')
  var [cpf, setCpf] = useState(docenteToEdit ? docenteToEdit.cpf : '')
  var [formacao, setFormacao] = useState(docenteToEdit ? docenteToEdit.formacao : '')
  var [emailInstitucional, setEmailInstitucional] = useState(docenteToEdit ? docenteToEdit.emailInstitucional : '')
  var [emailParticular, setEmailParticular] = useState(docenteToEdit ? docenteToEdit.emailParticular : '')
  var [telefone, setTelefone] = useState(docenteToEdit ? docenteToEdit.telefone : '')
  var [endereco, setEndereco] = useState(docenteToEdit ? docenteToEdit.endereco : '')
  var [numero, setNumero] = useState(docenteToEdit ? docenteToEdit.numero : '')
  var [cidade, setCidade] = useState(docenteToEdit ? docenteToEdit.cidade : '')
  var [cep, setCep] = useState(docenteToEdit ? docenteToEdit.cep : '')
  var [uf, setUf] = useState(docenteToEdit ? docenteToEdit.uf : '')
  var [erros, setErros] = useState({})

  function validar() {
    var novosErros = {}

    if (nome.trim().length < 3) {
      novosErros.nome = 'O nome precisa ter no mínimo 3 caracteres'
    }
    // formato do CPF: 11 numeros (000.000.000-00)
    if (somenteNumeros(cpf).length !== 11) {
      novosErros.cpf = 'CPF inválido, use o formato 000.000.000-00'
    }
    if (formacao.trim() === '') {
      novosErros.formacao = 'Informe a formação / área de atuação'
    }
    if (emailInstitucional.indexOf('@') === -1) {
      novosErros.emailInstitucional = 'Informe um email institucional com @'
    }
    // o particular é opcional, so valida se preencheu
    if (emailParticular !== '' && emailParticular.indexOf('@') === -1) {
      novosErros.emailParticular = 'O email particular precisa ter @'
    }
    if (somenteNumeros(telefone).length !== 11) {
      novosErros.telefone = 'Informe o celular no formato (00) 00000-0000'
    }
    if (endereco.trim() === '') {
      novosErros.endereco = 'Informe o endereço'
    }
    if (numero.trim() === '') {
      novosErros.numero = 'Informe o número'
    }
    if (cidade.trim() === '') {
      novosErros.cidade = 'Informe a cidade'
    }
    if (somenteNumeros(cep).length !== 8) {
      novosErros.cep = 'CEP inválido, use o formato 00000-000'
    }
    if (uf === '') {
      novosErros.uf = 'Escolha um estado'
    }

    return novosErros
  }

  function handleSubmit(e) {
    e.preventDefault()

    var novosErros = validar()
    setErros(novosErros)

    // se tiver algum erro dentro do objeto, nao salva
    var temErro = false
    for (var campo in novosErros) {
      temErro = true
    }
    if (temErro) {
      return
    }

    var dados = {
      nome: nome,
      cpf: cpf,
      formacao: formacao,
      emailInstitucional: emailInstitucional,
      emailParticular: emailParticular,
      telefone: telefone,
      endereco: endereco,
      numero: numero,
      cidade: cidade,
      cep: cep,
      uf: uf
    }

    if (docenteToEdit) {
      dados.id = docenteToEdit.id
      props.onUpdate(dados)
    } else {
      props.onSubmit(dados)
    }
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-3">{docenteToEdit ? 'Alterar Docente' : 'Cadastrar Novo Docente'}</h2>

      <form onSubmit={handleSubmit}>

        <fieldset className="border rounded p-3 mb-4">
          <h3>Dados Pessoais</h3>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nome" className="form-label">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              {erros.nome && <small className="text-danger">{erros.nome}</small>}
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cpf" className="form-label">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                className="form-control"
                value={cpf}
                onChange={(e) => setCpf(maskCPF(e.target.value))}
              />
              {erros.cpf && <small className="text-danger">{erros.cpf}</small>}
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="formacao" className="form-label">Formação / Área de Atuação</label>
              <input
                type="text"
                id="formacao"
                name="formacao"
                className="form-control"
                value={formacao}
                onChange={(e) => setFormacao(e.target.value)}
              />
              {erros.formacao && <small className="text-danger">{erros.formacao}</small>}
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded p-3 mb-4">
          <h3>Contatos</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="emailInstitucional" className="form-label">Email Institucional</label>
              <input
                type="email"
                id="emailInstitucional"
                name="emailInstitucional"
                className="form-control"
                value={emailInstitucional}
                onChange={(e) => setEmailInstitucional(e.target.value)}
              />
              {erros.emailInstitucional && <small className="text-danger">{erros.emailInstitucional}</small>}
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="emailParticular" className="form-label">Email Particular (opcional)</label>
              <input
                type="email"
                id="emailParticular"
                name="emailParticular"
                className="form-control"
                value={emailParticular}
                onChange={(e) => setEmailParticular(e.target.value)}
              />
              {erros.emailParticular && <small className="text-danger">{erros.emailParticular}</small>}
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="telefone" className="form-label">Telefone Celular</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(00) 00000-0000"
                className="form-control"
                value={telefone}
                onChange={(e) => setTelefone(maskTelefone(e.target.value))}
              />
              {erros.telefone && <small className="text-danger">{erros.telefone}</small>}
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded p-3 mb-4">
          <h3>Endereço</h3>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="endereco" className="form-label">Endereço Residencial</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                className="form-control"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              {erros.endereco && <small className="text-danger">{erros.endereco}</small>}
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="numero" className="form-label">Número</label>
              <input
                type="text"
                id="numero"
                name="numero"
                className="form-control"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              {erros.numero && <small className="text-danger">{erros.numero}</small>}
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="cidade" className="form-label">Cidade</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                className="form-control"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              {erros.cidade && <small className="text-danger">{erros.cidade}</small>}
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cep" className="form-label">CEP</label>
              <input
                type="text"
                id="cep"
                name="cep"
                placeholder="00000-000"
                className="form-control"
                value={cep}
                onChange={(e) => setCep(maskCEP(e.target.value))}
              />
              {erros.cep && <small className="text-danger">{erros.cep}</small>}
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="uf" className="form-label">UF (Estado)</label>
              <select
                id="uf"
                name="uf"
                className="form-select"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              >
                <option value="">Selecione...</option>
                {ufs.map((sigla) => (
                  <option key={sigla} value={sigla}>{sigla}</option>
                ))}
              </select>
              {erros.uf && <small className="text-danger">{erros.uf}</small>}
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-success me-2">
          {docenteToEdit ? 'Salvar Alterações' : 'Cadastrar'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={props.onCancel}>
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default DocenteForm