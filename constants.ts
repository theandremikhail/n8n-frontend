import { NewsletterConfig, ToneOfVoice, ContentLength, Frequency } from './types';

export const DEFAULT_CONFIG: NewsletterConfig = {
  companyName: '',
  targetAudience: '',
  primaryTopic: '',
  tone: ToneOfVoice.Professional,
  length: ContentLength.Medium,
  frequency: Frequency.Weekly,
  keyValues: '',
  exampleTopic: ''
};

export const STEPS = [
  { id: 1, title: 'Brand Identity', description: 'Define who you are' },
  { id: 2, title: 'Audience & Strategy', description: 'Who are we talking to?' },
  { id: 3, title: 'Style & Format', description: 'Shape the content' },
  { id: 4, title: 'Preview & Launch', description: 'Generate sample' }
];