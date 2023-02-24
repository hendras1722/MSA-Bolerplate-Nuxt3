export interface DatasPost {
  id?: number;
  title: string;
  excert?: string;
  postUrl?: string;
  cover?: Cover;
  datePublished?: string;
  author?: Author;
}

export interface Author {
  profilePicture: Cover;
}

export interface Cover {
  url: string;
}

const qwe = (value: DatasPost[]): void => {
  console.log(value);
};
console.log(qwe([{ title: "wwewe" }]));
