import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-intro shell">
      <span className="eyebrow">404 / A WRONG TURN</span>
      <h1>
        This page
        <br />
        <em>isn’t here.</em>
      </h1>
      <p>Let’s get you back to the work.</p>
      <Link className="button primary" href="/projects/">
        Explore projects ↗
      </Link>
    </section>
  );
}
