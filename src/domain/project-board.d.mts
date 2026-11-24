export class ProjectBoard {
  static filters: string[];
  static normalizeFilter(raw: string | null | undefined): string;
  static shows(category: string, filter: string): boolean;
}
