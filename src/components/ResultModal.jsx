import { RARITY_COLORS, formatPrice } from '../data/foods';

/**
 * Result Modal — Hiển thị sau khi quay xong
 * Hỗ trợ phong cách VÀNG SECRET đặc biệt như mở ra Dao/Găng trong CS2
 */
export default function ResultModal({ item, onContinue, onFindRestaurant }) {
  const isGold = item.isSpecialGold || item.rarity === 'gold';
  const rarityColor = RARITY_COLORS[item.rarity] || (isGold ? '#f0c040' : RARITY_COLORS.blue);

  // Tạo URL Google Maps tìm quán gần vị trí hiện tại của người dùng
  const cleanName = item.search || item.name.replace(/[★*]/g, '').trim();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`quán ${cleanName} gần đây`)}`;

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
              👑 BẠN ĐÃ MỞ TRÚNG VÀNG SECRET! 👑
            </p>
          </div>
        ) : (
          <p className="result-modal__label">VẬT PHẨM MỚI</p>
        )}

        <h2 className={`result-modal__name ${isGold ? 'result-modal__name--gold' : ''}`}>
          {item.name}
        </h2>

        <p className={`result-modal__price ${isGold ? 'result-modal__price--gold' : ''}`}>
          {isGold && <span className="gold-icon-star">★ </span>}
          Giá tham khảo · ~{formatPrice(item.price)} / người
        </p>

        {isGold && item.quote && (
          <div className="result-modal__gold-quote">
            <span className="quote-tag">⚠️ CẢNH BÁO VÍ TIỀN:</span>
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
            className={`result-modal__find-btn ${isGold ? 'result-modal__find-btn--gold' : ''}`}
            onClick={(e) => {
              if (onFindRestaurant) onFindRestaurant(e);
            }}
          >
            {isGold ? 'TÌM QUÁN SANG CHẢNH ↗' : 'TÌM QUÁN ↗'}
          </a>
          <button className="result-modal__continue-btn" onClick={onContinue}>
            TIẾP TỤC
          </button>
        </div>
      </div>
    </div>
  );
}
