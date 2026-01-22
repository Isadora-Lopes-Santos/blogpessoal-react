import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  let data = new Date().getFullYear(); // capturando o ano atual do sistema

  const { usuario } = useContext(AuthContext)

  let component: ReactNode // tipagem para variavel que vai armazenar um componente JSX
    
    if (usuario.token !== "") { // se o usuario estiver logado, exibe o footer
        component = (
            <div className="flex justify-center bg-indigo-900 text-cyan-100">
              <div className="container flex flex-col items-center py-4">
                <p className="text-xl font-bold">
                    Projeto de Blog Pessoal | Copyright: {data}
                </p>
                <p className="text-lg text-cyan-200">
                    Acesse minhas redes sociais
                  <br />
                
                <span className="text-sm opacity-80 text-cyan-200">
                    (Estou à disposição para conectar)
                </span>

                </p>

                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/isadora-l/" target="_blank">
                    <LinkedinLogoIcon size={48} weight="fill" className="hover:text-blue-400 transition-colors" />
                  </a>
                  <a href="https://github.com/Isadora-Lopes-Santos" target="_blank">
                    <GithubLogoIcon size={48} weight="fill" className="hover:text-gray-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
        )
    }

  return (
    <>
        { component } {/* Renderiza o footer apenas se o usuário estiver logado */ }
    </>
  );
}

export default Footer;
