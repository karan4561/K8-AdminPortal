import Image from 'next/image'
import { useState } from 'react';
export default function () {
    const [titleValue, setTitleValue] = useState('');
    const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    const data = [1, 2]

    return (
        <>
            {/* <div className='aa'> */}
            {data.map(() => {
                return <>
                    <div className='title-input'>
                        <p>Title (Optional)</p>
                        <input className='image-type-input' type="text" value={titleValue} onChange={titleChange} placeholder='Prefix' />
                    </div>
                </>
            })}
            <div className='image-upload'>
                <div>
                    {selectedImage && (
                        <Image src={URL.createObjectURL(selectedImage)} width={200} height={100} alt='' />
                    )}
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {/* <label htmlFor="image-input">
                    <div className="input-icon">
                        <Image src="/book.png" width={20} height={20} alt='' />
                    </div>  
                    <div className="input-label">Choose an image</div>
                </label> */}
            </div>
            {/* </div> */}
        </>
    )
}