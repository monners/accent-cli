export interface Language {
  name: string;
}

export interface Revision {
  id: string;
  language: Language;
}

export interface Project {
  id: string;
  name: string;
  revisions: Revision[];
}
