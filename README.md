Overview :
This is a simple Book Review Web Application that allows users to add books with details such as title, author, description, and an optional image. Users can see all added books and can delete only the books they added. The application is built using HTML, CSS, and JavaScript.

Features

Add a Book: Users can submit a book with title, author, description, and optionally an image.

Conditional Image Display: If an image is not uploaded, the book displays only text, without leaving empty spaces.

Delete Own Books: Users can delete only the books they added.

Responsive Layout: Works on desktops and mobile devices.

Technologies Used

HTML5

CSS3

JavaScript (Vanilla JS)

Usage

Clone or download the repository.

Open index.html in your browser.

Enter the book details:

Title (required)

Author (required)

Description (required)

Image (optional)

Click Submit.

Only the user who added a book can see and use the Delete button.

How It Works

The JavaScript script listens for the Submit button click event.

When a user submits a book:

It checks that all required fields are filled.

If an image is provided, it’s displayed using a FileReader.

The book information is displayed in a card layout.

The delete button is added only for the user who added the book.

Users can delete their own books with confirmation.

Future Improvements:

Add user authentication for multiple users.

Store book data in local storage or a database for persistence.

Enhance UI with animations and improved mobile responsiveness.

