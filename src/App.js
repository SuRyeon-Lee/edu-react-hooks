import React from "react";
import {useMemo, useReducer} from "react";
import UserList from './lesson/UserList'
import CreateUser from './lesson/CreateUser';
import produce from 'immer';
/*
🔥immer
리액트에서 배열이나 객체를 업데이트 해야 할 때
직접 수정하면 안되고 불변성을 지켜야 한다.
이때 깊이가 깊어질 수록, 예를 들어서 객체안에 객체가 있고 배열이 있고.. 등등
객체를 immutable하게 복사해오는데 어려울 수 있다.

이때 immer를 사용하면 안심하고 편하게 복사해서 배열을 사용할 수 있다.

🔥어떤때에 immer를 사용할까?
깊이가 깊은 객체가 아니라면 그냥 immer없이 사용하는 것이 더 편하다.
깊이가 많이 깊어지면 사용한다.
그리고 한 프로젝트 안에서도 복잡해 질때만 immer를 사용하고 오히려 길어질 경우는 사용하지 않는다.
"무조건 사용을 하진 마시고, 가능하면 데이터의 구조가 복잡해지게 되는 것을 방지하세요. 
그리고 어쩔 수 없을 때 Immer 를 사용하는것이 좋습니다. 
Immer 를 사용한다고 해도, 필요한곳에만 쓰고, 
간단히 처리 될 수 있는 곳에서는 그냥 일반 JavaScript 로 구현하시길 바랍니다."

📌설치
npm install immer
📌임포트
import produce form 'immer'

더많은 사용법
https://react.vlpt.us/basic/23-immer.html

*/

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {

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

function reducer(state, action) {
  switch(action.type) {
    case 'CREATE_USER' :
      // return {
      //   inputs: initialState.inputs,
      //   users: state.users.concat(action.user)
      // }
      return produce(state, draft => {
        //🔥immer사용하기
        //state를 draft로 복하새 편집한 후 다시 설정해준다.
        //객체를 자동으로 복사해주기 때문에 거기에 편하게 mutate하면 된다.
        draft.users.push(action.user);
      })
    case 'TOGGLE_USER' :
      // 💡 이 부분 말고는 immer를 사용해서 더 복잡해졌다.
      // return {
      //   ...state,
      //   users: state.users.map(user => 
      //     user.id === action.id ? {...user, active: !user.active} : user)
      // }
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      })
    case 'REMOVE_USER' :
      // return {
      //   ...state,
      //   users: state.users.filter(user => user.id !== action.id)
      // };
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index,1);
      })
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { users } = state; 

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <UserDispatch.Provider value={dispatch}>
        <CreateUser/>
        <UserList users={users}/>
        <div>활성사용자 수 : {count}</div>
      </UserDispatch.Provider>
    </>
  );
}

export default App;