import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditRemarkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  remark: string;
  onSave: (remark: string) => void;
}

const EditRemarkDialog = ({ open, onOpenChange, remark, onSave }: EditRemarkDialogProps) => {
  const [value, setValue] = useState(remark);

  useEffect(() => {
    setValue(remark);
  }, [remark]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm">编辑备注</DialogTitle>
        </DialogHeader>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="请输入备注内容"
          className="min-h-[100px] text-xs"
        />
        <DialogFooter>
          <Button variant="outline" size="sm" className="text-xs" onClick={() => onOpenChange(false)}>取消</Button>
          <Button size="sm" className="text-xs" onClick={() => onSave(value)}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditRemarkDialog;
