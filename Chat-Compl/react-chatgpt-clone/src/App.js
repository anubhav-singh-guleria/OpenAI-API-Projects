import { useState, useEffect } from "react";


const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null) 
  }

  const handleClik = (title) => {
    setCurrentTitle(title);
    setMessage(null);
    setValue("");
  }
  const getMessages = async () => {
    const options = {
      method : "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "content-type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    if(!currentTitle && value && message){
      setCurrentTitle(value);
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...previousChats, 
          {
            title: currentTitle,
            role: "user",
            content: value,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content,
          }
        ]
      ))
    }
  },[message, currentTitle])

  const currentChat = previousChats.filter(previousChat => previousChat.title == currentTitle);
  console.log(currentChat);
  const uniqueTitle = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitle?.map((title,index)=> <li key={index} onClick={()=>handleClik(title)}>{title}</li>)}
        </ul>
        <nav>
          <p>Made by Asura69</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>AsuraGPT</h1>}
        <ul className="feed">
          {currentChat?.map((chat,index) => <li key={index}><p className="role">{chat.role}</p><p>{chat.content}</p></li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={event=> {
              setValue(event.target.value);
            }}/>
            <div id="submit" onClick={getMessages}> submit </div>
          </div>
          <p className="info">
            AsuraGPT Mar 23 Version. Free Research Preview.
            AsuraGPT may produce inaccurate information about people, places, or facts.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
