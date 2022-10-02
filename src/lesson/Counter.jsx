import React, {useReducer} from 'react';

//🔥 상태 업데이트 로직은 useState말고도 useReducer가 있다.
//useReducer를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리할 수 있다.
//상태 업데이트 로직을 컴포넌트 바깥에 작성할 수도 있고, 심지어 다른 파일에 작성 후 
//불러와서 사용할 수도 있다.

//🔥 reducer란? 현재 상태와 액션객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
//🔥 action이란? 업데이트를 어떻게 할건지 알려주는 객체

// action은 일단 type만 있으면 다른 어떤 key,value든 올 수 있다.
//type 값은 보통 대문자로 쓰고 _로 구분한다. LIKE_THIS

function reducer(state,action){ //여기서 state는 이전 state를 말한다.
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function Counter() {
    //🔥 1️⃣ useReducer메소드에 reducer 함수와 초기값을 넣고
    //그 결과 값을 reducer를 사용할 state(number)와 dispatch함수로 받아온다.
    //const [state, dispatch] = useReducer(reducer, initialState);
    const [number, dispatch] = useReducer(reducer, 0);
    //🔥 dispatch란? 액션을 발생시키는 함수

    const onIncrease = () => {
        dispatch({ type: 'INCREMENT' });
    }

    const onDecrease = () => {
        dispatch({ type: 'DECREMENT' });
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter


/*
🤔redux와 useReducer에 대한 고찰

일단 dispatch, action, reducer 모두 redux와 동일하게 쓰이는 개념이며
사용법도 엄청 유사해서 순간 굉장히 헷갈렸다.

state를 업데이트 하는 방식에 있어서,
경우의 수를 type으로 나누어,
정형화된 로직으로 처리하게 하는 부분에 있어선 동일하다. 

🔥 일단 useState부터
useState의 set함수가 컴포넌트에 종속되어, 
컴포넌트 밖을 벗어나지 못하는 한계를 극복하고자,
useReducer는 길고 복잡한 state업데이트 로직을
컴포넌트 바깥으로 뺸다는 것에 안주한다.
어쨌든 
💡useState는 state업데이트 로!직!만! 떼오는 거지, 
state자체는 컴포넌트에 종속된다는 말이다.

🔥 반면, redux는 여기서 한발짝 더 나아간다.
reducer가 state 업데이트 로직을 컴포넌트 외부에서 관리하는 것에 더하여
💡state!까지! 컴포넌트 바깥으로 뺀다.
store라는 외부 저장소를 활용해, state 자체를 props drilling으로 부터
자유롭게 뽑아 쓸 수 있도록 한 것이다.

📌요약

useReducer:
-react 훅
-컴포넌트로부터 state업데이트 로직을 분리하여 관리한다.
-props drilling 문제를 해결할 능력이 없다.

Redux:
-외부 패키지, 자바스크립트 상태관리 라이브러리
-컴포넌트로부터 state와 state업데이트 로직을 모두 분리
-state가 store라는 저장소에 종속되어 컴포넌트로부터 자유로움
-장점: 많은 상태를 저장할 필요가 있을 경우, props drilling이 과해질 경우 필요
-장점: 구조적 측면에서 단순하고, 디버깅이 쉽고, Redux dev tool이 좋다.
-단점: 가볍긴하지만, 외부 라이브러리이므로 프로젝트 번들 크기가 커져 앱 로딩 시간을 증가시킨다.


일단 이해한 내용까지 적었고, 추후 더 심도있는 이해가 필요할 듯 하다.
https://delivan.dev/react/stop-asking-if-react-hooks-replace-redux-kr/
*/