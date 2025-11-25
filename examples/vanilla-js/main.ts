/**
 * Vanilla JavaScript example using AI-First Design System
 */

import '@ai-first-ds/core';

console.log('✨ AI-First Design System loaded!');

// Example: Listen to button clicks
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('ai-button');
  buttons.forEach(button => {
    button.addEventListener('click', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Button clicked:', {
        aiGenerated: customEvent.detail?.aiGenerated,
        confidence: customEvent.detail?.confidence,
      });
    });
  });

  // Example: Handle chat messages
  const chatInterface = document.querySelector('ai-chat-interface');
  if (chatInterface) {
    chatInterface.addEventListener('message-send', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Message sent:', customEvent.detail.message);
    });
  }

  // Example: Handle prompt submissions
  const promptInput = document.querySelector('ai-prompt-input');
  if (promptInput) {
    promptInput.addEventListener('submit', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Prompt submitted:', customEvent.detail.value);
    });
  }
});

