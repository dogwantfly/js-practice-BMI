// 選取 元素
let heightValue = 0;
let weightValue = 0;
let btnResult = document.querySelector('.result-btn');
let bmiValue = 0;
let bmiResult = document.querySelector('.bmi-result');
let listData = JSON.parse(localStorage.getItem('listData')) || [];
let bmiResultList = document.querySelector('.bmi-result-list');
let resultBtnGroup = document.querySelector('.result-btn-group');
let deleteAllBtn = document.querySelector('.delete-all');
console.log(btnResult);
showBmiHistoryData(listData);
// 點擊後計算 BMI 值
btnResult.addEventListener('click', calculateBMI);
// 點擊後回到未輸入資料的畫面
resultBtnGroup.querySelector('.recalculate').addEventListener('click', BmiResultBtn)
// 點擊後刪除全部資料
deleteAllBtn.addEventListener('click',function(){
  localStorage.removeItem('listData');
  listData = [];
  showBmiHistoryData(listData);
  deleteAllBtn.classList.remove('btn-show');
})
// 點擊後刪除特定資料
bmiResultList.addEventListener('click',function(e){
  if (e.target.classList.contains('remove-btn')){
    let resultIndex = Number(e.target.closest('li').dataset.index);
    console.log(resultIndex);
    listData.splice(resultIndex,1);
    localStorage.setItem('listData', JSON.stringify(listData));
    showBmiHistoryData(listData);
  }
})
function calculateBMI (e) {
  if (resultBtnGroup.classList.contains('bmi-result-show')) return;
  heightValue = Number(document.querySelector('#height').value);
  weightValue = Number(document.querySelector('#weight').value);
  bmiValue = weightValue / Math.pow(heightValue*0.01,2);
  console.log(heightValue , weightValue);
  let requiredInputs =  document.querySelectorAll('.required');
  // console.log(requiredInputs);
  for (requiredInput of requiredInputs) {
    // console.log(requiredInput);
    if (requiredInput.querySelector('input').value === ''){
      requiredInput.querySelector('.notice').classList.add('show');
    } else {
      requiredInput.querySelector('.notice').classList.remove('show');
    }
  }
  if (heightValue && weightValue) {
    console.log(heightValue , weightValue);
    console.log(typeof bmiValue);
    console.log(bmiValue)
    console.log(bmiStatus(bmiValue));
    addData(heightValue,weightValue,bmiValue);
  }
}
//加入列表，並同步更新網頁與 localstorage
function addData(heightValue,weightValue,bmiValue) {
  console.log(bmiValue)
  let bmiResult = {
    height: heightValue,
    weight: weightValue,
    status: bmiStatus(bmiValue).statusText,
    bmi: bmiValue.toFixed(2),
    time: new Date().toLocaleDateString()
  };
  listData.unshift(bmiResult);
  localStorage.setItem('listData', JSON.stringify(listData));
  showBmiResult(bmiStatus(bmiValue));
  showBmiHistoryData(listData);
}
// 判斷 BMI 狀態
function bmiStatus(bmiValue) {
  let status = {
    statusText: '',
    color: ''
  };
  if (bmiValue <= 18.5) {
    status.statusText = '過輕';
    status.color = '#31BAF9';
  } else if (bmiValue >= 18.5 && bmiValue < 24) {
    status.statusText = '理想';
    status.color = '#86D73F';
  } else if (bmiValue >= 24 && bmiValue < 27) {
    status.statusText = '過重';
    status.color = '#FF982D';
  } else if (bmiValue >= 27 && bmiValue < 30) {
    status.statusText = '輕度肥胖';
    status.color = '#FF6C03';
  } else if (bmiValue >= 30 && bmiValue < 35) {
    status.statusText = '中度肥胖';
    status.color = '#FF6C03';
  } else {
    status.statusText = '重度肥胖';
    status.color = '#FF1200';
  }
  console.log(status.statusText);
  return status;
}

// 將狀態顯示到畫面上
function showBmiResult(status) {
  resultBtnGroup.classList.add('bmi-result-show');
  btnResult.innerHTML = `${bmiValue.toFixed(2)}
  <small>BMI</small>`;
  resultBtnGroup.querySelector('.result-btn-text').textContent = status.statusText;
  changeColor(status.color);
}
function changeColor(color) {
  btnResult.style['border'] = '6px solid ' + color;
  btnResult.style.color = color;
  resultBtnGroup.querySelector('.result-btn-text').style.color = color;
  resultBtnGroup.querySelector('.recalculate').style['background-color'] = color;
}
function showBmiHistoryData(listData) {
  bmiResultList.innerHTML = '';
  if (listData.length === 0) return;
  if (listData.length > 1) {
    deleteAllBtn.classList.add('btn-show');
  } else {
    deleteAllBtn.classList.remove('btn-show');
  }
  for (let i = 0; i < listData.length; i++) {
    let element = document.createElement('li');
    element.classList.add('bmi-result-item','mb-3');
    element.setAttribute('data-index', i);
    element.style['border-left'] = '5px solid' + bmiStatus(listData[i].bmi).color;
    element.innerHTML = `
    <p class="font-size-md">${listData[i].status}</p>
    <ul>
    <li class="font-size-md"><span class="font-size-xs mr-1">BMI</span> ${listData[i].bmi}</li>
    <li class="font-size-md"><span class="font-size-xs mr-1">weight</span> ${listData[i].weight}kg</li>
    <li class="font-size-md"><span class="font-size-xs mr-1">height</span> ${listData[i].height}cm</li>
    </ul>
    <p class="font-size-xs">${listData[i].time}</p>
    <button class="remove-btn material-icons">
      close
    </button>`;
    bmiResultList.appendChild(element);
    };
}
// 回到看結果按鈕
function BmiResultBtn(e) {
  e.preventDefault();
  if (e.target.nodeName === 'button') return;
  if (e.target.nodeName.toLowerCase() === 'img' || e.target.nodeName.toLowerCase() === 'a') {
    resultBtnGroup.classList.remove('bmi-result-show');
    btnResult.innerHTML = `看結果`;
    resultBtnGroup.querySelector('.result-btn-text').textContent = '';
    btnResult.style['border'] = 'none';
    btnResult.style.color = '#424242';
    document.querySelector('#height').value = '';
    document.querySelector('#weight').value = '';
  }
}
