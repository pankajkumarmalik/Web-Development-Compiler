import { Code, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { codeType } from "@/vite-env";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { handleError } from "@/utils/handleError";
import { useDeleteCodeMutation } from "@/redux/slices/api";
import { toast } from "sonner";

export default function CodeItem({
  data,
  deleteBtn,
}: {
  data: codeType;
  deleteBtn: boolean;
}) {
  const [deleteCode, { isLoading }] = useDeleteCodeMutation();
  const handleDelete = async () => {
    try {
      const response = await deleteCode(data._id!).unwrap();
      console.log(response);
      toast("Code Deleted Successfully!");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className=" p-3 rounded cursor-pointer bg-slate-900 flex justify-start items-center flex-col gap-3">
      <div className="__top flex justify-start items-start gap-3 w-full">
        <Code />
        <p className="font-mono font-bold text-lg">{data.title}</p>
      </div>
      <Separator />
      <div className="__btn_container flex gap-3">
        <Link target="_blank" to={`/compiler/${data._id}`}>
          <Button variant="secondary">Open Code</Button>
        </Link>

        {deleteBtn && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                //className="flex justify-center items-center gap-1"
                variant={"secondary"}
                //onClick={handleSaveCode}
                //disabled={isLoading}
                //size="icon"
              >
                <Trash2 color="#CC5D5A" size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  Delete your Code !
                </DialogTitle>

                <div className="__url flex justify-center items-center flex flex-col gap-3">
                  <p className=" text-center text-sm">
                    You are sure, you want to delete this code? This action is
                    not reversable.
                  </p>
                  <Button
                    variant="destructive"
                    className="h-full"
                    onClick={handleDelete}
                    loading={isLoading}
                  >
                    Confirm Delete
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
