//let inputWord = document.getElementById('inputWord');
//let buttonWord = document.getElementById("buttonWord");
//let ruStr = document.querySelector('.columnWord');
//let anglStr = document.querySelector('#anglStr');



function translit(str) {
  let translitStr = '';
  let letters = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'e',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'й': 'y',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'c',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'sch',
    'ь': '\'',
    'ы': 'y',
    'ъ': '',
    'э': 'e',
    'ю': 'yu',
    'я': 'ya',
  };

  let i = 0;
  while (i < str.length) {
    let k = i + 1;
    let keyLower = str[i].toLowerCase();
    let key = str[i];

    if ((str[i] === 'к' && str[k] === "с") ||
      (str[i] === 'к' && str[k] === "С")) {
      translitStr += 'x';
      i = i + 2;
    } else if ((str[i] === 'К' && str[k] === "с") ||
      (str[i] === 'К' && str[k] === "С")) {
      translitStr += 'X';
      i = i + 2;
    } else if (key in letters) {
      translitStr += letters[key];
      ++i;
    } else if (keyLower in letters) {
      let upperLetter = letters[keyLower];
      upperLetter = upperLetter.toUpperCase();
      translitStr += upperLetter;
      ++i;
    } else {
      translitStr += key;
      ++i;
    }
  };

  return translitStr;
};


function cropped(str) {
  let croppedStr = '';
  if (str.length > 30) {
    croppedStr = str.slice(0, 30) + '...';
  } else {
    croppedStr = str;
  }
  return croppedStr;
};

let counterRu = 1;
let counterAngl = 1;

function lineNumberingRu(str) {
  return `${counterRu++}) ${str}`;
};

function lineNumberingAngl(str) {
  return `${counterAngl++}) ${str}`;
};


function bondingFunctions() {
  let propertyInputWord = inputWord.value; // получаем введенное значение

  // ниже начинается блок работы с Ru стокой 
  let croppedRuStr = cropped(propertyInputWord); // обрезаем строку  
  croppedRuStr = lineNumberingRu(croppedRuStr); // нумерация ру строк
  let pRustr = document.createElement('p'); // создаю параграф для Ру строки
  pRustr.innerText = croppedRuStr; //добавляю в параграф обрезанный текст
  pRustr.setAttribute('data-tooltip', propertyInputWord); //добавляею атрибут для подсказки 
  ruStr.append(pRustr);

  // блок работы с Англ строкой
  let translitStr = translit(propertyInputWord); // переводим в Транслит    
  let croppedAnglStr = cropped(translitStr); // обрезаю транслит строку
  croppedAnglStr = lineNumberingAngl(croppedAnglStr); // нумерация Англ строк
  let pFortranslitStr = document.createElement('p'); // создаю параграф для транслит
  pFortranslitStr.innerText = croppedAnglStr; //добавляю в параграф обрезанный текст
  pFortranslitStr.setAttribute('data-tooltip', translitStr);
  anglStr.append(pFortranslitStr);
  document.getElementById('inputWord').value = '';
  
}

buttonWord.addEventListener('click', bondingFunctions);



// а тут я осознал что нужно было воткнуть отправку в html в поле form
// я еще не разобрался, только если заменить див который у меня на form, 
// то не работает, на сек появлется текст и исчезал.
// в итоге чтоб сделать отправку по нажатию на enter заколхозил то что ниже идет

var input = document.getElementById("inputWord");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("buttonWord").click();
  }
});

var blockRu = document.getElementById("ruStr");
var blockAngl = document.getElementById("anglStr");
blockRu.scrollTop = block.scrollHeight;
blockAngl.scrollTop = block.scrollHeight;
