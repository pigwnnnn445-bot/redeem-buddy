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
  swapCount: number;
  soldAt: string | null;
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
    createdAt: '2026-03-23 15:18:35', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: null, remark: '',
    logs: [
      { id: 'log-0a', recordId: '1', remark: '创建礼品码', time: '2026-03-23 15:18:35', operator: 'admin' },
    ],
  },
  {
    id: '2', skuName: 'Netflix 月卡', code: 'NF-QWER-4567-TYUI',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-23 14:00:00', createdBy: 'operator1', swapStatus: '', swapCount: 0, soldAt: null, remark: '',
    logs: [
      { id: 'log-0b', recordId: '2', remark: '创建礼品码', time: '2026-03-23 14:00:00', operator: 'operator1' },
    ],
  },
  {
    id: '3', skuName: 'Spotify 季卡', code: 'SP-WXYZ-5678-IJKL',
    status: '已售卖', viewStatus: '已查看', userEmail: 'user@example.com', orderNo: 'ORD-20260320-001',
    createdAt: '2026-03-20 16:02:43', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: '2026-03-21 10:00:00', remark: '',
    logs: [
      { id: 'log-1', recordId: '3', remark: '创建礼品码', time: '2026-03-20 16:02:43', operator: 'admin' },
      { id: 'log-1b', recordId: '3', remark: '状态变更: 未售卖 → 已售卖，绑定用户: user@example.com，订单号: ORD-20260320-001，售卖时间: 2026-03-21 10:00:00', time: '2026-03-21 10:00:00', operator: 'user@example.com' },
      { id: 'log-1c', recordId: '3', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-21 10:05:00', operator: 'user@example.com' },
    ],
  },
  {
    id: '4', skuName: 'Steam 50美元', code: 'ST-MNOP-9012-QRST',
    status: '已售卖', viewStatus: '未查看', userEmail: 'newbuyer@test.com', orderNo: 'ORD-20260322-010',
    createdAt: '2026-03-22 09:30:00', createdBy: 'operator2', swapStatus: '', swapCount: 0, soldAt: '2026-03-22 14:00:00', remark: '',
    logs: [
      { id: 'log-2', recordId: '4', remark: '创建礼品码', time: '2026-03-22 09:30:00', operator: 'operator2' },
      { id: 'log-2b', recordId: '4', remark: '状态变更: 未售卖 → 已售卖，绑定用户: newbuyer@test.com，订单号: ORD-20260322-010，售卖时间: 2026-03-22 14:00:00', time: '2026-03-22 14:00:00', operator: 'newbuyer@test.com' },
    ],
  },
  {
    id: '5', skuName: 'iTunes 25美元', code: 'IT-ASDF-1122-GHJK',
    status: '已售卖', viewStatus: '已查看', userEmail: 'alice@mail.com', orderNo: 'ORD-20260319-055',
    createdAt: '2026-03-19 11:00:00', createdBy: 'admin', swapStatus: '换码中', swapCount: 1, soldAt: '2026-03-19 18:00:00', remark: '客户反馈码无效',
    logs: [
      { id: 'log-3', recordId: '5', remark: '创建礼品码', time: '2026-03-19 11:00:00', operator: 'admin' },
      { id: 'log-3b', recordId: '5', remark: '状态变更: 未售卖 → 已售卖，绑定用户: alice@mail.com，订单号: ORD-20260319-055，售卖时间: 2026-03-19 18:00:00', time: '2026-03-19 18:00:00', operator: 'admin' },
      { id: 'log-3b2', recordId: '5', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-19 20:00:00', operator: 'alice@mail.com' },
      { id: 'log-3c', recordId: '5', remark: '一键换码操作', time: '2026-03-20 09:00:00', operator: 'admin' },
    ],
  },
  {
    id: '6', skuName: 'Steam 50美元', code: 'ST-ZXCV-3344-BNML',
    status: '已退款', viewStatus: '已查看', userEmail: 'buyer@test.com', orderNo: 'ORD-20260317-045',
    createdAt: '2026-03-17 04:13:45', createdBy: 'operator1', swapStatus: '', swapCount: 0, soldAt: '2026-03-17 07:30:12', remark: '客户要求退款',
    logs: [
      { id: 'log-4', recordId: '6', remark: '创建礼品码', time: '2026-03-17 04:13:45', operator: 'operator1' },
      { id: 'log-4b', recordId: '6', remark: '状态变更: 未售卖 → 已售卖，绑定用户: buyer@test.com，订单号: ORD-20260317-045，售卖时间: 2026-03-17 07:30:12', time: '2026-03-17 07:30:12', operator: 'buyer@test.com' },
      { id: 'log-4b2', recordId: '6', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-17 08:00:00', operator: 'buyer@test.com' },
      { id: 'log-4c', recordId: '6', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-18 10:00:00', operator: 'admin' },
    ],
  },
  {
    id: '7', skuName: 'iTunes 25美元', code: 'IT-UVWX-3456-YZAB',
    status: '已退货', viewStatus: '已查看', userEmail: 'customer@mail.com', orderNo: 'ORD-20260317-046',
    createdAt: '2026-03-17 04:13:23', createdBy: 'operator1', swapStatus: '', swapCount: 2, soldAt: '2026-03-18 06:00:00', remark: '',
    logs: [
      { id: 'log-5', recordId: '7', remark: '创建礼品码', time: '2026-03-17 04:13:23', operator: 'operator1' },
      { id: 'log-5b', recordId: '7', remark: '状态变更: 未售卖 → 已售卖，绑定用户: customer@mail.com，订单号: ORD-20260317-046，售卖时间: 2026-03-18 06:00:00', time: '2026-03-18 06:00:00', operator: 'admin' },
      { id: 'log-5b2', recordId: '7', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-18 08:00:00', operator: 'customer@mail.com' },
      { id: 'log-5c', recordId: '7', remark: '一键换码操作', time: '2026-03-18 12:00:00', operator: 'admin' },
      { id: 'log-5d', recordId: '7', remark: '一键换码操作', time: '2026-03-19 06:00:00', operator: 'admin' },
      { id: 'log-5e', recordId: '7', remark: '状态变更: 已售卖 → 已退货', time: '2026-03-19 07:00:00', operator: 'admin' },
    ],
  },
  {
    id: '8', skuName: 'Netflix 月卡', code: 'NF-CDEF-7890-GHIJ',
    status: '无效', viewStatus: '已查看', userEmail: 'invalid@user.com', orderNo: 'ORD-20260315-022',
    createdAt: '2026-03-15 10:30:00', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: '2026-03-15 14:00:00', remark: '码已被使用，标记无效',
    logs: [
      { id: 'log-6', recordId: '8', remark: '创建礼品码', time: '2026-03-15 10:30:00', operator: 'admin' },
      { id: 'log-6a', recordId: '8', remark: '状态变更: 未售卖 → 已售卖，绑定用户: invalid@user.com，订单号: ORD-20260315-022，售卖时间: 2026-03-15 14:00:00', time: '2026-03-15 14:00:00', operator: 'invalid@user.com' },
      { id: 'log-6a2', recordId: '8', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-15 14:30:00', operator: 'invalid@user.com' },
      { id: 'log-6b', recordId: '8', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-15 18:00:00', operator: 'admin' },
      { id: 'log-6c', recordId: '8', remark: '状态变更: 已退款 → 无效', time: '2026-03-16 09:00:00', operator: 'admin' },
    ],
  },
  {
    id: '9', skuName: 'Spotify 季卡', code: 'SP-KLMN-1234-OPQR',
    status: '已退款', viewStatus: '已查看', userEmail: 'refund@user.com', orderNo: 'ORD-20260310-100',
    createdAt: '2026-03-10 08:00:00', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: '2026-03-11 12:00:00', remark: '',
    logs: [
      { id: 'log-7', recordId: '9', remark: '创建礼品码', time: '2026-03-10 08:00:00', operator: 'admin' },
      { id: 'log-7b', recordId: '9', remark: '状态变更: 未售卖 → 已售卖，绑定用户: refund@user.com，订单号: ORD-20260310-100，售卖时间: 2026-03-11 12:00:00', time: '2026-03-11 12:00:00', operator: 'refund@user.com' },
      { id: 'log-7b2', recordId: '9', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-11 13:00:00', operator: 'refund@user.com' },
      { id: 'log-7c', recordId: '9', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-12 09:00:00', operator: 'admin' },
    ],
  },
  {
    id: '10', skuName: 'Steam 50美元', code: 'ST-STUV-5678-WXYZ',
    status: '已退货', viewStatus: '已查看', userEmail: 'return@user.com', orderNo: 'ORD-20260312-200',
    createdAt: '2026-03-12 14:22:00', createdBy: 'operator2', swapStatus: '', swapCount: 1, soldAt: '2026-03-13 11:00:00', remark: '',
    logs: [
      { id: 'log-8', recordId: '10', remark: '创建礼品码', time: '2026-03-12 14:22:00', operator: 'operator2' },
      { id: 'log-8b', recordId: '10', remark: '状态变更: 未售卖 → 已售卖，绑定用户: return@user.com，订单号: ORD-20260312-200，售卖时间: 2026-03-13 11:00:00', time: '2026-03-13 11:00:00', operator: 'admin' },
      { id: 'log-8b2', recordId: '10', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-13 14:00:00', operator: 'return@user.com' },
      { id: 'log-8c', recordId: '10', remark: '一键换码操作', time: '2026-03-14 10:00:00', operator: 'admin' },
      { id: 'log-8d', recordId: '10', remark: '状态变更: 已售卖 → 已退货', time: '2026-03-14 15:00:00', operator: 'admin' },
    ],
  },
  {
    id: '11', skuName: 'Netflix 月卡', code: 'NF-POIU-9988-LKJH',
    status: '已售卖', viewStatus: '已查看', userEmail: 'bob@example.com', orderNo: 'ORD-20260321-077',
    createdAt: '2026-03-21 08:15:00', createdBy: 'operator1', swapStatus: '换码中', swapCount: 2, soldAt: '2026-03-21 15:00:00', remark: '等待新码',
    logs: [
      { id: 'log-9', recordId: '11', remark: '创建礼品码', time: '2026-03-21 08:15:00', operator: 'operator1' },
      { id: 'log-9b', recordId: '11', remark: '状态变更: 未售卖 → 已售卖，绑定用户: bob@example.com，订单号: ORD-20260321-077，售卖时间: 2026-03-21 15:00:00', time: '2026-03-21 15:00:00', operator: 'admin' },
      { id: 'log-9b2', recordId: '11', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-21 18:00:00', operator: 'bob@example.com' },
      { id: 'log-9c', recordId: '11', remark: '一键换码操作', time: '2026-03-22 09:00:00', operator: 'admin' },
      { id: 'log-9d', recordId: '11', remark: '一键换码操作', time: '2026-03-23 09:00:00', operator: 'admin' },
    ],
  },
  {
    id: '12', skuName: 'Spotify 季卡', code: 'SP-FGHJ-2233-KLZX',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-24 09:00:00', createdBy: 'operator2', swapStatus: '', swapCount: 0, soldAt: null, remark: '',
    logs: [
      { id: 'log-0c', recordId: '12', remark: '创建礼品码', time: '2026-03-24 09:00:00', operator: 'operator2' },
    ],
  },
  {
    id: '13', skuName: 'iTunes 25美元', code: 'IT-BNMC-4455-VWQR',
    status: '已售卖', viewStatus: '已查看', userEmail: 'charlie@mail.com', orderNo: 'ORD-20260318-033',
    createdAt: '2026-03-18 13:45:00', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: '2026-03-18 20:00:00', remark: '',
    logs: [
      { id: 'log-10', recordId: '13', remark: '创建礼品码', time: '2026-03-18 13:45:00', operator: 'admin' },
      { id: 'log-10b', recordId: '13', remark: '状态变更: 未售卖 → 已售卖，绑定用户: charlie@mail.com，订单号: ORD-20260318-033，售卖时间: 2026-03-18 20:00:00', time: '2026-03-18 20:00:00', operator: 'charlie@mail.com' },
      { id: 'log-10b2', recordId: '13', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-18 21:00:00', operator: 'charlie@mail.com' },
    ],
  },
  {
    id: '14', skuName: 'Steam 50美元', code: 'ST-RTYU-6677-IOPA',
    status: '已退款', viewStatus: '已查看', userEmail: 'david@test.com', orderNo: 'ORD-20260316-088',
    createdAt: '2026-03-16 17:00:00', createdBy: 'operator1', swapStatus: '', swapCount: 0, soldAt: '2026-03-16 22:00:00', remark: '重复购买退款',
    logs: [
      { id: 'log-11', recordId: '14', remark: '创建礼品码', time: '2026-03-16 17:00:00', operator: 'operator1' },
      { id: 'log-11b', recordId: '14', remark: '状态变更: 未售卖 → 已售卖，绑定用户: david@test.com，订单号: ORD-20260316-088，售卖时间: 2026-03-16 22:00:00', time: '2026-03-16 22:00:00', operator: 'david@test.com' },
      { id: 'log-11b2', recordId: '14', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-16 23:00:00', operator: 'david@test.com' },
      { id: 'log-11c', recordId: '14', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-17 10:00:00', operator: 'admin' },
    ],
  },
  {
    id: '15', skuName: 'Netflix 月卡', code: 'NF-TYUI-8899-OPAS',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-24 10:30:00', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: null, remark: '',
    logs: [
      { id: 'log-0d', recordId: '15', remark: '创建礼品码', time: '2026-03-24 10:30:00', operator: 'admin' },
    ],
  },
  {
    id: '16', skuName: 'Netflix 月卡', code: 'NF-QAZW-1122-SXED',
    status: '已退款', viewStatus: '未查看', userEmail: 'emma@mail.com', orderNo: 'ORD-20260322-111',
    createdAt: '2026-03-22 11:00:00', createdBy: 'operator1', swapStatus: '', swapCount: 0, soldAt: '2026-03-22 16:00:00', remark: '',
    logs: [
      { id: 'log-12', recordId: '16', remark: '创建礼品码', time: '2026-03-22 11:00:00', operator: 'operator1' },
      { id: 'log-12b', recordId: '16', remark: '状态变更: 未售卖 → 已售卖，绑定用户: emma@mail.com，订单号: ORD-20260322-111，售卖时间: 2026-03-22 16:00:00', time: '2026-03-22 16:00:00', operator: 'emma@mail.com' },
      { id: 'log-12c', recordId: '16', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-23 09:00:00', operator: 'emma@mail.com' },
    ],
  },
  {
    id: '17', skuName: 'Spotify 季卡', code: 'SP-RFVB-3344-TGHN',
    status: '已退款', viewStatus: '未查看', userEmail: 'frank@test.com', orderNo: 'ORD-20260323-222',
    createdAt: '2026-03-23 07:30:00', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: '2026-03-23 10:00:00', remark: '用户主动申请退款',
    logs: [
      { id: 'log-13', recordId: '17', remark: '创建礼品码', time: '2026-03-23 07:30:00', operator: 'admin' },
      { id: 'log-13b', recordId: '17', remark: '状态变更: 未售卖 → 已售卖，绑定用户: frank@test.com，订单号: ORD-20260323-222，售卖时间: 2026-03-23 10:00:00', time: '2026-03-23 10:00:00', operator: 'frank@test.com' },
      { id: 'log-13c', recordId: '17', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-23 18:00:00', operator: 'frank@test.com' },
    ],
  },
  {
    id: '18', skuName: 'Steam 50美元', code: 'ST-YHNM-5566-UJKL',
    status: '已退款', viewStatus: '未查看', userEmail: 'grace@example.com', orderNo: 'ORD-20260324-333',
    createdAt: '2026-03-24 08:00:00', createdBy: 'operator2', swapStatus: '', swapCount: 0, soldAt: '2026-03-24 10:30:00', remark: '',
    logs: [
      { id: 'log-14', recordId: '18', remark: '创建礼品码', time: '2026-03-24 08:00:00', operator: 'operator2' },
      { id: 'log-14b', recordId: '18', remark: '状态变更: 未售卖 → 已售卖，绑定用户: grace@example.com，订单号: ORD-20260324-333，售卖时间: 2026-03-24 10:30:00', time: '2026-03-24 10:30:00', operator: 'grace@example.com' },
      { id: 'log-14c', recordId: '18', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-24 12:00:00', operator: 'grace@example.com' },
    ],
  },
  {
    id: '19', skuName: 'Netflix 月卡', code: 'NF-ABCD-2001-XXYY',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-24 11:00:00', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: null, remark: '',
    logs: [
      { id: 'log-0e', recordId: '19', remark: '创建礼品码', time: '2026-03-24 11:00:00', operator: 'admin' },
    ],
  },
  {
    id: '20', skuName: 'Spotify 季卡', code: 'SP-EFGH-2002-AABB',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-24 11:05:00', createdBy: 'operator1', swapStatus: '', swapCount: 0, soldAt: null, remark: '',
    logs: [
      { id: 'log-0f', recordId: '20', remark: '创建礼品码', time: '2026-03-24 11:05:00', operator: 'operator1' },
    ],
  },
  {
    id: '21', skuName: 'Steam 50美元', code: 'ST-IJKL-2003-CCDD',
    status: '已售卖', viewStatus: '已查看', userEmail: 'henry@mail.com', orderNo: 'ORD-20260324-401',
    createdAt: '2026-03-24 11:10:00', createdBy: 'operator2', swapStatus: '', swapCount: 0, soldAt: '2026-03-24 14:00:00', remark: '',
    logs: [
      { id: 'log-15', recordId: '21', remark: '创建礼品码', time: '2026-03-24 11:10:00', operator: 'operator2' },
      { id: 'log-15b', recordId: '21', remark: '状态变更: 未售卖 → 已售卖，绑定用户: henry@mail.com，订单号: ORD-20260324-401，售卖时间: 2026-03-24 14:00:00', time: '2026-03-24 14:00:00', operator: 'henry@mail.com' },
      { id: 'log-15b2', recordId: '21', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-24 15:00:00', operator: 'henry@mail.com' },
    ],
  },
  {
    id: '22', skuName: 'iTunes 25美元', code: 'IT-MNOP-2004-EEFF',
    status: '已售卖', viewStatus: '未查看', userEmail: 'iris@test.com', orderNo: 'ORD-20260324-402',
    createdAt: '2026-03-24 11:15:00', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: '2026-03-24 15:00:00', remark: '',
    logs: [
      { id: 'log-16', recordId: '22', remark: '创建礼品码', time: '2026-03-24 11:15:00', operator: 'admin' },
      { id: 'log-16b', recordId: '22', remark: '状态变更: 未售卖 → 已售卖，绑定用户: iris@test.com，订单号: ORD-20260324-402，售卖时间: 2026-03-24 15:00:00', time: '2026-03-24 15:00:00', operator: 'iris@test.com' },
    ],
  },
  {
    id: '23', skuName: 'Netflix 月卡', code: 'NF-QRST-2005-GGHH',
    status: '未售卖', viewStatus: '未查看', userEmail: null, orderNo: null,
    createdAt: '2026-03-24 11:20:00', createdBy: 'operator1', swapStatus: '', swapCount: 0, soldAt: null, remark: '',
    logs: [
      { id: 'log-0g', recordId: '23', remark: '创建礼品码', time: '2026-03-24 11:20:00', operator: 'operator1' },
    ],
  },
  {
    id: '24', skuName: 'Spotify 季卡', code: 'SP-UVWX-2006-IIJJ',
    status: '已退款', viewStatus: '已查看', userEmail: 'jack@mail.com', orderNo: 'ORD-20260320-501',
    createdAt: '2026-03-20 09:00:00', createdBy: 'admin', swapStatus: '', swapCount: 0, soldAt: '2026-03-20 13:00:00', remark: '',
    logs: [
      { id: 'log-17', recordId: '24', remark: '创建礼品码', time: '2026-03-20 09:00:00', operator: 'admin' },
      { id: 'log-17b', recordId: '24', remark: '状态变更: 未售卖 → 已售卖，绑定用户: jack@mail.com，订单号: ORD-20260320-501，售卖时间: 2026-03-20 13:00:00', time: '2026-03-20 13:00:00', operator: 'jack@mail.com' },
      { id: 'log-17b2', recordId: '24', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-20 14:00:00', operator: 'jack@mail.com' },
      { id: 'log-17c', recordId: '24', remark: '状态变更: 已售卖 → 已退款', time: '2026-03-21 10:00:00', operator: 'admin' },
    ],
  },
  {
    id: '25', skuName: 'Steam 50美元', code: 'ST-YZAB-2007-KKLL',
    status: '已退货', viewStatus: '已查看', userEmail: 'kate@example.com', orderNo: 'ORD-20260319-601',
    createdAt: '2026-03-19 14:00:00', createdBy: 'operator2', swapStatus: '', swapCount: 1, soldAt: '2026-03-19 18:30:00', remark: '',
    logs: [
      { id: 'log-18', recordId: '25', remark: '创建礼品码', time: '2026-03-19 14:00:00', operator: 'operator2' },
      { id: 'log-18b', recordId: '25', remark: '状态变更: 未售卖 → 已售卖', time: '2026-03-19 18:30:00', operator: 'admin' },
      { id: 'log-18b2', recordId: '25', remark: '查看状态变更: 未查看 → 已查看', time: '2026-03-19 20:00:00', operator: 'kate@example.com' },
      { id: 'log-18c', recordId: '25', remark: '一键换码操作', time: '2026-03-20 10:00:00', operator: 'admin' },
      { id: 'log-18d', recordId: '25', remark: '状态变更: 已售卖 → 已退货', time: '2026-03-20 15:00:00', operator: 'admin' },
    ],
  },
];
