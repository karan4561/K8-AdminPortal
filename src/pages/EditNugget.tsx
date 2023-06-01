import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import NuggetFilters from '../components/addNugget/NuggetFilters'
import { NuggetsContext } from "@/context/NuggetsContext";
import NuggetProvider from "../context/NuggetsContext";
import Select from "react-select";
import data from 'test.json'
import { getCategory, getSubject, getChapters, getTopics } from "@/api/filter";
import SCQPrev from "@/components/Preview/SCQPrev";

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
    // const list: OptionType[] = [
    //     { value: "option1", label: "option1" },
    //     { value: "option2", label: "option2" },
    // ];

    const [categoryList, setCategoryList] = useState<OptionType[]>();
    const [subjectList, setSubjectList] = useState<OptionType[]>();
    const [topicList, setTopicList] = useState<OptionType[]>();
    const [chapterList, setChapterList] = useState<OptionType[]>();

    const [approvedStatus, setApprovedStatus] = useState<Approve[]>();
    const [category, setCategory] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [topic, setTopic] = useState<string>("");
    const [chapter, setChapter] = useState<string>("");

    useEffect(() => {
        getCategory().then((data) =>
            setCategoryList(
                data.map((obj: any) => {
                    return { value: obj.unique_id, label: obj.name };
                })
            )
        );
    }, []);

    const onCategoryChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setCategory(selectedOption.value);
            getSubject(selectedOption.value).then((data) =>
                setSubjectList(
                    data.map((obj: any) => {
                        return { value: obj.unique_id, label: obj.english_name };
                    })
                )
            );
        }
    };

    const onSubjectChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setSubject(selectedOption.value);
            getChapters(category, selectedOption.value).then((data) =>
                setChapterList(
                    data.map((obj: any) => {
                        return { value: obj.unique_id, label: obj.english_name };
                    })
                )
            );
        }
    };

    const onChapterChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setChapter(selectedOption.value);
            getTopics(
                category,
                subject,
                selectedOption.value
            ).then((data) =>
                setTopicList(
                    data.map((obj: any) => {
                        return { value: obj.unique_id, label: obj.english_name };
                    })
                )
            );
        }
        // setChapterValue(selectedOption);
    };

    const approveStatusChange = (selectedOption: Approve | null) => {
        if (selectedOption) {
            setApprovedStatus(selectedOption.value);
        }
    }

    const onTopicChange = (selectedOption: OptionType | null) => {
        if (selectedOption) setTopic(selectedOption.value);
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
                    options={categoryList}
                    placeholder="Category"
                />
                <Select
                    className="AddNuggetCategory"
                    // value={}
                    onChange={onSubjectChange}
                    options={subjectList}
                    placeholder="Subject"
                />
                <Select
                    className="AddNuggetCategory"
                    // value={}
                    onChange={onChapterChange}
                    options={chapterList}
                    placeholder="Chapter"
                />
                <Select
                    className="AddNuggetCategory"
                    // value={}
                    onChange={onTopicChange}
                    options={topicList}
                    placeholder="Topic"
                    isClearable={true}
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
            {data.data.map((nuggetData, index) => {
                // if (nuggetData.kind == 'MCQ') {
                    return (
                        <div className="edit-label">
                            <div className='edit-Nugget-div-label'>
                                <p>#{nuggetData._id}</p>
                                <div>
                                    <button className="edit-delete-button"><Image src="/Edit.png" height={15} width={15} alt='' /></button>
                                    <button className="edit-delete-button"><Image src="/Vector.png" height={15} width={15} alt='' /></button>
                                </div>
                            </div>
                            <div className="edit-nugget-prev">
                                <div className="headerimage-headertitle">
                                    <h4>{nuggetData.headerTitle}</h4>
                                </div>
                               {(nuggetData.kind=='MCQ') && <SCQPrev nugget={nuggetData} />}
                                {/* <p>{data.question.content?.english}</p>
                                <div className="TFPrev">
                                    {data.question.bilingual_options?.english.map((optionData, index) => {
                                        return (
                                            <div className="TFOptionPrev scq-option-prev">
                                                <p>{index + 1}. {optionData.text}</p>
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
                                </div> */}
                            </div>
                        </div>
                    )
                // }
            })
            }
        </>
    )
}

export default EditNugget;