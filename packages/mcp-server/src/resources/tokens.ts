/**
 * Design token resources for MCP server
 *
 * Provides design token information to AI tools.
 */

import type { TokenMetadata } from '../../../core/src/metadata/types.js';

/**
 * Get all token resources
 */
export function getTokenResources(): Array<{
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}> {
  return [
    {
      uri: 'ai-first://tokens/colors',
      name: 'Color Tokens',
      description: 'All color design tokens including AI-specific gradients',
      mimeType: 'application/json',
    },
    {
      uri: 'ai-first://tokens/typography',
      name: 'Typography Tokens',
      description: 'Font families, sizes, and text styling tokens',
      mimeType: 'application/json',
    },
    {
      uri: 'ai-first://tokens/spacing',
      name: 'Spacing Tokens',
      description: 'Spacing scale and layout tokens',
      mimeType: 'application/json',
    },
    {
      uri: 'ai-first://tokens/ai',
      name: 'AI-Specific Tokens',
      description: 'Tokens for AI transparency, confidence, and contextual awareness',
      mimeType: 'application/json',
    },
  ];
}

/**
 * Get tokens by category
 */
export async function getTokensByCategory(_category: string): Promise<TokenMetadata[]> {
  // TODO: Load from token package
  return [];
}

/**
 * Get all design tokens
 */
export async function getAllTokens(): Promise<TokenMetadata[]> {
  // TODO: Load from token package
  return [];
}
