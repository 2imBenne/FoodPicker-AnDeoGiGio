/**
 * Rarity colors giống CS2:
 * 'gray'   = Consumer Grade (bình thường)
 * 'blue'   = Mil-Spec (phổ biến)
 * 'purple' = Restricted (ít hơn)
 * 'pink'   = Classified (hiếm)
 * 'red'    = Covert (rất hiếm)
 * 'gold'   = Extraordinary (cực hiếm)
 */
export const RARITY_COLORS = {
  gray: '#b0c3d9',
  blue: '#4b69ff',
  purple: '#8847ff',
  pink: '#d32ce6',
  red: '#eb4b4b',
  gold: '#f0c040',
};

export const GOLD_SPECIAL_CARD = {
  isSpecialGold: true,
  name: '★ MÓN ĂN ĐẶC BIỆT BÍ ẨN ★',
  rarity: 'gold',
  tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
};

/** Budget filter options */
export const BUDGET_OPTIONS = [
  { label: 'Tất cả', value: 0 },
  { label: '30.000đ', value: 30000 },
  { label: '50.000đ', value: 50000 },
  { label: '100.000đ', value: 100000 },
];

/** Format price to Vietnamese đồng */
export function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}
