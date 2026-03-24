import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

interface FilterBarProps {
  filters: {
    skuName: string;
    code: string;
    status: string;
    viewStatus: string;
    userEmail: string;
    orderNo: string;
    createdBy: string;
    swapStatus: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const FilterBar = ({ filters, onFilterChange, onSearch, onReset }: FilterBarProps) => {
  return (
    <div className="bg-card rounded-md border border-border p-4 space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Input
          placeholder="SKU名称"
          value={filters.skuName}
          onChange={(e) => onFilterChange('skuName', e.target.value)}
          className="h-8 text-xs"
        />
        <Input
          placeholder="礼品码"
          value={filters.code}
          onChange={(e) => onFilterChange('code', e.target.value)}
          className="h-8 text-xs"
        />
        <Select value={filters.status} onValueChange={(v) => onFilterChange('status', v)}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="未售卖">未售卖</SelectItem>
            <SelectItem value="已售卖">已售卖</SelectItem>
            <SelectItem value="已退款">已退款</SelectItem>
            <SelectItem value="已退货">已退货</SelectItem>
            <SelectItem value="无效">无效</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.viewStatus} onValueChange={(v) => onFilterChange('viewStatus', v)}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="查看状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="未查看">未查看</SelectItem>
            <SelectItem value="已查看">已查看</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="用户邮箱"
          value={filters.userEmail}
          onChange={(e) => onFilterChange('userEmail', e.target.value)}
          className="h-8 text-xs"
        />
        <Input
          placeholder="订单号"
          value={filters.orderNo}
          onChange={(e) => onFilterChange('orderNo', e.target.value)}
          className="h-8 text-xs"
        />
        <Input
          placeholder="创建人"
          value={filters.createdBy}
          onChange={(e) => onFilterChange('createdBy', e.target.value)}
          className="h-8 text-xs"
        />
        <Select value={filters.swapStatus} onValueChange={(v) => onFilterChange('swapStatus', v)}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="换码状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="换码中">换码中</SelectItem>
            <SelectItem value="empty">空</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={onSearch} className="h-8 text-xs gap-1">
          <Search className="h-3.5 w-3.5" />
          搜索
        </Button>
        <Button size="sm" variant="outline" onClick={onReset} className="h-8 text-xs gap-1">
          <RotateCcw className="h-3.5 w-3.5" />
          重置
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
