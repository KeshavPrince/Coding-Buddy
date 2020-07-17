import React from 'react'

export default function Avatar({ group, showName }) {
    return (
        <div className="avatar-component">
            <img className="avatar" src={group.avatar} alt="" />
            {showName && <h3 className="avatar-title">{group.name}</h3>}
        </div>
    )
}