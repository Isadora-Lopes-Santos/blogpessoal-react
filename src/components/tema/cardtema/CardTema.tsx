import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps{ // a "interface" define todas as propriedades (Props) que o Componente CardTema espera receber.
    tema: Tema
}

// Componente CardTema: responsável por exibir as informações dos temas que foram persistidos no Banco de Dados por meio do Backend
function CardTema({ tema }: CardTemaProps) { // interface CardTemaProps: Atribuição por Desestruturação

/* "Atribuição por Desestruturação" é uma expressão do JavaScript que permite "desembalar" os valores de um array ou as propriedades de um objeto em variáveis separadas.

Em outras palavras, podemos extrair atributos específicos de um objeto ou valores específicos de um array e atribuí-los diretamente a variáveis. */
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-cyan-100 font-bold text-2xl'>
                Tema
            </header>
            <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p> 
            {/* Como o atributo "descricao" é dinâmico —> cada renderização do Componente CardTema receberá um valor diferente, de acordo com o objeto tema recebido */}
            
            <div className="flex">
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-cyan-100 bg-indigo-400 hover:bg-indigo-800 
                    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`}  
                    className='text-cyan-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link> {/* links para editar e deletar tema -> permite a navegação para os componentes */}
            </div>

        </div>
    )
}

export default CardTema