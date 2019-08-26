import renderGalleryItems from '../../../src/js/mobile/render.js'

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
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@type': 'SocialMediaPosting',
            'datePublished': '2018-10-05T14:28:22',
            'description': 'Description 2',
            'headline': 'Headline 2',
            'url': 'https://www.example.de/page-2',
            'sharedContent': {
              '@type': 'WebPage',
              'url': 'https://www.instagram.com/p/BcigIN3DAqE',
            },
          },
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'item': {
            '@type': 'VideoObject',
            'caption': '',
            'embedUrl': 'https://videos.kino.de/embed/1143168447',
            'copyrightHolder': '',
            'copyrightYear': '',
            'datePublished': '2018-10-05T14:28:22',
            'description': 'Description 3',
            'headline': 'Headline 3',
            'thumbnail': '',
            'url': 'https://www.example.de/page-3',
            'videoFrameSize': '???',
          },
        },
      ],
    },
    currentPage: 2,
  }

  const tree = renderGalleryItems(state)
  expect(tree).toMatchSnapshot()
})
