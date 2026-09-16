import { SECRET_GOLD_MEAT, SECRET_GOLD_VEG } from './mainMeals';
import { SECRET_GOLD_SNACKS } from './snacks';
import { SECRET_GOLD_DRINKS } from './drinks';
import { SECRET_GOLD_DESSERTS } from './desserts';
import { SECRET_GOLD_PLACES } from './places';

/**
 * Danh mục tất cả các Hòm (CS2 Cases Config)
 */
export const CASES_CONFIG = [
  {
    id: 'main',
    name: 'Hòm No Nê',
    subtitle: 'Bữa Chính Chắc Bụng',
    desc: 'Cơm, phở, bún, lẩu... Đầy đủ phân hệ Mặn & Chay cho bữa trưa và tối.',
    icon: '🍖',
    badge: 'BỮA CHÍNH',
    color: '#eb4b4b',
    hasVegToggle: true,
  },
  {
    id: 'snacks',
    name: 'Hòm Ăn Vặt',
    subtitle: 'Cứu Đói Xế Chiều',
    desc: 'Bánh tráng trộn, xiên que, nem chua rán, chân gà sả tắc, khoai lắc phô mai...',
    icon: '🍟',
    badge: 'ĂN VẶT',
    color: '#f0c040',
    hasVegToggle: false,
  },
  {
    id: 'drinks',
    name: 'Hòm Trà Sữa & Đồ Uống',
    subtitle: 'Giải Khát Tỉnh Táo',
    desc: 'Trà sữa trân châu, trà đào cam sả, cà phê muối, trà chanh giã tay...',
    icon: '🧋',
    badge: 'ĐỒ UỐNG',
    color: '#4b69ff',
    hasVegToggle: false,
  },
  {
    id: 'desserts',
    name: 'Hòm Tráng Miệng',
    subtitle: 'Đồ Ngọt Thăng Hoa',
    desc: 'Bingsu xoài, chè khúc bạch, tàu hũ trân châu, kem bơ, bánh flan...',
    icon: '🍨',
    badge: 'TRÁNG MIỆNG',
    color: '#d32ce6',
    hasVegToggle: false,
  },
  {
    id: 'places',
    name: 'Hòm Địa Điểm',
    subtitle: 'Đi Đâu Hôm Nay?',
    desc: 'Công viên, xem phim, photobooth, workshop, escape room, karaoke, bowling...',
    icon: '🗺️',
    badge: 'ĐỊA ĐIỂM',
    color: '#00c9a7',
    hasVegToggle: false,
  },
];

/**
 * Lấy ngẫu nhiên 1 vật phẩm Vàng Secret theo Case và chế độ Chay
 */
export function getRandomSecretGold(caseId = 'main', isVeg = false) {
  let pool;
  if (caseId === 'snacks') {
    pool = SECRET_GOLD_SNACKS;
  } else if (caseId === 'drinks') {
    pool = SECRET_GOLD_DRINKS;
  } else if (caseId === 'desserts') {
    pool = SECRET_GOLD_DESSERTS;
  } else if (caseId === 'places') {
    pool = SECRET_GOLD_PLACES;
  } else {
    pool = isVeg ? SECRET_GOLD_VEG : SECRET_GOLD_MEAT;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}
