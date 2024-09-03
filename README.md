# documented-track-event
This is experimental implementation of log tracker template.

Focuses:
- Document based tracking event
- Generate platform code from document
- User can define common parameter for tracking event
- User can define enum for tracking event

## Examples
Write markdowns:
- [type/user-type.mdx](https://github.com/MeilCliPages/documented-track-event/blob/master/src/content/type/user-type.mdx)
- [common/common-parameter.mdx](https://github.com/MeilCliPages/documented-track-event/blob/master/src/content/common/common-parameter.mdx)
- [event/impression-view.mdx](https://github.com/MeilCliPages/documented-track-event/blob/master/src/content/event/impression-view.mdx)

You can look documents:
- [type/user-type](https://documented-track-event.pages.dev/type/user-type/)
- [common/common-parameter](https://documented-track-event.pages.dev/common/common-parameter/)
- [event/impression-view](https://documented-track-event.pages.dev/event/impression-view/)

## Generating flow
```mermaid
flowchart TB
  subgraph AstroContent
    direction TB;
    parse_markdown["Parse markdown with frontmatter"]
    extract_definition["Extract definition such as Parameters or Values"]
    append_marker["Append marker for page linker or information appender"]
    parse_markdown-->extract_definition
    extract_definition-->append_marker
  end
  subgraph AstroPage
    direction TB;
    render_pages["Render pages"]
    generate_code["Generate code"]
    render_pages-->generate_code
    generate_html["Generate html"]
    generate_enum["Generate enum type page"]
    generate_common["Generate common parameter page"]
    replace_common_link["Link to enum type page"]
    generate_event["Generate event page"]
    replace_event_link["Link to enum type page"]
    append_common["Append common parameter information"]
    render_pages-->generate_html
    generate_html-->generate_enum
    generate_html-->generate_common
    generate_common-->replace_common_link
    generate_html-->generate_event
    generate_event-->replace_event_link
    replace_event_link-->append_common
  end
  AstroContent-->AstroPage
```

## License
MIT License.