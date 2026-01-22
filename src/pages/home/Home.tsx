import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className="bg-indigo-500 flex justify-center">
                <div className='container grid grid-cols-2 text-cyan-100'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Olá! Bem-vindo ao meu Blog Dev!
                        </h2>
                        <p className='text-xl text-cyan-50'>
                            Compartilhando minha jornada como dev fullstack 💻✨
                        </p>

                        <div className="flex justify-around gap-4">
                            <ModalPostagem />
                        </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-end mt-10 lg:mt-0 px-4">
                        <img
                            src="https://ik.imagekit.io/isa237/PersonagemHome.png"
                            alt="Imagem Página Home"
                            className='max-w-xs sm:max-w-sm lg:max-w-md'
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens />
        </>
    )
}

export default Home