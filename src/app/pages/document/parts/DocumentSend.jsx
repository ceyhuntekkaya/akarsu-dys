import {useApi} from "../../../../service/useApi";
import {useEffect, useState} from "react";

export default function DocumentSend(props) {
    const {document} = props;

    const [staffs, setStaffs] = useApi(null);
    const [documentSend, setDocumentSend] = useApi(null);
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const [note, setNote] = useState("");
    const [selectedDocument, setSelectedDocument] = useState(document);


    useEffect(() => {
        if (document) {
            setSelectedDocument(document)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);


    const [transactions, setTransactions] = useApi(null);

    useEffect(() => {
        if (documentSend) {
            setTransactions(documentSend)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documentSend]);


    const handleSendDocument = (event) => {
        event.preventDefault();
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const documentSentDto = {
            documentId: Number(selectedDocument.id),
            senderId: Number(userId),
            receiverId: Number(selectedReceiver),
            note: note,
            transactionId: 0,
            isCopy: true
        }

        setDocumentSend("documentSend", documentSentDto).then(r => null);
    }

    useEffect(() => {
        if (!staffs) {
            setStaffs("staff", 1).then(r => null)
        }
        if (selectedDocument?.id) {
            setTransactions("getTransactions", selectedDocument.id).then(r => null)
        }
    }, [selectedDocument]);



    useEffect(() => {
        if (!staffs) {
            setStaffs("staff", 1).then(r => null)
        }
    }, []);


    const formatUnixTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('tr-TR', ).format(date);
    };



    return (
        <div className="col-12 col-xl-12">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Personel</label>
                    <select className="form-control" id="staff-list-select"
                            onChange={(event) => setSelectedReceiver(event.target.value)}>
                        <option selected>Personel Seç</option>
                        >
                        {
                            staffs ? staffs.map((staff, index) => {
                                return (
                                    <option key={index} value={staff.id}>{staff.name}</option>
                                )
                            }) : null
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Not</label>
                    <textarea rows="5" cols="60" className="form-control" id="note-input"
                              onChange={(event) => setNote(event.target.value)}/>
                </div>
                <div className="form-group row mt-4">
                    <div className="col-sm-10">
                        <button onClick={handleSendDocument} type="submit" className="btn btn-primary">Gönder</button>
                    </div>
                </div>


                <div className="form-group row mt-4">
                    <div className="col-sm-10">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Tarih</th>
                                <th scope="col">Gönderen</th>
                                <th scope="col">Personel</th>
                                <th scope="col">Okunma</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                transactions && transactions.map((transaction, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{formatUnixTimestamp(transaction.createDate)}</td>
                                                <td>{transaction.userFrom.name}</td>
                                                <td>{transaction.userTo?.name}</td>
                                                <td>{transaction.readDate ? "Okundu" : "Okunmadı"}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }


                            </tbody>
                        </table>
                    </div>
                </div>


            </form>
        </div>
    )
}