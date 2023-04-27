const API_KEY = "YOUR-API-KEY";

async function fetchData(){
    const resonse = await fetch("https://api.openai.com/v1/chat/completions",{
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Say this is a test!"}]
        })
    })
    const data = await resonse.json();
    console.log(data);
}

fetchData();



