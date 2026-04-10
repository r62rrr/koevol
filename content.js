function applySavedVolume() {
  browser.storage.local.get("savedVolume").then((res) => {
    const vol = res.savedVolume !== undefined ? res.savedVolume : 0.2; // 初期値20%
    document.querySelectorAll('audio, video').forEach(media => {
      media.volume = vol;
    });
  });
}

// 監視と実行
const observer = new MutationObserver(applySavedVolume);
observer.observe(document.body, { childList: true, subtree: true });
setInterval(applySavedVolume, 1000);