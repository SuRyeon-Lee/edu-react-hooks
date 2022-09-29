// 여러개의 input 상태 관리하기 (https://react.vlpt.us/basic/09-multiple-inputs.html)
import ManyInputs from './lesson/ManyInputs'

import {useRef, useState} from "react";
import UserList from './lesson/UserList'
import CreateUser from './lesson/CreateUser';

function App() {
  //Input 처리하는 친구들
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  //기존에 쌓여있던 더미 데이터
  const [users, setUsers] = useState([
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
  ])

  /*
    🔥 useRef의 두가지 기능

      https://react.vlpt.us/basic/12-variable-with-useRef.html

    1. 특정 DOM을 선택해야 할 때
    2. 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리

    일반 함수였다면
    let nexId = 4
    const onCreate = () => {
      nexId += 4
    }
    이렇게 했을텐데 리액트 컴포넌트에선 이런식이 안된다.
    뇌리를 스쳐가는 순수함수의 원칙...🤔
    이럴때 이런걸 할 수 있게 해주는게 useRef()
    그냥 지금당장 랜더링할때는 필요하지 않은데, 
    변수로 저장해놨다가 이래저래 일이 발생하면 이걸로 뭘 처리해줘야하는 변수
    결과가 아니라 과정에서 필요한, state 지정하기 애매한  변수!
    외부에 선언하고 내부에서 바꾸는 순수함수에 위배되는 변수!!
    그걸 처리하는 개념인듯
  */

  const nextId = useRef(4);
  // let nextId = 4; 이런식으로 해보니까 제대로 변수가 처리되지 않더라
  const onCreate = () => {
    // 배열에 항목 추가하는 로직
    const user = {
      id: nextId.current, //useRef로 저장해둔 외부변수 current로 빼온다.
      username,
      email
    };
    setUsers([...users, user]);
    //setUsers(users.concat(user)); 이렇게 concat써도 됨(새로운배열)


    setInputs({
      username: '',
      email: ''
    });

    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const onToggle = id => {
    setUsers(users.map((user) => 
      user.id === id ?  { ...user, active: !user.active } : user
    ))
  }

  return (
    <>
     {/* <ManyInputs/> */}

     {/* Input추가 관련 컴포넌트 */}
     <CreateUser
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
     />

     {/* 기존에 쌓여있던 더미 데이터 뿌리기 */}
     <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>
  );
}

export default App;
