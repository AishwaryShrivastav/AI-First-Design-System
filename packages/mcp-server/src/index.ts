#!/usr/bin/env node

/**
 * AI-First Design System MCP Server
 *
 * Model Context Protocol server that exposes design system components,
 * tokens, and patterns to AI coding tools for intelligent discovery
 * and code generation.
 *
 * @reference
 * - Model Context Protocol: https://modelcontextprotocol.io/
 * - Design Systems Collective: "Building AI-Ready Design Systems" (2024)
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import {
  getComponentResources,
  getComponentByUri,
  getAllComponents,
  searchComponents,
} from './resources/components.js';
import { getTokenResources, getTokensByCategory } from './resources/tokens.js';

/**
 * Create and configure MCP server
 */
async function main() {
  const server = new Server(
    {
      name: 'ai-first-design-system',
      version: '0.1.0',
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    }
  );

  /**
   * List all available resources
   */
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const componentResources = getComponentResources();
    const tokenResources = getTokenResources();

    return {
      resources: [
        ...componentResources,
        ...tokenResources,
        {
          uri: 'ai-first://principles',
          name: 'AI Design Principles',
          description: 'Five core AI-first design principles with research citations',
          mimeType: 'text/markdown',
        },
        {
          uri: 'ai-first://patterns',
          name: 'Design Patterns',
          description: 'Common AI UX patterns and implementation guidelines',
          mimeType: 'text/markdown',
        },
      ],
    };
  });

  /**
   * Read specific resource content
   */
  server.setRequestHandler(ReadResourceRequestSchema, async request => {
    const { uri } = request.params;

    if (uri.startsWith('ai-first://components/')) {
      const componentData = await getComponentByUri(uri);

      if (uri === 'ai-first://components/list') {
        const allComponents = await getAllComponents();
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(allComponents, null, 2),
            },
          ],
        };
      }

      if (componentData) {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(componentData, null, 2),
            },
          ],
        };
      }
    }

    if (uri.startsWith('ai-first://tokens/')) {
      const category = uri.replace('ai-first://tokens/', '');
      const tokens = await getTokensByCategory(category);

      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(tokens, null, 2),
          },
        ],
      };
    }

    if (uri === 'ai-first://principles') {
      return {
        contents: [
          {
            uri,
            mimeType: 'text/markdown',
            text: `# AI-First Design Principles

1. **Transparency** - Users must always know when AI is involved
   - Research: IBM Carbon for AI (2024)
   - Implementation: Use ai-label component, aiGenerated props

2. **Explainability** - AI decisions should be understandable
   - Research: SAP Fiori Explainable AI, Microsoft HAX Guideline #7
   - Implementation: Use ai-explainability-panel with What/Why/How levels

3. **Human-Centered** - AI enhances, doesn't replace
   - Research: PatternFly AI Guidelines, IDEO AI & Design Thinking
   - Implementation: Provide accept/modify/reject options for AI outputs

4. **Contextual Assistance** - Help when and where needed
   - Research: Microsoft HAX Guideline #5
   - Implementation: Smart timing, discoverable but not intrusive

5. **User Control** - Users can override AI decisions
   - Research: Microsoft HAX Guideline #10
   - Implementation: Provide undo, regenerate, edit capabilities`,
          },
        ],
      };
    }

    throw new Error(`Unknown resource: ${uri}`);
  });

  /**
   * List available tools
   */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'search_components',
          description: 'Search for design system components by name, description, or tags',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_component',
          description: 'Get detailed information about a specific component',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Component element name (e.g., ai-button)',
              },
            },
            required: ['name'],
          },
        },
        {
          name: 'get_usage_example',
          description: 'Get usage examples for a component in different frameworks',
          inputSchema: {
            type: 'object',
            properties: {
              component: {
                type: 'string',
                description: 'Component name',
              },
              framework: {
                type: 'string',
                description: 'Framework (vanilla, react, vue, svelte)',
                enum: ['vanilla', 'react', 'vue', 'svelte'],
              },
            },
            required: ['component'],
          },
        },
      ],
    };
  });

  /**
   * Handle tool calls
   */
  server.setRequestHandler(CallToolRequestSchema, async request => {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error('Missing arguments');
    }

    if (name === 'search_components') {
      const results = await searchComponents(args.query as string);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    if (name === 'get_component') {
      const uri = `ai-first://components/${args.name}`;
      const component = await getComponentByUri(uri);

      if (!component) {
        return {
          content: [
            {
              type: 'text',
              text: `Component not found: ${args.name}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(component, null, 2),
          },
        ],
      };
    }

    if (name === 'get_usage_example') {
      const uri = `ai-first://components/${args.component}`;
      const component = await getComponentByUri(uri);

      if (!component) {
        return {
          content: [
            {
              type: 'text',
              text: `Component not found: ${args.component}`,
            },
          ],
        };
      }

      const framework = (args.framework as string) || 'vanilla';
      const example = component.examples.find(
        (ex: { framework: string; code: string; description: string }) => ex.framework === framework
      );

      if (!example) {
        return {
          content: [
            {
              type: 'text',
              text: `No ${framework} example available for ${args.component}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: `${example.description}\n\n\`\`\`${framework === 'vanilla' ? 'html' : framework}\n${example.code}\n\`\`\``,
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  // Start server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('AI-First Design System MCP Server running on stdio');
}

main().catch(error => {
  console.error('Server error:', error);
  process.exit(1);
});
