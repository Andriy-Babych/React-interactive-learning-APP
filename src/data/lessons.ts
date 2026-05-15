export type Lesson = {
  id: string;
  title: string;
  level: string;
  duration: string;
  summary: string;
  goal: string;
  checkpoints: string[];
  code: string;
  challenge: {
    prompt: string;
    placeholder: string;
    expectedAnswer: string;
    successMessage: string;
    hint: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctOption: string;
    explanation: string;
  };
};

export const lessons: Lesson[] = [
  {
    id: 'jsx',
    title: 'JSX and Components',
    level: 'Start',
    duration: '12 min',
    summary: 'Describe the interface as small reusable components.',
    goal: 'Build the first component and pass data to it through props.',
    checkpoints: [
      'JSX looks like HTML, but it is JavaScript',
      'A component returns one piece of UI',
      'Props make components flexible',
    ],
    code: [
      'function LessonCard({ title, duration }) {',
      '  return <article>{title} - {duration}</article>;',
      '}',
    ].join('\\n'),
    challenge: {
      prompt: 'Which word passes data into a component?',
      placeholder: 'Type the React term',
      expectedAnswer: 'props',
      successMessage: 'Correct. Props are the input contract for a component.',
      hint: 'It is short for properties.',
    },
    quiz: {
      question: 'What should a React component return?',
      options: ['A UI description', 'A CSS file', 'A database row'],
      correctOption: 'A UI description',
      explanation: 'A component returns JSX, which describes the UI React should render.',
    },
  },
  {
    id: 'state',
    title: 'State and Events',
    level: 'Practice',
    duration: '18 min',
    summary: 'Learn how React remembers data between renders and responds to user actions.',
    goal: 'Control a counter and see how state changes update the UI.',
    checkpoints: [
      'useState returns a value and a setter',
      'Events trigger state changes',
      'UI is a reflection of current state',
    ],
    code: [
      "import { useState } from 'react';",
      '',
      'function CounterLab() {',
      '  const [count, setCount] = useState(0);',
      '  return <button onClick={() => setCount(count + 1)}>{count}</button>;',
      '}',
    ].join('\\n'),
    challenge: {
      prompt: 'Which hook lets a component remember changing values?',
      placeholder: 'Type the hook name',
      expectedAnswer: 'useState',
      successMessage: 'Nice. useState stores values that should trigger a render when they change.',
      hint: 'It starts with use and returns a value plus a setter.',
    },
    quiz: {
      question: 'What happens when a state setter receives a new value?',
      options: ['React schedules a render', 'The page reloads', 'CSS is regenerated'],
      correctOption: 'React schedules a render',
      explanation: 'State updates tell React that the component needs to render with new data.',
    },
  },
  {
    id: 'lists',
    title: 'Lists and Keys',
    level: 'Core',
    duration: '15 min',
    summary: 'Turn arrays of data into stable lists of UI elements.',
    goal: 'Render a lesson list and explain why React needs a key.',
    checkpoints: [
      'map creates an array of JSX elements',
      'key should be stable',
      'Data is easier to manage outside markup',
    ],
    code: [
      "const topics = ['JSX', 'State', 'Lists'];",
      'function TopicList() {',
      '  return topics.map((topic) => <li key={topic}>{topic}</li>);',
      '}',
    ].join('\\n'),
    challenge: {
      prompt: 'Which prop helps React track list items between renders?',
      placeholder: 'Type the prop name',
      expectedAnswer: 'key',
      successMessage: 'Exactly. A stable key helps React reconcile list items correctly.',
      hint: 'It should be unique and stable inside the list.',
    },
    quiz: {
      question: 'Which value makes the best key for a list item?',
      options: ['A stable id from the data', 'The array index every time', 'A random number'],
      correctOption: 'A stable id from the data',
      explanation: 'Stable ids let React match the same item across renders, inserts, and deletes.',
    },
  },
  {
    id: 'effects',
    title: 'Effects and Lifecycle',
    level: 'Next',
    duration: '20 min',
    summary: 'Connect React to the outside world: APIs, document title, and timers.',
    goal: 'Run a side effect after a component update.',
    checkpoints: [
      'An effect runs after render',
      'The dependency array controls repeats',
      'Cleanup removes subscriptions and timers',
    ],
    code: [
      "import { useEffect, useState } from 'react';",
      'function TitleSync() {',
      "  const [topic, setTopic] = useState('React');",
      '  useEffect(() => { document.title = topic; }, [topic]);',
      '  return <input value={topic} onChange={(event) => setTopic(event.target.value)} />;',
      '}',
    ].join('\\n'),
    challenge: {
      prompt: 'Which hook is used for side effects after render?',
      placeholder: 'Type the hook name',
      expectedAnswer: 'useEffect',
      successMessage: 'You got it. useEffect is where React code syncs with external systems.',
      hint: 'It receives a callback and a dependency array.',
    },
    quiz: {
      question: 'What does the dependency array control?',
      options: ['When the effect runs again', 'The component name', 'The CSS cascade'],
      correctOption: 'When the effect runs again',
      explanation: 'React compares dependency values to decide whether the effect should run again.',
    },
  },
];
