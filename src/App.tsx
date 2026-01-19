import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import ListaTemas from './components/tema/listatemas/ListaTemas'
import FormTema from './components/tema/formtema/FormTema'
import DeletarTema from './components/tema/deletartema/DeletarTema'

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />

					<div className="min-h-[80vh]">
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/cadastro" element={<Cadastro />} />
							<Route path="/home" element={<Home />} />
							<Route path="/temas" element={<ListaTemas />} />
							<Route path="/cadastrartema" element={<FormTema />} />
							<Route path="/editartema/:id" element={<FormTema />} />
							<Route path="/deletartema/:id" element={<DeletarTema />} />
						</Routes>
					</div>

					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	)
}

/* A rota "/temas" do React Router não possui nenhuma relação direta com a URL do Recurso Tema implementado no Backend da aplicação.

	* "/temas" → Rota interna do React Router.
	* https://blogpessoal.onrender.com/temas → Rota da API REST do backend.
*/

export default App
