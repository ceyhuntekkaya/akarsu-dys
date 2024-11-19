import * as React from "react";
import {useApi} from "../../service/useApi";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContextProvider";


const baseValue = {
    id: 0, name: "", description: "", archived: false, authorizationLevel: 0, createdBy: {
        id: 0
    }, creationDate: "",
}
export default function Projects() {
    const [projectList, setProjectList] = useApi(null);

    const userContext = useContext(UserContext);
    const {userInformation, auth} = userContext;

    const [selectedProject, setSelectedProject] = useState(null);
    const [tableHeight, setTableHeight] = useState('400px');
    const [data, setData] = useState({...baseValue})

    useEffect(() => {
        const calculateHeight = () => {
            const windowHeight = window.innerHeight;
            const availableHeight = windowHeight - 650;
            setTableHeight(`${availableHeight}px`);
        };
        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        return () => window.removeEventListener('resize', calculateHeight);
    }, []);


    useEffect(() => {
        if (projectList === null) {
            setProjectList("findAllProject", userInformation?.authority).then(r => null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const makeArchive = (value) => {
        if (value === false) {
            return "Arşivde"
        }
        return ""

    }
    const makeAuthorize = (value) => {
        if (value === 0) {
            return "Personel"
        }
        if (value === 1) {
            return "Proje Personeli"
        }
        if (value === 2) {
            return "Proje Koordinatörü"
        }
        return "Yönetim"
    }
    const DataTable = () => {
        return (<div className="col-12 p-1">
                <div className="card shadow p-0">
                    <h5 className="card-header">Projeler</h5>
                    <div className="card-body" style={{
                        height: tableHeight, overflowY: 'auto'
                    }}>
                        <table className="table table-striped mb-0">
                            <thead>
                            <tr>
                                <th scope="col">Proje Adı</th>
                                <th scope="col">Açıklama</th>
                                <th scope="col">Oluşturulma</th>
                                <th scope="col">Durum</th>
                                <th scope="col">Yeti Düzeyi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projectList && Array.isArray(projectList) ?

                                projectList?.map((doc, key) => {
                                    return (<tr key={key}
                                                style={{backgroundColor: selectedProject && selectedProject.id ? selectedProject?.id === doc.id ? "#999" : "" : ""}}
                                                onClick={(e) => setSelectedProject(doc)}>
                                            <th scope="row">{doc.name}</th>
                                            <td>{doc.description}</td>

                                            <td>{new Date(doc.creationDate).toLocaleDateString("tr")}</td>
                                            <td>{makeArchive(doc.archived)}</td>
                                            <td>{makeAuthorize(doc.authorizationLevel)}</td>
                                        </tr>)
                                }) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>)
    }


    const onValueChangeEvent = (prop, value) => {
        setData({...data, [prop]: value})
    }


    const onObjectValueChangeEvent = (prop1, prop2, value) => {
        setData({...data, [prop1]: {[prop2]: value}})
    }


    const projectAddPanel = () => {
        return (<div className="my-2">
                <div className={"row"}>
                    <div className="col form-group">
                        <label htmlFor="exampleInputPassword1" className="mt-2">PROJE ADI</label>
                        <input className="form-control" type="text"
                               onChange={(e) => onValueChangeEvent("number", e.target.value)}
                               value={data.number}/>
                    </div>
                    <div className="col-auto form-group">
                        <label htmlFor="exampleInputPassword1" className="mt-2">YETKİ DÜZEYİ</label>
                        <select className="form-control"
                                value={data.authorizationLevel}
                                onChange={(e) => onValueChangeEvent("authorizationLevel", e.target.value)}>
                            <option selected value=""></option>
                            <option value="0">Personel</option>
                            <option value="1">Proje Personeli</option>
                            <option value="2">Proje Koordinatörü</option>
                            <option value="3">Yönetim</option>
                        </select>
                    </div>
                    <div className="col form-group">
                        <label htmlFor="exampleInputPassword1" className="mt-2">AÇIKLAMA</label>
                        <input className="form-control" type="text"
                               onChange={(e) => onValueChangeEvent("subject", e.target.value)}
                               value={data.subject}/>
                    </div>
                </div>
                <div className={"row my-3"}>
                    <div className="col">
                        <button className={`btn btn-success m-2`}>PROJEYİ KAYDET</button>
                    </div>
                    <div className="col-auto">

                    </div>
                    <div className="col-auto">
                        <button className={`btn btn-info m-2`}>FORMU TEMİZLE</button>
                    </div>
                </div>
            </div>)
    }
    return (<>

        {
            auth && auth.project ?
                <div className="row m-2">
                    <div className="card border-0 shadow rounded p-3">
                        {projectAddPanel()}
                    </div>
                </div>
                : null
        }


        <div className="row w-100 py-2">
            <DataTable/>
        </div>

        {selectedProject && auth && auth.project ? <div className="row w-100 py-2 px-3">
                <div className="row">
                    <button
                        className={`col-auto btn btn-success m-2`}>Proje Bilgilerini Güncelle
                    </button>
                    <button
                        className={`col-auto btn btn-info m-2`}>Projeyi Arşivle
                    </button>
                    <div className="col"></div>
                    <button
                        className={`col-auto btn btn-danger m-2`}>Projeyi Sil
                    </button>
                </div>

            </div> : null}

        </>)
}