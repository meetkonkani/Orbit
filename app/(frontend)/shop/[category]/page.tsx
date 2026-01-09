import ShopPage from "../page";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  // Resolve the dynamic route parameter
  const resolvedParams = await params;
  
  // Format the category to match your CATEGORIES constant (e.g., "hoodies" -> "HOODIES")
  const category = decodeURIComponent(resolvedParams.category).toUpperCase();

  // Create a searchParams promise that matches the signature of your main ShopPage
  const searchParams = Promise.resolve({ category });

  return <ShopPage searchParams={searchParams} />;
}