var timeColor = "#00CCFF"

function radio_changed() {
    if (document.getElementById('mytimetable_btn_0').checked) {
        console.log("前期")
        document.getElementById('g1-f').style.display = 'none';
        document.getElementById('g2-f').style.display = 'none';
        document.getElementById('g3-f').style.display = 'none';
        document.getElementById('g4-f').style.display = 'none';
        document.getElementById('g5-f').style.display = 'none';
        document.getElementById('g6-f').style.display = 'none';
        document.getElementById('g7-f').style.display = 'none';
        document.getElementById('g8-f').style.display = 'none';
        document.getElementById('mytimeTable_table_0').style.display = '';
        document.getElementById('mytimeTable_label_0').style.display = '';
        document.getElementById('mytimeTable_table_1').style.display = 'none';
        document.getElementById('mytimeTable_label_1').style.display = 'none';
        document.getElementById("mytimetable_btn_label_0").style.backgroundColor = 'rgb(0, 204, 255)';
        document.getElementById("mytimetable_btn_label_0").style.color = '#000000';
        document.getElementById("mytimetable_btn_label_1").style.backgroundColor = '#bdc3c7';
        document.getElementById("mytimetable_btn_label_1").style.color = '#555e64';
        document.getElementById("mytimeTable_br_0").style.display = "";
        document.getElementById("mytimeTable_br_1").style.display = "none";
        document.getElementById("mytimeTable_table_intensive").style.display = "";

    }
    else if (document.getElementById('mytimetable_btn_1').checked) {
        console.log("後期")
        document.getElementById('g1-f').style.display = 'none';
        document.getElementById('g2-f').style.display = 'none';
        document.getElementById('g3-f').style.display = 'none';
        document.getElementById('g4-f').style.display = 'none';
        document.getElementById('g5-f').style.display = 'none';
        document.getElementById('g6-f').style.display = 'none';
        document.getElementById('g7-f').style.display = 'none';
        document.getElementById('g8-f').style.display = 'none';
        document.getElementById('mytimeTable_table_0').style.display = 'none';
        document.getElementById('mytimeTable_label_0').style.display = 'none';
        document.getElementById('mytimeTable_table_1').style.display = '';
        document.getElementById('mytimeTable_label_1').style.display = '';
        document.getElementById("mytimetable_btn_label_1").style.backgroundColor = 'rgb(0, 204, 255)';
        document.getElementById("mytimetable_btn_label_1").style.color = '#000000';
        document.getElementById("mytimetable_btn_label_0").style.backgroundColor = '#bdc3c7';
        document.getElementById("mytimetable_btn_label_0").style.color = '#555e64';
        document.getElementById("mytimeTable_br_0").style.display = "none";
        document.getElementById("mytimeTable_br_1").style.display = "";
        document.getElementById("mytimeTable_table_intensive").style.display = "";

    }

    else {
        console.log("その他")
        document.getElementById('mytimeTable_table_0').style.display = 'none';
        document.getElementById('mytimeTable_label_0').style.display = 'none';
        document.getElementById('mytimeTable_table_1').style.display = 'none';
        document.getElementById('mytimeTable_label_1').style.display = 'none';
        document.getElementById("mytimetable_btn_label_0").style.backgroundColor = '#bdc3c7';
        document.getElementById("mytimetable_btn_label_0").style.color = '#555e64';
        document.getElementById("mytimetable_btn_label_1").style.backgroundColor = '#bdc3c7';
        document.getElementById("mytimetable_btn_label_1").style.color = '#555e64';
        document.getElementById("mytimeTable_br_0").style.display = "";
        document.getElementById("mytimeTable_br_1").style.display = "";
        document.getElementById("mytimeTable_table_intensive").style.display = "none";
    }
}

// content_script.js内で
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (message.data) {
        if (message.data === "editor" && message.bool === true) {
            choiceBox();
        }
        else if (message.data === "editor" && message.bool === false) {
            removeEditor();
            storage_timetable_background();
        }
        else {
            console.log("メッセージが設定されてません[" + message.data + "]")
        }
    }
});
// 指定されたクラスに一致するすべての要素を削除する関数
function removeEditor() {
    console.log("remove実行")
    var elements = document.querySelectorAll(".editor");
    elements.forEach(function (element) {
        var parentElem = element;
        // 親要素から最初の子要素を取得して親要素の上に子要素を移動
        while (parentElem.firstChild) {
            parentElem.parentNode.insertBefore(parentElem.firstChild, parentElem);
        }
        // 空の親要素を削除
        parentElem.parentNode.removeChild(parentElem);
    });

    elements = document.querySelectorAll(".editor_button");
    elements.forEach(function (element) {
        var parentElem = element;
        // 親要素から最初の子要素を取得して親要素の上に子要素を移動
        parentElem.parentNode.removeChild(parentElem);
    });
    var elements = document.querySelectorAll(".editor_table");
    elements.forEach(function (element) {
        var parentElem = element;
        // 空の親要素を削除
        parentElem.parentNode.removeChild(parentElem);
    });

    elements = document.querySelectorAll(".editor_button");
    elements.forEach(function (element) {
        element.parentNode.removeChild(parentElem);
    });
}
function GenerateSaveButton() {
    // 新しいボタン要素を作成
    var button = document.createElement("button");
    button.innerHTML = "保存";
    button.setAttribute("class", "editor");
    button.style = "position: fixed;bottom: 40px;left: 40px;border: none;border-radius: 50%;width: 200px;height: 200px;background-color: #4CAF50;color: white;font-size:60px;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);transition: transform 0.2s;"
    // ボタンにhoverとactiveのスタイルを設定
    button.addEventListener('mouseover', function () {
        button.style.transform = 'translateY(2px)';
    });

    button.addEventListener('mouseout', function () {
        button.style.transform = 'translateY(0)';
    });

    button.addEventListener('mousedown', function () {
        button.style.transform = 'translateY(4px)';
    });

    button.addEventListener('mouseup', function () {
        button.style.transform = 'translateY(2px)';
    });
    button.addEventListener("click", function () {
        setTimeout(function () {
            button.textContent = ""
            button.remove();
            location.reload();
        }, 100)
    })

    // ボタンをbodyの最後に追加
    document.body.appendChild(button);
}


function choiceBox() {

    // クラス名が "main_font" のすべての要素を取得
    var elements = document.querySelectorAll('.main_font');

    // 取得した要素ごとに処理を行う
    elements.forEach(function (element) {
        // <p> 要素が見つかったかどうかのフラグ
        var foundParagraph = false;

        if (element.parentElement.classList.contains('editor') || element.parentElement.classList.contains('editor_table')) {//親要素がeditor（すでに登録されている時間割だったら）///////////////////////////////////////////////////////
            var div = element.parentElement;
            var button = document.createElement("button");
            //button.textContent = generateId(element);
            button.textContent = "✕"
            button.setAttribute("class", "editor_button");
            div.style.backgroundColor = "lightsteelblue";
            div.appendChild(button);


            button.addEventListener("click", function () {
                if (button.textContent === "◯") {
                    div.style.backgroundColor = "lightsteelblue";
                    button.textContent = "✕"

                    storage_set(generateId(element), div.querySelector('.main_font').getAttribute('period'));

                }
                else {
                    div.style.backgroundColor = "pink";
                    button.textContent = "◯"
                    storage_remove(generateId(element));

                }
                console.log(generateId(element));

            })
        }
        else { //登録されていない時間割の場合////////////////////////////////////////////////////////////////////////
            // 次の要素へ移動
            var nextElement = element.nextElementSibling;

            // 次の要素が存在し、<p> 要素でない場合、下に移動し続ける
            while (nextElement && nextElement.tagName !== 'P') {
                nextElement = nextElement.nextElementSibling;
            }

            // <p> 要素が見つかった場合、それを含む <div> 要素を作成し、挿入する
            if (nextElement && nextElement.tagName === 'P') {
                var div = document.createElement("div");
                div.style.border = "1px solid #000"; // ディビジョンに境界線を追加
                div.setAttribute("class", "editor");

                // 見つかった <p> 要素を <div> 要素の前に挿入
                while (element.nextElementSibling !== nextElement) {
                    div.appendChild(element.nextElementSibling);
                }
                element.parentNode.insertBefore(div, nextElement);
                div.appendChild(element);
                element.parentNode.insertBefore(element, element.parentNode.firstChild);
                div.appendChild(nextElement);
                var button = document.createElement("button");
                //button.textContent = generateId(element);
                button.textContent = "◯"
                button.setAttribute("class", "editor_button");
                div.appendChild(button);


                button.addEventListener("click", function () {
                    //console.log(div.querySelector('.main_font').getAttribute('period'));
                    //console.log(div.querySelector('.main_font'));
                    if (button.textContent === "◯") {
                        div.style.backgroundColor = "lightsteelblue";
                        button.textContent = "✕"
                        storage_set(generateId(element), div.querySelector('.main_font').getAttribute('period'));
                        //console.log(button.parentElement.parentElement.parentElement.parentElement.parentElement.id)

                    }
                    else {
                        div.style.backgroundColor = null;
                        button.textContent = "◯"
                        storage_remove(generateId(element));

                    }
                    console.log(generateId(element));

                })
            }

            foundParagraph = true;
        }

        // <p> 要素が見つからなかった場合、適切なメッセージを出力
        if (!foundParagraph) {
            console.log("次の <p> 要素が見つかりませんでした。");
        }
    });
    GenerateSaveButton();
}

function storage_set(key, value) {
    chrome.storage.local.set({ [key]: value }, function () {
    });
}
function storage_remove(key) { //指定したキーのストレージを削除
    chrome.storage.local.remove(String(key));
}

function storage_remove_all() {  //設定以外すべてのストレージを削除
    // 保持する設定のキー
    const keysToKeep = ['setting2', 'setting3'];
    // 現在のストレージデータを取得
    chrome.storage.local.get(null, function (items) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving storage items:', chrome.runtime.lastError);
            return;
        }
        // 保持するデータを抽出
        const itemsToKeep = {};
        keysToKeep.forEach(key => {
            if (key in items) {
                itemsToKeep[key] = items[key];
            }
        });

        // ストレージをクリア
        chrome.storage.local.clear(function () {
            if (chrome.runtime.lastError) {
                console.error('Error clearing storage:', chrome.runtime.lastError);
                return;
            }

            // 保持するデータを再保存
            chrome.storage.local.set(itemsToKeep, function () {
                if (chrome.runtime.lastError) {
                    console.error('Error setting storage items:', chrome.runtime.lastError);
                } else {
                    console.log('Storage cleared except for specified settings.');
                }
            });
        });
    });
}

function show_popup(message = "none", displayTime = 3000) { //画面の真ん中にポップアップバーを生成する
    // CSSを生成して追加
    const style = document.createElement('style');
    style.textContent = `
    #messagePopup_timetable {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      font-size: 20px;
      padding: 20px;
      border-radius: 10px;
      opacity: 1;
      transition: opacity 1s ease-in-out;
      pointer-events: none; /* メッセージが非表示になった後のクリックイベントを無効にする */
      white-space: pre-wrap;
    }
    .hidden {
      opacity: 0;
      visibility: hidden;
    }
  `;
    document.head.appendChild(style);

    // メッセージ要素を生成して追加
    const popup = document.createElement('div');
    popup.id = 'messagePopup_timetable';
    popup.classList.add('hidden');
    document.body.appendChild(popup);

    // メッセージを表示する関数
    popup.textContent = message;
    popup.classList.remove('hidden');

    // 指定された時間後にフェードアウト
    setTimeout(() => {
        popup.classList.add('hidden');
    }, displayTime);
}

function myTimeTable_create(element, num) {
    // テーブル要素を作成
    var day = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日"];
    var tbody = document.createElement("tbody");// tbody要素を作成
    var table = document.createElement("table");
    var header = document.createElement("div");
    var br = document.createElement("br");

    table.setAttribute("id", "mytimeTable_table" + "_" + String(num));
    header.setAttribute("id", "mytimeTable_label" + "_" + String(num));
    table.setAttribute("class", "jmx");
    /////////////////////////////////////////////////
    //自分の時間割メニューをわかりやすくラベルを上につける
    /////////////////////////////////////////////////
    var period = ""
    if (num === 0) period = "前期";
    else if (num === 1) period = "後期";
    else period = "null"
    header.textContent = "自分の時間割 " + period;
    header.style.padding = "5px 0";
    header.style.border = "thick double";
    header.style.borderBottom = "none";
    header.style.textAlign = "Center"
    header.style.fontWeight = "bold";
    header.style.backgroundColor = timeColor;
    br.setAttribute("id", "mytimeTable_br_" + String(num));

    // 6行7列のセルを作成してテーブルに追加
    for (var i = 0; i < 7; i++) {
        // 行を作成
        var row = document.createElement("tr");

        for (var j = 0; j < 6; j++) {

            var text = document.createTextNode("");
            if (j === 0) {
                //縦列最初
                var cell = document.createElement("th");
                cell.setAttribute("class", "jmxt");
                cell.style.backgroundColor = timeColor;
                if (i !== 0) {

                    var div = document.createElement("div");
                    div.setAttribute("class", "vertical_text");
                    div.textContent = (i + "限目");
                    cell.appendChild(div);
                }
            }
            else if ((i * 6) + (j + 1) <= 6) {
                //横列最初
                var cell = document.createElement("th");
                cell.setAttribute("class", "jmx");
                cell.style.backgroundColor = timeColor;
                text = document.createTextNode(day[(i * 6) + (j + 1) - 2]);

            }
            else {
                // 列を作成
                var cell = document.createElement("td");
                cell.setAttribute("class", "jmx");
                //セルにテキストを追加
                //text = document.createTextNode((i * 6) + (j + 1));
            }

            cell.appendChild(text);

            // 列を行に追加
            row.appendChild(cell);
        }

        // 行をテーブルに追加
        tbody.appendChild(row);




    }
    // tbodyをテーブルに追加
    table.appendChild(tbody);
    // テーブルをbodyに追加
    element.appendChild(br);
    element.appendChild(header);
    element.appendChild(table);

    table.style.display = "none";
    header.style.display = "none";
}
function myTimeTable_intensive_create(element) {
    var tbody = document.createElement("tbody");// tbody要素を作成
    var table = document.createElement("table");
    table.setAttribute("id", "mytimeTable_table_intensive");
    table.setAttribute("class", "jmx");
    row = document.createElement("tr");
    var cell = document.createElement("th");
    cell.setAttribute("class", "jmx");
    cell.style.backgroundColor = timeColor;
    cell.colSpan = "6";
    text = document.createTextNode("集中科目");
    cell.appendChild(text);
    row.appendChild(cell);
    tbody.appendChild(row);

    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.setAttribute("class", "jmx");
    cell.colSpan = "6";
    // 列を行に追加
    row.appendChild(cell);
    tbody.appendChild(row);

    // tbodyをテーブルに追加
    table.appendChild(tbody);
    // テーブルをbodyに追加
    element.insertAdjacentElement('afterend', table);
}
function myTimeTable_set(element, num) {

    var myTimeTable = document.getElementById("mytimeTable_table" + "_" + String(num));
    var cell_ = element
    // 親要素が<td>または<th>になるまで親要素をたどる
    while (cell_ && cell_.tagName !== 'TD' && cell_.tagName !== 'TH') {
        cell_ = cell_.parentElement;
    }

    // TDまたはTHが見つかった場合
    if (cell_ && (cell_.tagName === 'TD' || cell_.tagName === 'TH')) {
        // テキストからxとyの値を正規表現で抽出する
        var match = cell_.className.match(/x=(\d+)\sy=(\d+)/);
        var x = parseInt(match[1]); // xの値を数値に変換
        var y = parseInt(match[2]); // yの値を数値に変換
        //console.log(String(x) + "-" + String(y))
        var timecell = myTimeTable.querySelector('.x\\=' + x + '.y\\=' + y);
        //console.log(timecell)
        var clone_element = element.cloneNode(true);
        clone_element.style = ""
        clone_element.setAttribute("class", "editor_table")
        if (timecell !== null) {
            timecell.appendChild(clone_element);

        }
        else {//集中授業の設定
            var x = 0; // xの値を数値に変換
            var y = 8; // yの値を数値に変換
            //console.log(String(x) + "-" + String(y))
            //var timecell = myTimeTable.querySelector('.x\\=' + x + '.y\\=' + y);
            var timecell = document.getElementById("mytimeTable_table_intensive").querySelector('.x\\=' + x + '.y\\=' + y);
            //console.log(timecell)
            var clone_element = element.cloneNode(true);
            clone_element.style = ""
            clone_element.setAttribute("class", "editor_table");
            if (timecell !== null) {
                timecell.appendChild(clone_element);

            }
        }

    } else {
        console.log("x=" + x + ", y=" + y + "のセルの親要素が見つかりませんでした。");
    }

}


function BeginSetID() {//最初にすべての講義に、講義ID & 前期講義ID を割り当てます(親 ↓ & ↓↓)

    // クラス名が "main_font" のすべての要素を取得
    var elements = document.querySelectorAll('.main_font');
    elements.forEach(function (element) {
        element.setAttribute("ID", generateId(element));
    })

    var tables = document.getElementsByTagName("table");
    tables = Array.from(tables); //テーブルの複数を配列に変換する。
    tables.forEach(function (table) {
        GeneratePeriod(table);
    })

};

function generateId(element) { //講義の用の固有IDを生成(子)
    // element内のすべての<a>要素を取得します
    const links = element.querySelectorAll('a');
    var link = "";
    // リンクをループして、idを取得します
    for (let i = 0; i < links.length; i++) {
        link = links[i];
        // href属性からidを取得します
        const href = link.getAttribute('href');
        // href属性が"/2024/course/view.php?id="で始まるか確認します
        if (href.startsWith('/2024/course/view.php?id=')) {
            // href属性からidの部分を抽出します
            const id = href.substring('/2024/course/view.php?id='.length);
            // idが数字であるかチェックします
            if (!isNaN(id)) {
                return id; // 数字のidを返します
            }
        }
        else if (href.startsWith('https://moodlestack2024.mc2.osakac.ac.jp/2024/course/view.php?id=')) {
            const id = href.substring('https://moodlestack2024.mc2.osakac.ac.jp/2024/course/view.php?id='.length);
            // idが数字であるかチェックします
            if (!isNaN(id)) {
                return ("9999" + id); // 数字のidを返します
            }
        }
    }

    // 数字のidが見つからなかった場合
    console.log(link);
    return link;
}
// IDをCSSエスケープする関数
function escapeCSSId(id) {
    return id.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, '\\$1');
}

function GeneratePeriod(table) { //講義の固有前期後期IDを生成(子)
    //前期
    var FirstPeriod = ["g1-f", "g2-f", "g3-f", "g4-f", "mytimeTable_table_0"];
    //後期
    var LastPeriod = ["g5-f", "g6-f", "g7-f", "g8-f", "mytimeTable_table_1"];
    var intensive = ["mytimeTable_table_intensive"];
    var elements = table.querySelectorAll(".main_font");
    //console.log(elements);
    ////////////テーブルに前期後期IDを設定///////////////
    if (FirstPeriod.includes(table.id)) {
        table.setAttribute("Period", "0");
    }
    else if (LastPeriod.includes(table.id)) {
        table.setAttribute("Period", "1");
    }
    else if (intensive.includes(table.id)){
        return 0; //集中科目の場合処理を終了する
    }
    else {
        console.error("テーブルの前期講義の取得に失敗しました。\nエラー箇所:GeneratePeriod()\n前期後期未設定箇所\n"+table.id)
    }
    ////////////講義に前期後期IDを設定///////////////
    if (elements !== null) {
        elements = Array.from(elements); //テーブルの複数を配列に変換する。
        elements.forEach(function (element) {
            element.setAttribute("Period", table.getAttribute("Period"));
        })
    }
}

function addCoordinatesToTable() { //すべてのtableを取得してx,y座標を設定
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var table = tables[i];
        var rows = table.getElementsByTagName("tr");
        //console.log(table);

        if (table.id === "mytimeTable_table_intensive") { //集中科目の場合
            var cells = rows[1].querySelectorAll("td, th");
            var cell = cells[0];
            cell.classList.add("x=0", "y=8"); // クラスに"x=?"と"y=?"を追加
        }

        else {
            for (var y = 0; y < rows.length; y++) {
                var cells = rows[y].querySelectorAll("td, th");

                for (var x = 0; x < cells.length; x++) {
                    var cell = cells[x];
                    cell.classList.add("x=" + x, "y=" + y); // クラスに"x=?"と"y=?"を追加
                }
            }
        }

    }
}

function read_data(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, function (data) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data[key]);
            }
        });
    });
}



function storage_timetable_background() {//ローカルからデータを読み取り保存されたデータを下に時間割の背景色を変更 & データ配置
    chrome.storage.local.get(null, ((data) => {
        for (let value in data) {
            //console.log("講義ID%d 前期後期%d",value,data[value]);
            //console.log(data);

            // クラス名が "main_font" のすべての要素を取得
            var elements = document.querySelectorAll('.main_font');
            elements.forEach(function (element) {
                if (element.id === value) {
                    // 次の要素へ移動
                    var nextElement = element.nextElementSibling;

                    // 次の要素が存在し、<p> 要素でない場合、下に移動し続ける
                    while (nextElement && nextElement.tagName !== 'P') {
                        nextElement = nextElement.nextElementSibling;
                    }

                    // <p> 要素が見つかった場合、それを含む <div> 要素を作成し、挿入する
                    if (nextElement && nextElement.tagName === 'P') {
                        var div = document.createElement("div");
                        div.style.border = "1px dashed #000"; // ディビジョンに境界線を追加
                        div.style.backgroundColor = "lightsteelblue"
                        div.setAttribute("class", "editor");

                        // 見つかった <p> 要素を <div> 要素の前に挿入
                        while (element.nextElementSibling !== nextElement) {
                            div.appendChild(element.nextElementSibling);
                        }
                        element.parentNode.insertBefore(div, nextElement);
                        div.appendChild(element);
                        element.parentNode.insertBefore(element, element.parentNode.firstChild);
                        div.appendChild(nextElement);
                        if (data[value] === "0" || data[value] === "1") {
                            //console.log("成功")
                            myTimeTable_set(div, data[value]);
                        }
                        else {
                            show_popup("以前のデータ型が存在します。現在のバージョンでは使用できません\n講義データを初期化して再読込します。\n講義の再設定をお願いします。\n\n10秒後に自動で再起動します。", 10000);
                            storage_remove_all();
                            setTimeout(() => {
                                location.reload();
                            }, 10000);
                        }
                        //console.info("一致[" + value + "]")
                    }
                }
            });

        }
    }));
}


function console_styler(num, string) {
    let styles = '';
    if (parseInt(num) === 1) {
        const spacing = '10px';
        styles = `padding: ${spacing}; background-color: white; color: red; font-style: italic; border: 1px solid black; font-size: 2em;`;
    }
    else if (parseInt(num) === 2) {
        const spacing = '10px';
        styles = `padding: ${spacing};  color: green; font-style: italic; font-size: 2em;`;
    }
    else if (parseInt(num) === 3) {
        const spacing = '3px';
        styles = `padding: ${spacing};  color: green; font-style: italic; font-size: 1em;font-weight: bold;`;
    }
    else {
        console.log("console_styler選択失敗");
    }
    console.log('%c' + string, styles);
}


window.onload = async function () {

    /////////////////////////////////////
    //////////////ボタン作成//////////////
    /////////////////////////////////////
    // div要素を取得
    var divElement = document.querySelector('.sample');
    myTimeTable_create(divElement, 0);
    myTimeTable_create(divElement, 1);
    myTimeTable_intensive_create(document.getElementById("mytimeTable_table_1"));//timetableの下に集中授業を入れる
    BeginSetID();
    storage_timetable_background();
    addCoordinatesToTable();
    var input_0, input_1;

    try {
        const setting2Value = await read_data("setting2");
        //console.log(JSON.parse(setting2Value))
        if (JSON.parse(setting2Value)) {//時間割ボタンの追加
            //console.log(JSON.parse(setting2Value))
            // ボタン要素を作成
            var button_0 = document.createElement("button");
            var button_1 = document.createElement("button");

            // input要素を作成
            input_0 = document.createElement("input");
            input_1 = document.createElement("input");
            input_0.setAttribute("type", "radio");
            input_0.setAttribute("name", "oecu");
            input_0.setAttribute("id", "mytimetable_btn_0");
            input_0.setAttribute("value", "mytimetable_btn_0");
            input_1.setAttribute("type", "radio");
            input_1.setAttribute("name", "oecu");
            input_1.setAttribute("id", "mytimetable_btn_1");
            input_1.setAttribute("value", "mytimetable_btn_1");
            input_0.addEventListener("change", function () {
                radio_changed(input_0);
            });
            input_1.addEventListener("change", function () {
                radio_changed(input_1);
            });

            for (var i = 1; i < 9; i++) {
                var ele = document.getElementById('btn-g' + i + '-f');
                ele.addEventListener("change", function () {
                    radio_changed(ele);
                })
            }

            // label要素を作成
            var label_0 = document.createElement("label");
            var label_1 = document.createElement("label");
            label_0.setAttribute("for", "mytimetable_btn_0");
            label_0.setAttribute("id", "mytimetable_btn_label_0")
            label_0.style.width = '110px'
            label_0.textContent = "自分の時間割\n前期";
            label_1.setAttribute("for", "mytimetable_btn_1");
            label_1.setAttribute("id", "mytimetable_btn_label_1")
            label_1.style.width = '110px'
            label_1.textContent = "自分の時間割\n後期";

            // 要素を取得
            const targetElement = document.querySelector('.sample');

            // 要素が取得されたか確認
            if (targetElement !== null) {
                // 指定された要素の直前にボタン要素を挿入
                targetElement.insertBefore(document.createElement("br"), targetElement.firstChild);
                targetElement.insertBefore(document.createElement("br"), targetElement.firstChild);
                targetElement.insertBefore(document.createElement("br"), targetElement.firstChild);
                targetElement.insertBefore(input_1, targetElement.firstChild);
                targetElement.insertBefore(label_1, targetElement.firstChild);
                targetElement.insertBefore(input_0, targetElement.firstChild);
                targetElement.insertBefore(label_0, targetElement.firstChild);
            }
            else {
                console.log("要素が見つかりませんでした。");
            }

        }
        else{
            document.getElementById("mytimeTable_table_intensive").style.display = "none";
        }
    } catch (error) {
        console.error('Error reading setting2:', error);
    }

    try {
        const setting3Value = await read_data("setting3");
        //console.log(JSON.parse(setting3Value))
        if (JSON.parse(setting3Value)) {//時間割ボタンの追加
            try {
                const setting4Value = await read_data("setting4");
                //console.log(JSON.parse(setting4Value))
                if (JSON.parse(setting4Value) === true) {
                    document.getElementById("mytimetable_btn_1").click();
                    console.log("前期")
                }
                else {
                    document.getElementById("mytimetable_btn_0").click();
                    console.log("後期")
                }


            } catch (error) {
                console.error('Error reading setting4:', error);
            }
        }
        else{
            document.getElementById("mytimeTable_table_intensive").style.display = "none"
        }
    } catch (error) {
        console.error('Error reading setting3:', error);
    }


    console_styler(2, "時間割作成拡張機能for OECU_Moodle2024");
    console_styler(3, "created by 951kiwi");
}