import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, CheckCircle2, Mic, MicOff, Volume2, VolumeX, Building2, ArrowRight } from 'lucide-react';
import { PLANS } from './PlanComparison';

const PLAN_KNOWLEDGE = {
  budget: {
    title: 'Budget Friendly',
    description: 'Plans optimized for low monthly premiums.',
    keywords: ['cheap', 'affordable', 'budget', 'low cost', 'price'],
    plans: ['Student Plan', 'Basic Plan', 'Ayush Plus']
  },
  family: {
    title: 'Family & Couples',
    description: 'Comprehensive coverage for multiple family members.',
    keywords: ['family', 'couple', 'kids', 'children', 'wife', 'husband', 'growing'],
    plans: ['Family Plan', 'Premium Plan', 'Maternity Cover']
  },
  premium: {
    title: 'Ultimate Protection',
    description: 'Highest coverage limits and global benefits.',
    keywords: ['best', 'luxury', 'elite', 'maximum', 'highest', 'unlimited', 'premium'],
    plans: ['Elite Plan', 'Premium Plan', 'Heart Care']
  },
  specialized: {
    title: 'Specialized Care',
    description: 'Targeted plans for specific health needs.',
    keywords: ['senior', 'old', 'age', 'heart', 'cardiac', 'illness', 'critical', 'women'],
    plans: ['Senior Care Plan', 'Heart Care', 'Critical Illness', 'Women\'s Premium']
  }
};

const QuickChip = ({ label, onClick }) => (
  <button 
    onClick={onClick}
    className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-full hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0"
  >
    {label}
  </button>
);

const RichPlanCard = ({ plan, onBuy }) => (
  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
    <div className="bg-slate-50 p-4 border-b border-slate-100">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-slate-900">{plan.name}</h4>
        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">{plan.coverage} Cover</span>
      </div>
      <p className="text-[11px] text-slate-500 line-clamp-2">{plan.tag}</p>
    </div>
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-emerald-500" />
        <span className="text-xs font-medium text-slate-700">{plan.cashlessHospitals} Cashless Hospitals</span>
      </div>
      <div className="space-y-1.5">
        {plan.features.slice(0, 3).map((f, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
            <span className="text-[11px] text-slate-600 leading-tight">{f}</span>
          </div>
        ))}
      </div>
      <div className="pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400">Starting at</span>
          <span className="text-sm font-black text-slate-900">{plan.price}</span>
        </div>
        <button 
          onClick={() => onBuy(plan.name)}
          className="bg-primary hover:bg-secondary text-white text-[11px] font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Auto-Buy Now
        </button>
      </div>
    </div>
  </div>
);

const Chatbot = ({ handleBuyPlan, setShowAllPlans }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your HealthGuard **Agentic AI**. I can analyze your needs, find the perfect plan, and instantly set it up for you.\n\nWhat are you looking for today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(null);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const voiceEnabledRef = useRef(voiceEnabled);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setInput(finalTranscript);
          setIsListening(false);
          recognition.stop();
          handleBotLogic(finalTranscript);
        } else {
          setInput(interimTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition start error:", err);
      }
    }
  };

  const speakText = (text) => {
    if (!voiceEnabledRef.current) return;
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel(); // Stop current speech before starting new
      const cleanText = text.replace(/\*\*/g, ''); // Remove Markdown formatting from speech
      const utterance = new SpeechSynthesisUtterance(cleanText);
      synth.speak(utterance);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleAction = (planName) => {
    const plan = PLANS.find(p => p.name === planName);
    if (plan) {
      handleBuyPlan(plan);
      const outputText = `Done! I've executed the purchase action for **${plan.name}**. You can see your new policy active in the 'Purchased Plans' section at the bottom.`;
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: outputText,
        sender: 'bot',
        isAction: true
      }]);
      setAwaitingConfirmation(null);
      speakText(outputText);
    }
  };

  const handleBotLogic = (userText) => {
    const userMsg = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Agentic AI Logic simulation
    setTimeout(() => {
      setIsTyping(false);
      const lowerInput = userText.toLowerCase();
      
      let botResponse = "I can definitely help with that. Would you prefer to compare all plans yourself, or should I select the best one based on your profile?";
      let actionPlan = null;
      let showRichCard = null;

      // Handle simple greetings
      if (lowerInput.match(/\b(hi|hello|hey|greetings)\b/)) {
        botResponse = "Hello! I'm here to handle your insurance needs. I can search our **12 premium plans** and even process your purchase automatically.\n\nTry asking: 'Recommend a family plan' or 'What's the cheapest option?'";
      }
      // Handle "show all" intent
      else if (lowerInput.includes('show') || lowerInput.includes('compare') || lowerInput.includes('all') || lowerInput.includes('grid')) {
        setShowAllPlans(true);
        botResponse = "I have executed an action to expand the plan comparison grid for you! You can now scroll up to view all **12 available plans**.";
      } 
      // Handle specific categories
      else {
        let matchedCategory = null;
        for (const cat in PLAN_KNOWLEDGE) {
          if (PLAN_KNOWLEDGE[cat].keywords.some(k => lowerInput.includes(k))) {
            matchedCategory = PLAN_KNOWLEDGE[cat];
            break;
          }
        }

        if (matchedCategory) {
          const recommendedPlanName = matchedCategory.plans[0];
          const planData = PLANS.find(p => p.name === recommendedPlanName);
          
          if (planData) {
            botResponse = `Excellent choice. Based on your interest in **${matchedCategory.title}**, I've analyzed our plans and identified the **${recommendedPlanName}** as your highest-value match. 

It specifically covers **${planData.cashlessHospitals} hospitals** and includes unique benefits like **${planData.features[0]}**.

Would you like me to process a purchase for you?`;
            showRichCard = planData;
          }
        } else if (lowerInput.includes('buy') || lowerInput.includes('purchase')) {
           botResponse = "I'm ready to process your purchase. Please tell me which plan you're interested in (e.g., 'Buy Basic Plan'), and I'll show you the full details before finalizing.";
        } else if (lowerInput.includes('hospital')) {
           const topHospitalPlan = PLANS.reduce((prev, current) => {
             const prevCount = parseInt(prev.cashlessHospitals.replace(/[^\d]/g, ''));
             const currentCount = parseInt(current.cashlessHospitals.replace(/[^\d]/g, ''));
             return currentCount > prevCount ? current : prev;
           });
           botResponse = `The **${topHospitalPlan.name}** offers our widest network with **${topHospitalPlan.cashlessHospitals} cashless hospitals** nationwide. Here are the details:`;
           showRichCard = topHospitalPlan;
        }
      }

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: botResponse, 
        sender: 'bot', 
        actionPlan, 
        richCard: showRichCard 
      }]);
      speakText(botResponse);
    }, 1200);
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    handleBotLogic(input);
  };

  const parseBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-secondary font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-secondary to-primary text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all z-50 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="w-8 h-8 absolute animate-pulse opacity-50" />
        <Bot className="w-8 h-8 relative z-10 group-hover:rotate-12 transition-transform" />
      </button>

      <div 
        className={`fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col transition-all duration-300 transform origin-bottom-right z-50 overflow-hidden ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 pointer-events-none translate-y-10'
        }`}
        style={{ height: '600px', maxHeight: 'calc(100vh - 48px)' }}
      >
        <div className="bg-gradient-to-r from-secondary to-primary p-4 flex items-center justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 flex items-center">
            <div className="h-full w-20 bg-white/20 blur-xl -translate-x-10 animate-[shimmer_3s_infinite]" />
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">Agentic AI <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full border border-white/30 uppercase tracking-widest">Active</span></h3>
              <p className="text-xs text-white/80">Can perform actions for you</p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <button 
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (voiceEnabled) window.speechSynthesis?.cancel();
              }}
              className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white"
              title={voiceEnabled ? "Disable Voice" : "Enable Voice"}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 relative pb-10">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.sender === 'user' ? 'bg-slate-800 text-white' : 'bg-gradient-to-br from-secondary to-primary text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                <div 
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-slate-800 text-white rounded-br-none shadow-md' 
                      : msg.isAction 
                        ? 'bg-green-50 border border-green-200 text-green-800 rounded-bl-none shadow-sm' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.isAction && <CheckCircle2 className="w-5 h-5 text-green-500 mb-2" />}
                  {parseBoldText(msg.text)}
                </div>
                
                {/* Embedded Action UI */}
                {msg.richCard && (
                  <RichPlanCard 
                    plan={msg.richCard} 
                    onBuy={(name) => handleAction(name)} 
                  />
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none shadow-sm p-4 flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Chips UI - More stable positioning */}
        <div className="bg-white px-4 border-t border-slate-50 overflow-x-auto scrollbar-hide flex gap-2 py-3 shrink-0">
          <QuickChip label="🏥 Most Hospitals" onClick={() => handleBotLogic("Which plan has the most hospitals?")} />
          <QuickChip label="👨‍👩‍👧 Best for Family" onClick={() => handleBotLogic("Recommend a family plan")} />
          <QuickChip label="💰 Cheapest Option" onClick={() => handleBotLogic("Show me the cheapest plan")} />
          <QuickChip label="👵 Senior Care" onClick={() => handleBotLogic("Senior citizen plans")} />
          <QuickChip label="🔍 Show All Plans" onClick={() => handleBotLogic("Show me all plans")} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <button
            type="button"
            onClick={toggleListening}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-sm border ${
              isListening 
                ? 'bg-red-50 border-red-200 text-red-500 animate-pulse' 
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to do something..."
            className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 bg-gradient-to-br from-secondary to-primary text-white rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all shrink-0"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
