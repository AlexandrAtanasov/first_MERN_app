import React, { useState } from 'react';

function AuthPage() {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
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
                        <button className='btn yellow darken-4' style={{marginRight: 10}}>
                            Войти
                        </button>
                        <button className='btn grey lightn-1 black-text'>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthPage;