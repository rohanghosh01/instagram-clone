'use client'
import { NextPage } from "next";
import "./styles.css";
import { useRootContext } from "@/context/rootContext";

interface Props {}

const LoaderComponent: NextPage<Props> = ({}) => {
  const { isLoading } = useRootContext();

  if (!isLoading) return null;

  return (
    <div className="m-0 w-full h-2 absolute top-0 z-0 overflow-hidden">
      <div className="progress shadow-2xl overflow-hidden"></div>
    </div>
  );
};

export default LoaderComponent;
