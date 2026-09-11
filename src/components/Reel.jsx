import { useRef, useEffect, useCallback } from 'react';
import { RARITY_COLORS, GOLD_SPECIAL_CARD, getRandomSecretGold } from '../data/foods';
import { soundEngine } from '../utils/sound';

/**
 * CS2 Cubic Bezier Solver (Newton-Raphson)
 * Đảm bảo đạo hàm vận tốc liên tục, không bị đứt đoạn hay khựng/giật
 */
function createCubicBezier(x1, y1, x2, y2) {
  return function solve(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    let u = t;
    for (let i = 0; i < 8; i++) {
      const currentX = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u;
      const dx = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2);
      if (Math.abs(currentX - t) < 1e-6) break;
      if (Math.abs(dx) < 1e-6) break;
      u -= (currentX - t) / dx;
      u = Math.max(0, Math.min(1, u));
    }
    return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
  };
}

// Đường cong chuẩn CS2: Lướt cực nhanh lúc đầu, giảm tốc mượt mà và bò từ từ về đích
const cs2BezierEase = createCubicBezier(0.12, 0.78, 0.18, 1.0);

/**
 * CS2-style Reel — Dải cuộn mở hòm với cơ chế Vàng Secret (Special Rare Item)
 */
export default function Reel({ foods, spinning, onComplete, isVeg = false, caseId = 'main' }) {
  const containerRef = useRef(null);
  const stripRef = useRef(null);
  const animRef = useRef(null);
  const lastTickRef = useRef(-1);
  const rollSoundRef = useRef(null);
  const builtItemsRef = useRef([]);
  const hasSpunRef = useRef(false);

  // Tạo dải item phong phú (tối thiểu 85 items) + chèn các thẻ VÀNG SECRET
  const buildStripItems = useCallback(() => {
    const repeatCount = Math.max(4, Math.ceil(85 / foods.length));
    const items = [];
    for (let r = 0; r < repeatCount; r++) {
      const shuffled = [...foods].sort(() => Math.random() - 0.5);
      items.push(...shuffled);
    }

    // Vị trí dừng mục tiêu là từ 60% đến 80% chiều dài dải.
    // Để tạo cảm giác hồi hộp chuẩn CS2:
    // - 1 thẻ Vàng ở đoạn đầu (~22% dải) lướt nhanh qua tầm mắt tạo sự hào hứng
    // - Đúng 1 thẻ Vàng ở đoạn dừng (~70% dải) để tạo kịch tính Near-Miss hoặc trúng thưởng
    const earlyGoldPos = Math.floor(items.length * 0.22);
    const stopZoneGoldPos = Math.floor(items.length * 0.70);
    const goldPositions = [earlyGoldPos, stopZoneGoldPos];

    goldPositions.forEach(pos => {
      if (pos < items.length) {
        items[pos] = { ...GOLD_SPECIAL_CARD };
      }
    });

    return items;
  }, [foods]);

  // Render các thẻ món ăn vào DOM (hỗ trợ hiển thị thẻ Vàng lấp lánh bí ẩn)
  const renderStrip = useCallback((items) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.innerHTML = '';

    const isPlaceCase = caseId === 'places';
    const goldTitle = isPlaceCase ? '★ ĐỊA ĐIỂM BÍ ẨN ★' : '★ MÓN SIÊU HIẾM ★';
    const goldIcon = isPlaceCase ? '🗺️' : '👑';

    const frag = document.createDocumentFragment();
    items.forEach(item => {
      const el = document.createElement('div');

      if (item.isSpecialGold) {
        el.className = 'reel-item reel-item--gold';
        el.innerHTML = `
          <div class="reel-item__gold-wrap">
            <div class="reel-item__gold-badge">★ SPECIAL RARE ★</div>
            <div class="reel-item__gold-star">★</div>
            <div class="reel-item__gold-icon">${goldIcon}</div>
            <div class="reel-item__gold-secret">SECRET</div>
          </div>
          <span class="reel-item__name reel-item__name--gold">${goldTitle}</span>
          <div class="reel-item__rarity" style="background:#f0c040"></div>
        `;
      } else {
        el.className = 'reel-item';
        const rarityColor = RARITY_COLORS[item.rarity] || RARITY_COLORS.blue;
        el.innerHTML = `
          <div class="reel-item__img-wrap">
            <img src="${item.image}" alt="${item.name}" class="reel-item__img" loading="eager" />
          </div>
          <span class="reel-item__name">${item.name}</span>
          <div class="reel-item__rarity" style="background:${rarityColor}"></div>
        `;
      }

      frag.appendChild(el);
    });
    strip.appendChild(frag);
  }, [caseId]);

  const prevFoodsRef = useRef(foods);
  const prevCaseIdRef = useRef(caseId);
  // Khởi tạo dải ban đầu hoặc khi đổi chế độ món / hòm
  useEffect(() => {
    const foodsChanged = prevFoodsRef.current !== foods || prevCaseIdRef.current !== caseId;
    prevFoodsRef.current = foods;
    prevCaseIdRef.current = caseId;

    if (!spinning && (!hasSpunRef.current || foodsChanged)) {
      const items = buildStripItems();
      builtItemsRef.current = items;
      renderStrip(items);
      if (stripRef.current) {
        stripRef.current.style.transform = 'translateX(0)';
      }
    }
  }, [foods, caseId, spinning, buildStripItems, renderStrip]);

  // Bắt đầu quay khi prop spinning = true
  useEffect(() => {
    if (spinning) {
      hasSpunRef.current = true;
      const items = buildStripItems();
      builtItemsRef.current = items;

      const strip = stripRef.current;
      if (!strip) return;

      // Xóa highlight cũ và reset vị trí
      renderStrip(items);
      strip.style.transform = 'translateX(0)';

      requestAnimationFrame(() => startSpin(items));
    }
  }, [spinning]);

  const startSpin = (items) => {
    const container = containerRef.current;
    const strip = stripRef.current;
    if (!container || !strip) return;

    const itemEl = strip.querySelector('.reel-item');
    if (!itemEl) return;

    const itemW = itemEl.offsetWidth;
    const gap = parseFloat(getComputedStyle(strip).gap) || 12;
    const paddingLeft = parseFloat(getComputedStyle(strip).paddingLeft) || 16;
    const itemTotal = itemW + gap;

    const containerWidth = container.offsetWidth;
    const centerOffset = containerWidth / 2 - itemW / 2;

    // Chọn khoảng mục tiêu (60% - 80% chiều dài dải)
    const minIdx = Math.floor(items.length * 0.6);
    const maxIdx = Math.floor(items.length * 0.8);

    // Tách riêng danh sách vị trí thẻ Vàng và thẻ Thường trong khoảng dừng
    const goldIndices = [];
    const nonGoldIndices = [];
    for (let idx = minIdx; idx <= maxIdx; idx++) {
      if (items[idx].isSpecialGold) {
        goldIndices.push(idx);
      } else {
        nonGoldIndices.push(idx);
      }
    }

    // Tỉ lệ nổ VÀNG SECRET siêu hiếm chuẩn CS2:
    // 1% cơ hội (~1/100 lần quay), mang lại độ hiếm thực sự và cảm giác sang trọng, đắt tiền
    const GOLD_DROP_RATE = 0.01;
    const hitGold = goldIndices.length > 0 && Math.random() < GOLD_DROP_RATE;

    let targetIndex;
    if (hitGold) {
      // Trúng Vàng Secret: chọn ô Vàng
      targetIndex = goldIndices[Math.floor(Math.random() * goldIndices.length)];
    } else {
      // KHÔNG trúng Vàng: 100% ra thẻ thường
      // Cơ chế "Near Miss" kinh điển CS2: 20% cơ hội dừng ngay sát vách thẻ Vàng (+1 hoặc -1)
      const isNearMiss = goldIndices.length > 0 && Math.random() < 0.20;
      let picked = false;

      if (isNearMiss) {
        const nearGold = goldIndices[Math.floor(Math.random() * goldIndices.length)];
        const offset = Math.random() < 0.5 ? -1 : 1;
        const candidate = nearGold + offset;
        // BẮT BUỘC: candidate phải nằm trong [minIdx, maxIdx] và TUYỆT ĐỐI KHÔNG phải thẻ Vàng
        if (candidate >= minIdx && candidate <= maxIdx && !items[candidate]?.isSpecialGold) {
          targetIndex = candidate;
          picked = true;
        }
      }

      if (!picked && nonGoldIndices.length > 0) {
        // BẮT BUỘC: Chỉ lấy từ nonGoldIndices để đảm bảo 100% không bao giờ trúng thẻ vàng
        targetIndex = nonGoldIndices[Math.floor(Math.random() * nonGoldIndices.length)];
      } else if (!picked) {
        targetIndex = minIdx;
      }
    }

    // Jitter ngẫu nhiên trong phạm vi ±35% thẻ để kim không bị cố định tuyệt đối ở tâm
    const jitter = (Math.random() - 0.5) * (itemW * 0.7);

    // Vị trí dừng chính xác: trừ paddingLeft để căn chuẩn vạch trung tâm
    const targetPos = centerOffset - paddingLeft - targetIndex * itemTotal + jitter;
    const startPos = 0;
    const duration = 5800; // 5.8 giây quay kịch tính
    const startTime = performance.now();
    lastTickRef.current = -1;

    // Âm thanh rumble nền
    rollSoundRef.current = soundEngine.playRoll();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Đường cong Cubic Bezier liên tục
      const eased = cs2BezierEase(progress);
      const currentPos = startPos + (targetPos - startPos) * eased;
      strip.style.transform = `translateX(${currentPos}px)`;

      // Tính vị trí kim chỉ trung tâm trên dải cuộn
      const needlePos = (containerWidth / 2) - currentPos - paddingLeft;
      const currentItemIdx = Math.floor(needlePos / itemTotal);

      // Phát tiếng tick nhịp nhàng khi từng món lướt qua vạch kim
      if (currentItemIdx !== lastTickRef.current && currentItemIdx >= 0 && currentItemIdx < items.length) {
        lastTickRef.current = currentItemIdx;
        soundEngine.playTick(0.85 + (1 - progress) * 0.35);
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Hoàn tất: Dừng tuyệt đối tại targetPos
        strip.style.transform = `translateX(${targetPos}px)`;
        if (rollSoundRef.current) rollSoundRef.current.stop();

        // Thẻ chiến thắng chính xác là targetIndex
        const winningIndex = targetIndex;
        const itemAtNeedle = items[winningIndex];

        // Highlight thẻ chiến thắng
        const allItems = strip.querySelectorAll('.reel-item');
        if (allItems[winningIndex]) {
          allItems[winningIndex].classList.add('selected');
        }

        // NẾU MỞ TRÚNG VÀNG SECRET: Bốc ngẫu nhiên 1 món xa xỉ đắt tiền tương ứng của case!
        if (itemAtNeedle.isSpecialGold) {
          const secretGoldDish = getRandomSecretGold(caseId, isVeg);
          onComplete(secretGoldDish);
        } else {
          onComplete(itemAtNeedle);
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (rollSoundRef.current) rollSoundRef.current.stop();
    };
  }, []);

  return (
    <section className="reel-section">
      <div className="reel-indicator" />
      <div className="reel-indicator-line" />
      <div className="reel-container" ref={containerRef}>
        <div className="reel-strip" ref={stripRef} />
      </div>
    </section>
  );
}
