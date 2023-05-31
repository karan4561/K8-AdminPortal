import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import NuggetFilters from '../components/addNugget/NuggetFilters'
import { NuggetsContext } from "@/context/NuggetsContext";
import NuggetProvider from "../context/NuggetsContext";
import EditNuggetLanding from "./EditNuggetLanding";

function EditNugget() {

    return (
        <>
            <NuggetProvider>
                <EditNuggetLanding />
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
            </NuggetProvider>
        </>
    )
}

export default EditNugget;