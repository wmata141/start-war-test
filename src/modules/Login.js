import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cryptoJs from 'crypto-js'
import Form from '../utilities/Forms'
import Paisaje from '../assets/video/paisaje.mp4'
import Logo4 from '../assets/img/logo4.png'
import AlertComponent from '../components/Alert'
import { LOGIN_USER } from '../reducers/authReducer'
// import { URL, API_KEY } from '../config'

const Login = () => {
    const [name, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [userList, setUserList] = useState([]);
    const [loginTry, setLoginTry] = useState(1);

    const URL = 'https://swapi.dev/api/'
    const API_KEY = 'Star*Wars*SWAPI*-Test/2022-03-20'

    const dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            const data = await fetch(`${URL}people`)
            const { results } = await data.json()
            console.log("results ==>", results);

            const encryptResult = results.map(e => {
                let user = e
                user.hair_color = cifrar(e.hair_color)
                return user
            })

            setUserList(encryptResult)
        }

        getData()

        if (loginTry > 3) {
            AlertComponent("Error", `Usted a Sobrepasado los Intentos Permitidos`, "info", 2000)
            setTimeout(() => {
                setLoginTry(1)
            }, 5000);
        }
    }, [loginTry])



    const cifrar = (texto) => {
        const textoCifrado = cryptoJs.AES.encrypt(texto, API_KEY).toString()
        return textoCifrado
    }

    const decifrar = (texto) => {
        const bytes = cryptoJs.AES.decrypt(texto, API_KEY)
        const textoDescifrado = bytes.toString(cryptoJs.enc.Utf8)
        return textoDescifrado
    }

    const validateLogin = () => {
        let isValid = true;

        let validator = Form.validator({
            name: {
                value: name,
                isRequired: true,
            },
            password: {
                value: password,
                isRequired: true,
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validate = validateLogin();

        if (validate) {
            const found = userList.find(e => e.name === name && decifrar(e.hair_color) === password);

            if (found) {
                setValidate({});
                setEmail('');
                setPassword('');
                dispatch({ type: LOGIN_USER, payload: found })
                localStorage.setItem('user', JSON.stringify(found))
                navigate("/user-list");
                AlertComponent("Success", `Bienvenido ${found.name}`, "info", 2000)
            } else {
                AlertComponent("Error", `Usuario y/o contraseña incorrectos - Intento numero ${loginTry}`, "warning", 2000)
            }
        } else {
            AlertComponent("Error", `Usuario y/o contraseña incorrectos - Intento numero ${loginTry}`, "warning", 2000)
        }

        let count = loginTry + 1
        setLoginTry(count)
    }

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }

    return (
        <div className="row g-0 auth-wrapper">
            <video autoPlay loop muted
                style={{
                    position: "absolute",
                    width: "100%",
                    left: "50%",
                    top: "50%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <source src={Paisaje} type="video/mp4" />
            </video>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        {
                            loginTry > 3 ? (
                                <div className="sp sp-3balls"></div>
                            ) : (
                                <>
                                    <img src={Logo4} style={{ maxWidth: '7rem' }} alt={'Logo'} />
                                    <p className="login-to-account">Login to your account</p>
                                    <div className="auth-form-container text-start">
                                        <form className="auth-form" method="POST" onSubmit={handleSubmit} autoComplete={'off'}>
                                            <div className="name mb-3">
                                                <input type="text"
                                                    className={`form-control ${validate.validate && validate.validate.name ? 'is-invalid ' : ''}`}
                                                    id="name"
                                                    name="name"
                                                    value={name}
                                                    placeholder="Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />

                                                <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.name) ? 'd-block' : 'd-none'}`} >
                                                    {(validate.validate && validate.validate.name) ? validate.validate.name[0] : ''}
                                                </div>
                                            </div>

                                            <div className="password mb-3">
                                                <div className="input-group">
                                                    <input type={showPassword ? 'text' : 'password'}
                                                        className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                                                        name="password"
                                                        id="password"
                                                        value={password}
                                                        placeholder="Password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />

                                                    <button type="button" className="btn btn-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>

                                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                                                        {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">LOG IN</button>
                                            </div>
                                        </form>

                                        <hr />
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;