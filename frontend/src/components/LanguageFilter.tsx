import { useState } from 'react';

const LanguageFilter = () => {
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);

    const handleLanguageChange = (language: string) => {
        setSelectedLanguages(prev =>
            prev.includes(language)
                ? prev.filter(lang => lang !== language)
                : [...prev, language]
        );
    };

    const languages = ['English', 'Hindi', 'Chinese'];

    return (
        <div className="w-full max-w-sm bg-[#282A2C] p-4 rounded-lg text-white">
            <label className="block text-sm font-medium text-gray-300 mb-3">Languages</label>
            <div className="space-y-2">
                {languages.map(lang => (
                    <div key={lang} className="flex items-center">
                        <input
                            id={`lang-${lang}`}
                            type="checkbox"
                            checked={selectedLanguages.includes(lang)}
                            onChange={() => handleLanguageChange(lang)}
                            className="w-4 h-4 text-sky-400 bg-gray-700 border-gray-600 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer"
                        />
                        <label htmlFor={`lang-${lang}`} className="ml-2 text-sm text-gray-200 select-none cursor-pointer">
                            {lang}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageFilter;
