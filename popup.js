const slider = document.getElementById('volume');
const valDisplay = document.getElementById('val');

// 保存されている音量を読み込んで表示に反映
browser.storage.local.get("savedVolume").then((res) => {
  if (res.savedVolume !== undefined) {
    const vol = Math.round(res.savedVolume * 100);
    slider.value = vol;
    valDisplay.textContent = vol;
  }
});

// スライダーを動かした時の処理
slider.addEventListener('input', (e) => {
  const volPercent = e.target.value;
  const volume = volPercent / 100;
  valDisplay.textContent = volPercent;

  // 設定を保存
  browser.storage.local.set({ savedVolume: volume });

  // 実行中のタブに即座に反映させる
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    browser.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: (v) => {
        document.querySelectorAll('audio, video').forEach(m => m.volume = v);
      },
      args: [volume]
    });
  });
});