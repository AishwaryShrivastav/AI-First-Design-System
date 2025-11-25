import type { ComponentMetadata } from '../../../core/src/metadata/types.js';
import {
  componentRegistry,
  getComponentMetadata,
  searchComponentMetadata,
} from '../../../core/src/metadata/component-registry.js';

/**
 * Get all available component resources
 */
export function getComponentResources(): Array<{
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}> {
  // Generate resources from registry
  const resources = componentRegistry.components.map((component: ComponentMetadata) => ({
    uri: `ai-first://components/${component.name}`,
    name: `${component.displayName} Component`,
    description: component.description,
    mimeType: 'application/json',
  }));

  return [
    {
      uri: 'ai-first://components/list',
      name: 'Component List',
      description: 'List of all available components in the AI-First Design System',
      mimeType: 'application/json',
    },
    ...resources,
  ];
}

/**
 * Get component metadata by URI
 */
export async function getComponentByUri(uri: string): Promise<ComponentMetadata | null> {
  const componentName = uri.replace('ai-first://components/', '');

  if (componentName === 'list') {
    // Return list will be handled by caller
    return null;
  }

  return getComponentMetadata(componentName) || null;
}

/**
 * Get all component metadata
 */
export async function getAllComponents(): Promise<ComponentMetadata[]> {
  return componentRegistry.components;
}

/**
 * Search components by query
 */
export async function searchComponents(query: string): Promise<ComponentMetadata[]> {
  return searchComponentMetadata(query);
}
