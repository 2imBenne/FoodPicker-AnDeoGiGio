import { RARITY_COLORS, formatPrice } from '../data/foods';

/**
 * Result Modal — Hiển thị sau khi quay xong
 * Hỗ trợ phong cách VÀNG SECRET đặc biệt như mở ra Dao/Găng trong CS2
 * Tự động phát hiện isPlace để hiển thị đúng label cho địa điểm vs món ăn
 */
export default function ResultModal({ item, onContinue, onFindRestaurant, userCoords = null }) {
  const isGold = item.isSpecialGold || item.rarity === 'gold';
  const isPlace = !!item.isPlace;
  const rarityColor = RARITY_COLORS[item.rarity] || (isGold ? '#f0c040' : RARITY_COLORS.blue);

  // Tạo URL Google Maps: địa điểm không cần prefix "quán", dùng trực tiếp search term
  const cleanName = item.search || item.name.replace(/[★*]/g, '').trim();
  const queryStr = isPlace
    ? encodeURIComponent(`${cleanName} gần đây`)
    : encodeURIComponent(`quán ${cleanName} gần nhất`);

  let mapsUrl;
  if (userCoords?.lat && userCoords?.lng) {
    mapsUrl = `https://www.google.com/maps/search/${queryStr}/@${userCoords.lat},${userCoords.lng},15z`;
  } else {
    mapsUrl = `https://www.google.com/maps/search/?api=1&query=${queryStr}`;
  }

  // Labels phân biệt food vs place
  const itemLabel = isPlace ? 'ĐỊA ĐIỂM GỢI Ý' : 'VẬT PHẨM MỚI';
  const goldLabel = isPlace ? '🗺️ BẠN ĐÃ MỞ TRÚNG ĐỊA ĐIỂM BÍ ẨN! 🗺️' : '👑 BẠN ĐÃ MỞ TRÚNG VÀNG SECRET! 👑';
  const priceLabel = isPlace ? 'Chi phí tham khảo' : 'Giá tham khảo';
  const findBtnText = isPlace
    ? (isGold ? 'TÌM ĐỊA ĐIỂM BÍ ẨN ↗' : 'TÌM ĐỊA ĐIỂM TRÊN MAPS ↗')
    : (isGold ? 'TÌM QUÁN GẦN NHẤT (VIP) ↗' : 'TÌM QUÁN GẦN NHẤT ↗');
  const mapsHint = isPlace
    ? '📍 Bản đồ đã khoanh vùng địa điểm gần bạn nhất. Đi nào!'
    : '📍 Bản đồ đã khoanh vùng toạ độ gần bạn nhất. Bấm "Sắp xếp theo" trên Google Maps nếu muốn lọc chuẩn từng mét!';

  return (
    <div className={`result-overlay ${isGold ? 'result-overlay--gold' : ''}`} onClick={onContinue}>
      <div
        className={`result-modal ${isGold ? 'result-modal--gold' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {isGold ? (
          <div className="result-modal__gold-header">
            <span className="result-modal__gold-badge">★ EXCEEDINGLY RARE SPECIAL ITEM ★</span>
            <p className="result-modal__label result-modal__label--gold">
              {goldLabel}
            </p>
          </div>
        ) : (
          <p className="result-modal__label">
            {item.vibe ? `${item.vibe} ${itemLabel}` : itemLabel}
          </p>
        )}

        <h2 className={`result-modal__name ${isGold ? 'result-modal__name--gold' : ''}`}>
          {item.name}
        </h2>

        <p className={`result-modal__price ${isGold ? 'result-modal__price--gold' : ''}`}>
          {isGold && <span className="gold-icon-star">★ </span>}
          {item.price === 0
            ? `${priceLabel} · Miễn phí! 🎉`
            : `${priceLabel} · ~${formatPrice(item.price)} / người`}
        </p>

        {isGold && item.quote && (
          <div className="result-modal__gold-quote">
            <span className="quote-tag">{isPlace ? '🗺️ THÁM TỬ ĐỊA ĐIỂM:' : '⚠️ CẢNH BÁO VÍ TIỀN:'}</span>
            <p className="quote-text">"{item.quote}"</p>
          </div>
        )}

        <div className={`result-modal__image-wrap ${isGold ? 'result-modal__image-wrap--gold' : ''}`}>
          <img
            src={item.image}
            alt={item.name}
            className="result-modal__image"
          />
          <div
            className="result-modal__rarity-bar"
            style={{
              background: rarityColor,
              boxShadow: isGold
                ? '0 0 30px #ffd700, 0 0 60px rgba(255, 215, 0, 0.6)'
                : `0 0 20px ${rarityColor}`,
            }}
          />
        </div>

        <div className="result-modal__actions">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`result-modal__find-btn ${isGold ? 'result-modal__find-btn--gold' : ''} ${isPlace ? 'result-modal__find-btn--place' : ''}`}
            onClick={(e) => {
              if (onFindRestaurant) onFindRestaurant(e);
            }}
          >
            {findBtnText}
          </a>
          <button className="result-modal__continue-btn" onClick={onContinue}>
            TIẾP TỤC
          </button>
        </div>

        <p className="result-modal__maps-hint">
          {mapsHint}
        </p>
      </div>
    </div>
  );
}