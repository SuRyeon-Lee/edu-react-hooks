//useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
//https://react.vlpt.us/basic/16-useEffect.html

//마운트: 처음 나타났을 때를 의미한다.
//언마운트: 사라질 때를 의미한다.

import React from "react";

function User({user}){
    return (
        <div>
            <b>{user.username}</b> ({user.email})
        </div>
    )
}

function UserList({users}){
    
    return (
        <>
            <div>
                {users.map(user => (
                    <User user={user} key={user.id}/>
                ))}
            </div>
        </>
    )
}

export default UserList