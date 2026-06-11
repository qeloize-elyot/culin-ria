document.addEventListener('DOMContentLoaded', () => {
    // 1. Acessibilidade de Fontes e Contraste
    let currentFontSize = 16;
    const htmlElement = document.documentElement;

    const updateFontSize = (newSize) => {
        if (newSize >= 12 && newSize <= 24) {
            currentFontSize = newSize;
            htmlElement.style.fontSize = `${currentFontSize}px`;
        }
    };

    document.getElementById('btn-increase-font').addEventListener('click', () => updateFontSize(currentFontSize + 2));
    document.getElementById('btn-decrease-font').addEventListener('click', () => updateFontSize(currentFontSize - 2));

    const btnContrast = document.getElementById('btn-high-contrast');
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // 2. Componente de Carrossel de Receitas (Renderização Dinâmica via Objeto)
    const recipes = [
        { title: "Panqueca de Aveia Rosa", time: "15 min", emoji: "🥞", desc: "Super fácil, não gruda na frigideira e rende fotos lindas." },
        { title: "Macarrão de 1 Panela Só", time: "20 min", emoji: "🍝", desc: "Sujou só uma panela. A IA avisa o ponto da massa para não passar." },
        { title: "Bolo de Caneca Mágico", time: "5 min", emoji: "🧁", desc: "Perfeito para matar a vontade de doce rápido sem bagunçar a cozinha." },
        { title: "Ovo Mexido de Hotel", time: "10 min", emoji: "🍳", desc: "Cremoso, leve e sem erro para quem está começando hoje." }
    ];

    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <div class="recipe-placeholder">${recipe.emoji}</div>
                <h3>${recipe.title}</h3>
                <p style="color: #ff6b6b; font-weight: 600;">⏱️ ${recipe.time}</p>
                <p>${recipe.desc}</p>
            `;
            carouselContainer.appendChild(card);
        });
    }

    // 3. Componente de Acordeão FAQ (Renderização Dinâmica via Objeto)
    const faqs = [
        { q: "Nunca cozinhei na vida, esse site é para mim?", a: "Com certeza absoluta! O layout e as receitas foram desenhados com passos ultra simplificados e medidas comuns (xícaras, colheres), sem termos complexos." },
        { q: "Como funciona a IA Chef de verdade?", a: "É um assistente virtual ativo ao lado de cada receita. Se você não sabe o que é 'refogar' ou quer substituir um ingrediente que não tem em casa, pergunte e a IA responde na mesma hora." },
        { q: "As receitas dão certo mesmo?", a: "Sim. Todas as nossas receitas são validadas para possuir uma alta tolerância ao erro humano." }
    ];

    const accordionContainer = document.getElementById('accordion-container');
    if (accordionContainer) {
        faqs.forEach((faq, index) => {
            const item = document.createElement('div');
            item.classList.add('accordion-item');
            item.innerHTML = `
                <div class="accordion-header" onclick="window.toggleAccordion(${index})">
                    ${faq.q} <span id="icon-${index}">+</span>
                </div>
                <div class="accordion-body" id="body-${index}">
                    <p>${faq.a}</p>
                </div>
            `;
            accordionContainer.appendChild(item);
        });
    }

    // Lógica Global de Abertura/Fechamento do Acordeão
    window.toggleAccordion = function(index) {
        const body = document.getElementById(`body-${index}`);
        const icon = document.getElementById(`icon-${index}`);
        
        if (body.classList.contains('active')) {
            body.classList.remove('active');
            icon.textContent = '+';
        } else {
            // Fecha todos os outros abertos para manter a tela limpa
            document.querySelectorAll('.accordion-body').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.accordion-header span').forEach(el => el.textContent = '+');
            
            body.classList.add('active');
            icon.textContent = '-';
        }
    };
});
