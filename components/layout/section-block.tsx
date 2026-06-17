import type { ReactNode } from "react";
import type { DissertationSection } from "@/types/dissertation";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaway } from "@/components/layout/key-takeaway";

type SectionBlockProps = {
  section: DissertationSection;
  children?: ReactNode;
};

export function SectionBlock({ section, children }: SectionBlockProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-t py-10 first:border-t-0 md:py-14"
    >
      <div className="mb-7 max-w-3xl">
        <Badge variant="secondary">{section.eyebrow}</Badge>
        <h2 className="title-font mt-4 text-3xl font-bold tracking-normal md:text-4xl">
          {section.title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {section.summary}
        </p>
      </div>

      <div className="grid min-w-0 gap-7">
        <div className="max-w-3xl space-y-5 text-base leading-8">
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {section.takeaways?.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {section.takeaways.map((takeaway) => (
              <KeyTakeaway key={takeaway}>{takeaway}</KeyTakeaway>
            ))}
          </div>
        ) : null}

        {section.details?.length ? (
          <Accordion type="multiple" className="max-w-3xl">
            {section.details.map((detail) => (
              <AccordionItem key={detail.title} value={detail.title}>
                <AccordionTrigger>{detail.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    {detail.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : null}

        {children}
      </div>
    </section>
  );
}
