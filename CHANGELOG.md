# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of AI-First Design System
- Core web components library (`@ai-first-ds/core`)
- React wrapper package (`@ai-first-ds/react`)
- Design token system (`@ai-first-ds/tokens`)
- Comprehensive Storybook documentation
- Testing infrastructure (Vitest, Playwright, accessibility)
- CI/CD workflows with GitHub Actions

## [0.1.0] - 2025-11-25

### Added

#### Core Components

- **Base Components (AI-Enhanced)**
  - `ai-button`: Button with AI confidence indicators and loading states
  - `ai-input`: Input with AI suggestions and ghost text
  - `ai-badge`: Badge with confidence visualization

#### AI-Specific Components

- **Conversational**
  - `ai-chat-message`: Message bubbles with streaming support and actions
  - `ai-chat-interface`: Complete chat UI with input and history
- **Input & Prompts**
  - `ai-prompt-input`: Advanced prompt composer with templates and token counting
  - `ai-label`: Clear AI content indicators with model attribution
- **Loading & Feedback**
  - `ai-skeleton`: Context-aware skeleton loaders with shimmer
  - `ai-streaming-text`: Token-by-token text streaming with cursor
- **Transparency & Trust**
  - `ai-explainability-panel`: Progressive disclosure (What/Why/How)
  - `ai-feedback`: User feedback collection (simple and detailed)

#### Design Tokens

- Comprehensive color system with semantic tokens
- Typography scales and font families
- Spacing system based on 8pt grid
- Shadow and animation tokens
- AI-specific tokens (confidence colors, gradients, thresholds)
- Tailwind CSS configuration

#### Documentation

- Complete README with quick start guide
- Contributing guidelines
- AI design principles documentation
- Getting started guide
- Storybook with interactive examples
- Component API documentation

#### Testing

- Unit tests with Vitest
- E2E tests with Playwright
- Accessibility tests (WCAG 2.2 Level AA)
- Visual regression testing
- Code coverage reporting

#### Infrastructure

- Monorepo setup with npm workspaces
- TypeScript configuration
- ESLint and Prettier for code quality
- Changesets for version management
- GitHub Actions CI/CD
- Automated npm publishing

### References

All components and design decisions are backed by trusted sources:

- [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
- [Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)
- [SAP Fiori Explainable AI](https://experience.sap.com/fiori-design-web/explainable-ai/)
- [PatternFly AI Guidelines](https://www.patternfly.org/patternfly-ai/ai-guidelines/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)

[Unreleased]: https://github.com/AishwaryShrivastav/AI-First-Design-System/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/AishwaryShrivastav/AI-First-Design-System/releases/tag/v0.1.0
