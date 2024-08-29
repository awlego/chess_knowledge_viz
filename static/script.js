// Function to fetch and display images
function fetchAndDisplayImages(factor, block) {
    // Clear the imagesContainer before adding new images
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';

    // Adjust the range according to your number of boards
    for (let board = 0; board <50; board++) { 
        const imagePath = `board_${board}_layer_${block-1}_factor${factor}.webp`;
        const img = document.createElement('img');
        img.src = `nmf_images/${imagePath}`;
        img.classList.add('half-size'); // Add the class to each image
        imagesContainer.appendChild(img);
    }
}

// Add event listeners to all factor and block inputs to handle selection changes
document.querySelectorAll('input[name="factor"], input[name="block"]').forEach(input => {
    input.addEventListener('change', () => {
        const factor = document.querySelector('input[name="factor"]:checked').value;
        const zeroBasedFactor = factor - 1;
        const block = document.querySelector('input[name="block"]:checked').value;
        document.getElementById('imagesContainer').innerHTML = ''; // Clear the container
        fetchAndDisplayImages(zeroBasedFactor, block);
    });
});

// Listen for keydown events to change selection with arrow keys
document.addEventListener('keydown', (event) => {
    const factorInputs = document.querySelectorAll('input[name="factor"]');
    const blockInputs = document.querySelectorAll('input[name="block"]');
    let factorIndex = [...factorInputs].findIndex(input => input.checked);
    let blockIndex = [...blockInputs].findIndex(input => input.checked);

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        // Prevent default to avoid scrolling the page
        event.preventDefault();

        if (event.shiftKey) {
            // Shift + Arrow keys for block
            if (event.key === "ArrowRight" && blockIndex < blockInputs.length - 1) {
                blockInputs[blockIndex + 1].checked = true;
            } else if (event.key === "ArrowLeft" && blockIndex > 0) {
                blockInputs[blockIndex - 1].checked = true;
            }
        } else {
            // Arrow keys for factor
            if (event.key === "ArrowRight" && factorIndex < factorInputs.length - 1) {
                factorInputs[factorIndex + 1].checked = true;
            } else if (event.key === "ArrowLeft" && factorIndex > 0) {
                factorInputs[factorIndex - 1].checked = true;
            }
        }

        // Trigger change event manually since clicking programmatically doesn't do it
        const newFactor = document.querySelector('input[name="factor"]:checked').value;
        const newBlock = document.querySelector('input[name="block"]:checked').value;
        fetchAndDisplayImages(newFactor - 1, newBlock);
    }
});

// Initial load of default images
document.addEventListener('DOMContentLoaded', () => {
    const defaultFactor = document.querySelector('input[name="factor"]:checked').value;
    const defaultBlock = document.querySelector('input[name="block"]:checked').value;
    fetchAndDisplayImages(defaultFactor, defaultBlock);
});
