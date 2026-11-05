import React, { useState, useMemo } from 'react';
import { 
  Sprout, 
  Leaf, 
  Trees, 
  Search, 
  Film, 
  Tv, 
  Plus, 
  X, 
  Camera, 
  Upload, 
  BookOpen, 
  ExternalLink,
  Sparkles,
  FileText,
  Tag,
  Check,
  ChevronDown,
  Info
} from 'lucide-react';

// Initial dataset strictly based on the provided screenshots and handwritten notebooks
const initialStories = [
  // MUDA (4 items)
  {
    id: '1',
    title: 'Homem-Aranha: Um novo dia',
    type: 'Filme',
    stage: 'Muda',
    date: '13 de ago de 2026',
    excerpt: 'O filme Homem-Aranha: Um novo dia é a nova fase da vida de Peter Parker. Depois de tudo que aconteceu em Sem Volta Para Casa, ele está mais sozinho e precisa continuar sua vida como Homem-Aranha. O que mais me chamou atenção foi essa ideia de recomeçar...',
    tags: ['Homem-Aranha', 'Peter Parker', 'Responsabilidade', 'Recomeço'],
    fullText: 'O filme Homem-Aranha: Um novo dia é a nova fase da vida de Peter Parker. Depois de tudo que aconteceu em Sem Volta Para Casa, ele está mais sozinho e precisa continuar sua vida como Homem-Aranha. O que mais me chamou atenção foi essa ideia de recomeçar. Peter passou por muita coisa e teve que abrir mão de pessoas que gostava para proteger todo mundo. Mesmo sendo uma decisão difícil, ele fez o que achava certo e agora precisa lidar com as consequências.\n\nTambém acho interessante que o filme não seja apenas sobre o Homem-Aranha lutando contra vilões. A vida do Peter também faz parte da história. Ele precisa lidar com a solidão, com as perdas e com a responsabilidade de continuar ajudando as pessoas mesmo quando sua própria vida não está boa.\n\nIsso me fez pensar que, às vezes, a gente também precisa deixar algumas coisas para trás e começar de novo, mesmo quando não é exatamente o que queria. O Peter pode ter perdido muita coisa, mas isso não significa que a história dele acabou.'
  },
  {
    id: '2',
    title: 'Silo',
    type: 'Série',
    stage: 'Muda',
    date: '13 de ago de 2026',
    excerpt: 'A série Silo traz uma reflexão bem interessante sobre como as pessoas acabam aceitando viver em um sistema totalmente controlado e cheio de regras. Na história, a humanidade inteira mora dentro de um gigantesco abrigo subterrâneo...',
    tags: ['Controle', 'Verdade', 'Crescimento pessoal', 'Superação'],
    fullText: 'A série Silo traz uma reflexão bem interessante sobre como as pessoas acabam aceitando viver em um sistema totalmente controlado e cheio de regras. Na história, a humanidade inteira mora dentro de um gigantesco abrigo subterrâneo porque a versão oficial é de que o mundo lá fora virou um lugar tóxico e letal. Todo mundo nasce e morre ali dentro sem saber quem construiu aquilo de verdade ou se o governo está mentindo sobre lá fora.\n\nO que mais chama atenção é a jornada da protagonista, a Juliette. Ela investiga por conta própria e percebe que a história oficial é uma farsa para manter o medo.\n\nIsso faz a gente pensar que na vida, muitas vezes aceitamos as coisas só porque dizem que é o normal, sem questionar. A série mostra que, por mais difícil que seja sair da zona de conforto, buscar a liberdade é essencial.'
  },
  {
    id: '3',
    title: 'Rambo: First Blood',
    type: 'Filme',
    stage: 'Muda',
    date: '05 de set de 2026',
    excerpt: 'O filme Rambo traz uma reflexão de como a sociedade e as autoridades tentam impor um controle pesado e injusto sobre quem eles acham que não se encaixa. Na história, um ex-soldado da Guerra do Vietnã passa por uma cidadezinha...',
    tags: ['Controle', 'Verdade', 'Crescimento pessoal', 'Superação'],
    fullText: 'O filme Rambo traz uma reflexão de como a sociedade e as autoridades tentam impor um controle pesado e injusto sobre quem eles acham que não se encaixa. Na história, um ex-soldado da Guerra do Vietnã passa por uma cidadezinha e acaba preso de modo por um xerife abusado que não queria ele por lá. O ponto principal é que a verdade dos fatos é totalmente ignorada pela polícia, que prefere acobertar os próprios erros e tratar o cara como criminoso só para manter a marra. Rambo tem que fugir para a mata para se defender e percebe o quanto o sistema é podre.\n\nIsso faz a gente parar para pensar em como, no dia a dia, a gente muitas vezes aceita regras e julgamentos sem nem questionar.\n\nNo fim, a história mostra que o crescimento pessoal e a superação exigem coragem para encarar os traumas, peitar as dificuldades e lutar pela própria liberdade quando tudo parece contra a gente.'
  },
  {
    id: '4',
    title: 'The Batman',
    type: 'Filme',
    stage: 'Muda',
    date: '24 de set de 2026',
    excerpt: 'O filme The Batman mostra aquele peso de como a corrupção e o crime tentam impor um controle total sobre Gotham, com a máfia e os políticos mandando e desmandando enquanto o povo se ferra. O ponto principal gira em torno da verdade...',
    tags: ['Controle', 'Vingança', 'Político', 'Crescimento pessoal'],
    fullText: 'O filme The Batman mostra aquele peso de como a corrupção e o crime tentam impor um controle total sobre Gotham, com a máfia e os políticos mandando e desmandando enquanto o povo se ferra. O ponto principal gira em torno da verdade, o herói passa o filme todo caçando as pistas do Charada e descobre que a podridão da cidade é muito mais profunda do que ele pensava, sugando até o nome da própria família dele.\n\nPor trás da ação, o psicológico dele tá todo quebrado, o Bruce Wayne vive tomado pelo remoço e pela sede de vingança, usando a máscara só para descarregar os traumas do passado, totalmente isolado do mundo.\n\nIsso bate muito com a nossa vida quando a gente percebe que não dá para carregar o mundo nas costas sozinho. A história mostra que o crescimento pessoal e a superação acontecem de verdade quando ele cai na real de que Gotham não precisa de um cara assustador buscando vingança, mas sim de esperança, mudando a própria postura para virar um símbolo de luz.'
  },

  // SEMENTE (5 items)
  {
    id: '5',
    title: 'Divertidamente 2',
    type: 'Filme',
    stage: 'Semente',
    date: '30 de ago de 2026',
    excerpt: 'O filme Divertidamente 2 retrata aquela fase tensa da adolescência, destacando o quanto a pressão da galera por aceitação pesa. A história mostra como o medo de querer pertencer a um grupo e os palpites de fora acabam moldando diretamente a cabeça e o jeito de agir de todo mundo.',
    tags: ['Socialização', 'Identidade', 'Pressão social'],
    fullText: 'O filme Divertidamente 2 retrata aquela fase tensa da adolescência, destacando o quanto a pressão da galera por aceitação pesa. A história mostra como o medo de querer pertencer a um grupo e os palpites de fora acabam moldando diretamente a cabeça e o jeito de agir de todo mundo.'
  },
  {
    id: '6',
    title: 'Oppenheimer',
    type: 'Filme',
    stage: 'Semente',
    date: '30 de ago de 2026',
    excerpt: 'O filme Oppenheimer troca ideia sobre a ligação forte entre a ciência, o governo e a sociedade por trás da bomba atômica. A trama joga luz em como o avanço tecnológico atende aos interesses políticos e acaba gerando consequências pesadas e imorais para a vida de todo mundo no mundo moderno.',
    tags: ['Ciência', 'Ética', 'Impacto social'],
    fullText: 'O filme Oppenheimer troca ideia sobre a ligação forte entre a ciência, o governo e a sociedade por trás da bomba atômica. A trama joga luz em como o avanço tecnológico atende aos interesses políticos e acaba gerando consequências pesadas e imorais para a vida de todo mundo no mundo moderno.'
  },
  {
    id: '7',
    title: 'Guerra Civil',
    type: 'Filme',
    stage: 'Semente',
    date: '30 de ago de 2026',
    excerpt: 'O filme Guerra Civil mostra uma sociedade totalmente quebrada pela divisão política extrema, pelo fanatismo e pelo fim das leis. A trama serve para a gente ver como essa briga de todos consegue destruir rápido a convivência de boa num país e jogar tudo no caos generalizado.',
    tags: ['Polarização', 'Instituições', 'Conflitos sociais'],
    fullText: 'O filme Guerra Civil mostra uma sociedade totalmente quebrada pela divisão política extrema, pelo fanatismo e pelo fim das leis. A trama serve para a gente ver como essa briga de todos consegue destruir rápido a convivência de boa num país e jogar tudo no caos generalizado.'
  },
  {
    id: '8',
    title: 'Duna: Parte 2',
    type: 'Filme',
    stage: 'Semente',
    date: '30 de ago de 2026',
    excerpt: 'O filme Duna: Parte 2 mostra a trajetória do Paul Atreides se unindo ao povo de Arrakis para dar o troco nos inimigos. A história vai muito além de uma guerra no espaço, ela foca em como o poder muda as pessoas e como a pressão de cumprir uma profecia acaba levando alguém por caminhos bem perigosos...',
    tags: ['Superação', 'Destino', 'Escolhas'],
    fullText: 'O filme Duna: Parte 2 mostra a trajetória do Paul Atreides se unindo ao povo de Arrakis para dar o troco nos inimigos. A história vai muito além de uma guerra no espaço, ela foca em como o poder muda as pessoas e como a pressão de cumprir uma profecia acaba levando alguém por caminhos bem perigosos.\n\nO legal é ver o conflito interno dele entre o que ele quer para a vida e a obrigação de assumir o controle de um império. A trama faz a gente refletir sobre como o fanatismo, o imperialismo e a busca pelo controle de recursos moldam as sociedades e geram conflitos.'
  },
  {
    id: '9',
    title: 'Vingadores: Ultimato',
    type: 'Filme',
    stage: 'Semente',
    date: '20 de set de 2026',
    excerpt: 'O filme Vingadores Ultimato mostra o baque de perder o controle quando Thanos destrói metade do universo, deixando os heróis perdidos na culpa e na derrota. O ponto chave é encarar a verdade de que o passado não pode ser mudado e não ser que eles arrisquem tudo em uma missão temporal para consertar as coisas...',
    tags: ['Controle', 'Verdade', 'Guerra', 'Proteção', 'Superação'],
    fullText: 'O filme Vingadores Ultimato mostra o baque de perder o controle quando Thanos destrói metade do universo, deixando os heróis perdidos na culpa e na derrota. O ponto chave é encarar a verdade de que o passado não pode ser mudado e não ser que eles arrisquem tudo em uma missão temporal para consertar as coisas.\n\nNo lado psicológico, cada um lida com feridas profundas: o Tony com a culpa e a família, o Thor com a depressão e o Steve tentando juntar os cacos. Isso reflete a vida quando levamos fardos pesados.\n\nA jornada mostra que o crescimento pessoal e a superação exigem aceitar a falha, superar a dor e dar o passo final, mesmo que exija o maior sacrifício.'
  }
];

export default function App() {
  const [stories, setStories] = useState(initialStories);
  const [activeTab, setActiveTab] = useState('Muda'); // Initial active tab from screenshot 1 & 2
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Todos os tipos');
  
  // Modals state
  const [readingStory, setReadingStory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New story form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Filme');
  const [newStage, setNewStage] = useState('Semente');
  const [newText, setNewText] = useState('');
  const [newTags, setNewTags] = useState('controle, verdade');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Counts by stage
  const counts = useMemo(() => {
    return {
      Semente: stories.filter(s => s.stage === 'Semente').length,
      Muda: stories.filter(s => s.stage === 'Muda').length,
      Árvore: stories.filter(s => s.stage === 'Árvore').length,
      total: stories.length
    };
  }, [stories]);

  // Recurrent tags for cloud display
  const allTags = useMemo(() => {
    const map = {};
    stories.forEach(s => s.tags?.forEach(t => map[t] = (map[t] || 0) + 1));
    return Object.keys(map).slice(0, 7);
  }, [stories]);

  // Filtered stories
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesStage = story.stage === activeTab;
      const matchesType = selectedType === 'Todos os tipos' || story.type === selectedType;
      const matchesSearch = searchQuery === '' || 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStage && matchesType && matchesSearch;
    });
  }, [stories, activeTab, selectedType, searchQuery]);

  // Handle OCR Simulation
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setIsScanning(true);
      // Simulate OCR processing delay
      setTimeout(() => {
        setIsScanning(false);
        const sampleTexts = [
          "O filme explora as camadas mais profundas do desapego e do perdão. Ao aceitar que o passado não nos define totalmente, abre-se espaço para uma nova perspectiva de vida.",
          "Esta obra traz uma reflexão profunda sobre como a tecnologia altera as relações afetivas e a percepção da própria realidade ao longo dos anos.",
          "Uma análise perspicaz sobre o dilema entre a liberdade individual e as exigências da convivência coletiva sob forte opressão."
        ];
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        setNewText(prev => prev ? `${prev}\n\n[Texto Digitalizado da Foto]:\n${randomText}` : randomText);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  // Create new Story
  const handleCreateStory = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const tagArray = newTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const createdStory = {
      id: Date.now().toString(),
      title: newTitle,
      type: newType,
      stage: newStage,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      excerpt: newText.slice(0, 210) + (newText.length > 210 ? '...' : ''),
      fullText: newText,
      tags: tagArray.length > 0 ? tagArray : ['reflexão']
    };

    setStories([createdStory, ...stories]);
    setActiveTab(newStage);
    
    // Reset form & close modal
    setNewTitle('');
    setNewText('');
    setUploadedImage(null);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#2C3531] font-sans antialiased selection:bg-[#2D5A4C] selection:text-white">
      {/* Top Bar */}
      <header className="max-w-6xl mx-auto px-4 py-8 flex justify-between items-center border-b border-[#E7E3D8]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full border border-[#2D5A4C]/20 bg-[#EFF2EB] text-[#2D5A4C]">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="font-serif text-xl font-semibold tracking-tight text-[#1C2826]">
            Meu Cine Jardim
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C8C85] font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Um diário de histórias</span>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[#2D5A4C] hover:bg-[#23473C] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar História</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#2D5A4C]">
              <Sprout className="w-4 h-4" />
              <span>Um lugar para guardar o que fica</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1C2826]">
              Histórias que <br />
              <span className="italic text-[#B85B35] font-serif">criam raízes.</span>
            </h1>
            <p className="text-[#65736E] max-w-xl text-base leading-relaxed pt-1">
              Um jardim pessoal de filmes e séries — com palavras sobre o que cada história despertou, provocou e deixou depois dos créditos.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end items-baseline">
            <div className="text-right">
              <span className="text-6xl font-serif text-[#1C2826] font-light leading-none">
                {counts.total}
              </span>
              <span className="block text-xs uppercase tracking-wider text-[#7C8C85] font-semibold mt-1">
                textos neste jardim
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Summary / Insights Card */}
        <div className="bg-[#FAF9F5] border border-[#E7E3D8] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm">
          <div className="md:col-span-5 flex items-start gap-4 pr-0 md:pr-6 md:border-r border-[#E7E3D8]">
            <div className="p-3 bg-[#EFF2EB] border border-[#2D5A4C]/20 rounded-xl text-[#2D5A4C] shrink-0 mt-1">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[#1C2826]">
                Um olhar em formação
              </h3>
              <p className="text-sm text-[#65736E] mt-1 leading-relaxed">
                Pelos textos deste jardim, aparecem perguntas sobre como a gente vive — e sobre o que pode mudar.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#7C8C85] font-bold block">
              Temas que voltam nas suas leituras
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {allTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full border border-[#D5DDD8] bg-white text-xs text-[#42524C] font-medium transition-colors hover:border-[#2D5A4C]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Shelves Controls & Filtering */}
        <div className="space-y-6 pt-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7C8C85] font-bold block">
              Seu acervo pessoal
            </span>
            <h2 className="text-3xl font-serif text-[#1C2826] mt-0.5">
              As prateleiras
            </h2>
            <p className="text-sm text-[#65736E]">
              {activeTab === 'Semente' && 'Histórias que começaram a ficar por aqui.'}
              {activeTab === 'Muda' && 'Histórias que ganharam espaço no jardim.'}
              {activeTab === 'Árvore' && 'Uma prateleira em produção.'}
            </p>
          </div>

          {/* Search & Filter bar */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-[#E7E3D8] pb-px w-full sm:w-auto">
              {[
                { id: 'Semente', icon: Sprout, count: counts.Semente },
                { id: 'Muda', icon: Leaf, count: counts.Muda },
                { id: 'Árvore', icon: Trees, count: counts.Árvore },
              ].map(tab => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 font-medium text-sm border-b-2 transition-all ${
                      isActive
                        ? 'border-[#2D5A4C] text-[#2D5A4C]'
                        : 'border-transparent text-[#7C8C85] hover:text-[#2C3531]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-[#EFF2EB] text-[#2D5A4C]' : 'bg-[#EAE7DC] text-[#7C8C85]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search Box */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8C85]" />
                <input
                  type="text"
                  placeholder="Buscar nesta prateleira"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#E7E3D8] rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#2D5A4C] text-[#2C3531] placeholder-[#A0ACA6]"
                />
              </div>

              {/* Select Type Dropdown */}
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="bg-white border border-[#E7E3D8] rounded-xl px-3 py-2 text-sm text-[#2C3531] focus:outline-none focus:border-[#2D5A4C] cursor-pointer"
              >
                <option value="Todos os tipos">Todos os tipos</option>
                <option value="Filme">Filme</option>
                <option value="Série">Série</option>
              </select>
            </div>
          </div>

          {/* Cards Grid / Empty States */}
          {filteredStories.length === 0 ? (
            <div className="bg-[#FAF9F5] border border-dashed border-[#D5DDD8] rounded-2xl p-16 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#EFF2EB] text-[#2D5A4C] flex items-center justify-center">
                {activeTab === 'Árvore' ? (
                  <Trees className="w-6 h-6" />
                ) : (
                  <Search className="w-6 h-6" />
                )}
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="font-serif text-2xl font-medium text-[#1C2826]">
                  {activeTab === 'Árvore' 
                    ? 'Esta prateleira está sendo produzida.'
                    : 'Nenhum texto encontrado.'}
                </h3>
                <p className="text-sm text-[#65736E]">
                  {activeTab === 'Árvore'
                    ? 'A Árvore ainda está sendo preparada. Por enquanto, ela fica aqui, em silêncio.'
                    : 'Tente mudar os filtros ou o termo de busca para encontrar o que procura.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStories.map(story => (
                <div
                  key={story.id}
                  className="bg-white border border-[#E7E3D8] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between text-xs text-[#7C8C85] font-semibold uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        {story.type === 'Filme' ? (
                          <Film className="w-3.5 h-3.5" />
                        ) : (
                          <Tv className="w-3.5 h-3.5" />
                        )}
                        <span>{story.type}</span>
                      </div>
                      <span>{story.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-semibold text-[#1C2826] group-hover:text-[#2D5A4C] transition-colors">
                      {story.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-[#65736E] leading-relaxed line-clamp-4">
                      {story.excerpt}
                    </p>
                  </div>

                  {/* Card Footer (Tags & Read Button) */}
                  <div className="pt-6 mt-4 border-t border-[#F2EFE9] flex items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {story.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-full bg-[#F5ECE8] text-[#9E4C33] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {story.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#F0ECE1] text-[#7C8C85] text-xs font-medium">
                          +{story.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setReadingStory(story)}
                      className="text-xs font-bold text-[#2D5A4C] hover:text-[#1F3D34] flex items-center gap-1 whitespace-nowrap"
                    >
                      <span>Ler resumo</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 mt-16 border-t border-[#E7E3D8] flex flex-col sm:flex-row justify-between items-center text-xs text-[#7C8C85] gap-4">
        <div className="flex items-center gap-2">
          <Sprout className="w-4 h-4 text-[#2D5A4C]" />
          <span>Meu Cine Jardim</span>
        </div>
        <p>Um registro pessoal do que as histórias fazem pensar.</p>
      </footer>

      {/* --- MODAL: Read Full Summary --- */}
      {readingStory && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E7E3D8] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-start border-b border-[#F2EFE9] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7C8C85] font-semibold">
                  <span className="px-2 py-0.5 rounded bg-[#EFF2EB] text-[#2D5A4C]">
                    {readingStory.type}
                  </span>
                  <span>•</span>
                  <span>{readingStory.stage}</span>
                  <span>•</span>
                  <span>{readingStory.date}</span>
                </div>
                <h2 className="font-serif text-3xl text-[#1C2826] font-bold">
                  {readingStory.title}
                </h2>
              </div>
              <button
                onClick={() => setReadingStory(null)}
                className="p-2 rounded-full hover:bg-[#F8F6F0] text-[#7C8C85] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-[#42524C] leading-relaxed font-serif text-base">
              {readingStory.fullText.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F2EFE9] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#7C8C85]" />
              <div className="flex flex-wrap gap-2">
                {readingStory.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#F5ECE8] text-[#9E4C33] text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: Add / Digitalize Story (OCR) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E7E3D8] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#F2EFE9] pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#EFF2EB] text-[#2D5A4C]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-[#1C2826] font-semibold">
                    Adicionar Nova História
                  </h2>
                  <p className="text-xs text-[#7C8C85]">
                    Escreva manualmente ou envie a foto de um caderno para digitalizar.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#F8F6F0] text-[#7C8C85] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStory} className="space-y-6">
              {/* Photo Upload & Simulated OCR section */}
              <div className="bg-[#FAF9F5] border border-dashed border-[#D5DDD8] rounded-xl p-4 sm:p-6 text-center space-y-3">
                {uploadedImage ? (
                  <div className="space-y-3">
                    <div className="relative max-h-48 rounded-lg overflow-hidden border border-[#E7E3D8] inline-block">
                      <img
                        src={uploadedImage}
                        alt="Preview do texto"
                        className="max-h-48 object-contain"
                      />
                      {isScanning && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2">
                          <Sparkles className="w-6 h-6 animate-spin text-[#93C5FD]" />
                          <span className="text-xs font-semibold">Digitalizando e extraindo texto...</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center gap-3">
                      <label className="cursor-pointer text-xs font-semibold text-[#2D5A4C] hover:underline flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Trocar imagem</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto w-10 h-10 rounded-full bg-[#EFF2EB] text-[#2D5A4C] flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-[#1C2826]">
                      Tire foto ou envie o arquivo do seu caderno
                    </p>
                    <p className="text-xs text-[#7C8C85] mt-1">
                      O leitor OCR converterá sua foto diretamente em texto editável abaixo.
                    </p>
                    <label className="mt-3 inline-flex items-center gap-2 bg-white border border-[#E7E3D8] px-4 py-2 rounded-lg text-xs font-bold text-[#2C3531] shadow-xs cursor-pointer hover:bg-[#F8F6F0] transition-colors">
                      <Camera className="w-4 h-4 text-[#2D5A4C]" />
                      <span>Selecionar Foto</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                )}
              </div>

              {/* Story Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7C8C85] mb-1.5">
                    Título da Obra
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Interstellar"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full bg-white border border-[#E7E3D8] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#2D5A4C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7C8C85] mb-1.5">
                    Tipo
                  </label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value)}
                    className="w-full bg-white border border-[#E7E3D8] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#2D5A4C]"
                  >
                    <option value="Filme">Filme</option>
                    <option value="Série">Série</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7C8C85] mb-1.5">
                    Prateleira
                  </label>
                  <select
                    value={newStage}
                    onChange={e => setNewStage(e.target.value)}
                    className="w-full bg-white border border-[#E7E3D8] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#2D5A4C]"
                  >
                    <option value="Semente">Semente</option>
                    <option value="Muda">Muda</option>
                    <option value="Árvore">Árvore</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7C8C85] mb-1.5">
                  Reflexão / Texto da História
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Escreva ou edite o texto digitalizado..."
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  className="w-full bg-white border border-[#E7E3D8] rounded-xl p-3.5 text-sm font-serif leading-relaxed focus:outline-none focus:border-[#2D5A4C]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7C8C85] mb-1.5">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  placeholder="ex: controle, verdade, memória"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  className="w-full bg-white border border-[#E7E3D8] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#2D5A4C]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-[#F2EFE9]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-[#7C8C85] hover:bg-[#F8F6F0]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#2D5A4C] hover:bg-[#23473C] text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Salvar no Jardim</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}