
// let count = document.getElementById('all-count');
const totalCount = document.getElementById('total-count');

let interviewCount = document.getElementById('interview-count');
let interviewTotal = [];
let rejectedCount = document.getElementById('rejected-count');
let rejectedTotal = [];

const btnAll = document.getElementById('btn-all');
const btnInterview = document.getElementById('btn-interview');
const btnRejected = document.getElementById('btn-rejected');

const filterSection = document.getElementById('filter-item');
const allCardSection = document.getElementById('all-card')

const mainContainer = document.querySelector('main');

mainContainer.addEventListener('click', function(event){
    
    
    if(event.target.classList.contains('interview-btn')){
        const parant =event.target.parentNode.parentNode;
        
        const qualificationData = parant.querySelector('.qualification').innerText;
        const designationData = parant.querySelector('.designation').innerText;
        const expectationData = parant.querySelector('.expectation').innerText;
        const statusData = parant.querySelector('.btn-status').innerText;
        const descriptionData = parant.querySelector('.description').innerText;
      
       

         parant.querySelector('.btn-status').innerHTML = `
            <button class="bg-white px-8 py-2 rounded-sm text-green-500 border-2 border-green-500 font-bold cursor-pointer">INTERVIEW</button>
        `;

        const cardInfo = {
            qualificationData, 
            designationData, 
            expectationData,
            statusData, 
            descriptionData
        }
       

        const interviewExit = interviewTotal.find(item => item.qualificationData == cardInfo.qualificationData);
       
        if(!interviewExit){
            interviewTotal.push(cardInfo);
        }
        getFilterItem();
    } 
})




function getTotal(){
    totalCount.innerText = allCardSection.children.length;
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

    if(id == 'btn-interview'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
    }else if(id == 'btn-all' ){
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }

}

function getFilterItem(){

    filterSection.innerHTML = '';

    for (let person of interviewTotal){
        console.log(person);
       
        let div = document.createElement('div');
        div.className = 'card bg-white my-4 p-6 flex justify-between'
        div.innerHTML = `
             <div>
                <div>
                    <h2 class="qualification text-[20px] font-bold text-[#002C5C]">Mobile First Corp</h2>

                    <h3 class="designation text-gray-500 text-[18px]">React Native Developer</h3>

                    <p class="expectation text-gray-500 my-5">Remote • Full-time • $130,000 - $175,000</p>

                    <button class="btn-status px-8 py-2 rounded-md font-bold mb-2">NOT APPLIED</button>

                    <p class="description text-gray-700 mb-8">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                </div>

                <div class="flex gap-5">
                    <button class="interview-btn bg-white px-8 py-2 rounded-sm text-green-500 border-2 border-green-500 font-bold cursor-pointer">INTERVIEW</button>

                    <button class="rejected-btn bg-white px-8 py-2 rounded-sm text-red-500 border-2 border-red-500 font-bold cursor-pointer">REJECTED</button>
                </div>
            </div>
            <div>
                <i class="fa-regular fa-trash-can"></i>
            </div>
        `
        filterSection.appendChild(div);
    }
}

