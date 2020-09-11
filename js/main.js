const Hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
const Katakana = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'];
const Romanization = ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'shi', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'fu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', 'wo', 'n']


const $panels = document.querySelector('.panels');
const $list = $panels.querySelector('.translist');
const $convertBtn = document.querySelector('.buttons #convert');
const $input = document.querySelector('.texts #input');
const $output = document.querySelector('.texts #output');
let State = true;

const clearBlank = function(obj) {  
    return obj.split(' ').join('')
}

const JpState = function () {
    return State ? Hiragana : Katakana
}

const getTransList = function() {  
    $list.innerHTML = '';
    for (let i = 0; i < Hiragana.length; i++) {
        let node = document.createElement('li');
        let textnode = document.createTextNode(JpState()[i]+' / '+Romanization[i]);
        node.appendChild(textnode);
        $list.appendChild(node);
    }
}

const convertList = function() {  
    State = !State;
    let text = State ? 'あ' : 'ア';
    $convertBtn.innerHTML = text;
    getTransList();
}

const symbolRotate = function() {  
    document.querySelector('.panel .symbol').classList.toggle('rotate360');
}

const getIndex = function(arr, text) {  
    const index = arr.indexOf(text);
    if (index === -1) return null;
    return index
}

const getRomanWord = function(text) {  
    const index = getIndex(JpState(), text)
    return Romanization[index];
}

const getJpWord = function(text) {  
    const index = getIndex(Romanization, text)
    return JpState()[index];
}

const getResult = function (func, text) {  
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let word = func(text[i]);
        // word = word === undefined ? ' ' : word;
        if (word === undefined) {
            let text = State ? '平假名' : '片假名';
            alert('請輸入正確的'+ text);
            word = ' ';
            return false
        }
        result += word + ' ';
    }
    return result
}

const translateToRoman = function() {  
    let text = $input.value;
    const result = getResult(getRomanWord, text);
    if (result === false) {
        return
    }
    $output.innerHTML = result;
    symbolRotate();
}

const translateToJP = function() {  
    const text = clearBlank($output.value);
    const result = getResult(getJpWord, text);
    $input.innerHTML = clearBlank(result);
    symbolRotate();
}

const ckeckResult = function(result) {  
    if (!result) return false;
    if (clearBlank(result) === '') return false;
}

const btnOnClick = function() {  
    document.querySelector('.buttons').addEventListener('click', function(e) {  
        const id = e.target.id;
        if (id === 'convert') {
            convertList();
            return
        }
        if (id === 'btnRoma') translateToRoman();
        if (id === 'btnJp') translateToJP();
    })
    
}

const btnDisplayOnClick = function() {  
    document.querySelector('.btnDisplay').addEventListener('click', function() { 
        this.classList.toggle('rotate');
        document.querySelector('.panel#allList').classList.toggle('rotate');
    })
}

getTransList();
btnOnClick();
btnDisplayOnClick();