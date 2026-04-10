#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// ── Product Data ──────────────────────────────────────────
const SITE = {
  name: 'Pull Vikings',
  domain: 'pull-vikings.fr',
  tag: 'zafili-21',
  year: 2026,
};

const products = [
  {
    slug: 'pull-viking-homme',
    keyword: 'pull viking homme',
    title: 'Pull Viking Homme Col Roulé en Laine Tricotée',
    shortTitle: 'Pull Viking Homme',
    asin: 'B0FWPLNC6M',
    price: '29,99',
    oldPrice: '39,99',
    discount: '-25%',
    stars: 4.3,
    reviewsCount: 187,
    category: 'Homme',
    img: 'product-homme.jpg',
    desc: 'Ce pull viking pour homme allie le style nordique authentique au confort moderne. Confectionné en laine tricotée épaisse, son col roulé protège du froid tandis que ses motifs inspirés de la mythologie scandinave ajoutent une touche de caractère. Coupe décontractée, idéal pour un look viking au quotidien.',
    features: ['Laine tricotée douce et chaude', 'Col roulé confortable', 'Motifs nordiques authentiques', 'Tailles S à 3XL disponibles', 'Lavable en machine à 30°C'],
    specs: { 'Matière': 'Laine mélangée tricotée', 'Col': 'Col roulé', 'Manches': 'Longues', 'Coupe': 'Regular / Décontractée', 'Tailles': 'S, M, L, XL, 2XL, 3XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking homme col roulé en laine tricotée. Style nordique authentique, motifs scandinaves, coupe confortable. Livraison rapide Amazon.',
    faq: [
      { q: 'Ce pull viking homme taille-t-il grand ?', a: 'Ce pull viking pour homme a une coupe regular. Nous conseillons de prendre votre taille habituelle. Pour un look plus ample façon viking, prenez une taille au-dessus.' },
      { q: 'Le pull est-il vraiment chaud ?', a: 'Oui, la laine tricotée offre une excellente isolation thermique. Le col roulé renforce la chaleur au niveau du cou, idéal pour les journées froides.' },
      { q: 'Comment entretenir ce pull viking ?', a: 'Lavez-le en machine à 30°C avec un programme délicat. Séchage à plat recommandé pour conserver la forme et les motifs.' }
    ]
  },
  {
    slug: 'pull-viking-femme',
    keyword: 'pull viking femme',
    title: 'Pull Viking Femme Laine Mérinos Motifs Nordiques',
    shortTitle: 'Pull Viking Femme',
    asin: 'B0CN6C4VNW',
    price: '89,99',
    oldPrice: '129,99',
    discount: '-31%',
    stars: 4.6,
    reviewsCount: 94,
    category: 'Femme',
    img: 'product-femme.jpg',
    desc: 'Pull viking femme premium en laine mérinos, inspiré des traditions norvégiennes. Ce pull combine élégance et authenticité avec ses motifs géométriques nordiques tissés dans une laine douce et respirante. Parfait pour un style scandinave raffiné.',
    features: ['Laine mérinos premium ultra-douce', 'Motifs géométriques norvégiens', 'Coupe cintrée féminine', 'Respirant et thermorégulant', 'Tailles XS à XXL'],
    specs: { 'Matière': 'Laine mérinos 100%', 'Col': 'Col rond', 'Manches': 'Longues', 'Coupe': 'Cintrée / Féminine', 'Tailles': 'XS, S, M, L, XL, XXL', 'Entretien': 'Lavage délicat 30°C' },
    metaDesc: 'Pull viking femme en laine mérinos avec motifs nordiques. Coupe féminine, laine premium, style scandinave. Disponible sur Amazon.',
    faq: [
      { q: 'La laine mérinos gratte-t-elle ?', a: 'Non, la laine mérinos est réputée pour sa douceur exceptionnelle. Ses fibres fines ne provoquent pas d\'irritation, contrairement à la laine classique.' },
      { q: 'Ce pull femme convient-il pour le bureau ?', a: 'Absolument. Son design élégant aux motifs nordiques discrets en fait un pull parfait pour le bureau comme pour les sorties.' },
      { q: 'Comment choisir ma taille ?', a: 'Ce pull a une coupe cintrée. Si vous hésitez entre deux tailles ou préférez un peu plus d\'aisance, prenez la taille supérieure.' }
    ]
  },
  {
    slug: 'pull-viking-laine',
    keyword: 'pull viking laine',
    title: 'Pull Viking en Laine Épaisse Charbon Motif Runes',
    shortTitle: 'Pull Viking Laine',
    asin: 'B008YDTJ8O',
    price: '119,99',
    oldPrice: '159,99',
    discount: '-25%',
    stars: 4.7,
    reviewsCount: 62,
    category: 'Premium',
    img: 'product-laine.jpg',
    desc: 'Pull viking en laine véritable de qualité premium, teinte charbon profond. Les motifs de runes scandinaves sont tissés directement dans la maille, créant un relief subtil et authentique. Une pièce d\'exception pour les amateurs de style nordique haut de gamme.',
    features: ['Laine épaisse haute qualité', 'Motifs de runes tissés en relief', 'Teinte charbon profond', 'Fabrication soignée', 'Résistant et durable'],
    specs: { 'Matière': 'Laine vierge mélangée', 'Col': 'Col montant', 'Manches': 'Longues', 'Coupe': 'Regular', 'Tailles': 'S à XXL', 'Entretien': 'Lavage délicat / Pressing' },
    metaDesc: 'Pull viking en laine épaisse charbon avec motifs de runes. Qualité premium, laine véritable, style nordique authentique. Achat Amazon.',
    faq: [
      { q: 'Ce pull en laine rétrécit-il au lavage ?', a: 'Avec un lavage délicat à 30°C et un séchage à plat, ce pull conserve sa forme. Évitez le sèche-linge qui pourrait provoquer un rétrécissement.' },
      { q: 'Les motifs de runes sont-ils brodés ou imprimés ?', a: 'Les motifs sont tissés directement dans la maille lors de la fabrication, ce qui les rend durables et leur donne un joli relief texturé.' },
      { q: 'Ce pull convient-il pour l\'extérieur en hiver ?', a: 'Sa laine épaisse offre une bonne isolation, parfait comme couche principale en mi-saison ou comme couche intermédiaire en plein hiver.' }
    ]
  },
  {
    slug: 'pull-viking-style',
    keyword: 'pull viking stylé',
    title: 'Pull Viking Stylé Mythologie Nordique Odin 3D',
    shortTitle: 'Pull Viking Stylé',
    asin: 'B0FS7GCJHT',
    price: '35,99',
    oldPrice: '49,99',
    discount: '-28%',
    stars: 4.2,
    reviewsCount: 312,
    category: 'Tendance',
    img: 'product-style.jpg',
    desc: 'Pull viking au design ultra-stylé avec impression 3D de guerrier nordique Odin. Un vêtement qui fait tourner les têtes avec ses motifs détaillés de mythologie viking. Tissu polyester-spandex confortable et respirant, idéal pour affirmer votre style nordique.',
    features: ['Impression 3D haute définition', 'Design mythologie Odin unique', 'Tissu stretch confortable', 'Séchage rapide', 'Unisexe — coupe moderne'],
    specs: { 'Matière': '88% Polyester, 12% Spandex', 'Col': 'Capuche avec cordon', 'Manches': 'Longues', 'Coupe': 'Regular unisexe', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking stylé avec impression 3D mythologie Odin. Design unique, tissu confortable, coupe moderne. Commander sur Amazon.',
    faq: [
      { q: 'L\'impression 3D s\'abîme-t-elle au lavage ?', a: 'Non, l\'impression est réalisée par sublimation thermique et résiste très bien aux lavages en machine à 30°C. Retournez le pull avant lavage pour préserver les couleurs.' },
      { q: 'Ce pull est-il épais ou léger ?', a: 'C\'est un pull de poids moyen, parfait pour le printemps et l\'automne. En hiver, il peut servir de couche intermédiaire stylée sous une veste.' },
      { q: 'Convient-il aux femmes aussi ?', a: 'Oui, c\'est un modèle unisexe. Consultez le guide des tailles pour trouver votre coupe idéale.' }
    ]
  },
  {
    slug: 'pull-viking-tricot',
    keyword: 'pull viking tricot',
    title: 'Pull Viking Tricot Jacquard Motifs Nordiques',
    shortTitle: 'Pull Viking Tricot',
    asin: 'B0FRYHDL53',
    price: '34,99',
    oldPrice: '44,99',
    discount: '-22%',
    stars: 4.1,
    reviewsCount: 145,
    category: 'Classique',
    img: 'product-tricot.jpg',
    desc: 'Pull viking en tricot jacquard avec motifs nordiques traditionnels. Ce pull mêle l\'art du tricot scandinave à un style décontracté contemporain. Maille serrée et confortable, motifs géométriques emblématiques des traditions vikings.',
    features: ['Tricot jacquard authentique', 'Motifs géométriques scandinaves', 'Maille serrée et chaude', 'Style décontracté', 'Disponible en plusieurs coloris'],
    specs: { 'Matière': 'Acrylique et laine mélangée', 'Col': 'Col rond', 'Manches': 'Longues', 'Coupe': 'Décontractée', 'Tailles': 'M à 3XL', 'Entretien': 'Machine 30°C programme laine' },
    metaDesc: 'Pull viking tricot jacquard avec motifs nordiques traditionnels. Maille chaude, style scandinave authentique. Acheter sur Amazon.',
    faq: [
      { q: 'Qu\'est-ce que le tricot jacquard ?', a: 'Le jacquard est une technique de tricot qui permet de créer des motifs colorés directement dans la maille. Les motifs sont donc intégrés au tissu et ne s\'effacent pas.' },
      { q: 'Ce pull bouloche-t-il ?', a: 'Comme tout pull en laine mélangée, de légers bouloches peuvent apparaître après plusieurs lavages. Utilisez un rasoir anti-bouloches pour les retirer facilement.' },
      { q: 'Les couleurs sont-elles fidèles aux photos ?', a: 'Oui, les couleurs sont très proches des photos. Légères variations possibles selon l\'écran, mais le rendu réel est excellent.' }
    ]
  },
  {
    slug: 'pull-viking-noel',
    keyword: 'pull viking de noel',
    title: 'Pull Viking de Noël Valhalla Fa-La-La',
    shortTitle: 'Pull Viking Noël',
    asin: 'B0BD7MFW6G',
    price: '27,99',
    oldPrice: '34,99',
    discount: '-20%',
    stars: 4.4,
    reviewsCount: 523,
    category: 'Noël',
    img: 'product-noel.jpg',
    desc: 'Le pull de Noël viking qui va marquer les fêtes ! Design festif mêlant humour et mythologie nordique avec le slogan "Fa-La-La-Valhalla". Parfait pour les soirées de Noël, les dîners en famille ou les ugly sweater parties version viking.',
    features: ['Design festif Noël + Viking', 'Humour nordique "Fa-La-La-Valhalla"', 'Tissu doux et confortable', 'Unisexe', 'Le cadeau parfait pour un fan de Vikings'],
    specs: { 'Matière': '80% Coton, 20% Polyester', 'Col': 'Col rond', 'Manches': 'Longues', 'Coupe': 'Unisexe décontractée', 'Tailles': 'S à 3XL', 'Entretien': 'Machine 40°C' },
    metaDesc: 'Pull viking de Noël Fa-La-La Valhalla. Design festif et humour nordique. Parfait pour les fêtes. Disponible sur Amazon.',
    faq: [
      { q: 'Ce pull est-il un vrai "ugly Christmas sweater" ?', a: 'C\'est un pull festif avec un design humoristique viking. Il a le look fun d\'un ugly sweater tout en restant stylé grâce aux motifs nordiques.' },
      { q: 'Peut-on le porter en dehors des fêtes ?', a: 'Le design est clairement festif avec ses motifs de Noël. Il est surtout pensé pour la période des fêtes et les soirées thématiques.' },
      { q: 'C\'est un bon cadeau pour un fan de Vikings ?', a: 'Absolument ! C\'est le cadeau de Noël idéal pour tout amateur de culture viking et de mythologie nordique.' }
    ]
  },
  {
    slug: 'pull-viking-norvegien',
    keyword: 'pull viking norvégien',
    title: 'Pull Viking Norvégien Tricot Épais Col Montant',
    shortTitle: 'Pull Viking Norvégien',
    asin: 'B0GF2RJGFX',
    price: '42,99',
    oldPrice: '59,99',
    discount: '-28%',
    stars: 4.5,
    reviewsCount: 203,
    category: 'Traditionnel',
    img: 'product-norvegien.jpg',
    desc: 'Pull viking norvégien en tricot épais avec motifs traditionnels scandinaves. Inspiré des pulls de pêcheurs norvégiens, ce modèle offre chaleur et robustesse. Son col montant et ses motifs jacquard classiques rappellent l\'artisanat textile des pays nordiques.',
    features: ['Tricot épais haute densité', 'Motifs norvégiens traditionnels', 'Col montant protecteur', 'Style pêcheur scandinave', 'Polyacrylic haute qualité'],
    specs: { 'Matière': '100% Polyacrylique', 'Col': 'Col montant', 'Manches': 'Longues', 'Coupe': 'Slim fit', 'Tailles': 'S à XXL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking norvégien tricot épais avec motifs scandinaves traditionnels. Col montant, style pêcheur nordique. Commandez sur Amazon.',
    faq: [
      { q: 'Quelle est la différence avec un pull classique ?', a: 'Le pull norvégien se distingue par ses motifs jacquard traditionnels (étoiles, flocons, motifs géométriques) et sa maille plus épaisse, héritée de la tradition des pêcheurs scandinaves.' },
      { q: 'Le polyacrylique est-il aussi chaud que la laine ?', a: 'Le polyacrylique offre une chaleur comparable à la laine avec l\'avantage d\'être hypoallergénique, plus facile à entretenir et résistant aux mites.' },
      { q: 'Ce pull convient-il pour le ski ?', a: 'Oui, son tricot épais et son col montant en font un excellent pull pour les sports d\'hiver, seul ou sous une veste de ski.' }
    ]
  },
  {
    slug: 'pull-viking-plaid',
    keyword: 'pull viking plaid',
    title: 'Pull Plaid Viking Odin Couverture à Capuche Douce',
    shortTitle: 'Pull Plaid Viking',
    asin: 'B0G2M6M1HG',
    price: '32,99',
    oldPrice: '44,99',
    discount: '-27%',
    stars: 4.3,
    reviewsCount: 876,
    category: 'Cocooning',
    img: 'product-plaid.jpg',
    desc: 'Le pull plaid viking ultime pour les soirées cocooning ! Cette couverture à capuche géante arbore un design Odin imprimé en 3D. En microfibre ultra-douce, elle vous enveloppe de chaleur avec des motifs vikings spectaculaires. Mi-pull, mi-couverture : le meilleur des deux mondes.',
    features: ['Microfibre 100% polyester ultra-douce', 'Design Odin imprimé en 3D', 'Taille XXL couverture portable', 'Capuche intégrée', 'Lavable en machine'],
    specs: { 'Matière': '100% Polyester microfibre', 'Dimensions': '150 × 200 cm', 'Poids': '~1,2 kg', 'Col': 'Capuche', 'Taille': 'Unique (oversize)', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull plaid viking Odin couverture à capuche en microfibre douce. Design 3D, taille oversize, parfait pour le canapé. Sur Amazon.',
    faq: [
      { q: 'C\'est un pull ou une couverture ?', a: 'C\'est un hybride ! Un pull plaid oversize en forme de couverture portable avec une capuche. Parfait pour se lover dans le canapé tout en restant libre de ses mouvements.' },
      { q: 'Convient-il aux enfants ?', a: 'Sa taille unique (150×200 cm) est pensée pour les adultes, mais les enfants à partir de 10-12 ans peuvent aussi en profiter en mode couverture XL.' },
      { q: 'Le tissu est-il vraiment doux ?', a: 'Oui, la microfibre polyester offre un toucher velours extrêmement doux. C\'est l\'un des points les plus appréciés dans les avis clients.' }
    ]
  },
  {
    slug: 'pull-viking-ragnar',
    keyword: 'pull viking ragnar',
    title: 'Sweat Viking Ragnar Médiéval Rétro Impression 3D',
    shortTitle: 'Pull Viking Ragnar',
    asin: 'B08L7MQXFN',
    price: '36,99',
    oldPrice: '49,99',
    discount: '-26%',
    stars: 4.1,
    reviewsCount: 267,
    category: 'Ragnar',
    img: 'product-ragnar.jpg',
    desc: 'Sweat viking inspiré par le légendaire Ragnar Lothbrok, avec impression 3D de guerrier médiéval. Ce pull à capuche allie l\'esthétique brute des guerriers nordiques au confort moderne. Les détails d\'impression donnent un effet tatouage et armure saisissant.',
    features: ['Impression 3D rétro médiéval', 'Inspiré de Ragnar Lothbrok', 'Capuche avec cordon de serrage', 'Poche kangourou', 'Effet tatouage / armure'],
    specs: { 'Matière': '95% Polyester, 5% Spandex', 'Col': 'Capuche', 'Manches': 'Longues', 'Coupe': 'Regular', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C retourné' },
    metaDesc: 'Sweat viking Ragnar avec impression 3D médiéval rétro. Style guerrier nordique Lothbrok. Capuche, poche kangourou. Sur Amazon.',
    faq: [
      { q: 'Le design est-il inspiré de la série Vikings ?', a: 'Le pull s\'inspire de l\'esthétique des guerriers vikings et de figures comme Ragnar Lothbrok, avec un style médiéval rétro. Un must pour les fans de la série.' },
      { q: 'L\'impression 3D donne-t-elle un vrai relief ?', a: 'C\'est une impression 3D à plat (sublimation) qui crée un effet visuel de profondeur très réaliste, mais le tissu reste lisse au toucher.' },
      { q: 'Ce pull est-il adapté pour le cosplay ?', a: 'Oui, son design détaillé en fait un excellent choix pour le cosplay viking, les conventions ou les soirées médiévales.' }
    ]
  },
  {
    slug: 'pull-viking-bjorn',
    keyword: 'pull viking bjorn',
    title: 'Pull Viking Bjorn Sport Zip Bodybuilding Nordique',
    shortTitle: 'Pull Viking Bjorn',
    asin: 'B0GC7L6KCD',
    price: '34,99',
    oldPrice: '44,99',
    discount: '-22%',
    stars: 4.0,
    reviewsCount: 178,
    category: 'Sport',
    img: 'product-bjorn.jpg',
    desc: 'Pull viking sport inspiré par Bjorn Côtes-de-Fer, idéal pour l\'entraînement et le quotidien. Sa coupe athlétique et sa fermeture zip complète en font un vêtement fonctionnel au design nordique. Parfait pour les guerriers modernes qui s\'entraînent dur.',
    features: ['Fermeture zip complète', 'Coupe athlétique ajustée', 'Tissu stretch respirant', 'Poches latérales zippées', 'Design inspiré Bjorn Ironside'],
    specs: { 'Matière': '70% Coton, 30% Polyester', 'Col': 'Capuche', 'Fermeture': 'Zip intégral', 'Coupe': 'Athlétique / Ajustée', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking Bjorn sport avec zip et coupe athlétique. Inspiré Bjorn Ironside, parfait pour le training. Disponible sur Amazon.',
    faq: [
      { q: 'Ce pull convient-il vraiment pour le sport ?', a: 'Oui, sa coupe athlétique et son tissu coton-polyester stretch sont pensés pour l\'entraînement. Le zip intégral facilite l\'enfilage et la ventilation.' },
      { q: 'Les tailles sont-elles adaptées aux physiques musclés ?', a: 'La coupe athlétique est conçue pour les morphologies sportives. Le stretch du tissu s\'adapte aux physiques développés. Consultez le guide des tailles pour mesurer votre poitrine.' },
      { q: 'Peut-on le porter en dehors du sport ?', a: 'Absolument. Son design épuré et son style nordique en font un zip hoodie versatile pour le quotidien.' }
    ]
  },
  {
    slug: 'gros-pull-viking',
    keyword: 'gros pull viking',
    title: 'Gros Pull Viking Armor 3D Retro Grande Poche',
    shortTitle: 'Gros Pull Viking',
    asin: 'B0FVY618RT',
    price: '42,99',
    oldPrice: '59,99',
    discount: '-28%',
    stars: 4.2,
    reviewsCount: 341,
    category: 'Oversize',
    img: 'product-gros.jpg',
    desc: 'Gros pull viking oversize avec impression 3D d\'armure de guerrier nordique. Sa coupe ample et sa grande poche kangourou en font le pull douillet parfait pour les amateurs de style viking XXL. L\'impression armure donne un effet spectaculaire.',
    features: ['Coupe oversize ultra-confortable', 'Impression 3D armure viking', 'Grande poche kangourou', '8 tailles : S à 5XL', 'Tissu épais et chaud'],
    specs: { 'Matière': '95% Polyester, 5% Élasthanne', 'Col': 'Capuche avec cordon', 'Manches': 'Longues', 'Coupe': 'Oversize / Ample', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Gros pull viking oversize avec impression 3D armure. Coupe ample, poche kangourou, tailles S-5XL. Commander sur Amazon.',
    faq: [
      { q: 'La coupe oversize est-elle vraiment ample ?', a: 'Oui, ce pull a une coupe volontairement large et confortable. Si vous voulez un look très oversize, prenez votre taille habituelle. Pour une coupe plus ajustée, descendez d\'une taille.' },
      { q: 'Ce pull est-il adapté pour des événements médiévaux ?', a: 'Son design d\'armure viking en impression 3D en fait un excellent choix pour les foires médiévales, les conventions ou les soirées costumées.' },
      { q: 'Le pull est-il lourd ?', a: 'Malgré son aspect imposant, le tissu polyester reste léger (environ 350g). L\'épaisseur vient de la maille, pas du poids du tissu.' }
    ]
  },
  {
    slug: 'pull-viking-xxl',
    keyword: 'pull viking xxl',
    title: 'Pull Viking XXL Tatouage Nordique Unisexe S-5XL',
    shortTitle: 'Pull Viking XXL',
    asin: 'B08LG1JK49',
    price: '38,99',
    oldPrice: '54,99',
    discount: '-29%',
    stars: 4.3,
    reviewsCount: 456,
    category: 'Grande Taille',
    img: 'product-xxl.jpg',
    desc: 'Pull viking grande taille avec motifs de tatouage nordique en impression 3D. Disponible du S au 5XL, ce pull inclusif n\'oublie personne. Les motifs de tatouage celtique et de runes vikings couvrent l\'ensemble du pull pour un effet maximal.',
    features: ['Gamme complète S à 5XL', 'Motifs tatouage nordique all-over', 'Capuche avec cordon réglable', 'Grande poche frontale', 'Unisexe — convient à tous'],
    specs: { 'Matière': '90% Polyester, 10% Spandex', 'Col': 'Capuche', 'Manches': 'Longues', 'Coupe': 'Regular généreuse', 'Tailles': 'S, M, L, XL, 2XL, 3XL, 4XL, 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking XXL tatouage nordique du S au 5XL. Motifs celtiques all-over, unisexe, capuche. Grande taille sur Amazon.',
    faq: [
      { q: 'Quelles sont les mesures exactes en 5XL ?', a: 'En 5XL, le tour de poitrine est d\'environ 140 cm et la longueur de 82 cm. Consultez le tableau des tailles détaillé sur la page Amazon pour des mesures précises.' },
      { q: 'Le 5XL est-il vraiment disponible ?', a: 'Oui, ce modèle est spécifiquement conçu avec une gamme étendue du S au 5XL. Toutes les tailles sont généralement en stock.' },
      { q: 'La qualité est-elle la même en grande taille ?', a: 'Absolument, chaque taille bénéficie de la même qualité d\'impression 3D et de finition. Les motifs sont proportionnellement ajustés à chaque taille.' }
    ]
  },
  {
    slug: 'pull-viking-femme-laine',
    keyword: 'pull viking femme laine',
    title: 'Pull Viking Femme Laine Polaire Boussole Runes',
    shortTitle: 'Pull Viking Femme Laine',
    asin: 'B0GJSQ656W',
    price: '49,99',
    oldPrice: '69,99',
    discount: '-29%',
    stars: 4.4,
    reviewsCount: 132,
    category: 'Femme',
    img: 'product-femme-laine.jpg',
    desc: 'Pull viking femme en laine polaire doublée avec motif boussole viking (Vegvisir) et runes nordiques. Ce pull combine la chaleur de la polaire avec l\'élégance des symboles vikings. Coupe féminine flatteuse et zip pratique pour un style nordique au quotidien.',
    features: ['Polaire doublée ultra-chaude', 'Motif Vegvisir (boussole viking)', 'Coupe-vent léger', 'Fermeture zip', 'Doublure intérieure douce'],
    specs: { 'Matière': 'Polyester polaire doublé', 'Col': 'Col montant + zip', 'Manches': 'Longues', 'Coupe': 'Féminine ajustée', 'Tailles': 'S à 3XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking femme laine polaire avec motif Vegvisir et runes. Doublure chaude, coupe féminine, zip. Disponible sur Amazon.',
    faq: [
      { q: 'Que signifie le symbole Vegvisir ?', a: 'Le Vegvisir est une boussole magique viking qui, selon la légende, guidait son porteur à travers les tempêtes. C\'est un symbole de protection et d\'orientation.' },
      { q: 'Ce pull est-il assez chaud pour l\'hiver ?', a: 'La polaire doublée et les propriétés coupe-vent en font un pull très chaud, adapté aux températures hivernales. Idéal aussi pour la randonnée.' },
      { q: 'Le zip est-il de bonne qualité ?', a: 'Oui, le zip est robuste et fluide. Il monte jusqu\'en haut du col montant pour une protection maximale contre le froid.' }
    ]
  },
  {
    slug: 'pull-viking-loup',
    keyword: 'pull viking loup',
    title: 'Pull Viking Loup Fenrir Capuche ALPTEC Nordique',
    shortTitle: 'Pull Viking Loup',
    asin: 'B09H7SD4QT',
    price: '39,99',
    oldPrice: '54,99',
    discount: '-27%',
    stars: 4.5,
    reviewsCount: 289,
    category: 'Mythologie',
    img: 'product-loup.jpg',
    desc: 'Pull viking à capuche avec le loup géant Fenrir de la mythologie nordique. Ce sweat ALPTEC impressionnant représente Fenrir, le fils de Loki, dans un design détaillé et saisissant. La zip complète et la qualité de fabrication en font un incontournable pour les fans de mythologie viking.',
    features: ['Design Fenrir (loup géant) détaillé', 'Zip intégral haute qualité', 'Doublure polaire intérieure', 'Poches latérales', 'Impression sublimation durable'],
    specs: { 'Matière': 'Polyester avec doublure polaire', 'Col': 'Capuche', 'Fermeture': 'Zip intégral', 'Coupe': 'Regular', 'Tailles': 'S à 4XL', 'Entretien': 'Machine 30°C retourné' },
    metaDesc: 'Pull viking loup Fenrir ALPTEC avec zip et capuche. Design mythologie nordique, doublure polaire. Sur Amazon.',
    faq: [
      { q: 'Qui est Fenrir dans la mythologie nordique ?', a: 'Fenrir est le loup géant, fils du dieu Loki. Enchaîné par les dieux, il est destiné à se libérer lors du Ragnarök. C\'est l\'un des symboles les plus puissants de la mythologie viking.' },
      { q: 'La doublure polaire tient-elle chaud ?', a: 'Oui, la doublure polaire intérieure offre une chaleur supplémentaire appréciable. Ce pull est nettement plus chaud qu\'un hoodie classique non doublé.' },
      { q: 'L\'impression couvre-t-elle tout le pull ?', a: 'Le design Fenrir couvre le devant et le dos du pull avec un motif continu. Les manches ont des détails assortis de motifs nordiques.' }
    ]
  },
  {
    slug: 'pull-viking-arbre-de-vie',
    keyword: 'pull viking arbre de vie',
    title: 'Pull Viking Arbre de Vie Yggdrasil 3D Nordique',
    shortTitle: 'Pull Viking Arbre de Vie',
    asin: 'B0FS58M9XF',
    price: '37,99',
    oldPrice: '52,99',
    discount: '-28%',
    stars: 4.4,
    reviewsCount: 234,
    category: 'Mythologie',
    img: 'product-arbre.jpg',
    desc: 'Pull viking avec l\'Arbre de Vie Yggdrasil en impression 3D spectaculaire. Yggdrasil, l\'arbre cosmique de la mythologie nordique, est représenté dans toute sa majesté avec des détails de tatouage viking. Un pull qui raconte une histoire millénaire.',
    features: ['Impression 3D Yggdrasil all-over', 'Détails de tatouage viking', 'Capuche avec cordon', 'Poche kangourou', 'Tissu stretch confortable'],
    specs: { 'Matière': '90% Polyester, 10% Spandex', 'Col': 'Capuche avec cordon', 'Manches': 'Longues', 'Coupe': 'Regular', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking arbre de vie Yggdrasil impression 3D. Design tatouage nordique, capuche, tailles S-5XL. Acheter sur Amazon.',
    faq: [
      { q: 'Que représente Yggdrasil ?', a: 'Yggdrasil est l\'Arbre-Monde de la mythologie nordique, un frêne immense qui relie les neuf mondes. Ses racines s\'étendent dans les profondeurs tandis que sa cime touche le ciel.' },
      { q: 'Les motifs couvrent-ils tout le pull ?', a: 'Oui, l\'impression 3D couvre l\'intégralité du pull : devant, dos et manches. L\'Arbre de Vie est centré sur le dos avec des motifs de runes et tatouages en complément.' },
      { q: 'Ce pull est-il adapté comme cadeau ?', a: 'C\'est un excellent cadeau pour tout amateur de mythologie nordique, de culture viking ou de fantasy. Le design spectaculaire fait toujours son effet.' }
    ]
  }
];

// ── Helpers ────────────────────────────────────────────────
function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '★';
  for (let i = s.length; i < 5; i++) s += '☆';
  return s;
}

function amazonLink(p) {
  const nameSlug = p.title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').substring(0, 60);
  return `https://www.amazon.fr/${nameSlug}/dp/${p.asin}?linkCode=ll1&tag=${SITE.tag}&linkId=${p.asin.toLowerCase()}ref&ref_=as_li_ss_tl`;
}

function head(title, desc, canonical, extra = '') {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://${SITE.domain}${canonical}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preload" as="style" href="/style.css">
  <link rel="stylesheet" href="/style.css">
  ${extra}
  <!--email_off-->
</head>`;
}

function header(activePage = '') {
  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/#produits', label: 'Nos Pulls' },
    { href: '/#faq', label: 'FAQ' },
  ];
  const linksHTML = links.map(l =>
    `<a href="${l.href}"${activePage === l.href ? ' class="active"' : ''}>${l.label}</a>`
  ).join('\n          ');

  return `  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="logo">
        <img src="/favicon.svg" alt="" width="36" height="36">
        Pull Vikings
      </a>
      <nav class="nav-links" id="nav">
        ${linksHTML}
      </nav>
      <button class="mobile-toggle" onclick="document.getElementById('nav').classList.toggle('open')" aria-label="Menu">☰</button>
    </div>
  </header>`;
}

function footer() {
  const catLinks = products.slice(0, 8).map(p =>
    `<a href="/${p.slug}.html">${p.shortTitle}</a>`
  ).join('\n          ');

  return `  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Pull Vikings</h3>
          <p>Votre guide pour trouver le pull viking parfait. Nous sélectionnons les meilleurs pulls d'inspiration nordique disponibles sur Amazon pour vous aider à affirmer votre style viking.</p>
        </div>
        <div class="footer-col">
          <h4>Catégories</h4>
          ${catLinks}
        </div>
        <div class="footer-col">
          <h4>Informations</h4>
          <a href="/#faq">Questions fréquentes</a>
          <a href="/#produits">Tous les pulls</a>
          <a href="/">Accueil</a>
        </div>
      </div>
      <div class="footer-disclaimer">
        <p>En tant que Partenaire Amazon, ce site réalise un bénéfice sur les achats remplissant les conditions requises. Les liens présents sur ce site peuvent être des liens affiliés Amazon : nous percevons une petite commission sur les achats effectués via ces liens, sans frais supplémentaires pour vous. Les prix affichés sont indicatifs et peuvent varier. © ${SITE.year} ${SITE.name}.</p>
      </div>
      <div class="footer-bottom">
        <p>${SITE.name} — Pulls d'inspiration viking sélectionnés avec soin</p>
      </div>
    </div>
  </footer>
  <!--/email_off-->`;
}

function productCard(p) {
  return `      <article class="product-card">
        <a href="/${p.slug}.html" class="card-img">
          <img src="/images/${p.img}" alt="${p.title}" width="400" height="300" loading="lazy">
          ${p.discount ? `<span class="card-badge">${p.discount}</span>` : ''}
        </a>
        <div class="card-body">
          <span class="card-category">${p.category}</span>
          <div class="card-stars">${starsHTML(p.stars)} (${p.reviewsCount})</div>
          <h3><a href="/${p.slug}.html">${p.shortTitle}</a></h3>
          <div class="card-price">${p.price} € ${p.oldPrice ? `<span class="old-price">${p.oldPrice} €</span>` : ''}</div>
          <a href="/${p.slug}.html" class="card-cta">Voir le produit</a>
        </div>
      </article>`;
}

// ── Generate Homepage ─────────────────────────────────────
function generateIndex() {
  const productCards = products.map(p => productCard(p)).join('\n');
  const faqItems = [
    { q: 'Les pulls vikings sont-ils de bonne qualité ?', a: 'Nous sélectionnons uniquement des pulls bien notés sur Amazon (4 étoiles minimum en moyenne). Chaque produit est vérifié pour la qualité des matériaux et des finitions avant d\'être recommandé.' },
    { q: 'Comment choisir la bonne taille de pull viking ?', a: 'Chaque page produit contient un guide des tailles détaillé. En général, nous recommandons de mesurer votre tour de poitrine et de consulter le tableau des tailles sur Amazon avant de commander.' },
    { q: 'Les pulls sont-ils livrés rapidement ?', a: 'Tous nos pulls sont disponibles sur Amazon, ce qui vous permet de bénéficier de la livraison rapide Amazon Prime si vous êtes abonné. La plupart des articles sont livrés en 1 à 3 jours.' },
    { q: 'Peut-on retourner un pull qui ne convient pas ?', a: 'Oui, les achats sur Amazon bénéficient de la politique de retour standard de 30 jours. Vous pouvez retourner le pull s\'il ne vous convient pas.' },
    { q: 'Pourquoi acheter via Pull Vikings plutôt que directement sur Amazon ?', a: 'Nous vous faisons gagner du temps en sélectionnant les meilleurs pulls vikings parmi des centaines de résultats. Nos descriptions détaillées et nos comparatifs vous aident à faire le bon choix. Le prix reste identique pour vous.' },
  ].map(f => `
      <details class="faq-item">
        <summary>${f.q}</summary>
        <div class="faq-answer">${f.a}</div>
      </details>`).join('');

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": SITE.name,
        "url": `https://${SITE.domain}/`,
        "description": "Sélection des meilleurs pulls vikings disponibles sur Amazon. Style nordique, mythologie, laine et tricot scandinave.",
        "potentialAction": { "@type": "SearchAction", "target": `https://${SITE.domain}/?q={search_term_string}`, "query-input": "required name=search_term_string" }
      },
      {
        "@type": "Organization",
        "name": SITE.name,
        "url": `https://${SITE.domain}/`,
        "logo": `https://${SITE.domain}/favicon.svg`
      },
      {
        "@type": "ItemList",
        "name": "Meilleurs Pulls Vikings",
        "numberOfItems": products.length,
        "itemListElement": products.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `https://${SITE.domain}/${p.slug}.html`,
          "name": p.title
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { q: 'Les pulls vikings sont-ils de bonne qualité ?', a: 'Nous sélectionnons uniquement des pulls bien notés sur Amazon (4 étoiles minimum en moyenne). Chaque produit est vérifié pour la qualité des matériaux et des finitions avant d\'être recommandé.' },
          { q: 'Comment choisir la bonne taille de pull viking ?', a: 'Chaque page produit contient un guide des tailles détaillé. En général, nous recommandons de mesurer votre tour de poitrine et de consulter le tableau des tailles sur Amazon avant de commander.' },
          { q: 'Les pulls sont-ils livrés rapidement ?', a: 'Tous nos pulls sont disponibles sur Amazon, ce qui vous permet de bénéficier de la livraison rapide Amazon Prime si vous êtes abonné. La plupart des articles sont livrés en 1 à 3 jours.' },
        ].map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      }
    ]
  };

  return `${head(
    'Pull Vikings — Les Meilleurs Pulls Viking en Ligne',
    'Découvrez notre sélection des meilleurs pulls vikings : homme, femme, laine, tricot norvégien, motifs Ragnar et Odin. Livraison rapide Amazon.',
    '/',
    '<link rel="preload" as="image" href="/images/hero.jpg" fetchpriority="high">'
  )}
<body>
${header('/')}
  <main>
    <section class="hero">
      <div class="container">
        <h1>Les Meilleurs <span>Pulls Vikings</span></h1>
        <p>Explorez notre sélection de pulls d'inspiration nordique. Laine, tricot, mythologie Odin et Ragnar — trouvez le pull viking qui vous correspond.</p>
        <div class="hero-badges">
          <span class="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Livraison Amazon rapide
          </span>
          <span class="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
            Produits 4★ minimum
          </span>
          <span class="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Retour 30 jours
          </span>
        </div>
      </div>
    </section>

    <section class="products-section" id="produits">
      <div class="container">
        <div class="section-title">
          <h2>Notre Sélection de Pulls Vikings</h2>
          <p>15 modèles triés sur le volet pour un style nordique authentique</p>
          <span class="bar"></span>
        </div>
        <div class="product-grid">
${productCards}
        </div>
      </div>
    </section>

    <section class="reassurance">
      <div class="container">
        <div class="reassurance-grid">
          <div class="reassurance-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <h4>Livraison Rapide</h4>
            <p>Via Amazon Prime, recevez votre pull en 1 à 3 jours</p>
          </div>
          <div class="reassurance-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <h4>Achat Sécurisé</h4>
            <p>Paiement et protection Amazon garantis</p>
          </div>
          <div class="reassurance-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <h4>Retour 30 Jours</h4>
            <p>Satisfait ou remboursé selon la politique Amazon</p>
          </div>
          <div class="reassurance-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
            <h4>Avis Vérifiés</h4>
            <p>Sélection basée sur les notes et avis Amazon</p>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section" id="faq">
      <div class="container">
        <div class="section-title">
          <h2>Questions Fréquentes</h2>
          <p>Tout ce que vous devez savoir sur nos pulls vikings</p>
          <span class="bar"></span>
        </div>
        <div class="faq-list">
          ${faqItems}
        </div>
      </div>
    </section>
  </main>

${footer()}
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</body>
</html>`;
}

// ── Generate Product Page ─────────────────────────────────
function generateProduct(p) {
  const related = products.filter(r => r.slug !== p.slug).slice(0, 4);
  const relatedCards = related.map(r => productCard(r)).join('\n');
  const featuresLi = p.features.map(f => `<li>${f}</li>`).join('\n            ');
  const specRows = Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('\n              ');
  const faqItems = p.faq.map(f => `
          <details class="faq-item">
            <summary>${f.q}</summary>
            <div class="faq-answer">${f.a}</div>
          </details>`).join('');
  const link = amazonLink(p);

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": p.title,
        "description": p.desc,
        "image": `https://${SITE.domain}/images/${p.img}`,
        "brand": { "@type": "Brand", "name": "Pull Vikings" },
        "offers": {
          "@type": "Offer",
          "url": link,
          "price": p.price.replace(',', '.'),
          "priceCurrency": "EUR",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Amazon.fr" }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": p.stars.toString(),
          "reviewCount": p.reviewsCount.toString()
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": `https://${SITE.domain}/` },
          { "@type": "ListItem", "position": 2, "name": p.shortTitle, "item": `https://${SITE.domain}/${p.slug}.html` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": p.faq.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  };

  return `${head(
    `${p.title} — Acheter sur Amazon | Pull Vikings`,
    p.metaDesc,
    `/${p.slug}.html`
  )}
<body>
${header()}
  <main>
    <div class="container">
      <nav class="breadcrumb" aria-label="Fil d'Ariane">
        <a href="/">Accueil</a><span>›</span><a href="/#produits">Pulls Vikings</a><span>›</span>${p.shortTitle}
      </nav>
    </div>

    <section class="product-page">
      <div class="container">
        <div class="product-layout">
          <div class="product-gallery">
            <img src="/images/${p.img}" alt="${p.title}" width="600" height="600">
            ${p.discount ? `<span class="gallery-badge">${p.discount}</span>` : ''}
          </div>
          <div class="product-info">
            <h1>${p.title}</h1>
            <div class="product-meta">
              <span class="stars">${starsHTML(p.stars)}</span>
              <span class="reviews-count">${p.reviewsCount} avis</span>
              <span class="availability">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                En stock
              </span>
            </div>
            <div class="price-box">
              <span class="price">${p.price} €</span>
              ${p.oldPrice ? `<span class="old-price">${p.oldPrice} €</span>` : ''}
              ${p.discount ? `<span class="discount">${p.discount}</span>` : ''}
              <small class="tax-note">Prix indicatif constaté sur Amazon — peut varier</small>
            </div>
            <p class="product-desc">${p.desc}</p>
            <ul class="product-features">
              ${featuresLi}
            </ul>
            <a href="${link}" class="btn-amazon" target="_blank" rel="nofollow noopener sponsored">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
              Acheter sur Amazon
            </a>
            <p class="amazon-note">Vous serez redirigé vers Amazon.fr pour finaliser votre achat</p>
            <div class="product-trust">
              <span class="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                Paiement sécurisé
              </span>
              <span class="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                Livraison rapide
              </span>
              <span class="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Retour 30 jours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="product-details-section">
      <div class="container">
        <div class="details-grid">
          <div class="details-content">
            <h2>Description complète</h2>
            <p>${p.desc}</p>
            <p>Ce ${p.shortTitle.toLowerCase()} fait partie de notre sélection des meilleurs vêtements d'inspiration viking disponibles sur Amazon. Nous avons choisi ce modèle pour sa qualité, ses avis positifs et son design nordique authentique.</p>
          </div>
          <div class="details-specs">
            <h3>Caractéristiques</h3>
            <table>
              ${specRows}
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section">
      <div class="container">
        <div class="section-title">
          <h2>Questions sur ce produit</h2>
          <span class="bar"></span>
        </div>
        <div class="faq-list">
          ${faqItems}
        </div>
      </div>
    </section>

    <section class="related-section">
      <div class="container">
        <div class="section-title">
          <h2>Vous aimerez aussi</h2>
          <span class="bar"></span>
        </div>
        <div class="product-grid related-grid">
${relatedCards}
        </div>
      </div>
    </section>
  </main>

${footer()}
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</body>
</html>`;
}

// ── Build ─────────────────────────────────────────────────
const outDir = __dirname;

// Index
fs.writeFileSync(path.join(outDir, 'index.html'), generateIndex());
console.log('✓ index.html');

// Product pages
for (const p of products) {
  fs.writeFileSync(path.join(outDir, `${p.slug}.html`), generateProduct(p));
  console.log(`✓ ${p.slug}.html`);
}

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${SITE.domain}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${products.map(p => `  <url>
    <loc>https://${SITE.domain}/${p.slug}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
console.log('✓ sitemap.xml');

// Robots.txt
fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: https://${SITE.domain}/sitemap.xml\n`);
console.log('✓ robots.txt');

console.log(`\nDone! ${products.length + 1} pages generated.`);
