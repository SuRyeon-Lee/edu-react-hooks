// 여러개의 input 상태 관리하기 (https://react.vlpt.us/basic/09-multiple-inputs.html)
import ManyInputs from './lesson/ManyInputs'

import {useRef, useState, useMemo, useCallback} from "react";
import UserList from './lesson/UserList'
import CreateUser from './lesson/CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  //Input 처리하는 친구들
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = useCallback( 
    e => {
     const { name, value } = e.target;
     setInputs({
       ...inputs,
       [name]: value
     });
    },[]);

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
  const onCreate = useCallback( () => {
      // 배열에 항목 추가하는 로직
      const user = {
        id: nextId.current, //useRef로 저장해둔 외부변수 current로 빼온다.
        username,
        email
      };
      // setUsers(users => [...users, user]);
      setUsers(users => users.concat(user));


      setInputs({
        username: '',
        email: ''
      });

      nextId.current += 1;
    }, [username, email] 
    //users의 active가 바뀐다고 onCreate함수 다시 만들필요없다.(users통째로 넣을 필요없다)
    //🔥안에서 쓰고 있는 state나 props들 deps에 넣어준다고 생각하면 된다.
  )

  const onRemove = useCallback(
    id => {
      setUsers(
        users => users.filter((user) => user.id !== id)
      )
    },[]
  )

  const onToggle = useCallback(
    id => {
      setUsers(users => 
        users.map((user) => 
          user.id === id ?  { ...user, active: !user.active } : user
        )
      )
    }, []
  )
  /*
    🔥 useCallback 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용한다.
    사실 위에 컴포넌트 안에서 선언된 함수들,
    (onChange,onCreate,onRemove,onToggle)
    이것들은 전부 랜더링 될때마다 새로 만들어지는 중이다. 
    성능 최적화를 위해 한번 만들어놓으면 재사용하는 것이 필수!

    이때 
    🔥 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함시켜야 한다.

    사실 useCallback은 우리 눈에 보이지 않는 영역에서
    함수를 저장해 주는 부분을 최적화시키는 것이어서
    랜더링 최적화 부분과는 관계가 없어, 눈으로 뭐가 더 좋은건지 딱히 티도 안나고 알수도 없다.
    (비록 알고보면 좋아진것이긴 하지만)
    눈에 띄게 좋아질려면 useCallback에 추가작업이 필요하다!!

    예를 들어 지금 users가 바뀌면 useCallback으로 함수를 다시 만들어주기로 했는데,
    그럼 실질적으로 다시 만들 필요없는 함수들도 users가 바뀌면 다시 생긴다는 이야기
    예를들어
    아이디를 클릭해서 users의 active 상태를 바꿔주는 행위는 users배열을 변화시키고 있지만,
    사실 onCreate, onToggle, onRemove 함수들을 다시 만들 필욘 없다.
    (그 함수들이 다시 만들어지면 그 함수들을 props로 받고있는 컴포넌트도 리랜더링된다.)

    이때!!! 
    🔥 deps에 state(users)를 제외시키고 함수형 setState (함수형 업데이트)로 바꾼다!
    원칙은 useCallback 안에서 쓰는 state는 deps에 넣어줘야 state참조가 가능했지만,
    함수형 업데이트를 해주면, 그 자체만으로도 이전 state를 참조 및 비교해올 수 있기 떄문에!!!

    다시말해
    useCallback으로 함수의 재생산을 막았지만, 여전히 deps로 인한 리랜더링이 발생한다.
    때문에 useCallback의 종속성 배열을 비워주고 함수형 업데이트를 이용해 값을 참조한다.

    🔥 이제까지 나온 최적화 포인트
    💡 useMemo로 불필요한 재연산 방지하기
    💡 useCallback으로 불필요한 함수 재생산 방지하기
    💡 React.memo로 props가 바뀌지 않는한, 불필요한 자식컴포넌트의 리랜더링 방지하기
    💡 useCallback의 종속성 컴포넌트 최소화[] + 함수형 state로 함수 재생산 추가로 최소화하기
  */


  /*
    🔥 useMemo는 상관 없는 컴포넌트의 변화에 딸려서 함수가 호출될때 사용한다. 
    useMemo의 의미와 기능은 ...
    "이 state가 바뀔때만 함수를 호출해서 다시 계산해주면 돼!
    근데 이 state 안바뀌었으면 함수 호출하지마!
    내가 이전에 연산한 값 저장해놨거든~ 그거 주면돼!"

    const [연산값 저장할 변수] = useMemo(() => [어떻게 연산할지 정의하는 함수], [deps 배열])
  */
  const count = useMemo(() => countActiveUsers(users), [users]);
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
     <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
