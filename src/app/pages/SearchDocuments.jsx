import {useContext, useEffect, useState} from "react";
import {useApi} from "../../service/useApi";
import {UserContext} from "../../context/UserContextProvider";
import ActiveDocuments from "./parts/ActiveDocuments";
import DocumentDetail from "./parts/DocumentTabs";
import * as React from "react";

const baseValue = {
    beginAt: null,
    endAt: null,
    projectId: 0,
    documentType: "",
    documentGroup: "",
    documentNumber: "",
    subject: "",
    searchWord: "",
    hasDate: false,
    hasProject: false,
    authority: -1,
    archive: false
}

export default function SearchDocuments(props) {
    const {archive} = props;
    const [staffs, setStaffs] = useApi(null);
    const [projectList, setProjectList] = useApi(null);
    const [data, setData] = useState({...baseValue})
    const [documentTypes, setDocumentTypes] = useApi(null);
    const [groups, setGroups] = useApi(null);
    const userContext = useContext(UserContext);
    const {userInformation} = userContext;
    const [searchProject, setSearchProject] = useApi(null);
    const [selectedDocument, setSelectedDocument] = useState({});
    const [projects, setProjects] = useState({});


    const clearDateData = (e) => {
        e.preventDefault()
        setData({...data, endAt: "", beginAt: ""})
    }


    useEffect(() => {

        setData({...data, authority: userInformation.authority})
        setDocumentTypes("documentTypes").then(r => null)
        setGroups("groups").then(r => null)
        setStaffs("staff", 1).then(r => null)
        setProjectList("findProjectByAuth", userInformation?.authority).then(r => null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const findEvents = (e) => {
        e.preventDefault()
        console.log(data)
        const searchData = data;
        if (archive) {
            searchData.archive = true
        }
        setSearchProject("searchProject", searchData).then(r => null)
        findProjects()

    }

    const onValueChangeEvent = (prop, value) => {
        setData({...data, [prop]: value})
    }

    const findProjects = () => {
        const projectList = []
        if (searchProject && Array.isArray(data)) {
            searchProject.map((d) => {
                const projectName = d.document.project.name
                const projectId = d.document.project.id
                const check = projectList.find(p => p.id === projectId)
                if (!check) {
                    const addProject = {id: projectId, name: projectName}
                    projectList.push(addProject)
                }
            })
            setProjects()
        }
    }


    const searchPanel = () => {
        return (
            <div className="container mb-2">
                <div className="row">
                    <div className="col-auto" style={{width: "100px"}}>
                        Tarih
                    </div>
                    <div className="col-auto" style={{width: "2px"}}>
                        <button className="form-check-input" style={{width: "20px", height: "36px"}}
                                onClick={(e) => clearDateData(e)}>X
                        </button>
                    </div>
                    <div className="col-auto" style={{width: "150px"}}>
                        <input className="form-control" type="date"
                               onChange={(e) => onValueChangeEvent("beginAt", e.target.value)}
                               value={data.beginAt}/>
                    </div>
                    <div className="col-auto" style={{width: "150px"}}>
                        <input className="form-control" type="date"
                               onChange={(e) => onValueChangeEvent("endAt", e.target.value)}
                               value={data.endAt}/>
                    </div>
                    <div className="col-auto" style={{width: "50px"}}>
                        Proje
                    </div>

                    <div className="col">
                        <select className="form-control"
                                onChange={(e) => onValueChangeEvent("projectId", e.target.value)}>
                            <option value="0"></option>
                            {
                                projectList ? projectList.map((project, index) => {
                                    return (
                                        data.projectId === project.id ?
                                            <option selected key={index} value={project.id}>{project.name}</option> :
                                            <option key={index} value={project.id}>{project.name}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                </div>


                <div className="row mt-2">
                    <div className="col-auto" style={{width: "100px"}}>
                        Tür:
                    </div>
                    <div className="col">
                        <select className="form-control"
                                onChange={(e) => onValueChangeEvent("documentType", e.target.value)}>
                            <option value=""></option>
                            {
                                documentTypes ? documentTypes.map((documentType, index) => {
                                    return (
                                        data.documentType === documentType.name ?
                                            <option selected key={index}
                                                    value={documentType.name}>{documentType.name}</option> :
                                            <option key={index} value={documentType.name}>{documentType.name}</option>
                                    )
                                }) : null
                            }
                        </select>

                    </div>
                    <div className="col">
                        <select className="form-control"
                                onChange={(e) => onValueChangeEvent("documentGroup", e.target.value)}>
                            <option value=""></option>
                            {
                                groups ? groups.map((group, index) => {
                                    return (
                                        data.documentGroup === group.name ?
                                            <option selected key={index} value={group.name}>{group.name}</option> :
                                            <option key={index} value={group.name}>{group.name}</option>

                                    )
                                }) : null
                            }
                        </select>
                    </div>
                    <div className="col-auto" style={{width: "50px"}}>
                        Sayı:
                    </div>
                    <div className="col">
                        <input className="form-control" type="text"
                               onChange={(e) => onValueChangeEvent("documentNumber", e.target.value)}
                               value={data.documentNumber}/>
                    </div>
                    <div className="col-auto" style={{width: "60px"}}>
                        Konu:
                    </div>
                    <div className="col">
                        <input className="form-control" type="text"
                               onChange={(e) => onValueChangeEvent("subject", e.target.value)}
                               value={data.subject}/>
                    </div>
                    <div className="col-auto" style={{width: "70px"}}>
                        <label>Kelime</label>
                    </div>
                    <div className="col-xl-4">
                        <input className="form-control" type="text"
                               onChange={(e) => onValueChangeEvent("searchWord", e.target.value)}
                               value={data.searchWord}/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary" onClick={(e) => findEvents(e)}>Ara</button>
                    </div>
                </div>
            </div>
        )
    }
//value={new Date(data.endAt).toLocaleDateString("tr")}/>


    return (
        <section className="intro">
            <div className="bg-image h-100" style={{backgroundColor: "#f5f7fa;"}}>
                <div className="mask align-items-center h-100">
                    <div className="row justify-content-center">
                        <div className="row">

                            {
                                searchPanel()
                            }

                            {
                                searchProject && Array.isArray(searchProject) ?
                                    <div className="row">
                                        <div className="col-8 p-1">
                                            <div className="card shadow">
                                                <h5 className="card-header">institution_list</h5>
                                                <div className="card-body">

                                                    <ActiveDocuments selectedDocument={selectedDocument}
                                                                     setSelectedDocument={setSelectedDocument}
                                                                     data={searchProject}/>
                                                </div>
                                                <div className="card-footer text-muted">
                                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 p-1">
                                            <div className="card shadow">
                                                <h5 className="card-header">Evrak Detayları</h5>
                                                <div className="card-body">
                                                    <DocumentDetail data={{"document": selectedDocument}}
                                                                    projects={projects}/>
                                                </div>
                                                <div className="card-footer text-muted">
                                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}