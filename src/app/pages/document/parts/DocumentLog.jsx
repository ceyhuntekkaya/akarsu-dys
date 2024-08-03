
export default function DocumentLog(props) {
    const {logs} = props;
    return (
        <div className="table table-responsive table-hover">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Tarih</th>
                    <th scope="col">Personel</th>
                    <th scope="col">İşlem</th>
                    <th scope="col">IP</th>
                </tr>
                </thead>
                <tbody>
                {
                    logs?.map((log, key) => {
                        return (
                            <>
                                <tr key={key}>
                                    <th scope="row">{log.recordDate}</th>
                                    <td>{log.user.name}</td>
                                    <td>{log.transaction}</td>
                                    <td>{log.ip}</td>
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