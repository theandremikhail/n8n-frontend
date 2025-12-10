export enum ToneOfVoice {
  Professional = 'Professional',
  Witty = 'Witty',
  Casual = 'Casual',
  Inspirational = 'Inspirational',
  Authoritative = 'Authoritative'
}

export enum ContentLength {
  Short = 'Short (300-500 words)',
  Medium = 'Medium (600-1000 words)',
  Long = 'Long (1200+ words)'
}

export enum Frequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
  BiWeekly = 'Bi-Weekly',
  Monthly = 'Monthly'
}

export interface NewsletterConfig {
  companyName: string;
  targetAudience: string;
  primaryTopic: string;
  tone: ToneOfVoice;
  length: ContentLength;
  frequency: Frequency;
  keyValues: string; // e.g., "Sustainability, Innovation"
  exampleTopic: string; // Used for the live preview generation
}

export interface GeneratedContent {
  subject: string;
  preheader: string;
  body: string;
}