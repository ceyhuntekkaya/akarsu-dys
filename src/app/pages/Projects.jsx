import * as React from "react";
import {useApi} from "../../service/useApi";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContextProvider";
import {NotificationManager} from "react-notifications";

const baseValue = {
    id: 0, name: "", description: "", archived: true, authorizationLevel: 0, createdBy: {
        id: 0
    }, creationDate: "",
}
export default function Projects() {
    const [_projectList, _setProjectList] = useApi(null);
    const [projectList, setProjectList] = useState(null);


    const userContext = useContext(UserContext);
    const {userInformation, auth} = userContext;

    const [selectedProject, setSelectedProject] = useState(null);
    const [tableHeight, setTableHeight] = useState('830px');
    const [data, setData] = useState({...baseValue})


    useEffect(() => {
        if (_projectList) {
            setProjectList(_projectList)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_projectList]);


    useEffect(() => {
        const calculateHeight = () => {
            const windowHeight = window.innerHeight;
            const availableHeight = windowHeight - 410;
            setTableHeight(`${availableHeight}px`);
        };
        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        return () => window.removeEventListener('resize', calculateHeight);
    }, []);


    useEffect(() => {
        if (selectedProject) {
            setData(selectedProject)
        }
    }, [selectedProject]);


    useEffect(() => {
        if (projectList === null) {

            _setProjectList("findAllProject", userInformation?.authority).then(r => null)
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

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });


    const getSortDirection = (columnName) => {
        if (sortConfig.key === columnName) {
            return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
        }
        return '';
    };

    const sortData = (key) => {
        let direction = 'ascending';

        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedData = [...projectList].sort((a, b) => {
            if (!a[key]) return 1;
            if (!b[key]) return -1;

            if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                if (direction === 'ascending') {
                    return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
                }
                return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
            }
            if (direction === 'ascending') {
                return a[key] - b[key];
            }
            return b[key] - a[key];
        });
        setSortConfig({key, direction});
        setProjectList(sortedData);
    };


    const DataTable = () => {
        return (<div className="col-12 p-1">
            <div className="card shadow p-0">
                <div className="card-body" style={{
                    height: tableHeight, overflowY: 'auto'
                }}>
                    <table className="table table-striped mb-0">
                        <thead>
                        <tr>
                            <th scope="col" onClick={() => sortData('name')}>Proje Adı {getSortDirection('name')}</th>
                            <th scope="col"
                                onClick={() => sortData('description')}>Açıklama {getSortDirection('description')}</th>
                            <th scope="col"
                                onClick={() => sortData('creationDate')}>Oluşturulma {getSortDirection('creationDate')}</th>
                            <th scope="col"
                                onClick={() => sortData('archived')}>Durum {getSortDirection('archived')}</th>
                            <th scope="col" onClick={() => sortData('authorizationLevel')}>Yeti
                                Düzeyi {getSortDirection('authorizationLevel')}</th>
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

    const validate = () => {
        let valid = true;
        if (data.name.length === 0) {
            NotificationManager.error("Proje Adı Giriniz", "Hata", 3000);
            valid = false;
        }
        if (data.authorizationLevel === -1) {
            NotificationManager.error("Yetki Düzeyi Seçiniz", "Hata", 3000);
            valid = false;
        }
        return valid;
    }


    const saveProject = () => {
        if (validate()) {
            data.authorizationLevel = Number(data.authorizationLevel);
            if (data.createdBy) {
                data.createdBy.id = userInformation?.id;
            }
            _setProjectList("projectAdd", {project: data, type: userInformation?.authority}).then(r =>
                NotificationManager.success("Proje Kaydedildi", "Başarılı", 3000));
            clearFormData()
        }
    }

    const clearFormData = () => {
        setData(baseValue)
        setSelectedProject(null)
    }


    const deleteProject = () => {

        _setProjectList("deleteProject", {id: selectedProject.id, type: userInformation?.authority}).then(r =>
            NotificationManager.success("Proje Silindi", "Başarılı", 3000));
    }

    const archiveProject = () => {
        data.archived = !data.archived;
        _setProjectList("updateProject", {
            id: selectedProject.id,
            type: userInformation?.authority,
            project: data
        }).then(r =>
            NotificationManager.success("Proje Güncellendi", "Başarılı", 3000));
    }


    const projectAddPanel = () => {
        return (<div className="my-2">
            <div className={"row"}>
                <div className="col form-group">
                    <label htmlFor="exampleInputPassword1" className="mt-2">PROJE ADI</label>
                    <input className="form-control" type="text"
                           onChange={(e) => onValueChangeEvent("name", e.target.value)}
                           value={data.name}/>
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
                           onChange={(e) => onValueChangeEvent("description", e.target.value)}
                           value={data.description}/>
                </div>
            </div>
            <div className={"row my-3"}>
                <div className="col">
                    <button className={`btn btn-success m-2`} onClick={saveProject}>PROJEYİ KAYDET</button>
                </div>
                <div className="col-auto">

                </div>

                {selectedProject && auth && auth.project ?
                    <React.Fragment>
                        <div className="col">

                            <button onClick={archiveProject}
                                    className={`col-auto btn btn-info m-2`}>Projeyi Arşivle
                            </button>
                        </div>


                        <div className="col">
                            <button onClick={deleteProject}
                                    className={`col-auto btn btn-danger m-2`}>Projeyi Sil
                            </button>
                        </div>

                    </React.Fragment> : null}


                <div className="col-auto">
                    <button onClick={clearFormData} className={`btn btn-info m-2`}>FORMU TEMİZLE</button>
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


        </>
    )
}