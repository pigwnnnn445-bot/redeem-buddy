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
    id: '2', skuName: 'Netflix 月卡', code: 'NF-QWER-4567-TYUI',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-23 14:00:00', createdBy: 'operator1', swapStatus: '', remark: '', logs: [],
  },
  {
    id: '3', skuName: 'Spotify 季卡', code: 'SP-WXYZ-5678-IJKL',
    status: '已售卖', viewStatus: '已查看', userEmail: 'user@example.com', orderNo: 'ORD-20260320-001',
    createdAt: '2026-03-20 16:02:43', createdBy: 'admin', swapStatus: '', remark: '',
    logs: [
      { id: 'log-1', recordId: '3', remark: '创建礼品码', time: '2026-03-20 16:02:43', operator: 'admin' },
      { id: 'log-1b', recordId: '3', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-21 10:00:00', operator: 'user@example.com' },
    ],
  },
  {
    id: '4', skuName: 'Steam 50美元', code: 'ST-MNOP-9012-QRST',
    status: '已售卖', viewStatus: '未查看', userEmail: 'newbuyer@test.com', orderNo: 'ORD-20260322-010',
    createdAt: '2026-03-22 09:30:00', createdBy: 'operator2', swapStatus: '', remark: '',
    logs: [
      { id: 'log-2', recordId: '4', remark: '创建礼品码', time: '2026-03-22 09:30:00', operator: 'operator2' },
      { id: 'log-2b', recordId: '4', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-22 14:00:00', operator: 'newbuyer@test.com' },
    ],
  },
  {
    id: '5', skuName: 'iTunes 25美元', code: 'IT-ASDF-1122-GHJK',
    status: '已售卖', viewStatus: '已查看', userEmail: 'alice@mail.com', orderNo: 'ORD-20260319-055',
    createdAt: '2026-03-19 11:00:00', createdBy: 'admin', swapStatus: '换码中', remark: '客户反馈码无效',
    logs: [
      { id: 'log-3', recordId: '5', remark: '创建礼品码', time: '2026-03-19 11:00:00', operator: 'admin' },
      { id: 'log-3b', recordId: '5', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-19 18:00:00', operator: 'alice@mail.com' },
    ],
  },
  {
    id: '6', skuName: 'Steam 50美元', code: 'ST-ZXCV-3344-BNML',
    status: '已退款', viewStatus: '已查看', userEmail: 'buyer@test.com', orderNo: 'ORD-20260317-045',
    createdAt: '2026-03-17 04:13:45', createdBy: 'operator1', swapStatus: '', remark: '客户要求退款',
    logs: [
      { id: 'log-4', recordId: '6', remark: '创建礼品码', time: '2026-03-17 04:13:45', operator: 'operator1' },
      { id: 'log-4b', recordId: '6', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-17 07:30:12', operator: 'buyer@test.com' },
      { id: 'log-4c', recordId: '6', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-18 10:00:00', operator: 'admin' },
    ],
  },
  {
    id: '7', skuName: 'iTunes 25美元', code: 'IT-UVWX-3456-YZAB',
    status: '已退货', viewStatus: '已查看', userEmail: 'customer@mail.com', orderNo: 'ORD-20260317-046',
    createdAt: '2026-03-17 04:13:23', createdBy: 'operator1', swapStatus: '', remark: '',
    logs: [
      { id: 'log-5', recordId: '7', remark: '创建礼品码', time: '2026-03-17 04:13:23', operator: 'operator1' },
      { id: 'log-5b', recordId: '7', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-18 06:00:00', operator: 'customer@mail.com' },
      { id: 'log-5c', recordId: '7', remark: '状态变更: 已售卖 → 已退货', time: '2026-03-19 07:00:00', operator: 'admin' },
    ],
  },
  {
    id: '8', skuName: 'Netflix 月卡', code: 'NF-CDEF-7890-GHIJ',
    status: '无效', viewStatus: '已查看', userEmail: 'invalid@user.com', orderNo: 'ORD-20260315-022',
    createdAt: '2026-03-15 10:30:00', createdBy: 'admin', swapStatus: '', remark: '码已被使用，标记无效',
    logs: [
      { id: 'log-6', recordId: '8', remark: '创建礼品码', time: '2026-03-15 10:30:00', operator: 'admin' },
      { id: 'log-6a', recordId: '8', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-15 14:00:00', operator: 'invalid@user.com' },
      { id: 'log-6b', recordId: '8', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-15 18:00:00', operator: 'admin' },
      { id: 'log-6c', recordId: '8', remark: '状态变更: 已退款 → 无效', time: '2026-03-16 09:00:00', operator: 'admin' },
    ],
  },
  {
    id: '9', skuName: 'Spotify 季卡', code: 'SP-KLMN-1234-OPQR',
    status: '已退款', viewStatus: '已查看', userEmail: 'refund@user.com', orderNo: 'ORD-20260310-100',
    createdAt: '2026-03-10 08:00:00', createdBy: 'admin', swapStatus: '', remark: '',
    logs: [
      { id: 'log-7', recordId: '9', remark: '创建礼品码', time: '2026-03-10 08:00:00', operator: 'admin' },
      { id: 'log-7b', recordId: '9', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-11 12:00:00', operator: 'refund@user.com' },
      { id: 'log-7c', recordId: '9', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-12 09:00:00', operator: 'admin' },
    ],
  },
  {
    id: '10', skuName: 'Steam 50美元', code: 'ST-STUV-5678-WXYZ',
    status: '已退货', viewStatus: '已查看', userEmail: 'return@user.com', orderNo: 'ORD-20260312-200',
    createdAt: '2026-03-12 14:22:00', createdBy: 'operator2', swapStatus: '', remark: '',
    logs: [
      { id: 'log-8', recordId: '10', remark: '创建礼品码', time: '2026-03-12 14:22:00', operator: 'operator2' },
      { id: 'log-8b', recordId: '10', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-13 11:00:00', operator: 'return@user.com' },
      { id: 'log-8c', recordId: '10', remark: '状态变更: 已售卖 → 已退货', time: '2026-03-14 15:00:00', operator: 'admin' },
    ],
  },
  {
    id: '11', skuName: 'Netflix 月卡', code: 'NF-POIU-9988-LKJH',
    status: '已售卖', viewStatus: '已查看', userEmail: 'bob@example.com', orderNo: 'ORD-20260321-077',
    createdAt: '2026-03-21 08:15:00', createdBy: 'operator1', swapStatus: '换码中', remark: '等待新码',
    logs: [
      { id: 'log-9', recordId: '11', remark: '创建礼品码', time: '2026-03-21 08:15:00', operator: 'operator1' },
      { id: 'log-9b', recordId: '11', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-21 15:00:00', operator: 'bob@example.com' },
    ],
  },
  {
    id: '12', skuName: 'Spotify 季卡', code: 'SP-FGHJ-2233-KLZX',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-24 09:00:00', createdBy: 'operator2', swapStatus: '', remark: '', logs: [],
  },
  {
    id: '13', skuName: 'iTunes 25美元', code: 'IT-BNMC-4455-VWQR',
    status: '已售卖', viewStatus: '已查看', userEmail: 'charlie@mail.com', orderNo: 'ORD-20260318-033',
    createdAt: '2026-03-18 13:45:00', createdBy: 'admin', swapStatus: '', remark: '',
    logs: [
      { id: 'log-10', recordId: '13', remark: '创建礼品码', time: '2026-03-18 13:45:00', operator: 'admin' },
      { id: 'log-10b', recordId: '13', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-18 20:00:00', operator: 'charlie@mail.com' },
    ],
  },
  {
    id: '14', skuName: 'Steam 50美元', code: 'ST-RTYU-6677-IOPA',
    status: '已退款', viewStatus: '已查看', userEmail: 'david@test.com', orderNo: 'ORD-20260316-088',
    createdAt: '2026-03-16 17:00:00', createdBy: 'operator1', swapStatus: '', remark: '重复购买退款',
    logs: [
      { id: 'log-11', recordId: '14', remark: '创建礼品码', time: '2026-03-16 17:00:00', operator: 'operator1' },
      { id: 'log-11b', recordId: '14', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-16 22:00:00', operator: 'david@test.com' },
      { id: 'log-11c', recordId: '14', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-17 10:00:00', operator: 'admin' },
    ],
  },
  {
    id: '15', skuName: 'Netflix 月卡', code: 'NF-TYUI-8899-OPAS',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-24 10:30:00', createdBy: 'admin', swapStatus: '', remark: '', logs: [],
  },
  {
    id: '16', skuName: 'Netflix 月卡', code: 'NF-QAZW-1122-SXED',
    status: '已退款', viewStatus: '未查看', userEmail: 'emma@mail.com', orderNo: 'ORD-20260322-111',
    createdAt: '2026-03-22 11:00:00', createdBy: 'operator1', swapStatus: '', remark: '',
    logs: [
      { id: 'log-12', recordId: '16', remark: '创建礼品码', time: '2026-03-22 11:00:00', operator: 'operator1' },
      { id: 'log-12b', recordId: '16', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-22 16:00:00', operator: 'emma@mail.com' },
      { id: 'log-12c', recordId: '16', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-23 09:00:00', operator: 'emma@mail.com' },
    ],
  },
  {
    id: '17', skuName: 'Spotify 季卡', code: 'SP-RFVB-3344-TGHN',
    status: '已退款', viewStatus: '未查看', userEmail: 'frank@test.com', orderNo: 'ORD-20260323-222',
    createdAt: '2026-03-23 07:30:00', createdBy: 'admin', swapStatus: '', remark: '用户主动申请退款',
    logs: [
      { id: 'log-13', recordId: '17', remark: '创建礼品码', time: '2026-03-23 07:30:00', operator: 'admin' },
      { id: 'log-13b', recordId: '17', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-23 10:00:00', operator: 'frank@test.com' },
      { id: 'log-13c', recordId: '17', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-23 18:00:00', operator: 'frank@test.com' },
    ],
  },
  {
    id: '18', skuName: 'Steam 50美元', code: 'ST-YHNM-5566-UJKL',
    status: '已退款', viewStatus: '未查看', userEmail: 'grace@example.com', orderNo: 'ORD-20260324-333',
    createdAt: '2026-03-24 08:00:00', createdBy: 'operator2', swapStatus: '', remark: '',
    logs: [
      { id: 'log-14', recordId: '18', remark: '创建礼品码', time: '2026-03-24 08:00:00', operator: 'operator2' },
      { id: 'log-14b', recordId: '18', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-24 10:30:00', operator: 'grace@example.com' },
      { id: 'log-14c', recordId: '18', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-24 12:00:00', operator: 'grace@example.com' },
    ],
  },
];
