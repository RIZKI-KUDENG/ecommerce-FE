export default async function ProductDetailPage( props :  any) {
    const {id, slug} = await props.params;
    const res = await fetch(`http://localhost:3001/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return <p>Product Not Found</p>;

  const data = await res.json();
  console.log(data);
  const product = data.data;
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <img src={product.image} alt="" />
        </div>
    );
}