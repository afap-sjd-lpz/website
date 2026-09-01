import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BookIcon, HeartIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import type { ResourceSort, ResourceType } from "@/sanity/queries";
import type {
  RESOURCES_QUERY_RESULT,
  TOPICS_QUERY_RESULT,
} from "@/sanity/sanity.types";

import { ResourceCard } from "./ResourceCard";
import {
  ResourceDesktopFilters,
  ResourceMobileFilters,
  ResourceSortSelect,
} from "./ResourceControls";
import { ResourcePagination } from "./ResourcePagination";

export interface ResourceLibraryProps {
  items: RESOURCES_QUERY_RESULT["items"];
  total: number;
  totalPages: number;
  currentPage: number;
  topics: TOPICS_QUERY_RESULT;
  topicSlug: string | null;
  resourceType: ResourceType | null;
  sort: ResourceSort;
}

export function ResourceLibrary({
  items,
  total,
  totalPages,
  currentPage,
  topics,
  topicSlug,
  resourceType,
  sort,
}: ResourceLibraryProps) {
  const controlProps = { topics, topicSlug, resourceType, sort };

  return (
    <Section
      aria-labelledby="resource-results-title"
      className="pt-8 sm:pt-10 lg:pt-10"
    >
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="resource-results-title"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Recursos disponibles
            </h2>
            <p className="mt-2 text-muted">
              {total === 1
                ? "1 recurso encontrado"
                : `${total} recursos encontrados`}
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <ResourceMobileFilters {...controlProps} />
            <ResourceSortSelect
              topicSlug={topicSlug}
              resourceType={resourceType}
              sort={sort}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <ResourceDesktopFilters {...controlProps} />

          <div className="min-w-0">
            {items.length > 0 ? (
              <div className="grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-border bg-surface px-6 py-12 text-center">
                <span
                  aria-hidden="true"
                  className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary"
                >
                  <BookIcon className="size-8" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-foreground">
                  No encontramos recursos con estos filtros
                </h3>
                <p className="mt-3 max-w-lg leading-7 text-muted">
                  Puedes probar otra combinación o volver a consultar todos los
                  recursos disponibles.
                </p>
                <LinkButton href="/recursos" intent="outline" className="mt-6">
                  Ver todos los recursos
                </LinkButton>
              </div>
            )}

            <ResourcePagination
              currentPage={currentPage}
              totalPages={totalPages}
              topicSlug={topicSlug}
              resourceType={resourceType}
              sort={sort}
            />
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 px-6 py-7 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <span
            aria-hidden="true"
            className="absolute -top-12 -right-8 size-36 rounded-full bg-secondary/15"
          />
          <span
            aria-hidden="true"
            className="absolute right-28 -bottom-12 size-24 rounded-full bg-accent/10"
          />

          <div className="relative flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-primary"
            >
              <HeartIcon className="size-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Información que orienta, acompaña y fortalece
              </h2>
              <p className="mt-2 max-w-2xl leading-7 text-muted">
                Conoce nuestras actividades y espacios de participación para
                personas y familias.
              </p>
            </div>
          </div>

          <LinkButton
            href="/comunidad"
            intent="outline"
            className="relative mt-6 w-full lg:mt-0 lg:w-auto"
          >
            Ir a Comunidad
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
