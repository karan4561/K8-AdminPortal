import Head from "next/head";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import NuggetFilters from '../components/addNugget/NuggetFilters'
import { NuggetsContext } from "@/context/NuggetsContext";
import NuggetProvider from "../context/NuggetsContext";
import EditNuggetLanding from "./EditNuggetLanding";
import Select from "react-select";
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
        if(selectedOption){
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
    console.log(chapter,"chapter",topic,"topic",category,"category",subject,"subject",approvedStatus,"approveStatus");
    
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
            </div>
            {/* <NuggetProvider> */}
            {/* <EditNuggetLanding /> */}
            <div className='edit-Nugget'>
                <div className='edit-Nugget-div-label'>
                    <p>#7777</p>
                    <div>
                        <Image src="/Edit.png" height={15} width={15} alt='' />
                        <Image src="/Vector.png" height={15} width={15} alt='' />
                    </div>
                </div>
                {/* <div>
                <div className="headerimage-headertitle">
                <h4>Header Title</h4>
                </div>
                <p>ques</p>
                </div> */}
            </div>
            {/* </NuggetProvider> */}
        </>
    )
}

export default EditNugget;