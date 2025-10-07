import { Metadata } from "next";
import {
  TypewriterEffectSmooth,
  Layout,
  AboutContent,
  TeamMembers,
} from "@/components/wrapper";

export const metadata: Metadata = {
  title: "STEAMer Academy | About",
  description:
    "Learn about STEAMer Academy and our mission to ignite a love for Science, Technology, Engineering, Arts, and Math in young minds.",
};

const teamMembers = [
  {
    name: "H. Mondal",
    role: "CEO & Founder",
    image: "/HmondalDiscordpfp.webp",
    content:
      "He sets the strategic goals and ensures STEAMer stays on track with its mission. Besides he does external representation and leadership team management.",
  },
  {
    name: "Muntasir Mahmud",
    role: "Chief Technology Officer",
    image: "/MuntasirDiscordpfp.webp",
    content:
      "Manages A-Z of technology related works of our organization and plays one of the most vital roles. He is also a great open source fighter and always helpful to all.",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <div className="space-y-16">
        <AboutContent />
        <section>
          <h2 className="mb-8 text-3xl font-bold">
            <TypewriterEffectSmooth
              words={[{ text: "Our" }, { text: "Team" }]}
            />
          </h2>
          <TeamMembers members={teamMembers} />
        </section>
      </div>
    </Layout>
  );
}
