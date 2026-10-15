import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  Volume2, 
  Edit3, 
  Sparkles, 
  CheckCircle2, 
  Search,
  ArrowRight
} from 'lucide-react';
import { 
  ALL_247_TAMIL_LETTERS, 
  UYIR_LETTERS, 
  MEI_LETTERS, 
  AAYUTHA_LETTER, 
  UYIRMEI_SERIES, 
  CONSONANT_SERIES,
  TamilLetterInfo 
} from '../../data/tamilLettersData';
import { audioService } from '../../services/audioService';
import { TracingCanvas } from './TracingCanvas';

interface TamilAlphabet247ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'all' | 'uyir' | 'aayutham' | 'mei' | 'uyirmei' | 'grid';

export const TamilAlphabet247Modal: React.FC<TamilAlphabet247ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n } = useTranslation();
  const isTa = i18n.language === 'ta';

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTracingLetter, setActiveTracingLetter] = useState<TamilLetterInfo | null>(null);
  const [practicedLetters, setPracticedLetters] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('kuralbeyond_practiced_letters');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const markLetterPracticed = (letter: string) => {
    setPracticedLetters(prev => {
      const updated = new Set(prev);
      updated.add(letter);
      try {
        localStorage.setItem('kuralbeyond_practiced_letters', JSON.stringify(Array.from(updated)));
      } catch {}
      return updated;
    });
  };

  const handlePlayLetterAudio = (letterInfo: TamilLetterInfo) => {
    markLetterPracticed(letterInfo.letter);
    // Use Sarvam AI Tamil voice to pronounce the letter and phonics
    const speechText = `${letterInfo.letter}, ${letterInfo.tanglish}`;
    audioService.play(`letter_${letterInfo.id}`, speechText);
  };

  const filteredLetters = useMemo(() => {
    let list = ALL_247_TAMIL_LETTERS;

    if (activeTab === 'uyir') {
      list = UYIR_LETTERS;
    } else if (activeTab === 'aayutham') {
      list = [AAYUTHA_LETTER];
    } else if (activeTab === 'mei') {
      list = MEI_LETTERS;
    } else if (activeTab === 'uyirmei') {
      if (selectedSeries !== 'all') {
        list = list.filter(l => l.category === 'uyirmei' && l.subCategory === `${selectedSeries}-series`);
      } else {
        list = list.filter(l => l.category === 'uyirmei');
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        l => l.letter.includes(q) || 
             l.tanglish.toLowerCase().includes(q) || 
             l.exampleWordTa.includes(q) ||
             l.exampleWordEn.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeTab, selectedSeries, searchQuery]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-ink/70 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-5xl bg-paper rounded-3xl border-4 border-teal/20 shadow-2xl flex flex-col max-h-[92vh] my-auto overflow-hidden animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-7 py-4 bg-paper-dark border-b-2 border-sand">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-teal text-gold flex items-center justify-center font-tamil font-bold text-lg shadow-sm">
                அ
              </span>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-teal">
                {isTa ? 'அனைத்து 247 தமிழ் எழுத்துகள்' : 'All 247 Tamil Letters'}
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold-surface border border-gold/40 text-ink">
                247 Letters
              </span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">
              {isTa 
                ? '247 தமிழ் எழுத்துக்களின் உச்சரிப்பைக் கேட்டு, எழுதிப் பழகி முழு அகரவரிசையையும் பயிலுங்கள்.' 
                : 'Explore, listen to authentic audio, and write all 247 Tamil alphabet letters at your own pace.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress Badge */}
            <div className="flex items-center gap-2 bg-sand/70 px-3 py-1.5 rounded-2xl border border-sand">
              <CheckCircle2 size={16} className="text-leaf" />
              <div className="text-right">
                <span className="text-xs font-bold text-ink">
                  {practicedLetters.size} / 247
                </span>
                <span className="text-[10px] text-ink-muted block leading-none">
                  {isTa ? 'பயின்றவை' : 'Practiced'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-2xl hover:bg-sand/80 text-ink-muted hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="px-5 sm:px-7 py-3 bg-paper-dark/60 border-b border-sand flex flex-wrap items-center justify-between gap-3">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => { setActiveTab('all'); setSelectedSeries('all'); }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'all'
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-sand text-ink hover:bg-sand-dark'
              }`}
            >
              {isTa ? 'அனைத்தும் (247)' : 'All (247)'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('uyir'); setSelectedSeries('all'); }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'uyir'
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-sand text-ink hover:bg-sand-dark'
              }`}
            >
              {isTa ? 'உயிர் (12)' : 'Vowels (12)'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('aayutham'); setSelectedSeries('all'); }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'aayutham'
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-sand text-ink hover:bg-sand-dark'
              }`}
            >
              {isTa ? 'ஆய்தம் (1 ஃ)' : 'Aytham (1 ஃ)'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('mei'); setSelectedSeries('all'); }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'mei'
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-sand text-ink hover:bg-sand-dark'
              }`}
            >
              {isTa ? 'மெய் (18)' : 'Consonants (18)'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('uyirmei'); setSelectedSeries('all'); }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'uyirmei'
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-sand text-ink hover:bg-sand-dark'
              }`}
            >
              {isTa ? 'உயிர்மெய் (216)' : 'Compounds (216)'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('grid'); setSelectedSeries('all'); }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'grid'
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-sand text-ink hover:bg-sand-dark'
              }`}
            >
              {isTa ? 'அட்டவணை (Grid)' : 'Matrix Grid'}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial sm:min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTa ? 'எழுத்து அல்லது ஒலி தேடுக...' : 'Search letter / Tanglish...'}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-paper rounded-xl border border-sand focus:border-teal focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Uyirmei Series Filter Pills (Shown only when in Uyirmei tab) */}
        {activeTab === 'uyirmei' && (
          <div className="px-5 sm:px-7 py-2 bg-paper border-b border-sand flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="font-bold text-ink-muted flex-shrink-0 mr-1">{isTa ? 'வரிசை:' : 'Series:'}</span>
            <button
              type="button"
              onClick={() => setSelectedSeries('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedSeries === 'all' ? 'bg-gold text-ink font-bold shadow-xs' : 'bg-sand hover:bg-sand-dark text-ink'
              }`}
            >
              {isTa ? 'அனைத்தும்' : 'All'}
            </button>
            {UYIRMEI_SERIES.map(s => (
              <button
                key={s.vowel}
                type="button"
                onClick={() => setSelectedSeries(s.vowel)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${
                  selectedSeries === s.vowel ? 'bg-gold text-ink font-bold shadow-xs' : 'bg-sand hover:bg-sand-dark text-ink'
                }`}
              >
                {s.vowel}-{isTa ? 'வரிசை' : 'series'}
              </button>
            ))}
          </div>
        )}

        {/* Main Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. Matrix Grid Mode (18 Consonants × 12 Vowels Table) */}
          {activeTab === 'grid' ? (
            <div className="overflow-x-auto border-2 border-sand rounded-3xl bg-paper shadow-inner">
              <table className="w-full border-collapse text-center text-xs">
                <thead>
                  <tr className="bg-paper-dark border-b-2 border-sand">
                    <th className="p-2.5 font-bold text-teal border-r border-sand">
                      {isTa ? 'மெய் \\ உயிர்' : 'Consonant \\ Vowel'}
                    </th>
                    {UYIR_LETTERS.map(v => (
                      <th key={v.id} className="p-2.5 font-tamil font-extrabold text-sm text-teal border-r border-sand">
                        {v.letter}
                        <span className="block text-[10px] font-sans text-ink-muted">{v.tanglish}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONSONANT_SERIES.map((c, cIdx) => (
                    <tr key={c.baseConsonant} className={cIdx % 2 === 0 ? 'bg-paper' : 'bg-paper-dark/30'}>
                      <td className="p-2.5 font-tamil font-bold text-ink border-r border-b border-sand bg-sand/30">
                        {c.meiForm}
                        <span className="block text-[10px] font-sans text-ink-muted">{c.baseTanglish}</span>
                      </td>
                      {UYIRMEI_SERIES.map(vSeries => {
                        const char = vSeries.letters[cIdx];
                        const isPracticed = practicedLetters.has(char);
                        return (
                          <td 
                            key={vSeries.vowel} 
                            onClick={() => {
                              markLetterPracticed(char);
                              audioService.play(`matrix_${char}`, char);
                            }}
                            className="p-2 border-r border-b border-sand hover:bg-gold-surface cursor-pointer group transition-colors"
                            title={`Click to listen to ${char}`}
                          >
                            <span className="font-tamil font-extrabold text-base text-ink block group-hover:scale-110 transition-transform">
                              {char}
                            </span>
                            {isPracticed && (
                              <span className="w-1.5 h-1.5 rounded-full bg-leaf inline-block mt-0.5" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* 2. Grid Card Tiles View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredLetters.map(info => {
                const isPracticed = practicedLetters.has(info.letter);

                return (
                  <div
                    key={info.id}
                    className={`relative p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center gap-2 group ${
                      isPracticed
                        ? 'bg-paper-dark border-leaf/40 shadow-xs'
                        : 'bg-paper border-sand hover:border-teal/50 shadow-xs'
                    }`}
                  >
                    {/* Practiced check badge */}
                    {isPracticed && (
                      <span className="absolute top-2 right-2 text-leaf" title="Practiced">
                        <CheckCircle2 size={13} />
                      </span>
                    )}

                    {/* Tamil Glyph */}
                    <div 
                      onClick={() => handlePlayLetterAudio(info)}
                      className="cursor-pointer group-hover:scale-110 transition-transform"
                    >
                      <span className="font-tamil font-extrabold text-3xl sm:text-4xl text-ink group-hover:text-teal transition-colors block">
                        {info.letter}
                      </span>
                      <span className="text-xs text-ink-muted font-medium block mt-0.5">
                        {info.tanglish}
                      </span>
                    </div>

                    {/* English Category Label */}
                    <span className="text-[10px] text-ink-muted bg-sand/50 px-2 py-0.5 rounded-full line-clamp-1">
                      {info.categoryLabelEn}
                    </span>

                    {/* Action Buttons: Listen & Write */}
                    <div className="flex items-center gap-1.5 w-full mt-1">
                      <button
                        type="button"
                        onClick={() => handlePlayLetterAudio(info)}
                        className="flex-1 py-1 px-2 rounded-xl bg-teal-surface hover:bg-teal text-teal hover:text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        title={isTa ? 'கேள்' : 'Listen'}
                      >
                        <Volume2 size={12} />
                        <span>{isTa ? 'கேள்' : 'Listen'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTracingLetter(info);
                        }}
                        className="flex-1 py-1 px-2 rounded-xl bg-gold-surface hover:bg-gold text-ink text-[11px] font-bold flex items-center justify-center gap-1 transition-colors active:scale-95 shadow-xs"
                        title={isTa ? 'எழுது' : 'Write'}
                      >
                        <Edit3 size={12} />
                        <span>{isTa ? 'எழுது' : 'Write'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredLetters.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-bold text-ink">{isTa ? 'எழுத்துக்கள் எதுவும் கிடைக்கவில்லை' : 'No letters found'}</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="px-4 py-2 rounded-2xl bg-teal text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Hackathon Demo Freedom */}
        <div className="px-5 sm:px-7 py-3 bg-paper-dark border-t-2 border-sand flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-ink-muted">
            <Sparkles size={14} className="text-gold" />
            <span>
              12 {isTa ? 'உயிர்' : 'Vowels'} + 1 {isTa ? 'ஆய்தம்' : 'Aytham'} + 18 {isTa ? 'மெய்' : 'Consonants'} + 216 {isTa ? 'உயிர்மெய்' : 'Uyirmei'} = <strong>247 {isTa ? 'தமிழ் எழுத்துகள்' : 'Tamil Letters'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                window.location.href = '/lesson/lesson-2-0';
              }}
              className="px-4 py-2 rounded-2xl bg-gold-surface border border-gold/50 text-ink font-bold text-xs hover:bg-gold transition-all flex items-center gap-1 shadow-sm"
            >
              <span>⚡ {isTa ? 'ஹேக்கத்தான் மாதிரி: நிலை 2' : 'Hackathon Demo: Proceed to Level 2'}</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-2xl bg-teal text-white font-bold hover:bg-teal-light transition-all active:scale-95 shadow-md"
            >
              {isTa ? 'கற்கத் தொடங்கு' : 'Continue Learning'}
            </button>
          </div>
        </div>

        {/* Active Tracing Modal Dialog Overlay - always centered in viewport */}
        {activeTracingLetter && (
          <div 
            className="absolute inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
            onClick={() => setActiveTracingLetter(null)}
          >
            <div 
              className="bg-paper border-4 border-teal/40 rounded-3xl p-5 sm:p-7 max-w-lg w-full flex flex-col items-center relative shadow-2xl my-auto animate-pop"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: Title, Tanglish & Audio */}
              <div className="w-full flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal bg-teal-surface px-3 py-0.5 rounded-full">
                    {isTa ? 'எழுத்துப் பயிற்சி' : 'Letter Tracing Practice'}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-ink mt-1.5 flex items-center gap-2">
                    <span>{isTa ? 'எழுதுக:' : 'Write:'}</span>
                    <span className="text-teal font-tamil text-3xl font-extrabold">{activeTracingLetter.letter}</span>
                    <span className="text-sm font-sans font-medium text-ink-muted">({activeTracingLetter.tanglish})</span>
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {isTa ? '75% துல்லியத்துடன் வரைந்து எழுத்தைக் கற்றுக்கொள்ளுங்கள்!' : 'Trace with at least 75% accuracy to master this letter!'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handlePlayLetterAudio(activeTracingLetter)}
                    className="p-2 rounded-2xl bg-teal-surface hover:bg-teal text-teal hover:text-white transition-colors shadow-xs"
                    title={isTa ? 'ஒலி கேட்க' : 'Listen Pronunciation'}
                  >
                    <Volume2 size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTracingLetter(null)}
                    className="p-2 rounded-2xl bg-sand hover:bg-sand-dark text-ink transition-colors shadow-xs"
                    title={isTa ? 'மூடு' : 'Close'}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Tracing Canvas */}
              <TracingCanvas
                letter={activeTracingLetter.letter}
                onComplete={() => {
                  markLetterPracticed(activeTracingLetter.letter);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
