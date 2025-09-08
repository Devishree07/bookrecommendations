document.getElementById('submitSuggestion').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('submitSuggestion').addEventListener('click', () => {
    const suggestionInput = document.getElementById('ree');
    const suggestion = suggestionInput.value.trim();

    if(suggestion) {
        let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
        suggestions.push(suggestion);
        localStorage.setItem("suggestions", JSON.stringify(suggestions));

        alert("Thanks for your suggestion: " + suggestion);
        suggestionInput.value = "";
    } else {
        alert(" Please enter a suggestion!");
    }
});
document.getElementById('submitBook').addEventListener('click', () => {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const imageInput = document.getElementById('bookImage');
    
    if(!title || !author) {
        alert("⚠️ Please enter both title and author!");
        return;
    }

    // Create a new book card
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book1';

    const img = document.createElement('img');
    if(imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        img.src = 'images/default-book.png'; // fallback image
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
        <h4>Title: ${title}</h4>
        <p>Author: ${author}</p>
        <p>User submitted book.</p>
    `;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = 'red';
    deleteBtn.style.marginTop = '10px';
    deleteBtn.style.padding = '5px 10px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '5px';

    // Delete functionality
    deleteBtn.addEventListener('click', () => {
        bookContainer.remove(); // removes the entire book card
    });

    infoDiv.appendChild(deleteBtn); // add delete button inside info
    bookContainer.appendChild(img);
    bookContainer.appendChild(infoDiv);

    // Add the new book to the page (above the reviews section)
    document.querySelector('.reviews').before(bookContainer);

    // Clear inputs
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    imageInput.value = '';
});
