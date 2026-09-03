import { useState } from 'react';
import { Link } from 'react-router';


function Painel() {
    const [modal, setModal ] = useState()

    return (
 <>
    <h3>Hi</h3>

{ modal && (
    <div
    className="fixed flex top-0 right-0 bottom-0 left-0 items-center justify-center bg-black/50 z-50" >
        <div className="relative max-w-md w-full p-5 bg-primary rounded-lg shadow-md flex flex-col bg-white ">

            <a onClick={() => setModal(false)} className="bg-prices absolute top-0 right-0 px-2 rounded-full cursor-pointer">X</a>
            <h2 className="text-dark">Cadastre um novo usuario</h2>
            <p>Preencha as informações abaixo</p>

            <form className="flex flex-col">

                Nome: <input type="text" placeholder="Digite seu nome completo" />
                Email: <input type="email" placeholder="Digite o seu melhor email" />
                Senha: <input type="password" placeholder="Letra maiuscula e números" />
                Data de Nascimento: <input  type="date"/>
                <a
                     className="mr-3 py-2 px-2 hover:bg-dark hover:text-white rounded ml-auto py-2 shadow 3px bottom-0 cursor-pointer mx-auto bg-dark">Salvar</a>
            </form>

        </div>
    </div>
)}
    <table>
        <thead>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
        </thead>

        <tbody id="listU" className="font-secondary">
            
        </tbody>
    </table>
     
    <div onClick={() => setModal(true)}  className="rounded-full bg-primary text-white px-4 py-3 fixed bottom-0 right-0 cursor-pointer"> + </div>
    </>
)
}

export default Painel;