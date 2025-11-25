# Coding Standards

> Clear standards for maintaining code quality and consistency

## Component Development

### Component File Structure

Every component file must follow this order:

```typescript
// 1. Imports
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TypeName } from '../../utils/types';

// 2. JSDoc documentation
/**
 * Component description
 * @element element-name
 * ...full JSDoc
 */

// 3. Component class
@customElement('element-name')
export class ComponentName extends LitElement {
  // Properties
  // Static styles
  // Private methods
  // Render method
}

// 4. Global type declaration
declare global {
  interface HTMLElementTagNameMap {
    'element-name': ComponentName;
  }
}
```

### JSDoc Requirements

All exported components MUST include:

````typescript
/**
 * Brief one-line description
 *
 * @element element-name
 *
 * @fires event-name - Event description
 *
 * @slot [slot-name] - Slot description
 *
 * @cssprop --custom-property - Property description
 *
 * @prop {Type} propName - Property description
 *
 * @example
 * ```html
 * <element-name prop="value">Content</element-name>
 * ```
 *
 * @accessibility
 * - Keyboard support: Tab, Enter, Escape
 * - ARIA: role, aria-label, etc.
 * - Screen reader tested
 *
 * @reference
 * - WCAG: https://...
 * - ARIA Pattern: https://...
 * - Design System: https://...
 */
````

### Naming Conventions

| Type                  | Convention             | Example             |
| --------------------- | ---------------------- | ------------------- |
| Component files       | kebab-case             | `ai-button.ts`      |
| Component classes     | PascalCase             | `AIButton`          |
| Custom elements       | kebab-case with prefix | `ai-button`         |
| Properties (public)   | camelCase              | `aiGenerated`       |
| Methods (private)     | \_camelCase            | `_handleClick`      |
| Types                 | PascalCase             | `ButtonVariant`     |
| Constants             | UPPER_SNAKE_CASE       | `DEFAULT_TIMEOUT`   |
| CSS classes           | kebab-case             | `ai-button-primary` |
| CSS custom properties | kebab-case with prefix | `--ai-button-bg`    |

## TypeScript Standards

### Strict Mode

TypeScript strict mode is enabled. Follow these rules:

```typescript
// ✅ Good
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ❌ Bad - implicit any
function greet(name) {
  return `Hello, ${name}`;
}
```

### Type Imports

Use `type` imports for types:

```typescript
// ✅ Good
import type { ButtonVariant, Confidence } from '../../utils/types';
import { LitElement } from 'lit';

// ❌ Bad - mixing types with values
import { LitElement, ButtonVariant } from 'lit';
```

### No Any

Never use `any`. Use `unknown` if type is truly unknown:

```typescript
// ✅ Good
function processData(data: unknown): void {
  if (typeof data === 'string') {
    console.log(data.toUpperCase());
  }
}

// ❌ Bad
function processData(data: any): void {
  console.log(data.toUpperCase());
}
```

### Type Definitions

Define types in `utils/types.ts` for reusability:

```typescript
/**
 * Type description with design rationale
 *
 * @reference Source or design system
 */
export type TypeName = 'value1' | 'value2';
```

## Styling Standards

### CSS-in-JS with Lit

Use Lit's `css` tagged template:

```typescript
static styles = css`
  :host {
    display: block;
  }

  /* Use logical grouping */
  .component {
    /* Layout */
    display: flex;

    /* Spacing */
    padding: 1rem;

    /* Typography */
    font-size: 1rem;

    /* Colors */
    background: var(--color);

    /* Transitions */
    transition: all 150ms;
  }
`;
```

### CSS Custom Properties

Use CSS custom properties for theming:

```css
/* Component-specific properties */
--ai-button-bg
--ai-button-color
--ai-button-border
--ai-button-radius
--ai-button-padding

/* Use with fallbacks */
background: var(--ai-button-bg, #3b82f6);
```

### Responsive Design

Mobile-first approach:

```css
/* Mobile (default) */
.component {
  font-size: 14px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    font-size: 16px;
  }
}
```

## Accessibility Standards

### Keyboard Support

All interactive components must support:

- **Tab**: Focus navigation
- **Enter/Space**: Activate buttons
- **Escape**: Close modals/dropdowns
- **Arrow keys**: Navigate lists/menus

### ARIA Attributes

```typescript
// ✅ Good - proper ARIA
return html`
  <button
    role="button"
    aria-label="Descriptive label"
    aria-pressed="${this.pressed}"
    aria-disabled="${this.disabled}"
  >
    Content
  </button>
`;
```

### Focus Management

```typescript
// ✅ Good - visible focus indicator
button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

### Color Contrast

Ensure WCAG 2.2 Level AA compliance:

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

## Testing Standards

### Unit Tests

Co-locate tests with components:

```
ai-button.ts
ai-button.test.ts
```

Test structure:

```typescript
import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import { AIButton } from './ai-button';

describe('AIButton', () => {
  it('renders with default props', async () => {
    const el = await fixture<AIButton>(html`<ai-button>Click</ai-button>`);
    expect(el).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<AIButton>(html`<ai-button>Click</ai-button>`);
    await expect(el).to.be.accessible();
  });

  it('handles clicks when not disabled', async () => {
    let clicked = false;
    const el = await fixture<AIButton>(
      html`<ai-button @click=${() => (clicked = true)}>Click</ai-button>`
    );
    el.click();
    expect(clicked).to.be.true;
  });
});
```

### Test Coverage

Minimum coverage requirements:

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

## Git Commit Standards

### Conventional Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Updating build tasks, package manager configs, etc.

Examples:

```
feat(ai-button): add confidence indicator
fix(ai-chat): resolve streaming text issues
docs(readme): update installation instructions
test(ai-input): add keyboard navigation tests
```

## Code Review Checklist

Before submitting PR:

- [ ] All tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] TypeScript compiles (`npm run typecheck`)
- [ ] Code is formatted (`npm run format`)
- [ ] JSDoc comments are complete
- [ ] Accessibility tested
- [ ] Examples added to Storybook
- [ ] Changeset added if needed (`npx changeset`)
- [ ] No console.log or debugger statements
- [ ] Performance considered (avoid unnecessary re-renders)

## Performance Guidelines

### Avoid Unnecessary Re-renders

```typescript
// ✅ Good - use willUpdate lifecycle
willUpdate(changedProperties: PropertyValues) {
  if (changedProperties.has('data')) {
    this._processedData = this._processData(this.data);
  }
}

// ❌ Bad - processing in render
render() {
  const processed = this._processData(this.data); // Runs every render!
  return html`...`;
}
```

### Lazy Loading

Use dynamic imports for large components:

```typescript
// ✅ Good
async loadHeavyComponent() {
  const { HeavyComponent } = await import('./heavy-component');
  return HeavyComponent;
}
```

## Documentation Standards

### README for Packages

Each package should have a README with:

- Installation instructions
- Usage examples
- API reference
- Links to full documentation

### Inline Comments

Use comments sparingly, focus on "why" not "what":

```typescript
// ✅ Good - explains why
// Use debounce to prevent excessive API calls during rapid typing
const debouncedSearch = debounce(search, 300);

// ❌ Bad - states the obvious
// Increment counter
counter++;
```

## Anti-Patterns to Avoid

### Don't Modify Props Directly

```typescript
// ❌ Bad
this.value = newValue;

// ✅ Good - dispatch event for external state changes
this.dispatchEvent(new CustomEvent('value-change', { detail: newValue }));
```

### Don't Use Global State

```typescript
// ❌ Bad
window.globalConfig = { ... };

// ✅ Good - use properties or context
@property({ type: Object }) config = { ... };
```

### Don't Bypass Shadow DOM

```typescript
// ❌ Bad
this.renderRoot.querySelector('.internal'); // Fragile

// ✅ Good - use refs or proper API
@query('.internal') private _internal!: HTMLElement;
```

## Resources

- [Lit Best Practices](https://lit.dev/docs/components/best-practices/)
- [Web Components Best Practices](https://web.dev/custom-elements-best-practices/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Conventional Commits](https://www.conventionalcommits.org/)
