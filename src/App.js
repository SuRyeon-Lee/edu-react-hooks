// 여러개의 input 상태 관리하기 (https://react.vlpt.us/basic/09-multiple-inputs.html)
import ManyInputs from './lesson/ManyInputs'
import React from "react";
import {useRef, useState, useMemo, useCallback, useReducer} from "react";
import UserList from './lesson/UserList'
import CreateUser from './lesson/CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

/* 
기존에 App 컴포넌트 안에 들어있던
input의 내용들을 객체로 관리하던 input state와
user 목록을 객체들이 묶인 베열로 관리하던 users state

이 input과 users state들을 하나의 객체로 묶어본다.
마치 class 컴포넌트에서 state를 관리하는 것처럼 설정해준다.
*/
const initialState = {
  //🔥 이제 inputs와 관련된 값은 useInputs 커스텀 훅에서 관리
  // inputs: {
  //   username: '',
  //   email: ''
  // },

  users:[
    {
        id: 1,
        username: '칠칠이',
        email: 'cute772@zoogle.com',
        active: true
    },
    {
        id: 2,
        username: '밥좀주소',
        email: 'BabJwo@zoogle.com',
        active: false
    },
    {
        id: 3,
        username: '대식곰',
        email: 'salmonHunter@zoogle.com',
        active: false
    },
  ]
}

function reducer(state, action) { //이제 state를 바꾸던 함수로직들이 모두 reducer로 관리됨
  switch(action.type) {
    //🔥 이제 inputs와 관련된 값은 useInputs 커스텀 훅에서 관리
    // case 'CHANGE_INPUT' : //기존의 onChange함수
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value //새로들어온 action.name과 action.value로 기존 state바꿈
    //     }
    //   }
    case 'CREATE_USER' :
      return {
        inputs: initialState.inputs, //새로 추가한 후에는 input칸 비워주기
        users: state.users.concat(action.user)
      }
    case 'TOGGLE_USER' :
      return {
        ...state,
        users: state.users.map(user => 
          //action의 id와 일치하는 배열의 원소 객체면 active상태바꿔주고, 불일치하면 그냥 user그대로 넣어주기
          user.id === action.id ? {...user, active: !user.active} : user)
      }
    case 'REMOVE_USER' :
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id) //action의 id와 같지 않은 것만 골라주기
      };
    default:
      return state;
  }
}

//🔥 컴포넌트 바깥에 Context를 만들고 변수로 할당한다.
//React.createContext( 값을 따로 지정하지 않을 경우 사용되는 기본 값 )
//export는 다른 외부 파일에서도 접근할 수 있도록 하기 위해서
export const UserDispatch = React.createContext(null)

function App() {
  // [{바뀐 state값}, onChange함수, reset함수]
  const [{ username, email}, onChange, reset] = useInputs({
    username: '',
    email: '',
  })
  const [state, dispatch] = useReducer(reducer, initialState)
  const nextId = useRef(4);

  const { users } = state; //initial state의 구조 = {users:[{},{}], inputs:{username:valuem email:vlaue}}
  
  //🔥 이제 inputs와 관련된 값은 useInputs 커스텀 훅에서 관리
  // const { username, email } = state.inputs;
  // const onChange = useCallback(e => { //useCallback으로 함수는 처음 한번 만들어놓고 꺼내다 쓰겠다 결정!
  //   const { name,value } = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   })
  // }, [])

  const onCreate = useCallback(e => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  }, [username, email]);

  const  onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    }) 
    //기존의 set함수 쓸땐, 이전 state값을 참조하기 위해서 함수형으로 set함수 작성했어야 했다.
    //하지만 이젠 로직을 분리해서 reducer에서 관리하기 때문에, 그런 지저분한 부분들을 다 떨굴 수 있다.
  }, [])

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    })
  }, [])
  
  //활성 사용자수 세기
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
    {/* 
      🔥 UserDispatch 라는 Context를 감싸 어디서든 dispatch를 꺼내 쓸 수 있도록 준비해줌 
      Context를 만들면 이 Context안에 Provider라는 컴포넌트가 들어있는데,
      이 Provider를 통해서 Context의 값을 정할 수 있다.

      value는 전역으로 관리할 값을 넣어준다.
      useReducer로 App의 state업데이트 로직 관리하고,
      그 로직 함수를 자식 컴포넌트한테 props drilling으로 물려주고 있는데,
      💡 액션을 보내서 state를 업데이트하는 dispatch 함수 자체를 전역으로 관리하면
      드릴링이 필요없을 것이다!

    */}
      <UserDispatch.Provider value={dispatch}>
        <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
        <UserList users={users}/>
        <div>활성사용자 수 : {count}</div>
      </UserDispatch.Provider>
    </>
  );
}

export default App;

/*

🔥useReducer vs useState - 뭐 쓸까?

useState: 
-컴포넌트에서 관리하는 값이 딱 하나일 때
-그 값이 단순한 숫자,문자열 또는 boolean 값일 때

useReducer:
-컴포넌트에서 관리하는 값이 여러개가 되어서 상태의 구조가 복잡해질 때


만약 set함수를 한 함수에서 여러번 사용해야 하는 일이 발생한다면
하나의 동작으로 여러개의 state를 변경해야하는 복잡한 로직이므로
reducer로 깔끔하게 밖에 정의하면 어떨까? 고민해보기
useReducer로 쓰는게 더 편할 것 같다면 써보기

*/ 