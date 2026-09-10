import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

function Auth() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMsg] = useState("");

    const nav = useNavigate()

    function hanleLogin() {
        const users = JSON.parse(localStorage.getItem('users'))


        let user = users.find(u => {
            return u.email == email
        })

        if (!user) {
            setMsg("Usuário não encontrado.");
            return;

        }

        if(user.password == senha){
            setMsg("Login realizado com sucesso.");
            localStorage.setItem(
                'logged',
                JSON.stringify(user)
            );

            nav('/painel')

        } else {
            setMsg("Senha incorreta.");
        }
    }


    return (

        <div className="w-full h-full bg-dark">
            {mensagem}
            <div className="fixed flex top-0 right-0 bottom-0 left-0  p-10 items-center justify-center z-50">
                <div className="w-1/3 mx-auto my-auto p-4 bg-blue-100 rounded-lg shadow-lg flex flex-col houver:bg-dark">
                    <Link to="/" className="mt-5 bg-red text-white text-center rounded-md py-2 cursor-pointer">Voltar</Link>

                    <form className="flex flex-col">
                        <span className="text-left py-3">Email: </span>
                        <input
                            type="email"
                            value={email}
                            placeholder="Digite o seu email cadastrado"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {email}
                        <span className="text-left py-3">Senha: </span>
                        <input
                            type="senha"
                            password={senha}
                            placeholder="Digite a sua senha"
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <a onClick={hanleLogin} className="mt-5 bg-green text-white text-center rounded-md py-2 cursor-pointer">Entrar</a>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default Auth;