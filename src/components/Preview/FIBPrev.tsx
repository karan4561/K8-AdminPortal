import React from 'react'

function FIBPrev({ nugget }: any) {
    return (
        <>
            {(!!nugget.question.fib?.english || !!nugget.question.extraOptions?.english) && <div className='fib-prev-header'>
                {(!!nugget.question.fib?.english) && <p className='fib-header'>
                    {nugget.question.fib?.english.map((fibData, index) => {
                        return (
                            <>
                                {fibData.type == "TEXT" && <p className='fib' dangerouslySetInnerHTML={{ __html: fibData.value }} />}
                                {fibData.type == "BLANK" && <p className='fib-blank-type' dangerouslySetInnerHTML={{ __html: fibData.value }} />}
                            </>
                        )
                    })}
                </p>}
               {(!!nugget.question.extraOptions?.english) &&  <h2>Extra Option</h2>}
                {(!!nugget.question.extraOptions?.english) && <p className='fib-header'>
                    {nugget.question.extraOptions?.english.map((extraOptionsData, index) => {
                        return (
                            <>
                                {!!extraOptionsData.text && <p className='fib-blank-type' dangerouslySetInnerHTML={{ __html: extraOptionsData.text }} />}
                            </>
                        )
                    })}
                </p>}
            </div >}
        </>
    )
}

export default FIBPrev