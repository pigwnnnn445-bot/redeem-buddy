import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Search, RotateCcw, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { mockCreators } from "@/lib/giftcode-data";

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
    swapCount: string;
    dateFrom: Date | undefined;
    dateTo: Date | undefined;
    soldFrom: Date | undefined;
    soldTo: Date | undefined;
  };
  onFilterChange: (key: string, value: any) => void;
  onSearch: () => void;
  onReset: () => void;
}

const FilterBar = ({ filters, onFilterChange, onSearch, onReset }: FilterBarProps) => {
  return (
    <div className="bg-card rounded-md border border-border p-4 space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
        <Select value={filters.createdBy} onValueChange={(v) => onFilterChange('createdBy', v)}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="创建人" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部创建人</SelectItem>
            {mockCreators.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Input
          placeholder="换码次数"
          type="number"
          value={filters.swapCount}
          onChange={(e) => onFilterChange('swapCount', e.target.value)}
          className="h-8 text-xs"
        />
        <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">创建时间</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 text-xs gap-1 justify-start font-normal">
              <CalendarIcon className="h-3.5 w-3.5" />
              {filters.dateFrom ? format(filters.dateFrom, 'yyyy-MM-dd', { locale: zhCN }) : '开始日期'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.dateFrom}
              onSelect={(d) => onFilterChange('dateFrom', d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 text-xs gap-1 justify-start font-normal">
              <CalendarIcon className="h-3.5 w-3.5" />
              {filters.dateTo ? format(filters.dateTo, 'yyyy-MM-dd', { locale: zhCN }) : '结束日期'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.dateTo}
              onSelect={(d) => onFilterChange('dateTo', d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">售卖时间</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 text-xs gap-1 justify-start font-normal">
              <CalendarIcon className="h-3.5 w-3.5" />
              {filters.soldFrom ? format(filters.soldFrom, 'yyyy-MM-dd', { locale: zhCN }) : '开始日期'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.soldFrom}
              onSelect={(d) => onFilterChange('soldFrom', d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 text-xs gap-1 justify-start font-normal">
              <CalendarIcon className="h-3.5 w-3.5" />
              {filters.soldTo ? format(filters.soldTo, 'yyyy-MM-dd', { locale: zhCN }) : '结束日期'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.soldTo}
              onSelect={(d) => onFilterChange('soldTo', d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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