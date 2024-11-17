import {useContext, useEffect, useState} from "react";
import {useApi} from "../../service/useApi";
import {UserContext} from "../../context/UserContextProvider";
import ActiveDocuments from "./parts/ActiveDocuments";
import DocumentDetail from "./parts/DocumentTabs";
import * as React from "react";
import SearchDocuments from "./SearchDocuments";



export default function Archive() {



    return (
       <SearchDocuments archive={true}/>
    )
}