//  DOM
const jobCount = document.getElementById('job-count');
const totalCount = document.getElementById('total-count')
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');

const btnAll = document.getElementById('btn-all');
const btnInterview = document.getElementById('btn-interview');
const btnRejected = document.getElementById('btn-rejected');

const allCardSection = document.getElementById('all-card');
const filterSection = document.getElementById('filter-item');
const noJobSection = document.getElementById('no-job');

const mainContainer = document.querySelector('main');

let interviewTotal = [];
let rejectedTotal = [];
let currentStatus = 'btn-all';

// Event
mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        handleStatusChange(event, 'Interview');
    }

    if (event.target.classList.contains('rejected-btn')) {
        handleStatusChange(event, 'Rejected');
    }
     if (event.target.classList.contains('fa-trash-can') || event.target.closest('.fa-trash-can')) {
        const card = event.target.closest('.card');

        interviewTotal = interviewTotal.filter(item => item !== card);
        rejectedTotal = rejectedTotal.filter(item => item !== card);

        card.remove();
         updateCounts();
    }   
});

//Status Change

function handleStatusChange(event, status) {
    const parent = event.target.closest('.card');
    const cardInfo = getCardData(parent);
    cardInfo.statusData = status;

    parent.querySelector('.btn-status').innerText = status;

    if (status === 'Interview') {
        if (!interviewTotal.find(i => i.qualificationData === cardInfo.qualificationData)) {
            interviewTotal.push(cardInfo);
        }
        rejectedTotal = rejectedTotal.filter(
            i => i.qualificationData !== cardInfo.qualificationData
        );
    }

    if (status === 'Rejected') {
        if (!rejectedTotal.find(i => i.qualificationData === cardInfo.qualificationData)) {
            rejectedTotal.push(cardInfo);
        }
        interviewTotal = interviewTotal.filter(
            i => i.qualificationData !== cardInfo.qualificationData
        );
    }

    updateCounts();

    if (currentStatus === 'btn-interview') renderInterview();
    if (currentStatus === 'btn-rejected') renderRejected();
}



//get card data

function getCardData(card) {
    return {
        qualificationData: card.querySelector('.qualification').innerText,
        designationData: card.querySelector('.designation').innerText,
        expectationData: card.querySelector('.expectation').innerText,
        descriptionData: card.querySelector('.description').innerText,
        statusData: card.querySelector('.btn-status').innerText,
    };
}

// Update Count

function updateCounts() {
    jobCount.innerText = allCardSection.children.length;
    totalCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewTotal.length;
    rejectedCount.innerText = rejectedTotal.length;

    let count = 0;

    if (currentStatus === 'btn-all') {
        count = allCardSection.children.length;
    }

    if (currentStatus === 'btn-interview') {
        count = interviewTotal.length;
    }

    if (currentStatus === 'btn-rejected') {
        count = rejectedTotal.length;
    }

    jobCount.innerText = count;
    toggleNoJob(count);
}

// job toggle

function toggleNoJob(count) {
    if (count === 0) {
        noJobSection.classList.remove('hidden');
    } else {
        noJobSection.classList.add('hidden');
    }
}

// Button toggle

function togglestyle(id) {
    currentStatus = id;

    [btnAll, btnInterview, btnRejected].forEach(btn => {
        btn.classList.remove(
            'bg-blue-500',
            'text-white',
            'bg-white',
            'text-black'
        );
    });

    const activeBtn = document.getElementById(id);
    activeBtn.classList.add('bg-blue-500', 'text-white');

    if (id === 'btn-all') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        updateCounts();
    }

    if (id === 'btn-interview') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }

    if (id === 'btn-rejected') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
}

// Render interview

function renderInterview() {
    filterSection.innerHTML = '';
    interviewTotal.forEach(item => {
        filterSection.appendChild(createCard(item));
    });
    updateCounts();
}

// Render Rejected

function renderRejected() {
    filterSection.innerHTML = '';
    rejectedTotal.forEach(item => {
        filterSection.appendChild(createCard(item));
    });
    updateCounts();
}




// Card toggle

function createCard(person) {
    const div = document.createElement('div');
    div.className = 'card bg-white my-4 p-6 flex justify-between';

    div.innerHTML = `
        <div>
            <h2 class="qualification text-[20px] font-bold text-[#002C5C]">${person.qualificationData}</h2>

            <h3 class="designation text-gray-500 text-[18px]">${person.designationData}</h3>

            <p class="expectation text-gray-500 my-5">${person.expectationData}</p>

            <button class="btn-status px-8 py-2 rounded-md font-bold mb-2">${person.statusData}</button>

            <p class="description text-gray-700 mb-8">${person.descriptionData}</p>

            <div class="flex gap-5">
                <button class="interview-btn bg-white px-8 py-2 rounded-sm text-green-500 border-2 border-green-500 font-bold">
                    INTERVIEW
                </button>

                <button class="rejected-btn bg-white px-8 py-2 rounded-sm text-red-500 border-2 border-red-500 font-bold">
                    REJECTED
                </button>
            </div>
        </div>
    `;
    return div;
}

updateCounts();