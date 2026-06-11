import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookMarked } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { sampleProject } from '../data/sampleProject';

function getReaderLocation(pageSlug?: string) {
  const pages = sampleProject.chapters.flatMap((chapter) =>
    chapter.pages.map((page) => ({ chapter, page })),
  );
  const foundIndex = pages.findIndex(({ page }) => page.slug === pageSlug);
  const activeIndex = foundIndex >= 0 ? foundIndex : 0;

  return {
    pages,
    activeIndex,
    activeChapter: pages[activeIndex].chapter,
    activePage: pages[activeIndex].page,
    previousPage: pages[activeIndex - 1]?.page,
    nextPage: pages[activeIndex + 1]?.page,
  };
}

export function ProjectReaderPage() {
  const { pageSlug } = useParams();
  const { activeChapter, activeIndex, activePage, nextPage, pages, previousPage } =
    getReaderLocation(pageSlug);

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-16 pt-4 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
        <div className="border-l border-paper-100 pl-5">
          <p className="text-sm uppercase tracking-[0.18em] text-moss-600">Projeto</p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink-950">
            {sampleProject.title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-ink-600">{sampleProject.summary}</p>
        </div>

        <nav aria-label="Indice do projeto" className="mt-10 space-y-8">
          {sampleProject.chapters.map((chapter) => (
            <section key={chapter.id}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-xl text-brass-500">{chapter.number}</span>
                <h2 className="font-display text-xl text-ink-950">{chapter.title}</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-600">{chapter.summary}</p>
              <ol className="mt-4 space-y-2">
                {chapter.pages.map((page) => {
                  const isActive = page.id === activePage.id;

                  return (
                    <li key={page.id}>
                      <Link
                        aria-current={isActive ? 'page' : undefined}
                        className={`block border-l px-4 py-2 text-sm transition-colors duration-200 ${
                          isActive
                            ? 'border-brass-500 text-ink-950'
                            : 'border-paper-100 text-ink-600 hover:border-moss-600 hover:text-ink-950'
                        }`}
                        to={`/projects/genesis/read/${page.slug}`}
                      >
                        {page.title}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </nav>
      </aside>

      <article className="min-w-0">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-paper-100 pb-5 text-sm text-ink-600">
          <span>
            Capitulo {activeChapter.number} - Pagina {activeIndex + 1} de {pages.length}
          </span>
          <span className="inline-flex items-center gap-2">
            <BookMarked aria-hidden="true" className="h-4 w-4 text-brass-500" />
            {activePage.readingTime}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePage.id}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-moss-600">{activePage.eyebrow}</p>
            <h2 className="mt-5 font-display text-5xl leading-tight text-ink-950 md:text-6xl">
              {activePage.title}
            </h2>
            <p className="mt-7 text-xl leading-9 text-ink-600">{activePage.excerpt}</p>

            <div className="mt-12 space-y-7 text-lg leading-9 text-ink-800">
              {activePage.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <footer className="mx-auto mt-16 flex max-w-3xl flex-col gap-3 border-t border-paper-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {previousPage ? (
            <Link
              className="inline-flex items-center gap-2 text-sm text-ink-600 transition-colors hover:text-ink-950"
              to={`/projects/genesis/read/${previousPage.slug}`}
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              {previousPage.title}
            </Link>
          ) : (
            <span />
          )}

          {nextPage ? (
            <Link
              className="inline-flex items-center gap-2 text-sm text-ink-600 transition-colors hover:text-ink-950"
              to={`/projects/genesis/read/${nextPage.slug}`}
            >
              {nextPage.title}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ) : (
            <span className="text-sm text-ink-600">Fim deste primeiro volume</span>
          )}
        </footer>
      </article>
    </section>
  );
}
