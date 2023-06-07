import { useContext } from "react";
import NuggetFilters from "./NuggetFilters";
import { NuggetsContext } from "@/context/NuggetsContext";

export default function AddNuggetHeader({nuggetId}) {
  const { nugget, addFilter } = useContext(NuggetsContext);

  return (
    <>
      <div className="card-header AddNugget">
        <h2>Add Nugget To</h2>
        {nugget.categories?.map((obj, i) => (
          <NuggetFilters nuggetId={nuggetId} index={i} key={i} />
        ))}
        <button onClick={addFilter}>+</button>
      </div>
    </>
  );
}
