import React, { useState, useEffect }  from "react";
import { getGroups } from "../utils/apicalls";

export default function GroupList({userId}) {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroups(userId).then((res) => {
            if(res.status) {
                setGroups(res.groupList);
            }
            else {
                console.log('error');
            }
        }).catch(err => console.log(err));
    }, []);

    if(groups.length == 0) {
        return (
            <div>
            <div className = "grey">
                <div className = "row">
                <div className = "col s10">
                <a className="margin-10 waves-effect waves-light btn" >Join a Random Group</a>
                </div>
                </div>
                <div className = "row">
                <div className = "col s10">
                <a className="margin-10 waves-effect waves-light btn">Create a Custom Group</a>
                </div>
                </div>
            </div>
            <div className = "white newcontainer">
            <div className = "center">Join a group now</div>
            </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
            </div>
        );
    }
}