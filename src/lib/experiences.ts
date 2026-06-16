let cache: any[] | null = null;

export const getExperiences = () => {
  if (cache) return cache;

  cache = Object.values(
    import.meta.glob('/src/pages/experiencia/*.mdx', { eager: true })
  ).sort(
    (a: any, b: any) =>
      new Date(b.frontmatter.date.start).getTime() -
      new Date(a.frontmatter.date.start).getTime()
  );

  return cache;
};

export const getTags = () => {
  const experiences = getExperiences();
  return Array.from(
    new Set(
      experiences.flatMap((exp: any) => exp.frontmatter.tags || [])
    )
  ).sort((a, b) => a.localeCompare(b));
};