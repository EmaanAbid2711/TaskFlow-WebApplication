import type {Feature, PricingPlan, Faq} from "../interfaces/landing";

export const features: Feature[] = [
  {
    icon: "📊",
    title: "Visual Kanban Workflows",
    description: "Drag, drop, and organize tasks with intuitive Kanban boards. Customize columns to match your team's unique development lifecycle.",
    large: true,
    id: 0
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    description: "Mention teammates, share files, and leave feedback directly on tasks. Keep the conversation where the work happens.",
    id: 1,
    large: false
  },
  {
    icon: "📈",
    title: "Real-time Analytics",
    description: "Identify bottlenecks before they happen with live burndown charts and team velocity reports.",
    id: 2,
    large: false
  },
  {
    icon: "💠",
    title: "Universal Integrations",
    description: "Connect with GitHub, Slack, Jira, and 50+ other tools your team already uses daily.",
    large: true,
    id: 3
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and side projects.",
    button: "Start for Free",
    features: [
      "Up to 3 Projects",
      "Basic Kanban",
      "1GB Storage",
    ],
  },

  {
    name: "Pro",
    price: "$12",
    description: "For growing teams and startups.",
    button: "Get Started",
    popular: true,
    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "10GB Storage",
      "Priority Support",
    ],
  },

  {
    name: "Enterprise",
    price: "$39",
    description: "For organizations with scale.",
    button: "Contact Sales",
    features: [
      "SSO & SAML",
      "Custom Security",
      "Unlimited Storage",
    ],
  },
];

export const faqItems: Faq[] = [
  {
    question: "How secure is my data?",
  },
  {
    question: "Can I import from Trello or Jira?",
  },
  {
    question: "Is there a mobile app?",
  },
];