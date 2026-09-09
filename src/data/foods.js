/**
 * Food data với image URL từ Unsplash/Pexels (free to use, CDN-backed)
 *
 * Mỗi item có:
 * - name: Tên món
 * - image: URL ảnh chất lượng cao
 * - price: Giá tham khảo (VNĐ)
 * - search: Từ khóa tìm trên Google Maps
 * - rarity: Màu thanh rarity CS2 (red, blue, purple, pink, gold)
 * - isVeg: true nếu là món chay
 */

// Rarity colors giống CS2:
// 'gray'   = Consumer Grade (bình thường)
// 'blue'   = Mil-Spec (phổ biến)
// 'purple' = Restricted (ít hơn)
// 'pink'   = Classified (hiếm)
// 'red'    = Covert (rất hiếm)
// 'gold'   = Extraordinary (cực hiếm)

export const RARITY_COLORS = {
  gray: '#b0c3d9',
  blue: '#4b69ff',
  purple: '#8847ff',
  pink: '#d32ce6',
  red: '#eb4b4b',
  gold: '#f0c040',
};

export const MEAT_FOODS = [
  {
    name: 'Phở Bò',
    image: 'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=400&h=400&fit=crop&auto=format',
    price: 45000,
    search: 'phở bò',
    rarity: 'purple',
  },
  {
    name: 'Đồ Nướng',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq1goxG70zRb4weeT_11viLE3B03IaZICVH_VfelWX3W_Trk591rTXK1c5&s=10',
    price: 150000,
    search: 'đồ nướng',
    rarity: 'red',
  },
  {
    name: 'Cơm Tấm Sườn',
    image: 'https://file.hstatic.net/200000700229/article/com-tam-suon-1_20db4b3a018143578203fc26bad888c2.jpg',
    price: 40000,
    search: 'cơm tấm',
    rarity: 'red',
  },
  {
    name: 'Bún Bò Huế',
    image: 'https://takestwoeggs.com/wp-content/uploads/2024/10/Bun-Bo-Hue-Spicy-Vietnamese-Beef-Noodle-Soup-7.jpg',
    price: 45000,
    search: 'bún bò huế',
    rarity: 'pink',
  },
  {
    name: 'Bún Chả Hà Nội',
    image: 'https://i-giadinh.vnecdn.net/2023/04/16/Buoc-11-Thanh-pham-11-7068-1681636164.jpg',
    price: 40000,
    search: 'bún chả Hà Nội',
    rarity: 'purple',
  },
  {
    name: 'Mì Quảng',
    image: 'https://cooponline.vn/tin-tuc/wp-content/uploads/2025/10/mi-quang-mon-dac-san-dam-da-thom-lung-xu-quang.png',
    price: 40000,
    search: 'mì quảng',
    rarity: 'blue',
  },
  {
    name: 'Hủ Tiếu Nam Vang',
    image: 'https://vietair.com.vn/Media/Images/vietair/Tin-tuc/2024/3/hu-tieu-nam-vang-1.jpg?p=1&w=412',
    price: 40000,
    search: 'hủ tiếu',
    rarity: 'blue',
  },
  {
    name: 'Bánh Mì Thịt',
    image: 'https://static.vinwonders.com/production/banh-mi-sai-gon-2.jpg',
    price: 25000,
    search: 'bánh mì',
    rarity: 'purple',
  },
  {
    name: 'Cơm Gà Xối Mỡ',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCz74K5czS1P5LvhzuWo7KIaysbAh2nrT_37BC7GDEme8p4vlkwX6DpFA&s=10',
    price: 45000,
    search: 'cơm gà',
    rarity: 'blue',
  },
  {
    name: 'Bún Riêu Cua',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThqQv8qbfgqWAYgoOlyBzmItjiRrj7Nxi9uqtOWE4nFJVb1czVt8p3CTRh&s=10',
    price: 40000,
    search: 'bún riêu',
    rarity: 'purple',
  },
  {
    name: 'Bánh Canh Cua',
    image: 'https://static.vinwonders.com/production/banh-canh-cua-roi-hue-01.jpg',
    price: 45000,
    search: 'bánh canh cua',
    rarity: 'pink',
  },
  {
    name: 'Cháo Lòng',
    image: 'https://www.lorca.vn/wp-content/uploads/2023/07/menueditor_item_7a5a45784b004d8481e0b4c596ca8a47_1658502740016819622.webp',
    price: 30000,
    search: 'cháo lòng',
    rarity: 'gray',
  },
  {
    name: 'Lẩu Thái',
    image: 'https://cooponline.vn/tin-tuc/wp-content/uploads/2025/10/Hinh-bia-5.jpg',
    price: 120000,
    search: 'lẩu thái',
    rarity: 'red',
  },
  {
    name: 'Cơm Chiên Dương Châu',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop&auto=format',
    price: 35000,
    search: 'cơm chiên',
    rarity: 'gray',
  },
  {
    name: 'Gỏi Cuốn Tôm Thịt',
    image: 'https://lienthanh1906.vn/wp-content/uploads/2023/11/image.jpeg',
    price: 30000,
    search: 'gỏi cuốn',
    rarity: 'blue',
  },
  {
    name: 'Bò Kho Bánh Mì',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7POF5pEbHpiJv_nNa9_tuUrUYqhgzlCACl-n7_w9SdqaBrz3MnMRnlHGH&s=10',
    price: 45000,
    search: 'bò kho',
    rarity: 'purple',
  },
  {
    name: 'Cơm Sườn Nướng',
    image: 'https://cdn.tgdd.vn/Files/2020/10/26/1302073/cach-uop-suon-nuong-an-com-tam-ngon-hon-ca-ngoai-tiem-202010260954085845.jpg',
    price: 45000,
    search: 'cơm sườn nướng',
    rarity: 'blue',
  },
  {
    name: 'Bún Thịt Nướng',
    image: 'https://cooponline.vn/tin-tuc/wp-content/uploads/2025/10/cach-lam-bun-thit-nuong-chuan-vi-sai-gon-thom-ngon-dam-da-kho-cuong-500x500.png',
    price: 40000,
    search: 'bún thịt nướng',
    rarity: 'blue',
  },
  {
    name: 'Bánh Xèo',
    image: 'https://www.huongnghiepaau.com/wp-content/uploads/2017/02/cach-lam-banh-xeo-mien-trung.jpg',
    price: 35000,
    search: 'bánh xèo',
    rarity: 'purple',
  },
  {
    name: 'Hải Sản Nướng',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=400&fit=crop&auto=format',
    price: 150000,
    search: 'hải sản nướng',
    rarity: 'red',
  },
  {
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop&auto=format',
    price: 89000,
    search: 'pizza',
    rarity: 'blue',
  },
  {
    name: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop&auto=format',
    price: 69000,
    search: 'burger',
    rarity: 'blue',
  },
  {
    name: 'Gà Rán',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop&auto=format',
    price: 55000,
    search: 'gà rán',
    rarity: 'purple',
  },
  {
    name: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop&auto=format',
    price: 100000,
    search: 'sushi',
    rarity: 'pink',
  },
  {
    name: 'Lẩu Bò',
    image: 'https://file.hstatic.net/200000700229/article/lau-gan-bo-1_5cf0143d23b54f80bb6831b9967904cf.jpg',
    price: 120000,
    search: 'lẩu bò',
    rarity: 'red',
  },
  {
    name: 'Mì Cay',
    image: 'https://file.hstatic.net/1000394081/article/mon-mi-cay_50a131510a314328a31b536dc23c3fb9.jpg',
    price: 50000,
    search: 'mì cay',
    rarity: 'purple',
  },
  {
    name: 'Cơm Văn Phòng',
    image: 'https://d1rmyjbj8clxkj.cloudfront.net/wp-content/uploads/2021/09/24115104/kinh-doanh-com-van-phong-can-nhung-mon-an-gi-11.jpg',
    price: 35000,
    search: 'cơm văn phòng',
    rarity: 'gray',
  },
  {
    name: 'Bún Đậu Mắm Tôm',
    image: 'https://i-giadinh.vnecdn.net/2025/05/16/Bun-dau-mam-tom-6-vnexpress-17-9082-8722-1747388531.jpg',
    price: 45000,
    search: 'bún đậu mắm tôm',
    rarity: 'pink',
  },
  {
    name: 'Bánh Cuốn',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2OxhXno9fxd-ApkByxbjhfbZWYw42yTwOp2iucrSzrrhYZby_Pc4nM_cU&s=10',
    price: 35000,
    search: 'bánh cuốn',
    rarity: 'blue',
  },
  {
    name: 'Xôi Mặn',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2BMlJ295XAZK4QLqc8V-rYx3KXQwS3m5QimeYtoG8QPLCoALtsvoUJ8bN&s=10',
    price: 20000,
    search: 'xôi',
    rarity: 'gray',
  },
  {
    name: 'Cơm Rang Dưa Bò',
    image: 'https://afamilycdn.com/150157425591193600/2023/12/17/cong-thuc-lam-com-rang-dua-bo-ngon-chuan-vi-ha-noi1-1702799295172-17027992956191958849824.jpg',
    price: 40000,
    search: 'cơm rang',
    rarity: 'blue',
  },
];

export const VEG_FOODS = [
  {
    name: 'Phở Chay',
    image: 'https://www.wokandkin.com/wp-content/uploads/2021/03/Pho-Chay-saved-for-web.png',
    price: 40000,
    search: 'phở chay',
    rarity: 'purple',
  },
  {
    name: 'Bún Riêu Chay',
    image: 'https://file.hstatic.net/200000438723/file/1_ebf9a78fe7e84ef09f80689c4a1a4417_grande.png',
    price: 35000,
    search: 'bún riêu chay',
    rarity: 'purple',
  },
  {
    name: 'Cơm Chay Thập Cẩm',
    image: 'https://mms.img.susercontent.com/vn-11134513-7r98o-lsvdmwpwiro9f7@resize_ss1242x600!@crop_w1242_h600_cT',
    price: 35000,
    search: 'cơm chay',
    rarity: 'blue',
  },
  {
    name: 'Mì Xào Chay',
    image: 'https://www.huongnghiepaau.com/wp-content/uploads/2017/03/tron-deu-mi-cung-rau-cu-va-nam.jpg',
    price: 35000,
    search: 'mì xào chay',
    rarity: 'blue',
  },
  {
    name: 'Bánh Mì Chay',
    image: 'https://dms.mydukaan.io/original/jpeg/upload_file_service/dd5a5045-910a-4c0c-932e-68366bd780b5/banh-mi-bi-cha-chay.jpg',
    price: 20000,
    search: 'bánh mì chay',
    rarity: 'gray',
  },
  {
    name: 'Lẩu Nấm',
    image: 'https://www.lorca.vn/wp-content/uploads/2023/12/1.jpg',
    price: 100000,
    search: 'lẩu nấm',
    rarity: 'red',
  },
  {
    name: 'Bún Chay Huế',
    image: 'https://dms.mydukaan.io/original/jpeg/upload_file_service/8b27fdab-a07b-48cf-ab0c-a6750ce0d666/bun-hue-chay.jpg',
    price: 35000,
    search: 'bún chay',
    rarity: 'blue',
  },
  {
    name: 'Gỏi Cuốn Chay',
    image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/kien-thuc/cach-lam-goi-cuon-chay/cach-lam-goi-cuon-chay-7.jpg',
    price: 25000,
    search: 'gỏi cuốn chay',
    rarity: 'blue',
  },
  {
    name: 'Bánh Xèo Chay',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLCTqpFaYx6vFd3zDbrP8VSfTZcPzNuLibKIR-yx8_1Rhvnx-c2hxOQ9kX&s=10',
    price: 30000,
    search: 'bánh xèo chay',
    rarity: 'purple',
  },
  {
    name: 'Hủ Tiếu Chay',
    image: 'https://daotaobeptruong.vn/wp-content/uploads/2017/10/hu-tieu-chay-ngon.jpg',
    price: 35000,
    search: 'hủ tiếu chay',
    rarity: 'blue',
  },
  {
    name: 'Cơm Chiên Chay',
    image: 'https://cdn.tgdd.vn/2021/05/CookProductThumb/COM-RANG-CHAY---Cach-lam-COM-RANG-RAU-CU-Thanh-Dam---Mon-An-Ngon-Moi-Ngay-0-19-screenshot-620x620.jpg',
    price: 30000,
    search: 'cơm chiên chay',
    rarity: 'gray',
  },
  {
    name: 'Nui Xào Chay',
    image: 'https://cdn.tgdd.vn/2021/05/CookRecipe/GalleryStep/thanh-pham-1437.jpg',
    price: 30000,
    search: 'nui xào chay',
    rarity: 'gray',
  },
  {
    name: 'Xôi Chay',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbIGix5r04PbHar_AsUUJaLVtEPny93gzHh6Fd51qPNFQkbCH2bqJfIFCV&s=10',
    price: 15000,
    search: 'xôi chay',
    rarity: 'gray',
  },
  {
    name: 'Cháo Nấm',
    image: 'https://cdn.tgdd.vn/2020/09/CookRecipe/Avatar/chao-nam-chay-thumbnail.jpg',
    price: 25000,
    search: 'cháo nấm',
    rarity: 'gray',
  },
  {
    name: 'Bánh Cuốn Chay',
    image: 'https://thucphamchaybamien.com/uploads/post/1161646746739.jpg',
    price: 30000,
    search: 'bánh cuốn chay',
    rarity: 'blue',
  },
  {
    name: 'Bún Đậu Chay',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9G5ZEkl5_1ofDIKqNnZ502srlIwDk-5PU3tJBgC0pQ3i6Xn7SZPFyJKWG&s=10',
    price: 40000,
    search: 'bún đậu chay',
    rarity: 'purple',
  },
  {
    name: 'Cơm Tấm Chay',
    image: 'https://nhahangmocnhien.vn/wp-content/uploads/2024/10/com-tam-chay-1.jpg',
    price: 35000,
    search: 'cơm tấm chay',
    rarity: 'blue',
  },
];

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

/**
 * CS2 SPECIAL RARE ITEMS (MÓN ĐẮT TIỀN / SECRET GOLD)
 * Tương đương với việc mở ra Dao / Găng tay trong CS2
 */
export const SECRET_GOLD_MEAT = [
  {
    isSpecialGold: true,
    name: '★ Bò Wagyu A5 Dát Vàng ★',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop&auto=format',
    price: 1800000,
    search: 'bò wagyu A5',
    rarity: 'gold',
    quote: 'Hôm nay ví tiền khóc thét! Sếp hoặc đại gia nào bao đây?',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
  {
    isSpecialGold: true,
    name: '★ Cua Hoàng Đế King Crab Sốt Bơ Tỏi ★',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&h=500&fit=crop&auto=format',
    price: 2500000,
    search: 'cua hoàng đế king crab',
    rarity: 'gold',
    quote: 'Chúa tể biển khơi gõ cửa, chuẩn bị tinh thần cà thẻ cháy máy!',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
  {
    isSpecialGold: true,
    name: '★ Tôm Hùm Alaska Nướng Phô Mai ★',
    image: 'https://images.unsplash.com/photo-1553659971-f01207815844?w=500&h=500&fit=crop&auto=format',
    price: 1300000,
    search: 'tôm hùm alaska',
    rarity: 'gold',
    quote: 'Đẳng cấp quý tộc! Bữa ăn này bằng cả tháng lương ăn mì tôm!',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
  {
    isSpecialGold: true,
    name: '★ Đại Tiệc Buffet Haidilao VIP ★',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop&auto=format',
    price: 650000,
    search: 'haidilao hotpot',
    rarity: 'gold',
    quote: 'Múa mì, làm móng, ăn no nê không lo về giá (vì người khác bao)!',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
  {
    isSpecialGold: true,
    name: '★ Omakase Sushi Nhật Thượng Hạng ★',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=500&fit=crop&auto=format',
    price: 1600000,
    search: 'omakase sushi',
    rarity: 'gold',
    quote: 'Để đầu bếp tự quyết định số phận và chiếc ví của bạn!',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
];

export const SECRET_GOLD_VEG = [
  {
    isSpecialGold: true,
    name: '★ Đại Tiệc Buffet Chay Hoàng Gia ★',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=500&fit=crop&auto=format',
    price: 450000,
    search: 'buffet chay cao cấp',
    rarity: 'gold',
    quote: 'Ăn chay phong cách vương giả, tâm hồn thanh tịnh nhưng ví đau xót!',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
  {
    isSpecialGold: true,
    name: '★ Lẩu Nấm Quý Tùng Nhung Matsutake ★',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop&auto=format',
    price: 850000,
    search: 'lẩu nấm matsutake',
    rarity: 'gold',
    quote: 'Nấm quý ngàn năm hội tụ, tinh hoa ẩm thực dưỡng sinh thượng thừa!',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
  {
    isSpecialGold: true,
    name: '★ Yến Sào Chưng Đông Trùng Hạ Thảo ★',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop&auto=format',
    price: 650000,
    search: 'yến sào đông trùng hạ thảo',
    rarity: 'gold',
    quote: 'Đại bổ cho sức khỏe, tăng cường sinh lực và giảm trừ số dư tài khoản!',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
  {
    isSpecialGold: true,
    name: '★ Thố Cơm Niêu Bào Ngư Chay Thượng Hạng ★',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&auto=format',
    price: 500000,
    search: 'cơm niêu chay bào ngư',
    rarity: 'gold',
    quote: 'Hương vị cung đình tao nhã, trải nghiệm ẩm thực đỉnh nóc kịch trần!',
    tier: '★ EXCEEDINGLY RARE SPECIAL ITEM ★',
  },
];

/** Thẻ hiển thị bí ẩn trên thanh cuộn (như thẻ Dao ẩn trong CS2) */
export const GOLD_SPECIAL_CARD = {
  isSpecialGold: true,
  name: '★ Món Siêu Hiếm ★',
  rarity: 'gold',
  tier: '★ SPECIAL RARE ITEM ★',
};

/** Lấy ngẫu nhiên 1 món Vàng Secret khi quay trúng */
export function getRandomSecretGold(isVeg = false) {
  const pool = isVeg ? SECRET_GOLD_VEG : SECRET_GOLD_MEAT;
  return pool[Math.floor(Math.random() * pool.length)];
}

