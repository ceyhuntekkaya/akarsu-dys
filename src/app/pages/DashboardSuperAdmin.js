import {useEffect, useState} from "react";

export default function DashboardSuperAdmin() {
    const DataTable = () => {
        return (
            <section className="intro">
                <div className="bg-image h-100" style={{backgroundColor: "#f5f7fa"}}>
                    <div className="mask d-flex align-items-center h-100">
                        <div className="row justify-content-center">
                            <div className="row">

                                <div className="form-group pb-2">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Search"/>
                                </div>

                                <div className="card">
                                    <div className="card-body p-0">
                                        <div className="table-responsive table-scroll"
                                             style={{position: "relative"}}>
                                            <table className="table table-striped mb-0">
                                                <thead style={{backgroundColor: "#002d72"}}>
                                                <tr>
                                                    <th scope="col">institution_name</th>
                                                    <th scope="col">institution_type</th>
                                                    <th scope="col">student_count</th>
                                                    <th scope="col">package</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>Like a butterfly</td>
                                                    <td>Boxing</td>
                                                    <td>9:00 AM - 11:00 AM</td>
                                                    <td>Aaron Chapman</td>
                                                </tr>
                                                <tr>
                                                    <td>Mind &amp; Body</td>
                                                    <td>Yoga</td>
                                                    <td>8:00 AM - 9:00 AM</td>
                                                    <td>Adam Stewart</td>
                                                </tr>
                                                <tr>
                                                    <td>Crit Cardio</td>
                                                    <td>Gym</td>
                                                    <td>9:00 AM - 10:00 AM</td>
                                                    <td>Aaron Chapman</td>
                                                </tr>
                                                <tr>
                                                    <td>Wheel Pose Full Posture</td>
                                                    <td>Yoga</td>
                                                    <td>7:00 AM - 8:30 AM</td>
                                                    <td>Donna Wilson</td>
                                                </tr>
                                                <tr>
                                                    <td>Playful Dancer's Flow</td>
                                                    <td>Yoga</td>
                                                    <td>8:00 AM - 9:00 AM</td>
                                                    <td>Donna Wilson</td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const DetailForm = () => {

        return (
            <>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"
                           aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                        anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="text" className="form-control" id="exampleInputPassword1"
                           placeholder="Password"/>
                </div>


            </>
        )
    }
    return (
        <div className="row">
            <div className="col-8 p-1">
                <div className="card shadow">
                    <h5 className="card-header">institution_list</h5>
                    <div className="card-body">

                        <DataTable/>
                    </div>

                </div>
            </div>
            <div className="col-4 p-1">
                <div className="card shadow">
                    <h5 className="card-header">Featured</h5>
                    <div className="card-body">
                        <DetailForm/>
                    </div>

                </div>

            </div>

        </div>
    )
}