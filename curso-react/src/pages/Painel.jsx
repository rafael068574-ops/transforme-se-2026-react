import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

function Painel() {
    const [modal, setModal ] = useState(false) //bollean
    const [users, setUsers] = useState([]) //vetor
    const [user, setUser] = useState({}) //objeto
    const [logged, setLogged ] = useState({})
    const [isEdit, setIsEdit] = useState (false)
    const [index, setIndex] = useState(-1)

    const [spiner, setRoda] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(()=>{
        const usersTemp = JSON.parse(localStorage.getItem('users'))
        if(usersTemp) setUsers (usersTemp)
    },[])

    useEffect(()=>{
        loadUser()
    },[]);

    //READ - LER
    async function loadUser(){
        const {data, error} = await supabase.from('profiles').select('*')
        if(error){
            setMsg(error.message)
            return;
        }
        if(data)
            setUsers(data)
        else
            setUsers([])
    }
    
    async function editUser (){
        
        const { error: profilerror } = await supabase
            .from('profiles')
            .update(user)
            .eq('id', index)
            .select()

    
        if(error){
            setMsg(error.message)
            setSpiner(false)
            return;
        }
    
        setMsg("Usuario editado")
        setSpiner(false)
        loadUser()
          
    }


    async function deleteUser(index){
        
    const { error } = await supabase
        .from('profiles')
        .delete(user)
        .eq('some_column', 'someValue')

        if(error){
            setMsg(error.message)
            setSpiner(false)
            return;
        }
    
        setMsg("Usuario editado")
        setSpiner(false)
        loadUser()
          
          
    

}



    function updateUser(user){
        setModal(true)
        setUser(user)
        setIndex(user.id)
    }

    async function hanleRegister(){
        setRoda(true)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password
        });

        if(authError){
            //console.log(authError)
            setMsg(authError.message)
            setRoda(false)
            return;
        }

        if(!authData){
            setMsg("Não foi possível cadastrar, verifique a internet")
            setRoda(false)
            return;
        }

        const {data: LoginData, error: loginError} = await supabase.auth.signInWithPassword({
                email: user.email,
                password: user.password
        });

        if(loginError){
            setMsg(loginError.message)
            setRoda(false)
            return;
        }
        
        const { error:profileError } = await supabase.from('profiles').insert({
            user_id: LoginData.user.id,
            name: user.name,
            birth_date: user.date || user.nascimento,
            cpf: user.cpf
        })

        if(profileError){
            setMsg(profileError.message)
            setRoda(false)
            return;
        }

        setModal(false);
        setMsg("Usuario cadastrado com sucesso")
    }
    return (
 <>
    <h3>Bem vindo,{logged?.name}</h3>

{ modal && (
    <div
    className="fixed flex top-0 right-0 bottom-0 left-0 items-center justify-center bg-black/50 z-50" >
        <div className="relative max-w-md w-full p-5 bg-primary rounded-lg shadow-md flex flex-col bg-white ">

            <a onClick={() => {setModal(false); setIsEdit(false)}} className="bg-prices absolute top-0 right-0 px-2 rounded-full cursor-pointer bg-red">X</a>
            <h2 className="text-dark">Cadastre um novo usuario</h2>
            <p>Preencha as informações abaixo</p>

            
            { isEdit ? (
            <form className="flex flex-col">

                name: <input className="text-white" value={user.name} onChange={ (e) => setUser({...user, name: e.target.value }) } type="text" placeholder="Digite seu name completo" />
                {index == -1 && (
                    <>
                Email: <input className="text-white" value={user.email} onChange={ (e) => setUser({...user, email: e.target.value }) } type="email" placeholder="Digite o seu melhor email" />
                Senha: <input className="text-white" value={user.password} onChange={ (e) => setUser({...user, password: e.target.value }) } type="password" placeholder="Letra maiuscula e números" />
                </>
                )}
                Data de Nascimento: <input class="text-white" value={user.date} onChange={ (e) => setUser({...user, date: e.target.value }) } type="date"/>
                Cpf: <input value={user.cpf} onChange={ (e) => setUser({...user,cpf: e.target.value}) } type="cpf" placeholder="Digite seu cpf" />
                <br/>
                {index != -1 && (<a onClick={()=> setIsEdit(false)} className="w-full hover:bg-dark hover:text-primary text-black rounded ml-auto py-2 shadow 3px bottom-0 cursor-pointer mx-auto bg-red-500">Cancelar</a>)}
                <br />
                <a onClick={
                    () => {
                        if(index == -1)
                            hanleRegister()
                        else
                            editUser()
                    }
                } 
                className="w-full bg-blue-500 hover:bg-dark text-black hover:text-primary rounded ml-auto py-2 shadow 3px bottom-0 cursor-pointer mx-auto bg-dark">{spiner? '...':'Salvar'}</a>
                {msg}
            </form>): //else 
            (
                <>
                    <p>name: {user.name}</p>
                    <p>Cpf: {user.cpf}</p>
                    <br />
                    <a onClick={()=> setIsEdit(true)} className="w-full hover:bg-dark hover:text-primary text-black rounded ml-auto py-2 shadow 3px bottom-0 cursor-pointer mx-auto bg-dark bg-yellow">Editar</a>
                </>
            )
            }
        </div>
    </div>
)}
    <table>
        <thead>
            <th>name</th>
            <th>Email</th>
            <th>Ações</th>
        </thead>

        <tbody className="font-secondary">
            {users.map( (u) => (
                <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.cpf}</td>
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
                        onClick={()=> deleteUser(u)}
                        >X</a>
                    </td>
                </tr>
            ))}
            
        </tbody>
    </table>
     
    <div onClick={() => {setModal(true); setIsEdit(true); setUser({}); setIndex(-1)}}  className="rounded-full bg-primary text-white px-4 py-3 fixed bottom-0 right-0 cursor-pointer"> + </div>
    </>
)
}

export default Painel;