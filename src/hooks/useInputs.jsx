/*
🔥 커스텀 hooks
-use라는 키워드로 파일을 만드는게 관례
-안에서 필요한 리액트 Hooks를 사용하여 원하는 기능을 구현
-컴포넌트에서 사용하고 싶은 값들을 반환

사실 지금처럼 input이 하나일 땐
이렇게 하는 효과가 크지 않은 것 같지만,
form과 input이 많아지면 같은 방식의 코드를 되풀이 하지 않아도 되서 좋다.
onChange도 컴포넌트 내부에 작성 안해도되니까 편하기도 하고!
*/

import { useState, useCallback } from "react";

function useInputs(initialForm){
    const [form, setForm] = useState(initialForm);

    //change
    const onChange = useCallback( e => {
        const { name, value } = e.target;
        setForm(form => ({...form, [name]: value}))
    }, []);

    const reset = useCallback(() => setForm(initialForm), [initialForm]);
    return [form, onChange, reset];
}

export default useInputs;