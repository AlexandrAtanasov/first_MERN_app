import React, { useState, useEffect } from 'react';

import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

function AuthPage() {
    const message = useMessage();

    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect( () => {
        // console.log('Error - ', error);
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            // console.log('data - ', data);
        } catch (e) {

        };
    };

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Сократи ссылку</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                        
                        <div className="input-field">
                            <input 
                                placeholder="Введите email" 
                                id="email" 
                                type="text"  
                                name="email"
                                onChange={changeHandler}  
                                />
                            <label htmlFor="email">Email</label>
                        </div>
                        
                        <div className="input-field">
                            <input 
                                placeholder="Введите пароль" 
                                id="password" 
                                type="password"    
                                name="password"  
                                onChange={changeHandler}  
                                />
                            <label htmlFor="password">Пароль</label>
                        </div>

                        </div>
                    </div>
                    <div className="card-action center-align">
                        <button 
                            className='btn yellow darken-4' 
                            style={{marginRight: 10}}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button 
                            className='btn grey lightn-1 black-text'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthPage;