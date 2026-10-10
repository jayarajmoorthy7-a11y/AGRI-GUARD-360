import React, { useState } from 'react';
import { Language } from '../types';
import { VOICE_QA_DATABASE } from '../data/agriData';

interface VoiceAssistantCardProps {
  language: Language;
}

export const VoiceAssistantCard: React.FC<VoiceAssistantCardProps> = ({ language }) => {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('இன்றைய தக்காளி விலை என்ன?');
  const [answer, setAnswer] = useState(
    'இன்றைய தக்காளி விலை கோயம்பேட்டில் கிலோ ₹38, மதுரை மாட்டுத்தாவணியில் ₹42, திருச்சி காந்தி சந்தையில் ₹35. அடுத்த வாரம் விலை 18% உயரும் வாய்ப்பு இருப்பதால் காத்திருக்கவும்.'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Find suitable answer
  const findAnswer = (questionText: string) => {
    const qLower = questionText.toLowerCase();
    for (const item of VOICE_QA_DATABASE) {
      if (item.triggers.some((trigger) => qLower.includes(trigger))) {
        return language === 'ta' ? item.answerTa : item.answerEn;
      }
    }
    return language === 'ta'
      ? 'உங்கள் கேள்விக்கான தகவல் வேளாண் மையத்தில் சேமிக்கப்பட்டுள்ளது. கூடுதல் உதவிக்கு 1551 அழைக்கவும்.'
      : 'Your query has been recorded. For direct officer support, please call 1551.';
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);

    // Try native Web Speech API recognition
    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: any;
      webkitSpeechRecognition?: any;
    };
    const SpeechRecognition =
      windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          const reply = findAnswer(transcript);
          setAnswer(reply);
          setIsListening(false);
          speakText(reply);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('Speech recognition not allowed or error:', err);
      }
    }

    // Fallback interactive voice cycle if permission / browser not supported
    setTimeout(() => {
      const simulatedQueries = [
        'இன்றைய தக்காளி விலை என்ன?',
        'நெல் இலை கருகல் மருந்து என்ன?',
        'யூரியா மானியம் எப்போது கிடைக்கும்?',
      ];
      const randomQ = simulatedQueries[Math.floor(Math.random() * simulatedQueries.length)];
      setQuery(randomQ);
      const reply = findAnswer(randomQ);
      setAnswer(reply);
      setIsListening(false);
      speakText(reply);
    }, 2000);
  };

  const handleChipClick = (sampleQuery: string) => {
    setQuery(sampleQuery);
    const reply = findAnswer(sampleQuery);
    setAnswer(reply);
    speakText(reply);
  };

  return (
    <article
      className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
      id="voice-ai"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl bg-tertiary-container text-on-tertiary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[32px] fill-icon">mic</span>
          </div>
          <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">
            {language === 'ta' ? 'குரல் வழி AI (ta-IN)' : 'Voice AI (ta-IN)'}
          </span>
        </div>

        <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-snug">
          {language === 'ta' ? 'தமிழ் குரல் உதவியாளர்' : 'Tamil Voice Assistant'}
        </h3>
        <p className="font-label-md text-label-md text-secondary font-bold">
          Tamil Voice AI Assistant
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          {language === 'ta'
            ? 'எழுதத் தெரியாவிட்டாலும் பரவாயில்லை! மைக் அழுத்தி உங்கள் வட்டார வழக்கில் பேசி விடை பெறுங்கள்.'
            : 'Speak naturally in Tamil or English to get instant mandi prices, weather warnings, and crop solutions.'}
        </p>

        {/* Live Tamil Voice Input Preview Container */}
        <div className="mt-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant text-center">
          {/* Large Interactive Mic Button */}
          <div className="py-2 flex justify-center">
            <button
              id="interactive-mic"
              type="button"
              onClick={handleStartListening}
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer ${
                isListening
                  ? 'bg-secondary text-white ring-4 ring-secondary/30 scale-105'
                  : 'bg-primary-container text-on-primary mic-pulsing hover:ring-4 hover:ring-primary/20'
              }`}
              title="மைக் அழுத்தி பேசவும் (Tap to Speak)"
            >
              <span className="material-symbols-outlined text-[36px] fill-icon">
                {isListening ? 'graphic_eq' : 'mic'}
              </span>
            </button>
          </div>

          <p id="mic-status-text" className="font-label-md text-label-md font-bold text-primary mt-2">
            {isListening
              ? (language === 'ta' ? 'கேட்கிறது... தமிழில் பேசுங்கள்...' : 'Listening in ta-IN...')
              : (language === 'ta' ? 'மைக் அழுத்தி பேசவும் (Tap to Speak)' : 'Tap Mic to Speak')}
          </p>

          {/* Speech-to-Text Live Preview Bubble */}
          <div className="mt-3 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant text-left flex items-start gap-2 shadow-xs">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
              graphic_eq
            </span>
            <div className="text-xs flex-1">
              <span className="text-on-surface-variant font-medium">
                {language === 'ta' ? 'சமீபத்திய கேள்வி:' : 'Recent Question:'}
              </span>
              <p className="font-bold text-on-surface mt-0.5">"{query}"</p>
              
              <p className="text-on-surface-variant text-[11px] mt-1 bg-surface-container-low p-1.5 rounded border border-outline-variant/60">
                {answer}
              </p>

              <button
                type="button"
                onClick={() => speakText(answer)}
                className="text-primary font-semibold mt-1.5 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isSpeaking ? 'volume_down' : 'volume_up'}
                </span>
                <span>{language === 'ta' ? 'பதிலைக் கேட்க ஒலிக்கவும்' : 'Listen to Answer'}</span>
              </button>
            </div>
          </div>

          {/* Suggested Voice Queries Chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 justify-center">
            <button
              type="button"
              onClick={() => handleChipClick('நெல் இலை கருகல் மருந்து?')}
              className="text-[11px] bg-surface-container px-2 py-1 rounded text-on-surface-variant hover:text-primary font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              "நெல் இலை கருகல் மருந்து?"
            </button>
            <button
              type="button"
              onClick={() => handleChipClick('யூரியா மானியம் எப்போது?')}
              className="text-[11px] bg-surface-container px-2 py-1 rounded text-on-surface-variant hover:text-primary font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              "யூரியா மானியம் எப்போது?"
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3">
        <button
          type="button"
          onClick={handleStartListening}
          className="w-full min-h-[52px] bg-secondary-container text-on-secondary-container font-label-lg text-label-lg rounded-xl flex items-center justify-center gap-2 border border-secondary shadow-xs active:scale-[0.98] transition-all font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
          <span>
            {language === 'ta'
              ? 'பேசத் தொடங்குங்கள் (Start Speaking)'
              : 'Start Speaking (Tamil / English)'}
          </span>
        </button>
      </div>
    </article>
  );
};
