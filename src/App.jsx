import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { MEAT_FOODS, VEG_FOODS, BUDGET_OPTIONS } from './data/foods';
import { soundEngine } from './utils/sound';
import Reel from './components/Reel';
import Controls from './components/Controls';
import ResultModal from './components/ResultModal';
import ItemGallery from './components/ItemGallery';
import ParticleCanvas from './components/ParticleCanvas';
import ConfettiCanvas from './components/ConfettiCanvas';

// Seed counter ban đầu (random khoảng 100k-200k) + localStorage
function getCounter() {
  const saved = localStorage.getItem('hom_nay_an_gi_counter');
  if (saved) return parseInt(saved, 10);
  const seed = 150000 + Math.floor(Math.random() * 80000);
  localStorage.setItem('hom_nay_an_gi_counter', seed);
  return seed;
}

function incrementCounter(current) {
  const next = current + 1;
  localStorage.setItem('hom_nay_an_gi_counter', next);
  return next;
}

export default function App() {
  const [isVeg, setIsVeg] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [counter, setCounter] = useState(getCounter);
  const [muted, setMuted] = useState(false);
  const confettiRef = useRef(null);

  // Danh sách món theo chế độ Chay / Mặn
  const foods = isVeg ? VEG_FOODS : MEAT_FOODS;

  const handleSpin = useCallback(() => {
    if (spinning) return;
    soundEngine.init();
    setShowResult(false);
    setResult(null);
    setSpinning(true);
    setCounter(prev => incrementCounter(prev));
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
    if (!result) return;
    const doSearch = (lat, lng) => {
      const q = encodeURIComponent(`${result.search} quán gần đây`);
      const url = lat != null
        ? `https://www.google.com/maps/search/${q}/@${lat},${lng},15z`
        : `https://www.google.com/maps/search/${q}`;
      window.open(url, '_blank');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => doSearch(pos.coords.latitude, pos.coords.longitude),
        () => doSearch(null, null),
        { timeout: 5000, enableHighAccuracy: false }
      );
    } else {
      doSearch(null, null);
    }
  }, [result]);

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

        {/* Reel */}
        <Reel
          foods={foods}
          spinning={spinning}
          onComplete={handleSpinComplete}
          isVeg={isVeg}
        />

        {/* Controls */}
        <Controls
          isVeg={isVeg}
          onToggleVeg={() => !spinning && setIsVeg(v => !v)}
          onSpin={handleSpin}
          spinning={spinning}
        />

        {/* Vật phẩm trong hòm */}
        <ItemGallery foods={foods} />
      </main>

      {/* Result Modal */}
      {showResult && result && (
        <ResultModal
          item={result}
          onContinue={handleContinue}
          onFindRestaurant={handleFindRestaurant}
        />
      )}
    </div>
  );
}
