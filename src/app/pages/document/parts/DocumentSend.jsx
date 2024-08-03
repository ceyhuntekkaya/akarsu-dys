import {useApi} from "../../../../service/useApi";
import {useEffect} from "react";

export default function DocumentSend(props) {
    const {document} = props;
    const [staffs, setStaffs] = useApi(null);

    useEffect(() => {
        if (staffs === null) {
            setStaffs("staff", 1).then(r => null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="col-12 col-xl-12">
            <div className="card border-0 shadow">
                <div className="card-body">


                    <form>
                        <div className="form-group row mb-3">
                            <label htmlFor="staff-list-select" className="col-sm-2 col-form-label">Personel</label>
                            <div className="col-sm-10">
                                <select className="form-control" id="staff-list-select">
                                    {
                                        staffs ? staffs.map((staff, index) => {
                                            return (
                                                <option key={index} value={staff.id}>{staff.name}</option>
                                            )
                                        }) : null
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="note-inpu" className="col-sm-2 col-form-label">Not</label>
                            <div className="col-sm-10">
                                <textarea rows = "5" cols = "60" className="form-control" id="note-input"
                                       placeholder="Not"/>
                            </div>
                        </div>


                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Gönder</button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}