import { renderStage, renderContent } from '../../../src/js/desktop/render.js'

test('Gallery markup is rendered as expected', () => {
  const state = {
    data: {
      itemListElement: [
        {
          '@type': 'ListItem',
          'position': 1,
          'item': {
            '@type': 'ImageObject',
            'caption': '',
            'contentUrl': '//static.kino.de/wp-content/uploads/2018/05/geplante-star-wars-filme-7.jpg',
            'copyrightHolder': 'Disney',
            'copyrightYear': '2018',
            'datePublished': '2018-10-05T14:28:22',
            'width': 3500,
            'height': 1750,
            'description': 'Description 1',
            'headline': 'Headline 1',
            'url': 'https://www.example.de',
          },
        },
      ],
    },
    currentPage: 1,
  }

  const stage = renderStage(state)
  expect(stage).toMatchSnapshot()

  const content = renderContent(state)
  expect(content).toMatchSnapshot()
})
