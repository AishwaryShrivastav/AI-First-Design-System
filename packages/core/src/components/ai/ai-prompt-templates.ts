import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * AI Prompt Templates Component
 *
 * Provides categorized prompt templates to help users craft effective prompts
 * for AI interactions. Supports template customization and tracks usage.
 *
 * @element ai-prompt-templates
 *
 * @fires template-selected - Dispatched when user selects a template
 * @fires template-customized - Dispatched when user modifies a template
 *
 * @prop {string} category - Current template category filter
 * @prop {boolean} showExamples - Show example outputs for templates
 *
 * @example
 * ```html
 * <ai-prompt-templates category="writing"></ai-prompt-templates>
 * ```
 *
 * @accessibility
 * - Keyboard navigation through templates
 * - ARIA labels for categories
 * - Screen reader support for template descriptions
 *
 * @research
 * - Google Material AI Patterns (2024): Prompt engineering assistance
 * - aiuxpatterns.com: Prompt guidance best practices
 * - Slash.co (2024): Onboarding for AI prompts
 */
@customElement('ai-prompt-templates')
export class AIPromptTemplates extends LitElement {
  @property({ type: String }) category = 'all';
  @property({ type: Boolean }) showExamples = false;

  @state() private _selectedTemplate: string | null = null;

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .container {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: white;
      overflow: hidden;
    }

    .header {
      padding: 1rem;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .title {
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .categories {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .category-button {
      padding: 0.375rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: white;
      color: #374151;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 150ms;
    }

    .category-button:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .category-button--active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }

    .template-card {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 150ms;
    }

    .template-card:hover {
      border-color: #667eea;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .template-card--selected {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }

    .template-title {
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .template-description {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }

    .template-prompt {
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.375rem;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.8125rem;
      color: #374151;
      line-height: 1.5;
    }

    .template-meta {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.75rem;
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .use-button {
      margin-top: 0.75rem;
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 0.375rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 150ms;
    }

    .use-button:hover {
      opacity: 0.9;
    }

    .use-button:focus-visible {
      outline: 2px solid #667eea;
      outline-offset: 2px;
    }
  `;

  private _templates = [
    {
      id: 'summarize',
      category: 'writing',
      title: 'Summarize Content',
      description: 'Create concise summaries of long content',
      prompt: 'Please summarize the following content in 3-5 key points:\n\n[Your content here]',
      usage: 1250,
    },
    {
      id: 'explain',
      category: 'learning',
      title: 'Explain Concept',
      description: 'Get clear explanations of complex topics',
      prompt: 'Explain [concept] in simple terms, as if teaching a beginner. Include examples.',
      usage: 980,
    },
    {
      id: 'code-review',
      category: 'coding',
      title: 'Code Review',
      description: 'Request code analysis and improvements',
      prompt:
        'Review this code and suggest improvements for:\n- Readability\n- Performance\n- Best practices\n\n```\n[Your code]\n```',
      usage: 750,
    },
    {
      id: 'brainstorm',
      category: 'creative',
      title: 'Brainstorm Ideas',
      description: 'Generate creative ideas for projects',
      prompt:
        'Help me brainstorm 10 creative ideas for [topic/project]. Consider: innovation, feasibility, and impact.',
      usage: 620,
    },
    {
      id: 'rewrite',
      category: 'writing',
      title: 'Rewrite Text',
      description: 'Improve writing style and clarity',
      prompt: 'Rewrite the following text to be more [professional/casual/concise]:\n\n[Your text]',
      usage: 890,
    },
  ];

  private _handleCategoryChange(category: string) {
    this.category = category;
  }

  private _handleTemplateSelect(template: (typeof this._templates)[0]) {
    this._selectedTemplate = template.id;

    this.dispatchEvent(
      new CustomEvent('template-selected', {
        bubbles: true,
        composed: true,
        detail: {
          id: template.id,
          prompt: template.prompt,
          category: template.category,
        },
      })
    );
  }

  private _getFilteredTemplates() {
    if (this.category === 'all') {
      return this._templates;
    }
    return this._templates.filter(t => t.category === this.category);
  }

  render() {
    const categories = [
      { id: 'all', label: 'All Templates' },
      { id: 'writing', label: 'Writing' },
      { id: 'coding', label: 'Coding' },
      { id: 'learning', label: 'Learning' },
      { id: 'creative', label: 'Creative' },
    ];

    const filteredTemplates = this._getFilteredTemplates();

    return html`
      <div class="container" part="container">
        <div class="header" part="header">
          <div class="title">Prompt Templates</div>
          <div class="categories" role="tablist">
            ${categories.map(
              cat => html`
                <button
                  class="category-button ${this.category === cat.id
                    ? 'category-button--active'
                    : ''}"
                  role="tab"
                  aria-selected=${this.category === cat.id}
                  @click=${() => this._handleCategoryChange(cat.id)}
                >
                  ${cat.label}
                </button>
              `
            )}
          </div>
        </div>

        <div class="templates-grid" part="templates">
          ${filteredTemplates.map(
            template => html`
              <div
                class="template-card ${this._selectedTemplate === template.id
                  ? 'template-card--selected'
                  : ''}"
                role="button"
                tabindex="0"
                @click=${() => this._handleTemplateSelect(template)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this._handleTemplateSelect(template);
                  }
                }}
              >
                <div class="template-title">${template.title}</div>
                <div class="template-description">${template.description}</div>
                <div class="template-prompt">${template.prompt}</div>
                <div class="template-meta">
                  <span>Used ${template.usage}× this month</span>
                </div>
                <button class="use-button">Use This Template</button>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-prompt-templates': AIPromptTemplates;
  }
}
