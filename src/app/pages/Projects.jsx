import * as React from "react";
import {useApi} from "../../service/useApi";
import {useContext, useEffect} from "react";
import {AppContext} from "../../context/AppContextProvider";
import {UserContext} from "../../context/UserContextProvider";

export default function Projects() {
  const [data, setData] = useApi(null);
  const appContext = useContext(AppContext);
  const {appState} = appContext;

  const userContext = useContext(UserContext);
  const {userInformation} = userContext;


  useEffect(() => {
    if (data === null) {
      setData("my-documents", userInformation?.id).then(r => null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const DataTable = () => {
    return (
        <div className="col-8 p-1">
          <div className="card shadow p-0">
            <h5 className="card-header">Evrak Listesi</h5>
            <div className="card-body">
              <div className="bg-image h-100" style={{backgroundColor: "#f5f7fa"}}>
                <input type="text" className="form-control" id="exampleInputEmail1"
                       aria-describedby="emailHelp" placeholder="Search"/>
               ceyhun

              </div>
            </div>

          </div>
        </div>
    )
  }

  const DetailForm = () => {

    return (
        <div className="col-4 p-1">
          <div className="card shadow">
            <h5 className="card-header">Detay ve İşlemler</h5>
            <div className="card-body">
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
            </div>

          </div>
        </div>
    )
  }
  return (
      <>
        <div className="row">
          <div className="card border-0 shadow rounded">
            <h5 className="card-header">
              Evraklarım
            </h5>
          </div>
        </div>
        <div className="row w-100 py-2">
          <DataTable/>
          <DetailForm/>
        </div>
      </>
  )
}