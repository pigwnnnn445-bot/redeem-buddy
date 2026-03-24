import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { mockSKUs } from "@/lib/giftcode-data";
import { toast } from "sonner";

interface ImportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (skuId: string, codes: string[]) => void;
}

const ImportSheet = ({ open, onOpenChange, onImport }: ImportSheetProps) => {
  const [selectedSku, setSelectedSku] = useState("");
  const [codesText, setCodesText] = useState("");

  const giftCodeSKUs = mockSKUs.filter(s => s.type === 'gift_code');

  const handleImport = () => {
    if (!selectedSku) {
      toast.error("请选择SKU");
      return;
    }
    const codes = codesText.split('\n').map(c => c.trim()).filter(Boolean);
    if (codes.length === 0) {
      toast.error("请输入至少一个礼品码");
      return;
    }
    onImport(selectedSku, codes);
    setSelectedSku("");
    setCodesText("");
    onOpenChange(false);
    toast.success(`成功导入 ${codes.length} 个礼品码`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>导入礼品码</SheetTitle>
          <SheetDescription>选择SKU后输入礼品码，一行一个</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-6">
          <div className="space-y-2">
            <Label className="text-xs font-medium">选择SKU</Label>
            <Select value={selectedSku} onValueChange={setSelectedSku}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="请选择礼品码类型的SKU" />
              </SelectTrigger>
              <SelectContent>
                {giftCodeSKUs.map(sku => (
                  <SelectItem key={sku.id} value={sku.id}>{sku.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium">礼品码列表</Label>
            <Textarea
              placeholder={"请输入礼品码，一行一个\n例如：\nABCD-1234-EFGH\nWXYZ-5678-IJKL"}
              value={codesText}
              onChange={(e) => setCodesText(e.target.value)}
              className="min-h-[300px] text-xs font-mono"
            />
            {codesText && (
              <p className="text-xs text-muted-foreground">
                共 {codesText.split('\n').filter(c => c.trim()).length} 个礼品码
              </p>
            )}
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs">取消</Button>
          <Button onClick={handleImport} className="text-xs">确认导入</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ImportSheet;
