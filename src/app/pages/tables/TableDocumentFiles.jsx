import {IconDashboard} from "../../general/components/Icons";

export default function TableDocumentFiles(props) {
    const {files} = props;




    return (
        <div className="table table-responsive table-hover table-bordered">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col w-100">Dosyalar</th>

                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {
                    files?.map((file, key) => {
                        return (
                            <>
                                <tr key={key}>
                                    <th scope="row">{file.name}</th>

                                    <th scope="row">

                                        <IconDashboard/>
                                        <IconDashboard/>
                                        <IconDashboard/>
                                    </th>
                                </tr>

                            </>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}