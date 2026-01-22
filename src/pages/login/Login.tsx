import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>( // useState -> Responsável por interagir com a tela (ele q faz com q tudo q mudamos na tela seja visto)
        {} as UsuarioLogin
    ) // estado para armazenar os dados de login do usuário (começa como um objeto vazio)

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario]) // monitora o estado do usuário para redirecionar se já estiver logado

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        }) // função para atualizar o estado de login conforme o preenchimento do formulário
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    } // função para realizar o login ao submeter o formulário

    return (
        <>
            <div className="bg-indigo-500 grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" 
                    onSubmit={login} >
                    <h2 className="text-cyan-100 text-5xl">Entrar</h2>

                    <div className="text-cyan-100 flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="bg-slate-100 border-2 border-slate-700 rounded p-2 text-cyan-900"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} // Atualiza o estado de login conforme o preenchimento do formulário
                        />
                    </div>
                    <div className="text-cyan-100 flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="bg-slate-100 border-2 border-slate-700 rounded p-2 text-cyan-900"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button 
                        type='submit' 
                        className="rounded bg-indigo-600 flex justify-center
                                   hover:bg-indigo-900 text-cyan-100 w-1/2 py-2">
                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24} 
                            /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-indigo-300 w-full" />

                   <p className="text-cyan-100">
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-950 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                 <div className="bg-[url('src/assets/imagensDeFundo-login.png')] lg:block hidden bg-no-repeat
                            w-full min-h-screen bg-cover bg-center"
                ></div>
            </div>
        </>
    );
}

export default Login;