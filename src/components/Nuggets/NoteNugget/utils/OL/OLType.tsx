import TinyMCE from '../Tinymce';
import { useEffect, useState } from 'react';
import Select from 'react-select';
interface OptionType {
    value: string;
    label: string;
}

export default function () {
    const optionsXP: OptionType[] = [
        { value: '1', label: '1' },
        { value: 'I', label: 'I' },
        { value: 'i', label: 'i' },
        { value: 'a', label: 'a' },
    ];

    const [OLType, setOLType] = useState<OptionType | null>(optionsXP[0]);
    const handleChangeXP = (selectedOption: OptionType | null) => {
        setOLType(selectedOption);
    };

    return (
        <>
            <Select className='drop-down-bar'
                value={OLType}
                onChange={handleChangeXP}
                options={optionsXP}
            />
            {/* <TinyMCE /> */}
        </>
    )
}