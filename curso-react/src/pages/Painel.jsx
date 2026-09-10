import { useEffect, useState } from 'react';
import {Link} from 'react-router';

function Painel() {
    const [modal, setModal ] = useState(false) //bollean
    const [users, setUsers] = useState([]) //vetor
    const [user, setUser] = useState({}) //objeto
    const [logged, setLogged ] = useState({})
    
    useEffect(()=>{
        const usersTemp = JSON.parse(localStorage.getItem('users'))
        if(usersTemp) setUsers (usersTemp)
    },[])
    
    function updateUser(pUser){
        setModal(true)
        setUser(pUser)
    }



    function hanleRegister(){
        const newUsers = [...users, user]
        setUsers(newUsers)
        localStorage.setItem('users', JSON.stringify(newUsers))
        setUser({})
        setModal(false)

    }
    return (
 <>
    <h3>Bem vindo,{logged?.nome}</h3>

{ modal && (
    <div
    className="fixed flex top-0 right-0 bottom-0 left-0 items-center justify-center bg-black/50 z-50" >
        <div className="relative max-w-md w-full p-5 bg-primary rounded-lg shadow-md flex flex-col bg-white ">

            <a onClick={() => setModal(false)} className="bg-prices absolute top-0 right-0 px-2 rounded-full cursor-pointer bg-red">X</a>
            <h2 className="text-dark">Cadastre um novo usuario</h2>
            <p>Preencha as informações abaixo</p>

            

            <form className="flex flex-col">

                Nome: <input value={user.nome} onChange={ (e) => setUser({...user, nome: e.target.value }) } type="text" placeholder="Digite seu nome completo" />
                Email: <input value={user.email} onChange={ (e) => setUser({...user, email: e.target.value }) } type="email" placeholder="Digite o seu melhor email" />
                Senha: <input value={user.password} onChange={ (e) => setUser({...user, password: e.target.value }) } type="password" placeholder="Letra maiuscula e números" />
                Data de Nascimento: <input value={user.date} onChange={ (e) => setUser({...user, date: e.target.value }) } type="date"/>
                <a onClick={hanleRegister} className="mr-3 py-2 px-2 hover:bg-dark hover:text-primary rounded ml-auto py-2 shadow 3px bottom-0 cursor-pointer mx-auto bg-dark">Salvar</a>
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

        <tbody className="font-secondary">
            {users.map( u => (
                <tr>
                    <td>{u.nome}</td>
                    <td>{u.email}</td>
                    <td>
                        <a className='cursor-pointer
                        px-2
                        mx-4
                        hover:shadow
                        shadow-md
                        text-white
                        rounded-full
                        bg-green-500'
                    onClick={()=> updateUser(u)}
                        >V</a>
                        <a className='cursor-pointer
                        px-2
                        mx-4
                        hover:shadow
                        shadow-md
                        text-white
                        rounded-full
                        bg-red-500'
                        >X</a>
                    </td>
                </tr>
            ))}
            
        </tbody>
    </table>
     
    <div onClick={() => setModal(true)}  className="rounded-full bg-primary text-white px-4 py-3 fixed bottom-0 right-0 cursor-pointer"> + </div>
    </>
)
}

export default Painel;