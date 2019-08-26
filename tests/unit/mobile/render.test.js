import renderGalleryItems from '../../../src/js/mobile/render.js'
import { snapshot } from '../../helper/snapshot'

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
  const result = snapshot(renderGalleryItems(state))
  // https://www.textfixer.com/tools/remove-line-breaks.php
  const html = '<div class="smb-gallery-item"> <div class="smb-gallery-media ImageObject"> <div class="embed-responsive" style="padding-bottom: 50%"> <img class="embed-responsive-item lazy" data-src="//static.kino.de/wp-content/uploads/2018/05/geplante-star-wars-filme-7-rcm480x0u.jpg" alt=""> </div> </div> <div class="smb-gallery-info"> <small>Bildquelle: Disney</small> </div> <div class="smb-gallery-content"> <h1>Headline 1</h1> Description 1 </div> <div class="smb-gallery-ed-container"> <div data-slotname="galleryad"></div> </div> </div><div class="smb-gallery-item"> <div class="smb-gallery-media SocialMediaPosting"> <div data-role="embedo" data-url="https://www.instagram.com/p/BcigIN3DAqE"></div> </div> <div class="smb-gallery-content"> <h2>Headline 2</h2> Description 2 </div> <div class="smb-gallery-ed-container"> <div data-slotname="galleryad2"></div> </div> </div><div class="smb-gallery-item"> <div class="smb-gallery-media VideoObject"> <iframe class="lazy" data-src="https://videos.kino.de/embed/1143168447"></iframe> </div> <div class="smb-gallery-content"> <h2>Headline 3</h2> Description 3 </div> <div class="smb-gallery-ed-container"> <div data-slotname="galleryad3"></div> </div> </div>'

  expect(result).toEqual(html)
})
