// start here
"use client"

import React, {useState} from 'react'
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ResultWithSources from '../components/ResultWithSources';
import "../globals.css";

const Memory = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    {
      "text": "Hi there! What's your name and favourite food?", 
      "type": "bot"
    }
  ])
  const [firstMsg, setFirstMsg] = useState(true);

  const handlePrompChange = (e) => {
    setPrompt(e.target.value);  
  }
  const handleSubmitPrompt = async() => {
    console.log("sending...", prompt);
    try {

      setMessages((prevMessages) => [
        ...prevMessages, 
        {text: prompt, type: "user", sourceDocuments: null}
      ]);

      const response = await fetch("/api/memory", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({input: prompt, firstMsg})
      })

      if (!response.ok) {
        throw new Error(`HTTP Error: Status = ${response.status}`)
      }

      const searchRes = await response.json();

      console.log({searchRes});

      setMessages((prevMessages) => [
        ...prevMessages, 
        {text: searchRes.body.response, type: "bot", sourceDocuments: null}
      ])

      setFirstMsg(false);

      setPrompt("");

      setError("");

    }catch(error) {
      console.log(error);
      setError(error);
    }
  }

  return (
    <>
      <Title 
        headingText={"Memory"}
        emoji="🧠"
       />
       <TwoColumnLayout 
        leftChildren={<>
          <PageHeader 
            heading="I remember everything"
            boldText="Lets see if I can remember my name"
            description="This tool makes use of buffer memory and conversation chains"

          />
        </>}
        rightChildren={<>
          <ResultWithSources 
            messages={messages}
            pngFile="brain"
          />
          <PromptBox 
            prompt={prompt}
            handleSubmit={handleSubmitPrompt}
            handlePromptChange={handlePrompChange}
            error={error}
          />          
        </>}
       />
    </>
  )
}

export default Memory;