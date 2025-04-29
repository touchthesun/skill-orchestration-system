// Custom JavaScript for DoIT Skills Orchestration System documentation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    });
    
    // Add classes to user story sections for styling
    styleUserStories();
    
    // Add classes to architecture diagrams for styling
    styleArchitectureDiagrams();
    
    // Add copy button for command line examples
    addCopyButtonsToCommandLines();
    
    // Add LLM interface styling
    styleLLMSections();
  });
  
  /**
   * Apply styling to user story sections
   */
  function styleUserStories() {
    const userStoryHeadings = document.querySelectorAll('h3:contains("As a")');
    
    userStoryHeadings.forEach(heading => {
      const storySection = document.createElement('div');
      storySection.className = 'user-story';
      
      // Get all elements until the next heading
      let sibling = heading.nextElementSibling;
      const elementsToMove = [heading];
      
      while (sibling && !['H1', 'H2', 'H3'].includes(sibling.tagName)) {
        elementsToMove.push(sibling);
        sibling = sibling.nextElementSibling;
      }
      
      // Move elements to the new container
      elementsToMove.forEach(el => {
        storySection.appendChild(el.cloneNode(true));
      });
      
      // Replace the original elements with the container
      heading.parentNode.insertBefore(storySection, heading);
      elementsToMove.forEach(el => el.remove());
    });
  }
  
  /**
   * Apply styling to architecture diagram sections
   */
  function styleArchitectureDiagrams() {
    const mermaidDivs = document.querySelectorAll('.mermaid');
    
    mermaidDivs.forEach(div => {
      if (div.textContent.includes('graph TD') || div.textContent.includes('flowchart')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'architecture-diagram';
        div.parentNode.insertBefore(wrapper, div);
        wrapper.appendChild(div);
      }
    });
  }
  
  /**
   * Add copy buttons to command line examples
   */
  function addCopyButtonsToCommandLines() {
    const codeBlocks = document.querySelectorAll('pre code.language-bash, pre code.language-shell');
    
    codeBlocks.forEach(block => {
      const button = document.createElement('button');
      button.className = 'md-clipboard md-icon';
      button.title = 'Copy to clipboard';
      button.dataset.clipboardTarget = '#' + block.id;
      
      button.addEventListener('click', function() {
        const text = block.textContent;
        navigator.clipboard.writeText(text).then(() => {
          button.setAttribute('data-md-state', 'done');
          setTimeout(() => button.removeAttribute('data-md-state'), 1000);
        });
      });
      
      block.parentNode.insertBefore(button, block);
    });
  }
  
  /**
   * Style LLM interface sections
   */
  function styleLLMSections() {
    const llmSections = document.querySelectorAll('h2:contains("LLM"), h3:contains("LLM"), h4:contains("LLM")');
    
    llmSections.forEach(section => {
      const wrapper = document.createElement('div');
      wrapper.className = 'llm-interface';
      
      // Get all elements until the next heading of same or higher level
      let sibling = section.nextElementSibling;
      const elementsToMove = [section];
      const headingLevel = parseInt(section.tagName.substring(1));
      
      while (sibling && 
             (sibling.tagName.charAt(0) !== 'H' || 
              parseInt(sibling.tagName.substring(1)) > headingLevel)) {
        elementsToMove.push(sibling);
        sibling = sibling.nextElementSibling;
      }
      
      // Move elements to the new container
      elementsToMove.forEach(el => {
        wrapper.appendChild(el.cloneNode(true));
      });
      
      // Replace the original elements with the container
      section.parentNode.insertBefore(wrapper, section);
      elementsToMove.forEach(el => el.remove());
    });
  }
  
  // Helper for text content matching
  HTMLElement.prototype.contains = function(text) {
    return this.textContent.includes(text);
  };