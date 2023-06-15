import React from 'react'

function FIBPrev({ nugget }: any) {
    return (
        <>
            {(!!nugget?.question.fib?.english || !!nugget?.question.extraOptions?.english) && <div className='fib-prev-header'>
                {(!!nugget.question.fib?.english) && <p className='fib-header'>
                    {nugget.question.fib?.english.map((fibData, index:any) => {
                        return (
                            <>
                                {fibData.type == "text" && <p className='fib' dangerouslySetInnerHTML={{ __html: fibData.value }} />}
                                {fibData.type == "blank" && <p className='fib-blank-type' dangerouslySetInnerHTML={{ __html: fibData.value }} />}
                            </>
                        )
                    })}
                </p>}
                {(!!nugget.question.extraOptions?.english) && <h2>Extra Option</h2>}
                {(!!nugget.question.extraOptions?.english) && <p className='fib-header'>
                    {nugget.question.extraOptions?.english.map((extraOptionsData, index:any) => {
                        return (
                            <>
                                {!!extraOptionsData.text && <p className='fib-blank-type' dangerouslySetInnerHTML={{ __html: extraOptionsData.text }} />}
                            </>
                        )
                    })}
                </p>}
            </div >}
            {!!nugget?.question?.solutions?.[0].english.text && (
                <div className="Hint-Prev-box">
                    <h4>Solution</h4>
                    {!!nugget.question?.solutions[0]?.english.text && (
                        <p
                        dangerouslySetInnerHTML={{
                            __html: nugget.question?.solutions[0]?.english.text,
                        }}
                    />
                    )}
                </div>
            )}
            {!!nugget?.question?.solutions?.[0].english.hint && (
                <div className="Hint-Prev-box">
                    <h4>Hint</h4>
                    {!!nugget?.question?.solutions[0]?.english.hint && (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: nugget?.question.solutions[0]?.english.hint,
                            }}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default FIBPrev