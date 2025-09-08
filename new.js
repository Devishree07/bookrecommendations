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
