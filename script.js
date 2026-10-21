document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const addStartBtn = document.getElementById('add-start');
  const addProcessBtn = document.getElementById('add-process');
  const addDecisionBtn = document.getElementById('add-decision');
  const clearCanvasBtn = document.getElementById('clear-canvas');

  let activeNode = null;
  let offsetX = 0;
  let offsetY = 0;

  // Adicionar novos blocos
  addStartBtn.addEventListener('click', () => createNode('Início / Fim', 'start'));
  addProcessBtn.addEventListener('click', () => createNode('Processo', 'process'));
  addDecisionBtn.addEventListener('click', () => createNode('Decisão?', 'decision'));

  // Limpar a tela
  clearCanvasBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar todo o fluxograma?')) {
      canvas.innerHTML = '';
    }
  });

  // Função para criar um elemento de bloco
  function createNode(defaultText, type) {
    const node = document.createElement('div');
    node.className = `node ${type}`;
    
    // Posição inicial centralizada com variação leve
    const randomOffset = Math.floor(Math.random() * 40);
    node.style.left = `${50 + randomOffset}px`;
    node.style.top = `${50 + randomOffset}px`;

    const textSpan = document.createElement('span');
    textSpan.contentEditable = true;
    textSpan.innerText = defaultText;

    // Evita arrastar a caixa ao tentar selecionar e editar texto
    textSpan.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });

    node.appendChild(textSpan);
    canvas.appendChild(node);

    makeDraggable(node);
  }

  // Tornar os blocos arrastáveis (Drag and Drop)
  function makeDraggable(element) {
    element.addEventListener('mousedown', (e) => {
      activeNode = element;
      const rect = element.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      element.style.zIndex = 1000;
    });
  }

  document.addEventListener('mousemove', (e) => {
    if (!activeNode) return;

    const canvasRect = canvas.getBoundingClientRect();
    let x = e.clientX - canvasRect.left - offsetX;
    let y = e.clientY - canvasRect.top - offsetY;

    // Limites da área do canvas
    x = Math.max(0, Math.min(x, canvasRect.width - activeNode.offsetWidth));
    y = Math.max(0, Math.min(y, canvasRect.height - activeNode.offsetHeight));

    activeNode.style.left = `${x}px`;
    activeNode.style.top = `${y}px`;
  });

  document.addEventListener('mouseup', () => {
    if (active
