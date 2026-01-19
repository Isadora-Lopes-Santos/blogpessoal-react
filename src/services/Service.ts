import axios from "axios";

/*
    * Serviço responsável por fazer requisições à API do Blog Pessoal.
    * Contém funções assíncronas para cadastrar usuários e realizar login.
    * Utiliza a biblioteca axios para facilitar as requisições HTTP.
 */

const api = axios.create({
    baseURL: 'https://blogpessoal-bkkt.onrender.com'
})

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

// Na função deletar, nenhum "dado" é enviado no corpo da requisição, pois o objetivo é apenas deletar um registro pelo id
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}

/* 
Definimos uma arrow function que recebe três argumentos:

    *url: string que representa o endpoint da API que receberá a requisição HTTP GET. Essa URL será concatenada à baseURL definida anteriormente na instância do Axios (Linha 04).
    
    *setDados: função utilizada para atualizar o estado da aplicação com os dados retornados pelo Backend. Pode ser aplicada tanto para um objeto único quanto para um array de objetos.
        
    *header: objeto contendo o Cabeçalho da Requisição HTTP (Header), utilizado para enviar o token de autenticação ao Backend.

(OBS: Todas as funções que adicionarmos na Service, a partir de "buscar", devem receber o parâmetro 'header')
*/