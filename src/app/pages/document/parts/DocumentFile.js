import {IconDashboard, IconKanban, IconMessages, IconUsers} from "../../../general/components/Icons";
import {Link} from "react-router-dom";

const config = require("../../../../config/config.json");


export default function DocumentFile(props) {
    const {files} = props;

    const showEvent = (e) => {
        console.log("showEvent")
    }
    const completeEvent = (e) => {
        console.log("completeEvent")
    }
    const archiveEvent = (e) => {
        console.log("archiveEvent")
    }
    const deleteEvent = (e) => {
        console.log("deleteEvent")
    }

    console.log(files)

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
                                            to={`${config.api.invokeUrl}/document/user/${file.name}`} target="_blank">
                                            <div className="w-100">{file.name}</div>
                                        </Link></td>
                                        <td>
                                            <div style={{whiteSpace: "nowrap"}}>
                                                <span className="m-1"
                                                      onClick={() => completeEvent()}><IconKanban/></span>
                                                <span className="m-1"
                                                      onClick={() => archiveEvent()}><IconMessages/></span>
                                                <span className="m-1 mr-0"
                                                      onClick={() => deleteEvent()}><IconUsers/></span>
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