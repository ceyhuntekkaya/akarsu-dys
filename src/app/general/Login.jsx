import FormInput from "./components/FormInput";
import {useInput} from "../../service/useInput";
import {useContext, useEffect} from "react";
import {useAuth} from "../../service/useAuth";
import Logo from "../../assets/logo.png";
import {AppContext} from "../../context/AppContextProvider";

export default function Login() {
    const appContext = useContext(AppContext);
    const {appState, setAppState} = appContext;
    const [inputs, setInputs] = useInput({username: "eg123", password: "123"});
    const [auth, setAuth] = useAuth(false);


    useEffect(() => {
        if (auth) {
            setAppState("COMPLETED");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);


    const eventHandler = (e) => {
        e.preventDefault();
        setAuth("login", {
            username: inputs.username,
            password: inputs.password,
        }).then(r => null);
    };


    return (
        <div className="container mt-5" style={{maxWidth: "500px"}}>
            <div className="row">
                <div className="col-12 col-xl-12">
                    <div className="card card-body border-0 shadow mb-4">
                        <div className="w-100 d-flex justify-content-center">
                            <img
                                src={Logo}
                                alt="atekent_logo"
                                style={{width: "150px"}}
                                className="p-3"
                            />
                        </div>
                        <div className="w-100 d-flex justify-content-center">
                            <h2 className="h5 mb-4">
                               Proje
                            </h2>
                        </div>
                        <form>
                            <div className="alert alert-info">
                               Giriş
                            </div>
                            <FormInput
                                name="username"
                                text="Kullanıcı Adı"
                                placeholder="Kullanıcı Adınızı giriniz."
                                type="text"
                                col="12"
                                value={inputs.username}
                                onChange={setInputs}
                            />
                            <FormInput
                                name="password"
                                text="Şifre"
                                placeholder="Şifrenizi giriniz."
                                type="password"
                                col="12"
                                value={inputs.password}
                                onChange={setInputs}
                            />
                            <div className="row">
                                <button
                                    className="btn btn-success text-light  mx-2"
                                    onClick={(e) => eventHandler(e)}
                                >
                                    Giriş
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
