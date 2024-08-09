import {useApi} from "../../../../service/useApi";
import {useEffect} from "react";

export default function DocumentSend() {

    const [staffs, setStaffs] = useApi(null);

    useEffect(() => {
        if (staffs === null) {
            setStaffs("staff", 1).then(r => null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="col-12 col-xl-12">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Personel</label>
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
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Not</label>
                    <textarea rows="5" cols="60" className="form-control" id="note-input"
                              placeholder="Not"/>
                </div>
                <div className="form-group row mt-4">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Gönder</button>
                    </div>
                </div>
            </form>
        </div>
    )
}