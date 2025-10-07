
import { User, Course } from '../types';

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
};

export const MOCK_COURSES: Course[] = [
  {
    // Fix: Changed 'id' to '$id' and added other required properties from Models.Document to match the Course type.
    $id: 'react-fundamentals',
    $collectionId: 'courses',
    $databaseId: 'learnify-db',
    $createdAt: '2023-10-27T10:00:00.000Z',
    $updatedAt: '2023-10-27T10:00:00.000Z',
    $permissions: [],
    title: 'React Fundamentals',
    description: 'Master the basics of React and build dynamic web applications from scratch.',
    instructor: 'Jane Smith',
    imageUrl: 'https://picsum.photos/seed/react/600/400',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to React',
        lessons: [
          {
            id: 'l1-1',
            title: 'What is React?',
            durationMinutes: 10,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: 'An overview of what React is, its history, and why it has become so popular for building user interfaces.'
          },
          {
            id: 'l1-2',
            title: 'Setting up your environment',
            durationMinutes: 15,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: 'Learn how to set up your local development environment using Vite for a fast and modern workflow.'
          },
        ],
      },
      {
        id: 'm2',
        title: 'Components and Props',
        lessons: [
          {
            id: 'l2-1',
            title: 'Understanding Components',
            durationMinutes: 20,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: 'Dive deep into the core concept of React: components. Learn about functional and class components.'
          },
          {
            id: 'l2-2',
            title: 'Passing Data with Props',
            durationMinutes: 18,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: 'Learn how to pass data from parent to child components using props.',
            quiz: [
              {
                id: 'q2-2-1',
                question: 'How do you pass data from a parent to a child component?',
                options: ['State', 'Props', 'Context', 'Refs'],
                correctAnswer: 'Props'
              },
              {
                id: 'q2-2-2',
                question: 'Are props mutable?',
                options: ['Yes', 'No'],
                correctAnswer: 'No'
              }
            ]
          },
        ],
      },
    ],
  },
  {
    // Fix: Changed 'id' to '$id' and added other required properties from Models.Document to match the Course type.
    $id: 'tailwind-css-mastery',
    $collectionId: 'courses',
    $databaseId: 'learnify-db',
    $createdAt: '2023-10-27T10:00:00.000Z',
    $updatedAt: '2023-10-27T10:00:00.000Z',
    $permissions: [],
    title: 'Tailwind CSS Mastery',
    description: 'A complete guide to styling modern websites with the utility-first CSS framework.',
    instructor: 'John Doe',
    imageUrl: 'https://picsum.photos/seed/tailwind/600/400',
    modules: [
      {
        id: 'm3',
        title: 'Getting Started with Tailwind',
        lessons: [
          {
            id: 'l3-1',
            title: 'Utility-First Fundamentals',
            durationMinutes: 12,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: 'Understand the core philosophy behind Tailwind CSS and the utility-first approach.'
          },
          {
            id: 'l3-2',
            title: 'Responsive Design',
            durationMinutes: 25,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: 'Learn how to build fully responsive layouts using Tailwind\'s intuitive breakpoint prefixes.'
          },
        ],
      },
      {
        id: 'm4',
        title: 'Advanced Techniques',
        lessons: [
          {
            id: 'l4-1',
            title: 'Customizing Your Design System',
            durationMinutes: 22,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: 'Extend and customize Tailwind\'s default theme to match your brand\'s design system.'
          },
          {
            id: 'l4-2',
            title: 'Using Plugins',
            durationMinutes: 15,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: 'Explore the power of Tailwind CSS plugins to add new utilities and features.'
          }
        ]
      }
    ],
  },
];
