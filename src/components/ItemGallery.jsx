import { RARITY_COLORS, formatPrice } from '../data/foods';

/**
 * ItemGallery — Lưới vật phẩm trong hòm (CS2 Grid)
 * Hỗ trợ cả Food và Place items
 */
export default function ItemGallery({ foods }) {
  const isPlaceCase = foods.length > 0 && !!foods[0].isPlace;
  const galleryTitle = isPlaceCase ? 'Địa điểm trong hòm' : 'Vật phẩm trong hòm';
  const goldCardName = isPlaceCase ? '★ Bí Ẩn Secret' : '★ Món Siêu Hiếm';
  const goldCardSub = isPlaceCase ? '★ Vàng Secret' : '★ Vàng Secret';

  return (
    <section className="gallery">
      <div className="gallery__header">
        <h3 className="gallery__title">{galleryTitle}</h3>
      </div>

      <div className="gallery__grid">
        {foods.map((item, i) => {
          const rarityColor = RARITY_COLORS[item.rarity] || RARITY_COLORS.blue;
          const priceDisplay = item.price === 0
            ? 'Miễn phí'
            : `~${formatPrice(item.price)}`;
          const titleAttr = item.price === 0
            ? `${item.name} — Miễn phí`
            : `${item.name} — ~${formatPrice(item.price)}`;
          return (
            <div
              className="gallery__card"
              key={`${item.name}-${i}`}
              title={titleAttr}
            >
              <div className="gallery__card-img-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="gallery__card-img"
                  loading="lazy"
                />
              </div>

              <div className="gallery__card-info">
                <span className="gallery__card-name">{item.name}</span>
                <span className="gallery__card-price">{priceDisplay}</span>
              </div>

              <div
                className="gallery__card-rarity"
                style={{ background: rarityColor }}
              />
            </div>
          );
        })}

        {/* Thẻ Vàng Secret đặc trưng */}
        <div
          className="gallery__card gallery__card--gold"
          title={`★ ${isPlaceCase ? 'Địa Điểm Bí Ẩn (Vàng Secret)' : 'Món Siêu Hiếm (Vàng Secret)'} ★`}
        >
          <div className="gallery__card-img-wrap gallery__card-img-wrap--gold">
            <span className="gallery__gold-crown">{isPlaceCase ? '🗺️' : '👑'}</span>
          </div>

          <div className="gallery__card-info">
            <span className="gallery__card-name gallery__card-name--gold">{goldCardName}</span>
            <span className="gallery__card-price gallery__card-price--gold">{goldCardSub}</span>
          </div>

          <div
            className="gallery__card-rarity"
            style={{
              background: '#f0c040',
              boxShadow: '0 0 10px rgba(240, 192, 64, 0.8)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
