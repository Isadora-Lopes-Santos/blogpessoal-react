import { createContext, type ReactNode, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"

/*
    * Contexto responsável por gerenciar a autenticação do usuário.
    * Fornece funções para login e logout, além do estado de carregamento.
    * Utiliza o React Context API para compartilhar dados de autenticação entre componentes.
    * Inclui o AuthProvider que envolve a aplicação para fornecer o contexto de autenticação.
    * Define os tipos para o contexto e as propriedades do provedor.
*/ 

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
} // define as propriedades e métodos disponíveis no contexto de autenticação

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    }) // Usado para armazenar os dados do usuário logado (autenticado)

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            alert("O Usuário foi autenticado com sucesso!")
        } catch (error) {
            alert("Os Dados do usuário estão inconsistentes!")
        }
        setIsLoading(false)
    } // função para realizar o login do usuário

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    } // função para realizar o logout do usuário

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    ) // Provedor do contexto de autenticação que envolve os componentes filhos
}