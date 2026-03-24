import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import FilterBar from "@/components/giftcode/FilterBar";
import ImportSheet from "@/components/giftcode/ImportSheet";
import GiftCodeTable from "@/components/giftcode/GiftCodeTable";
import { mockGiftCodes, type GiftCode, type GiftCodeStatus } from "@/lib/giftcode-data";

const defaultFilters = {
  skuName: '', code: '', status: 'all', viewStatus: 'all',
  userEmail: '', orderNo: '', createdBy: '', swapStatus: 'all',
};

const Index = () => {
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>(mockGiftCodes);
  const [filters, setFilters] = useState(defaultFilters);
  const [activeFilters, setActiveFilters] = useState(defaultFilters);
  const [importOpen, setImportOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return giftCodes.filter(item => {
      const f = activeFilters;
      if (f.skuName && !item.skuName.includes(f.skuName)) return false;
      if (f.code && !item.code.includes(f.code)) return false;
      if (f.status !== 'all' && item.status !== f.status) return false;
      if (f.viewStatus !== 'all' && item.viewStatus !== f.viewStatus) return false;
      if (f.userEmail && !(item.userEmail || '').includes(f.userEmail)) return false;
      if (f.orderNo && !(item.orderNo || '').includes(f.orderNo)) return false;
      if (f.createdBy && !item.createdBy.includes(f.createdBy)) return false;
      if (f.swapStatus !== 'all') {
        if (f.swapStatus === 'empty' && item.swapStatus !== '') return false;
        if (f.swapStatus === '换码中' && item.swapStatus !== '换码中') return false;
      }
      return true;
    });
  }, [giftCodes, activeFilters]);

  const handleStatusChange = (id: string, from: GiftCodeStatus, to: GiftCodeStatus) => {
    setGiftCodes(prev => prev.map(item => {
      if (item.id !== id) return item;
      const log = {
        id: `log-${Date.now()}`, recordId: id,
        remark: `状态变更: ${from} → ${to}`,
        time: new Date().toLocaleString('zh-CN'), operator: 'admin',
      };
      return { ...item, status: to, logs: [...item.logs, log] };
    }));
    toast.success(`礼品码状态已从 ${from} 变更为 ${to}`);
  };

  const handleBatchAction = (from: GiftCodeStatus, to: GiftCodeStatus) => {
    const eligible = selectedIds.filter(id => {
      const item = giftCodes.find(g => g.id === id);
      return item?.status === from;
    });
    if (eligible.length === 0) {
      toast.error(`选中项中没有状态为"${from}"的礼品码`);
      return;
    }
    setGiftCodes(prev => prev.map(item => {
      if (!eligible.includes(item.id)) return item;
      const log = {
        id: `log-${Date.now()}-${item.id}`, recordId: item.id,
        remark: `批量操作 - 状态变更: ${from} → ${to}`,
        time: new Date().toLocaleString('zh-CN'), operator: 'admin',
      };
      return { ...item, status: to, logs: [...item.logs, log] };
    }));
    setSelectedIds([]);
    toast.success(`已批量变更 ${eligible.length} 个礼品码状态`);
  };

  const handleImport = (_skuId: string, codes: string[]) => {
    const skuName = codes.length > 0 ? 'Netflix 月卡' : '';
    const newCodes: GiftCode[] = codes.map((code, i) => ({
      id: `new-${Date.now()}-${i}`, skuName, code,
      status: '未售卖' as const, viewStatus: '未查看' as const,
      userEmail: null, orderNo: null,
      createdAt: new Date().toLocaleString('zh-CN'), createdBy: 'admin',
      swapStatus: '' as const,
      logs: [{ id: `log-new-${Date.now()}-${i}`, recordId: `new-${Date.now()}-${i}`, remark: '导入礼品码', time: new Date().toLocaleString('zh-CN'), operator: 'admin' }],
    }));
    setGiftCodes(prev => [...newCodes, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card px-6 py-3">
        <h1 className="text-base font-semibold text-foreground">礼品码管理</h1>
        <p className="text-xs text-muted-foreground">共 {filteredData.length} 条记录</p>
      </div>

      <div className="p-4 space-y-3">
        {/* Filter Area */}
        <FilterBar
          filters={filters}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          onSearch={() => setActiveFilters(filters)}
          onReset={() => { setFilters(defaultFilters); setActiveFilters(defaultFilters); }}
        />

        {/* Action Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="sm" onClick={() => setImportOpen(true)} className="h-8 text-xs gap-1">
            <Upload className="h-3.5 w-3.5" />
            导入礼品码
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => handleBatchAction('已退款', '未售卖')}>
            批量已退款→未售卖
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => handleBatchAction('已退款', '无效')}>
            批量已退款→无效
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => handleBatchAction('已退货', '未售卖')}>
            批量已退货→未售卖
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => handleBatchAction('已退货', '无效')}>
            批量已退货→无效
          </Button>
          {selectedIds.length > 0 && (
            <span className="text-xs text-muted-foreground ml-2">已选 {selectedIds.length} 项</span>
          )}
        </div>

        {/* Table */}
        <GiftCodeTable
          data={filteredData}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onStatusChange={handleStatusChange}
        />
      </div>

      <ImportSheet open={importOpen} onOpenChange={setImportOpen} onImport={handleImport} />
    </div>
  );
};

export default Index;
