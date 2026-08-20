import PageShell from "../../components/PageShell";

const recipes = [
  { title: "Attiéké au poisson braisé", description: "Un repas simple et raffiné à base d’attiéké, de poisson et d’épices locales." },
  { title: "Attiéké sauté aux légumes", description: "Une version végétarienne, colorée et pleine de fraîcheur." },
  { title: "Attiéké festive", description: "Une recette d’occasion pour les grands repas et les moments de partage." },
];

export default function RecettesPage() {
  return (
    <PageShell title="Recettes" description="Des inspirations gourmandes pour sublimer l’attiéké premium au quotidien.">
      <div className="grid gap-8 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe.title} className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="mt-4 text-sm leading-7 text-memel-brown">{recipe.description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
