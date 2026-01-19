import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Image, Loader2, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

interface ChatInterfaceProps {
  systemPrompt?: string;
  placeholder?: string;
  welcomeMessage?: string;
}

export function ChatInterface({ 
  systemPrompt, 
  placeholder = "Ask me anything about your studies...",
  welcomeMessage = "Hello! I'm your AI Study Assistant. How can I help you today?"
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: welcomeMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getContextInfo = () => {
    if (!user) return '';
    if (user.role === 'student') {
      return `The student is in Class ${user.class}, studying ${user.subject}. Their name is ${user.name} and they are ${user.age} years old. Adjust your explanations to be ${
        user.class === '9' || user.class === '10' ? 'simple and foundational' :
        user.class === '11' || user.class === '12' ? 'intermediate with more depth' :
        'advanced and comprehensive for ADP level'
      }.`;
    }
    return `The user is a teacher named ${user.name}, teaching ${user.subject} to Class ${user.targetClass} students.`;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      image: selectedImage || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call when Cloud is enabled)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const contextInfo = getContextInfo();
    const aiResponse = generateMockResponse(input, contextInfo, !!selectedImage);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-slide-up",
              message.role === 'user' ? "flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
              message.role === 'user' 
                ? "gradient-primary" 
                : "bg-secondary"
            )}>
              {message.role === 'user' 
                ? <User className="w-5 h-5 text-primary-foreground" />
                : <Bot className="w-5 h-5 text-secondary-foreground" />
              }
            </div>
            <div className={cn(
              "max-w-[75%] rounded-2xl px-4 py-3 shadow-card",
              message.role === 'user' 
                ? "gradient-primary text-primary-foreground" 
                : "glass"
            )}>
              {message.image && (
                <img 
                  src={message.image} 
                  alt="Uploaded" 
                  className="max-w-full rounded-lg mb-2 max-h-48 object-cover"
                />
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 animate-slide-up">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <Bot className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="glass rounded-2xl px-4 py-3 shadow-card">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <img 
              src={selectedImage} 
              alt="Selected" 
              className="h-20 rounded-lg object-cover"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0"
          >
            <Image className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="min-h-[48px] max-h-32 resize-none pr-12"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8 gradient-primary"
              disabled={isLoading || (!input.trim() && !selectedImage)}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          AI responses are context-aware based on your profile
        </p>
      </div>
    </div>
  );
}

function generateMockResponse(input: string, context: string, hasImage: boolean): string {
  const lowerInput = input.toLowerCase();
  
  if (hasImage) {
    return "I can see the image you've uploaded. To provide accurate analysis and help, please connect Lovable Cloud to enable AI vision capabilities. Once connected, I'll be able to analyze diagrams, solve problems from photos, and much more!";
  }

  if (lowerInput.includes('photosynthesis')) {
    return "Photosynthesis is the process by which plants convert light energy into chemical energy.\n\nThe basic equation is:\n6CO2 + 6H2O + Light Energy → C6H12O6 + 6O2\n\nKey stages include:\n1. Light-dependent reactions (in thylakoids)\n2. Light-independent reactions/Calvin Cycle (in stroma)\n\nWould you like me to explain any specific part in more detail?";
  }

  if (lowerInput.includes('newton') || lowerInput.includes('laws of motion')) {
    return "Newton's Three Laws of Motion form the foundation of classical mechanics:\n\n1. First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n2. Second Law: F = ma (Force equals mass times acceleration)\n\n3. Third Law: For every action, there is an equal and opposite reaction.\n\nShall I provide examples or practice problems for any of these laws?";
  }

  if (lowerInput.includes('quadratic')) {
    return "The quadratic formula is used to solve equations of the form ax² + bx + c = 0:\n\nx = (-b ± √(b² - 4ac)) / 2a\n\nThe discriminant (b² - 4ac) tells us about the nature of roots:\n- If positive: Two distinct real roots\n- If zero: One repeated real root\n- If negative: Two complex roots\n\nWould you like me to solve a specific quadratic equation?";
  }

  return "I'm here to help with your studies! To provide accurate, AI-powered responses, please connect Lovable Cloud. This will enable:\n\n• Context-aware answers based on your class level\n• Image analysis for solving visual problems\n• Personalized learning recommendations\n• Advanced exam preparation\n\nIn the meantime, feel free to ask me about any topic and I'll do my best to help!";
}
