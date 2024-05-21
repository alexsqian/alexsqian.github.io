document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = "Loading...";
    
    try {
        const response = await fetch('https://api.openai.com/v1/engines/g-R6kyCruib-radiation-oncology-resource/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-proj-snDTG8K6xnkDO0Pluu91T3BlbkFJFz0pfhuVTUJpV6HuTnqE'
            },
            body: JSON.stringify({
                prompt: userInput,
                max_tokens: 150
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            responseDiv.innerHTML = data.choices[0].text.trim();
        } else {
            throw new Error('No choices in response');
        }
    } catch (error) {
        responseDiv.innerHTML = 'Error: ' + error.message;
        console.error('Error:', error); // Log error to console for debugging
    }
});
