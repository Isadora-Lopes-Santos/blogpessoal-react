import {
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center bg-indigo-900 text-cyan-100">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Projeto de Blog Pessoal | Copyright: {data}
          </p>
          <p className="text-lg text-center text-cyan-200">
            Acesse minhas redes sociais
            <br />
            <span className="text-sm opacity-80 text-cyan-200">
              (Estou à disposição para conectar)
            </span>
          </p>

          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinLogoIcon
                size={48}
                weight="fill"
                className="hover:text-blue-400 transition-colors"
              />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon
                size={48}
                weight="fill"
                className="hover:text-gray-400 transition-colors"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
