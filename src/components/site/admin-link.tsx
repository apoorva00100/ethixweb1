// Plain anchor on purpose. The admin is behind a login and gains nothing from prefetching or instant
// client navigation, and soft navigations into per-request pages trip Cache Components' validation.
// A full page load always renders the page normally.
export function AdminLink(props: React.ComponentProps<"a">) {
  return <a {...props} />;
}
