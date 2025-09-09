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
    const description = document.getElementById('Description').value.trim();
    const imageInput = document.getElementById('bookImage');

    if(!title || !author || !description) {
        antainer.className = 'book1';

    if(imageInput.files && imageInput.files[0]) {
        colert("⚠️ Please enter title, author, and description!");
        return;
    }

    const bookContainer = document.createElement('div');
    bookConst img = document.createElement('img');
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

    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('Description').value = '';
    imageInput.value = '';
});
const currentUser = "Devishree"; // Replace dynamically when login is added

// Load saved books on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    savedBooks.forEach(book => renderBook(book));
});

document.getElementById('submitBook').addEventListener('click', () => {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const description = document.getElementById('Description').value.trim();
    const imageInput = document.getElementById('bookImage');

    if (!title || !author || !description) {
        alert("⚠️ Please enter title, author, and description!");
        return;
    }

    // Unique ID for each book
    const id = Date.now();

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newBook = {
                id,
                title,
                author,
                description,
                image: e.target.result,
                user: currentUser
            };
            saveBook(newBook);
            renderBook(newBook);
        }
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        const newBook = { id, title, author, description, image: null, user: currentUser };
        saveBook(newBook);
        renderBook(newBook);
    }

    // Clear inputs
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('Description').value = '';
    imageInput.value = '';
});

// Save to localStorage
function saveBook(book) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

// Delete from localStorage
function deleteBook(id) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(book => book.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
}

// Render book card
function renderBook(book) {
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book1';
    bookContainer.dataset.user = book.user;
    bookContainer.dataset.id = book.id;

    // Image (only if exists)
    if (book.image) {
        const img = document.createElement('img');
        img.src = book.image;
        bookContainer.appendChild(img);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
        <h4>Title: ${book.title}</h4>
        <p>Author: ${book.author}</p>
        <p>${book.description}</p>
    `;

    // Show delete button only for the user who added it
    if (book.user === currentUser) {
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
            if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
                bookContainer.remove();
                deleteBook(book.id);
            }
        });

        infoDiv.appendChild(deleteBtn);
    }

    bookContainer.appendChild(infoDiv);
    document.querySelector('.reviews').before(bookContainer);
}
