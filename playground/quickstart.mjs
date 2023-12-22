import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";

// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs
console.log("Welcome to the LangChain Quickstart Module!");

const temaplate =
    "You are a director of social media company with 30 years of experience. Please give me some ideas for content I should write about regarding {topic}. The content is for {socialplatform}. Translate to {language}";

const prompt = new PromptTemplate({
    template: temaplate,
    inputVariables: ["topic", "socialplatform", "language"],
});

/*
const formattedPromptTemplate = await prompt.format({
    topic: "artificial intelligence",
    socialplatform: "twitter",
    language: "english",
});

console.log({ formattedPromptTemplate });


//Step 1 - Create the model
const model = new OpenAI({
    temperature: 0.9 //temperature value of 0 is not creative and 1 is very creative.
});

//Step 2 - Create the chain
const chain = new LLMChain({ prompt: prompt, llm: model });

//Step 3 - call the chain
const respChain = await chain.call({
    topic: "artificial intelligence",
    socialplatform: "twitter",
    language: "english",
})

console.log({ respChain });

*/

/*
//Chains vs Agents
const agentModel = new OpenAI({
    temperature: 0,
    model: "gpt-3.5-turbo",
})

//SerpAPI is a bing powered search. This is used because GPT model has a cut off date and LangChain doc was built after that so was not part of model training.
const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY,
        {
            location: "Dallas,Texas,United States",
            hl: "en",
            gl: "us",
        }),
    new Calculator(),
];


const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
    agentType: "zero-shot-react-description",
    verbose: true,
    maxIterations: 5,
});

const input = "What is langchain?";

const result = await executor.call({ input });

console.log({ result });

*/

/*

//Plan and Action Agent
const chatModel = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    verbose: true,
});

const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
    llm: chatModel,
    tools: tools,
});

const results = await executor.call({
    input: "Who is the Prime Minister of India? What is his / her current age raised to the second power?"
});

console.log({ results });

*/

/*
//Memory Agent
const memoryModel = new OpenAI({});
const memory = new BufferMemory();
const conversationChain = new ConversationChain({ llm: memoryModel, memory: memory });

const input1 = "My name is Abhy";
const resp1 = await conversationChain.call({ input: input1 });
console.log({ resp1 });

const input2 = "My age is 46";
const resp2 = await conversationChain.call({ input: input2 });
console.log({ resp2 });

const input3 = "I am a Post Graduate in Computer Science";
const resp3 = await conversationChain.call({ input: input3 });
console.log({ resp3 });

const input4 = "Do you remember what is my age and name?";
const resp4 = await conversationChain.call({ input: input4 });
console.log({ resp4 });

*/


//Streaming

// To enable streaming, we pass in `streaming: true` to the LLM constructor.
// Additionally, we pass in a handler for the `handleLLMNewToken` event.
const chat = new OpenAI({
    streaming: true,
    callbacks: [
        {
            handleLLMNewToken(token) {
                process.stdout.write(token);
            },
        },
    ],
});

await chat.call("Write me a short story about lotus and a dolphin.");