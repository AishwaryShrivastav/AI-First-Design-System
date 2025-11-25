# Research-Backed References

Use this quick index to justify components, props, and patterns. Each row points to a trusted source.

| Area | What to cite | Trusted sources |
| --- | --- | --- |
| Transparency & labeling | Mark AI-generated output, show model/context | IBM Carbon for AI; Microsoft HAX Guideline #1; PatternFly AI transparency |
| Explainability | Progressive disclosure of What/Why/How | SAP Fiori Explainable AI; EU AI Act transparency clauses; Microsoft HAX Guideline #7 |
| User control & overrides | Allow edits, fallbacks, and opt-outs | Microsoft HAX Guideline #10; PatternFly human-in-control; Nielsen Norman Group control patterns |
| Accessibility defaults | Roles, labels, focus management | WAI-ARIA Authoring Practices; WCAG 2.2 AA; ARIA design patterns for widgets |
| Conversational UI | Message roles, streaming feedback, error states | OpenAI/Anthropic chat UX patterns; GitHub Copilot chat affordances; Nielsen Norman Group chatbot usability |
| Prompt inputs & suggestions | Inline guidance, templates, safeguards | Google PAIR people + AI guidelines; Microsoft Prompt UX research; Anthropic safety prompts |
| Confidence & feedback surfaces | Confidence badges, “why this” panels | SAP Fiori trust indicators; IBM Carbon confidence; ISO/IEC 25010 quality cues |
| Privacy & data handling | Input warnings, data boundaries | ISO/IEC 27001 controls; OWASP ASVS privacy; Microsoft Responsible AI Standard |
| Loading & streaming states | Progress hints, skeletons, latency budgets | Material Design progress indicators; Chrome UX latency guidance; Carbon loading patterns |
| Visual design tokens | Color contrast, motion, spacing | WCAG 2.2 contrast; Material Design motion; Tailwind baseline spacing; IBM Carbon tokens |

### How to use this table
- **In docs:** cite the source name next to a prop/slot description.
- **In code:** add short comments with the source when implementing AI affordances.
- **In reviews:** link to the relevant row instead of writing long explanations.
