import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-6xl items-center px-6 pb-20 pt-8">
      <motion.article
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-5 text-sm uppercase tracking-[0.22em] text-moss-600">
          Livro digital vivo
        </p>
        <h1 className="font-display text-5xl leading-tight text-ink-950 md:text-7xl">
          Projetos merecem ser lidos, nao apenas armazenados.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-600">
          Casebook organiza conhecimento em capitulos, paginas e blocos narrativos para preservar
          decisoes, arquitetura e descobertas com uma experiencia editorial premium.
        </p>
        <Link
          className="mt-10 inline-flex items-center gap-3 border-b border-brass-500 pb-2 text-sm font-medium uppercase tracking-[0.16em] text-ink-950 transition-colors hover:text-brass-500"
          to="/projects/genesis/read"
        >
          Abrir leitor
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </motion.article>
    </section>
  );
}
