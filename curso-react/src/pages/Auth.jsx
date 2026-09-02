import { useState } from "react"
import {Link} from "react-router"

function Auth(){
    const [ cheetos, setCheetos] = useState(2);


    function sub(){
        setCheetos(cheetos - 1)
    }


return(

<>
    <div className="h-full flex items-center">
        <div className="w-1/2 mx-auto my-auto p-4 bg-blue-100 rounded-lg shadow-md flex flex-col">
            <Link to="/" class="mb-5 text-primary">Voltar</Link>

            <div className="bg-red-100 rounded-full p-2" onClick={sub}>-</div>
            {cheetos}
            <div className="bg-green-100 rounded-full p-2" onClick={() => setCheetos(cheetos +1) }>+</div>

            <form class="flex flex-col">
                    Email: <input id="iEmailLogin" type="email" placeholder="Digite seu email cadastrado" />

                    Senha: <input id="iPassLogin" type="password" placeholder="Digite sua senha cadastrada" />

                    <a id="btLogin" class="mt-5 bg-primary text-white text-center rounded-md py-2">Entrar</a>
            </form>
        </div>
    </div>

</>
)
}
export default Auth;