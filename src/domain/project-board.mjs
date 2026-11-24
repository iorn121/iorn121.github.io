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

  static shuffle(items) {
    const array = [...items];
    for (let i = array.length - 1; i > 0; i -= 1) {
      const swap = Math.floor(Math.random() * (i + 1));
      const current = array[i];
      array[i] = array[swap];
      array[swap] = current;
    }
    return array;
  }

  static imageLoading(index) {
    return index >= 4 ? 'lazy' : 'eager';
  }

  /**
   * @param {string} category
   * @param {string} filter
   */
  static shows(category, filter) {
    return filter === 'ALL' || category === filter;
  }
}
