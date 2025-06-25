import { useState, useEffect, useRef } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import FontCard from './FontCard';

interface FontPreviewerProps {
  fontSize: number;
  selectedLanguages: string[];
  color?: string;
}

const FONTS_PER_PAGE = 10;

const languageSamples = [
  { lang: "English", text: "The quick brown fox jumps over the lazy dog." },
  { lang: "Nepali", text: "चाँडो खैरो घुम्ने लोमडी अल्छी कुकुरमाथि हाम फाल्छ।" },
  { lang: "Chinese", text: "那只敏捷的棕色狐狸跳过了懒狗。" },
  { lang: "French", text: "Voix ambiguë d'un cœur qui au zéphyr préfère les jattes de kiwis." },
  { lang: "German", text: "Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich." },
  { lang: "Czech", text: "Příliš žluťoučký kůň úpěl ďábelské ódy." },
  { lang: "Polish", text: "Stróż pchnął kość w quiz gędźb vel fax myjń." },
  { lang: "Greek", text: "Γκόλφω, βάδιζε μπροστά ξανθή ψυχή!" },
  { lang: "Hebrew", text: "עליך אבק נס דרך מגן שהתפוצץ כי חם." },
  { lang: "Hindi", text: "ऋषियों की तपस्या तथा युद्ध समाप्ति के राजा रावण का सर्वनाश करने वाले विष्णुावतार भगवान श्रीराम, अयोध्या के महाराज दशरथ के बड़े सुपुत्र थे।" },
];


const FontPreviewer: React.FC<FontPreviewerProps> = ({ fontSize, selectedLanguages, color }) => {
  const [previewText, setPreviewText] = useState('Type to preview fonts');
  const [fonts, setFonts] = useState<{ id: number; name: string; filePath: string; fontSize: number; languages: string[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSamples, setShowSamples] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popular'); // 'popular', 'new', 'az', 'za'

  // Mapping of language names to IDs
  const languageMap: { [key: string]: number } = {
    English: 1,
    Nepali: 2,
    Chinese: 3,
  };

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const langIds = selectedLanguages.map(lang => languageMap[lang]).filter(id => id !== undefined);
        const query = langIds.length > 0 ? `?langIds=${langIds.join('&langIds=')}` : '';
        const response = await fetch(`http://localhost:3000/api/fonts${query}`);
        if (!response.ok) throw new Error('Failed to fetch fonts');
        const data = await response.json();
        setFonts(data);
        setCurrentPage(1); // Reset to first page on filter change
      } catch (err) {
        setError('Error loading fonts. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFonts();
  }, [selectedLanguages]);

  // Hide popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSamples(false);
      }
    }
    if (showSamples) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSamples]);

  // Filter and sort fonts
  let filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (sortOption === 'az') {
    filteredFonts = filteredFonts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'za') {
    filteredFonts = filteredFonts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'new') {
    filteredFonts = filteredFonts.sort((a, b) => (b.id || 0) - (a.id || 0));
  } // 'popular' can be default order or you can add a popularity property

  const totalPages = Math.ceil(filteredFonts.length / FONTS_PER_PAGE);
  const startIdx = (currentPage - 1) * FONTS_PER_PAGE;
  const endIdx = startIdx + FONTS_PER_PAGE;
  const fontsToShow = filteredFonts.slice(startIdx, endIdx);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Map sortOption to label
  const sortLabels: Record<string, string> = {
    popular: 'Trending',
    new: 'New',
    az: 'A - Z',
    za: 'Z - A',
  };

  if (loading) return <div className="text-white">Loading fonts...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full h-full text-white flex flex-col relative">
      {/* Redesigned Search and Filter Bar */}
      <div className="mb-6 flex w-full">
        <div className="flex items-center w-full rounded-full bg-[#232325] px-4 py-2">
          <FaSearch className="text-gray-400 text-lg mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-base"
            placeholder="Search fonts"
          />
          <div className="h-6 w-px bg-gray-700 mx-4" />
          <div className="relative flex items-center">
            <span className="text-xs text-gray-400 mr-1">Sort by</span>
            <button
              className="flex items-center gap-1 font-semibold text-white focus:outline-none"
              onClick={() => setShowSamples(false)} // just to avoid popover overlap
            >
              {sortLabels[sortOption]}
              <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <select
              value={sortOption}
              onChange={e => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer bg-[#232325]"
            >
              <option value="popular">Trending</option>
              <option value="new">New</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
          </div>
        </div>
      </div>
      {/* Preview input and language sample popover below search/filter */}
      <div className="mb-8 flex-shrink-0 relative">
        <input
          ref={inputRef}
          type="text"
          value={previewText}
          onChange={(e) => {
            setPreviewText(e.target.value);
            setShowSamples(false);
          }}
          onFocus={() => setShowSamples(true)}
          className="w-full p-4 text-lg bg-gray-800 text-white rounded-lg border-2 border-gray-700 focus:border-sky-500 focus:outline-none"
          placeholder="Type something to preview..."
        />
        {showSamples && (
          <div
            ref={popoverRef}
            className="absolute left-0 right-0 z-20 mt-2 bg-white rounded-lg shadow-lg  border-gray-200 max-h-72 overflow-y-auto"
          >
            {languageSamples.map(({ lang, text }) => (
              <button
                key={lang}
                type="button"
                className="w-full flex items-center gap-2 px-4 py-2  bg-[#1f2937] text-white hover:bg-gray-900 focus:bg-gray-400 text-left"
                onClick={() => {
                  setPreviewText(text);
                  setShowSamples(false);
                  if (inputRef.current) inputRef.current.blur();
                }}
              >
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-semibold min-w-[60px] text-center">{lang}</span>
                <span className="text-gray-400 truncate">{text}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Font cards and pagination below */}
      <div className="flex-grow flex flex-col overflow-y-auto">
        {fontsToShow.map((font) => (
          <FontCard
            key={font.id}
            fontFamily={font.name}
            text={previewText}
            filePath={font.filePath}
            fontSize={fontSize}
            color={color || '#fff'}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          <button
            className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {/* Numbered page buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-2 py-1 rounded ${page === currentPage ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} text-white font-semibold`}
              onClick={() => goToPage(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ))}
          <button
            className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default FontPreviewer;