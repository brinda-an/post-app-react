import React, {useRef, useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {LoginContext} from '../loginContext';
const Register = () => {

    const history=useHistory();
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const [loginState] = useContext(LoginContext);

    const [success, setSuccess] = useState(false);

    const registerHandler = () => {
        let data = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value
        }

        fetch('https://5fa3a8baf10026001618db30.mockapi.io/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(data=>data.json())
        .then(data=>{
            console.log(data);
            setSuccess(true);
        })
        .catch(error=>{console.log(error);});
    }

    useEffect(()=>{
        if(loginState.authenticated){
            history.push('/posts');
        }
    },[history,loginState]);

    return (
        
        <div>
            <input type="text" placeholder="name" ref={name}/><br/>
            <input type="email" placeholder="email" ref={email}/><br/>
            <input type="password" placeholder="password" ref={password}/><br/>
            <button onClick={registerHandler}>Register</button>
            {success && <p>Registered successfully, kindly <Link to='/login'>login.</Link></p>}
        </div>
    )
}

export default Register
