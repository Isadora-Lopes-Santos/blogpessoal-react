import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners";

function DeletarTema() {

    const navigate = useNavigate() // hook de navegação -> "teletransporte de telas"

    const [tema, setTema] = useState<Tema>({} as Tema) // estado do tema a ser deletado

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>() // obtém o parâmetro "id" da URL

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    } // função para buscar o tema a ser deletado

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [token]) // monitora o token para redirecionar se não estiver logado

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id]) // monitora o id para buscar o tema a ser deletado

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Tema deletado com sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                alert('Erro ao deletar o tema.')
            }
        }

        setIsLoading(false)
        retornar()
    } // função para deletar o tema ao confirmar a ação

    function retornar() {
        navigate("/temas")
    } // função para retornar à lista de temas
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p> 
                {/* exibição da descrição do tema a ser deletado */}
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                                   onClick={deletarTema}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        } {/* SE estiver carregando(true), mostra o loader, SENÃO(falso) mostra o texto -> (um if else simplificado) */}

                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema