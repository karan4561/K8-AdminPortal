import React from 'react'
import TextEditor from "../../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "../../../../context/NuggetsContext";
import { useState, useEffect, useContext } from "react";

function AddOptionSection() {
    const {
        nugget: test,
        updateFIBOption,
        deleteFIBOption,
        addFIBOption,
    } = useContext(NuggetsContext);
    //   if (!test.question?.bilingual_options?.english) {
    //     useEffect(() => {
    //         addFIBOption();
    //     }, []);
    //   }

    function addSection() {
        addFIBOption();
    }

    function handleDelete(index: number) {
        deleteFIBOption({ index });
    }

    function updateAnswerOption(index: number, content: string) {
        updateFIBOption({ index, text: content });
    }

    const sectionElements = test.question?.bilingual_options?.english.map(
        (section, index) => {
            return (
                <>
                    <div className="option-editor" key={index}>
                        <TextEditor
                            value={section.text}
                            onUpdate={(content: string) => updateAnswerOption(index, content)}
                        />
                    </div>
                    {test.question.bilingual_options?.english?.length !== 1 && (
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    )}
                </>
            );
        }
    );

    return (
        <>
            <button className="subcard-addSection" onClick={addSection}>
                Add Section
            </button>
            {sectionElements}
        </>
    );
}

export default AddOptionSection