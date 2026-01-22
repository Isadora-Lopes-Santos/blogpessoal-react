import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate(); // hook de navegação -> "teletransporte de telas"

    const { usuario, handleLogout } = useContext(AuthContext) // useContext -> "estante" onde está armazenando dados e "()" é o dado especifico que quer pegar

    function logout() {

        handleLogout()
        ToastAlerta("O Usuário foi desconectado com sucesso!", 'info')
        navigate('/')
    }
    
    let component: ReactNode

    if (usuario.token !== "") {

        component = (
                <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'> {/* barra de navegação superior */}
            
                <div className="container flex justify-between items-center text-lg mx-8">
                    {/* Logo + nome do blog */}
                    <div className="flex items-center gap-1 text-cyan-100 font-bold text-xl">
                        <img
                            src="https://ik.imagekit.io/isa237/logoblog.png"
                            alt="Logo do Blog"
                            className="w-20 h-20"
                        />
                        <Link to="/home" className="text-2xl font-bold">Isadora Lopes - Blog Dev</Link>
                    </div>

                    <div className='flex gap-4 text-cyan-200'>
                        <Link to='/postagens' className='font-semibold hover:underline'>Postagens</Link>
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                        <Link to='/perfil' className='font-semibold hover:underline'>Perfil</Link>
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { component } {/* Renderiza a Navbar apenas se o usuário estiver logado */ }
        </>
    )
}

export default Navbar