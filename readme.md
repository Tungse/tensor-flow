# SMB GALLERY

---

## 😯 Notable features

### Lazyloading by Intersection Observer API

We use our well known default library here: https://github.com/verlok/lazyload

### No reflow on scroll

Images and Ads are loaded in preserved boxes - this is good for performance and better UX.

## 👾 Dependencies

- window.adLoader has to be defined; see: [https://github.com/smb-ag/smb-adloader](https://github.com/smb-ag/smb-adloader)
- lazyloading has to be setup with `elements_selector` set to `.lazyload `; see: [https://github.com/verlok/lazyload](https://github.com/verlok/lazyload)
- window.smbt has to be defined; see [https://github.com/smb-ag/smb-tracking](https://github.com/smb-ag/smb-tracking)

## 👨‍💻 Getting started - HTML

In order to make your gallery be injected in your html, you must provide some containers and make them easy selectable e.g. by some `data-` attributes. See below:

### The Stage

**On Desktop:** the media (image, video, social-media posting, etc.) for the current gallery page is shown here. In addition there is an arrow navigation to open next/prev pages.

**On Mobile:** not needed

```html
  <div data-role="gallery-stage"></div>
```

### The Body

**On Desktop:** the description for the current page is shown here. In addition there is an button navigation to open next/prev pages and user can navigate back to article.

**On Mobile:** the gallery with all pages is rendered here in one step. Each page consists of media, description and an advertisment-container.

```html
  <div data-role="gallery-content"></div>
```

### Real World Example

An "default" article page should be a good starting point for smbGallery. But at the end it will work in every container you provide.

```twig
  <header class="main-header"></header>
  ...
  <div class="main-container">
  	{% if getContext('device.category') == "desktop" %}
    <div data-role="gallery-stage">
      <!-- desktop only -->
      <!-- gallery page media will appear here -->
    </div>
    {% endif %}
    <div class="row">
      <div class="main-body">
        <div data-role="gallery-content">
          <!-- desktop: gallery page text will appear here -->
          <!-- mobile: gallery will appear here -->
        </div>
        ...
        <div data-role="article-rating"></div>
        <div data-role="taboola"></div>
      </div>
      <div class="main-aside">
        <div data-sdg-ad="rectangle">
          <!-- is reloaded on every PI -->
        </div>
      </div>
    </div>
  </div>
  ...
  <footer class="main-footer"></footer>
```

## 👨‍💻 Getting started - Stylesheets

In order to make your gallery be styled you have to import the right stylesheet depending on desktop/mobile environment. See below:

### Mobile
```scss
// main-mobile.scss
@import "node_modules/smb-gallery/src/mobile";
```

### Desktop
```scss
// main-desktop.scss
@import "node_modules/smb-gallery/src/desktop";
```
## 👨‍💻 Getting started - Script
smb-gallery is exported as `umd`-module so there are. See below:

### Include via es6 module

#### Mobile
```javascript
import smbGalleryMobile from 'smbGallery/src/mobile'

smbGalleryMobile.init({
  dataSelector: '#data',
  contentSelector: '#content',
})
```

#### Desktop
```javascript
import smbGalleryMobile from 'smbGallery/src/desktop'

smbGalleryDesktop.init({
  dataSelector: '#data',
  stageSelector: '#stage',
  contentSelector: '#content',
})
```

### Include via RequireJS

#### Mobile
```javascript
require('path_to_smb-gallery_mobile', function(smbGalleryMobile) {
	smbGalleryMobile.init({
	  dataSelector: '#data',
	  contentSelector: '#content',
	})
})
```

#### Desktop
```javascript
require('path_to_smb-gallery_desktop', function(smbGalleryDesktop) {
	smbGalleryMobile.init({
	  dataSelector: '#data',
	  stageSelector: '#stage',
	  contentSelector: '#content',
	})
})
```

## 🔌 Options

Here's the list of the options to change gallery behaviour:

### `iamMode` - Int

Set the mode for the iom.c(data, iamMode) function. Documented here: http://www.oewa.at/Implementierung#c1527

- `0`: Default mode - using document.write()
- `1`: Default mode - using AppendChild()
- `2`: Default mode - using newImage()

### `adMode` - Int

Set the mode for advertisement on mobile

- `1`:  Ads named with `topmobile2`, `topmobile3`, `topmobile4`, `topmobile5`, `topmobile6`
- `2`:  Ads named with `galleryad2`, `galleryad3`, `galleryad4`, `galleryad5`
- default: `1`


## 😋 Tips & tricks
