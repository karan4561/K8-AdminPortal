import React from 'react'

function LTIPrev({ nugget }: any) {
  const imageWidth = 300;
  const imageHeight = Math.floor(imageWidth * (9 / 16));
  return (
    <>
      {(!!nugget.question.ltiImage) && <div className='ImagePrev lti-image-label' style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
        {(!!nugget.question.ltiImage) && <img src={nugget.question.ltiImage.baseUrl + nugget.question.ltiImage.key} width={imageWidth} height={imageHeight} alt='' />}
        {nugget.question.lti?.english.map((coordinate, index) => {
          return (
            <>
              <div className="lti-dot" key={index} style={{ top: coordinate.coordinates.y, left: coordinate.coordinates.x }}>
                <div></div>
                <p>{index + 1}</p>
              </div>
            </>
          )
        })}
        <p>{nugget?.caption}</p>
      </div>}
      {(!!nugget?.question.lti?.english || !!nugget?.question.extraOptions?.english) && <div className='fib-prev-header lti-option-header'>
        {
          (!!nugget.question) && <p className='LTIValue'>
            {nugget.question.lti?.english.map((value, index: number) => {
              return (
                <>
                  {<p className='lti-blank-type' dangerouslySetInnerHTML={{ __html: index + 1 }} />}
                </>
              )
            })}
          </p>
        }
        {(!!nugget.question.extraOptions?.english || !!nugget?.question.lti?.english) && <h2>Drag the option and drop it in the blank box</h2>}
        {(!!nugget?.question.lti?.english || !!nugget?.question.extraOptions?.english) && <p className='fib-header'>
          {/* {
            (!!nugget.question) && <p className='LTIValue'> */}
              {nugget.question.lti?.english.map((value, index: number) => {
                return (
                  <>
                    {(!!value.value) && <p className='fib-blank-type lti-option-text' dangerouslySetInnerHTML={{ __html: value.value }} />}
                  </>
                )
              })}
            {/* // </p>
          } */}
          {nugget.question.extraOptions?.english.map((extraOptionsData, index: any) => {
            return (
              <>
                {(!!extraOptionsData.text) && <p className='fib-blank-type lti-option-text' dangerouslySetInnerHTML={{ __html: extraOptionsData.text }} />}
              </>
            )
          })}
        </p>}
      </div>}
      {!!nugget.question?.solutions?.[0].english.text && (
        <div className="Hint-Prev-box">
          <h4>Solution</h4>
          {!!nugget.question?.solutions[0]?.english.text && (
            <p dangerouslySetInnerHTML={{ __html: nugget.question.solutions[0]?.english.text }} />
          )}
        </div>
      )}
      {!!nugget?.question?.solutions?.[0].english.hint && (
        <div className="Hint-Prev-box">
          <h4>Hint</h4>
          {!!nugget?.question?.solutions[0]?.english.hint && (
            <p dangerouslySetInnerHTML={{ __html: nugget?.question.solutions[0]?.english.hint }} />
          )}
        </div>
      )}
    </>
  )
}

export default LTIPrev