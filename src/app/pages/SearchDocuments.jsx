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
    const [projectList, setProjectList] = useApi(null);
    const [data, setData] = useState({...baseValue})
    const [documentTypes, setDocumentTypes] = useApi(null);
    const [groups, setGroups] = useApi(null);
    const userContext = useContext(UserContext);
    const {userInformation} = userContext;
    const [searchProject, setSearchProject] = useApi(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [projects, setProjects] = useState([]);
    const [tableHeight, setTableHeight] = useState('200px');
    const [documentFiles, setDocumentFiles] = useApi(null);
    const [documentLogs, setDocumentLogs] = useApi(null);

    const [updated, setUpdated] = useState(false);


    useEffect(() => {
       if(updated){
           findEvents()
           setUpdated(false)
       }
    }, [updated]);


    useEffect(() => {
        const calculateHeight = () => {
            const windowHeight = window.innerHeight;
            const availableHeight = windowHeight - 330;
            setTableHeight(`${availableHeight}px`);
        };
        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        return () => window.removeEventListener('resize', calculateHeight);
    }, []);

    useEffect(() => {
        setData({...data, authority: userInformation.authority})
        setDocumentTypes("documentTypes").then(r => null)
        setGroups("groups").then(r => null)

        if (archive) {
            setProjectList("findNonActiveProjects", userInformation?.authority).then(r => null)
        }
        else{
            setProjectList("findProjectByAuth", userInformation?.authority).then(r => null)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedDocument) {
            if (selectedDocument.id) {
                setDocumentFiles("findByIdFiles", selectedDocument.id).then(r => null)
                setDocumentLogs("findByIdLogs", selectedDocument.id).then(r => null)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDocument]);

    const findEvents = () => {

        const searchData = data;
        if (archive) {
            searchData.archive = true
        }
        setSearchProject("searchProject", searchData).then(r => null)
    }

    const onValueChangeEvent = (prop, value) => {
        setData({...data, [prop]: value})
    }


    useEffect(() => {
        if (data) {
            findEvents()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);




    const searchPanel = () => {
        return (
            <div className="card shadow mb-3">
                <div className="card-body">
                    <div className="row m-2">

                        <div className="col">
                            <select className="form-control"
                                    onChange={(e) => onValueChangeEvent("projectId", e.target.value)}>
                                <option selected value="0">Proje Seç</option>
                                {
                                    projectList ? projectList.map((project, index) => {
                                        return (
                                            data.projectId === project.id ?
                                                <option selected key={index}
                                                        value={project.id}>{project.name}</option> :
                                                <option key={index} value={project.id}>{project.name}</option>
                                        )
                                    }) : null
                                }
                            </select>
                        </div>

                        <div className="col-auto" style={{width: "160px"}}>
                            <input className="form-control" type="date"
                                   onChange={(e) => onValueChangeEvent("beginAt", e.target.value)}
                                   value={data.beginAt}/>
                        </div>
                        <div className="col-auto" style={{width: "160px"}}>
                            <input className="form-control" type="date"
                                   onChange={(e) => onValueChangeEvent("endAt", e.target.value)}
                                   value={data.endAt}/>
                        </div>




                    </div>
                    <div className="row m-2">

                        <div className="col-auto" style={{width: "360px"}}>
                            <input className="form-control" type="text" placeholder="KONU"
                                   onChange={(e) => onValueChangeEvent("subject", e.target.value)}
                                   value={data.subject}/>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" placeholder="ARANACAK KELİME"
                                   onChange={(e) => onValueChangeEvent("searchWord", e.target.value)}
                                   value={data.searchWord}/>
                        </div>


                        <div className="col-auto" style={{width: "160px"}}>
                            <select className="form-control"
                                    onChange={(e) => onValueChangeEvent("documentType", e.target.value)}>
                                <option selected value="">Tip Seç</option>
                                {
                                    documentTypes ? documentTypes.map((documentType, index) => {
                                        return (
                                            data.documentType === documentType.name ?
                                                <option selected key={index}
                                                        value={documentType.name}>{documentType.name}</option> :
                                                <option key={index}
                                                        value={documentType.name}>{documentType.name}</option>
                                        )
                                    }) : null
                                }
                            </select>
                        </div>

                        <div className="col-auto" style={{width: "160px"}}>
                            <input className="form-control" type="text" placeholder="SAYI"
                                   onChange={(e) => onValueChangeEvent("documentNumber", e.target.value)}
                                   value={data.documentNumber}/>
                        </div>
                        <div className="col-auto">
                            <select className="form-control"
                                    onChange={(e) => onValueChangeEvent("documentGroup", e.target.value)}>
                                <option selected value="">Grup Seç</option>
                                {
                                    groups ? groups.map((group, index) => {
                                        return (
                                            data.documentGroup === group.name ?
                                                <option selected key={index}
                                                        value={group.name}>{group.name}</option> :
                                                <option key={index} value={group.name}>{group.name}</option>

                                        )
                                    }) : null
                                }
                            </select>
                        </div>


                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary" onClick={findEvents}>Ara
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="mx-3">
            <div className="bg-image h-100" style={{backgroundColor: "#f5f7fa"}}>
                <div className="row">
                    {
                        searchPanel()
                    }
                    {
                        searchProject && Array.isArray(searchProject) ?
                            <div className="row">
                                <div className="col-8 p-1">
                                    <div className="card shadow">

                                        <div className="card-body" style={{
                                            height: tableHeight, overflowY: 'auto'
                                        }}>

                                            <ActiveDocuments selectedDocument={selectedDocument}
                                                             setSelectedDocument={setSelectedDocument}
                                                             data={searchProject}/>
                                        </div>
                                    </div>
                                </div>
                                {
                                    selectedDocument ?
                                        <div className="col-4 p-1">
                                            <div className="card shadow">

                                                <div className="card-body">
                                                    <DocumentDetail setUpdated={setUpdated} data={{
                                                        "document": selectedDocument,
                                                        "files": documentFiles,
                                                        "logs": documentLogs
                                                    }}
                                                                    projects={projects}/>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        </section>
    )
}