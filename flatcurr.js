// JavaScript Document
document.addEventListener("DOMContentLoaded", () => {
  const processTextNodes = (element) => {
    element.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(
          /([â‚¬$Â£â‚¹Â¥]|kr|zÅ‚|RM)\s?0[,.]00|0,00\s?(kr|zÅ‚)|â‚¹0,00|â‚¹0\.00|Â¥\s?0[,.]00|RM\s?0\.00|Â¥\s?0/g,
          "FREE"
        );
        node.textContent = node.textContent.replace(/(\d+)[,.]00/g, "$1");
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        processTextNodes(node);
      }
    });
  };
  processTextNodes(document.body);
});