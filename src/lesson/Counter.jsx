import React, {useReducer} from 'react';

//๐ฅ ์ํ ์๋ฐ์ดํธ ๋ก์ง์ useState๋ง๊ณ ๋ useReducer๊ฐ ์๋ค.
//useReducer๋ฅผ ์ฌ์ฉํ๋ฉด ์ปดํฌ๋ํธ์ ์ํ ์๋ฐ์ดํธ ๋ก์ง์ ์ปดํฌ๋ํธ์์ ๋ถ๋ฆฌํ  ์ ์๋ค.
//์ํ ์๋ฐ์ดํธ ๋ก์ง์ ์ปดํฌ๋ํธ ๋ฐ๊นฅ์ ์์ฑํ  ์๋ ์๊ณ , ์ฌ์ง์ด ๋ค๋ฅธ ํ์ผ์ ์์ฑ ํ 
//๋ถ๋ฌ์์ ์ฌ์ฉํ  ์๋ ์๋ค.

//๐ฅ reducer๋? ํ์ฌ ์ํ์ ์ก์๊ฐ์ฒด๋ฅผ ํ๋ผ๋ฏธํฐ๋ก ๋ฐ์์์ ์๋ก์ด ์ํ๋ฅผ ๋ฐํํด์ฃผ๋ ํจ์
//๐ฅ action์ด๋? ์๋ฐ์ดํธ๋ฅผ ์ด๋ป๊ฒ ํ ๊ฑด์ง ์๋ ค์ฃผ๋ ๊ฐ์ฒด

// action์ ์ผ๋จ type๋ง ์์ผ๋ฉด ๋ค๋ฅธ ์ด๋ค key,value๋  ์ฌ ์ ์๋ค.
//type ๊ฐ์ ๋ณดํต ๋๋ฌธ์๋ก ์ฐ๊ณ  _๋ก ๊ตฌ๋ถํ๋ค. LIKE_THIS

function reducer(state,action){ //์ฌ๊ธฐ์ state๋ ์ด์  state๋ฅผ ๋งํ๋ค.
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
    //๐ฅ 1๏ธโฃ useReducer๋ฉ์๋์ reducer ํจ์์ ์ด๊ธฐ๊ฐ์ ๋ฃ๊ณ 
    //๊ทธ ๊ฒฐ๊ณผ ๊ฐ์ reducer๋ฅผ ์ฌ์ฉํ  state(number)์ dispatchํจ์๋ก ๋ฐ์์จ๋ค.
    //const [state, dispatch] = useReducer(reducer, initialState);
    const [number, dispatch] = useReducer(reducer, 0);
    //๐ฅ dispatch๋? ์ก์์ ๋ฐ์์ํค๋ ํจ์

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
๐คredux์ useReducer์ ๋ํ ๊ณ ์ฐฐ

์ผ๋จ dispatch, action, reducer ๋ชจ๋ redux์ ๋์ผํ๊ฒ ์ฐ์ด๋ ๊ฐ๋์ด๋ฉฐ
์ฌ์ฉ๋ฒ๋ ์์ฒญ ์ ์ฌํด์ ์๊ฐ ๊ต์ฅํ ํท๊ฐ๋ ธ๋ค.

state๋ฅผ ์๋ฐ์ดํธ ํ๋ ๋ฐฉ์์ ์์ด์,
๊ฒฝ์ฐ์ ์๋ฅผ type์ผ๋ก ๋๋์ด,
์ ํํ๋ ๋ก์ง์ผ๋ก ์ฒ๋ฆฌํ๊ฒ ํ๋ ๋ถ๋ถ์ ์์ด์  ๋์ผํ๋ค. 

๐ฅ ์ผ๋จ useState๋ถํฐ
useState์ setํจ์๊ฐ ์ปดํฌ๋ํธ์ ์ข์๋์ด, 
์ปดํฌ๋ํธ ๋ฐ์ ๋ฒ์ด๋์ง ๋ชปํ๋ ํ๊ณ๋ฅผ ๊ทน๋ณตํ๊ณ ์,
useReducer๋ ๊ธธ๊ณ  ๋ณต์กํ state์๋ฐ์ดํธ ๋ก์ง์
์ปดํฌ๋ํธ ๋ฐ๊นฅ์ผ๋ก ๋บธ๋ค๋ ๊ฒ์ ์์ฃผํ๋ค.
์ด์จ๋  
๐กuseState๋ state์๋ฐ์ดํธ ๋ก!์ง!๋ง! ๋ผ์ค๋ ๊ฑฐ์ง, 
state์์ฒด๋ ์ปดํฌ๋ํธ์ ์ข์๋๋ค๋ ๋ง์ด๋ค.

๐ฅ ๋ฐ๋ฉด, redux๋ ์ฌ๊ธฐ์ ํ๋ฐ์ง ๋ ๋์๊ฐ๋ค.
reducer๊ฐ state ์๋ฐ์ดํธ ๋ก์ง์ ์ปดํฌ๋ํธ ์ธ๋ถ์์ ๊ด๋ฆฌํ๋ ๊ฒ์ ๋ํ์ฌ
๐กstate!๊น์ง! ์ปดํฌ๋ํธ ๋ฐ๊นฅ์ผ๋ก ๋บ๋ค.
store๋ผ๋ ์ธ๋ถ ์ ์ฅ์๋ฅผ ํ์ฉํด, state ์์ฒด๋ฅผ props drilling์ผ๋ก ๋ถํฐ
์์ ๋กญ๊ฒ ๋ฝ์ ์ธ ์ ์๋๋ก ํ ๊ฒ์ด๋ค.

๐์์ฝ

useReducer:
-react ํ
-์ปดํฌ๋ํธ๋ก๋ถํฐ state์๋ฐ์ดํธ ๋ก์ง์ ๋ถ๋ฆฌํ์ฌ ๊ด๋ฆฌํ๋ค.
-props drilling ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ  ๋ฅ๋ ฅ์ด ์๋ค.

Redux:
-์ธ๋ถ ํจํค์ง, ์๋ฐ์คํฌ๋ฆฝํธ ์ํ๊ด๋ฆฌ ๋ผ์ด๋ธ๋ฌ๋ฆฌ
-์ปดํฌ๋ํธ๋ก๋ถํฐ state์ state์๋ฐ์ดํธ ๋ก์ง์ ๋ชจ๋ ๋ถ๋ฆฌ
-state๊ฐ store๋ผ๋ ์ ์ฅ์์ ์ข์๋์ด ์ปดํฌ๋ํธ๋ก๋ถํฐ ์์ ๋ก์
-์ฅ์ : ๋ง์ ์ํ๋ฅผ ์ ์ฅํ  ํ์๊ฐ ์์ ๊ฒฝ์ฐ, props drilling์ด ๊ณผํด์ง ๊ฒฝ์ฐ ํ์
-์ฅ์ : ๊ตฌ์กฐ์  ์ธก๋ฉด์์ ๋จ์ํ๊ณ , ๋๋ฒ๊น์ด ์ฝ๊ณ , Redux dev tool์ด ์ข๋ค.
-๋จ์ : ๊ฐ๋ณ๊ธดํ์ง๋ง, ์ธ๋ถ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ด๋ฏ๋ก ํ๋ก์ ํธ ๋ฒ๋ค ํฌ๊ธฐ๊ฐ ์ปค์ ธ ์ฑ ๋ก๋ฉ ์๊ฐ์ ์ฆ๊ฐ์ํจ๋ค.


์ผ๋จ ์ดํดํ ๋ด์ฉ๊น์ง ์ ์๊ณ , ์ถํ ๋ ์ฌ๋์๋ ์ดํด๊ฐ ํ์ํ  ๋ฏ ํ๋ค.
https://delivan.dev/react/stop-asking-if-react-hooks-replace-redux-kr/
*/