//useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
//https://react.vlpt.us/basic/16-useEffect.html

//마운트: 처음 나타났을 때를 의미한다.
//언마운트: 사라질 때를 의미한다.

import React, { useContext } from "react";
//createContext는 React만 있음 메서드로 사용가능, 
//but! useContext는 따로 import 써줘야함
import { UserDispatch } from '../App';

//🔥 export 안 하는 컴포넌트는 이런식으로 정의할 때 감싸버린다.
//컴포넌트 만드는 함수 자체를 감싸고 변수로 만들어버린다.
const User = React.memo(function User({ user }){
    //React.createContext()로 만든 Context를 가져와 쓰기
    //value로 넣었던 dispatch를 가져온다.
    const dispatch = useContext(UserDispatch);

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


    // useEffect(() => {
    //     console.log('user 값이 설정됨');
    //     console.log(user);
    //     return () => {
    //       console.log('user 가 바뀌기 전..');
    //       console.log(user);
    //     };
    // }, [user]);
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
                onClick={()=> {
                    dispatch({type: 'TOGGLE_USER', id: user.id})
                }}
            >
                {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick={() => {
                dispatch({ type: 'REMOVE_USER', id: user.id })
            }}>삭제</button>
        </div>
    )
})

function UserList({ users }){
    
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

export default React.memo(UserList);

/*

Props drilling을 막기위해서 Context API + dispatch를 사용할 수 있다.

🔥 Context API는 프로젝트 안에서 전역적으로 사용 할 수 있는 값을 관리할 수 있다.
이때 값이 꼭 상태를 가르키지 않아도 된다. (함수 외부 라이브러리 인스턴스, DOM 다양하게 가능)

🤔Redux와의 차이
참고: https://egg-programmer.tistory.com/281
사용법과 구조에 차이가 있을 뿐, 유사. (Redux가 Context api기반으로 만들어짐)
리덕스가 미들웨어나 데브툴, 버그리포트 등의 추가 기능 활용도가 높다.
반면, Context는 리액트 내장 기능으로 좀 더 가볍게 상태관리 기능에만 집중해 사용가능하다.


💡 함수를 내려줄 때 useReducer 사용 + dispatch Context로 관리
useReducer 를 사용하면 dispatch 를 Context API 를 사용해서 전역적으로 사용 할 수 있게 해줄 수 있고,
컴포넌트에게 함수를 전달해줘야 하는 상황에서 코드의 구조가 훨씬 깔끔해짐
*/