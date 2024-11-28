import {IconKanban, IconMessages, IconUsers} from "../../../general/components/Icons";
import {Link} from "react-router-dom";

const config = require("../../../../config/config.json");


export default function DocumentFile(props) {
    const {files, handleDocumentPartDelete, handleDocumentPartArchive} = props;

    const showEvent = (id) => {
        console.log("showEvent")
    }
    const completeEvent = (id) => {
        console.log("completeEvent")
    }
    const archiveEvent = (id) => {
        handleDocumentPartArchive(id);
    }
    const deleteEvent = (id) => {
        handleDocumentPartDelete(id);
    }

//  <td className="w-100"><Link to={`https://pdfobject.com/pdf/sample.pdf`} target="_blank"><div className="w-100">{file.name}</div></Link></td>

    return (<>
            <div className="table table-responsive table-hover table-bordered">
                <table className="table">
                    <tbody>
                    {
                        files?.map((file, key) => {
                            return (
                                <>



                                    <tr key={key}>
                                        <td className="w-100"><Link
                                            to={`${config.api.invokeUrl}/storage/preview/file/${file.id}/${file.name}`} target="_blank">
                                            <div className="w-100">{file.name}</div>
                                        </Link></td>
                                        <td>
                                            <div style={{whiteSpace: "nowrap"}}>
                                                <span className="m-1"
                                                      onClick={() => completeEvent(file.id)}><IconKanban/></span>
                                                <span className="m-1"
                                                      onClick={() => archiveEvent(file.id)}><IconMessages/></span>
                                                <span className="m-1 mr-0"
                                                      onClick={() => deleteEvent(file.id)}><IconUsers/></span>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>

        </>
    )
}