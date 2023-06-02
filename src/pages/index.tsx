import React from "react";
import Link from "next/link";

function index() {
  return (
    <h1>
      Go to{" "}
      <span>
        {" "}
        <Link href="/nuggets">"http://localhost:3000/nuggets"</Link>{" "}
      </span>
    </h1>
  );
}

export default index;
