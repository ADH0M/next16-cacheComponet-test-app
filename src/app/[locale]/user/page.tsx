import { Suspense } from "react";
import GetUser from "./GetUser";

const page = () => {
  return (
    <div>
      <nav>
        <Suspense fallback={<div>loading</div>}>
          <GetUser />
        </Suspense>


      </nav>
    </div>
  );
};

export default page;
