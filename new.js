// Scroll to top
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
        alert("Please enter a suggestion!");
    }
});

// Save book to localStorage
function saveBook(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

// Load books on page load
function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach(book => {
        displayBook(book.title, book.author, book.description, book.image);
    });
}

// Display a book in the DOM
function displayBook(title, author, description, image) {
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book1';

    if(image) {
        const img = document.createElement('img');
        img.src = image;
        bookContainer.appendChild(img);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
        <h4>Title: ${title}</h4>
        <p>Author: ${author}</p>
        <p>${description}</p>
        <small style="color: gray;">Entered by the user</small>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = 'red';
    deleteBtn.style.color = 'white';
    deleteBtn.style.marginTop = '10px';
    deleteBtn.style.padding = '5px 10px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '5px';

    deleteBtn.addEventListener('click', () => {
        if(confirm(`Are you sure you want to delete "${title}"?`)) {
            bookContainer.remove();
            deleteBook(title);
        }
    });

    infoDiv.appendChild(deleteBtn);
    bookContainer.appendChild(infoDiv);

    document.querySelector('.reviews').before(bookContainer);
}

// Delete from localStorage
function deleteBook(title) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(book => book.title !== title);
    localStorage.setItem("books", JSON.stringify(books));
}

// Handle book submit
document.getElementById('submitBook').addEventListener('click', () => {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const description = document.getElementById('Description').value.trim();
    const imageInput = document.getElementById('bookImage');

    if(!title || !author || !description) {
        alert("Please enter title, author, and description!");
        return;
    }

    let image = "";
    if(imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            image = e.target.result;
            displayBook(title, author, description, image);
            saveBook({ title, author, description, image });
        }
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        displayBook(title, author, description, image);
        saveBook({ title, author, description, image });
    }

    // Clear input fields
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('Description').value = '';
    imageInput.value = '';
});

// Load saved books when page loads
window.onload = loadBooks;
