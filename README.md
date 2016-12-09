# clue-redux
Experimenting with off-the-shelf-components to make something like CLUE

[demo](https://mccalluc.github.io/clue-redux)

With Redux, it's important that your representation of state is immutable,
but it's [not clear](http://jlongster.com/Using-Immutable-Data-Structures-in-JavaScript)
what the best way of ensuring this is.

Another question is whether the presentation side can be decoupled ...
There are lots of tools for making presentations, and compelling the use
of ours could be a hard sell. Could we imagine a tool that would take
screen shots sequentially, and add them to a google presentation, or similar?

- Is it possible for JS to capture a screenshot? In [2012](https://www.html5rocks.com/en/tutorials/streaming/screenshare/) there was excitement about possibilities for screen sharing:
  - At one point it looked [HTML APIs](http://www.chromium.org/developers/design-documents/extensions/proposed-changes/apis-under-development/webrtc-tab-content-capture) would support this, and [proposals are still out there](https://www.w3.org/TR/screen-capture/).
    - But there are inescapable security problems, and [experimental browser support has been dropped](https://groups.google.com/forum/#!topic/discuss-webrtc/TPQVKZnsF5g).
  - So the most most viable, general solution after that seems to be [DOM rendering in JS](https://github.com/niklasvh/html2canvas), but it doesn't feel like it ever stabilized.
- Of course, if the entire visualization is in a canvas, you're set, but that's not very general.
- Or you could imagine just using a lot of iframes (if state is captured in the URL), but Google [took away support for HTML embedding](https://productforums.google.com/forum/#!topic/docs/rDiyU-ZBxqg), and folks are still weeping and gnashing their teeth.
- Or target some other format and allow download?
