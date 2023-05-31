import React from 'react'
import NuggetFilters from '../components/addNugget/NuggetFilters'
import { useContext, useState } from "react";
import { NuggetsContext } from "@/context/NuggetsContext";
import Select from "react-select";

interface OptionType {
    value: boolean;
    label: string;
}
function EditNuggetLanding() {
    const approveStatus: OptionType[] = [
        { value: true, label: "Approved" },
        { value: false, label: "Not Approved" },
    ];
    const { nugget, addFilter } = useContext(NuggetsContext);
    const [approvedStatus, setApprovedStatus] = useState<OptionType[]>();
    const approveStatusChange = (selectedOption) => {
        setApprovedStatus(selectedOption);
    };
    return (
        <>
            <h3>Search Nugget by:</h3>
            <div className='edit-nugget-category'>
                {nugget.categories?.map((obj, i) => (
                    <NuggetFilters index={i} key={i} />
                ))}
                <Select
                    className="AddNuggetCategory"
                    value={approvedStatus}
                    onChange={approveStatusChange}
                    options={approveStatus}
                    placeholder="Status"
                />
            </div>
        </>
    )
}

export default EditNuggetLanding