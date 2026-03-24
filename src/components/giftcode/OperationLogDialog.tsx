import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { OperationLog } from "@/lib/giftcode-data";

interface OperationLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: OperationLog[];
  recordId: string;
}

const OperationLogDialog = ({ open, onOpenChange, logs, recordId }: OperationLogDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-sm">操作日志 - 记录 #{recordId}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs w-20">记录ID</TableHead>
                <TableHead className="text-xs">操作备注</TableHead>
                <TableHead className="text-xs w-40">时间</TableHead>
                <TableHead className="text-xs w-24">操作人</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-xs text-muted-foreground py-8">
                    暂无操作日志
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs font-mono">{log.recordId}</TableCell>
                    <TableCell className="text-xs">{log.remark}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{log.time}</TableCell>
                    <TableCell className="text-xs">{log.operator}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OperationLogDialog;
