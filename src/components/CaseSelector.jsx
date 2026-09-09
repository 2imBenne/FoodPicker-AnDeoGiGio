import { CASES_CONFIG, MEAT_FOODS, VEG_FOODS, SNACK_FOODS, DRINK_FOODS, DESSERT_FOODS } from '../data/foods';

/**
 * CaseSelector — Màn hình Kho Hòm CS2 (Case Armory)
 * Cho phép người dùng chọn hòm trước khi vào màn hình quay roulette
 */
export default function CaseSelector({ onSelectCase }) {
  const getCaseItemCount = (caseId) => {
    switch (caseId) {
      case 'main': return MEAT_FOODS.length + VEG_FOODS.length;
      case 'snacks': return SNACK_FOODS.length;
      case 'drinks': return DRINK_FOODS.length;
      case 'desserts': return DESSERT_FOODS.length;
      default: return 0;
    }
  };

  return (
    <section className="case-selector">
      <div className="case-selector__header">
        <h2 className="case-selector__title">KHO HÒM ẨM THỰC</h2>
        <p className="case-selector__subtitle">
          Chọn một chiếc hòm để bắt đầu mở ra số phận bữa ăn của bạn hôm nay!
        </p>
      </div>

      <div className="case-selector__grid">
        {CASES_CONFIG.map((c) => {
          const count = getCaseItemCount(c.id);
          return (
            <div
              key={c.id}
              className="case-card"
              style={{ '--case-accent': c.color }}
              onClick={() => onSelectCase(c.id)}
            >
              <div className="case-card__badge" style={{ background: c.color }}>
                {c.badge}
              </div>

              <div className="case-card__icon-wrap">
                <span className="case-card__icon">{c.icon}</span>
                <div className="case-card__glow" style={{ background: c.color }} />
              </div>

              <div className="case-card__content">
                <h3 className="case-card__title">{c.name}</h3>
                <span className="case-card__subtitle">{c.subtitle}</span>
                <p className="case-card__desc">{c.desc}</p>
              </div>

              <div className="case-card__footer">
                <span className="case-card__count">
                  📦 {count} vật phẩm
                </span>
                <span className="case-card__gold-tag">
                  ★ Vàng Secret
                </span>
              </div>

              <button className="case-card__btn">
                MỞ HÒM NÀY ➔
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
