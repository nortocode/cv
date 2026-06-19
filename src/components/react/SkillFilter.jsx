import { useState, useMemo, useEffect  } from 'react';
import Fuse from 'fuse.js';

export default function SkillFilter({ skills }) {
    const [query, setQuery] = useState('');

    const fuse = useMemo(() => {
        return new Fuse(skills, {
            threshold: 0.3,
            distance: 60,
            ignoreLocation: true,
        });
    }, [skills]);

    const filteredSkills = useMemo(() => {
        if (!query) return skills;
        return fuse.search(query).map((r) => r.item);
    }, [query, fuse, skills]);

    useEffect(() => {
        const event = new CustomEvent('skills-filtered', {
            detail: filteredSkills,
        })
        window.dispatchEvent(event);
    }, [filteredSkills]);

    return (
        <div className="flex flex-col gap-4 pl-6 mb-4">
        <input
            type="text"
            placeholder="...filtrar habilidades..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text"/>
        </div>
    );
};
