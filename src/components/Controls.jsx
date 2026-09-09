/**
 * Controls — Chuyển đổi Ăn chay / Món mặn và Nút Mở Hòm CS2
 */
export default function Controls({ isVeg, onToggleVeg, onSpin, spinning }) {
  return (
    <div className="controls">
      {/* Ăn chay / Món mặn toggle */}
      <div className="controls__veg">
        <label className="controls__toggle" htmlFor="vegToggle">
          <input
            type="checkbox"
            id="vegToggle"
            checked={isVeg}
            onChange={onToggleVeg}
            disabled={spinning}
          />
          <span className="controls__toggle-track">
            <span className="controls__toggle-thumb" />
          </span>
          <span className="controls__toggle-label">
            {isVeg ? '🌿 Món Chay' : '🍖 Món Mặn'}
          </span>
        </label>
      </div>

      {/* Spin button */}
      <button
        className="controls__spin-btn"
        onClick={onSpin}
        disabled={spinning}
      >
        {spinning ? 'ĐANG MỞ...' : 'MỞ HÒM'}
      </button>
    </div>
  );
}
