import React, { useState, useEffect } from "react";
import { addToRandomGroup } from "../utils/apicalls";
import { fetchUserData } from "../utils/apicalls";

export default function GroupList({ userId }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function doWork() {
      let res = await fetchUserData(userId);
      if (res.status) {
        setGroups([res.data.groups]);
      }
    }
    doWork();
  }, []);

  const joinRandomGroup = async (e) => {
    let entry = await addToRandomGroup(userId);
    if (entry.status) {
      setGroups([
        ...groups,
        { groupId: entry.groupId, groupName: entry.groupName },
      ]);
    } else {
      alert("Opertion is not Successful");
    }
  };

  if (groups.length === 0) {
    return (
      <div>
        <div className="grey">
          <div className="row">
            <div className="col s10">
              <a
                className="margin-10 waves-effect waves-light btn"
                onClick={joinRandomGroup}
              >
                Join a Random Group
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col s10">
              <a className="margin-10 waves-effect waves-light btn">
                Create a Custom Group
              </a>
            </div>
          </div>
        </div>
        <div className="white newcontainer">
          <div className="center">Join a group now</div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="grey">
          <div className="row">
            <div className="col s10">
              <a
                className="margin-10 waves-effect waves-light btn"
                onClick={joinRandomGroup}
              >
                Join a Random Group
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col s10">
              <a className="margin-10 waves-effect waves-light btn">
                Create a Custom Group
              </a>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}
