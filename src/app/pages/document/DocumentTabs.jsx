import {Link} from "react-router-dom";
import React, {useState} from "react";
import DocumentSend from "./parts/DocumentSend";
import DocumentLog from "./parts/DocumentLog";
import DocumentDetail from "./parts/DocumentDetail";
import DocumentTransAction from "./parts/DocumentTransAction";

export default function DocumentTabs(props) {
    const {data} = props;

    console.log(data)

    const [page, setPage] = useState(0)
    return (
        <div className="px-0">
            <div className="w-100 p-0">
                <div className="d-flex align-items-center">
                    <button onClick={()=>setPage(0)} className="btn btn-info  m-2 m-lg-0">Evrak Gönder</button>
                    <button onClick={()=>setPage(1)} className="btn btn-secondary m-2">Evrak Geçmiş</button>
                    <button onClick={()=>setPage(2)} className="btn btn-success m-2">Evrak Detay</button>
                    <button onClick={()=>setPage(3)} className="btn btn-danger m-2">İşlemler</button>
                </div>
                <div className="row">

                        <div className="card-body">
                            {
                                page === 0 ? <DocumentSend document={data.document}/> :
                                    page === 1 ? <DocumentLog logs={data.logs}/> :
                                        page === 2 ? <DocumentDetail document={data.document} files={data.files}/> :
                                            page === 3 ? <DocumentTransAction document={data.document}/> : null

                            }

                    </div>
                </div>
            </div>
        </div>
    )
}