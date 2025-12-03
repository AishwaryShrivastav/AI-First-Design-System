import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai/ai-skeleton';

/**
 * AI skeleton loader component for content placeholders during AI generation.
 *
 * ## Features
 * - Multiple variants (text, circular, rectangular, custom)
 * - Shimmer animation
 * - Customizable dimensions
 * - Multiple text lines support
 * - AI-aware loading states
 *
 * ## Accessibility
 * - aria-busy for screen readers
 * - aria-label describing loading state
 *
 * ## References
 * - Material Design skeleton patterns
 * - Modern loading patterns from Vercel, GitHub
 * - [WCAG 2.2 Loading States](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)
 */
const meta: Meta = {
  title: 'AI Components/Skeleton',
  component: 'ai-skeleton',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'custom'],
      description: 'Skeleton variant',
    },
    width: {
      control: 'text',
      description: 'Width (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Height (CSS value)',
    },
    animated: {
      control: 'boolean',
      description: 'Enable shimmer animation',
    },
    lines: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Number of text lines (for text variant)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'text',
  },
  render: args =>
    html`<ai-skeleton
      variant=${args.variant}
      width=${args.width || ''}
      height=${args.height || ''}
      ?animated=${args.animated}
      lines=${args.lines || 1}
    ></ai-skeleton>`,
};

export const TextSingleLine: Story = {
  render: () => html`<ai-skeleton variant="text" lines="1"></ai-skeleton>`,
};

export const TextMultipleLines: Story = {
  render: () => html`<ai-skeleton variant="text" lines="3"></ai-skeleton>`,
};

export const Circular: Story = {
  render: () => html`<ai-skeleton variant="circular" width="40px" height="40px"></ai-skeleton>`,
};

export const CircularSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ai-skeleton variant="circular" width="24px" height="24px"></ai-skeleton>
      <ai-skeleton variant="circular" width="40px" height="40px"></ai-skeleton>
      <ai-skeleton variant="circular" width="64px" height="64px"></ai-skeleton>
      <ai-skeleton variant="circular" width="96px" height="96px"></ai-skeleton>
    </div>
  `,
};

export const Rectangular: Story = {
  render: () => html`<ai-skeleton variant="rectangular" width="100%" height="200px"></ai-skeleton>`,
};

export const RectangularSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <ai-skeleton variant="rectangular" width="100%" height="100px"></ai-skeleton>
      <ai-skeleton variant="rectangular" width="100%" height="150px"></ai-skeleton>
      <ai-skeleton variant="rectangular" width="100%" height="200px"></ai-skeleton>
    </div>
  `,
};

export const Custom: Story = {
  render: () => html`<ai-skeleton variant="custom" width="300px" height="50px"></ai-skeleton>`,
};

export const Animated: Story = {
  args: {
    animated: true,
  },
  render: args =>
    html`<ai-skeleton variant="text" lines="3" ?animated=${args.animated}></ai-skeleton>`,
};

export const Static: Story = {
  args: {
    animated: false,
  },
  render: args =>
    html`<ai-skeleton variant="text" lines="3" ?animated=${args.animated}></ai-skeleton>`,
};

export const ChatMessageSkeleton: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
      <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
        <ai-skeleton variant="circular" width="40px" height="40px"></ai-skeleton>
        <div style="flex: 1;">
          <ai-skeleton variant="text" lines="2" width="60%"></ai-skeleton>
        </div>
      </div>
      <ai-skeleton variant="text" lines="4"></ai-skeleton>
    </div>
  `,
};

export const CardSkeleton: Story = {
  render: () => html`
    <div
      style="max-width: 300px; border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;"
    >
      <ai-skeleton variant="rectangular" width="100%" height="200px"></ai-skeleton>
      <div style="padding: 1rem;">
        <ai-skeleton variant="text" lines="1" width="80%"></ai-skeleton>
        <div style="margin-top: 0.5rem;">
          <ai-skeleton variant="text" lines="3"></ai-skeleton>
        </div>
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
          <ai-skeleton variant="rectangular" width="60px" height="32px"></ai-skeleton>
          <ai-skeleton variant="rectangular" width="60px" height="32px"></ai-skeleton>
        </div>
      </div>
    </div>
  `,
};

export const ListSkeleton: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem;">
          <ai-skeleton variant="circular" width="48px" height="48px"></ai-skeleton>
          <div style="flex: 1;">
            <ai-skeleton variant="text" lines="2"></ai-skeleton>
          </div>
        </div>
        <div style="display: flex; gap: 1rem;">
          <ai-skeleton variant="circular" width="48px" height="48px"></ai-skeleton>
          <div style="flex: 1;">
            <ai-skeleton variant="text" lines="2"></ai-skeleton>
          </div>
        </div>
        <div style="display: flex; gap: 1rem;">
          <ai-skeleton variant="circular" width="48px" height="48px"></ai-skeleton>
          <div style="flex: 1;">
            <ai-skeleton variant="text" lines="2"></ai-skeleton>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Text (3 lines)</h4>
        <ai-skeleton variant="text" lines="3"></ai-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Circular</h4>
        <ai-skeleton variant="circular" width="64px" height="64px"></ai-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Rectangular</h4>
        <ai-skeleton variant="rectangular" width="100%" height="120px"></ai-skeleton>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Custom</h4>
        <ai-skeleton variant="custom" width="250px" height="40px"></ai-skeleton>
      </div>
    </div>
  `,
};
