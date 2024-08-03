import {useEffect, useState} from "react";

export default function SearchDocuments (){
    const[data, setData] = useState();
    useEffect(() => {

    }, []);


    return (
        <section className="intro">
            <div className="bg-image h-100" style={{backgroundColor: "#f5f7fa;"}}>
                <div className="mask align-items-center h-100">
                    <div className="row justify-content-center">
                        <div className="row">

                            <div className="form-group pb-2">
                                <input type="text" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Search"/>
                            </div>

                            <div className="card">
                                <div className="card-body p-0">
                                    SearchDocuments
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}