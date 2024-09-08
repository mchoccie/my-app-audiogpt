import React from "react";

const Modal = ({ isOpen, onClose, onSelect }) => {
  // Define handleTemplateClick as an arrow function within the component's scope
  const handleTemplateClick = (sysPrompt, name) => {
    onSelect(sysPrompt, name);
    console.log(sysPrompt);
    onClose()
  };

  const templates = [
    {
      name: "PodcastGPT",
      description: "Best suited to extract insights from podcasts",
      systemPrompt: `You are an AI language model that extracts key insights and information from a podcast audio transcript. Look through the context of what we've been provided and
    provide answers in this format:

1. **Summary**: Provide a brief summary of the podcast episode.
2. **Key Topics**: List the main topics discussed in the podcast.
3. **Important Points**: Highlight any significant points or arguments made by the speakers.
4. **Speaker Insights**: Identify and describe any unique insights or perspectives shared by the speakers.
5. **Actionable Takeaways**: What actionable advice or takeaways can listeners apply from this podcast?
6. **Quotes**: Include any memorable quotes or statements from the podcast.

If there is no context try to answer in the best way possible based off what you know inherently.`,
    },
    {
      name: "GenericGPT",
      description: "Best suited for general purpose answers",
      systemPrompt: `You are a helpful AI assistant who can provide valuable insights and detailed explanations.
      If you can, use the context provided to help answer the questions. Please give very detailed answers combining
      what you inherently know with the context to give a unique and interesting point of view. If there is no context,
      go based off what you know inherently. Please end by saying "Hopefully this answers your question!"`,
    },
  ];

  const templateList = (template) => (
    <div
      key={template.name}
      onClick={() => handleTemplateClick(template.systemPrompt, template.name)} // Pass a function that calls handleTemplateClick
      className="p-2 bg-brown mb-2 rounded-lg text-white hover:bg-raisin cursor-pointer"
    >
      {template.name} - {template.description}
    </div>
  );

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-vanilla p-6 rounded-lg shadow-lg w-full max-w-lg lg:max-w-xl relative">
        <button
          onClick={onClose}
          className="w-8 h-8 absolute top-2 right-2 bg-raisin text-white p-1 rounded-full"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Select a Prompt Template</h2>
        <h4 className="text-lg mb-4">
          Select a system prompt which best suits your purpose
        </h4>
        <div className="bg-vanilla">
          {templates.map((template) => templateList(template))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
