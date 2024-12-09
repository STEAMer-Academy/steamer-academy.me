import Image from "next/image";
import {
  Settings02Icon as Settings,
  ThumbsUpIcon as ThumbsUp,
  ZapIcon as Zap,
  SparklesIcon as Sparkles,
  HugeiconsProps,
} from "hugeicons-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0B0F17] p-8">
      <div className="m-auto flex w-full max-w-[1200px] items-stretch justify-between">
        <div className="w-[45%] space-y-20">
          <div>
            <Image
              src="/assets/Favicon/favicon.png"
              alt="STEAMer Academy"
              width={40}
              height={40}
              className="size-10"
            />
          </div>

          <div className="space-y-12">
            <Feature
              icon={Settings}
              title="Adaptable performance"
              description="Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks."
            />
            <Feature
              icon={ThumbsUp}
              title="Built to last"
              description="Experience unmatched durability that goes above and beyond with lasting investment."
            />
            <Feature
              icon={Zap}
              title="Great user experience"
              description="Integrate our product into your routine with an intuitive and easy-to-use interface."
            />
            <Feature
              icon={Sparkles}
              title="Innovative functionality"
              description="Stay ahead with features that set new standards, addressing your evolving needs better than the rest."
            />
          </div>
        </div>

        <div className="w-[45%]">{children}</div>
      </div>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<HugeiconsProps>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <Icon size={24} color="#60A5FA" />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-medium text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
