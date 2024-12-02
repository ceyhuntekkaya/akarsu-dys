import * as React from "react";
import {useEffect, useState} from "react";


export default function ActiveDocuments(props) {
    const {data, selectedDocument, setSelectedDocument, type} = props;
    const [documents, setDocuments] = useState(data);

    useEffect(() => {
        if (data) {
            setDocuments(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const eventHandler = (document) => {
        setSelectedDocument(document)
    };

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });


    const getSortDirection = (columnName) => {
        if (sortConfig.key === columnName) {
            return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
        }
        return '';
    };

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        let sortedData=[]

        if(type === "my-documents"){
            sortedData = [...documents.document].sort((a, b) => {
                if (!a[key]) return 1;
                if (!b[key]) return -1;
                if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                    if (direction === 'ascending') {
                        return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
                    }
                    return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
                }
                if (direction === 'ascending') {
                    return a[key] - b[key];
                }
                return b[key] - a[key];
            });

            setSortConfig({ key, direction });
            setDocuments({document:sortedData});
        }
        else{
            sortedData = [...documents].sort((a, b) => {
                if (!a[key]) return 1;
                if (!b[key]) return -1;
                if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                    if (direction === 'ascending') {
                        return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
                    }
                    return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
                }
                if (direction === 'ascending') {
                    return a[key] - b[key];
                }
                return b[key] - a[key];
            });

            setSortConfig({ key, direction });
            setDocuments(sortedData);
        }







    };


    const sortDataProject = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedData = [...documents].sort((a, b) => {
            if (!a.project?.name) return 1;
            if (!b.project?.name) return -1;
            if (typeof a.project.name === 'string' && typeof b.project.name=== 'string') {
                if (direction === 'ascending') {
                    return a.project.name.toLowerCase().localeCompare(b.project.name.toLowerCase());
                }
                return b.project.name.toLowerCase().localeCompare(a.project.name.toLowerCase());
            }
            if (direction === 'ascending') {
                return a.project.name - b.project.name;
            }
            return b.project.name - a.project.name;
        });
        setSortConfig({ key, direction });
        setDocuments(sortedData);
    };

    return (

        <div className="row">

            <div className="table table-responsive table-hover">
                <table className="table table-striped mb-0">
                    <thead>
                    <tr>
                        <th scope="col" onClick={() => sortDataProject('name')}>Proje {getSortDirection('name')}</th>
                        <th scope="col" onClick={() => sortData('documentDate')}>Tarih {getSortDirection('documentDate')}</th>
                        <th scope="col" onClick={() => sortData('number')}>Sayı {getSortDirection('number')}</th>
                        <th scope="col" onClick={() => sortData('subject')}>Konu {getSortDirection('subject')}</th>
                        <th scope="col" onClick={() => sortData('type')}>Tip {getSortDirection('type')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        documents && Array.isArray(documents) ?
                            type === "my-documents" ?
                                documents?.map((doc, key) => {
                                    return (
                                            <tr key={key}
                                                style={{backgroundColor: selectedDocument && selectedDocument.document ? selectedDocument.document?.id === doc.document?.id ? "#999" : "" : ""}}
                                                onClick={(e) => eventHandler(doc)}>
                                                <th scope="row">{doc.document?.project?.name}</th>
                                                <td>{new Date(doc.document?.documentDate).toLocaleDateString("tr")}</td>
                                                <td>{doc.document?.number}</td>
                                                <td>{doc.document?.subject}</td>
                                                <td>{doc.document?.type}</td>
                                            </tr>
                                    )
                                })

                                :


                                documents?.map((doc, key) => {
                                    return (
                                            <tr key={key}
                                                style={{backgroundColor: selectedDocument ? selectedDocument?.id === doc?.id ? "#ddd" : "" : ""}}
                                                onClick={(e) => eventHandler(doc)}>
                                                <th scope="row">{doc?.project?.name}</th>
                                                <td>{new Date(doc?.documentDate).toLocaleDateString("tr")}</td>
                                                <td>{doc?.number}</td>
                                                <td>{doc?.subject}</td>
                                                <td>{doc?.type}</td>
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