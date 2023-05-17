import { useState } from "react";
export default function(){
    const [textInputValue, settextInputValue] = useState('');
    const textInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        settextInputValue(event.target.value);
      };
    return (
        <>
        <input className='input-text' type="text" value={textInputValue} onChange={textInputChange}/>
        </>
    )
}