// import "./ChatPage.css";

// const ChatPage = () => {
//   return (
//     <div className="chat-page">

//       {/* Sidebar */}
//       <div className="sidebar">

//                     <h2 className="logo">AI Chat</h2>

//                     <button className="new-chat">+ New Chat</button>

//         {/* Chat History */}
//         <div className="history">

//                     <h4>Recent Chats</h4>

//                     <div className="history-item">React Project</div>

//                     <div className="history-item">Firebase Setup</div>

//                     <div className="history-item">Node API</div>

//                     <div className="history-item">MongoDB Notes</div>

//         </div>

//         {/* Bottom Agents <div className="agents"> <button className="agent active">💬 Chat</button> <button className="agent">🔍 Search</button> </div> */}

//       </div>

//       {/* Right Section */}

//       <div className="chat-section">

//         <div className="messages">

//                     <div className="bot">Hello 👋 How can I help you today?</div>

//                     <div className="user">Explain React Router.</div>

//         </div>

//         <div className="message-box">

//                     <input type="text" placeholder="Type your message..."/>

//                     <button>Send</button>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ChatPage;



// 8/13/2026

// import "./ChatPage.css";
// import { useEffect, useState } from "react";

// import { createConversation, getConversation, getConversations, saveMessage, } from "../../services/chatService";

// const ChatPage = () => {

//     const [conversations, setConversations] = useState([]);
//     const [currentConversation, setCurrentConversation] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);

//     // Load all conversations
//     const loadConversations = async () => {
//         try {
//             const data = await getConversations();
//             setConversations(data.conversations);
//         } 
//         catch (error) {
//             console.log(error);
//         }
//     };



//     // Load selected conversation
//     const loadConversation = async (id) => {
//         try {
//             setLoading(true);

//             const data = await getConversation(id);

//             setCurrentConversation(data.conversation);
//             setMessages(data.messages);
//         } 
//         catch (error) {
//             console.log(error);
//         } 
//         finally {
//             setLoading(false);
//         }
//     };



//     // Create new chat
//     const handleNewChat = async () => {
//         try {
//             const data = await createConversation();
//             const conversation = data.conversation;

//             setConversations((prev) => [conversation, ...prev]);
//             setCurrentConversation(conversation);
//             setMessages([]);
//             // loadConversation() ki zaroorat nahi — naya chat khaali hi hai
//         } 
//         catch (error) {
//             console.log(error);
//         }
//     };



//     // Send message
//     const handleSend = async () => {
//         if (!input.trim()) return;

//         const text = input;
//         setInput("");

//         const userTemp = {
//             _id: Date.now(),
//             role: "user",
//             content: text,
//         };

//         setMessages((prev) => [...prev, userTemp]);

//         try {
//             const data = await saveMessage({
//                 conversationId: currentConversation._id,
//                 content: text,
//             });

//             setMessages((prev) => [
//                 ...prev.filter((m) => m._id !== userTemp._id),
//                 data.userMessage,
//                 data.assistantMessage,
//             ]);

//             loadConversations();
//         } 
//         catch (error) {
//             console.log(error);
//             // failed message hata do aur input wapas de do
//             setMessages((prev) => prev.filter((m) => m._id !== userTemp._id));
//             setInput(text);
//         }
//     };



//     // Initial load
//     useEffect(() => {
//         loadConversations();
//     }, []);

//     return (
//       <div className="chat-page">
//             {/* Sidebar */}
//             <div className="sidebar">

//                             <h2 className="logo">AI Chat</h2>
//                             <button className="new-chat" onClick={handleNewChat}>+ New Chat</button>

//                   <div className="history">

//                             <h4>Recent Chats</h4>

//                             {conversations.length === 0 ? (
//                               <p>No Conversations</p>
//                             ) : (
//                               conversations.map((conversation) => (
//                                 <div key={conversation._id} className={`history-item ${currentConversation?._id === conversation._id ? "active" : ""}`} onClick={() => loadConversation(conversation._id)}>
//                                   {conversation.title}
//                                 </div>
//                               ))
//                             )}
//                   </div>
//             </div>

//             {/* Chat section */}
//             <div className="chat-section">
//                   <div className="messages">
//                               {loading ? (
//                                 <h3>Loading...</h3>
//                               ) : messages.length === 0 ? (
//                                 <div className="bot">Hello 👋 How can I help you today?</div>
//                               ) : (
//                                 messages.map((message) => (
//                                   <div key={message._id} className={message.role === "user" ? "user" : "bot"}>
//                                     {message.content}
//                                   </div>
//                                 ))
//                               )}
//                   </div>

//                   {/* Message input */}
//                   <div className="message-box">
//                               <input type="text" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }} />
//                               <button disabled={!currentConversation || !input.trim()} onClick={handleSend}>Send</button>
//                   </div>
//             </div>
//       </div>
//     );
// };

// export default ChatPage;


import "./ChatPage.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import {
    createConversation,
    getConversation,
    getConversations,
    saveMessage,
    deleteConversation,
} from "../../services/chatService";

const ChatPage = () => {

    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false); // AI response ka wait state
    const [initializing, setInitializing] = useState(true); // NEW: pehli baar page load ka state

    const messagesEndRef = useRef(null); // auto-scroll ke liye

    // Load all conversations
    const loadConversations = async () => {
        try {
            const data = await getConversations();
            setConversations(data.conversations);
            return data.conversations;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    };



    // Load selected conversation
    const loadConversation = async (id) => {
        try {
            setLoading(true);

            const data = await getConversation(id);

            setCurrentConversation(data.conversation);
            setMessages(data.messages);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };



    // Create new chat
    const handleNewChat = async () => {
        try {
            const data = await createConversation();
            const conversation = data.conversation;

            setConversations((prev) => [conversation, ...prev]);
            setCurrentConversation(conversation);
            setMessages([]);
        }
        catch (error) {
            console.log(error);
            toast.error("Could not start a new chat. Please try again.");
        }
    };



    // Delete chat
    const handleDeleteConversation = async (e, id) => {
        e.stopPropagation(); // taaki click sidebar item ka "select" trigger na kare

        try {
            await deleteConversation(id);

            setConversations((prev) => prev.filter((c) => c._id !== id));

            // agar wahi conversation open thi jo delete hui, toh chat area clear kar do
            if (currentConversation?._id === id) {
                setCurrentConversation(null);
                setMessages([]);
            }
        }
        catch (error) {
            console.log(error);
        }
    };



    // Send message
    const handleSend = async () => {
        if (!input.trim() || sending) return;

        if (!currentConversation) {
            toast.info("Please start a new chat first");
            return;
        }

        try {
            const text = input;

            setInput("");
            setSending(true); // typing indicator ON

            const userTemp = {
              _id: Date.now(),
              role: "user",
              content: text,
            };

            setMessages((prev) => [...prev, userTemp]);

            const data = await saveMessage({
              conversationId: currentConversation._id,
              content: text,
            });

            setMessages((prev) => [
              ...prev.filter((m) => m._id !== userTemp._id),
              data.userMessage,
              data.assistantMessage,
            ]);

            loadConversations();
        }
        catch (error) {
            console.log(error);
            toast.error("Message could not be sent. Please try again.");
            // failed optimistic message hata do aur input wapas de do
            setMessages((prev) => prev.filter((m) => m.content !== input));
        }
        finally {
            setSending(false); // typing indicator OFF (success ho ya fail, dono me)
        }
    };



    // Initial load — NEW: agar koi conversation nahi hai toh auto naya chat bana do
    useEffect(() => {
        const init = async () => {
            const existing = await loadConversations();

            if (existing.length === 0) {
                await handleNewChat(); // pehli baar khud-ba-khud ek chat start ho jaye
            }

            setInitializing(false);
        };

        init();
    }, []);



    // jab bhi messages update ho ya "typing..." dikhe, bottom tak scroll karo
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, sending]);



    return (
      <div className="chat-page">
            {/* Sidebar */}
            <div className="sidebar">

                            <h2 className="logo">AI Chat</h2>
                            <button className="new-chat" onClick={handleNewChat}>+ New Chat</button>

                  <div className="history">

                            <h4>Recent Chats</h4>

                            {conversations.length === 0 ? (
                              <p>No Conversations</p>
                            ) : (
                              conversations.map((conversation) => (
                                <div
                                  key={conversation._id}
                                  className={`history-item ${currentConversation?._id === conversation._id ? "active" : ""}`}
                                  onClick={() => loadConversation(conversation._id)}
                                >
                                  <span className="history-title">{conversation.title}</span>

                                  <button
                                    className="delete-btn"
                                    onClick={(e) => handleDeleteConversation(e, conversation._id)}
                                    title="Delete conversation"
                                  >
                                    🗑
                                  </button>
                                </div>
                              ))
                            )}
                  </div>
            </div>

            {/* Chat section */}
            <div className="chat-section">
                  <div className="messages">
                              {initializing || loading ? (
                                <h3>Loading...</h3>
                              ) : messages.length === 0 ? (
                                <div className="bot">Hello 👋 How can I help you today?</div>
                              ) : (
                                messages.map((message) => (
                                  <div key={message._id} className={message.role === "user" ? "user" : "bot"}>
                                    {message.content}
                                  </div>
                                ))
                              )}

                              {/* typing indicator, jab tak AI ka reply nahi aata */}
                              {sending && (
                                <div className="bot typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                              )}

                              {/* yeh empty div hamesha end pe rehta hai, scroll isi tak hota hai */}
                              <div ref={messagesEndRef} />
                  </div>

                  {/* Message input */}
                  <div className="message-box">
                              <input
                                type="text"
                                placeholder={currentConversation ? "Type your message..." : "Starting a new chat..."}
                                value={input}
                                disabled={sending || initializing || !currentConversation}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && currentConversation && input.trim() && !sending) {
                                        handleSend();
                                    }
                                }}
                              />
                              <button
                                disabled={!currentConversation || !input.trim() || sending || initializing}
                                onClick={handleSend}
                              >
                                {sending ? "Sending..." : "Send"}
                              </button>
                  </div>
            </div>
      </div>
    );
};

export default ChatPage;