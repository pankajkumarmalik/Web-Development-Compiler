import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface compilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };

  currentLanguage: "html" | "css" | "javascript";
}

const initialState: compilerSliceStateType = {
  fullCode: {
    html: `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>To-Do List</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <div class="container">
        <h1>To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Add new task..." />
        <button onclick="addTask()">Add Task</button>
        <ul id="taskList"></ul>
      </div>
      <script src="script.js"></script>
    </body>
</html>`,
    css: `      body {
        font-family: Arial, sans-serif;
      
      }
      
      .container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      h1 {
        text-align: center;
      }
      
      input[type="text"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
      }
      
      button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      
      button:hover {
        background-color: #45a049;
      }
      
      ul {
        list-style-type: none;
        padding: 0;
      }
      
      li {
        margin-bottom: 10px;
      }
      
      .delete-btn {
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 5px 10px;
        cursor: pointer;
      }
      
      .delete-btn:hover {
        background-color: #e53935;
      }
      
      p{
        display: flex;
        justify-content: center;
        color: green;
        background-color:grey
      }`,
    javascript: `        function addTask() {
        var taskInput = document.getElementById('taskInput');
        var taskList = document.getElementById('taskList');
      
        if (taskInput.value === '') {
          alert('Please enter a task!');
          return;
        }
      
        var li = document.createElement('li');
        li.textContent = taskInput.value;
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
          li.remove();
        };
      
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskInput.value = '';
      }
      
      
      `,
  },

  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<compilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },

    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateFullCode: (
      state,
      action: PayloadAction<compilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue, updateFullCode } =
  compilerSlice.actions;
