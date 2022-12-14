/*
๐ฅ ์ปค์คํ hooks
-use๋ผ๋ ํค์๋๋ก ํ์ผ์ ๋ง๋๋๊ฒ ๊ด๋ก
-์์์ ํ์ํ ๋ฆฌ์กํธ Hooks๋ฅผ ์ฌ์ฉํ์ฌ ์ํ๋ ๊ธฐ๋ฅ์ ๊ตฌํ
-์ปดํฌ๋ํธ์์ ์ฌ์ฉํ๊ณ  ์ถ์ ๊ฐ๋ค์ ๋ฐํ

์ฌ์ค ์ง๊ธ์ฒ๋ผ input์ด ํ๋์ผ ๋
์ด๋ ๊ฒ ํ๋ ํจ๊ณผ๊ฐ ํฌ์ง ์์ ๊ฒ ๊ฐ์ง๋ง,
form๊ณผ input์ด ๋ง์์ง๋ฉด ๊ฐ์ ๋ฐฉ์์ ์ฝ๋๋ฅผ ๋ํ์ด ํ์ง ์์๋ ๋์ ์ข๋ค.
onChange๋ ์ปดํฌ๋ํธ ๋ด๋ถ์ ์์ฑ ์ํด๋๋๋๊น ํธํ๊ธฐ๋ ํ๊ณ !
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