import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Search, RotateCcw, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { mockCreators, mockSKUs } from "@/lib/giftcode-data";

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

const setTimeOnDate = (date: Date | undefined, timeStr: string): Date | undefined => {
  if (!date) return undefined;
  const [h, m, s] = timeStr.split(':').map(Number);
  const d = new Date(date);
  d.setHours(h || 0, m || 0, s || 0, 0);
  return d;
};

const getTimeStr = (date: Date | undefined): string => {
  if (!date) return '00:00:00';
  return format(date, 'HH:mm:ss');
};

const DateTimePicker = ({
  date,
  onDateChange,
  placeholder,
}: {
  date: Date | undefined;
  onDateChange: (d: Date | undefined) => void;
  placeholder: string;
}) => {
  const handleDateSelect = (d: Date | undefined) => {
    if (!d) { onDateChange(undefined); return; }
    const time = getTimeStr(date);
    onDateChange(setTimeOnDate(d, time));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!date) return;
    onDateChange(setTimeOnDate(date, e.target.value));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 text-xs gap-1 justify-start font-normal flex-1 min-w-0">
          <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {date ? format(date, 'yyyy-MM-dd HH:mm:ss', { locale: zhCN }) : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus className="p-3 pointer-events-auto" />
        <div className="px-3 pb-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">时间</span>
          <Input
            type="time"
            step="1"
            value={getTimeStr(date)}
            onChange={handleTimeChange}
            className="h-7 text-xs w-[110px]"
            disabled={!date}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const FilterBar = ({ filters, onFilterChange, onSearch, onReset }: FilterBarProps) => {
  return (
    <div className="bg-card rounded-md border border-border p-4 space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">SKU名称</span>
          <Select value={filters.skuName} onValueChange={(v) => onFilterChange('skuName', v)}>
            <SelectTrigger className="h-8 text-xs flex-1 min-w-0">
              <SelectValue placeholder="全部" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部SKU</SelectItem>
              {mockSKUs.filter(s => s.type === 'gift_code').map(sku => (
                <SelectItem key={sku.id} value={sku.name}>{sku.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">礼品码</span>
          <Input
            placeholder="请输入"
            value={filters.code}
            onChange={(e) => onFilterChange('code', e.target.value)}
            className="h-8 text-xs flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">状态</span>
          <Select value={filters.status} onValueChange={(v) => onFilterChange('status', v)}>
            <SelectTrigger className="h-8 text-xs flex-1 min-w-0">
              <SelectValue placeholder="全部" />
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
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">查看状态</span>
          <Select value={filters.viewStatus} onValueChange={(v) => onFilterChange('viewStatus', v)}>
            <SelectTrigger className="h-8 text-xs flex-1 min-w-0">
              <SelectValue placeholder="全部" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="未查看">未查看</SelectItem>
              <SelectItem value="已查看">已查看</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">用户邮箱</span>
          <Input
            placeholder="请输入"
            value={filters.userEmail}
            onChange={(e) => onFilterChange('userEmail', e.target.value)}
            className="h-8 text-xs flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">订单号</span>
          <Input
            placeholder="请输入"
            value={filters.orderNo}
            onChange={(e) => onFilterChange('orderNo', e.target.value)}
            className="h-8 text-xs flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">创建人</span>
          <Select value={filters.createdBy} onValueChange={(v) => onFilterChange('createdBy', v)}>
            <SelectTrigger className="h-8 text-xs flex-1 min-w-0">
              <SelectValue placeholder="全部" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部创建人</SelectItem>
              {mockCreators.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">换码状态</span>
          <Select value={filters.swapStatus} onValueChange={(v) => onFilterChange('swapStatus', v)}>
            <SelectTrigger className="h-8 text-xs flex-1 min-w-0">
              <SelectValue placeholder="全部" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="换码中">换码中</SelectItem>
              <SelectItem value="empty">空</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">换码次数</span>
          <Input
            placeholder="请输入"
            type="number"
            value={filters.swapCount}
            onChange={(e) => onFilterChange('swapCount', e.target.value)}
            className="h-8 text-xs flex-1 min-w-0"
          />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">创建时间</span>
          <DateTimePicker date={filters.dateFrom} onDateChange={(d) => onFilterChange('dateFrom', d)} placeholder="开始时间" />
          <span className="text-xs text-muted-foreground">~</span>
          <DateTimePicker date={filters.dateTo} onDateChange={(d) => onFilterChange('dateTo', d)} placeholder="结束时间" />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">售卖时间</span>
          <DateTimePicker date={filters.soldFrom} onDateChange={(d) => onFilterChange('soldFrom', d)} placeholder="开始时间" />
          <span className="text-xs text-muted-foreground">~</span>
          <DateTimePicker date={filters.soldTo} onDateChange={(d) => onFilterChange('soldTo', d)} placeholder="结束时间" />
        </div>
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