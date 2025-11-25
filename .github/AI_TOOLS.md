# AI Tools Guide

> How to use AI-First Design System with AI-powered development tools

## Overview

This design system is optimized for AI-assisted development. We provide structured context files, clear patterns, and comprehensive documentation to help AI tools understand and generate code that follows our conventions.

## AI Context Files

### `.cursorrules`

Contains project-specific rules and patterns for Cursor AI and similar editors. Includes:

- Component structure patterns
- Naming conventions
- Documentation requirements
- Design principles

### `.ai/` Directory

Dedicated folder for AI tool context:

- **project-context.md** - Quick project overview
- **component-index.md** - Component catalog with APIs

## Using with Cursor AI

### Setup

1. Open project in Cursor
2. Cursor automatically reads `.cursorrules`
3. Use `@docs` to reference documentation
4. Use `@code` to reference codebase

### Example Prompts

**Generate a new component:**

```
Create a new AI component called ai-rating that allows users to rate AI outputs from 1-5 stars. Follow the project patterns in .cursorrules and use ai-button.ts as a reference.
```

**Add feature to existing component:**

```
Add a tooltip feature to ai-button that shows confidence explanation on hover. Ensure it's accessible and follows ARIA patterns.
```

**Write tests:**

```
Write comprehensive unit tests for ai-chat-message including accessibility tests. Follow the testing patterns in ai-button.test.ts
```

## Using with GitHub Copilot

### Configure Copilot

Enable inline suggestions and use comments to guide generation:

```typescript
// Create an AI label component that shows AI generation status
// Props: variant (ai-generated, ai-assisted), confidence, showIcon
// Follow patterns from ai-button.ts
```

### Best Practices

1. Reference existing components in comments
2. Specify accessibility requirements
3. Mention design system precedents
4. Include JSDoc structure expectations

## Using with ChatGPT / Claude

### Providing Context

**Option 1: Share context files**
Upload or share contents of:

- `.ai/project-context.md` - Project overview
- `.ai/component-index.md` - Component reference
- `CODING_STANDARDS.md` - Coding conventions

**Option 2: Reference in prompts**

```
I'm working on the AI-First Design System (a Lit-based Web Components library).
Please generate a new component following these standards: [paste relevant sections]
```

### Example Workflows

**Component Generation:**

1. Share component-index.md for reference
2. Describe new component requirements
3. Ask for implementation with full JSDoc
4. Request accompanying tests
5. Ask for Storybook story

**Documentation:**

1. Share existing doc structure
2. Request new documentation in same style
3. Ensure conciseness and clarity

**Bug Fixes:**

1. Share component code and error
2. Reference similar working components
3. Request fix with explanation

## Code Generation Patterns

### Component Template

Ask AI to use this structure:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {} from /* types */ '../../utils/types';

/**
 * [Full JSDoc following standards]
 */
@customElement('ai-component-name')
export class AIComponentName extends LitElement {
  @property({ type: String }) variant = 'default';

  static styles = css`
    /* styles */
  `;

  private _handleEvent(e: Event) {
    /* handler */
  }

  render() {
    return html`<!-- template -->`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-component-name': AIComponentName;
  }
}

export { AIComponentName };
```

### Test Template

```typescript
import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import { ComponentName } from './component-name';

describe('ComponentName', () => {
  it('renders correctly', async () => {
    const el = await fixture<ComponentName>(html`<component-name></component-name>`);
    expect(el).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<ComponentName>(html`<component-name></component-name>`);
    await expect(el).to.be.accessible();
  });

  // More tests...
});
```

## Prompt Engineering Tips

### Be Specific About Patterns

```
✅ "Follow the component structure in ai-button.ts, including JSDoc format, ARIA attributes, and event handling patterns"

❌ "Create a button component"
```

### Reference Standards

```
✅ "Ensure WCAG 2.2 Level AA compliance with proper ARIA attributes as seen in ai-chat-message.ts"

❌ "Make it accessible"
```

### Request Documentation

```
✅ "Include comprehensive JSDoc with @element, @prop, @fires, @example, @accessibility, and @reference sections"

❌ "Add some comments"
```

### Specify Tests

```
✅ "Write unit tests following the pattern in ai-button.test.ts, including render tests, accessibility tests, and event handling tests"

❌ "Write tests"
```

## AI Tool Configuration

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false
  },
  "github.copilot.advanced": {
    "debug.overrideEngine": "codex",
    "debug.testOverrideProxyUrl": ""
  }
}
```

### Cursor Settings

Cursor automatically uses `.cursorrules`. For custom behavior:

1. Settings → Cursor → Rules
2. Ensure "Use .cursorrules file" is enabled
3. Set context window size appropriately

## Quality Checks

After AI-generated code:

1. **Run linter**: `npm run lint`
2. **Type check**: `npm run typecheck`
3. **Format**: `npm run format`
4. **Test**: `npm test`
5. **Build**: `npm run build`

Always review AI-generated code for:

- Proper type safety
- Accessibility compliance
- Design system consistency
- Performance considerations

## Common Scenarios

### Scenario 1: New Component

**Prompt:**

```
Create a new AI component called ai-progress-indicator. Requirements:
- Shows progress of AI processing (0-100%)
- Visual variants: linear, circular, streaming
- Props: progress (number), variant, animated, label
- Accessibility: ARIA progressbar role, aria-valuenow
- Follow all patterns from ai-button.ts
- Include full JSDoc, tests, and Storybook story
```

### Scenario 2: Feature Addition

**Prompt:**

```
Add keyboard shortcut support to ai-prompt-input:
- Cmd/Ctrl+Enter to submit
- Escape to clear
- Maintain accessibility
- Update JSDoc and tests
- Follow event handling pattern from ai-chat-message.ts
```

### Scenario 3: Bug Fix

**Prompt:**

```
The ai-streaming-text component breaks when text prop changes rapidly.
Implement debouncing following performance best practices.
Ensure animation completes smoothly.
Add tests for rapid updates.
```

### Scenario 4: Documentation

**Prompt:**

```
Write a migration guide for upgrading from v0.1.0 to v0.2.0.
Follow the concise style in getting-started.md.
Include:
- Breaking changes
- New features
- Migration steps
- Code examples
```

## Troubleshooting

### AI generates incorrect patterns

**Solution:** Reference specific files:

- "Follow the exact pattern in ai-button.ts"
- "Use the same JSDoc structure as ai-chat-message.ts"
- Share relevant code snippets

### Generated code doesn't pass linting

**Solution:**

- Run `npm run lint:fix` to auto-fix
- Include ESLint rules in prompt
- Reference `.eslintrc.json` configuration

### Missing accessibility features

**Solution:** Be explicit:

- "Include all ARIA attributes from ai-button.ts"
- "Ensure keyboard navigation like in ai-chat-interface.ts"
- "Follow WCAG 2.2 Level AA standards"

## Resources

- [Cursor Documentation](https://cursor.sh/docs)
- [GitHub Copilot Guide](https://docs.github.com/en/copilot)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Component Templates](./.ai/component-index.md)
- [Coding Standards](../CODING_STANDARDS.md)

## Contributing AI-Generated Code

When submitting AI-generated code:

1. **Always review** - Don't submit without understanding
2. **Test thoroughly** - Run all test suites
3. **Check accessibility** - Verify WCAG compliance
4. **Document properly** - Ensure JSDoc is complete
5. **Follow standards** - Matches coding standards
6. **Add changeset** - `npx changeset` for version bump

Remember: AI is a tool to enhance your productivity, not replace careful review and testing.
