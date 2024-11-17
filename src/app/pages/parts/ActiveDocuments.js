import * as React from "react";


export default function ActiveDocuments(props) {
    const {data, selectedDocument, setSelectedDocument, type} = props;

    const eventHandler = (document) => {
        setSelectedDocument(document)
    };



    return (

        <div className="row">

            <div className="table table-responsive table-hover">
                <table className="table table-striped mb-0">
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
                        data && Array.isArray(data) ?
                            type === "my-documents" ?
                                data?.map((doc, key) => {
                                    return (
                                            <tr key={key}
                                                style={{backgroundColor: selectedDocument && selectedDocument.document ? selectedDocument.document?.id === doc.document?.id ? "#ddd" : "" : ""}}
                                                onClick={(e) => eventHandler(doc)}>
                                                <th scope="row">{doc.document?.project?.name}</th>
                                                <td>{new Date(doc.document?.documentDate).toLocaleDateString("tr")}</td>
                                                <td>{doc.document?.number}</td>
                                                <td>{doc.document?.subject}</td>
                                                <td>{doc.document?.note}</td>
                                            </tr>
                                    )
                                })

                                :


                                data?.map((doc, key) => {
                                    return (
                                            <tr key={key}
                                                style={{backgroundColor: selectedDocument ? selectedDocument?.id === doc?.id ? "#ddd" : "" : ""}}
                                                onClick={(e) => eventHandler(doc)}>
                                                <th scope="row">{doc?.project?.name}</th>
                                                <td>{new Date(doc?.documentDate).toLocaleDateString("tr")}</td>
                                                <td>{doc?.number}</td>
                                                <td>{doc?.subject}</td>
                                                <td>{doc?.note}</td>
                                            </tr>
                                    )
                                })


                            : null
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}