// Function to fetch and display images
function fetchAndDisplayImages(factor, block) {
    // Clear the imagesContainer before adding new images
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';

    // Adjust the range according to your number of boards
    for (let board = 0; board <50; board++) { 
        const imagePath = `board_${board}_layer_${block-1}_factor${factor}.svg`;
        const img = document.createElement('img');
        img.src = `/nmf_images/${imagePath}`;
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

// Initial load of default images
document.addEventListener('DOMContentLoaded', () => {
    const defaultFactor = document.querySelector('input[name="factor"]:checked').value;
    const defaultBlock = document.querySelector('input[name="block"]:checked').value;
    fetchAndDisplayImages(defaultFactor, defaultBlock);
});
