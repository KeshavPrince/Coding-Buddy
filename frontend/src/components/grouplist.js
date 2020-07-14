import React, { useState, useEffect }  from "react";
import { addToRandomGroup } from "../utils/apicalls";
import { getFromStorage } from "../utils/storage";

export default function GroupList({userId}) {

    const [groups, setGroups] = useState([]);

    useEffect(() => {

       // fetch groups
       
    }, []);

    const joinRandomGroup = (e) => {
        addToRandomGroup(getFromStorage('Coding-Buddy_userId'));
    }

    if(groups.length == 0) {
        return (
            <div>
            <div className = "grey">
                <div className = "row">
                <div className = "col s10">
                <a className="margin-10 waves-effect waves-light btn" onClick = {joinRandomGroup}>Join a Random Group</a>
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