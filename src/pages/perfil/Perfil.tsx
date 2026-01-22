import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"

function Perfil() {
	const navigate = useNavigate()

	const { usuario } = useContext(AuthContext)

	useEffect(() => {
		if (usuario.token === "") {
			alert("Você precisa estar logado")
			navigate("/")
		}
	}, [usuario.token])

	return (
		<div className="flex justify-center mx-4"> {/* Container principal */}
			<div className="container mx-auto my-4 rounded-2xl overflow-hidden"> {/* Capa do perfil */}
				<img
					className="w-full h-72 object-cover border-b-8 border-white"
					src="https://ik.imagekit.io/isa237/imagensDeFundo.png?tr=f-png"
					alt="Capa do Perfil"
				/>

				<img
					className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
					src={usuario.foto}
					alt={`Foto de perfil de ${usuario.nome}`} // Texto alternativo dinâmico
				/>

				<div
					className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-indigo-600 font-semibold text-cyan-100 text-2xl items-center justify-center"
				> {/* Seção de informações do usuário */}
					<p>Nome: {usuario.nome} </p>
					<p>Email: {usuario.usuario}</p>
				</div>
			</div>
		</div>
	)
}

export default Perfil
