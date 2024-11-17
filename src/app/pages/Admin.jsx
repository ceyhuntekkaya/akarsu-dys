import {useEffect, useState} from "react";
import {useApi} from "../../service/useApi";
import * as React from "react";

export default function Admin() {
    const [staffs, setStaffs] = useApi(null);
    const [selectedStaff, setSelectedStaff] = useState({});

    useEffect(() => {
        setStaffs("staff", 0).then(r => null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const eventHandler = (staff) => {
        setSelectedStaff(staff)
    };

    const DataTable = () => {
        return (
            <div className="row">
                <div className="table table-responsive table-hover">
                    <table className="table table-striped mb-0">
                        <thead>
                        <tr>
                            <th scope="col">PERSONEL</th>
                            <th scope="col">BİRİM</th>
                            <th scope="col">YETKİ</th>
                            <th scope="col">DURUM</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            staffs && Array.isArray(staffs) ?
                                staffs?.map((staff, key) => {
                                    return (
                                        <tr key={key}
                                            style={{backgroundColor: selectedStaff && selectedStaff.id ? selectedStaff.id === staff?.id ? "#ddd" : "" : ""}}
                                            onClick={(e) => eventHandler(staff)}>
                                            <th scope="row">{staff.name}</th>
                                            <td>{staff.unit}</td>
                                            <td>{staff.authority}</td>
                                            <td>{staff.status ? "Aktif" : "Arşiv"}</td>
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

    const onValueChangeEvent = (prop, value) => {
        setStaffs({...staffs, [prop]: value}).then(r => null)
    }

    const DetailForm = () => {

        return (
            <>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">PERSONEL</label>
                    <input className="form-control" type="text" value={selectedStaff.name}
                           onChange={(e) => onValueChangeEvent("name", e.target.value)}/>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">BİRİM</label>
                            <input className="form-control" type="text" value={selectedStaff.unit}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">YETKİ</label>
                            <input className="form-control" type="text" value={selectedStaff.authority}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">DURUM</label>
                            <input className="form-control" type="text" value={selectedStaff.status}/>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">KULLANICI ADI</label>
                            <input className="form-control" type="text" value={selectedStaff.username}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">ŞİFRE</label>
                            <input className="form-control" type="text" value={selectedStaff.password}/>
                        </div>
                    </div>
                </div>




            </>
        )
    }
    return (
        <div className="row">
            <div className="col-8 p-1">
                <div className="card shadow">
                    <h5 className="card-header">PERSONEL LİSTESİ</h5>
                    <div className="card-body">

                        <DataTable/>
                    </div>

                </div>
            </div>
            <div className="col-4 p-1">
                <div className="card shadow">
                    <h5 className="card-header">Personel Bilgi Fişi</h5>
                    <div className="card-body">
                        <DetailForm/>
                    </div>

                </div>

            </div>

        </div>
    )
}