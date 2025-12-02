import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ai-first-ds/core/components/ai/ai-explainability-panel';

/**
 * AI explainability panel with progressive disclosure (What/Why/How).
 *
 * ## Features
 * - Progressive disclosure levels (What/Why/How)
 * - Collapsible panels
 * - Clear explanations at each level
 * - Technical details for experts
 * - User-friendly interface
 *
 * ## Accessibility
 * - Keyboard navigation
 * - ARIA expanded state
 * - Clear headings for each level
 *
 * ## References
 * - [SAP Fiori Explainable AI](https://experience.sap.com/fiori-design-web/explainable-ai/)
 * - [Microsoft HAX Guideline #7](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)
 * - [WAI-ARIA Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
 */
const meta: Meta = {
  title: 'AI Components/Explainability Panel',
  component: 'ai-explainability-panel',
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['what', 'why', 'how'],
      description: 'Current disclosure level',
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow collapse/expand',
    },
    collapsed: {
      control: 'boolean',
      description: 'Initial collapsed state',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    level: 'what',
  },
  render: args =>
    html`<ai-explainability-panel
      level=${args.level}
      ?collapsible=${args.collapsible}
      ?collapsed=${args.collapsed}
    >
      <div slot="what">This action was recommended for your workflow.</div>
      <div slot="why">Based on your usage patterns over the last 30 days.</div>
      <div slot="how">Model: RandomForest, Confidence: 94%</div>
    </ai-explainability-panel>`,
};

export const WhatLevel: Story = {
  render: () => html`
    <ai-explainability-panel level="what">
      <div slot="what">This email was prioritized in your inbox.</div>
      <div slot="why">Based on your interaction history and sender importance.</div>
      <div slot="how">ML Model: BERT-based classifier, Confidence: 87%</div>
    </ai-explainability-panel>
  `,
};

export const WhyLevel: Story = {
  render: () => html`
    <ai-explainability-panel level="why">
      <div slot="what">This product was recommended to you.</div>
      <div slot="why">
        Based on your browsing history, purchase patterns, and similar user preferences. The
        recommendation considers factors like price range, brand preferences, and product categories
        you've shown interest in.
      </div>
      <div slot="how">Model: Collaborative Filtering + Content-Based, Confidence: 92%</div>
    </ai-explainability-panel>
  `,
};

export const HowLevel: Story = {
  render: () => html`
    <ai-explainability-panel level="how">
      <div slot="what">This code suggestion was generated.</div>
      <div slot="why">
        Based on the context of your current file, similar patterns in your codebase, and common
        best practices for this type of operation.
      </div>
      <div slot="how">
        <strong>Model:</strong> GPT-4 Code Completion<br />
        <strong>Confidence:</strong> 94%<br />
        <strong>Context Window:</strong> 8,000 tokens<br />
        <strong>Temperature:</strong> 0.2<br />
        <strong>Top-p:</strong> 0.95<br />
        <strong>Training Data:</strong> Public code repositories, Stack Overflow, documentation
      </div>
    </ai-explainability-panel>
  `,
};

export const Collapsible: Story = {
  render: () => html`
    <ai-explainability-panel level="why" collapsible>
      <div slot="what">This content was filtered from your feed.</div>
      <div slot="why">
        Our content moderation system identified potentially sensitive material based on your
        content preferences and community guidelines.
      </div>
      <div slot="how">Model: BERT-based content classifier, Confidence: 89%</div>
    </ai-explainability-panel>
  `,
};

export const Collapsed: Story = {
  render: () => html`
    <ai-explainability-panel level="what" collapsible collapsed>
      <div slot="what">This action was suggested by AI.</div>
      <div slot="why">Based on your previous actions and current context.</div>
      <div slot="how">Model: Decision Tree, Confidence: 76%</div>
    </ai-explainability-panel>
  `,
};

export const NonCollapsible: Story = {
  render: () => html`
    <ai-explainability-panel level="why" collapsible="false">
      <div slot="what">This recommendation is always visible.</div>
      <div slot="why">Important information that should always be displayed.</div>
      <div slot="how">Model: Rule-based system</div>
    </ai-explainability-panel>
  `,
};

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">
        Why did I see this ad?
      </h3>
      <ai-explainability-panel level="why" collapsible>
        <div slot="what">
          This advertisement was shown to you because it matches your interests and demographics.
        </div>
        <div slot="why">
          <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
            <li>You've visited similar websites in the past week</li>
            <li>You're in the target age range (25-34)</li>
            <li>You're located in a region where this product is available</li>
            <li>You've shown interest in related products</li>
          </ul>
        </div>
        <div slot="how">
          <strong>Targeting Model:</strong> Logistic Regression<br />
          <strong>Confidence Score:</strong> 0.82<br />
          <strong>Data Sources:</strong> First-party browsing data, aggregated demographic data<br />
          <strong>Privacy:</strong> No personal information was shared with the advertiser
        </div>
      </ai-explainability-panel>
    </div>
  `,
};

export const AllLevels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">What Level</h4>
        <ai-explainability-panel level="what">
          <div slot="what">High-level explanation visible.</div>
          <div slot="why">Reasoning hidden at this level.</div>
          <div slot="how">Technical details hidden at this level.</div>
        </ai-explainability-panel>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Why Level</h4>
        <ai-explainability-panel level="why">
          <div slot="what">High-level explanation visible.</div>
          <div slot="why">Reasoning visible at this level.</div>
          <div slot="how">Technical details hidden at this level.</div>
        </ai-explainability-panel>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">How Level</h4>
        <ai-explainability-panel level="how">
          <div slot="what">High-level explanation visible.</div>
          <div slot="why">Reasoning visible at this level.</div>
          <div slot="how">Technical details visible at this level.</div>
        </ai-explainability-panel>
      </div>
    </div>
  `,
};
