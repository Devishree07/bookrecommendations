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

        alert("✅ Thanks for your suggestion: " + suggestion);
        suggestionInput.value = "";
    } else {
        alert("⚠️ Please enter a suggestion!");
    }
});

// Simulate a user (in real projects, this would come from login info)
let currentUser = localStorage.getItem("userId");
if (!currentUser) {
    currentUser = "user-" + Date.now();  // unique ID
    localStorage.setItem("userId", currentUser);
}

// Load books on page load
window.addEventListener('DOMContentLoaded', () => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach(book => displayBook(book, book.ownerId === currentUser));
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

    let imageSrc = "";
    if(imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageSrc = e.target.result;

            const book = { title, author, description, image: imageSrc, ownerId: currentUser };
            saveBook(book);
            displayBook(book, true);
        }
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        const book = { title, author, description, image: "", ownerId: currentUser };
        saveBook(book);
        displayBook(book, true);
    }

    // Clear form
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

// Display book on page
function displayBook(book, canDelete) {
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book1';

    if(book.image) {
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

    if(canDelete) {
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
            if(confirm(`Are you sure you want to delete "${book.title}"?`)) {
                bookContainer.remove();
                deleteBook(book);
            }
        });

        infoDiv.appendChild(deleteBtn);
    }

    bookContainer.appendChild(infoDiv);
    document.querySelector('.reviews').before(bookContainer);
}

// Delete book from localStorage
function deleteBook(bookToDelete) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(b => !(b.title === bookToDelete.title && b.author === bookToDelete.author && b.ownerId === bookToDelete.ownerId));
    localStorage.setItem("books", JSON.stringify(books));
}

