# AI-First Design System MCP Server

Model Context Protocol (MCP) server that exposes the AI-First Design System's components, tokens, and patterns to AI coding tools.

## What is MCP?

Model Context Protocol is a standard for exposing structured data and tools to AI assistants. By running this MCP server, AI tools like Claude, Cursor, and other AI coding assistants can intelligently query and understand your design system.

## Features

- **Component Discovery**: AI tools can search and retrieve detailed component information
- **Design Tokens**: Access to all design tokens (colors, typography, spacing, AI-specific)
- **Usage Examples**: Get framework-specific code examples (Vanilla JS, React, Vue, Svelte)
- **Research Citations**: Every component includes research backing and design rationale
- **Design Principles**: Access to core AI-first design principles

## Installation

```bash
cd packages/mcp-server
npm install
npm run build
```

## Usage with AI Tools

### Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "ai-first-design-system": {
      "command": "node",
      "args": ["/path/to/AI-First-Design-System/packages/mcp-server/dist/index.js"]
    }
  }
}
```

### Cursor / Other Tools

Configure your AI tool to use this MCP server by pointing to the built server file.

## Available Resources

- `ai-first://components/list` - List all components
- `ai-first://components/{name}` - Get specific component metadata
- `ai-first://tokens/{category}` - Get design tokens by category
- `ai-first://principles` - AI design principles
- `ai-first://patterns` - Common UI patterns

## Available Tools

### search_components

Search for components by name, description, or tags.

```json
{
  "query": "chat"
}
```

### get_component

Get detailed metadata for a specific component.

```json
{
  "name": "ai-button"
}
```

### get_usage_example

Get usage examples for a component in different frameworks.

```json
{
  "component": "ai-chat-message",
  "framework": "react"
}
```

## Development

```bash
# Watch mode for development
npm run dev

# Build
npm run build

# Type check
npm run type-check
```

## Research Foundation

This MCP server implementation is based on:

- **Model Context Protocol Specification** (2024)
- **Design Systems Collective**: "Building AI-Ready Design Systems with Structured Data" (2024)
- **Supernova**: "Making Design Systems AI-Ready" (2024)

## Architecture

```
src/
├── index.ts              # Main MCP server
├── types.ts              # MCP-specific types
└── resources/
    ├── components.ts     # Component resource handlers
    └── tokens.ts         # Token resource handlers
```

## Benefits for AI Tools

When AI coding tools have access to this MCP server, they can:

1. **Discover Components**: Find the right component for the job
2. **Understand Props**: Know all available properties and their types
3. **Follow Best Practices**: Access research-backed usage guidelines
4. **Generate Correct Code**: Use proper syntax for each framework
5. **Maintain Consistency**: Apply design tokens correctly
6. **Respect Accessibility**: Follow WCAG guidelines built into components

## License

MIT
