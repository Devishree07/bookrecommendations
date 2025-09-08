📚 Book Review App

A simple and interactive Book Review Web Application that allows users to add books with details like title, author, description, and an optional image. Users can view all added books and delete only the books they added.

Built using HTML, CSS, and Vanilla JavaScript.

🔹 Features

Add a Book: Submit books with title, author, description, and optional image.

Conditional Image Display: If no image is uploaded, the layout shows only text — no blank spaces.

Delete Own Books: Only the user who added a book can delete it.

Responsive Layout: Works seamlessly on desktops and mobile devices.

🛠️ Technologies Used

HTML5 – structure of the application

CSS3 – styling and layout

JavaScript (Vanilla JS) – interactivity and DOM manipulation

🚀 Usage

Clone or download the repository.

Open index.html in your browser.

Fill in the book details:

Title (required)

Author (required)

Description (required)

Image (optional)

Click Submit.

Only the user who added a book will see the Delete button.

⚙️ How It Works

The script listens for the Submit button click event.

When a book is submitted:

Required fields are validated.

If an image is uploaded, it is displayed using a FileReader.

Book details are shown in a card layout.

Delete button is displayed only for the user who added the book.

Users can delete their own books with confirmation.

🔮 Future Improvements

Add user authentication for multiple users.

Store book data in local storage or a database for persistence.

Enhance the UI with animations and improved mobile responsiveness.

Add search and filter functionality for books.
