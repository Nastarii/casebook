export type BlockType =
  | 'text'
  | 'image'
  | 'video'
  | 'code'
  | 'architecture'
  | 'timeline'
  | 'metrics'
  | 'decisions'
  | 'gallery'
  | 'references'
  | 'attachments';

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
}

export interface ChapterSummary {
  id: string;
  projectId: string;
  title: string;
  position: number;
}

export interface PageSummary {
  id: string;
  chapterId: string;
  title: string;
  slug: string;
  position: number;
}
