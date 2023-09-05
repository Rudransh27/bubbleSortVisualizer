let array = [];

function generateFromArray() {
    const inputField = document.getElementById('arrayInput');
    const inputArray = inputField.value.split(',').map(item => parseInt(item.trim()));
    if (validateArray(inputArray)) {
        array = inputArray;
        displayArray();
    } else {
        alert('Please enter a valid comma-separated array of numbers.');
    }
}

function validateArray(inputArray) {
    if (!Array.isArray(inputArray)) return false;
    for (let i = 0; i < inputArray.length; i++) {
        if (isNaN(inputArray[i])) return false;
    }
    return true;
}

function generateRandomArray() {
    array = [];
    for (let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 40) + 1);
    }
    displayArray();
}

function displayArray() {
    const bubblesContainer = document.getElementById('bubbles');
    bubblesContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = array[i] * 6 + 'px';
        bubble.style.height = array[i] * 6 + 'px';
        bubble.textContent = array[i];
        bubblesContainer.appendChild(bubble);
    }
}

async function moveFishToBubble(bubbleIndex) {
    const fish = document.querySelector('.fish');
    const bubbleElements = document.querySelectorAll('.bubble');

    for (let i = 0; i < bubbleIndex; i++) {
        const bubble = bubbleElements[i];
        const bubbleLeft = bubble.getBoundingClientRect().left;
        fish.style.left = `${bubbleLeft}px`;
        await sleep(150); // Adjust this delay as needed
    }
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await moveFishToBubble(j + 1);
                await swap(j, j + 1);
            }
        }
    }
}

async function swap(a, b) {
    await sleep(500); // Adjust this delay as needed
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    displayArray();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startSorting() {
    bubbleSort();
}

function resetArray() {
    generateRandomArray();
}

generateRandomArray();
