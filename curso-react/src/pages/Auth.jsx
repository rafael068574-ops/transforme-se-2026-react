import { useState } from "react"
import { Link } from "react-router"

function Auth() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    function sub() {
        setCheetos(cheetos - 1)
    }


    return (

        <>
            <div className="h-full flex bg-secondary">
                <div className="w-1/2 mx-auto my-auto p-4 bg-blue-100 rounded-lg shadow-md flex flex-col">
                    <Link to="/" class="mb-5 text-primary">Voltar</Link>

                    <form className="flex flex-col">
                        <span className="text-left">Email: </span>
                        <input
                            type="email"
                            value={email}
                            placeholder="Digite o seu email cadastrado"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {email}
                        <span className="text-left">Senha: </span>
                        <input
                            type="senha"
                            password={senha}
                            placeholder="Digite a sua senha"
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <a id="btLogin" class="mt-5 bg-primary text-white text-center rounded-md py-2">Entrar</a>
                    </form>
                </div>
            </div>

        </>
    )
}
export default Auth;