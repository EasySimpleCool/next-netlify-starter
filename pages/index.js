import Head from "next/head";

export async function getStaticProps() {
  const url = new URL("http://localhost:3000");
  url.pathname = "/api/products";

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  const products = await res.json();

  return {
    props: { products },
  };
}

export default function Home(products) {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </main>
    </div>
  );
}
