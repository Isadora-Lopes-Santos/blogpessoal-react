import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"

function Cadastro() {

  const navigate = useNavigate() // hook de navegação -> "teletransporte de telas"
  
  const [isLoading, setIsLoading] = useState<boolean>(false) // estado de carregamento

  const[confirmarSenha, setConfirmarSenha] = useState<string>("") // estado para confirmar a senha

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  }) // estado do usuário a ser cadastrado -> campos obrigatórios (tiradas de Usuario.ts)
  
  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario]) // monitora o estado do usuário para redirecionar após cadastro

  function retornar(){
    navigate('/')
  } // função para retornar à tela de login

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){ // ChangeEvent -> evento de mudança em input (quando digita algo no campo). <HTMLInputElement> -> tipo do elemento que disparou o evento 
    setUsuario({
      ...usuario, // conecta com os outros campos do usuário inalterados
      [e.target.name]: e.target.value // atualiza o estado do usuário com o valor do campo que disparou o evento. Target (alvo do evento) -> name (nome do campo) e value (valor digitado)
    })

  } // função para atualizar o estado do usuário conforme o preenchimento do formulário

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  } // função para atualizar o estado de confirmação de senha

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault() // previne o comportamento padrão do formulário (recarregar a página)

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true) // ta carregando?(tá 👍)

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso!')
      }catch(error){
        alert('Erro ao cadastrar o usuário! Verifique as informações fornecidas.')
      } // tenta cadastrar o usuário e trata erros

    }else{
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''})
      setConfirmarSenha('')
    } // valida a senha e confirmação antes de cadastrar

    setIsLoading(false)
  } // função para cadastrar o novo usuário ao submeter o formulário. Valida a senha e confirmação antes de enviar.

  return (
    <>
      <div className="bg-indigo-500 grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div
          className="bg-[url('src/assets/imagensDeFundo-cadastro.png')] lg:block hidden bg-no-repeat 
                    w-full min-h-screen bg-cover bg-center"
        ></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' 
              onSubmit={cadastrarNovoUsuario}>
        
          <h2 className='text-cyan-100 text-5xl'>Cadastrar</h2>
          <div className="text-cyan-100 flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="bg-slate-100 border-2 border-slate-700 rounded p-2"
              value= {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} // e (evento): ChangeEvent -> evento de mudança no input. <HTMLInputElement> -> tipo do elemento que está sendo alterado => Atualiza o estado do usuário ao digitar no input.
            />
          </div>
          <div className="text-cyan-100 flex flex-col w-full">
            <label htmlFor="usuario">Usuario (ex: exemplo@email.com)</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="bg-slate-100 border-2 border-slate-700 rounded p-2"
              value= {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} 
            />
          </div>
          <div className="text-cyan-100 flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="bg-slate-100 border-2 border-slate-700 rounded p-2"
              value= {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="text-cyan-100 flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="bg-slate-100 border-2 border-slate-700 rounded p-2"
              value= {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="text-cyan-100 flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="bg-slate-100 border-2 border-slate-700 rounded p-2"
              value= {confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)} // Atualiza o estado de confirmação de senha ao digitar no input.
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button 
                type='reset'
                className='rounded text-cyan-100 bg-red-400 hover:bg-red-700 w-1/2 py-2'
                onClick={retornar}
             >
                Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-cyan-100 bg-indigo-600 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center' 
                >
                { isLoading ? 
                  <ClipLoader 
                    color="#ffffff" 
                    size={20} 
                  /> : // SE não estiver carregando(falso), mostra o texto, SENÃO(true) mostra o loader -> (um if else simplificado)
                <span>Cadastrar</span>
                }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro