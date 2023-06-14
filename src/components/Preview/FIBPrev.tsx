import React from 'react'

function FIBPrev({ nugget }: any) {
    return (
        <>
            <div>
                {nugget.question.fib.english.map((fibData, index) => {
                    return (
                        <>
                        <span>
                        {fibData.type=="text" && <p>{fibData.text}</p>}
                        {fibData.type=="blank" && <p>{fibData.text}</p>}
                        </span>
                        </>
                    )
                })}
            </div >
        </>
    )
}

export default FIBPrev