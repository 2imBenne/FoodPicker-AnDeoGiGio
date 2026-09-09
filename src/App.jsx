import { useState, useCallback, useRef, useMemo } from 'react';
import {
  CASES_CONFIG,
  MEAT_FOODS,
  VEG_FOODS,
  SNACK_FOODS,
  DRINK_FOODS,
  DESSERT_FOODS,
} from './data/foods';
import { soundEngine } from './utils/sound';
import CaseSelector from './components/CaseSelector';
import Reel from './components/Reel';
import Controls from './components/Controls';
import ResultModal from './components/ResultModal';
import ItemGallery from './components/ItemGallery';
import ParticleCanvas from './components/ParticleCanvas';
import ConfettiCanvas from './components/ConfettiCanvas';

export default function App() {
  // selectedCaseId: null = đang ở màn hình chọn hòm, hoặc 'main' | 'snacks' | 'drinks' | 'desserts'
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [isVeg, setIsVeg] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [muted, setMuted] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const confettiRef = useRef(null);

  // Lấy toạ độ người dùng trước để tối ưu tìm quán gần nhất trên Google Maps
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {},
        { enableHighAccuracy: false, timeout: 6000, maximumAge: 300000 }
      );
    }
  }, []);

  // Lấy thông tin Case hiện tại
  const currentCase = useMemo(() => {
    return CASES_CONFIG.find(c => c.id === selectedCaseId) || CASES_CONFIG[0];
  }, [selectedCaseId]);

  // Lấy danh sách món ăn cho Case đang mở
  const foods = useMemo(() => {
    if (selectedCaseId === 'snacks') return SNACK_FOODS;
    if (selectedCaseId === 'drinks') return DRINK_FOODS;
    if (selectedCaseId === 'desserts') return DESSERT_FOODS;
    return isVeg ? VEG_FOODS : MEAT_FOODS;
  }, [selectedCaseId, isVeg]);

  const handleSelectCase = useCallback((caseId) => {
    soundEngine.init();
    setSelectedCaseId(caseId);
    setIsVeg(false);
    setShowResult(false);
    setResult(null);
  }, []);

  const handleBackToSelector = useCallback(() => {
    if (spinning) return;
    setSelectedCaseId(null);
    setShowResult(false);
    setResult(null);
  }, [spinning]);

  const handleSpin = useCallback(() => {
    if (spinning) return;
    soundEngine.init();
    setShowResult(false);
    setResult(null);
    setSpinning(true);
  }, [spinning]);

  const handleSpinComplete = useCallback((item) => {
    setSpinning(false);
    setResult(item);
    // Delay ngắn trước khi show result modal
    setTimeout(() => {
      if (item.isSpecialGold || item.rarity === 'gold') {
        soundEngine.playGoldWin();
        setShowResult(true);
        confettiRef.current?.launchGold();
      } else {
        soundEngine.playWin();
        setShowResult(true);
        confettiRef.current?.launch();
      }
    }, 500);
  }, []);

  const handleContinue = useCallback(() => {
    setShowResult(false);
    setResult(null);
  }, []);

  const handleFindRestaurant = useCallback(() => {
    // Trình duyệt tự mở tab Google Maps thông qua thẻ <a> có sẵn href và target="_blank"
  }, []);

  const handleToggleMute = useCallback(() => {
    const isMuted = soundEngine.toggleMute();
    setMuted(isMuted);
  }, []);

  return (
    <div className="app">
      <ParticleCanvas />
      <ConfettiCanvas ref={confettiRef} />

      {/* Mute button */}
      <button
        className="mute-btn"
        onClick={handleToggleMute}
        title="Bật / Tắt âm thanh"
      >
        {muted ? '🔇' : '🔊'}
      </button>

      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="header__title">Ăn đéo gì giờ</h1>
        </header>

        {/* 1. MÀN HÌNH CHỌN HÒM (KHI CHƯA CHỌN HÒM) */}
        {!selectedCaseId ? (
          <CaseSelector onSelectCase={handleSelectCase} />
        ) : (
          /* 2. MÀN HÌNH QUAY HÒM ĐÃ CHỌN */
          <div className="case-opening-view">
            {/* Thanh điều hướng đổi hòm */}
            <div className="case-nav-bar">
              <button
                className="case-nav-bar__back-btn"
                onClick={handleBackToSelector}
                disabled={spinning}
                title="Quay lại danh sách chọn hòm"
              >
                ← CHỌN HÒM KHÁC
              </button>

              <div className="case-nav-bar__current">
                <span className="case-nav-bar__icon">{currentCase.icon}</span>
                <span className="case-nav-bar__name">{currentCase.name}</span>
                <span
                  className="case-nav-bar__badge"
                  style={{ background: currentCase.color }}
                >
                  {currentCase.badge}
                </span>
              </div>
            </div>

            {/* Reel cuộn mở hòm */}
            <Reel
              foods={foods}
              spinning={spinning}
              onComplete={handleSpinComplete}
              isVeg={isVeg}
              caseId={selectedCaseId}
            />

            {/* Controls */}
            <Controls
              isVeg={isVeg}
              onToggleVeg={() => !spinning && setIsVeg(v => !v)}
              onSpin={handleSpin}
              spinning={spinning}
              hasVegToggle={currentCase.hasVegToggle}
            />

            {/* Vật phẩm trong hòm */}
            <ItemGallery foods={foods} />
          </div>
        )}
      </main>

      {/* Result Modal */}
      {showResult && result && (
        <ResultModal
          item={result}
          userCoords={userCoords}
          onContinue={handleContinue}
          onFindRestaurant={handleFindRestaurant}
        />
      )}
    </div>
  );
}
