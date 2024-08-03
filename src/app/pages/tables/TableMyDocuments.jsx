import DocumentTabs from "../document/DocumentTabs";

export default function TableMyDocuments(props) {
    const {data, selectedDocument, setSelectedDocument} = props;

    const eventHandler = (e) => {
        setSelectedDocument(e)
    };

    return (
        <div className="table table-responsive table-hover">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Proje</th>
                    <th scope="col">Tarih</th>
                    <th scope="col">Sayı</th>
                    <th scope="col">Konu</th>
                    <th scope="col">Not</th>
                </tr>
                </thead>
                <tbody>
                {
                    data?.map((doc, key) => {
                        return (
                            <>
                                <tr key={key}
                                    style={{backgroundColor: selectedDocument === doc.document.id ? "#ddd" : ""}}
                                    onClick={(e) => eventHandler(doc.document.id)}>
                                    <th scope="row">{doc.document.project.name}</th>
                                    <td>{doc.document.documentDate}</td>
                                    <td>{doc.document.number}</td>
                                    <td>{doc.document.subject}</td>
                                    <td>{doc.document.note}</td>
                                </tr>
                                {
                                    selectedDocument === doc.document.id ? <tr>
                                        <td colSpan="5"
                                            style={{backgroundColor: selectedDocument === doc.document.id ? "#ddd" : ""}}>
                                            <div className="card">

                                                <div className="card-body"> <DocumentTabs data={data.find(d=>d.document.id === selectedDocument)}/>

                                                </div>
                                            </div>
                                        </td>
                                    </tr> : null
                                }
                            </>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}