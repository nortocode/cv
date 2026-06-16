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

export const slugifyTag = (tag: string) =>
  tag
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/#/g, "sharp")
    .replace(/\./g, "dot")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
};