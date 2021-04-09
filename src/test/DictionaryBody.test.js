import React from 'react';
import renderer from 'react-test-renderer';
import DictionaryBody from '../componants/DictionaryBody';

test('renders correctly', () => {
    const tree = renderer
    .create(<DictionaryBody 
        word="gold" 
        realWord={true} 
        definition="Some Definition" 
        example="Some Example"/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});