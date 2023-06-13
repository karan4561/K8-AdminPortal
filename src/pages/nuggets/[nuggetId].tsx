import React from "react";
import NuggetHome from ".";
import { useRouter } from "next/router";

function EditNugget() {
  const router = useRouter();
  const nuggetId = router.query.nuggetId;
  console.log("*****NuggetID Dynamic****", nuggetId);

  return (
    <div>
      <NuggetHome nuggetId={nuggetId} />
    </div>
  );
}

export default EditNugget;
