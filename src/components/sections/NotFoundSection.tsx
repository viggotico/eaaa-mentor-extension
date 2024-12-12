import styles from "./NotFoundSection.module.css";

export const NotFoundSection = () => {
  return (
    <section className="section" style={{ backgroundColor: 'var(--secondary-color-quiet-gray)' }}>
      <h1>404</h1>
      <h4>Siden du leder efter eksisterer ikke.</h4>
    </section>
  );
}
