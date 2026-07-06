export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  large: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  button: string;
  popular?: boolean;
}

export interface Faq {
  question: string;
}