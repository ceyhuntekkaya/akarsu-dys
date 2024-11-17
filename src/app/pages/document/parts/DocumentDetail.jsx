import DocumentFile from "./DocumentFile";
import {useApi} from "../../../../service/useApi";
import {useContext, useEffect, useState} from "react";
import * as React from "react";
import {UserContext} from "../../../../context/UserContextProvider";


const tempDocument = {

    id: 0,
    type: "",
    group: "",
    project: {
        id: "",
        name: ""
    },
    documentDate: "",
    number: "",
    subject: "",
    authorizationLevel: "",
    recordDate: "",
    recordBy: "",
    archive: "",
    documentAddress: "",
    connected: "",
    owner: {
        id: ""
    },
    ocr: ""
}

export default function DocumentDetail(props) {
    const {document, files} = props;
    const [values, setValues] = useState({...document})
    const [projects, setProjects] = useApi(null);
    const [staffs, setStaffs] = useApi(null);
    const [documentTypes, setDocumentTypes] = useApi(null);
    const [groups, setGroups] = useApi(null);
    const [auths, setAuths] = useApi(null);


    const userContext = useContext(UserContext);
    const {userInformation} = userContext;



    useEffect(() => {
        setValues({...document})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [document, files]);

    useEffect(() => {
        if (staffs === null) {
            setProjects("findProjectByAuth", userInformation?.authority).then(r => null)
            setStaffs("staff", 1).then(r => null)
            //setProjects("findProjectByActive", "").then(r => null)
            setDocumentTypes("documentTypes").then(r => null)
            setGroups("groups").then(r => null)
            setAuths("auths").then(r => null)

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onValueChangeEvent = (prop, value) => {
        setValues({...values, [prop]: value})
    }
    const onObjectValueChangeEvent = (prop1, prop2, value) => {
        setValues({...values, [prop1]: {[prop2]: value}})
    }

    return (
        <>
            <div className="row mb-4">
                <DocumentFile files={files}/>
            </div>
            <div className="row">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">PROJE</label>

                        <select className="form-control"
                                onChange={(e) => onObjectValueChangeEvent("project", "id", e.target.value)}>
                            <option value=""></option>
                            {
                                projects ? projects.map((project, index) => {
                                    return (
                                        values.project?.id === project.id ?
                                            <option selected key={index} value={project.id}>{project.name}</option> :
                                            <option key={index} value={project.id}>{project.name}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">TARİH</label>
                        <input className="form-control" type="text"
                               value={new Date(values.documentDate).toLocaleDateString("tr")}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">SAYI</label>
                        <input className="form-control" type="text" value={values.number}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">KONU</label>
                        <input className="form-control" type="text" value={values.subject}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">TÜR</label>
                        <select className="form-control"
                                onChange={(e) => onValueChangeEvent("type", e.target.value)}>
                            <option value=""></option>
                            {
                                documentTypes ? documentTypes.map((documentType, index) => {
                                    return (
                                        values.type === documentType.name ?
                                            <option selected key={index}
                                                    value={documentType.name}>{documentType.name}</option> :
                                            <option key={index} value={documentType.name}>{documentType.name}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">GRUP</label>
                        <select className="form-control"
                                onChange={(e) => onValueChangeEvent("group", e.target.value)}>
                            <option value=""></option>
                            {
                                groups ? groups.map((group, index) => {
                                    return (
                                        values.group === group.name ?
                                            <option selected key={index} value={group.name}>{group.name}</option> :
                                            <option key={index} value={group.name}>{group.name}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">KAYIT TARİHİ</label>
                        <input className="form-control" type="text"
                               value={new Date(values.recordDate).toLocaleDateString("tr")}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">YETKİ DÜZEYİ</label>
                        <select className="form-control"
                                onChange={(e) => onValueChangeEvent("authorizationLevel", e.target.value)}>
                            <option value=""></option>
                            {
                                auths ? auths.map((auth, index) => {
                                    return (
                                        values.authorizationLevel === auth.id ?
                                            <option selected key={index} value={auth.id}>{auth.name}</option> :
                                            <option key={index} value={auth.id}>{auth.name}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">SORUMLUSU</label>
                        <select className="form-control"
                                onChange={(e) => onObjectValueChangeEvent("owner", "id", e.target.value)}>
                            <option value=""></option>
                            {
                                staffs ? staffs.map((owner, index) => {
                                    return (
                                        values.owner?.id === owner.id ?
                                            <option selected key={index} value={owner.id}>{owner.name}</option> :
                                            <option key={index} value={owner.id}>{owner.name}</option>
                                    )
                                }) : null
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">NOT</label>
                        <textarea value={values.notu} rows="5" cols="60" className="form-control" id="note-input"
                                  placeholder="Not"/>
                    </div>
                </form>
            </div>
            <div className="row mb-4">
                <button type="submit" className="btn btn-primary">Evrak Sil</button>
            </div>
        </>
    )
}