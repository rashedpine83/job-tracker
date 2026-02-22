
let count = document.getElementById('all-count');
const totalCount = document.getElementById('total-count');

let interviewCount = document.getElementById('interview-count');
let interviewTotal = [];
let rejectedCount = document.getElementById('rejected-count');
let rejectedTotal = [];

const btnAll = document.getElementById('btn-all');
const btnInterview = document.getElementById('btn-interview');
const btnRejected = document.getElementById('btn-rejected');

const filterSection = document.getElementById('filter-item');

const mainContainer = document.querySelector('main');

mainContainer.addEventListener('click', function(event){
    const parant =event.target.parentNode.parentNode;
    const qualificationData = parant.querySelector('.qualification').innerText;
    const designationData = parant.querySelector('.designation').innerText;
    const expectationData = parant.querySelector('.expectation').innerText;
    const descriptionData = parant.querySelector('.description').innerText;

    const cardInfo = {
        qualificationData, 
        designationData, 
        expectationData, 
        descriptionData
    }
    const interviewExit = interviewTotal.find(item => item.qualificationData == cardInfo.qualificationData);
    if(!qualificationData){
        interviewTotal.push(cardInfo);
    } 
    
})




function getTotal(){
    totalCount.innerText = count.children.length;
    interviewCount.innerText = interviewTotal.length;
    rejectedCount.innerText = rejectedTotal.length;
}
getTotal();


function togglestyle(id){
    btnAll.classList.remove('bg-blue-500', 'text-white');
    btnInterview.classList.remove('bg-blue-500', 'text-white');
    btnRejected.classList.remove('bg-blue-500', 'text-white');

    btnAll.classList.add('bg-white', 'text-black');
    btnInterview.classList.add('bg-white', 'text-black');
    btnRejected.classList.add('bg-white', 'text-black');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-blue-500', 'text-white');
}

