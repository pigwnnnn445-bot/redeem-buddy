import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Pencil } from "lucide-react";
import type { GiftCode, GiftCodeStatus } from "@/lib/giftcode-data";
import OperationLogSheet from "./OperationLogSheet";
import EditRemarkDialog from "./EditRemarkDialog";

interface GiftCodeTableProps {
  data: GiftCode[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onStatusChange: (id: string, from: GiftCodeStatus, to: GiftCodeStatus) => void;
  onRemarkChange: (id: string, remark: string) => void;
}

const statusColorMap: Record<GiftCodeStatus, string> = {
  '未售卖': 'bg-secondary text-secondary-foreground',
  '已售卖': 'bg-success text-success-foreground',
  '已退款': 'bg-warning text-warning-foreground',
  '已退货': 'bg-destructive text-destructive-foreground',
  '无效': 'bg-muted text-muted-foreground',
};

const GiftCodeTable = ({ data, selectedIds, onSelectionChange, onStatusChange, onRemarkChange }: GiftCodeTableProps) => {
  const [logSheet, setLogSheet] = useState<{ open: boolean; logs: GiftCode['logs']; giftCodeId: string }>({
    open: false, logs: [], giftCodeId: '',
  });
  const [remarkDialog, setRemarkDialog] = useState<{ open: boolean; id: string; remark: string }>({
    open: false, id: '', remark: '',
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

  const getAvailableActions = (status: GiftCodeStatus): { label: string; from: GiftCodeStatus; to: GiftCodeStatus }[] => {
    switch (status) {
      case '已退款': return [
        { label: '转未售卖', from: '已退款', to: '未售卖' },
        { label: '转无效', from: '已退款', to: '无效' },
      ];
      case '已退货': return [
        { label: '转未售卖', from: '已退货', to: '未售卖' },
        { label: '转无效', from: '已退货', to: '无效' },
      ];
      default: return [];
    }
  };

  const canSwapCode = (item: GiftCode) => {
    return item.status === '已售卖' && item.viewStatus === '已查看';
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
              <TableHead className="text-xs font-semibold">ID</TableHead>
              <TableHead className="text-xs font-semibold">SKU名称</TableHead>
              <TableHead className="text-xs font-semibold">礼品码</TableHead>
              <TableHead className="text-xs font-semibold">状态</TableHead>
              <TableHead className="text-xs font-semibold">查看状态</TableHead>
              <TableHead className="text-xs font-semibold">用户邮箱</TableHead>
              <TableHead className="text-xs font-semibold">订单号</TableHead>
              <TableHead className="text-xs font-semibold">创建时间</TableHead>
              <TableHead className="text-xs font-semibold">创建人</TableHead>
              <TableHead className="text-xs font-semibold">一键换码</TableHead>
              <TableHead className="text-xs font-semibold">备注</TableHead>
              <TableHead className="text-xs font-semibold">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center text-muted-foreground py-16 text-sm">
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
                    <TableCell className="text-xs font-mono text-muted-foreground">{item.id}</TableCell>
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
                    <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate" title={item.remark}>
                      {item.remark || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 flex-nowrap">
                        {actions.map(action => (
                          <Button
                            key={action.to}
                            variant="link"
                            size="sm"
                            className="h-6 px-1 text-[11px] text-primary"
                            onClick={() => onStatusChange(item.id, action.from, action.to)}
                          >
                            {action.label}
                          </Button>
                        ))}
                        {canSwapCode(item) && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-6 px-1 text-[11px] text-primary"
                            onClick={() => onStatusChange(item.id, '已售卖', '已退货')}
                          >
                            一键换码
                          </Button>
                        )}
                        <Button
                          variant="link"
                          size="sm"
                          className="h-6 px-1 text-[11px] text-muted-foreground gap-0.5"
                          onClick={() => setRemarkDialog({ open: true, id: item.id, remark: item.remark })}
                        >
                          <Pencil className="h-3 w-3" />
                          备注
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-6 px-1 text-[11px] text-muted-foreground gap-0.5"
                          onClick={() => setLogSheet({ open: true, logs: item.logs, giftCodeId: item.id })}
                        >
                          <FileText className="h-3 w-3" />
                          日志
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <OperationLogSheet
        open={logSheet.open}
        onOpenChange={(open) => setLogSheet(prev => ({ ...prev, open }))}
        logs={logSheet.logs}
        giftCodeId={logSheet.giftCodeId}
      />

      <EditRemarkDialog
        open={remarkDialog.open}
        onOpenChange={(open) => setRemarkDialog(prev => ({ ...prev, open }))}
        remark={remarkDialog.remark}
        onSave={(remark) => {
          onRemarkChange(remarkDialog.id, remark);
          setRemarkDialog({ open: false, id: '', remark: '' });
        }}
      />
    </>
  );
};

export default GiftCodeTable;
