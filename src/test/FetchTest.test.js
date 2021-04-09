test('data is car', () => {
    return fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/car')
    .then(res => res.json())
    .then((data) => {
      expect(data[0].word).toBe('car');
    });
  });