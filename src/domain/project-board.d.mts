export class ProjectBoard {
  static filters: string[];
  static normalizeFilter(raw: string | null | undefined): string;
  static shuffle<T>(items: readonly T[]): T[];
  static imageLoading(index: number): 'lazy' | 'eager';
  static shows(category: string, filter: string): boolean;
}
