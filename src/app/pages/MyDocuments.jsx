import * as React from "react";
import ActiveDocuments from "./parts/ActiveDocuments";
import {useContext, useEffect, useState} from "react";
import DocumentDetail from "./parts/DocumentTabs";
import {useApi} from "../../service/useApi";
import {AppContext} from "../../context/AppContextProvider";
import {UserContext} from "../../context/UserContextProvider";

export default function MyDocuments() {
    const [selectedDocument, setSelectedDocument] = useState({});
    const [projects, setProjects] = useState({});


    const [data, setData] = useApi(null);
    const appContext = useContext(AppContext);
    const userContext = useContext(UserContext);
    const {userInformation} = userContext;

    useEffect(() => {
        if (data === null) {
            setData("my-documents", userInformation?.id).then(r => null)
        }
        findProjects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const findProjects = () => {
        const projectList = []
        if (data && Array.isArray(data)) {
            data.map((d) => {
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


    return (
        <>
            <div className="row">
                <div className="col-8 p-1">
                    <div className="card shadow">
                        <h5 className="card-header">Evraklarım</h5>
                        <div className="card-body">

                            <ActiveDocuments selectedDocument={selectedDocument}
                                             setSelectedDocument={setSelectedDocument}
                                             data={data}
                                             type={"my-documents"}/>
                        </div>

                    </div>
                </div>
                <div className="col-4 p-1">
                    <div className="card shadow">
                        <h5 className="card-header">Evrak Detayları</h5>
                        <div className="card-body">
                            {
                                selectedDocument ?
                                    <DocumentDetail data={selectedDocument} projects={projects}/>
                                    : null
                            }

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}