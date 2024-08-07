document.getElementById("switch1").addEventListener("change", function () {
  console.log(document.getElementById("switch1").checked)
  send_data("editor", document.getElementById("switch1").checked);
});
document.getElementById("switch2").addEventListener("change", function () {
  storage_set("setting2", document.getElementById("switch2").checked)
});
document.getElementById("switch3").addEventListener("change", function () {
  storage_set("setting3", document.getElementById("switch3").checked)
});
document.getElementById("switch4").addEventListener("change", function () {
  storage_set("setting4", document.getElementById("switch4").checked)
});


// popup.js内で
function send_data(data_, bool_) {
  // popup.js内で
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: data_, bool: bool_ });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const setting2Value = await read_data("setting2");
    document.getElementById("switch2").checked = JSON.parse(setting2Value);
  } catch (error) {
    console.error('Error reading setting2:', error);
  }
  try {
    const setting2Value = await read_data("setting3");
    document.getElementById("switch3").checked = JSON.parse(setting2Value);
  } catch (error) {
    console.error('Error reading setting3:', error);
  }
  try {
    const setting2Value = await read_data("setting4");
    document.getElementById("switch4").checked = JSON.parse(setting2Value);
  } catch (error) {
    console.error('Error reading setting4:', error);
  }
});

function read_data(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, function (data) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.info(data);
        console.log(data[key]);
        resolve(data[key]);
      }
    });
  });
}

function storage_set(key, value) {
  chrome.storage.local.set({ [key]: value }, function () {
  });
}
