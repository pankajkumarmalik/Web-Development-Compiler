import React from "react";
import { Button } from "./ui/button";
import { Save, Share2 } from "lucide-react";
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
import axios from "axios";

export default function HelperHeader() {
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );
  const handleSaveCode = async () => {
    try {
      const responce = await axios.post("http://localhost:4000/compiler/save", {
        fullCode: fullCode,
      });
      console.log(responce.data);
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
        <Button
          className="flex justify-center items-center gap-1"
          variant={"success"}
          onClick={handleSaveCode}
        >
          <Save size={16} />
          Save
        </Button>
        <Button
          className="flex justify-center items-center gap-1"
          variant={"secondary"}
        >
          <Share2 size={16} />
          Share
        </Button>
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
