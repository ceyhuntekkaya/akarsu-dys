import * as React from "react";
import {useApi} from "../../service/useApi";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContextProvider";
import {UserContext} from "../../context/UserContextProvider";
import TableMyDocuments from "./tables/TableMyDocuments";

export default function MyDocuments() {
    const [data, setData] = useApi(null);
    const appContext = useContext(AppContext);
    const [selectedDocument, setSelectedDocument] = useState(-1);
    const userContext = useContext(UserContext);
    const {userInformation} = userContext;


    useEffect(() => {
        if (data === null) {
            setData("my-documents", userInformation?.id).then(r => null)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const DataTable = () => {
        return (
            <div className="col-12 p-1">
                <div className="card shadow p-0">

                    <div className="card-body">
                        <div className="bg-image h-100" style={{backgroundColor: "#f5f7fa;"}}>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Search"/>
                            {
                                data ?  <TableMyDocuments data={data}
                                                          selectedDocument={selectedDocument}
                                                          setSelectedDocument={setSelectedDocument}/> : null
                            }

                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className="row">
                <div className="card border-0 shadow rounded">
                    <h5 className="card-header">
                        Evraklarım
                    </h5>
                </div>
            </div>
            <div className="row w-100 py-2">
                <DataTable/>

            </div>
        </>
    )
}