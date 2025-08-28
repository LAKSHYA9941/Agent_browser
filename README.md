# Browser Agent

A browser automation agent powered by AI that can interact with web pages like a human. This project uses LangChain, Puppeteer, and OpenRouter API to create an agent that can navigate to websites, locate forms, fill them out, and submit them - all while taking screenshots at each step.

## Features

- **AI-Powered Navigation**: Uses LLM to understand and execute browser tasks
- **Human-like Interaction**: Simulates human behavior with appropriate delays
- **Automatic Form Detection**: Can locate and identify form elements
- **Screenshot Capture**: Takes screenshots after each action for verification
- **Modular Design**: Organized with separate tools for different actions

## Prerequisites

- Node.js (v14 or higher)
- OpenRouter API key

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd browseragent

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with your OpenRouter API key:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Usage

```bash
npm run dev
```

This will start the browser agent, which will:
1. Open ui.chaicode.com
2. Locate the authentication form
3. Fill in the email (demo@chaicode.com) and password (demo123)
4. Click the submit button

Screenshots will be saved at each step of the process.

## Project Structure

```
├── src/
│   ├── agent.js         # Main agent implementation
│   ├── browser.js       # Browser management
│   ├── index.js         # Entry point
│   ├── snap.js          # Screenshot functionality
│   └── tools/           # Agent tools
│       ├── openpage.js  # Tool to open a webpage
│       ├── findform.js  # Tool to locate forms
│       ├── fillform.js  # Tool to fill form fields
│       └── clickbutton.js # Tool to click buttons
├── .env                 # Environment variables
└── package.json         # Project dependencies
```

## Customization

You can modify the prompt in `agent.js` to change the agent's behavior or target different websites.

## License

ISC

---

# How the Browser Agent Works - Technical Explanation

## Overview

The Browser Agent is an AI-powered automation tool that uses natural language processing to interpret instructions and perform browser actions. It combines several technologies:

1. **LangChain**: Framework for creating AI agents with tools
2. **Puppeteer**: Headless browser automation library
3. **OpenRouter API**: Access to LLMs for instruction interpretation
4. **Screenshot-Desktop**: For capturing visual evidence of actions

## Core Components

### 1. Browser Management (`browser.js`)

This module handles browser initialization and provides access to the browser page:

- **launch()**: Starts a Puppeteer browser instance with human-like settings (visible, slowed down)
- **close()**: Terminates the browser session
- **getPage()**: Provides access to the current page for tools

### 2. Screenshot Functionality (`snap.js`)

Captures screenshots after each action:

- Uses a counter to create sequentially numbered files
- Includes descriptive names based on the action performed
- Provides visual verification of each step

### 3. Agent Tools

Modular tools that perform specific browser actions:

- **openpage.js**: Navigates to a URL and waits for page load
- **findform.js**: Locates forms on the page and extracts input field information
- **fillform.js**: Types text into specified form fields with human-like delays
- **clickbutton.js**: Clicks on elements matching a CSS selector

Each tool follows the same pattern:
1. Import browser page access
2. Import screenshot functionality
3. Perform the specific browser action
4. Take a screenshot
5. Return a descriptive result

### 4. Agent Implementation (`agent.js`)

Orchestrates the entire process:

1. Initializes the browser
2. Sets up the LLM (using OpenRouter API)
3. Registers the tools with descriptions
4. Creates an agent executor with LangChain
5. Provides a natural language prompt
6. Executes the agent and closes the browser when done

## Execution Flow

1. The agent receives a natural language instruction
2. It analyzes the instruction and plans a sequence of actions
3. For each action, it selects the appropriate tool
4. The tool performs the browser action and takes a screenshot
5. The agent receives the result and decides the next step
6. This continues until the task is complete

## Technical Details

### ES Modules

The project uses ES modules (`type: "module"` in package.json) for modern JavaScript imports/exports.

### LLM Integration

The agent uses the OpenRouter API to access LLMs (specifically google/gemini-2.5-flash-image-preview:free) for instruction interpretation.

### Browser Configuration

Puppeteer is configured with:
- `headless: false`: Shows the browser for visibility
- `slowMo: 50`: Adds human-like delays between actions
- `args: ['--start-maximized']`: Maximizes the browser window

### Screenshot Naming

Screenshots follow a naming pattern: `step-XX-action.png` where:
- XX is a sequential number (01, 02, etc.)
- action is the name of the tool that was executed

## Customization Options

1. **Change Target Website**: Modify the prompt in `agent.js`
2. **Adjust Browser Settings**: Edit the launch options in `browser.js`
3. **Add New Tools**: Create new tool files following the existing pattern
4. **Change LLM Model**: Update the model configuration in `agent.js`

This architecture makes the agent flexible and extensible for various web automation tasks.
