export type GiftCodeStatus = '未售卖' | '已售卖' | '已退款' | '已退货' | '无效';
export type ViewStatus = '未查看' | '已查看';
export type SwapStatus = '换码中' | '';

export interface OperationLog {
  id: string;
  recordId: string;
  remark: string;
  time: string;
  operator: string;
}

export interface GiftCode {
  id: string;
  skuName: string;
  code: string;
  status: GiftCodeStatus;
  viewStatus: ViewStatus;
  userEmail: string | null;
  orderNo: string | null;
  createdAt: string;
  createdBy: string;
  swapStatus: SwapStatus;
  remark: string;
  logs: OperationLog[];
}

export interface SKU {
  id: string;
  name: string;
  type: 'gift_code' | 'physical';
}

export const mockSKUs: SKU[] = [
  { id: 'sku-001', name: 'Netflix 月卡', type: 'gift_code' },
  { id: 'sku-002', name: 'Spotify 季卡', type: 'gift_code' },
  { id: 'sku-003', name: 'Steam 50美元', type: 'gift_code' },
  { id: 'sku-004', name: 'iTunes 25美元', type: 'gift_code' },
  { id: 'sku-005', name: '实物商品A', type: 'physical' },
];

export const mockCreators = ['admin', 'operator1', 'operator2'];

export const mockGiftCodes: GiftCode[] = [
  {
    id: '1', skuName: 'Netflix 月卡', code: 'NF-ABCD-1234-EFGH',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-23 15:18:35', createdBy: 'admin', swapStatus: '', remark: '', logs: [],
  },
  {
    id: '2', skuName: 'Spotify 季卡', code: 'SP-WXYZ-5678-IJKL',
    status: '已售卖', viewStatus: '已查看', userEmail: 'user@example.com', orderNo: 'ORD-20260320-001',
    createdAt: '2026-03-20 16:02:43', createdBy: 'admin', swapStatus: '', remark: '',
    logs: [
      { id: 'log-1', recordId: '2', remark: '创建礼品码', time: '2026-03-20 16:02:43', operator: 'admin' },
      { id: 'log-1b', recordId: '2', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-21 10:00:00', operator: 'user@example.com' },
    ],
  },
  {
    id: '3', skuName: 'Steam 50美元', code: 'ST-MNOP-9012-QRST',
    status: '已退款', viewStatus: '已查看', userEmail: 'buyer@test.com', orderNo: 'ORD-20260317-045',
    createdAt: '2026-03-17 04:13:45', createdBy: 'operator1', swapStatus: '', remark: '客户要求退款',
    logs: [
      { id: 'log-2', recordId: '3', remark: '创建礼品码', time: '2026-03-17 04:13:45', operator: 'operator1' },
      { id: 'log-2b', recordId: '3', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-17 07:30:12', operator: 'buyer@test.com' },
      { id: 'log-4', recordId: '3', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-18 10:00:00', operator: 'admin' },
    ],
  },
  {
    id: '4', skuName: 'iTunes 25美元', code: 'IT-UVWX-3456-YZAB',
    status: '已退货', viewStatus: '已查看', userEmail: 'customer@mail.com', orderNo: 'ORD-20260317-046',
    createdAt: '2026-03-17 04:13:23', createdBy: 'operator1', swapStatus: '换码中', remark: '',
    logs: [
      { id: 'log-5', recordId: '4', remark: '创建礼品码', time: '2026-03-17 04:13:23', operator: 'operator1' },
      { id: 'log-5b', recordId: '4', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-18 06:00:00', operator: 'customer@mail.com' },
      { id: 'log-5c', recordId: '4', remark: '状态变更: 已售卖 → 已退货', time: '2026-03-19 07:00:00', operator: 'admin' },
      { id: 'log-6', recordId: '4', remark: '一键换码操作', time: '2026-03-19 08:00:00', operator: 'admin' },
    ],
  },
  {
    id: '5', skuName: 'Netflix 月卡', code: 'NF-CDEF-7890-GHIJ',
    status: '无效', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-15 10:30:00', createdBy: 'admin', swapStatus: '', remark: '',
    logs: [{ id: 'log-7', recordId: '5', remark: '标记为无效', time: '2026-03-16 09:00:00', operator: 'admin' }],
  },
  {
    id: '6', skuName: 'Spotify 季卡', code: 'SP-KLMN-1234-OPQR',
    status: '已退款', viewStatus: '未查看', userEmail: 'refund@user.com', orderNo: 'ORD-20260310-100',
    createdAt: '2026-03-10 08:00:00', createdBy: 'admin', swapStatus: '', remark: '',
    logs: [
      { id: 'log-8', recordId: '6', remark: '创建礼品码', time: '2026-03-10 08:00:00', operator: 'admin' },
      { id: 'log-8b', recordId: '6', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-11 12:00:00', operator: 'refund@user.com' },
      { id: 'log-8c', recordId: '6', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-12 09:00:00', operator: 'admin' },
    ],
  },
  {
    id: '7', skuName: 'Steam 50美元', code: 'ST-STUV-5678-WXYZ',
    status: '已退货', viewStatus: '已查看', userEmail: 'return@user.com', orderNo: 'ORD-20260312-200',
    createdAt: '2026-03-12 14:22:00', createdBy: 'operator2', swapStatus: '', remark: '',
    logs: [
      { id: 'log-9', recordId: '7', remark: '创建礼品码', time: '2026-03-12 14:22:00', operator: 'operator2' },
      { id: 'log-9b', recordId: '7', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-13 11:00:00', operator: 'return@user.com' },
      { id: 'log-9c', recordId: '7', remark: '状态变更: 已售卖 → 已退货', time: '2026-03-14 15:00:00', operator: 'admin' },
    ],
  },
];
