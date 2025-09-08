document.getElementById('homeBtn').addEventListener('click', function(event) {
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
        alert(" Please enter a suggestion");
    }
});

document.getElementById('submitBook').addEventListener('click', () => {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const description = document.getElementById('description').value.trim();
    const imageInput = document.getElementById('bookImage');
    
    if(!title || !author) {
        alert(" Please enter both title and author!");
        return;
    }

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
        img.src = 'images/default-book.png'; 


    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
        <h4>Title: ${title}</h4>
        <p>Author: ${author}</p>
        <p>User submitted book.</p>
    `;

    bookContainer.appendChild(img);
    bookContainer.appendChild(infoDiv);

    document.querySelector('.reviews').before(bookContainer);

    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    imageInput.value = '';
});
