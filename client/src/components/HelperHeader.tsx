import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Code, Copy, Download, Save, Share2, SquarePen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  compilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useEditCodeMutation, useSaveCodeMutation } from "@/redux/slices/api";

import { Input } from "./ui/input";

export default function HelperHeader() {
  const isOwner = useSelector(
    (state: RootState) => state.compilerSlice.isOwner
  );
  console.log("isOwner" + isOwner);
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>("My Code");

  const navigate = useNavigate();
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const [editCode, { isLoading: codeEditLoading }] = useEditCodeMutation();

  const handleDownloadCode = () => {
    if (
      fullCode.html === "" &&
      fullCode.css === "" &&
      fullCode.javascript === ""
    ) {
      toast("Code is Empty !");
    } else {
      const htmlCode = new Blob([fullCode.html], { type: "text/html" });
      const cssCode = new Blob([fullCode.css], { type: "text/css" });
      const javascriptCode = new Blob([fullCode.javascript], {
        type: "text/javascript",
      });

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const javascriptLink = document.createElement("a");

      htmlLink.href = URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href = URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      javascriptLink.href = URL.createObjectURL(javascriptCode);
      javascriptLink.download = "script.js";
      document.body.appendChild(javascriptLink);

      if (fullCode.html !== "") {
        htmlLink.click();
      }
      if (fullCode.css !== "") {
        cssLink.click();
      }
      if (fullCode.javascript !== "") {
        javascriptLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(javascriptLink);

      toast("Code downloaded Successfully !");
    }
  };

  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);
  const handleSaveCode = async () => {
    const body = { fullCode: fullCode, title: postTitle };
    try {
      // const responce = await axios.post("http://localhost:4000/compiler/save", {
      //   fullCode: fullCode,
      // });
      const response = await saveCode(body).unwrap();

      navigate(`/compiler/${response.url}`, { replace: true });
      toast("Code Saved Successfully!");
    } catch (error) {
      handleError(error);
    }
  };
  const handleEditCode = async () => {
    try {
      if (urlId) {
        await editCode({ fullCode, id: urlId! }).unwrap();
        toast("Code updated successfully!");
      }
    } catch (error) {
      handleError(error);
    }
  };
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between item-center">
      <div className="__btn_container flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              //className="flex justify-center items-center gap-1"
              variant={"success"}
              //onClick={handleSaveCode}
              disabled={isLoading}
              size="icon"
            >
              <Save size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-1 justify-center items-center">
                <Code />
                Save your Code !
              </DialogTitle>

              <div className="__url flex justify-center items-center gap-1">
                <Input
                  className="bg-slate-800 focus-visible:ring-0"
                  placeholder="Write your Code title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <Button
                  variant="success"
                  className="h-full"
                  onClick={handleSaveCode}
                >
                  Save
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button onClick={handleDownloadCode} size="icon" variant="default">
          <Download size={16} />
        </Button>

        {shareBtn && (
          <>
            {isOwner && (
              <Button
                loading={codeEditLoading}
                onClick={handleEditCode}
                size="icon"
                variant="default"
              >
                <SquarePen size={16} />
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"secondary"} size="icon">
                  <Share2 size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-1 justify-center items-center">
                    <Code />
                    Share your Code !
                  </DialogTitle>
                  <DialogDescription className="flex flex-col gap-2">
                    <div className="__url flex gap-1">
                      <input
                        type="text"
                        disabled
                        className="w-full px-2 py-2 rounded bg-slate-800 text-slate-400 select-none"
                        value={window.location.href}
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          window.navigator.clipboard.writeText(
                            window.location.href
                          );
                          toast("URL copied to your clipboard !");
                        }}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>

                    <p className="text-center">
                      Share this URL with your friends to collaborate.
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        <small>Current Language:</small>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as compilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
