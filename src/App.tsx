import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { ModelSelector } from './components/ModelSelector';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';
import { useModel } from './hooks/useModel';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    regenerateMessage,
    createNewConversation,
    selectConversation,
    editConversationTitle,
    deleteConversation,
  } = useChat();

  // Pass createNewConversation to useModel so it can trigger new chat on model change
  const { selectedModel, currentModel, availableModels, selectModel } = useModel(createNewConversation);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle model change - this will automatically create new chat via useModel hook
  const handleModelChange = (modelId: string) => {
    selectModel(modelId as any);
  };

  // Handle sending message with current model
  const handleSendMessage = (message: string, images?: string[]) => {
    sendMessage(message, images, selectedModel);
  };

  // Handle regenerating message with current model
  const handleRegenerateMessage = (messageId: string) => {
    regenerateMessage(messageId, selectedModel);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onNewConversation={createNewConversation}
        onEditConversationTitle={editConversationTitle}
        onDeleteConversation={deleteConversation}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 relative"
          style={{ zIndex: 10 }}
        >
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 backdrop-blur-md transition-colors"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            
            {/* Model Selector */}
            <ModelSelector
              currentModel={currentModel}
              availableModels={availableModels}
              onSelectModel={handleModelChange}
            />
          </div>
          
          {/* Chat Title - NASCOSTO SU MOBILE, VISIBILE SOLO SU DESKTOP */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              {activeConversation?.title || 'New chat'}
            </h2>
          </div>
          
          {/* Spacer per bilanciare il layout - solo su desktop */}
          <div className="hidden md:block w-10 lg:w-0"></div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 min-h-0" style={{ position: 'relative', zIndex: 1 }}>
          <ChatInterface
            messages={activeConversation?.messages || []}
            onSendMessage={handleSendMessage}
            onRegenerateMessage={handleRegenerateMessage}
            isLoading={isLoading}
            conversationTitle={activeConversation?.title || 'New chat'}
            multimodalEnabled={currentModel.multimodal}
            isImageGenerator={currentModel.isImageGenerator}
            isReasoningModel={currentModel.isReasoning}
            isCoderModel={currentModel.isCoder}
          />
        </div>
      </div>
    </div>
  );
}

export default App;