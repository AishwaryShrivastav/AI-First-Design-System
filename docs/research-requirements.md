# Research Requirements

## AI-First Philosophy: Every Component MUST Be Research-Backed

> **Non-Negotiable:** All components require 2+ research citations from 2023-2025

---

## Philosophy

This design system is **research-backed**, not opinion-based. Every component, pattern, and design decision must cite authoritative sources from the latest AI UX research (2023-2025).

**Why This Matters:**

- Ensures best practices from leading experts
- Prevents reinventing the wheel
- Builds trust with evidence-based design
- Keeps system aligned with latest AI UX standards

---

## Requirements

### Minimum Standards

**Every component MUST have:**

- ✅ **2+ research citations minimum**
- ✅ **Sources from 2023-2025** (latest research)
- ✅ **Citations in metadata** (ComponentMetadata.research)
- ✅ **Rationale explaining relevance**

**No exceptions.** PRs without research will be rejected.

---

## Valid Research Sources

### ✅ Tier 1: Design Systems (Preferred)

Research-backed design systems from major tech companies:

- **IBM Carbon for AI** (2024)
  - URL: https://carbondesignsystem.com/guidelines/carbon-for-ai/
  - Focus: AI transparency, confidence, chat patterns

- **Microsoft HAX Toolkit** (2023-2024)
  - URL: https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
  - Focus: 18 guidelines for Human-AI experiences

- **Google Material AI Patterns** (2024)
  - URL: https://material.io/blog/ai-design-patterns
  - Focus: Generative AI interfaces, prompt patterns

- **SAP Fiori Explainable AI** (2023)
  - URL: https://experience.sap.com/fiori-design-web/explainable-ai/
  - Focus: What/Why/How explainability patterns

- **PatternFly AI Guidelines** (2023)
  - URL: https://www.patternfly.org/patternfly-ai/ai-guidelines/
  - Focus: Human-centered AI design

---

### ✅ Tier 2: Industry Research (Valid)

Research from reputable AI UX sources:

- **shapeof.ai** - Exploration patterns in generative AI
- **aiuxpatterns.com** - Catalogued AI UX patterns
- **Nielsen Norman Group** - AI usability research (2024)
- **ideatheorem.com** - AI UX best practices (2024)
- **raw.studio** - Building trust through transparency (2024)
- **a16z** - Generative UI research (2024)

---

### ✅ Tier 3: Academic Papers (Valid)

Peer-reviewed research from top-tier conferences:

- **CHI** (ACM Conference on Human Factors)
- **UIST** (User Interface Software and Technology)
- **IUI** (Intelligent User Interfaces)
- **CSCW** (Computer-Supported Cooperative Work)
- **DIS** (Designing Interactive Systems)

**Requirements:**

- Published 2023 or later
- Peer-reviewed
- Cited in ACM Digital Library, IEEE Xplore, or similar

---

### ✅ Tier 4: Web Standards (Valid)

Official web standards for accessibility and best practices:

- **W3C WAI-ARIA Authoring Practices**
  - URL: https://www.w3.org/WAI/ARIA/apg/
  - For: Accessibility patterns

- **WCAG 2.2**
  - URL: https://www.w3.org/WAI/WCAG22/Understanding/
  - For: Accessibility compliance

---

### ❌ Invalid Sources

**Not acceptable:**

- ❌ Personal blog posts (unless from recognized experts with citations)
- ❌ Medium articles without research backing
- ❌ Social media posts
- ❌ Marketing content
- ❌ Pre-2023 sources (outdated for AI UX)
- ❌ Unverified claims
- ❌ Opinion pieces

---

## Citation Format

### In Component Metadata

```typescript
research: [
  {
    title: 'IBM Carbon for AI (2024) - Confidence Visualization Patterns',
    url: 'https://carbondesignsystem.com/guidelines/carbon-for-ai/',
    type: 'design-system',
    rationale: 'Visual confidence indicators build trust through transparency. Establishes color-coded levels (green/yellow/red) as industry standard.',
  },
  {
    title: 'Microsoft HAX #1 - Make Clear What the System Can Do',
    url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/',
    type: 'guideline',
    rationale: 'Setting appropriate user expectations through transparency. Confidence levels communicate AI capabilities and limitations.',
  },
],
```

### Required Fields

```typescript
{
  title: string; // Full citation with year
  url: string; // Direct link to source
  type: 'paper' | 'design-system' | 'guideline' | 'specification';
  rationale: string; // Why this research matters for this component
}
```

### In Component JSDoc

```typescript
/**
 * AI Confidence Meter Component
 *
 * Visual display of AI confidence levels...
 *
 * @element ai-confidence-meter
 *
 * @research IBM Carbon for AI (2024) - Confidence visualization
 * @research Microsoft HAX #1 - System transparency
 *
 * @example...
 */
@customElement('ai-confidence-meter')
export class AIConfidenceMeter extends LitElement {
  // ...
}
```

---

## Finding Good Research

### Step 1: Start with Tier 1 Sources

Check these first (most relevant):

1. IBM Carbon for AI
2. Microsoft HAX Toolkit
3. Google Material AI Patterns
4. SAP Fiori Explainable AI

### Step 2: Search Academic Literature

**Google Scholar:**

```
("generative AI" OR "LLM") AND ("user interface" OR "UX") AND 2024
```

**ACM Digital Library:**

```
[All: "ai interface"] AND [Publication Year: 2024]
filter: CHI, UIST, IUI conferences
```

### Step 3: Check Industry Research

- aiuxpatterns.com - Pattern catalog
- Nielsen Norman Group - AI usability reports
- shapeof.ai - Exploration patterns

### Step 4: Validate Source Quality

✅ **Good indicators:**

- From established design system
- Peer-reviewed publication
- Cited by others
- Written by recognized experts
- Includes methodology/evidence

❌ **Red flags:**

- No author credentials
- No methodology
- Marketing language
- Unsupported claims
- No citations

---

## Research Rationale

Don't just cite—**explain why it matters:**

### ❌ Bad Rationale

```typescript
rationale: 'This research talks about confidence levels.';
```

### ✅ Good Rationale

```typescript
rationale: 'Establishes visual confidence indicators as industry best practice for building user trust. Color-coded levels (green/yellow/red) provide instant comprehension while maintaining WCAG AA contrast requirements.';
```

**Good rationale includes:**

- Specific finding from research
- How it applies to this component
- Impact on user experience

---

## Examples by Component Type

### Conversational Components

**Sources to cite:**

- IBM Carbon Chat UI Patterns
- Microsoft HAX #3 (Time services appropriately)
- Google Material Conversational AI

**Example:**

```typescript
research: [
  {
    title: 'IBM Carbon for AI (2024) - Chat UI Patterns',
    url: 'https://carbondesignsystem.com/...',
    type: 'design-system',
    rationale:
      'Defines message bubble structure, streaming patterns, and avatar placement for optimal conversation flow.',
  },
];
```

---

### Transparency Components

**Sources to cite:**

- Microsoft HAX #1 (Make clear what system can do)
- IBM Carbon Transparency Guidelines
- SAP Fiori AI Labels

**Example:**

```typescript
research: [
  {
    title: 'Microsoft HAX #1 - Make Clear What the System Can Do',
    url: 'https://www.microsoft.com/en-us/haxtoolkit/',
    type: 'guideline',
    rationale:
      'Users must understand when AI is involved. Visual indicators (labels, badges) set appropriate expectations.',
  },
];
```

---

### Error Recovery Components

**Sources to cite:**

- Microsoft HAX #8 (Gracefully handle errors)
- ideatheorem.com (2024) - Error management
- Slash.co (2024) - Fallback patterns

**Example:**

```typescript
research: [
  {
    title: 'Microsoft HAX #8 - Support Efficient Correction',
    url: 'https://www.microsoft.com/en-us/haxtoolkit/',
    type: 'guideline',
    rationale:
      'AI errors are inevitable. Provide clear recovery paths and fallback options to maintain user trust.',
  },
];
```

---

## Validation Process

### Pre-PR Checklist

Before submitting a PR, verify:

- [ ] Component has 2+ research citations
- [ ] All sources from 2023-2025
- [ ] Citations in metadata.research array
- [ ] Each citation has rationale
- [ ] URLs are valid and accessible
- [ ] Research types are correct (design-system/guideline/paper/specification)
- [ ] JSDoc includes @research tags

### Reviewer Checklist

Reviewers will check:

- [ ] Minimum 2 citations present
- [ ] Sources are authoritative (Tier 1-4)
- [ ] Citations are recent (2023-2025)
- [ ] Rationales explain relevance
- [ ] URLs work and match claims

---

## Common Questions

### Q: Can I cite older research (pre-2023)?

**A:** Generally no. AI UX is rapidly evolving. For foundational concepts (WCAG, ARIA), pre-2023 standards are fine. For AI-specific patterns, use 2023-2025.

### Q: What if I can't find 2 sources?

**A:** This indicates the component may be too novel or not needed. Consider:

1. Is this a proven pattern?
2. Can you adapt an existing pattern?
3. Should this be research first, component second?

### Q: Can I cite my own research?

**A:** Only if peer-reviewed and published in Tier 3 venues. Personal blogs do not count.

### Q: What about proprietary patterns?

**A:** If it's proprietary to your org, you need public research supporting the pattern's effectiveness.

---

## Updating Research

Research should be reviewed annually:

- Check for newer sources (2025+)
- Replace deprecated patterns
- Update URLs if sources moved
- Add newly published research

---

## Summary

**Non-Negotiable Requirements:**

1. ✅ 2+ research citations minimum
2. ✅ Sources from 2023-2025
3. ✅ Tier 1-4 valid sources
4. ✅ Clear rationale for each
5. ✅ Citations in metadata + JSDoc

**Follow these → Maintain research-backed quality! 📚**

---

_For component creation workflow, see: `docs/component-creation-guide.md`_
_For auto-discovery details, see: `docs/auto-discovery.md`_
