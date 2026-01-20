import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {

    const navigate = useNavigate(); // hook de navegação -> "teletransporte de telas"

    const [tema, setTema] = useState<Tema>({} as Tema) // estado do tema a ser cadastrado ou editado

    const [isLoading, setIsLoading] = useState<boolean>(false) // estado de carregamento

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token // obtém o token de autenticação do contexto de autenticação

    const { id } = useParams<{ id: string }>(); // obtém o parâmetro "id" da URL, se existir

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        } // função para buscar o tema a ser editado, se o id estiver presente
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token]) // monitora o token para redirecionar se não estiver logado

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id]) // monitora o id para buscar o tema a ser editado

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    } // função para atualizar o estado do tema conforme o preenchimento do formulário

    function retornar() {
        navigate("/temas")
    } // função para retornar à página de temas

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('O Tema foi atualizado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o tema.')
                }
            } // função para atualizar o tema existente e Trata erros de autenticação
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('O Tema foi cadastrado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o tema.')
                }
            } // função para cadastrar um novo tema e Trata erros de autenticação
        }

        setIsLoading(false)
        retornar()
    } // função para cadastrar ou atualizar o tema ao submeter o formulário

    return (
        <div className="bg-indigo-300 min-h-[80vh]">
            <div className="container flex flex-col items-center justify-center mx-auto">
                <h1 className="text-4xl text-center my-8 font-bold text-indigo-950">
                    {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
                </h1>

                <form className="w-1/2 flex flex-col gap-4" 
                    onSubmit={gerarNovoTema} >
                    <div className="text-indigo-900 font-semibold flex flex-col gap-2">
                        <label htmlFor="descricao">Descrição do Tema</label>
                        <input
                            type="text"
                            placeholder="Descreva aqui seu tema"
                            name='descricao'
                            className="bg-slate-100 border-2 border-slate-700 rounded p-2"
                            value={tema.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} // e (evento): ChangeEvent -> evento de mudança no input. <HTMLInputElement> -> tipo do elemento que está sendo alterado => Atualiza o estado do tema ao digitar no input.
                        />
                    </div>
                    <button
                        className="rounded text-slate-100 bg-indigo-400 
                                hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                        type="submit">

                        { isLoading ? 
                                <ClipLoader 
                                    color="#ffffff" 
                                    size={24}
                                /> : 
                            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                        } {/* SE estiver carregando(true), mostra o loader, SENÃO(falso) mostra o texto -> (um if else simplificado) */}

                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormTema;