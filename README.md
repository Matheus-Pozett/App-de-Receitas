# 🍲 App de Receitas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Testing-Library](https://img.shields.io/badge/Testing%20Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

Um aplicativo front-end focado em dispositivos móveis (Mobile-First) que permite aos usuários explorar, buscar, favoritar e acompanhar o passo a passo de diversas receitas de comidas e bebidas. O projeto consome dados reais de duas APIs externas: **TheMealDB** e **TheCocktailDB**.

---

## 📱 Demonstração

https://app-de-receitas-five-fawn.vercel.app/

---

## ✨ Funcionalidades

- **Autenticação Simulada:** Tela de login com validação de formulários (e-mail e senha).
- **Catálogo de Receitas:** Listagem das principais receitas de comidas e bebidas.
- **Filtros e Buscas Avançadas:** - Filtro por categorias (ex: Beef, Breakfast, Chicken, Cocktail, etc).
  - Busca customizada por nome da receita, ingrediente principal ou primeira letra.
- **Detalhes da Receita:** Visualização completa contendo ingredientes, medidas, instruções passo a passo e vídeo demonstrativo (para comidas).
- **Acompanhamento (In Progress):** Capacidade de iniciar uma receita e marcar os ingredientes já utilizados (salvamento contínuo).
- **Favoritos e Compartilhamento:** - Sistema de favoritar receitas (salvas no `localStorage`).
  - Compartilhamento de receitas copiando o link direto para a área de transferência.
- **Histórico:** Telas exclusivas para listar receitas favoritas e receitas já concluídas.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

### **Front-End**
- **[React](https://reactjs.org/)** (com Hooks e Functional Components)
- **[TypeScript](https://www.typescriptlang.org/)** para tipagem estática e maior segurança no código.
- **[Vite](https://vitejs.dev/)** como build tool para um desenvolvimento rápido e otimizado.
- **[Context API](https://reactjs.org/docs/context.html)** para o gerenciamento de estado global da aplicação.
- **[React Router DOM](https://reactrouter.com/)** para o roteamento e navegação entre as telas (SPA).
- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** para gerenciamento e validação de formulários.
- **[React Bootstrap](https://react-bootstrap.github.io/)** para estilização rápida e responsiva de componentes.

### **Testes**
- **[Vitest](https://vitest.dev/)** + **[React Testing Library (RTL)](https://testing-library.com/)** para testes unitários e de integração (alta cobertura de código).

### **APIs Externas**
- **[TheMealDB](https://www.themealdb.com/api.php)** - API para os dados de comidas.
- **[TheCocktailDB](https://www.thecocktaildb.com/api.php)** - API para os dados de bebidas.

---

Desenvolvido por [Matheus Pozett](https://www.linkedin.com/in/matheus-pozett/)