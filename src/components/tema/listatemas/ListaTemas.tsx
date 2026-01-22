import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {

    const navigate = useNavigate(); // hook de navegação -> "teletransporte de telas"  

    const [isLoading, setIsLoading] = useState<boolean>(false) // estado de carregamento

    const [temas, setTemas] = useState<Tema[]>([]) // estado para armazenar a lista de temas (começa como array vazio)

    const { usuario, handleLogout } = useContext(AuthContext) // useContext -> "estante" onde está armazenando dados e "()" é o dado especifico que quer pegar
    const token = usuario.token // obtém o token de autenticação do contexto de autenticação

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate('/')
        }
    }, [token]) // monitora o token para redirecionar se não estiver logado

    useEffect(() => {
        buscarTemas()    
    }, [temas.length]) // monitora o comprimento da lista de temas para buscar temas atualizados

    async function buscarTemas() {
        try {

            setIsLoading(true)

            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            }) // função genérica para buscar dados do backend e atualizar o estado
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } // se o erro for 401 (não autorizado), faz logout
        }finally {
            setIsLoading(false)
        } // reinicia o estado de carregamento como falso após a tentativa de busca
    }
    // função para buscar a lista de temas do backend

    return (
        <div className="flex flex-col">

            {isLoading && (
                <div className="flex justify-center w-full py-8">
                    <SyncLoader
                        color="#312e81"
                        size={32}
                    />
                </div>
            )}  {/* exibe o loader de carregamento enquanto isLoading for true */}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {(!isLoading && temas.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhum Tema foi encontrado!
                            </span>
                    )} {/* exibe mensagem se não houver temas e não estiver carregando */}

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                            {
                                temas.map((tema) => (
                                    <CardTema key={tema.id} tema={tema}/>
                                ))
                            } {/* mapeia a lista de temas e renderiza um CardTema para cada um */}
                    </div>
                </div>
            </div>
        </div>
    ) // renderiza a lista de temas ou mensagens de carregamento/nenhum tema encontrado
}
export default ListaTemas;