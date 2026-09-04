import { useState } from 'react';
import { Link } from 'react-router';


function Painel() {
    const [modal, setModal ] = useState(false) //bollean
    const [users, setUsers] = useState([]) //vetor
    const [user, setUser] = useState({}) //objeto
    


function handleRegister(){
    const newUsers = [...users, user]
    setUsers(newUsers)
    localStorage.setItem('users', JSON.stringify(newUsers))
    setUser({})
    setModal(false)

}
    return (
 <>
    <h3>Hi</h3>

{ modal && (
    <div
    className="fixed flex top-0 right-0 bottom-0 left-0 items-center justify-center bg-black/50 z-50" >
        <div className="relative max-w-md w-full p-5 bg-primary rounded-lg shadow-md flex flex-col bg-white ">

            <a onClick={() => setModal(false)} className="bg-prices absolute top-0 right-0 px-2 rounded-full cursor-pointer bg-red">X</a>
            <h2 className="text-dark">Cadastre um novo usuario</h2>
            <p>Preencha as informações abaixo</p>

            

            <form className="flex flex-col">

                Nome: <input onChange={ (e) => setUser({...user, nome: e.target.value }) } type="text" placeholder="Digite seu nome completo" />
                Email: <input onChange={ (e) => setUser({...user, email: e.target.value }) } type="email" placeholder="Digite o seu melhor email" />
                Senha: <input onChange={ (e) => setUser({...user, password: e.target.value }) } type="password" placeholder="Letra maiuscula e números" />
                Data de Nascimento: <input onChange={ (e) => setUser({...user, date: e.target.value }) } type="date"/>
                <a onClick={handleRegister} className="mr-3 py-2 px-2 hover:bg-dark hover:text-primary rounded ml-auto py-2 shadow 3px bottom-0 cursor-pointer mx-auto bg-dark">Salvar</a>
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