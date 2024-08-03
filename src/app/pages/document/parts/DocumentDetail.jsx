import DocumentTabs from "../DocumentTabs";
import TableDocumentFiles from "../../tables/TableDocumentFiles";

export default function DocumentDetail(props) {

    const {document, files} = props;
    console.log("ceyhun", files)
    return (
        <div className="row">


            <div className="col-6">

            </div>
            <div className="col-6">
                <TableDocumentFiles files={files}/>

            </div>
        </div>
    )
}