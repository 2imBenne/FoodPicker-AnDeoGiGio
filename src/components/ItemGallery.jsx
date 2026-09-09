import { RARITY_COLORS, formatPrice } from '../data/foods';

/**
 * ItemGallery — "Vật phẩm trong hòm"
 * Hiển thị dạng lưới (Grid) 10 cột chuẩn CS2 như hình ảnh yêu cầu
 */
export default function ItemGallery({ foods }) {
  return (
    <section className="gallery">
      <div className="gallery__header">
        <h3 className="gallery__title">Vật phẩm trong hòm</h3>
      </div>

      <div className="gallery__grid">
        {foods.map((item, i) => {
          const rarityColor = RARITY_COLORS[item.rarity] || RARITY_COLORS.blue;
          return (
            <div
              className="gallery__card"
              key={`${item.name}-${i}`}
              title={`${item.name} — ~${formatPrice(item.price)}`}
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
                <span className="gallery__card-price">~{formatPrice(item.price)}</span>
              </div>

              <div
                className="gallery__card-rarity"
                style={{ background: rarityColor }}
              />
            </div>
          );
        })}

        {/* Thẻ Vàng Secret đặc trưng trong hòm CS2 */}
        <div
          className="gallery__card gallery__card--gold"
          title="★ Món Siêu Hiếm (Vàng Secret) ★"
        >
          <div className="gallery__card-img-wrap gallery__card-img-wrap--gold">
            <span className="gallery__gold-crown">👑</span>
          </div>

          <div className="gallery__card-info">
            <span className="gallery__card-name gallery__card-name--gold">★ Món Siêu Hiếm</span>
            <span className="gallery__card-price gallery__card-price--gold">★ Vàng Secret</span>
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
