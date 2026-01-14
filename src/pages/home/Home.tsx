
function Home() {
    return (
        <>
            <div className="bg-violet-700 flex justify-center">
                <div className='container grid grid-cols-2 text-cyan-100 py-16'>
                    <div className="flex flex-col gap-6 items-start justify-center">
                        <h2 className='text-5xl font-bold'>
                            Olá! <br/> Bem-vindo ao meu Blog Dev!
                        </h2>
                        <p className='text-xl text-cyan-50'>
                            Compartilhando minha jornada como dev, aprendizados e desafios pelo caminho 💻✨
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className='rounded text-white font-bold
                                            border-cyan-100 border-solid border-2 py-2 px-4'
                                >
                                Nova Postagem
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8 justify-center">
                        <img
                            src="src/assets/personagemhome.png"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home