// Scroll to top
document.getElementById('homeBtn').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Suggestions input
document.getElementById('submitSuggestion').addEventListener('click', () => {
    const suggestionInput = document.getElementById('ree');
    const suggestion = suggestionInput.value.trim();

    if(suggestion) {
        let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
        suggestions.push(suggestion);
        localStorage.setItem("suggestions", JSON.stringify(suggestions));

        alert("✅ Thanks for your suggestion: " + suggestion);
        suggestionInput.value = "";
    } else {
        alert("⚠️ Please enter a suggestion!");
    }
});

document.getElementById('submitBook').addEventListener('click', () => {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const description = document.getElementById('Description').value.trim();
    const imageInput = document.getElementById('bookImage');

    if(!title || !author || !description) {
        alert("⚠️ Please enter title, author, and description!");
        return;
    }

    const bookContainer = document.createElement('div');
    bookContainer.className = 'book1';

    // Only create <img> if a file was uploaded
    if(imageInput.files && imageInput.files[0]) {
        const img = document.createElement('img');
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageInput.files[0]);
        bookContainer.appendChild(img);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
        <h4>Title: ${title}</h4>
        <p>Author: ${author}</p>
        <p>${description}</p>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = 'red';
    deleteBtn.style.marginTop = '10px';
    deleteBtn.style.padding = '5px 10px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '5px';

    deleteBtn.addEventListener('click', () => {
        if(confirm(`Are you sure you want to delete "${title}"?`)) {
            bookContainer.remove();
        }
    });

    infoDiv.appendChild(deleteBtn);
    bookContainer.appendChild(infoDiv);

    document.querySelector('.reviews').before(bookContainer);

    // Clear inputs
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('Description').value = '';
    imageInput.value = '';
});
