export type ProjectCategory = 'Enjoy' | 'Study' | 'Create';

export type Project = {
  title: string;
  category: ProjectCategory;
  image: string;
  url: string;
};

// 既存のデータを TypeScript 化（画像はルート相対に変更せず、従来パス互換のため先頭に ./ を付与）
export const projects: Project[] = [
  {
    title: 'Running',
    category: 'Enjoy',
    image: './images/thumb_placeholder.svg',
    url: './articles/enjoy/running/',
  },

  {
    title: 'Bio',
    category: 'Enjoy',
    image: './images/thumb_placeholder.svg',
    url: './articles/enjoy/biography/',
  },
  {
    title: '色彩',
    category: 'Study',
    image: './images/thumb_placeholder.svg',
    url: './articles/study/color/',
  },

  {
    title: 'note',
    category: 'Create',
    image: './images/thumb_placeholder.svg',
    url: './articles/create/note/',
  },
];

export function shuffleArray<T>(input: readonly T[]): T[] {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
