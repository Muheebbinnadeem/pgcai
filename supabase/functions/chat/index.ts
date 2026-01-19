import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UserProfile {
  role: 'student' | 'teacher';
  name: string;
  class?: string;
  subject?: string;
  age?: number;
  targetClass?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userProfile, module } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received request for module:", module);
    console.log("User profile:", JSON.stringify(userProfile));
    console.log("Messages count:", messages.length);

    // Build context-aware system prompt
    const systemPrompt = buildSystemPrompt(userProfile, module);
    
    // Format messages for the API
    const formattedMessages = formatMessages(messages, systemPrompt);

    console.log("Calling Lovable AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: formattedMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway...");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function buildSystemPrompt(profile: UserProfile, module: string): string {
  let basePrompt = `You are an AI Study Assistant for Punjab College (Daroghawala Campus). 

STRICT RULES:
- Always respond in English only
- Do NOT use markdown bold formatting (asterisks like **text**)
- Use plain text with clear structure
- Use numbered lists and bullet points for organization
- Be academic, helpful, and encouraging
- Provide accurate, educational responses

`;

  // Add user context
  if (profile.role === 'student') {
    const complexityLevel = getComplexityLevel(profile.class || '9');
    basePrompt += `STUDENT CONTEXT:
- Name: ${profile.name}
- Class: ${profile.class}
- Subject/Department: ${profile.subject}
- Age: ${profile.age} years

IMPORTANT: Adjust your explanations to be ${complexityLevel}. 
${profile.class === '9' || profile.class === '10' 
  ? 'Use simple language, relatable examples, and step-by-step explanations suitable for secondary school students.'
  : profile.class === '11' || profile.class === '12'
  ? 'Provide intermediate-level explanations with more depth, technical terms with definitions, and exam-focused content.'
  : 'Give advanced, comprehensive explanations suitable for undergraduate level. Include theoretical depth, research perspectives, and professional applications.'}

`;
  } else {
    basePrompt += `TEACHER CONTEXT:
- Name: ${profile.name}
- Subject: ${profile.subject}
- Teaching Class: ${profile.targetClass}

You are assisting a teacher. Provide content suitable for creating lesson plans, assessments, and teaching materials for Class ${profile.targetClass} students.

`;
  }

  // Add module-specific instructions
  basePrompt += getModuleInstructions(module);

  return basePrompt;
}

function getComplexityLevel(classLevel: string): string {
  switch (classLevel) {
    case '9':
    case '10':
      return 'simple and foundational (secondary school level)';
    case '11':
    case '12':
      return 'intermediate with more depth (higher secondary/pre-university level)';
    case 'ADP':
      return 'advanced and comprehensive (undergraduate/degree level)';
    default:
      return 'appropriate for the student level';
  }
}

function getModuleInstructions(module: string): string {
  switch (module) {
    case 'exam-prep':
      return `MODULE: EXAM PREPARATION
Your role is to help with exam preparation:
- Generate practice questions and mock test papers
- Create MCQs with answer keys
- Explain common exam patterns and important topics
- Provide time management tips for exams
- Focus on high-yield topics likely to appear in exams
- Include past paper style questions when relevant`;

    case 'assignment-help':
      return `MODULE: ASSIGNMENT HELP
Your role is to assist with assignments:
- Help structure essays, reports, and projects
- Provide research guidance and outline suggestions
- Explain assignment requirements clearly
- Offer proofreading tips and improvement suggestions
- Guide on proper citation and referencing
- NEVER write complete assignments - guide the student instead`;

    case 'summarize':
      return `MODULE: TEXT SUMMARIZATION
Your role is to summarize content:
- Create concise bullet-point summaries
- Extract key concepts and main ideas
- Highlight important definitions and terms
- Simplify complex passages
- Identify the most important takeaways
- Present information in an organized, study-friendly format`;

    case 'notes':
      return `MODULE: CURATED NOTES
Your role is to provide comprehensive study notes:
- Create detailed, well-organized notes on topics
- Include key concepts, definitions, and formulas
- Explain with examples and diagrams descriptions
- Focus on exam-relevant content
- Structure notes for easy revision
- Include memory tips and mnemonics where helpful`;

    default:
      return `MODULE: GENERAL STUDY ASSISTANT
Your role is to be a helpful study companion:
- Answer questions on any academic topic
- Explain complex concepts clearly
- Provide examples and analogies
- Help with problem-solving
- Encourage and motivate the student
- Suggest additional resources when helpful`;
  }
}

function formatMessages(messages: ChatMessage[], systemPrompt: string): any[] {
  const formattedMessages: any[] = [
    { role: "system", content: systemPrompt }
  ];

  for (const msg of messages) {
    if (msg.image) {
      // Multimodal message with image
      formattedMessages.push({
        role: msg.role,
        content: [
          { type: "text", text: msg.content || "Please analyze this image." },
          { type: "image_url", image_url: { url: msg.image } }
        ]
      });
    } else {
      formattedMessages.push({
        role: msg.role,
        content: msg.content
      });
    }
  }

  return formattedMessages;
}
