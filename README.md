# AI Chat Box

This project is a simple yet functional AI chat application built with React and Material UI, leveraging the OpenAI API to provide conversational responses.

## Features

*   **Interactive Chat Interface:** A clean and intuitive chat interface using Material UI components.
*   **User and AI Message Distinction:**  Clearly differentiates between user messages and AI responses with distinct styling.
*   **Real-time AI Responses:** Utilizes the OpenAI API to generate dynamic responses to user input.
*   **Message History:** Keeps track of the conversation history within the chat session.
*   **Smooth Scrolling:** Automatically scrolls to the latest message in the chat.
*   **HTML Rendering:** Renders HTML in ai response for more advanced output.
*   **Responsive Design:** The application adapts well to different screen sizes.
* **Error Handling:** Basic error handling is included to gracefully handle API issues.
* **Input Handling:** Prevents empty messages from being sent.
* **Enter Key Support** Supports sending a message with enter key.

## Technologies Used

*   **React:**  A JavaScript library for building user interfaces.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Material UI:** A React UI framework that implements Google's Material Design.
*   **OpenAI API:**  The core AI engine for generating responses.
* **HTML-React-Parser:** Library to parse html strings into React elements.

## Getting Started

### Prerequisites

*   Node.js (v16 or later recommended)
*   npm (or yarn)
*   An OpenAI API key

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd ai-chat-box
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

4. **Set up Environment Variables**
  
    Create a `.env` file in the root directory of the project.
    Add your OpenAI API key to the file, like so:

    ```
    REACT_APP_OPENAI_API_KEY=your_api_key_here
    ```
    
    Replace `your_api_key_here` with your actual OpenAI API key.
  
  **Note:**: Make sure to prefix with REACT_APP_ in `.env` file for any environment variable.

### Running the App

1.  **Start the development server:**

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

    This will start the app in development mode, and it will be accessible in your browser at `http://localhost:3000`.

## Project Structure

*   **`src/`**: Contains the main source code of the application.
    *   **`components/`**: React components for the UI.
        *   **`Chat.tsx`**: The main chat interface component.
    *   **`hooks/`**: Custom React hooks.
        *   **`use-open-ai.ts`**: Hook for interacting with the OpenAI API.
    * `index.tsx`: Entry file.
    * `App.tsx`: main app file.
*   **`public/`**: Static assets and the `index.html` file.
*   `package.json`: project dependencies.
* `package-lock.json`: Lock file for dependencies.
* `.env`: Environment Variables

## How it Works

1.  **User Input:** The user types a message in the input field and presses Enter or clicks the send button.
2.  **Message Handling:** The `handleSend` function adds the user's message to the `messages` state.
3.  **OpenAI API Call:** The `useOpenAI` hook's `getCompletion` function is called, sending the user's message to the OpenAI API.
4.  **AI Response:** The OpenAI API processes the message and sends back a response.
5.  **Displaying the Response:** The `handleSend` function then updates the `messages` state with the AI's response, which is displayed in the chat window.
6. **Html Parsing** ai responses are parsed using `html-react-parser` allowing for more dynamic responses.
7.  **Scrolling:** The `useEffect` hook with `messagesEndRef` ensures that the chat window automatically scrolls to the bottom whenever a new message is added.

## Future Improvements

*   **Enhanced Error Handling:** Implement more robust error handling to manage API errors and other potential issues.
*   **Conversation History Persistence:** Store the conversation history in local storage or a database to persist chats between sessions.
*   **Improved UI/UX:** Further enhance the user interface and overall user experience.
*   **Customization:** Allow users to configure the AI's settings, such as the model and temperature.
*   **Streaming Response:** Implement a streaming response to display the AI's response in real-time, as it's being generated.
*   **Authentication:** Add user login and authentication for multiple users or history saving.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
