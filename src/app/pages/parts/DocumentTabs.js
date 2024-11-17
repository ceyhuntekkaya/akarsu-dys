import React, {useState} from "react";
import DocumentSend from "../../pages/document/parts/DocumentSend";
import DocumentLog from "../../pages/document/parts/DocumentLog";
import DocumentDetail from "../../pages/document/parts/DocumentDetail";
import DocumentTransAction from "../../pages/document/parts/DocumentTransAction";


export default function DocumentTabs(props) {
    const {data, projects} = props;



    const [page, setPage] = useState(0)
    return (
        <div className="px-0">
            <div className="w-100 p-0">
                <div className="d-flex align-items-center">
                    <button onClick={() => setPage(0)} className="btn btn-info  m-2 m-lg-0">Gönder</button>
                    <button onClick={() => setPage(1)} className="btn btn-secondary m-2">Geçmiş</button>
                    <button onClick={() => setPage(2)} className="btn btn-success m-2">Detay</button>
                    <button onClick={() => setPage(3)} className="btn btn-danger m-2">İşlem</button>
                </div>
                <div className="row">
                    <div className="card-body">
                        {
                            data ?
                                page === 0 ? <React.Fragment><DocumentSend document={data.document}
                                                                           logs={data.logs}/></React.Fragment> :
                                    page === 1 ? <React.Fragment><DocumentLog logs={data.logs}/></React.Fragment> :
                                        page === 2 ?
                                            <React.Fragment><DocumentDetail document={data.document} projects={projects}
                                                                            files={data.files}/></React.Fragment> :
                                            page === 3 ? <React.Fragment><DocumentTransAction document={data.document}/></React.Fragment> : null
                                : null

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}