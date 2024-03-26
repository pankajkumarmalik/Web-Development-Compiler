import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import Loader from "@/components/loader/Loader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useLoadCodeMutation } from "@/redux/slices/api";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Compiler() {
  const { urlId } = useParams();
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();
  const dispatch = useDispatch();
  const loadCode = async () => {
    try {
      // const response = await axios.post("http://localhost:4000/compiler/load", {
      //   urlId: urlId,
      // });
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
      }
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   if (error?.response?.status === 500) {
      //     toast("Invalid URL, Default Code Loaded.");
      //   }
      // }
      handleError(error);
    }
  };
  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <ResizablePanelGroup direction="horizontal" className=" rounded-lg ">
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
