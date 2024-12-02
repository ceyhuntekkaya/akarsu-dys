import {useEffect, useState} from "react";
import {useApi} from "../../service/useApi";
import * as React from "react";


const baseValueAuthorityForm = {
    fileSearch: false,
    archive: false,
    scan: false,
    admin: false,
    text: false,
    project: false,
    delete: false

}


const baseValueStaff = {
    id: 0,
    name: "",
    unit: "",
    username: "",
    password: "",
    status: false,
    authority: 0

}
export default function Admin() {
    const [staffs, setStaffs] = useApi(null);
    const [, setAction] = useApi(null);
    const [selectedStaff, setSelectedStaff] = useState(baseValueStaff);
    const [tableHeight, setTableHeight] = useState('400px');

    const [authority, setAuthority] = useApi(null);
    const [selectedAuthority, setSelectedAuthority] = useState(null);


    useEffect(() => {

        setStaffs("staff", 0).then(r => null)

        const calculateHeight = () => {
            const windowHeight = window.innerHeight;
            const availableHeight = windowHeight - 350;
            setTableHeight(`${availableHeight}px`);
        };
        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        return () => window.removeEventListener('resize', calculateHeight);
    }, []);




    const eventHandler = (e, staff) => {
        e.preventDefault()

        setSelectedStaff(staff)
        setAuthority("getAuthority", staff.id).then(r => null)
    };

    const makeAuthorize = (value) => {


        if (value === 0) {
            return "Personel"
        }
        if (value === 1) {
            return "Proje Personeli"
        }
        if (value === 2) {
            return "Proje Koordinatörü"
        }
        return "Yönetim"
    }

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
                                            onClick={(e) => eventHandler(e, staff)}>
                                            <th scope="row">{staff.name}</th>
                                            <td>{staff.unit}</td>
                                            <td>{makeAuthorize(staff.authority)}</td>
                                            <td>{staff.status ? "" : "Arşiv"}</td>
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

    const onValueChangeEvent = (prop, value, type = 'input') => {
        if (type === 'select') {
            setSelectedStaff({...selectedStaff, [prop]: value});
            return;
        }
        const newValue = type === 'checkbox' ? !selectedStaff[prop] : value;
        setSelectedStaff(prev => ({...prev, [prop]: newValue}));
    }


    const DetailForm = () => {


        return (
            <>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">PERSONEL</label>
                    <input className="form-control" type="text"
                           value={selectedStaff.name}
                           onChange={e => onValueChangeEvent("name", e.target.value)}/>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">BİRİM</label>
                            <select className="form-control"
                                    value={selectedStaff.unit}
                                    onChange={(e) => onValueChangeEvent("unit", e.target.value)}>
                                <option selected value=""></option>
                                <option value="PROJE">PROJE</option>
                                <option value="PLANLAMA">PLANLAMA</option>
                                <option value="DESTEK">DESTEK</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">YETKİ</label>
                            <select className="form-control"
                                    value={selectedStaff.authority}
                                    onChange={(e) => onValueChangeEvent("authority", e.target.value)}>
                                <option selected value=""></option>
                                <option value="0">Personel</option>
                                <option value="1">Proje Personeli</option>
                                <option value="2">Proje Koordinatörü</option>
                                <option value="3">Yönetim</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">KULLANICI ADI</label>
                            <input className="form-control" type="text" value={selectedStaff.username}
                                   onChange={(e) => onValueChangeEvent("username", e.target.value)}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">ŞİFRE</label>
                            <input className="form-control" type="password" value={selectedStaff.password}
                                   onChange={(e) => onValueChangeEvent("password", e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">DURUM</label>
                            <input className="form-check-input" type="checkbox" checked={selectedStaff.status}
                                   onChange={(e) => onValueChangeEvent("status", e.target.value)}/>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <button className="col btn btn-success m-2" onClick={updateUser}>GÜNCELLE</button>
                    <button className="col btn btn-info m-2" onClick={addUser}>YENİ KAYIT</button>
                    <button className="col btn btn-danger m-2" onClick={deleteUser}>SİL</button>
                </div>


            </>
        )
    }


    const addAuthority = () => {

        if (selectedAuthority) {
            setAction("updateAuthority", {
                userId: selectedStaff.id,
                authority: selectedAuthority.name,
                operation: true
            }).then(r => setAuthority("getAuthority", selectedStaff.id).then(r => null))
        }
    }

    const removeAuthority = () => {

        if (selectedAuthority) {
            setAction("updateAuthority", {
                userId: selectedStaff.id,
                authority: selectedAuthority.name,
                operation: false
            }).then(r => setAuthority("getAuthority", selectedStaff.id).then(r => null))
        }
    }

    const addUser = () => {
        selectedStaff.id = null
        setAction("addUser", selectedStaff).then(r => setStaffs("staff", 0).then(r => null))
    }

    const updateUser = () => {
        if (selectedStaff) {

            if (selectedStaff.status === "on") selectedStaff.status = true
            else selectedStaff.status = false
            setAction("updateUser", selectedStaff).then(r => setStaffs("staff", 0).then(r => null))
        }
    }
    const deleteUser = () => {
        if (selectedStaff) {
            setAction("deleteUser", selectedStaff?.id).then(r => setStaffs("staff", 0).then(r => null))
        }
    }

    const makeAuthorityForm = (value) => {

        if (value === true) return "Yetkili"
        else return "-"
    }

    const authorityForm = () => {

        return (
            <div className="row">
                <div className="table table-responsive table-hover">
                    <table className="table table-striped mb-0">
                        <thead>
                        <tr>
                            <th scope="col">Yetki Adı</th>
                            <th scope="col">Değer</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            style={{backgroundColor: selectedAuthority ? selectedAuthority.key === 1 ? "#999" : "" : ""}}
                            onClick={(e) => setSelectedAuthority({key: 1, name: "fileSearch"})}>
                            <th scope="row">Evrak Arama</th>
                            <td>{makeAuthorityForm(authority.fileSearch)}</td>
                        </tr>
                        <tr
                            style={{backgroundColor: selectedAuthority ? selectedAuthority.key === 2 ? "#999" : "" : ""}}
                            onClick={(e) => setSelectedAuthority({key: 2, name: "archive"})}>
                            <th scope="row">Arşiv Arama</th>
                            <td>{makeAuthorityForm(authority.archive)}</td>
                        </tr>
                        <tr
                            style={{backgroundColor: selectedAuthority ? selectedAuthority.key === 3 ? "#999" : "" : ""}}
                            onClick={(e) => setSelectedAuthority({key: 3, name: "scan"})}>
                            <th scope="row">Evrak Tarama</th>
                            <td>{makeAuthorityForm(authority.scan)}</td>
                        </tr>
                        <tr
                            style={{backgroundColor: selectedAuthority ? selectedAuthority.key === 4 ? "#999" : "" : ""}}
                            onClick={(e) => setSelectedAuthority({key: 4, name: "admin"})}>
                            <th scope="row">Admin Panel</th>
                            <td>{makeAuthorityForm(authority.admin)}</td>
                        </tr>
                        <tr
                            style={{backgroundColor: selectedAuthority ? selectedAuthority.key === 5 ? "#999" : "" : ""}}
                            onClick={(e) => setSelectedAuthority({key: 5, name: "text"})}>
                            <th scope="row">Yazı Oluşturma</th>
                            <td>{makeAuthorityForm(authority.text)}</td>
                        </tr>
                        <tr
                            style={{backgroundColor: selectedAuthority ? selectedAuthority.key === 6 ? "#999" : "" : ""}}
                            onClick={(e) => setSelectedAuthority({key: 6, name: "project"})}>
                            <th scope="row">Proje Tanımlama</th>
                            <td>{makeAuthorityForm(authority.project)}</td>
                        </tr>
                        <tr
                            style={{backgroundColor: selectedAuthority ? selectedAuthority.key === 7 ? "#999" : "" : ""}}
                            onClick={(e) => setSelectedAuthority({key: 7, name: "delete"})}>
                            <th scope="row">Evrak Silme</th>
                            <td>{makeAuthorityForm(authority.delete)}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="row">
                        <button className="col btn btn-success m-2" onClick={addAuthority}>+</button>
                        <button className="col btn btn-danger m-2" onClick={removeAuthority}>-</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="row mx-1">
            <div className="col-8 p-1">
                <div className="card shadow">
                    <h5 className="card-header">PERSONEL LİSTESİ</h5>
                    <div className="card-body" style={{
                        height: tableHeight, overflowY: 'auto'
                    }}>

                        <DataTable/>
                    </div>

                </div>
            </div>
            <div className="col-4 p-1">
                <div className="card shadow">
                    <h5 className="card-header">Personel Bilgi Fişi</h5>
                    <div className="card-body">
                        {
                            DetailForm()
                        }

                    </div>

                </div>
                <br/><br/>
                <div className="card shadow">
                    <h5 className="card-header">Personel Yetkileri</h5>
                    <div className="card-body">
                        {authority ? authorityForm() : null}
                    </div>

                </div>


            </div>

        </div>
    )
}