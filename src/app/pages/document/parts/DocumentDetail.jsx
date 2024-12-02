import DocumentFile from "./DocumentFile";
import {useApi} from "../../../../service/useApi";
import {useContext, useEffect, useState} from "react";
import * as React from "react";
import {UserContext} from "../../../../context/UserContextProvider";
import {NotificationManager} from "react-notifications";


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

    const [crudOperations, setCrudOperations] = useApi(null);


    const userContext = useContext(UserContext);
    const {userInformation, auth} = userContext;


    /*
    useEffect(() => {
        const dateLong = onTimeValueChangeEvent(document.documentDate);
        setValues({...document, documentDate: dateLong})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


     */


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
    const onDateValueChangeEvent = (prop, value) => {
        try {
            const selectedDate = new Date(value);
            const epochMilliseconds = selectedDate.getTime();

            if (!isNaN(epochMilliseconds)) {
                setValues({ ...values, [prop]: epochMilliseconds });
            }
        } catch (e) {
            console.error("Error converting date:", e);
        }
    }



    const onObjectValueChangeEvent = (prop1, prop2, value) => {
        setValues({...values, [prop1]: {[prop2]: value}})
    }
    const onTimeValueChangeEvent = (value) => {
        try{
            const date = new Date(value);
            const formattedDate = date.toLocaleDateString('en-EN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const epochMilliseconds = formattedDate.getTime();
            return  epochMilliseconds;
        }catch (e) {

        }

    }


    const handleDocumentDelete = () => {
        setCrudOperations("deleteDocument", document.id).then(r =>
        NotificationManager.success("Evrak Silindi", "Başarılı", 3000)
        )
    }






    const handleDocumentPartDelete = (partId) => {
        setCrudOperations("deleteDocumentPart", partId).then(r => null)
    }
    const handleDocumentPartArchive = (partId) => {
        setCrudOperations("archiveDocumentPart", partId).then(r => null)
    }

    const handleDocumentUpdate = () => {
        setCrudOperations("updateDocument", {id:document.id, document:values}).then(r =>
        NotificationManager.success("Evrak Güncellendi", "Başarılı", 3000)
        )

    }

    const formatDateForInput = (epochMilliseconds) => {
        if (!epochMilliseconds) return '';

        const date = new Date(epochMilliseconds);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    };

    return (
        <>
            <div className="row mb-4">
                <DocumentFile files={files} handleDocumentPartDelete={handleDocumentPartDelete}
                              handleDocumentPartArchive={handleDocumentPartArchive}/>
            </div>
            <div className="row">
                <div className="col-12 form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">PROJE</label>

                    <select className="form-control"
                            onChange={(e) => onObjectValueChangeEvent("project", "id", e.target.value)}>
                        <option selected value=""></option>
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
                <div className="col-6 form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">TARİH</label>
                    <input className="form-control" type="date" id="documentDateInput"
                           onChange={(e) => onDateValueChangeEvent("documentDate", e.target.value)}
                           value={formatDateForInput(values.documentDate)}/>
                </div>
                <div className="col-6 form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">SAYI</label>
                    <input className="form-control" type="text" value={values.number}
                           onChange={(e) => onValueChangeEvent("number", e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">KONU</label>
                    <input className="form-control" type="text" value={values.subject}
                           onChange={(e) => onValueChangeEvent("subject", e.target.value)}/>
                </div>
                <div className="col-6 form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">TÜR</label>
                    <select className="form-control"
                            onChange={(e) => onValueChangeEvent("type", e.target.value)}>
                        <option selected value=""></option>
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
                <div className="col-6 form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">GRUP</label>
                    <select className="form-control"
                            onChange={(e) => onValueChangeEvent("group", e.target.value)}>
                        <option selected value=""></option>
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
                <div className="col-6 form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">KAYIT TARİHİ</label>
                    <input className="form-control" type="text"
                           value={new Date(values.recordDate).toLocaleDateString("tr")}
                           onChange={(e) => onValueChangeEvent("recordDate", e.target.value)}/>
                </div>
                <div className="col-6 form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">YETKİ DÜZEYİ</label>
                    <select className="form-control"
                            onChange={(e) => onValueChangeEvent("authorizationLevel", e.target.value)}>
                        <option selected value=""></option>
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
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">SORUMLUSU</label>
                    <select className="form-control"
                            onChange={(e) => onObjectValueChangeEvent("owner", "id", e.target.value)}>
                        <option selected value=""></option>
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
                    <label htmlFor="exampleInputPassword1" className="mb-0 mt-2">NOT</label>
                    <textarea value={values.notu} rows="5" cols="60" className="form-control" id="note-input"
                              placeholder="Not"
                              onChange={(e) => onValueChangeEvent("notu", e.target.value)}/>
                </div>
            </div>
            <div className="row mb-4">
                <button onClick={handleDocumentUpdate} type="submit" className="col btn btn-primary m-3">Evrak
                    Güncelle
                </button>

                {
                    auth && auth.delete ?
                        <button onClick={handleDocumentDelete} type="submit" className="col btn btn-danger m-3">Evrak
                            Sil</button>
                        : null
                }
            </div>
        </>
    )
}