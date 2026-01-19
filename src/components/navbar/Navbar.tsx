import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate(); // hook de navegação -> "teletransporte de telas"

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }

    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>
            
                <div className="container flex justify-between items-center text-lg mx-8">
                    {/* Logo + nome do blog */}
                    <div className="flex items-center gap-3 text-cyan-100 font-bold text-xl">
                        <img
                            src="src/assets/logoblog.png"
                            alt="Logo do Blog"
                            className="w-20 h-20"
                        />
                        <Link to="/home" className="text-2xl font-bold">Isadora Lopes - Blog Dev</Link>
                    </div>

                    <div className='flex gap-8 items-center text-cyan-200'>
                        Postagens {/* principal */}
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                        Perfil {/* principal */}
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar