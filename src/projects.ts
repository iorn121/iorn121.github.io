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
    title: 'AtCoder',
    category: 'Study',
    image: './images/thumb_atcoder.png',
    url: 'https://atcoder.jp/users/Iorn',
  },
  {
    title: 'VRChat',
    category: 'Enjoy',
    image: './images/thumb_vrchat.jpg',
    url: 'https://vrchat.com/home/user/usr_0c1fec8f-a643-40f2-a884-80b5915a53d7',
  },
  {
    title: 'GasshoZukuri VR',
    category: 'Create',
    image: './images/thumb_gasshozukuriVR.jpg',
    url: './articles/create/gasshozukuri-vr/',
  },
  {
    title: 'Photograph',
    category: 'Create',
    image: './images/thumb_photograph.jpg',
    url: 'https://www.youtube.com/watch?v=qT6ygPjV_F0&t=0s',
  },
  {
    title: 'Movie',
    category: 'Create',
    image: './images/thumb_movie.png',
    url: 'https://www.youtube.com/watch?v=qT6ygPjV_F0&t=0s',
  },
  {
    title: 'Savonius Windmill',
    category: 'Create',
    image: './images/thumb_windmill.jpg',
    url: './articles/create/windmill/',
  },
  {
    title: 'ColorScheme Converter',
    category: 'Create',
    image: './images/thumb_colorscheme.png',
    url: 'https://www.youtube.com/watch?v=qT6ygPjV_F0&t=0s',
  },
  {
    title: 'Qiita',
    category: 'Study',
    image: './images/thumb_qiita.jpg',
    url: './articles/study/qiita/',
  },
  {
    title: 'GitHub',
    category: 'Study',
    image: './images/thumb_qiita.jpg',
    url: './articles/study/github/',
  },
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
