import { Article } from '../Article';
import { CommentAlreadyExistException } from '../CommentAlreadyExistException';

describe('Article', () => {
  let article: Article;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    article = new Article(
      'Lorem Ipsum',
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
    );
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('it should add a comment', () => {
    const text = 'Amazing article !!!';
    const author = 'Pablo Escobar';

    article.addComment(text, 'Pablo Escobar');

    expect(article.getComments()).toHaveLength(1);
    expect(article.getComments()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text, author })
      ])
    );
  });

  test('it should add a comment with the date of the day', () => {
    const now = new Date(2020, 0, 12);
    jest.setSystemTime(now);

    article.addComment('Amazing article !!!', 'Pablo Escobar');

    expect(article.getComments()).toHaveLength(1);
    expect(article.getComments()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ creationDate: now })
      ])
    );
  });

  test('it should add a comment with the provided date', () => {
    const now = new Date(2020, 0, 12);
    jest.setSystemTime(now);
    const creationDate = new Date(2022, 5, 20);

    article.addComment('Amazing article !!!', 'Pablo Escobar', creationDate);

    expect(article.getComments()).toHaveLength(1);
    expect(article.getComments()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ creationDate })
      ])
    );
  });

  test('it should throw an exception when adding existing comment', () => {
    article.addComment('Amazing article !!!', 'Pablo Escobar');

    expect(() => {
      article.addComment('Amazing article !!!', 'Pablo Escobar');
    }).toThrow(CommentAlreadyExistException);
    expect(article.getComments()).toHaveLength(1);
  });
});
