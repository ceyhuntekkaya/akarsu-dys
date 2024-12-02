import {useContext, useEffect, useState} from "react";
import DocumentDetail from "./parts/DocumentTabs";
import * as React from "react";
import {useApi} from "../../service/useApi";
import {UserContext} from "../../context/UserContextProvider";
import {uploadFileToPath} from "../../service/StorageService";
import {NotificationManager} from "react-notifications";


const baseValuee = {
    project: {
        id: 0,
    },
    type: "",
    group: "",
    number: "",
    subject: "",
    documentDate: "",
    authorizationLevel: -1,
//recordDate: null,
    archive: false,
    documentAddress: "",
    connected: false,
    owner: {id: 0},
    ocr: ""
}

const baseValue = {
    project: {
        id: 0,
    },
    type: "",
    group: "",
    number: "",
    subject: "",
    documentDate: "",
    owner: {
        id: 0,
    },
    authorizationLevel: -1,

}
const baseValueAuthorityForm = {
    fileSearch:false,
    archive:false,
    scan:false,
    admin:false,
    text:false,
    project:false,
    delete:false

}

export default function DocumentScan() {
    const userContext = useContext(UserContext);
    const {userInformation} = userContext;


    const [uploadFile, setUploadFile] = useState(null);
    const [staffs, setStaffs] = useApi(null);
    const [projectList, setProjectList] = useApi(null);
    const [data, setData] = useState({...baseValue})
    const [documentTypes, setDocumentTypes] = useApi(null);
    const [groups, setGroups] = useApi(null);
    const [fileUploadStatus, setFileUploadStatus] = useState(null);
    const [tempFiles, setTempFiles] = useState([]);
    const [saveDocument, setSaveDocuments] = useApi(null);


    useEffect(() => {

        setDocumentTypes("documentTypes").then(r => null)
        setGroups("groups").then(r => null)
        setProjectList("findProjectByAuth", userInformation?.authority).then(r => null)

        if (!staffs) {
            setStaffs("staff", 1).then(r => null)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onValueChangeEvent = (prop, value) => {
        setData({...data, [prop]: value})
    }



    const onObjectValueChangeEvent = (prop1, prop2, value) => {
        setData({...data, [prop1]: {[prop2]: value}})
    }

    const handleOnChange = (value) => {
        setUploadFile(value[0]);
    };

    useEffect(() => {
        if (uploadFile) {
            handleSendSingleFileUpload(uploadFile);
        }
    }, [uploadFile]);

    const handleSendSingleFileUpload = async (file) => {
        setFileUploadStatus("UPLOADING");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", "PDF");
        const {data, err} = await uploadFileToPath(formData);
        if (err) {
            setFileUploadStatus("ERROR");
            return;
        }

        const temp = tempFiles;
        temp.push({"file": data});
        setTempFiles(temp);
        setFileUploadStatus("UPLOADED");
    };


    const handleSaveEvent = () => {

        let params = data;
        //params.documentDate = Math.floor(new Date(data.documentDate).getTime() / 1000)
        params.recordBy = {id: Number(userInformation?.id)}
        params.project.id = Number(data.project.id)
        params.authorizationLevel = Number(data.authorizationLevel)

        params.owner = {id: Number(data.owner.id)}


        // ceyhun

        const fileList = []
        // eslint-disable-next-line array-callback-return
        tempFiles.map((file) => {fileList.push(file.file)})

        const parameters = {
            "document": params,
            "files": fileList
        }
        setSaveDocuments("saveDocument", parameters).then(r =>
            NotificationManager.success("Evrak Kaydedildi", "Başarılı", 3000))

    };


    const onDateValueChangeEvent = (prop, value) => {
        try {
            const selectedDate = new Date(value);
            const epochMilliseconds = selectedDate.getTime();

            if (!isNaN(epochMilliseconds)) {
                setData({...data, [prop]: epochMilliseconds});
            }
        } catch (e) {
            console.error("Error converting date:", e);
        }
    }
    const formatDateForInput = (epochMilliseconds) => {
        if (!epochMilliseconds) return '';

        const date = new Date(epochMilliseconds);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    };


    const searchPanel = () => {
        return (

            <div className="card shadow">
                <div className="card-body">
                    <div className="row m-2">
                        <div className="col-auto">
                            <input className="form-control" type="date"
                                   onChange={(e) => onDateValueChangeEvent("documentDate", e.target.value)}
                                   value={formatDateForInput(data.documentDate)}/>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" placeholder="SAYI"
                                   onChange={(e) => onValueChangeEvent("number", e.target.value)}
                                   value={data.number}/>
                        </div>


                        <div className="col">
                            <select className="form-control"
                                    onChange={(e) => onObjectValueChangeEvent("project", "id", e.target.value)}>
                                <option selected value="0">Proje Seç</option>
                                {
                                    projectList ? projectList.map((project, index) => {
                                        return (
                                            data.project.id === project.id ?
                                                <option selected key={index}
                                                        value={project.id}>{project.name}</option> :
                                                <option key={index} value={project.id}>{project.name}</option>
                                        )
                                    }) : null
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col">
                            <select className="form-control"
                                    onChange={(e) => onValueChangeEvent("type", e.target.value)}>
                                <option selected value="">Tip Seç</option>
                                {
                                    documentTypes ? documentTypes.map((documentType, index) => {
                                        return (
                                            data.type === documentType.name ?
                                                <option selected key={index}
                                                        value={documentType.name}>{documentType.name}</option> :
                                                <option key={index}
                                                        value={documentType.name}>{documentType.name}</option>
                                        )
                                    }) : null
                                }
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-control"
                                    onChange={(e) => onValueChangeEvent("group", e.target.value)}>
                                <option selected value="">Grup Seç</option>
                                {
                                    groups ? groups.map((group, index) => {
                                        return (
                                            data.group === group.name ?
                                                <option selected key={index}
                                                        value={group.name}>{group.name}</option> :
                                                <option key={index} value={group.name}>{group.name}</option>

                                        )
                                    }) : null
                                }
                            </select>
                        </div>

                        {
                            //ceyhun
                        }
                        <div className="col">
                            <select className="form-control"
                                    onChange={(e) => onObjectValueChangeEvent("owner","id", e.target.value)}>
                                <option selected value="">Sorumlu Seç</option>
                                {
                                    staffs ? staffs.map((staff, index) => {
                                        return (
                                            <option key={index} value={staff.id}>{staff.name}</option>
                                        )
                                    }) : null
                                }
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-control"
                                    value={data.authorizationLevel}
                                    onChange={(e) => onValueChangeEvent("authorizationLevel", e.target.value)}>
                                <option selected value="">Yetki Düzeyi Seç</option>

                                <option value="0">Personel</option>
                                <option value="1">Proje Personeli</option>
                                <option value="2">Proje Koordinatörü</option>
                                <option value="3">Yönetim</option>



                            </select>
                        </div>

                        {
                            //ceyhun
                        }


                    </div>

                    <div className="row m-2">
                        <div className="col">
                            <input className="form-control" type="text" placeholder="KONU"
                                   onChange={(e) => onValueChangeEvent("subject", e.target.value)}
                                   value={data.subject}/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-success" onClick={handleSaveEvent}>EVRAK KAYDET</button>
                        </div>
                    </div>
                    <div>

                    </div>

                </div>
            </div>
        )
    }
    return (
        <section className="intro">
            <div className="bg-image h-100" style={{backgroundColor: "#f5f7fa"}}>
                <div className="mask align-items-center h-100">
                    <div className="row justify-content-center">
                        <div className="row">

                            {
                                searchPanel()
                            }
                            <div className="row">
                                <div className="col-8 p-1">
                                    <div className="card shadow">
                                        <div className="card-header">
                                            <div>
                                                <input
                                                    type="file"
                                                    multiple={false}
                                                    accept=".pdf"
                                                    value={null}
                                                    onChange={(event) => {
                                                        handleOnChange({
                                                            ...event.target.files,
                                                        });
                                                    }}
                                                    onClick={(event) => {
                                                        event.target.value = null;
                                                    }}
                                                />
                                            </div>

                                        </div>
                                        <div className="card-body">


                                            <div className="row">

                                                <div className="table table-responsive table-hover">
                                                    <table className="table table-striped mb-0">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Yüklenecek Dosyalar</th>

                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            tempFiles && Array.isArray(tempFiles) ?
                                                                tempFiles?.map((doc, key) => {
                                                                    return (
                                                                        <tr key={key}>
                                                                            <th scope="row">{doc.file}</th>

                                                                        </tr>
                                                                    )
                                                                })


                                                                : null
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 p-1">
                                    <div className="card shadow">
                                        <h5 className="card-header">Evrak Detayları</h5>
                                        <div className="card-body">
                                            <DocumentDetail data={{
                                                "document": null,
                                                "files": null,
                                                "logs": null
                                            }}
                                                            projects={projectList}/>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}