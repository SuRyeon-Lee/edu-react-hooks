// 여러개의 input 상태 관리하기 (https://react.vlpt.us/basic/09-multiple-inputs.html)

import React, { useState } from 'react';

function ManyInputs(){
    //여러개의 input이 몰려있을 때, 각각의 state 처리해주지 말고
    //하나의 객체로 묶어서 하나의 state로 관리한다.
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    })

    //설정해놓은 inputs라는 state는 객체이기 때문에,
    //이 중에 필요한 value들을 뽑아쓰기 위해 구조분해할당을 사용할 수 있다.
    const { name, nickname } = inputs;

    const onChange = (e) => {
        const {name, value} = e.target
        //🔥 리액트에서 객체를 업데이트하게 될 때에는 기존 객체를 직접 수정하면 안되고, 새로운 객체를 만들어서, 새 객체에 변화를 주어야 됩니다.
        setInputs((prevInputs) => {
            return {
                ...prevInputs,
                [name] : value //그냥 name:value로 하면, name이라는 키로 고정된다. (키 이름이 name)
                //🔥 키 이름 자체가 변수일 경우 [변수명] : value로 설정한다.
                // 참고: value는 따로 처리 안해줘도 변수로 들어가지만 [name] : [value] 이렇게 해줘도 된다.
            }
        })
    }

    const onReset = (e) => {
        setInputs({
            name: '',
            nickname: ''
        })
    }

    return (
        <div>
            {/* 이런식으로 여러개의 input을 하나의 state로 묶어서 관리할 때,
             name이 필수가 된다. (value와 onChange는 다른 경우에도 필수로 들어가는건 당연)
             name은 묶어서 관리할 inputs라는 state의 key값으로 들어가는 값이다.
             때문에, 🔥 결국엔 value에 들어갈 변수명과 name이 같아야,
             inputs state에서 value를 뽑아올 때에도 구조분해 할당으로 깔끔하게 뽑아올 수 있다.
            */}
            <input name="name" value={name} onChange={onChange} placeholder='이름' />
            <input name="nickname" value={nickname} onChange={onChange} placeholder='닉네임' />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    )
}

export default ManyInputs;