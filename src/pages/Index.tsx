import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import FilterBar from "@/components/giftcode/FilterBar";
import ImportSheet from "@/components/giftcode/ImportSheet";
import GiftCodeTable from "@/components/giftcode/GiftCodeTable";
import { mockGiftCodes, mockSKUs, type GiftCode, type GiftCodeStatus } from "@/lib/giftcode-data";

const defaultFilters = {
  skuName: '', code: '', status: 'all', viewStatus: 'all',
  userEmail: '', orderNo: '', createdBy: 'all', swapStatus: 'all',
  swapCount: '',
  dateFrom: undefined as Date | undefined,
  dateTo: undefined as Date | undefined,
  soldFrom: undefined as Date | undefined,
  soldTo: undefined as Date | undefined,
};

const PAGE_SIZE = 20;

const Index = () => {
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>(mockGiftCodes);
  const [filters, setFilters] = useState(defaultFilters);
  const [activeFilters, setActiveFilters] = useState(defaultFilters);
  const [importOpen, setImportOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return giftCodes.filter(item => {
      const f = activeFilters;
      if (f.skuName && !item.skuName.includes(f.skuName)) return false;
      if (f.code && !item.code.includes(f.code)) return false;
      if (f.status !== 'all' && item.status !== f.status) return false;
      if (f.viewStatus !== 'all' && item.viewStatus !== f.viewStatus) return false;
      if (f.userEmail && !(item.userEmail || '').includes(f.userEmail)) return false;
      if (f.orderNo && !(item.orderNo || '').includes(f.orderNo)) return false;
      if (f.createdBy !== 'all' && item.createdBy !== f.createdBy) return false;
      if (f.swapStatus !== 'all') {
        if (f.swapStatus === 'empty' && item.swapStatus !== '') return false;
        if (f.swapStatus === '换码中' && item.swapStatus !== '换码中') return false;
      }
      if (f.swapCount !== '' && item.swapCount !== parseInt(f.swapCount)) return false;
      if (f.dateFrom) {
        const itemDate = new Date(item.createdAt);
        if (itemDate < f.dateFrom) return false;
      }
      if (f.dateTo) {
        const itemDate = new Date(item.createdAt);
        if (itemDate > f.dateTo) return false;
      }
      if (f.soldFrom && item.soldAt) {
        const soldDate = new Date(item.soldAt);
        if (soldDate < f.soldFrom) return false;
      }
      if (f.soldFrom && !item.soldAt) return false;
      if (f.soldTo && item.soldAt) {
        const soldDate = new Date(item.soldAt);
        if (soldDate > f.soldTo) return false;
      }
      if (f.soldTo && !item.soldAt) return false;
      return true;
    });
  }, [giftCodes, activeFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedData = filteredData.slice((safeCurrentPage - 1) * PAGE_SIZE, safeCurrentPage * PAGE_SIZE);

  const handleStatusChange = (id: string, from: GiftCodeStatus, to: GiftCodeStatus) => {
    const item = giftCodes.find(g => g.id === id);
    if (!item) {
      toast.error('礼品码不存在');
      return;
    }
    if (item.status !== from) {
      toast.error(`操作失败：当前状态为"${item.status}"，非"${from}"，无法执行该操作`);
      return;
    }
    setGiftCodes(prev => prev.map(g => {
      if (g.id !== id) return g;
      const log = {
        id: `log-${Date.now()}`, recordId: id,
        remark: `状态变更: ${from} → ${to}`,
        time: new Date().toLocaleString('zh-CN'), operator: 'admin',
      };
      return { ...g, status: to, logs: [...g.logs, log] };
    }));
    toast.success(`礼品码状态已从 ${from} 变更为 ${to}`);
  };

  const handleSwapCode = (id: string) => {
    const item = giftCodes.find(g => g.id === id);
    if (!item) {
      toast.error('礼品码不存在');
      return;
    }
    if (item.status !== '已售卖') {
      toast.error(`操作失败：当前状态为"${item.status}"，非"已售卖"，无法执行换码`);
      return;
    }
    if (item.viewStatus !== '已查看') {
      toast.error('操作失败：当前查看状态为"未查看"，无法执行换码');
      return;
    }
    setGiftCodes(prev => prev.map(g => {
      if (g.id !== id) return g;
      const log = {
        id: `log-${Date.now()}`, recordId: id,
        remark: '一键换码操作',
        time: new Date().toLocaleString('zh-CN'), operator: 'admin',
      };
      return {
        ...g,
        status: '已退货' as const,
        swapCount: g.swapCount + 1,
        logs: [...g.logs, log],
      };
    }));
    toast.success('一键换码成功，状态已变更为已退货');
  };

  const handleRemarkChange = (id: string, remark: string) => {
    setGiftCodes(prev => prev.map(item => {
      if (item.id !== id) return item;
      const log = {
        id: `log-${Date.now()}`, recordId: id,
        remark: `编辑备注: ${remark}`,
        time: new Date().toLocaleString('zh-CN'), operator: 'admin',
      };
      return { ...item, remark, logs: [...item.logs, log] };
    }));
    toast.success('备注已更新');
  };

  const handleBatchAction = (from: GiftCodeStatus, to: GiftCodeStatus) => {
    if (selectedIds.length === 0) {
      toast.error('请先选择礼品码');
      return;
    }
    // 实时校验每条记录的当前状态
    const eligible = selectedIds.filter(id => {
      const item = giftCodes.find(g => g.id === id);
      return item?.status === from;
    });
    const skipped = selectedIds.length - eligible.length;
    if (eligible.length === 0) {
      toast.error(`选中项中没有状态为"${from}"的礼品码，无法执行操作`);
      return;
    }
    setGiftCodes(prev => prev.map(item => {
      if (!eligible.includes(item.id)) return item;
      // 再次校验防止并发状态变更
      if (item.status !== from) return item;
      const log = {
        id: `log-${Date.now()}-${item.id}`, recordId: item.id,
        remark: `批量操作 - 状态变更: ${from} → ${to}`,
        time: new Date().toLocaleString('zh-CN'), operator: 'admin',
      };
      return { ...item, status: to, logs: [...item.logs, log] };
    }));
    setSelectedIds([]);
    const msg = skipped > 0
      ? `成功变更 ${eligible.length} 条，跳过 ${skipped} 条状态不符的记录`
      : `已批量变更 ${eligible.length} 个礼品码状态`;
    toast.success(msg);
  };

  const handleImport = (skuId: string, codes: string[]) => {
    const sku = mockSKUs.find(s => s.id === skuId);
    const skuName = sku?.name || '';
    const newCodes: GiftCode[] = codes.map((code, i) => ({
      id: `${Date.now()}-${i}`, skuName, code,
      status: '未售卖' as const, viewStatus: '未查看' as const,
      userEmail: null, orderNo: null,
      createdAt: new Date().toLocaleString('zh-CN'), createdBy: 'admin',
      swapStatus: '' as const, swapCount: 0, soldAt: null, remark: '',
      logs: [{ id: `log-new-${Date.now()}-${i}`, recordId: `${Date.now()}-${i}`, remark: '导入礼品码', time: new Date().toLocaleString('zh-CN'), operator: 'admin' }],
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
        <FilterBar
          filters={filters}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          onSearch={() => { setActiveFilters(filters); setCurrentPage(1); }}
          onReset={() => { setFilters(defaultFilters); setActiveFilters(defaultFilters); setCurrentPage(1); }}
        />

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
          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => handleBatchAction('未售卖', '无效')}>
            批量未售卖→无效
          </Button>
          {selectedIds.length > 0 && (
            <span className="text-xs text-muted-foreground ml-2">已选 {selectedIds.length} 项</span>
          )}
        </div>

        <GiftCodeTable
          data={paginatedData}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onStatusChange={handleStatusChange}
          onRemarkChange={handleRemarkChange}
          onSwapCode={handleSwapCode}
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              第 {safeCurrentPage}/{totalPages} 页，共 {filteredData.length} 条
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                上一页
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 2)
                .reduce<(number | string)[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  typeof p === 'string' ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted-foreground">...</span>
                  ) : (
                    <Button
                      key={p}
                      variant={p === safeCurrentPage ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 w-7 text-xs p-0"
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
                    </Button>
                  )
                )}
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                下一页
              </Button>
            </div>
          </div>
        )}
      </div>

      <ImportSheet open={importOpen} onOpenChange={setImportOpen} onImport={handleImport} existingCodes={giftCodes} />
    </div>
  );
};

export default Index;