import Head from "next/head";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import NuggetFilters from '../components/addNugget/NuggetFilters'
import { NuggetsContext } from "@/context/NuggetsContext";
import NuggetProvider from "../context/NuggetsContext";
import EditNuggetLanding from "./EditNuggetLanding";
import Select from "react-select";
import data from 'test.json'
import { getCategory, getSubject, getChapters, getTopics } from "@/api/filter";

interface Approve {
    value: boolean;
    label: string;
}

interface OptionType {
    value: string;
    label: string;
}
function EditNugget() {
    const approveStatus: Approve[] = [
        { value: true, label: "Approved" },
        { value: false, label: "Not Approved" },
    ];
    const list: OptionType[] = [
        { value: "option1", label: "option1" },
        { value: "option2", label: "option2" },
    ];
    const { nugget, addFilter } = useContext(NuggetsContext);
    const [approvedStatus, setApprovedStatus] = useState<Approve[]>();
    const [category, setCategory] = useState<OptionType[]>();
    const [subject, setSubject] = useState<OptionType[]>();
    const [topic, setTopic] = useState<OptionType[]>();
    const [chapter, setChapter] = useState<OptionType[]>();

    const approveStatusChange = (selectedOption: Approve | null) => {
        if (selectedOption) {
            setApprovedStatus(selectedOption.value);
        }
    }

    const onTopicChange = (selectedOption: OptionType | null) => {
        if (selectedOption) setTopic(selectedOption.value);
    };

    const onSubjectChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setSubject(selectedOption.value);
        }
    };

    const onCategoryChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setCategory(selectedOption.value)
        }
    };

    const onChapterChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setChapter(selectedOption.value);
        }
    };
    console.log(chapter, "chapter", topic, "topic", category, "category", subject, "subject", approvedStatus, "approveStatus");

    return (
        <>
            <h3>Search Nugget by:</h3>
            <div className="edit-nugget-category">
                <Select
                    className="AddNuggetCategory"
                    // value={categoryList?.filter((o) => o.value == category.categoryId)}
                    onChange={onCategoryChange}
                    options={list}
                    placeholder="Category"
                />
                <Select
                    className="AddNuggetCategory"
                    // value={}
                    onChange={onSubjectChange}
                    options={list}
                    placeholder="Subject"
                />
                <Select
                    className="AddNuggetCategory"
                    // value={}
                    onChange={onChapterChange}
                    options={list}
                    placeholder="Chapter"
                />
                <Select
                    className="AddNuggetCategory"
                    // value={}
                    onChange={onTopicChange}
                    options={list}
                    placeholder="Topic"
                />
                <Select
                    className="AddNuggetCategory"
                    // value={approvedStatus}
                    onChange={approveStatusChange}
                    options={approveStatus}
                    placeholder="Status"
                />
                <button>Search</button>
            </div>
            {/* <NuggetProvider> */}
            {/* <EditNuggetLanding /> */}
            {data.data.map((data, index) => {
                if (data.kind == 'MCQ') {
                    return (
                        <div className="edit-label">
                            <div className='edit-Nugget-div-label'>
                                <p>#{data._id}</p>
                                <div>
                                    <button className="edit-delete-button"><Image src="/Edit.png" height={15} width={15} alt='' /></button>
                                    <button className="edit-delete-button"><Image src="/Vector.png" height={15} width={15} alt='' /></button>
                                </div>
                            </div>
                            <div className="edit-nugget-prev">
                                <div className="headerimage-headertitle">
                                    <h4>{data.headerTitle}</h4>
                                </div>
                                <p>{data.question.content?.english}</p>
                                <div className="TFPrev">
                                    {data.question.bilingual_options?.english.map((optionData, index) => {
                                        return (
                                            <div className="TFOptionPrev scq-option-prev">
                                                <p>{index}. {optionData.text}</p>
                                                <div></div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="prev-buttons">
                                    <p>Hint</p>
                                    <p className="Submit-prev">Submit</p>
                                    <p className="Submit-prev prev-color">Don't know</p>
                                </div>
                                <div className="Hint-Prev-box">
                                    <h4>Solution</h4>
                                    <p>{data.question.solutions[0].english.text}</p>
                                </div>
                                <div className="Hint-Prev-box">
                                    <h4>Hint</h4>
                                    <p>{data.question.solutions[0].english.hint}</p>
                                </div>
                            </div>
                        </div>

                    )
                }
            })
            }
        </>
    )
}

export default EditNugget;