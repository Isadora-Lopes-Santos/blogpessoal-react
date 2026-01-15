import { Link } from "react-router-dom"

function Navbar() {
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
                        Temas
                        Cadastrar tema
                        Perfil {/* principal */}
                        Sair
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar