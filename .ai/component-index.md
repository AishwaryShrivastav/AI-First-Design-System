# Component Index

> Quick reference for all components in the design system

## Base Components

### ai-button

**AI-enhanced button with confidence indicators**

- **Props**: `variant`, `disabled`, `loading`, `aiGenerated`, `confidence`
- **Events**: `click`
- **File**: `packages/core/src/components/base/ai-button.ts`
- **Usage**: `<ai-button variant="primary" aiGenerated confidence="0.95">Action</ai-button>`

### ai-input

**Input field with AI suggestions and autocomplete**

- **Props**: `value`, `placeholder`, `disabled`, `aiSuggestions`
- **Events**: `input`, `change`
- **File**: `packages/core/src/components/base/ai-input.ts`
- **Usage**: `<ai-input placeholder="Enter text..."></ai-input>`

### ai-badge

**Badge with confidence visualization**

- **Props**: `variant`, `confidence`, `label`
- **File**: `packages/core/src/components/base/ai-badge.ts`
- **Usage**: `<ai-badge confidence="0.85">High Confidence</ai-badge>`

---

## AI-Specific Components

### ai-chat-message

**Chat message bubble with streaming support**

- **Props**: `role` (user|ai|system), `streaming`, `showActions`, `timestamp`
- **Slots**: default (message content), actions (action buttons)
- **Events**: `action-click`
- **File**: `packages/core/src/components/ai/ai-chat-message.ts`
- **Usage**: `<ai-chat-message role="ai" streaming>Hello!</ai-chat-message>`

### ai-chat-interface

**Complete chat UI with input and message history**

- **Props**: `placeholder`, `disabled`, `maxHeight`
- **Slots**: messages (message list), input-prefix
- **Events**: `message-send`
- **File**: `packages/core/src/components/ai/ai-chat-interface.ts`
- **Usage**: `<ai-chat-interface placeholder="Ask me anything..."></ai-chat-interface>`

### ai-prompt-input

**Advanced prompt composer with templates**

- **Props**: `value`, `placeholder`, `templates`, `multiline`, `maxLength`
- **Events**: `submit`, `template-select`
- **File**: `packages/core/src/components/ai/ai-prompt-input.ts`
- **Usage**: `<ai-prompt-input multiline placeholder="Enter prompt..."></ai-prompt-input>`

### ai-label

**Clear AI content indicator**

- **Props**: `variant` (ai|ai-generated|ai-assisted), `confidence`, `showIcon`
- **File**: `packages/core/src/components/ai/ai-label.ts`
- **Usage**: `<ai-label variant="ai-generated" confidence="0.92"></ai-label>`

### ai-skeleton

**AI-aware skeleton loader**

- **Props**: `variant` (text|card|avatar|custom), `animated`, `count`
- **File**: `packages/core/src/components/ai/ai-skeleton.ts`
- **Usage**: `<ai-skeleton variant="text" count="3" animated></ai-skeleton>`

### ai-streaming-text

**Token-by-token text streaming display**

- **Props**: `text`, `speed`, `cursor`, `complete`
- **Events**: `stream-start`, `stream-end`
- **File**: `packages/core/src/components/ai/ai-streaming-text.ts`
- **Usage**: `<ai-streaming-text text="Streaming content..."></ai-streaming-text>`

### ai-explainability-panel

**Progressive disclosure panel (what/why/how)**

- **Props**: `level` (what|why|how), `collapsible`, `defaultExpanded`
- **Slots**: what, why, how
- **Events**: `level-change`
- **File**: `packages/core/src/components/ai/ai-explainability-panel.ts`
- **Usage**: `<ai-explainability-panel level="why"></ai-explainability-panel>`

### ai-feedback

**User feedback collection for AI outputs**

- **Props**: `variant` (thumbs|stars|detailed), `value`, `showComment`
- **Events**: `feedback-submit`
- **File**: `packages/core/src/components/ai/ai-feedback.ts`
- **Usage**: `<ai-feedback variant="detailed"></ai-feedback>`

### ai-prompt-templates

**Prompt guidance with categorized templates**

- **Props**: `templates`, `categories`
- **Events**: `template-select`
- **File**: `packages/core/src/components/ai/ai-prompt-templates.ts`
- **Research**: Google AI UX Patterns (2024), Microsoft HAX #11
- **Usage**: `<ai-prompt-templates .templates="${templates}"></ai-prompt-templates>`

### ai-variant-selector

**Generative variability explorer**

- **Props**: `variants`, `selectedId`, `mode` (carousel|list|grid)
- **Events**: `variant-select`, `regenerate`
- **File**: `packages/core/src/components/ai/ai-variant-selector.ts`
- **Research**: Google AI UX Patterns (2024), Nielsen Norman Group (2024)
- **Usage**: `<ai-variant-selector .variants="${variants}"></ai-variant-selector>`

### ai-error-recovery

**Graceful error handling with context**

- **Props**: `error`, `suggestions`, `retryable`
- **Events**: `retry`, `suggestion-click`
- **File**: `packages/core/src/components/ai/ai-error-recovery.ts`
- **Research**: Microsoft HAX #8, IBM Carbon for AI
- **Usage**: `<ai-error-recovery error="Context lost" retryable></ai-error-recovery>`

### ai-confidence-meter

**Visual confidence indicator**

- **Props**: `confidence`, `variant` (linear|circular), `showLabel`
- **File**: `packages/core/src/components/ai/ai-confidence-meter.ts`
- **Research**: IBM Carbon for AI (2024), Microsoft HAX #1
- **Usage**: `<ai-confidence-meter confidence="0.85" variant="circular"></ai-confidence-meter>`

---

## Type Definitions

**Location**: `packages/core/src/utils/types.ts`

```typescript
type Confidence = number; // 0-1
type AIRole = 'user' | 'ai' | 'system';
type AIState = 'idle' | 'thinking' | 'generating' | 'streaming' | 'complete' | 'error';
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type InputSize = 'small' | 'medium' | 'large';
type ThemeMode = 'light' | 'dark' | 'auto';
type ExplainabilityLevel = 'what' | 'why' | 'how';
```

---

## Framework Wrappers

### React

**Location**: `packages/react/src/components/`

- All components exported with React-friendly API
- TypeScript definitions included
- Event handlers use React synthetic events

```tsx
import { AIButton, AIChatMessage } from '@ai-first-ds/react';

<AIButton variant="primary" onClick={handleClick}>
  Click
</AIButton>;
```

---

## Design Tokens

**Location**: `packages/tokens/src/`

- `colors.ts` - Color palette
- `typography.ts` - Font scales and families
- `spacing.ts` - Spacing scale
- `ai-tokens.ts` - AI-specific tokens (confidence colors, etc.)
- `tailwind.config.js` - Tailwind integration

---

## Quick Links

- 📚 Full Documentation: `docs/`
- 🎨 Storybook: `packages/storybook/`
- ✅ Tests: Co-located `*.test.ts` files
- 🔧 Build Configs: `vite.config.ts`, `tsconfig.json`
- 📦 Package Info: `package.json` (root and per-package)
