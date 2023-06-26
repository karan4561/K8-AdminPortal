import Image from 'next/image'
import { useState, useContext, useEffect } from "react";
import { NuggetsContext } from "@/context/NuggetsContext";
import { uploadImage } from "@/api/utils";
import { FileObject } from "@/interfaces/INugget";
export default function ({ContentID}:any) {
    const { updateCaption,contentImageUpload, nugget } = useContext(NuggetsContext);
    const [titleValue, setTitleValue] = useState('');
    const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };
    const [selectedImage, setSelectedImage] = useState<FileObject>();
    const data = [1, 2]
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            uploadImage(formData).then((data) => setSelectedImage(data));
        }
    };
    useEffect(()=>{
        if(selectedImage){
            contentImageUpload({ URI: selectedImage,index:ContentID })
        }
    },[selectedImage])
    // console.log(contentID,"contentindex");

    return (
        <>
            {/* <div className='aa'> */}
            <div className='title-input'>
                <p>Title (Optional)</p>
                <input className='image-type-input' type="text" value={titleValue} onChange={titleChange} placeholder='Prefix' />
            </div>
            <div className='title-input'>
                <p>Title (Optional)</p>
                <input className='image-type-input' type="text" value={titleValue} onChange={titleChange} placeholder='Prefix' />
            </div>
            <div className="image-upload">
                <div>
                    {nugget.content[ContentID].imgUri && (
                        <img
                            src={nugget.content[ContentID].imgUri?.baseUrl+nugget.content[ContentID].imgUri?.key}
                            width={300}
                            height={200}
                            alt=""
                        />
                    )}
                </div>
                <label htmlFor="file-input" className="img-input">
                    <img src="/upload.png" width={20} height={20} />
                    <p>Upload Image here</p>
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
            {/* </div> */}
        </>
    )
}