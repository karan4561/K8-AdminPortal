import TinyMCE from "../Tinymce";
import { useState } from "react";
export default function (){
    const [content, setContent] = useState("");
    const [H1InputValue, setH1InputValue] = useState('');
    const H1InputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setH1InputValue(event.target.value);
      };
    return (
        <>
        {/* <input className='input-text' type="text" value={H1InputValue} onChange={H1InputChange}/> */}
        <div>
        {/* <TinyMCE /> */}
        </div>
        </>
    )
}