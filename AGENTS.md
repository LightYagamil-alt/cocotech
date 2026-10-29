 # Project architecture

- Use the shared InkVideo component with WebM and MP4 sources, explicit muted playback, and mobile autoplay recovery; respect reduced motion with an explicit play option.
- Keep one shared SiteHeader on all pages; chat history uses a separate labeled History control, not another hamburger, to distinguish navigation from conversation tools.
- Chat uses a viewport-sized shell without SiteFooter and adapts its available height through visualViewport to keep the composer visible during mobile keyboard use.
- Define visual roles in src/styles.css and use the shared Button for interactive controls; glass is restricted to navigation and floating utilities, with solid conversation and form surfaces for legibility.