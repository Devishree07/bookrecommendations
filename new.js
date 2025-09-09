// ✅ Feedback system (unchanged)
document.getElementById('reviews').addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('reviews').addEventListener('click', () => {
    const suggestionInput = document.getElementById('ree');
    const suggestion = suggestionInput.value.trim();

    if (suggestion) {
        let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
        suggestions.push(suggestion);
        localStorage.setItem("suggestions", JSON.stringify(suggestions));

        alert("Thanks for your suggestion: " + suggestion);
        suggestionInput.value = "";
    } else {
        alert("⚠️ Please enter a suggestion!");
    }
});


// ==========================
// 📚 Book Review System
// ==========================
const currentUser = "Devishree"; // later replace with dynamic login user

// Load saved books when page opens
window.addEventListener("DOMContentLoaded", () => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    savedBooks.forEach(book => renderBook(book));
});

// Handle Add Book
document.getElementById('reviews').addEventListener('click', () => {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const description = document.getElementById('Description').value.trim();
    const imageInput = document.getElementById('bookImage');

    if (!title || !author || !description) {
        alert("⚠️ Please enter title, author, and description!");
        return;
    }

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newBook = { 
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
        const newBook = { 
            title, 
            author, 
            description, 
            image: null, 
            user: currentUser 
        };
        saveBook(newBook);
        renderBook(newBook);
    }

    // Clear inputs
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('Description').value = '';
    imageInput.value = '';
});

// Save book to localStorage
function saveBook(book) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

// Delete book from localStorage
function deleteBook(title, user) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(book => !(book.title === title && book.user === user));
    localStorage.setItem("books", JSON.stringify(books));
}

// Render book card
function renderBook(book) {
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book1';
    bookContainer.dataset.user = book.user;

    // Image (only if uploaded)
    if (book.image) {
        const img = document.createElement('img');
        img.src = book.image;
        bookContainer.appendChild(img);
    }

    // Info section
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
        <h4>Title: ${book.title}</h4>
        <p>Author: ${book.author}</p>
        <p>${book.description}</p>
    `;

    // Show delete button only for current user
    if (book.user === currentUser) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.cssText = `
            background-color: red;
            margin-top: 10px;
            padding: 5px 10px;
            cursor: pointer;
            color: white;
            border: none;
            border-radius: 5px;
        `;

        deleteBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
                bookContainer.remove();
                deleteBook(book.title, book.user);
            }
        });

        infoDiv.appendChild(deleteBtn);
    }

    bookContainer.appendChild(infoDiv);
    document.querySelector('.reviews').before(bookContainer);
}