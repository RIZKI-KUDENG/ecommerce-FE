export default async function CategoryPage({ params }: any) {
  const { id, slug } = await params;

  const res = await fetch(`http://localhost:3001/products?category=${id}`);
  const result = await res.json();
  const products = result.data;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 capitalize">{slug}</h2>
      <div className="grid grid-cols-3 gap-3">
        {products.map((item: any) => (
          <a
            key={item.id}
            href={`/product/${item.id}/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex flex-col items-center"
          >
            <img src={item.image} className="w-20 h-20" />
            <p>{item.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
