//useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
//https://react.vlpt.us/basic/16-useEffect.html

//마운트: 처음 나타났을 때를 의미한다.
//언마운트: 사라질 때를 의미한다.

import React, {useEffect} from "react";

function User({user, onRemove, onToggle}){
    /*
    🔥 useEffect 에서 return 하는 함수 = cleanup 함수
    useEffect 에 대한 뒷정리를 해준다.
    🔥 deps가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup 함수가 호출된다!

    아래의 코드에선 삭제버튼을 눌렀을때 cleanup 함수가 실행되고
    새로 추가되면 리턴 문 전에 있는 함수가 실행된다.
    */
    // useEffect(() => {
    //     console.log('컴포넌트가 화면에 나타남');
    //     return () => {
    //       console.log('컴포넌트가 화면에서 사라짐');
    //     };
    // }, []); //deps(dependency array) 가 빈배열 : 컴포넌트가 처음 나타날때에만 호출


    useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
          console.log('user 가 바뀌기 전..');
          console.log(user);
        };
    }, [user]);
    //🔥 useEffect 안에서 사용하는 상태나, props 가 있다면, useEffect 의 deps 에 넣어줘야 한다.
    /*
        🤔 deps(dependency array) 가 빈배열 아닐때
        useEffect함수는 언제 호출될까?

        1. 컴포넌트가 처음 마운트 될때
        2. 지정한 값이 바뀔 때
        3. 컴포넌트가 언마운트 될때
        4. 지정한 값이 바뀌기 직전
    */

    return (
        <div>
            <b
                //🔥 인라인 스타일은 객체로 넣어야 한다.  
                style={{
                    cursor: 'pointer',
                    // user.active의 상태에 따라 색을 바꿈
                    color: user.active ? 'green' : 'black'
                }}
                onClick={()=>onToggle(user.id)}
            >
                {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    )
}

function UserList({users, onRemove, onToggle}){
    
    return (
        <>
            <div>
                {users.map(user => (
                    <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>
                ))}
            </div>
        </>
    )
}

export default UserList