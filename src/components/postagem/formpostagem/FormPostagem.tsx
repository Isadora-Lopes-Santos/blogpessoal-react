import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Postagem from "../../../models/Postagem";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
    const navigate = useNavigate(); // hook de navegação -> "teletransporte de telas"

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [temas, setTemas] = useState<Tema[]>([]) // estado para armazenar a lista de temas

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', }) // estado para armazenar o tema selecionado
    
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem) /* responsável por armazenar os dados da postagem que será cadastrada ou atualizada. 
    Se postagem.id não estiver preenchido → o formulário estará no modo Cadastro (POST).
    Se postagem.id estiver definido → o formulário estará no modo Edição (PUT). */

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>() // obtém o parâmetro "id" da URL, se existir

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", 'info');
            navigate('/');
        }
    }, [token]) // verifica se o token está vazio (usuário não autenticado) e redireciona para a página de login se necessário

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id]) // carrega os temas e, se houver um id na URL, carrega a postagem correspondente para edição

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema]) // atualiza o estado da postagem sempre que o tema selecionado mudar

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    } // atualiza o estado da postagem com os valores do formulário

    function retornar() {
        navigate('/postagens');
    } // navega de volta para a lista de postagens

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) { // função chamada ao enviar o formulário
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                }); // chama a função de atualização (PUT) se estiver editando uma postagem existente

                ToastAlerta("Postagem atualizada com sucesso!", 'sucesso')

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar a Postagem!", 'erro')
                }
            } // trata erros de autenticação e outros erros

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                }) // chama a função de cadastro (POST) se estiver criando uma nova postagem

                ToastAlerta("Postagem cadastrada com sucesso!", 'sucesso');

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao cadastrar a Postagem!", 'erro');
                }
            } // trata erros de autenticação e outros erros
        }

        setIsLoading(false) // desativa o estado de carregamento
        retornar() // navega de volta para a lista de postagens
    }

    const carregandoTema = tema.descricao === ''; // verifica se um tema foi selecionado

    return (
        <div className={`flex flex-col mx-auto items-center ${id !== undefined ? '' : 'bg-indigo-300'}`}>
            <h1 className={`py-3 px-14 text-indigo-100 font-bold text-4xl text-center my-8 ${id !== undefined ? 'bg-transparent text-indigo-950' : 'bg-indigo-500'}`}>
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4 text-cyan-900 font-semibold" 
                onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="bg-slate-100 border-2 border-slate-700 rounded p-2"
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    /> 
                </div>
                <div className="flex flex-col gap-2 text-cyan-900 font-semibold">
                    <label htmlFor="titulo">Texto da Postagem</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="bg-slate-100 border-2 border-slate-700 rounded p-2"
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2 text-cyan-900 font-semibold">
                    <p>Tema da Postagem</p>
                    <select name="tema" id="tema" className='bg-slate-100 border p-2 border-slate-800 rounded' 
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)} /* Lê o valor selecionado no <select> através de "e.currentTarget.value". 
                        Usa esse valor como id para buscar o tema correspondente; 
                        Atualiza o estado, garantindo que o tema escolhido seja refletido corretamente.*/
                    >
                        <option value="" selected disabled>Selecione um Tema</option>
                            
                        {temas.map((tema) => (
                            <>
                                <option value={tema.id} >{tema.descricao}</option> {/*cria uma opção para cada tema na lista*/}
                            </>
                        ))} {/*mapeia a lista de temas para criar opções no select*/}
                    </select>
                </div>
                <button 
                    type='submit' 
                    className='rounded disabled:bg-slate-300 bg-indigo-400 hover:bg-indigo-800
                            text-cyan-100 font-bold w-1/2 mx-auto py-2 flex justify-center'
                            disabled={carregandoTema} // Enquanto for True -> desabilita o botão se nenhum tema estiver selecionado
                >
                    { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormPostagem;