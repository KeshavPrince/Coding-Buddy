import React, { useState, useEffect } from "react";
import { getFromStorage } from "../utils/storage";
import { verifyToken } from "../utils/apicalls";
import { Redirect } from "react-router-dom";
import Avatar from "./avatar";
import GroupBox from "./groupbox";
import Search from "./search";
import { fetchUserData } from "../utils/apicalls";
import { addToRandomGroup } from "../utils/apicalls";
import { addToCustomGroup } from "../utils/apicalls";

export default function Home() {
  let [redirectSignIn, setReDirectSignIn] = useState("");
  let [redirectSignInBool, setReDirectSignInBool] = useState(false);
  let [mainUser, setMainUser] = useState("");
  let [userId, setUserId] = useState('');
  let [search, setSearch] = useState('')
  let [groups, setGroups] = useState([]);
  let [groupSelected, setGroupSelected] = useState('');

  useEffect(() => {
    function init (){
      let value = getFromStorage("Coding-Buddy_token");
      if (value) {
        verifyToken(value)
          .then((res) => {
            if (res) {
              let Id = getFromStorage("Coding-Buddy_userId");
              setUserId(Id);
              fetchUserData(Id)
                .then((res) => {
                  let userData = res.data;
                  console.log(userData.groups);
                  setGroups(userData.groups);
                })
                .catch((err) => console.log(err));
            } else {
              setReDirectSignIn("/authenticate/signin");
              setReDirectSignInBool(true);
            }
          })
          .catch((err) => (console.log(err)));
      } else {
        console.log("No Such Token Exist");
        setReDirectSignInBool(true);
        setReDirectSignIn("/authenticate/signin");
      }
    };
    init();
  }, []);

  const joinRandomGroup = () => {
    addToRandomGroup(userId).then( (entry) => {
      if(entry.status) {
        setGroups([...groups, {id : entry.groupId, name : entry.groupName, avatar : entry.avatar, messages : ['hi there']}])
      }
    else {
        alert('Opertion is not Successful');
    }
    }).catch( (err) => console.log(err));
  }

  const joinCustomGroup = () => {
    addToCustomGroup(userId).then( (entry) => {
      if(entry.status) {
        console.log(entry);
        setGroups([...groups, {id : entry.groupId, name : entry.groupName, avatar : entry.avatar, messages : ['hi there']}])
      }
    else {
        alert('Opertion is not Successful');
    }
    }).catch( (err) => console.log(err));
  }
  
  if (redirectSignInBool) {
    return <Redirect to={redirectSignIn} />;
  } else {
    return   <div className="app">
    <aside>
        <header>
            <Avatar group={mainUser} />
            <button onClick = {joinRandomGroup}>Join Random Group</button>
            <button onClick = {joinCustomGroup}>Join Custom Group</button>
        </header>
        <Search search={search} setSearch={setSearch} />
        <div className="contact-boxes">
            {groups.map((cur) => (
                <GroupBox
                    group={cur}
                    key={cur._id}
                    setGroupSelected={setGroupSelected}
                    messages={cur.messages}
                />
            ))}
        </div>
    </aside>
    {/* {contactSelected.id ? (
        <main>
            <header>
                <Avatar user={contactSelected} showName />
            </header>
            <MessagesBox messages={currentMessages} />
            <ChatInputBox message={message} setMessage={setMessage} pushMessage={pushMessage} />
        </main>
    ) : (
        <Welcome />
    )} */}
</div>;
  }
}
