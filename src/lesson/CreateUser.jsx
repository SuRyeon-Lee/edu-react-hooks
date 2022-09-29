import React from 'react';
/*
    🔥 React.memo는 자식컴포넌트가 props가 바뀌지 않았음에도 리랜더링 되는 현상을 방지한다.

    react에선 부모컴포넌트가 리랜더링되면 무조건 자식도 리랜더링되는게 기본이다.
    그 말은 자식에서 물려받는 props는 실재로 아무것도 변한게 없는데, 자식을 다시 그린다는 이야기!

    그런 비효율적인 일을 없애고자 하는게 React.memo이다

    🤔 이제까지 나온 최적화 기법들 정리하자면!!
    useMemo는 연산된 값을 저장해놓고 재사용하는것,
    useCallback은 만들어 놓은 함수를 저장해놓고 재사용하는것, (useMemo 바탕으로 만들어짐)
    React.memo는 자식컴포넌트 자체를 기억해놓고 재사용하는것. (나머지랑 달리 따로 import할 필요없다)
*/ 
const CreateUser = ({ username, email, onChange, onCreate }) => {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

//🔥 export해줄때 React.memo([컴포넌트]) 감싸줄 수도 있다.
export default React.memo(CreateUser);