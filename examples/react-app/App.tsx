/**
 * React example application using AI-First Design System
 * 
 * @see https://github.com/AishwaryShrivastav/AI-First-Design-System
 */

import React, { useState } from 'react';
import {
  AIButton,
  AIInput,
  AIBadge,
  AILabel,
  AIChatMessage,
  AIChatInterface,
  AIPromptInput,
  AIStreamingText,
  AISkeleton,
  AIExplainabilityPanel,
  AIFeedback,
} from '@ai-first-ds/react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handlePromptSubmit = (e: CustomEvent<{ value: string }>) => {
    console.log('Prompt submitted:', e.detail.value);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false);
      setStreamingText('This is a simulated AI response that streams character by character...');
      setIsStreaming(true);
    }, 1000);
  };

  const handleStreamComplete = () => {
    setIsStreaming(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          🤖 AI-First Design System
        </h1>
        <p style={{ color: '#6b7280' }}>React Example Application</p>
      </header>

      {/* Buttons */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <AIButton variant="primary" onClick={() => alert('Clicked!')}>
            Primary
          </AIButton>
          <AIButton variant="secondary">Secondary</AIButton>
          <AIButton variant="ghost">Ghost</AIButton>
          <AIButton variant="danger">Danger</AIButton>
          <AIButton loading>Loading</AIButton>
          <AIButton aiGenerated confidence={0.95}>
            AI Suggested (95%)
          </AIButton>
        </div>
      </section>

      {/* Badges */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Badges & Labels</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <AIBadge variant="info">Info</AIBadge>
          <AIBadge variant="success">Success</AIBadge>
          <AIBadge variant="warning">Warning</AIBadge>
          <AIBadge aiIndicator confidence={0.87}>87% Confidence</AIBadge>
          <AILabel model="GPT-4">AI Generated</AILabel>
        </div>
      </section>

      {/* Chat Interface */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Chat Interface</h2>
        <AIChatInterface 
          placeholder="Ask me anything..."
          onMessageSend={(e) => console.log('Message:', e.detail)}
        >
          <div slot="messages">
            <AIChatMessage role="ai">
              Hello! I'm your AI assistant. How can I help you today?
            </AIChatMessage>
            <AIChatMessage role="user" timestamp="2:30 PM">
              What is machine learning?
            </AIChatMessage>
            <AIChatMessage role="ai" showActions timestamp="2:31 PM">
              Machine learning is a subset of AI where systems learn from data without being explicitly programmed.
            </AIChatMessage>
          </div>
        </AIChatInterface>
      </section>

      {/* Prompt Input */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Prompt Input</h2>
        <AIPromptInput
          placeholder="Enter your prompt..."
          showTokenCount
          maxTokens={4000}
          showTemplates
          loading={isLoading}
          onSubmit={handlePromptSubmit}
        />
      </section>

      {/* Streaming Response */}
      {streamingText && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Response</h2>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
            <AIStreamingText
              text={streamingText}
              streaming={isStreaming}
              speed={30}
              onStreamComplete={handleStreamComplete}
            />
          </div>
        </section>
      )}

      {/* Skeleton Loaders */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Loading States</h2>
        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
          <AISkeleton variant="text" lines={3} />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <AISkeleton variant="circular" width="40px" height="40px" />
            <AISkeleton variant="rectangular" width="200px" height="40px" />
          </div>
        </div>
      </section>

      {/* Explainability */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Explainability</h2>
        <AIExplainabilityPanel level="why" collapsible>
          <div slot="what">
            This action was recommended based on your workflow.
          </div>
          <div slot="why">
            You frequently perform similar actions at this time of day.
          </div>
          <div slot="how">
            <strong>Model:</strong> RandomForest<br />
            <strong>Confidence:</strong> 94%<br />
            <strong>Features:</strong> time_of_day, user_history, context
          </div>
        </AIExplainabilityPanel>
      </section>

      {/* Feedback */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>User Feedback</h2>
        <AIFeedback 
          detailed 
          onFeedback={(e) => console.log('Feedback:', e.detail)}
        />
      </section>

      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#6b7280' }}>
        <p>
          Built with <a href="https://github.com/AishwaryShrivastav/AI-First-Design-System" style={{ color: '#3b82f6' }}>AI-First Design System</a>
        </p>
      </footer>
    </div>
  </div>

  <script type="module" src="./main.ts"></script>
</body>
</html>

