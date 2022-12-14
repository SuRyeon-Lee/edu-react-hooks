import React from "react";
import {useMemo, useReducer} from "react";
import UserList from './lesson/UserList'
import CreateUser from './lesson/CreateUser';
import produce from 'immer';
/*
๐ฅimmer
๋ฆฌ์กํธ์์ ๋ฐฐ์ด์ด๋ ๊ฐ์ฒด๋ฅผ ์๋ฐ์ดํธ ํด์ผ ํ  ๋
์ง์  ์์ ํ๋ฉด ์๋๊ณ  ๋ถ๋ณ์ฑ์ ์ง์ผ์ผ ํ๋ค.
์ด๋ ๊น์ด๊ฐ ๊น์ด์ง ์๋ก, ์๋ฅผ ๋ค์ด์ ๊ฐ์ฒด์์ ๊ฐ์ฒด๊ฐ ์๊ณ  ๋ฐฐ์ด์ด ์๊ณ .. ๋ฑ๋ฑ
๊ฐ์ฒด๋ฅผ immutableํ๊ฒ ๋ณต์ฌํด์ค๋๋ฐ ์ด๋ ค์ธ ์ ์๋ค.

์ด๋ immer๋ฅผ ์ฌ์ฉํ๋ฉด ์์ฌํ๊ณ  ํธํ๊ฒ ๋ณต์ฌํด์ ๋ฐฐ์ด์ ์ฌ์ฉํ  ์ ์๋ค.

๐ฅ์ด๋ค๋์ immer๋ฅผ ์ฌ์ฉํ ๊น?
๊น์ด๊ฐ ๊น์ ๊ฐ์ฒด๊ฐ ์๋๋ผ๋ฉด ๊ทธ๋ฅ immer์์ด ์ฌ์ฉํ๋ ๊ฒ์ด ๋ ํธํ๋ค.
๊น์ด๊ฐ ๋ง์ด ๊น์ด์ง๋ฉด ์ฌ์ฉํ๋ค.
๊ทธ๋ฆฌ๊ณ  ํ ํ๋ก์ ํธ ์์์๋ ๋ณต์กํด ์ง๋๋ง immer๋ฅผ ์ฌ์ฉํ๊ณ  ์คํ๋ ค ๊ธธ์ด์ง ๊ฒฝ์ฐ๋ ์ฌ์ฉํ์ง ์๋๋ค.
"๋ฌด์กฐ๊ฑด ์ฌ์ฉ์ ํ์ง ๋ง์๊ณ , ๊ฐ๋ฅํ๋ฉด ๋ฐ์ดํฐ์ ๊ตฌ์กฐ๊ฐ ๋ณต์กํด์ง๊ฒ ๋๋ ๊ฒ์ ๋ฐฉ์งํ์ธ์. 
๊ทธ๋ฆฌ๊ณ  ์ด์ฉ ์ ์์ ๋ Immer ๋ฅผ ์ฌ์ฉํ๋๊ฒ์ด ์ข์ต๋๋ค. 
Immer ๋ฅผ ์ฌ์ฉํ๋ค๊ณ  ํด๋, ํ์ํ๊ณณ์๋ง ์ฐ๊ณ , 
๊ฐ๋จํ ์ฒ๋ฆฌ ๋  ์ ์๋ ๊ณณ์์๋ ๊ทธ๋ฅ ์ผ๋ฐ JavaScript ๋ก ๊ตฌํํ์๊ธธ ๋ฐ๋๋๋ค."

๐์ค์น
npm install immer
๐์ํฌํธ
import produce form 'immer'

๋๋ง์ ์ฌ์ฉ๋ฒ
https://react.vlpt.us/basic/23-immer.html

*/

function countActiveUsers(users) {
  console.log('ํ์ฑ ์ฌ์ฉ์ ์๋ฅผ ์ธ๋์ค...');
  return users.filter(user => user.active).length;
}

const initialState = {

  users:[
    {
        id: 1,
        username: '์น ์น ์ด',
        email: 'cute772@zoogle.com',
        active: true
    },
    {
        id: 2,
        username: '๋ฐฅ์ข์ฃผ์',
        email: 'BabJwo@zoogle.com',
        active: false
    },
    {
        id: 3,
        username: '๋์๊ณฐ',
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
        //๐ฅimmer์ฌ์ฉํ๊ธฐ
        //state๋ฅผ draft๋ก ๋ณตํ์ ํธ์งํ ํ ๋ค์ ์ค์ ํด์ค๋ค.
        //๊ฐ์ฒด๋ฅผ ์๋์ผ๋ก ๋ณต์ฌํด์ฃผ๊ธฐ ๋๋ฌธ์ ๊ฑฐ๊ธฐ์ ํธํ๊ฒ mutateํ๋ฉด ๋๋ค.
        draft.users.push(action.user);
      })
    case 'TOGGLE_USER' :
      // ๐ก ์ด ๋ถ๋ถ ๋ง๊ณ ๋ immer๋ฅผ ์ฌ์ฉํด์ ๋ ๋ณต์กํด์ก๋ค.
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
        <div>ํ์ฑ์ฌ์ฉ์ ์ : {count}</div>
      </UserDispatch.Provider>
    </>
  );
}

export default App;