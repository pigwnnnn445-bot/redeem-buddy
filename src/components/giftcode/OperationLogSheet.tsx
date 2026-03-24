import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { OperationLog } from "@/lib/giftcode-data";

interface OperationLogSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: OperationLog[];
  giftCodeId: string;
}

const OperationLogSheet = ({ open, onOpenChange, logs, giftCodeId }: OperationLogSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-sm">操作日志</SheetTitle>
          <SheetDescription className="text-xs">礼品码 ID: {giftCodeId}</SheetDescription>
        </SheetHeader>
        <div className="mt-4 overflow-auto max-h-[calc(100vh-120px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">操作备注</TableHead>
                <TableHead className="text-xs w-40">时间</TableHead>
                <TableHead className="text-xs w-20">操作人</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-xs text-muted-foreground py-8">
                    暂无操作日志
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs">{log.remark}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{log.time}</TableCell>
                    <TableCell className="text-xs">{log.operator}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OperationLogSheet;
