
// 拡張機能をインストールした時に１度だけ実行
chrome.runtime.onInstalled.addListener(() => {
  console.log("nowInstall");
  storage_set("setting2",true);
  storage_set("setting3",true);
  storage_set("setting4",true); //前期false 後期true
})


function storage_set(key, value) {
  chrome.storage.local.set({ [key]: value }, function () {
  });
}