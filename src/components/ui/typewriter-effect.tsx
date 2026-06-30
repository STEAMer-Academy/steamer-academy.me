"use client";

import { cn } from "@/lib/utils";
import {
  LazyMotion,
  domAnimation,
  m,
  stagger,
  useAnimate,
  useInView,
  type AnimationScope,
} from "framer-motion";
import { useEffect } from "react";

const TypewriterWords = ({
  wordsArray,
  scope,
}: {
  wordsArray: {
    text: string[];
    className?: string;
  }[];
  scope: AnimationScope<HTMLDivElement>;
}) => {
  return (
    <m.div ref={scope} className="inline">
      {wordsArray.map((word) => {
        const wordKey = word.text.join("");
        return (
          <div key={wordKey} className="inline-block">
            {word.text.map((char, index) => (
              <m.span
                initial={{}}
                key={`${char}-${index}`}
                className={cn(
                  `hidden text-black opacity-0 dark:text-white`,
                  word.className,
                )}
              >
                {char}
              </m.span>
            ))}
            &nbsp;
          </div>
        );
      })}
    </m.div>
  );
};

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        },
      );
    }
  }, [isInView, animate]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "text-3xl font-bold",
          "flex items-center justify-center",
          className,
        )}
      >
        <div className="relative max-w-full overflow-hidden">
          <TypewriterWords wordsArray={wordsArray} scope={scope} />
          <m.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={cn(
              "absolute top-0 right-0 inline-block h-8 w-[4px] rounded-sm bg-blue-500",
              cursorClassName,
            )}
          ></m.span>
        </div>
      </div>
    </LazyMotion>
  );
};

const TypewriterWordsSmooth = ({
  wordsArray,
}: {
  wordsArray: {
    text: string[];
    className?: string;
  }[];
}) => {
  return (
    <div className="inline-block">
      {wordsArray.map((word) => {
        const wordKey = word.text.join("");
        return (
          <div key={wordKey} className="inline-block">
            {word.text.map((char, index) => (
              <span
                key={`${char}-${index}`}
                className={cn(`text-black dark:text-white`, word.className)}
              >
                {char}
              </span>
            ))}
            &nbsp;
          </div>
        );
      })}
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "text-3xl font-bold",
          "flex items-center justify-center",
          className,
        )}
      >
        <div className="relative max-w-full overflow-hidden">
          <m.div
            className="inline-block"
            initial={{
              width: "0%",
            }}
            whileInView={{
              width: "fit-content",
            }}
            transition={{
              duration: 2,
              ease: "linear",
              delay: 1,
            }}
          >
            <div className="whitespace-nowrap">
              <TypewriterWordsSmooth wordsArray={wordsArray} />{" "}
            </div>{" "}
          </m.div>
          <m.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={cn(
              "absolute top-0 right-0 inline-block h-8 w-[4px] rounded-sm bg-blue-500",
              cursorClassName,
            )}
          ></m.span>
        </div>
      </div>
    </LazyMotion>
  );
};
