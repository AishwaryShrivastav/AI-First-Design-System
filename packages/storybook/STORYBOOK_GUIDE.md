# Storybook Story Guide

This guide outlines the standards and requirements for creating Storybook stories in the AI-First Design System.

## Overview

Every component in the design system must have comprehensive Storybook documentation that follows open source standards. This ensures:

- **Discoverability**: Developers can easily find and understand components
- **Consistency**: All stories follow the same structure and quality standards
- **Accessibility**: Documentation includes accessibility information
- **Best Practices**: Examples show recommended usage patterns
- **Research-Backed**: Design decisions are documented with references

## Story Requirements

### Required Elements

Every story file must include:

1. **Comprehensive JSDoc Header**
   - Component description
   - Features list
   - Accessibility information
   - Best practices
   - Pitfalls to avoid
   - Research references

2. **Complete argTypes**
   - All component props documented
   - Appropriate controls (text, boolean, select, range, etc.)
   - Descriptions for each prop
   - Type information in table format
   - Default values

3. **Multiple Story Variants**
   - Default story (most common use case)
   - Variant stories (different visual variants)
   - State stories (loading, error, disabled, etc.)
   - AllVariants showcase
   - Real-world example
   - Best practices example

4. **Accessibility Documentation**
   - Keyboard navigation details
   - Screen reader support
   - ARIA attributes used
   - WCAG compliance level

5. **Research References**
   - Links to design system precedents
   - WCAG/ARIA specifications
   - AI UX research sources
   - Rationale for each reference

## Story Structure

### File Location

- Base components: `packages/storybook/stories/base/[component-name].stories.ts`
- AI components: `packages/storybook/stories/ai/[component-name].stories.ts`

### File Naming

- Use kebab-case: `ai-button.stories.ts`
- Match component name: `ai-button` → `button.stories.ts`

### Story Categories

- **Base Components**: Standard UI components with AI enhancements
- **AI Components**: Purpose-built AI-specific components

## Template Usage

Use the template at `packages/storybook/.storybook/templates/story.template.ts` as a starting point:

1. Copy the template file
2. Replace placeholders:
   - `[Component Display Name]` → Actual component name
   - `[component-name]` → Actual element name (e.g., `ai-button`)
   - `[Category]` → `Base Components` or `AI Components`
   - `[category]` → `base` or `ai`
3. Fill in all sections
4. Add all props to argTypes
5. Create all required story variants

## Story Variants Checklist

- [ ] **Default**: Most common use case
- [ ] **Variants**: All visual variants (if applicable)
- [ ] **States**: Loading, error, disabled, etc.
- [ ] **Sizes**: Different size options (if applicable)
- [ ] **AllVariants**: Showcase all variants together
- [ ] **RealWorldExample**: Realistic use case
- [ ] **BestPractices**: Recommended patterns
- [ ] **Interactive**: Examples with user interaction (if applicable)

## argTypes Standards

### Control Types

- **Text**: `control: 'text'` for string props
- **Boolean**: `control: 'boolean'` for boolean props
- **Select**: `control: 'select'` with `options: [...]` for enums
- **Number**: `control: 'number'` for numeric props
- **Range**: `control: { type: 'range', min: 0, max: 1, step: 0.01 }` for ranges

### Table Format

Always include table information:

```typescript
argTypes: {
  propName: {
    control: 'text',
    description: 'Clear description',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'default-value' },
    },
  },
}
```

## JSDoc Standards

### Required Sections

1. **Component Description**: What it does and when to use it
2. **Features**: List of key features
3. **Accessibility**: Accessibility features and compliance
4. **Best Practices**: Recommended usage patterns
5. **Pitfalls to Avoid**: Common mistakes
6. **References**: Research citations with URLs and rationale

### Reference Format

```typescript
/**
 * ## References
 * - [WCAG 2.2 Specification](URL): Brief rationale
 * - [ARIA Pattern](URL): Brief rationale
 * - [Design System Name](URL): Brief rationale
 */
```

## Accessibility Requirements

Every story must document:

- **Keyboard Navigation**: Which keys are supported
- **Screen Reader Support**: ARIA attributes and announcements
- **Focus Management**: How focus is handled
- **WCAG Compliance**: Level (AA minimum)
- **Color Contrast**: If applicable

## Best Practices Examples

Include stories that demonstrate:

- ✅ **Good patterns**: Recommended usage
- ✅ **Accessibility**: Proper ARIA usage
- ✅ **Error handling**: Graceful degradation
- ✅ **User control**: Override options for AI features

## Real-World Examples

Create stories that show:

- Component in context
- Common use cases
- Integration with other components
- Practical scenarios

## Code Examples

### Vanilla JavaScript

```html
<ai-component-name prop="value">Content</ai-component-name>
```

### React

```jsx
import { AIComponentName } from '@ai-first-ds/react';

<AIComponentName prop="value">Content</AIComponentName>;
```

## Testing Your Story

Before submitting:

1. **Run Storybook**: `npm run storybook`
2. **Check All Stories**: Verify all variants render correctly
3. **Test Controls**: Ensure all argTypes work
4. **Accessibility**: Run a11y addon checks
5. **Documentation**: Verify autodocs are generated
6. **Links**: Test all reference URLs

## Common Patterns

### Boolean Props

```typescript
?propName=${args.propName}
```

### String Props

```typescript
propName=${args.propName || 'default'}
```

### Number Props

```typescript
numberProp=${args.numberProp}
```

### Array/Object Props

```typescript
.variants=${args.variants || []}
```

## Checklist Before Submission

- [ ] All props documented in argTypes
- [ ] All story variants created
- [ ] JSDoc includes all required sections
- [ ] Accessibility information complete
- [ ] Research references included with rationale
- [ ] Best practices examples included
- [ ] Real-world examples included
- [ ] Code examples work correctly
- [ ] Storybook runs without errors
- [ ] All stories render properly
- [ ] Controls work as expected
- [ ] Accessibility addon passes

## Examples

See existing stories for reference:

- `packages/storybook/stories/base/button.stories.ts`
- `packages/storybook/stories/ai/chat.stories.ts`
- `packages/storybook/stories/base/input.stories.ts`

## Questions?

- Check existing stories for patterns
- Review the template file
- Consult the main CONTRIBUTING.md
- Ask in GitHub Discussions

---

**Remember**: Comprehensive documentation helps everyone. Take the time to create thorough, well-documented stories that follow these standards.
