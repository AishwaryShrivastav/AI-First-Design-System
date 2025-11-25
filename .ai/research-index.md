# Research Index

Curated research sources for AI-First Design System

## Core Research Papers

### Human-AI Interaction

1. **Guidelines for Human-AI Interaction (CHI 2019)**
   - Authors: Amershi, S., Weld, D., Vorvoreanu, M., et al.
   - URL: https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/
   - Type: Academic Paper
   - Key Findings: 18 evidence-based guidelines for designing AI UX
   - Application: Foundation for Microsoft HAX Toolkit

2. **Generative AI Design Principles (CHI 2024)**
   - Authors: IBM Research
   - URL: https://www.ibm.com/design/ai
   - Type: Research Publication
   - Key Findings: 6 design principles for generative AI applications
   - Application: Component design patterns

### Explainability

3. **Explainable AI: A Review (2021)**
   - arXiv: 2104.00950
   - Type: Academic Survey
   - Key Findings: Comprehensive review of XAI techniques
   - Application: ai-explainability-panel design

## Design System Guidelines

### IBM Carbon for AI (2024)

- **URL**: https://carbondesignsystem.com/guidelines/carbon-for-ai/
- **Focus**: Visual and behavioral AI patterns
- **Key Patterns**:
  - AI Label for transparency
  - Explainability framework
  - Visual distinction for AI content
- **Components Using This**:
  - ai-label
  - ai-button (aiGenerated prop)
  - ai-explainability-panel

### Microsoft HAX Toolkit - 18 Guidelines

- **URL**: https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
- **Focus**: Human-AI interaction design
- **Key Guidelines**:
  - #1: Make clear what the system can do
  - #5: Match relevant social norms
  - #7: Support efficient invocation
  - #10: Mitigate social biases
- **Components Using This**:
  - All components (transparency requirement)
  - ai-chat-message (user control)
  - ai-feedback

### SAP Fiori Explainable AI

- **URL**: https://experience.sap.com/fiori-design-web/explainable-ai/
- **Focus**: Progressive disclosure of AI decisions
- **Key Patterns**:
  - What/Why/How explanation levels
  - Contextual explanations
  - Visual explanation aids
- **Components Using This**:
  - ai-explainability-panel

### PatternFly AI Guidelines

- **URL**: https://www.patternfly.org/patternfly-ai/ai-guidelines/
- **Focus**: Practical AI implementation
- **Key Principles**:
  - Be transparent with users
  - Enhance human ability with AI
  - Keep users in control
- **Components Using This**:
  - General design philosophy
  - ai-feedback
  - All interactive AI components

## AI-First Design Principles (2024-2025 Research)

### Adaptive and Predictive UX

- **Source**: Medium, IBM Research, Design System Collective (2024)
- **Key Findings**:
  - AI-first products focus on creating interfaces that learn from user behavior
  - Anticipate needs before explicitly stated
  - Personalize experiences at unprecedented scale
- **Application**: Future adaptive layout components

### Context-Aware Adjustments

- **Source**: Design Shack, Medium (2024)
- **Key Findings**:
  - Adaptive UIs respond to real-time factors (location, device, time, accessibility)
  - Present most relevant content and interface structure
- **Application**: Design token system, responsive patterns

### Trust, Transparency, and Ethical Considerations

- **Sources**: IBM, Microsoft, Academic Research (2024)
- **Key Findings**:
  - Building user trust is paramount
  - Explain AI actions in clear, contextual language
  - Allow user control and oversight
  - Actively mitigate biases
- **Application**: Core principle #1 (Transparency)

## Design System Discoverability (2024)

### Model Context Protocol for Design Systems

- **Source**: Design Systems Collective (2024)
- **Key Findings**:
  - MCP servers provide AI tools with structured knowledge
  - Components as data (JSON structured format)
  - Metadata as interface for AI understanding
- **Application**: packages/mcp-server/

### AI-Ready Design Systems

- **Source**: Supernova, Netguru (2024)
- **Key Findings**:
  - Semantic naming and modular tokens essential
  - Machine-readable documentation enables better AI responses
  - Rich metadata communicates component intent
- **Application**: Component metadata system

## W3C Specifications

### WCAG 2.2

- **URL**: https://www.w3.org/WAI/WCAG22/quickref/
- **Type**: Specification
- **Application**: All components (Level AA compliance)

### WAI-ARIA Authoring Practices

- **URL**: https://www.w3.org/WAI/ARIA/apg/
- **Type**: Specification
- **Patterns Used**:
  - Button pattern
  - Live regions
  - Alert pattern
  - Dialog pattern
- **Application**: All interactive components

## Regulations & Frameworks

### EU AI Act

- **URL**: https://artificialintelligenceact.eu/
- **Focus**: Legal requirements for AI systems
- **Relevant Requirements**:
  - Transparency obligations
  - Explainability requirements for certain systems
- **Application**: Explainability components

### NIST AI Risk Management Framework

- **URL**: https://www.nist.gov/itl/ai-risk-management-framework
- **Focus**: AI risk assessment and mitigation
- **Application**: Design decision validation

## Best Practices Sources

### Conversational UI Patterns

- **Source**: AIUX Design Guide
- **URL**: https://aiuxdesign.guide
- **Patterns**:
  - Natural language understanding
  - Context maintenance
  - Graceful error handling
- **Application**: ai-chat-interface, ai-chat-message

### Modern AI Chat Interfaces

- **Examples**: ChatGPT, Claude, GitHub Copilot
- **Patterns Studied**:
  - Streaming text display
  - Regenerate/edit capabilities
  - Feedback mechanisms
  - Copy/share functionality
- **Application**: ai-streaming-text, ai-chat-message

## How to Use This Index

When designing or proposing a new component:

1. Identify which research papers apply
2. Cite specific guidelines/patterns in component JSDoc
3. Add `@research` tag with citations
4. Link to this index for full context

## Contributing Research

To add research to this index:

1. Verify source is trusted (academic, established design system, W3C spec)
2. Add citation with URL
3. Explain key findings
4. Note which components apply
5. Update component JSDoc references
