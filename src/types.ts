export type Category = {
  id: string;
  label: string;
  shortLabel: string;
};

export type Source = {
  title: string;
  publisher: string;
  date: string;
  url: string;
  kind: string;
};

export type CaseRecord = {
  id: string;
  number: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  description: string;
  evidenceClassification: string;
  legalStatus: string;
  sources: Source[];
  lastVerified: string;
  editorialNotes: string;
};
