import { useContext } from "react";
import NuggetFilters from "./NuggetFilters";
import { NuggetsContext } from "@/context/NuggetsContext";

export default function AddNuggetHeader() {
  const { nugget, addFilter } = useContext(NuggetsContext);

  return (
    <>
      <div className="card-header AddNugget">
        <h2>Add Nugget To</h2>
        {nugget.categories?.map((obj, i) => (
          <NuggetFilters index={i} key={i} />
        ))}
        <button onClick={addFilter}>+</button>
      </div>
    </>
  );
}
