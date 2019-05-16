# SMB GALLERY

---

## 😯 Notable features

### Seperated bundles for mobile and desktop

What? Are you crazy?

No! SMB Gallery works very different on mobile and desktop devices but have also a lot of shared code. To reduce complexity, increase maintainability and but also have everything in one place this is way we decided to go.

### Lazyloading by Intersection Observer API

We use our well known default library here: https://github.com/verlok/lazyload

### No reflow on scroll

Images and Ads are loaded in preserved boxes - this is good for performance and better UX.

## 👨‍💻 Getting started - HTML

In order to make your gallery be injected in your html, you must provide some containers and make them easy selectable e.g. by some `data-` attributes. See below.

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

In order to make your gallery be styled ypu have to import the right stylesheet depending on desktop/mobile environment. See below.

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

### Dependencies

#### Lazyloading

#### smbContext

#### smbt

## 😋 Tips & tricks

## 🔌 API
