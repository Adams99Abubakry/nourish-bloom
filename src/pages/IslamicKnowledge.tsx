import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Brain, MessageCircle, Check, X, ArrowRight, Loader2, Send, RefreshCw, Trophy } from "lucide-react";
import { ISLAMIC_QUIZ_QUESTIONS, QUIZ_CATEGORIES, type QuizQuestion } from "@/data/islamicQuizData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";

// ─── Quiz Section ────────────────────────────────────────

function shuffleArray(arr: QuizQuestion[]) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const TOTAL_QUESTIONS = 40;

const QuizSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => shuffleArray(ISLAMIC_QUIZ_QUESTIONS));

  const filteredQuestions = selectedCategory === "All"
    ? quizQuestions.slice(0, TOTAL_QUESTIONS)
    : quizQuestions.filter(q => q.category === selectedCategory);

  const currentQ = filteredQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    setScore(prev => ({
      correct: prev.correct + (idx === currentQ.correctIndex ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizQuestions(shuffleArray(ISLAMIC_QUIZ_QUESTIONS));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, total: 0 });
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const pct = Math.round((score.correct / score.total) * 100);
    if (pct === 100) return { emoji: "🏆", title: "MashaAllah! Perfect Score!", message: "You have excellent Islamic knowledge. Keep it up!" };
    if (pct >= 80) return { emoji: "🌟", title: "Excellent!", message: "Your knowledge of Islam is very strong. May Allah increase it further." };
    if (pct >= 60) return { emoji: "📖", title: "Good Effort!", message: "You have a good foundation. Keep learning and reviewing." };
    if (pct >= 40) return { emoji: "💪", title: "Keep Learning!", message: "There's always room to grow. Review the topics you missed." };
    return { emoji: "🤲", title: "Don't Give Up!", message: "Every journey starts with a step. Keep seeking knowledge, it's an obligation!" };
  };

  // Completion screen
  if (quizCompleted) {
    const msg = getScoreMessage();
    const pct = Math.round((score.correct / score.total) * 100);
    return (
      <Card variant="elevated" className="animate-fade-in">
        <CardContent className="p-6 text-center space-y-4">
          <div className="text-5xl">{msg.emoji}</div>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10">
            <Trophy className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{msg.title}</h2>
          <p className="text-3xl font-bold text-primary">{score.correct}/{score.total}</p>
          <p className="text-sm text-muted-foreground">({pct}% correct)</p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">{msg.message}</p>
          <Button onClick={resetQuiz} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again with New Questions
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentQ) {
    return (
      <Card variant="elevated">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No questions in this category.</p>
          <Button onClick={() => setSelectedCategory("All")} className="mt-3" size="sm">Show All</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {["All", ...QUIZ_CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setCurrentIndex(0); setSelectedAnswer(null); setShowExplanation(false); }}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all",
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Score */}
      {score.total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Score: <span className="font-semibold text-foreground">{score.correct}/{score.total}</span>
            {" "}({Math.round((score.correct / score.total) * 100)}%)
          </p>
          <Button variant="ghost" size="sm" onClick={resetQuiz}>
            <RefreshCw className="w-3 h-3 mr-1" /> Reset
          </Button>
        </div>
      )}

      {/* Question Card */}
      <Card variant="elevated">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{currentQ.category}</span>
            <span className="text-xs text-muted-foreground">{currentIndex + 1}/{filteredQuestions.length}</span>
          </div>

          <p className="text-sm sm:text-base font-medium text-foreground">{currentQ.question}</p>

          <div className="space-y-2">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={cn(
                  "w-full text-left p-3 rounded-lg border text-sm transition-all",
                  selectedAnswer === null && "hover:bg-secondary/50 border-border",
                  selectedAnswer !== null && i === currentQ.correctIndex && "bg-green-500/15 border-green-500/50 text-foreground",
                  selectedAnswer === i && i !== currentQ.correctIndex && "bg-red-400/15 border-red-400/50 text-foreground",
                  selectedAnswer !== null && i !== currentQ.correctIndex && i !== selectedAnswer && "opacity-50 border-border"
                )}
              >
                <div className="flex items-center gap-2">
                  {selectedAnswer !== null && i === currentQ.correctIndex && <Check className="w-4 h-4 text-green-500 shrink-0" />}
                  {selectedAnswer === i && i !== currentQ.correctIndex && <X className="w-4 h-4 text-red-400 shrink-0" />}
                  <span>{opt}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
              <p className="text-xs sm:text-sm text-muted-foreground">{currentQ.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button onClick={nextQuestion} className="w-full" size="sm">
              {currentIndex + 1 < filteredQuestions.length ? "Next Question" : "See Results"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// ─── AI Q&A Section ──────────────────────────────────────

type Message = { role: "user" | "assistant"; content: string };

const IslamicQA = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_QUESTIONS = [
    "Tell me the story of Abu Bakr (RA)",
    "What happened in the Battle of Badr?",
    "How did Bilal (RA) accept Islam?",
    "What are the virtues of Ramadan?",
    "Tell me about Umar ibn Al-Khattab (RA)",
    "What is the significance of Laylatul Qadr?",
  ];

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/islamic-qa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ question: text.trim() }),
        }
      );

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        throw new Error(err.error || "Request failed");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {}
        }
      }
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: `Sorry, I couldn't process your question. ${e.message || "Please try again."}` },
      ]);
    }

    setIsLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [isLoading]);

  return (
    <div className="space-y-4">
      {messages.length === 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Ask anything about Islam — Sahaba stories, Fiqh, Quran, Hadith, and more
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-left p-3 rounded-lg bg-secondary/30 border border-border/50 text-xs sm:text-sm text-foreground hover:bg-secondary/50 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="space-y-3 max-h-[400px] overflow-y-auto p-1">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground"
                )}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex justify-start">
              <div className="bg-secondary/50 rounded-xl px-3 py-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}

      <div className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Ask about Islam, Sahaba, Quran..."
          className="min-h-[44px] max-h-[120px] resize-none text-sm bg-secondary/30"
        />
        <Button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// ─── Main Page ───────────────────────────────────────────

const IslamicKnowledge = () => {
  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="text-center mb-4 sm:mb-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 mb-3">
            <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Islamic Knowledge</h1>
          <p className="text-sm text-muted-foreground">Test your knowledge & ask questions about Islam</p>
        </div>

        <Tabs defaultValue="quiz" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quiz" className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Quiz
            </TabsTrigger>
            <TabsTrigger value="qa" className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" /> Ask Islam
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="mt-4">
            <QuizSection />
          </TabsContent>

          <TabsContent value="qa" className="mt-4">
            <IslamicQA />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default IslamicKnowledge;
