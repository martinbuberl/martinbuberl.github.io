# martinbuberl.com

This is the repository of my personal website [martinbuberl.com](https://martinbuberl.com/).

It is hosted directly from this repository as a [GitHub Pages](https://pages.github.com/) site.

## Prerequisites

Install [Ruby and Bundler](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/) if you don't have them already.
 
## Installation

This GitHub Pages site is [configured to be published from the `/docs` folder on the `master` branch](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch). Change directory to that folder `cd docs`.

Install Jekyll and other [dependencies](https://pages.github.com/versions/) from the [GitHub Pages](docs/Gemfile) gem:

```
bundle install
```

## Serve

To preview the Jekyll site locally run:

```
bundle exec jekyll serve
```

To preview the site with drafts, enable the `--drafts` switch `bundle exec jekyll serve --drafts`.

Then, load [http://localhost:4000/](http://localhost:4000/) in your browser.


## License

* Content: [CC BY-NC](http://creativecommons.org/licenses/by-nc/4.0/)
* Code: [MIT](https://opensource.org/licenses/MIT)
