import dynamic from "next/dynamic";

const BlogList = dynamic(() => import("./BlogList"));
const Layout = dynamic(() => import("@/components/Layout"));
const TypewriterEffectSmooth = dynamic(() =>
  import("@/components/ui/typewriter-effect").then(
    (mod) => mod.TypewriterEffectSmooth,
  ),
);

export const revalidate = 3600; // Revalidate every hour

export default function BlogsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <TypewriterEffectSmooth words={[
          {
            text: "STEAMer",
          },
          {
            text: "Academy",
          },
          {
            text: "Blogs",
          },
        ]}
          className="text-center text-xl font-bold pt-6 pb-8"
        />
          <BlogList />
      </div>
    </Layout>
  );
}
