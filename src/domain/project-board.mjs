/** ポートフォリオの棚。カテゴリでどれを見せるかを決める。 */
export class ProjectBoard {
  static filters = ['ALL', 'Enjoy', 'Study', 'Create'];

  /**
   * @param {string | null | undefined} raw
   * @returns {'ALL' | 'Enjoy' | 'Study' | 'Create'}
   */
  static normalizeFilter(raw) {
    if (!raw) return 'ALL';
    const found = ProjectBoard.filters.find((filter) => filter.toLowerCase() === raw.toLowerCase());
    return found ?? 'ALL';
  }

  /**
   * @param {string} category
   * @param {string} filter
   */
  static shows(category, filter) {
    return filter === 'ALL' || category === filter;
  }
}
