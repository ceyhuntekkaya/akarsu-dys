import FormSelect from "../../general/components/FormSelect";
import React, { useEffect } from "react";
import { useApi } from "../../../service/useApi";
import { useInput } from "../../../service/useInput";
import FormInput from "../../general/components/FormInput";

const userDetail = {
  id: "",
  identityNumber: "",
  password: "",
  loginCode: "",
  loginCodeLastTime: 0,
  role: "ADMIN",
  status: "WORKING",
  phone: "",
  name: "",
  lastname: "",
  email: "",
  lastLoginTime: 0,
};
const staffDetail = {
  schools: [],
  grades: [],
};

export default function AddSystemUser(props) {
  const [dataList, setDataList] = useApi([]);
  const [staff, setStaff] = useApi([]);
  const [inputs, setInputs] = useInput(userDetail);
  const [staffInputs, setStaffInputs] = useInput(staffDetail);

  useEffect(() => {
    if (props.user) {
      setInputs(props.user);
    }
    if (props.staff) {
      setStaffInputs(props.staff);
    }
  }, [props]);

  useEffect(() => {}, [staff]);

  const handleSaveStaff = (e) => {
    e.preventDefault();
    setStaff("addUser", {
      body: {
        user: inputs,
        staff: staffInputs,
      },
    });
    setDataList("findAllAdmin", {});
  };

  return (
    <>
      <div className="my-3">
        {props.user ? <h5>Kullanıcı düzenle</h5> : <h5>Kullanıcı ekle</h5>}
      </div>
      <div className="row p-4">
        <FormInput
          name="identityNumber"
          text="Kimlik Numarası"
          placeholder="Kimlik Numarası"
          type="number"
          col="6"
          value={inputs.identityNumber}
          onChange={setInputs}
        />

        <FormInput
          name="name"
          text="İsim"
          placeholder="İsim"
          type="text"
          col="6"
          value={inputs.name}
          onChange={setInputs}
        />

        <FormInput
          name="lastname"
          text="Soyisim"
          placeholder="Soyisim"
          type="text"
          col="6"
          value={inputs.lastname}
          onChange={setInputs}
        />

        <FormInput
          name="email"
          text="E-Mail"
          placeholder="E-Mail"
          type="text"
          col="6"
          value={inputs.email}
          onChange={setInputs}
        />
        <div className="col-6">
          <div className="d-flex flex-row">
            <div className="1" style={{ marginTop: 40, marginRight: 10 }}>
              <p>+90</p>
            </div>
            <div className="col">
              <FormInput
                name="phone"
                text="Telefon"
                placeholder="Telefon"
                type="text"
                col="12"
                value={inputs.phone}
                onChange={setInputs}
              />
            </div>
          </div>
        </div>

        <button
          className="btn btn-success text-light  mx-2"
          onClick={handleSaveStaff}
        >
          Kaydet
        </button>
      </div>
    </>
  );
}
