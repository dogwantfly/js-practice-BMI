// 選取 元素
let heightValue = 0;
let weightValue = 0;
let btnResult = document.querySelector('.result-btn');
let bmiValue = 0;
let bmiResult = document.querySelector('.bmi-result');
let listData = JSON.parse(localStorage.getItem('listData')) || [];
let bmiResultList = document.querySelector('.bmi-result-list');
let statusText = '';
let resultBtnGroup = document.querySelector('.result-btn-group');
console.log(btnResult);
showBmiHistoryData(listData);
// 點擊後計算 BMI 值
btnResult.addEventListener('click', calculateBMI);
resultBtnGroup.querySelector('.recalculate').addEventListener('click', calculateBMI)
function calculateBMI () {
  heightValue = Number(document.querySelector('#height').value);
  weightValue = Number(document.querySelector('#weight').value);
  bmiValue = weightValue / Math.pow(heightValue*0.01,2);
  console.log(heightValue , weightValue);
  
  if (heightValue && weightValue) {
    console.log(heightValue , weightValue);
    console.log(typeof bmiValue);
    console.log(bmiValue)
    console.log(bmiStatus(bmiValue));
    addData(heightValue,weightValue,bmiValue);
  }
  document.querySelector('#height').value = '';
  document.querySelector('#weight').value = '';
}
//加入列表，並同步更新網頁與 localstorage
function addData(heightValue,weightValue,bmiValue) {
  console.log(bmiValue)
  let bmiResult = {
    height: heightValue,
    weight: weightValue,
    status: bmiStatus(bmiValue),
    bmi: bmiValue.toFixed(2),
    time: new Date().toLocaleDateString()
  };
  listData.unshift(bmiResult);
  localStorage.setItem('listData', JSON.stringify(listData));
  showBmiResult(bmiResult.status);
  showBmiHistoryData(listData);
}
// 判斷 BMI 狀態
function bmiStatus(bmiValue) {
  if (bmiValue <= 18.5) {
    statusText = '過輕';
  } else if (bmiValue >= 18.5 && bmiValue < 24) {
    statusText = '理想';
  } else if (bmiValue >= 24 && bmiValue < 27) {
    statusText = '過重';
  } else if (bmiValue >= 27 && bmiValue < 30) {
    statusText = '輕度肥胖';
  } else if (bmiValue >= 30 && bmiValue < 35) {
    statusText = '中度肥胖';
  } else {
    statusText = '重度肥胖';
  }
  console.log(statusText);
  return statusText;
}

// 將狀態顯示到畫面上
function showBmiResult(statusText) {
  resultBtnGroup.classList.add('bmi-result-show');
  btnResult.innerHTML = `${bmiValue.toFixed(2)}
  <small>BMI</small>`;
  resultBtnGroup.querySelector('.result-btn-text').textContent = statusText;
  switch(statusText){
    case '過輕':
      changeColor('#31BAF9');
      break;
    case '過重':
      changeColor('#FF982D');
      break;
    case '輕度肥胖':
      changeColor('#FF6C03');
      break;
    case '輕度肥胖':
      changeColor('#FF6C03');
      break;
    case '中度肥胖':
      changeColor('#FF6C03');
      break;
    case '重度肥胖':
      changeColor('#FF1200');
      break;
    default:
      changeColor('#86D73F');
      break;
  }
}
function changeColor(color) {
  btnResult.style['border'] = '6px solid ' + color;
  btnResult.style.color = color;
  resultBtnGroup.querySelector('.result-btn-text').style.color = color;
  resultBtnGroup.querySelector('.recalculate').style['background-color'] = color;
}
function showBmiHistoryData(listData) {
  bmiResultList.innerHTML = '';
  for (let i = 0; i <listData.length; i++) {
    let element = document.createElement('li');
    element.classList.add('bmi-result-item','mb-3');
    switch(listData[i].status){
      case '過輕':
        element.style['border-left'] = '5px solid #31BAF9';
        break;
      case '過重':
        element.style['border-left'] = '5px solid #FF982D';
        break;
      case '輕度肥胖':
        element.style['border-left'] = '5px solid #FF6C03';
        break;
      case '輕度肥胖':
        element.style['border-left'] = '5px solid #FF6C03';
        break;
      case '中度肥胖':
        element.style['border-left'] = '5px solid #FF6C03';
        break;
      case '重度肥胖':
        element.style['border-left'] = '5px solid #FF6C03';
        break;
      default:
        element.style['border-left'] = '5px solid #86D73F';
        break;
    }
    element.innerHTML = `
    <p class="font-size-md">${listData[i].status}</p>
    <ul>
    <li class="font-size-md"><span class="font-size-xs mr-1">BMI</span> ${listData[i].bmi}</li>
    <li class="font-size-md"><span class="font-size-xs mr-1">weight</span> ${listData[i].weight}kg</li>
    <li class="font-size-md"><span class="font-size-xs mr-1">height</span> ${listData[i].height}cm</li>
    </ul>
    <p class="font-size-xs">${listData[i].time}</p>`;
    bmiResultList.appendChild(element);
    };
}
