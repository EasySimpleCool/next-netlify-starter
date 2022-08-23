import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const url = new URL("http://localhost:8888");
  url.pathname = "/api/products";

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  const products = data.products.edges
    .map(({ node }) => {
      return {
        id: node.id,
        title: node.title,
        imageSrc: node.featuredImage.url,
        imageAlt: node.title,
        price: node.priceRange.maxVariantPrice.amount,
        slug: node.handle,
      };
    })
    .filter(Boolean);

  return {
    props: { products },
  };
}

function Product({ product }) {
  return (
    <div>
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.imageSrc}
          alt={product.title}
          width={400}
          height={400}
        />
      </Link>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}

export default function Home({ products }) {
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
        <div>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
          <div>{JSON.stringify(products)}</div>
        </div>
      </main>
    </div>
  );
}
