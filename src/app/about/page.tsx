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
    image: "/assets/About/HmondalDiscordpfp.webp",
    content:
      "He sets the strategic goals and ensures STEAMer stays on track with its mission. Besides he does external representation and leadership team management.",
  },
  {
    name: "Muntasir Mahmud",
    role: "Chief Technology Officer",
    image: "/assets/About/MuntasirDiscordpfp.webp",
    content:
      "Manages A-Z of technology related works of our organization and plays one of the most vital roles. He is also a great open source fighter and always helpful to all.",
  },
  {
    name: "Ayman",
    role: "Chief Education Officer",
    image: "/assets/About/AymanDiscordpfp.webp",
    content:
      "Assesses student learning outcomes through evaluations, feedback mechanisms, and competition results. This helps ensure the effectiveness of the STEAMer programs and allows for adjustments if needed.",
  },
  {
    name: "Saoyad",
    role: "Chief Management Officer",
    image: "/assets/About/SaoyadDiscordpfp.webp",
    content:
      "He is responsible for the overall management of the organization, including the development and implementation of policies, procedures, and programs.",
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
