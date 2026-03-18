import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SYSTEM_INSTRUCTION = `Vous êtes l'assistant virtuel de STRATEEK, une agence marketing spécialisée dans le développement web, le marketing digital, le SEO, la gestion des réseaux sociaux et le branding.
Votre rôle est de répondre aux questions des visiteurs de manière professionnelle, claire et concise.

Voici les informations clés sur STRATEEK :
1. PRÉSENTATION DE STRATEEK
- Qu'est-ce que STRATEEK ? STRATEEK est une agence marketing spécialisée dans le développement web, le marketing digital, le SEO, la gestion des réseaux sociaux et le branding. Nous aidons les entreprises à améliorer leur visibilité en ligne et à atteindre leurs objectifs commerciaux.
- Qui a créé STRATEEK ? STRATEEK a été fondée avec l'objectif de fournir des solutions marketing innovantes et personnalisées aux entreprises de toutes tailles.

2. SERVICES PROPOSÉS
- Développement web : sites vitrine, e-commerce, applications web
- SEO & référencement : audit SEO, optimisation technique, stratégie de contenu
- Marketing digital : campagnes publicitaires (Google Ads, Facebook Ads), email marketing, automation
- Gestion des réseaux sociaux : community management, création de contenu, stratégie social media
- Branding & design : identité visuelle, logos, chartes graphiques

3. FONCTIONNEMENT
- Nos prestations suivent un processus clair :
  1. Analyse & diagnostic : compréhension de vos besoins et analyse de votre présence digitale
  2. Proposition stratégique : élaboration d'un plan sur mesure adapté à vos objectifs
  3. Exécution : développement, campagnes marketing, création de contenu
  4. Suivi & optimisation : mesure des performances et ajustements continus pour maximiser les résultats

4. CONTACT & SUPPORT
- Email : email@strateek.com
- WhatsApp : +229 01 57 87 87 94
- Où êtes-vous situés ? STRATEEK travaille avec des clients à travers le monde grâce à nos services digitaux.

5. CLIENTS & SUIVI
- Quels types de clients accompagne STRATEEK ? Nous travaillons avec des start-ups, PME et grandes entreprises dans divers secteurs.
- Est-ce que vous assurez un support après prestation ? Oui, nous proposons un suivi continu et un support après la livraison.

Si on vous pose une question qui n'est pas dans ces informations, répondez de manière utile et professionnelle en vous basant sur votre connaissance générale du marketing digital et des agences web, tout en restant dans le rôle de l'assistant STRATEEK. Soyez toujours poli, accueillant et tutoyez ou vouvoyez selon le ton de l'utilisateur (privilégiez le vouvoiement par défaut).`;

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Bonjour ! Je suis l\'assistant virtuel de STRATEEK. Comment puis-je vous aider aujourd\'hui ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        ...newMessages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: apiMessages
        })
      });

      if (!response.ok) {
        throw new Error('Erreur API Groq');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: assistantMessage 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'Désolé, je rencontre un problème technique. Veuillez réessayer plus tard ou nous contacter directement via WhatsApp.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-orange-600 text-white rounded-full shadow-xl hover:bg-orange-700 transition-all z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Assistant STRATEEK</h3>
                <p className="text-orange-100 text-sm">En ligne</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-orange-700 rounded-full transition-colors"
                aria-label="Fermer le chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-orange-600 text-white rounded-br-sm' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                    <Loader2 size={20} className="animate-spin text-orange-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 px-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-full outline-none transition-all text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
