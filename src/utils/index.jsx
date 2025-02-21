import { Suspense } from "react";
import suspense from '@/assets/suspense.gif'
export const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img className="w-[200px] h-[200px]" src={suspense} alt="" />
    </div>
  );
};

export const SuspenseContainer = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
