import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileText } from "lucide-react";
import type { GiftCode, GiftCodeStatus } from "@/lib/giftcode-data";
import OperationLogDialog from "./OperationLogDialog";

interface GiftCodeTableProps {
  data: GiftCode[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onStatusChange: (id: string, from: GiftCodeStatus, to: GiftCodeStatus) => void;
}

const statusColorMap: Record<GiftCodeStatus, string> = {
  '未售卖': 'bg-secondary text-secondary-foreground',
  '已售卖': 'bg-success text-success-foreground',
  '已退款': 'bg-warning text-warning-foreground',
  '已退货': 'bg-destructive text-destructive-foreground',
  '无效': 'bg-muted text-muted-foreground',
};

const GiftCodeTable = ({ data, selectedIds, onSelectionChange, onStatusChange }: GiftCodeTableProps) => {
  const [logDialog, setLogDialog] = useState<{ open: boolean; logs: GiftCode['logs']; recordId: string }>({
    open: false, logs: [], recordId: '',
  });

  const allSelected = data.length > 0 && selectedIds.length === data.length;

  const toggleAll = () => {
    onSelectionChange(allSelected ? [] : data.map(d => d.id));
  };

  const toggleOne = (id: string) => {
    onSelectionChange(
      selectedIds.includes(id)
        ? selectedIds.filter(i => i !== id)
        : [...selectedIds, id]
    );
  };

  const getAvailableActions = (status: GiftCodeStatus): { label: string; to: GiftCodeStatus }[] => {
    switch (status) {
      case '已退款': return [
        { label: '转为未售卖', to: '未售卖' },
        { label: '转为无效', to: '无效' },
      ];
      case '已退货': return [
        { label: '转为未售卖', to: '未售卖' },
        { label: '转为无效', to: '无效' },
      ];
      default: return [];
    }
  };

  return (
    <>
      <div className="rounded-md border border-border overflow-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead className="text-xs font-semibold">SKU名称</TableHead>
              <TableHead className="text-xs font-semibold">礼品码</TableHead>
              <TableHead className="text-xs font-semibold">状态</TableHead>
              <TableHead className="text-xs font-semibold">查看状态</TableHead>
              <TableHead className="text-xs font-semibold">用户邮箱</TableHead>
              <TableHead className="text-xs font-semibold">订单号</TableHead>
              <TableHead className="text-xs font-semibold">创建时间</TableHead>
              <TableHead className="text-xs font-semibold">创建人</TableHead>
              <TableHead className="text-xs font-semibold">一键换码</TableHead>
              <TableHead className="text-xs font-semibold w-20">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-muted-foreground py-16 text-sm">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => {
                const actions = getAvailableActions(item.status);
                return (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onCheckedChange={() => toggleOne(item.id)}
                      />
                    </TableCell>
                    <TableCell className="text-xs font-medium">{item.skuName}</TableCell>
                    <TableCell className="text-xs font-mono">{item.code}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] px-1.5 py-0.5 ${statusColorMap[item.status]}`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs ${item.viewStatus === '已查看' ? 'text-success' : 'text-muted-foreground'}`}>
                        {item.viewStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.userEmail || '-'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.orderNo || '-'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.createdAt}</TableCell>
                    <TableCell className="text-xs">{item.createdBy}</TableCell>
                    <TableCell>
                      {item.swapStatus ? (
                        <Badge variant="outline" className="text-[10px] border-info text-info">{item.swapStatus}</Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setLogDialog({ open: true, logs: item.logs, recordId: item.id })}
                        >
                          <FileText className="h-3.5 w-3.5" />
                        </Button>
                        {actions.length > 0 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {actions.map(action => (
                                <DropdownMenuItem
                                  key={action.to}
                                  className="text-xs"
                                  onClick={() => onStatusChange(item.id, item.status, action.to)}
                                >
                                  {action.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <OperationLogDialog
        open={logDialog.open}
        onOpenChange={(open) => setLogDialog(prev => ({ ...prev, open }))}
        logs={logDialog.logs}
        recordId={logDialog.recordId}
      />
    </>
  );
};

export default GiftCodeTable;
