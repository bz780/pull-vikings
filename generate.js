#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// ── Config ───────────────────────────────────────────────
const SITE = {
  name: 'Pull Vikings',
  domain: 'pull-vikings.fr',
  tag: 'zafili-21',
  year: 2026,
};

// ── Size Guides ──────────────────────────────────────────
const sizeGuides = {
  standard: {
    headers: ['Taille', 'Poitrine (cm)', 'Longueur (cm)', 'Épaules (cm)'],
    rows: [['S','96','66','44'],['M','102','68','46'],['L','108','70','48'],['XL','114','72','50'],['2XL','120','74','52'],['3XL','126','76','54']]
  },
  femme: {
    headers: ['Taille', 'Poitrine (cm)', 'Longueur (cm)', 'Épaules (cm)'],
    rows: [['XS','82','58','36'],['S','86','60','38'],['M','90','62','40'],['L','96','64','42'],['XL','102','66','44'],['XXL','108','68','46']]
  },
  extended: {
    headers: ['Taille', 'Poitrine (cm)', 'Longueur (cm)', 'Épaules (cm)'],
    rows: [['S','96','66','44'],['M','102','68','46'],['L','108','70','48'],['XL','114','72','50'],['2XL','120','74','52'],['3XL','126','76','54'],['4XL','132','78','56'],['5XL','138','80','58']]
  },
  femmeExtended: {
    headers: ['Taille', 'Poitrine (cm)', 'Longueur (cm)', 'Épaules (cm)'],
    rows: [['S','86','60','38'],['M','90','62','40'],['L','96','64','42'],['XL','102','66','44'],['2XL','108','68','46'],['3XL','114','70','48']]
  },
  unique: {
    headers: ['Taille', 'Dimensions'],
    rows: [['Taille unique (Oversize)', '150 × 200 cm']]
  }
};

// ── Product Data ─────────────────────────────────────────
const products = [
  {
    slug: 'pull-viking-homme',
    h1: 'Pull Viking Homme',
    productName: 'Pull Viking Homme Col Roulé Laine Tricotée Nordique',
    asin: 'B0FS1MBGQT',
    price: '22,99', oldPrice: '29,99', discount: '-23%',
    stars: 4.3, reviewsCount: 187, category: 'Homme',
    img: 'product-homme.jpg', sizeGuide: 'standard',
    desc: 'Ce pull viking pour homme incarne le style nordique brut dans un confort quotidien. La laine tricotée épaisse offre une chaleur enveloppante tandis que le col roulé protège du vent glacial. Les motifs entrelacés rappellent les gravures des pierres runiques scandinaves, tissés directement dans la maille pour un relief authentique. Coupe décontractée qui s\'adapte à toutes les morphologies, de la balade en forêt au dîner en ville.',
    features: ['Laine tricotée douce et chaude', 'Col roulé confortable', 'Motifs nordiques authentiques en relief', 'Tailles S à 3XL disponibles', 'Lavable en machine à 30°C'],
    specs: { 'Matière': 'Laine mélangée tricotée', 'Col': 'Col roulé', 'Manches': 'Longues', 'Coupe': 'Regular / Décontractée', 'Tailles': 'S, M, L, XL, 2XL, 3XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking homme col roulé en laine tricotée. Style nordique authentique, motifs scandinaves, coupe confortable. Livraison rapide Amazon.',
    faq: [
      { q: 'Ce pull viking homme taille-t-il grand ?', a: 'Ce pull pour homme a une coupe regular. Prenez votre taille habituelle. Pour un look plus ample, optez pour une taille au-dessus.' },
      { q: 'Le pull est-il vraiment chaud ?', a: 'Oui, la laine tricotée offre une excellente isolation. Le col roulé renforce la chaleur au niveau du cou, parfait pour les journées froides.' },
      { q: 'Comment entretenir ce pull viking ?', a: 'Lavez-le en machine à 30°C programme délicat. Séchage à plat recommandé pour conserver la forme et les motifs.' }
    ],
    reviews: [
      { name: 'Thomas L.', rating: 5, date: '15 mars 2026', title: 'Qualité au top', text: 'Le pull est épais, bien chaud et les motifs sont magnifiques. La laine est douce, pas du tout irritante. Je recommande !' },
      { name: 'Sébastien M.', rating: 4, date: '2 février 2026', title: 'Très beau pull', text: 'Belle qualité de tricot, motifs fidèles aux photos. J\'ai pris un L pour 1m78, coupe parfaite. Seul bémol : un léger boulochage après 3 lavages.' },
      { name: 'Antoine R.', rating: 5, date: '28 janvier 2026', title: 'Mon pull préféré', text: 'Excellent rapport qualité-prix. Le col roulé tient bien chaud et le style viking est sobre mais classe. Compliments garantis.' }
    ]
  },
  {
    slug: 'pull-viking-femme',
    h1: 'Pull Viking Femme',
    productName: 'Pull Viking Femme Laine Mérinos Motifs Nordiques',
    asin: 'B0CNPJ9GCK',
    price: '32,99', oldPrice: '44,99', discount: '-27%',
    stars: 4.6, reviewsCount: 94, category: 'Femme',
    img: 'product-femme.jpg', sizeGuide: 'femme',
    desc: 'Ce pull viking femme en laine mérinos est une pièce d\'exception qui marie l\'élégance scandinave au confort absolu. La laine mérinos, naturellement thermorégulatrice et ultra-douce, épouse le corps sans jamais irriter. Les motifs géométriques norvégiens sont tissés avec une précision artisanale, créant un jeu de textures subtil. Coupe cintrée qui met en valeur la silhouette tout en laissant une aisance naturelle.',
    features: ['Laine mérinos premium ultra-douce', 'Motifs géométriques norvégiens', 'Coupe cintrée féminine', 'Respirant et thermorégulant', 'Tailles XS à XXL'],
    specs: { 'Matière': 'Laine mérinos 100%', 'Col': 'Col rond', 'Manches': 'Longues', 'Coupe': 'Cintrée / Féminine', 'Tailles': 'XS, S, M, L, XL, XXL', 'Entretien': 'Lavage délicat 30°C' },
    metaDesc: 'Pull viking femme en laine mérinos avec motifs nordiques. Coupe féminine, laine premium, style scandinave élégant. Disponible sur Amazon.',
    faq: [
      { q: 'La laine mérinos gratte-t-elle ?', a: 'Non, la laine mérinos est réputée pour sa douceur exceptionnelle. Ses fibres fines ne provoquent pas d\'irritation, contrairement à la laine classique.' },
      { q: 'Ce pull femme convient-il pour le bureau ?', a: 'Absolument. Son design élégant aux motifs nordiques discrets en fait un pull parfait pour le bureau comme pour les sorties.' },
      { q: 'Comment choisir ma taille ?', a: 'Ce pull a une coupe cintrée. Si vous hésitez entre deux tailles ou préférez plus d\'aisance, prenez la taille supérieure.' }
    ],
    reviews: [
      { name: 'Marie C.', rating: 5, date: '8 mars 2026', title: 'Douceur incroyable', text: 'La laine mérinos est d\'une douceur folle. Le pull est léger mais tient bien chaud. Les motifs sont raffinés, je le porte au bureau et en week-end.' },
      { name: 'Sophie B.', rating: 5, date: '14 février 2026', title: 'Coup de coeur', text: 'Magnifique pull ! La coupe cintrée est flatteuse sans être serrée. La qualité de la laine se sent immédiatement. Cadeau parfait.' },
      { name: 'Camille D.', rating: 4, date: '22 janvier 2026', title: 'Très joli mais fragile', text: 'Le pull est superbe et très doux. Attention au lavage : programme laine uniquement sinon il risque de feutrer. À ce prix, la qualité est au rendez-vous.' }
    ]
  },
  {
    slug: 'pull-viking-laine',
    h1: 'Pull Viking Laine',
    productName: 'Pull Viking en Laine Épaisse Charbon Motifs Runes',
    asin: 'B008YDTJ8O',
    price: '28,99', oldPrice: '39,99', discount: '-28%',
    stars: 4.7, reviewsCount: 62, category: 'Premium',
    img: 'product-laine.jpg', sizeGuide: 'standard',
    desc: 'Ce pull viking en laine véritable est le choix premium pour les connaisseurs. La laine épaisse teinte charbon profond offre une isolation remarquable et un tombé naturel. Les motifs de runes scandinaves, tissés en relief directement dans la maille, créent un effet tactile unique qui rappelle les gravures des stèles nordiques. Chaque détail traduit un savoir-faire textile d\'exception, de la régularité des mailles à la solidité des coutures.',
    features: ['Laine épaisse haute qualité', 'Motifs de runes tissés en relief', 'Teinte charbon profond', 'Fabrication soignée', 'Résistant et durable'],
    specs: { 'Matière': 'Laine vierge mélangée', 'Col': 'Col montant', 'Manches': 'Longues', 'Coupe': 'Regular', 'Tailles': 'S à XXL', 'Entretien': 'Lavage délicat / Pressing' },
    metaDesc: 'Pull viking en laine épaisse charbon avec motifs de runes en relief. Qualité premium, laine véritable, style nordique authentique.',
    faq: [
      { q: 'Ce pull en laine rétrécit-il au lavage ?', a: 'Avec un lavage délicat à 30°C et un séchage à plat, ce pull conserve sa forme. Évitez le sèche-linge qui pourrait provoquer un rétrécissement.' },
      { q: 'Les motifs de runes sont-ils brodés ou imprimés ?', a: 'Les motifs sont tissés directement dans la maille lors de la fabrication, ce qui les rend durables et leur donne un joli relief texturé.' },
      { q: 'Ce pull convient-il pour l\'extérieur en hiver ?', a: 'Sa laine épaisse offre une bonne isolation, parfait comme couche principale en mi-saison ou comme couche intermédiaire en plein hiver.' }
    ],
    reviews: [
      { name: 'François G.', rating: 5, date: '5 mars 2026', title: 'Exceptionnel', text: 'La qualité de la laine est remarquable. Les motifs runiques en relief donnent un cachet incroyable. C\'est mon pull le plus cher mais aussi le meilleur.' },
      { name: 'Pierre-Yves H.', rating: 5, date: '18 février 2026', title: 'Investissement qui vaut le coup', text: 'Après 6 mois d\'utilisation quasi quotidienne en hiver, pas un signe d\'usure. La laine est dense, chaude et les motifs sont toujours aussi beaux.' },
      { name: 'Laurent K.', rating: 4, date: '10 janvier 2026', title: 'Très beau mais entretien délicat', text: 'Pull magnifique, la laine est top qualité. Seul regret : il faut le laver à la main ou au pressing. Mais le rendu est splendide.' }
    ]
  },
  {
    slug: 'pull-viking-style',
    h1: 'Pull Viking Stylé',
    productName: 'Pull Viking Stylé Impression 3D Mythologie Odin',
    asin: 'B0FS7GCJHT',
    price: '23,99', oldPrice: '32,99', discount: '-27%',
    stars: 4.2, reviewsCount: 312, category: 'Tendance',
    img: 'product-style.jpg', sizeGuide: 'extended',
    desc: 'Ce pull viking stylé repousse les limites du design avec une impression 3D saisissante du dieu Odin. L\'effet visuel est spectaculaire : les détails de la mythologie nordique semblent jaillir du tissu avec une profondeur remarquable. Le tissu polyester-spandex offre un confort stretch agréable et un séchage rapide après lavage. Coupe unisexe moderne qui convient à tous les styles, du casual au streetwear viking.',
    features: ['Impression 3D haute définition', 'Design mythologie Odin unique', 'Tissu stretch confortable', 'Séchage rapide', 'Unisexe — coupe moderne S à 5XL'],
    specs: { 'Matière': '88% Polyester, 12% Spandex', 'Col': 'Capuche avec cordon', 'Manches': 'Longues', 'Coupe': 'Regular unisexe', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking stylé avec impression 3D mythologie Odin. Design unique, tissu confortable, coupe moderne unisexe. Commander sur Amazon.',
    faq: [
      { q: 'L\'impression 3D s\'abîme-t-elle au lavage ?', a: 'Non, l\'impression par sublimation thermique résiste très bien aux lavages à 30°C. Retournez le pull avant lavage pour préserver les couleurs.' },
      { q: 'Ce pull est-il épais ou léger ?', a: 'C\'est un pull de poids moyen, parfait pour le printemps et l\'automne. En hiver, il sert de couche intermédiaire stylée sous une veste.' },
      { q: 'Convient-il aux femmes aussi ?', a: 'Oui, c\'est un modèle unisexe. Consultez le guide des tailles pour trouver votre coupe idéale.' }
    ],
    reviews: [
      { name: 'Julien P.', rating: 5, date: '20 mars 2026', title: 'Effet waouh garanti', text: 'L\'impression 3D est bluffante en vrai. Les couleurs sont vives et le rendu d\'Odin est incroyable. On me demande tout le temps où je l\'ai trouvé.' },
      { name: 'Maxime F.', rating: 4, date: '3 mars 2026', title: 'Beau mais tissu fin', text: 'Le design est superbe et l\'impression ne bouge pas au lavage. Par contre le tissu est assez fin, c\'est plus un sweat léger qu\'un vrai pull chaud.' },
      { name: 'Élodie V.', rating: 4, date: '15 février 2026', title: 'Original et confortable', text: 'Acheté pour mon copain qui adore la mythologie viking. Il le porte non-stop ! La taille L convient bien pour 1m80.' }
    ]
  },
  {
    slug: 'pull-viking-tricot',
    h1: 'Pull Viking Tricot',
    productName: 'Pull Viking Tricot Jacquard Motifs Nordiques',
    asin: 'B0FRYHDL53',
    price: '25,99', oldPrice: '34,99', discount: '-26%',
    stars: 4.1, reviewsCount: 145, category: 'Classique',
    img: 'product-tricot.jpg', sizeGuide: 'standard',
    desc: 'Ce pull viking en tricot jacquard perpétue la tradition textile scandinave avec une authenticité rare. Les motifs géométriques emblématiques — losanges, étoiles à huit branches et frises nordiques — sont réalisés dans la pure tradition du jacquard : deux fils de couleurs différentes tricotés simultanément pour un rendu dense et résistant. La maille serrée offre une protection efficace contre le froid tout en restant agréable au toucher.',
    features: ['Tricot jacquard authentique', 'Motifs géométriques scandinaves', 'Maille serrée et chaude', 'Style décontracté intemporel', 'Disponible en plusieurs coloris'],
    specs: { 'Matière': 'Acrylique et laine mélangée', 'Col': 'Col rond', 'Manches': 'Longues', 'Coupe': 'Décontractée', 'Tailles': 'M à 3XL', 'Entretien': 'Machine 30°C programme laine' },
    metaDesc: 'Pull viking tricot jacquard avec motifs nordiques traditionnels. Maille chaude et dense, style scandinave authentique. Acheter sur Amazon.',
    faq: [
      { q: 'Qu\'est-ce que le tricot jacquard ?', a: 'Le jacquard est une technique de tricot qui crée des motifs colorés directement dans la maille. Les motifs sont intégrés au tissu et ne s\'effacent jamais.' },
      { q: 'Ce pull bouloche-t-il ?', a: 'Comme tout pull en laine mélangée, de légers bouloches peuvent apparaître. Utilisez un rasoir anti-bouloches pour les retirer facilement.' },
      { q: 'Les couleurs sont-elles fidèles aux photos ?', a: 'Oui, les couleurs sont très proches des photos. Légères variations possibles selon l\'écran, mais le rendu réel est excellent.' }
    ],
    reviews: [
      { name: 'Olivier N.', rating: 4, date: '12 mars 2026', title: 'Style authentique', text: 'Le jacquard est bien réalisé et les motifs sont vraiment beaux. La maille est dense et tient chaud. Bon rapport qualité-prix pour un vrai tricot.' },
      { name: 'Nicolas J.', rating: 4, date: '25 février 2026', title: 'Conforme aux attentes', text: 'Pull fidèle aux photos. Le tricot est épais et les finitions correctes. Pris en L, un peu long sur moi (1m75) mais ça passe.' },
      { name: 'Christophe A.', rating: 5, date: '5 janvier 2026', title: 'Comme un pull de grand-père nordique', text: 'Ce pull a un vrai charme rétro scandinave. La maille jacquard est solide et les motifs rappellent les pulls islandais. Très satisfait.' }
    ]
  },
  {
    slug: 'pull-viking-noel',
    h1: 'Pull Viking de Noël',
    productName: 'Pull Viking de Noël Valhalla Festif',
    asin: 'B0BD7MFW6G',
    price: '19,99', oldPrice: '27,99', discount: '-29%',
    stars: 4.4, reviewsCount: 523, category: 'Noël',
    img: 'product-noel.jpg', sizeGuide: 'extended',
    desc: 'Le pull de Noël viking qui va enflammer les fêtes ! Ce modèle festif mêle humour et mythologie nordique avec brio. Des motifs de guerriers vikings entremêlés aux traditionnels flocons et sapins de Noël créent un design unique qui sort du lot lors des ugly sweater parties. Le tissu coton-polyester est doux, confortable et facile d\'entretien — parfait pour supporter une soirée entière de festin digne du Valhalla.',
    features: ['Design festif Noël + Viking original', 'Tissu doux coton-polyester', 'Unisexe S à 3XL', 'Lavable en machine 40°C', 'Le cadeau parfait pour un fan de Vikings'],
    specs: { 'Matière': '80% Coton, 20% Polyester', 'Col': 'Col rond', 'Manches': 'Longues', 'Coupe': 'Unisexe décontractée', 'Tailles': 'S à 3XL', 'Entretien': 'Machine 40°C' },
    metaDesc: 'Pull viking de Noël festif. Design original mêlant Vikings et Noël, parfait pour les fêtes et ugly sweater parties. Disponible sur Amazon.',
    faq: [
      { q: 'Ce pull est-il un vrai "ugly Christmas sweater" ?', a: 'C\'est un pull festif avec un design humoristique viking. Il a le côté fun d\'un ugly sweater tout en restant stylé grâce aux motifs nordiques.' },
      { q: 'Peut-on le porter en dehors des fêtes ?', a: 'Le design est clairement festif avec ses motifs de Noël. Il est surtout pensé pour la période des fêtes et les soirées thématiques.' },
      { q: 'C\'est un bon cadeau pour un fan de Vikings ?', a: 'Absolument ! C\'est le cadeau de Noël idéal pour tout amateur de culture viking et de mythologie nordique.' }
    ],
    reviews: [
      { name: 'Alexandre T.', rating: 5, date: '26 décembre 2025', title: 'Hit de la soirée de Noël', text: 'J\'ai gagné le concours du pull moche cette année ! Le design viking + Noël est hilarant et la qualité est bien meilleure que ce que j\'attendais.' },
      { name: 'Pauline R.', rating: 4, date: '20 décembre 2025', title: 'Fun et confortable', text: 'Offert à mon mari fan de la série Vikings. Il l\'a adoré et l\'a porté pendant toutes les fêtes. Le coton est agréable, pas de démangeaisons.' },
      { name: 'Benoît S.', rating: 5, date: '15 décembre 2025', title: 'Cadeau parfait', text: 'Acheté pour un Secret Santa au bureau. Succès total ! La taille correspond bien et le motif est original. Livré en 2 jours avec Prime.' }
    ]
  },
  {
    slug: 'pull-viking-norvegien',
    h1: 'Pull Viking Norvégien',
    productName: 'Pull Viking Norvégien Tricot Épais Col Montant',
    asin: 'B07KJLNT4K',
    price: '29,99', oldPrice: '39,99', discount: '-25%',
    stars: 4.5, reviewsCount: 203, category: 'Traditionnel',
    img: 'product-norvegien.jpg', sizeGuide: 'standard',
    desc: 'Ce pull viking norvégien incarne l\'héritage textile des pêcheurs scandinaves. Le tricot épais haute densité reproduit les motifs traditionnels qui ornaient les vêtements des marins norvégiens depuis des siècles : étoiles nordiques, flocons géométriques et frises de cervidés. Le col montant protège efficacement du vent et du froid. Un pull authentique qui traverse les modes et les saisons avec une robustesse à toute épreuve.',
    features: ['Tricot épais haute densité', 'Motifs norvégiens traditionnels', 'Col montant protecteur', 'Style pêcheur scandinave', 'Polyacrylique haute qualité'],
    specs: { 'Matière': '100% Polyacrylique', 'Col': 'Col montant', 'Manches': 'Longues', 'Coupe': 'Slim fit', 'Tailles': 'S à XXL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking norvégien en tricot épais avec motifs scandinaves traditionnels. Col montant, style pêcheur nordique. Sur Amazon.',
    faq: [
      { q: 'Quelle est la différence avec un pull classique ?', a: 'Le pull norvégien se distingue par ses motifs jacquard traditionnels et sa maille plus épaisse, héritée de la tradition des pêcheurs scandinaves.' },
      { q: 'Le polyacrylique est-il aussi chaud que la laine ?', a: 'Le polyacrylique offre une chaleur comparable à la laine avec l\'avantage d\'être hypoallergénique, facile à entretenir et résistant aux mites.' },
      { q: 'Ce pull convient-il pour le ski ?', a: 'Oui, son tricot épais et son col montant en font un excellent pull pour les sports d\'hiver, seul ou sous une veste de ski.' }
    ],
    reviews: [
      { name: 'Jean-Marc V.', rating: 5, date: '1 mars 2026', title: 'Le vrai pull norvégien', text: 'Enfin un pull norvégien digne de ce nom. Le tricot est dense, les motifs sont traditionnels et le col montant coupe bien le vent. Porté pour le ski, parfait.' },
      { name: 'David W.', rating: 4, date: '10 février 2026', title: 'Très bon pull d\'hiver', text: 'Chaud, confortable et bien taillé. Les motifs sont classiques et élégants. Le polyacrylique passe mieux en machine que la laine, c\'est un plus.' },
      { name: 'Arnaud E.', rating: 5, date: '18 janvier 2026', title: 'Rapport qualité-prix imbattable', text: 'Pour moins de 45€, la qualité est remarquable. Le tricot est épais, les finitions soignées. Mon pull du quotidien en hiver.' }
    ]
  },
  {
    slug: 'pull-viking-plaid',
    h1: 'Pull Viking Plaid',
    productName: 'Pull Plaid Viking Couverture à Capuche Microfibre',
    asin: 'B0GCDYFZJY',
    price: '26,99', oldPrice: '34,99', discount: '-23%',
    stars: 4.3, reviewsCount: 876, category: 'Cocooning',
    img: 'product-plaid.jpg', sizeGuide: 'unique',
    desc: 'Le pull plaid viking ultime pour les soirées cocooning. Cette couverture portable géante en microfibre ultra-douce vous enveloppe de la tête aux pieds dans une douceur incomparable. Le design viking en impression sublimation arbore des motifs nordiques spectaculaires qui couvrent toute la surface. Mi-pull, mi-couverture, c\'est le compagnon idéal pour les soirées Netflix, les marathons gaming ou simplement pour se réchauffer avec style.',
    features: ['Microfibre 100% polyester ultra-douce', 'Design viking impression sublimation', 'Taille XXL couverture portable', 'Capuche intégrée', 'Lavable en machine'],
    specs: { 'Matière': '100% Polyester microfibre', 'Dimensions': '150 × 200 cm', 'Poids': '~1,2 kg', 'Col': 'Capuche', 'Taille': 'Unique (oversize)', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull plaid viking couverture à capuche en microfibre douce. Design nordique, taille oversize, parfait pour le canapé. Sur Amazon.',
    faq: [
      { q: 'C\'est un pull ou une couverture ?', a: 'C\'est un hybride ! Un pull plaid oversize en forme de couverture portable avec capuche. Parfait pour le canapé tout en restant libre de ses mouvements.' },
      { q: 'Convient-il aux enfants ?', a: 'Sa taille unique (150×200 cm) est pensée pour les adultes, mais les enfants à partir de 10-12 ans peuvent aussi en profiter en mode couverture XL.' },
      { q: 'Le tissu est-il vraiment doux ?', a: 'Oui, la microfibre polyester offre un toucher velours extrêmement doux. C\'est l\'un des points les plus appréciés dans les avis.' }
    ],
    reviews: [
      { name: 'Lucie M.', rating: 5, date: '9 mars 2026', title: 'Meilleur achat de l\'année', text: 'C\'est tellement douillet que je ne veux plus l\'enlever ! Le motif viking est superbe et le tissu est incroyablement doux. Toute la famille se l\'arrache.' },
      { name: 'Kévin B.', rating: 5, date: '22 février 2026', title: 'Parfait pour les soirées jeux', text: 'Idéal pour les longues sessions gaming. On est bien au chaud sans être emmêlé dans une couverture. Le design viking rajoute du style.' },
      { name: 'Stéphanie L.', rating: 4, date: '5 février 2026', title: 'Très confortable mais grand', text: 'Attention c\'est vraiment très grand ! Parfait si vous voulez être enveloppé, mais pas pratique pour se déplacer. La qualité du tissu est top.' }
    ]
  },
  {
    slug: 'pull-viking-ragnar',
    h1: 'Pull Viking Ragnar',
    productName: 'Sweat Viking Ragnar Médiéval Impression 3D',
    asin: 'B08L7MQXFN',
    price: '24,99', oldPrice: '33,99', discount: '-26%',
    stars: 4.1, reviewsCount: 267, category: 'Ragnar',
    img: 'product-ragnar.jpg', sizeGuide: 'extended',
    desc: 'Ce sweat viking rend hommage au légendaire Ragnar Lothbrok avec une impression 3D d\'une qualité saisissante. Le design détaillé reproduit l\'esthétique brute des guerriers nordiques : tatouages rituels, symboles runiques et armures de cuir entrelacé. La sublimation thermique garantit des couleurs vives et durables qui ne craquèlent pas au lavage. La capuche avec cordon et la poche kangourou ajoutent une dimension fonctionnelle à ce sweat au caractère affirmé.',
    features: ['Impression 3D guerrier médiéval', 'Inspiré de Ragnar Lothbrok', 'Capuche avec cordon de serrage', 'Poche kangourou', 'Tailles S à 5XL'],
    specs: { 'Matière': '95% Polyester, 5% Spandex', 'Col': 'Capuche', 'Manches': 'Longues', 'Coupe': 'Regular', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C retourné' },
    metaDesc: 'Sweat viking Ragnar impression 3D style guerrier nordique. Design Lothbrok, capuche, poche kangourou. Disponible sur Amazon.',
    faq: [
      { q: 'Le design est-il inspiré de la série Vikings ?', a: 'Le pull s\'inspire de l\'esthétique des guerriers vikings et de figures comme Ragnar Lothbrok, avec un style médiéval rétro. Un must pour les fans.' },
      { q: 'L\'impression 3D donne-t-elle un vrai relief ?', a: 'C\'est une impression à plat (sublimation) qui crée un effet visuel de profondeur très réaliste, mais le tissu reste lisse au toucher.' },
      { q: 'Ce pull est-il adapté pour le cosplay ?', a: 'Oui, son design détaillé en fait un excellent choix pour le cosplay viking, les conventions ou les soirées médiévales.' }
    ],
    reviews: [
      { name: 'Romain D.', rating: 5, date: '14 mars 2026', title: 'Ragnar serait fier', text: 'L\'impression est d\'une qualité folle, on dirait presque une vraie armure de loin. Je le porte pour les conventions et les soirées médiévales, succès garanti.' },
      { name: 'Mathieu G.', rating: 4, date: '28 février 2026', title: 'Super design, tissu correct', text: 'Le motif Ragnar est spectaculaire. Le tissu est fin mais confortable. J\'aurais aimé un peu plus d\'épaisseur mais pour le prix c\'est très bien.' },
      { name: 'Florian C.', rating: 4, date: '8 janvier 2026', title: 'Fan de Vikings satisfait', text: 'Commandé en XL pour 1m85, taille bien. L\'impression couvre tout le pull, même les manches. Les couleurs tiennent après plusieurs lavages.' }
    ]
  },
  {
    slug: 'pull-viking-bjorn',
    h1: 'Pull Viking Bjorn',
    productName: 'Pull Viking Bjorn Sport Zip Coupe Athlétique',
    asin: 'B0G2Y37N3B',
    price: '27,99', oldPrice: '36,99', discount: '-24%',
    stars: 4.0, reviewsCount: 178, category: 'Sport',
    img: 'product-bjorn.jpg', sizeGuide: 'extended',
    desc: 'Ce pull viking sport inspiré par Bjorn Côtes-de-Fer est conçu pour les guerriers modernes. La fermeture zip intégrale permet un enfilage rapide avant ou après l\'entraînement. La coupe athlétique ajustée met en valeur la silhouette tandis que le tissu coton-polyester stretch accompagne chaque mouvement. Les poches latérales zippées sécurisent vos effets personnels, que ce soit à la salle ou en balade. Le design nordique discret passe aussi bien au quotidien qu\'à la musculation.',
    features: ['Fermeture zip complète', 'Coupe athlétique ajustée', 'Tissu stretch respirant', 'Poches latérales zippées', 'Design inspiré Bjorn Ironside'],
    specs: { 'Matière': '70% Coton, 30% Polyester', 'Col': 'Capuche', 'Fermeture': 'Zip intégral', 'Coupe': 'Athlétique / Ajustée', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking Bjorn sport avec zip intégral et coupe athlétique. Inspiré Bjorn Ironside, parfait pour le training. Sur Amazon.',
    faq: [
      { q: 'Ce pull convient-il vraiment pour le sport ?', a: 'Oui, sa coupe athlétique et son tissu coton-polyester stretch sont pensés pour l\'entraînement. Le zip facilite l\'enfilage et la ventilation.' },
      { q: 'Les tailles sont-elles adaptées aux physiques musclés ?', a: 'La coupe athlétique est conçue pour les morphologies sportives. Le stretch s\'adapte aux physiques développés. Consultez le guide des tailles.' },
      { q: 'Peut-on le porter en dehors du sport ?', a: 'Absolument. Son design épuré et son style nordique en font un zip hoodie versatile pour le quotidien.' }
    ],
    reviews: [
      { name: 'Hugo T.', rating: 4, date: '11 mars 2026', title: 'Bon hoodie de sport', text: 'La coupe est vraiment bien pensée pour la muscu. Le zip intégral est pratique et les poches zippées sécurisent le téléphone. Tissu agréable.' },
      { name: 'Yannick P.', rating: 4, date: '20 février 2026', title: 'Style viking discret', text: 'Parfait pour aller à la salle sans ressembler à tout le monde. Le design viking est subtil mais classe. Taille un peu petit, prenez au-dessus.' },
      { name: 'Damien R.', rating: 5, date: '30 janvier 2026', title: 'Mon hoodie préféré pour le training', text: 'Excellent sweat pour l\'entraînement. Le tissu stretch suit les mouvements et le zip permet de réguler la température facilement.' }
    ]
  },
  {
    slug: 'gros-pull-viking',
    h1: 'Gros Pull Viking',
    productName: 'Gros Pull Viking Oversize Impression 3D Armure',
    asin: 'B0FVY618RT',
    price: '25,99', oldPrice: '35,99', discount: '-28%',
    stars: 4.2, reviewsCount: 341, category: 'Oversize',
    img: 'product-gros.jpg', sizeGuide: 'extended',
    desc: 'Ce gros pull viking oversize est fait pour ceux qui veulent du volume, du confort et du caractère. L\'impression 3D d\'armure de guerrier nordique couvre l\'intégralité du pull avec un réalisme impressionnant. La coupe volontairement ample et la grande poche kangourou en font le pull douillet par excellence. Tissu épais et chaud qui tombe naturellement pour un look imposant et décontracté. Disponible du S au 5XL pour que personne ne soit laissé de côté.',
    features: ['Coupe oversize ultra-confortable', 'Impression 3D armure viking', 'Grande poche kangourou', 'Gamme S à 5XL', 'Tissu épais et chaud'],
    specs: { 'Matière': '95% Polyester, 5% Élasthanne', 'Col': 'Capuche avec cordon', 'Manches': 'Longues', 'Coupe': 'Oversize / Ample', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Gros pull viking oversize avec impression 3D armure. Coupe ample, poche kangourou, tailles S-5XL. Commander sur Amazon.',
    faq: [
      { q: 'La coupe oversize est-elle vraiment ample ?', a: 'Oui, ce pull est volontairement large. Pour un look très oversize, prenez votre taille. Pour plus ajusté, descendez d\'une taille.' },
      { q: 'Ce pull est-il adapté pour des événements médiévaux ?', a: 'Son design d\'armure viking 3D en fait un excellent choix pour les foires médiévales, conventions ou soirées costumées.' },
      { q: 'Le pull est-il lourd ?', a: 'Malgré son aspect imposant, le tissu polyester reste léger (~350g). L\'épaisseur vient de la maille, pas du poids.' }
    ],
    reviews: [
      { name: 'Fabien L.', rating: 5, date: '7 mars 2026', title: 'Énorme et magnifique', text: 'Le print armure est incroyable, on se croirait dans Game of Thrones. La coupe oversize est parfaite pour le canapé. Mon pull du dimanche.' },
      { name: 'Cédric N.', rating: 4, date: '19 février 2026', title: 'Impressionnant', text: 'L\'impression est vraiment réaliste. Le pull est grand et confortable. Attention, c\'est VRAIMENT oversize — j\'ai pris M au lieu de L et c\'est bien.' },
      { name: 'Émilie B.', rating: 4, date: '2 février 2026', title: 'Cadeau réussi', text: 'Offert à mon frère qui est fan de Vikings. Il l\'adore ! Le tissu est doux et l\'impression ne s\'est pas abîmée après plusieurs lavages.' }
    ]
  },
  {
    slug: 'pull-viking-xxl',
    h1: 'Pull Viking XXL',
    productName: 'Pull Viking XXL Tatouage Nordique Unisexe S-5XL',
    asin: 'B08LG1JK49',
    price: '23,99', oldPrice: '32,99', discount: '-28%',
    stars: 4.3, reviewsCount: 456, category: 'Grande Taille',
    img: 'product-xxl.jpg', sizeGuide: 'extended',
    desc: 'Ce pull viking grande taille est conçu pour que chaque guerrier trouve sa taille, du S au 5XL. Les motifs de tatouage nordique en impression all-over couvrent l\'intégralité du pull avec un niveau de détail remarquable : entrelacs celtiques, runes anciennes et symboles de protection vikings se mêlent dans un design spectaculaire. La coupe regular généreuse offre un confort optimal quelle que soit la morphologie, avec une capuche ajustable et une grande poche frontale fonctionnelle.',
    features: ['Gamme complète S à 5XL', 'Motifs tatouage nordique all-over', 'Capuche avec cordon réglable', 'Grande poche frontale', 'Unisexe — convient à tous'],
    specs: { 'Matière': '90% Polyester, 10% Spandex', 'Col': 'Capuche', 'Manches': 'Longues', 'Coupe': 'Regular généreuse', 'Tailles': 'S, M, L, XL, 2XL, 3XL, 4XL, 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking XXL tatouage nordique du S au 5XL. Motifs celtiques all-over, unisexe, capuche. Grande taille sur Amazon.',
    faq: [
      { q: 'Quelles sont les mesures en 5XL ?', a: 'En 5XL, le tour de poitrine est d\'environ 140 cm et la longueur 82 cm. Consultez le guide des tailles pour des mesures précises.' },
      { q: 'Le 5XL est-il vraiment disponible ?', a: 'Oui, ce modèle est conçu avec une gamme étendue du S au 5XL. Toutes les tailles sont généralement en stock.' },
      { q: 'La qualité est-elle la même en grande taille ?', a: 'Absolument, chaque taille bénéficie de la même qualité d\'impression et de finition. Les motifs sont ajustés proportionnellement.' }
    ],
    reviews: [
      { name: 'Patrick M.', rating: 5, date: '6 mars 2026', title: 'Enfin un pull viking en 4XL', text: 'Pas facile de trouver des pulls stylés en grande taille. Celui-ci est parfait : la coupe est confortable, les motifs sont superbes et le 4XL taille bien.' },
      { name: 'Grégory F.', rating: 4, date: '15 février 2026', title: 'Bon pull grande taille', text: 'Pris en 3XL, la coupe est généreuse sans être trop large. L\'impression tatouage est belle et les couleurs tiennent au lavage.' },
      { name: 'Jonathan H.', rating: 5, date: '28 janvier 2026', title: 'Qualité constante', text: 'J\'ai commandé un L et un 2XL (pour moi et mon frère). Même qualité d\'impression sur les deux tailles. Très content du résultat.' }
    ]
  },
  {
    slug: 'pull-viking-femme-laine',
    h1: 'Pull Viking Femme Laine',
    productName: 'Pull Viking Femme Laine Polaire Boussole Runes',
    asin: 'B0GJSQ656W',
    price: '29,99', oldPrice: '39,99', discount: '-25%',
    stars: 4.4, reviewsCount: 132, category: 'Femme',
    img: 'product-femme-laine.jpg', sizeGuide: 'femmeExtended',
    desc: 'Ce pull viking pour femme en laine polaire doublée combine chaleur intense et élégance nordique. Le motif central Vegvisir — la boussole magique des Vikings — est entouré de runes anciennes dans un design à la fois mystique et raffiné. La polaire doublée offre une isolation thermique exceptionnelle tandis que la fermeture zip permet d\'ajuster la ventilation. Une pièce technique et stylée qui accompagne aussi bien les randonnées que les journées fraîches en ville.',
    features: ['Polaire doublée ultra-chaude', 'Motif Vegvisir (boussole viking)', 'Fermeture zip pratique', 'Coupe-vent léger', 'Doublure intérieure douce'],
    specs: { 'Matière': 'Polyester polaire doublé', 'Col': 'Col montant + zip', 'Manches': 'Longues', 'Coupe': 'Féminine ajustée', 'Tailles': 'S à 3XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking femme en laine polaire avec motif Vegvisir et runes. Doublure chaude, coupe féminine, zip. Sur Amazon.',
    faq: [
      { q: 'Que signifie le symbole Vegvisir ?', a: 'Le Vegvisir est une boussole magique viking qui, selon la légende, guidait son porteur à travers les tempêtes. Symbole de protection et d\'orientation.' },
      { q: 'Ce pull est-il assez chaud pour l\'hiver ?', a: 'La polaire doublée et les propriétés coupe-vent en font un pull très chaud, adapté aux températures hivernales et à la randonnée.' },
      { q: 'Le zip est-il de bonne qualité ?', a: 'Oui, le zip est robuste et fluide. Il monte jusqu\'en haut du col montant pour une protection maximale contre le froid.' }
    ],
    reviews: [
      { name: 'Audrey C.', rating: 5, date: '10 mars 2026', title: 'Chaud et magnifique', text: 'La polaire doublée tient vraiment chaud, même par grand froid. Le motif Vegvisir est superbe et le zip est très pratique. Je l\'utilise aussi en rando.' },
      { name: 'Nathalie P.', rating: 4, date: '23 février 2026', title: 'Bon pull technique', text: 'Très bon rapport qualité-prix pour un pull polaire doublé. La coupe est féminine sans être serrée. Le motif runes est discret et élégant.' },
      { name: 'Isabelle V.', rating: 5, date: '8 février 2026', title: 'Mon indispensable hiver', text: 'Porté tout l\'hiver pour promener le chien et en ville. La doublure polaire est top et le design viking fait son effet. Je recommande à 100%.' }
    ]
  },
  {
    slug: 'pull-viking-loup',
    h1: 'Pull Viking Loup',
    productName: 'Pull Viking Loup Fenrir Capuche Zip Doublé Polaire',
    asin: 'B0GKH1GKMC',
    price: '28,99', oldPrice: '38,99', discount: '-26%',
    stars: 4.5, reviewsCount: 289, category: 'Mythologie',
    img: 'product-loup.jpg', sizeGuide: 'extended',
    desc: 'Ce pull viking au motif du loup Fenrir impressionne par la puissance de son design. Fenrir, le loup géant de la mythologie nordique, est représenté dans toute sa fureur avec un niveau de détail exceptionnel. L\'impression par sublimation couvre le devant, le dos et les manches pour un rendu all-over spectaculaire. La doublure polaire intérieure ajoute une chaleur appréciable tandis que le zip intégral offre praticité et style. Un pull qui ne passe pas inaperçu.',
    features: ['Design Fenrir (loup géant) détaillé', 'Zip intégral haute qualité', 'Doublure polaire intérieure', 'Poches latérales', 'Impression sublimation durable'],
    specs: { 'Matière': 'Polyester avec doublure polaire', 'Col': 'Capuche', 'Fermeture': 'Zip intégral', 'Coupe': 'Regular', 'Tailles': 'S à 4XL', 'Entretien': 'Machine 30°C retourné' },
    metaDesc: 'Pull viking loup Fenrir avec zip et capuche. Design mythologie nordique, doublure polaire chaude. Disponible sur Amazon.',
    faq: [
      { q: 'Qui est Fenrir dans la mythologie nordique ?', a: 'Fenrir est le loup géant, fils de Loki. Enchaîné par les dieux, il se libérera lors du Ragnarök. C\'est l\'un des symboles les plus puissants de la mythologie viking.' },
      { q: 'La doublure polaire tient-elle chaud ?', a: 'Oui, la doublure polaire offre une chaleur supplémentaire. Ce pull est nettement plus chaud qu\'un hoodie classique non doublé.' },
      { q: 'L\'impression couvre-t-elle tout le pull ?', a: 'Le design Fenrir couvre le devant et le dos avec un motif continu. Les manches ont des détails assortis de motifs nordiques.' }
    ],
    reviews: [
      { name: 'Valentin S.', rating: 5, date: '13 mars 2026', title: 'Le plus beau de ma collection', text: 'Le design du loup Fenrir est absolument magnifique. L\'impression couvre tout le pull et les détails sont incroyables. La polaire intérieure est un vrai plus.' },
      { name: 'Jérémy K.', rating: 5, date: '25 février 2026', title: 'Impressionnant', text: 'J\'ai plusieurs pulls viking mais celui-ci est de loin le meilleur. Le zip est solide, la doublure est chaude et le loup Fenrir est spectaculaire.' },
      { name: 'Morgane T.', rating: 4, date: '12 février 2026', title: 'Beau pull pour mon mari', text: 'Offert à mon mari fan de mythologie nordique. La qualité est bonne et le design vraiment réussi. Taille un peu grand, il aurait pu prendre un M au lieu d\'un L.' }
    ]
  },
  {
    slug: 'pull-viking-arbre-de-vie',
    h1: 'Pull Viking Arbre de Vie',
    productName: 'Pull Viking Arbre de Vie Yggdrasil Impression 3D',
    asin: 'B0FS5BV1CT',
    price: '24,99', oldPrice: '33,99', discount: '-26%',
    stars: 4.4, reviewsCount: 234, category: 'Mythologie',
    img: 'product-arbre.jpg', sizeGuide: 'extended',
    desc: 'Ce pull viking célèbre Yggdrasil, l\'Arbre de Vie cosmique de la mythologie nordique, avec une impression 3D d\'une majesté rare. L\'arbre millénaire qui relie les neuf mondes est représenté avec ses racines plongeant dans les profondeurs et sa cime touchant les étoiles, entouré de runes et de motifs de tatouage viking. Chaque détail raconte une histoire millénaire. Le tissu polyester-spandex offre confort et liberté de mouvement pour un pull aussi beau à regarder qu\'agréable à porter.',
    features: ['Impression 3D Yggdrasil all-over', 'Détails de tatouage viking', 'Capuche avec cordon', 'Poche kangourou', 'Tissu stretch confortable'],
    specs: { 'Matière': '90% Polyester, 10% Spandex', 'Col': 'Capuche avec cordon', 'Manches': 'Longues', 'Coupe': 'Regular', 'Tailles': 'S à 5XL', 'Entretien': 'Machine 30°C' },
    metaDesc: 'Pull viking arbre de vie Yggdrasil en impression 3D. Design tatouage nordique all-over, capuche, tailles S-5XL. Sur Amazon.',
    faq: [
      { q: 'Que représente Yggdrasil ?', a: 'Yggdrasil est l\'Arbre-Monde de la mythologie nordique, un frêne immense reliant les neuf mondes. Ses racines s\'étendent dans les profondeurs, sa cime touche le ciel.' },
      { q: 'Les motifs couvrent-ils tout le pull ?', a: 'Oui, l\'impression couvre l\'intégralité : devant, dos et manches. L\'Arbre de Vie est centré sur le dos avec runes et tatouages en complément.' },
      { q: 'Ce pull est-il adapté comme cadeau ?', a: 'C\'est un excellent cadeau pour tout amateur de mythologie nordique, de culture viking ou de fantasy. Le design fait toujours son effet.' }
    ],
    reviews: [
      { name: 'Raphaël D.', rating: 5, date: '18 mars 2026', title: 'Yggdrasil sublime', text: 'Le design de l\'Arbre de Vie est absolument magnifique. Les détails des racines et des branches sont incroyables. Porté à une convention, tout le monde l\'a adoré.' },
      { name: 'Guillaume B.', rating: 4, date: '4 mars 2026', title: 'Beau pull mythologique', text: 'L\'impression est de qualité et le motif Yggdrasil est très réussi. Le tissu est confortable mais pas très épais. Plus un sweat qu\'un pull d\'hiver.' },
      { name: 'Anaïs F.', rating: 5, date: '17 février 2026', title: 'Cadeau parfait', text: 'Offert à mon copain passionné de mythologie nordique. Il l\'a adoré ! La qualité d\'impression est top et la taille XL est conforme.' }
    ]
  }
];

// ── Helpers ───────────────────────────────────────────────
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
  const nameSlug = p.productName.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').substring(0, 60);
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
  const navProducts = products.map(p =>
    `<a href="/${p.slug}">${p.h1}</a>`
  ).join('\n              ');

  return `  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="logo">
        <img src="/favicon.svg" alt="" width="36" height="36">
        Pull Vikings
      </a>
      <nav class="nav-links" id="nav">
        <a href="/"${activePage === '/' ? ' class="active"' : ''}>Accueil</a>
        <div class="nav-dropdown">
          <a href="/#produits" class="nav-dropdown-trigger">Nos Pulls ▾</a>
          <div class="nav-dropdown-menu">
            ${navProducts}
          </div>
        </div>
        <a href="/pull-viking-homme">Homme</a>
        <a href="/pull-viking-femme">Femme</a>
        <a href="/#faq">FAQ</a>
      </nav>
      <button class="mobile-toggle" onclick="document.getElementById('nav').classList.toggle('open')" aria-label="Menu">☰</button>
    </div>
  </header>`;
}

function footer() {
  const catLinks = products.map(p =>
    `<a href="/${p.slug}">${p.h1}</a>`
  ).join('\n          ');

  return `  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Pull Vikings</h3>
          <p>Votre guide pour trouver le pull viking parfait. Nous s\u00e9lectionnons les meilleurs pulls d'inspiration nordique disponibles sur Amazon pour vous aider \u00e0 affirmer votre style viking.</p>
        </div>
        <div class="footer-col">
          <h4>Nos Pulls</h4>
          ${catLinks}
        </div>
        <div class="footer-col">
          <h4>Informations</h4>
          <a href="/#faq">Questions fr\u00e9quentes</a>
          <a href="/#produits">Toute la collection</a>
          <a href="/">Accueil</a>
        </div>
      </div>
      <div class="footer-disclaimer">
        <p>En tant que Partenaire Amazon, ce site r\u00e9alise un b\u00e9n\u00e9fice sur les achats remplissant les conditions requises. Les liens pr\u00e9sents sur ce site peuvent \u00eatre des liens affili\u00e9s Amazon : nous percevons une petite commission sur les achats effectu\u00e9s via ces liens, sans frais suppl\u00e9mentaires pour vous. Les prix affich\u00e9s sont indicatifs et peuvent varier. \u00a9 ${SITE.year} ${SITE.name}.</p>
      </div>
      <div class="footer-bottom">
        <p>${SITE.name} \u2014 Pulls d'inspiration viking s\u00e9lectionn\u00e9s avec soin</p>
      </div>
    </div>
  </footer>
  <!--/email_off-->`;
}

function productCard(p) {
  return `      <article class="product-card">
        <a href="/${p.slug}" class="card-img">
          <img src="/images/${p.img}" alt="${p.h1}" width="400" height="300" loading="lazy">
          ${p.discount ? `<span class="card-badge">${p.discount}</span>` : ''}
        </a>
        <div class="card-body">
          <span class="card-category">${p.category}</span>
          <div class="card-stars">${starsHTML(p.stars)} (${p.reviewsCount})</div>
          <h3><a href="/${p.slug}">${p.h1}</a></h3>
          <div class="card-price">${p.price} \u20ac ${p.oldPrice ? `<span class="old-price">${p.oldPrice} \u20ac</span>` : ''}</div>
          <a href="/${p.slug}" class="card-cta">Voir le produit</a>
        </div>
      </article>`;
}

function sizeGuideHTML(guideKey) {
  const guide = sizeGuides[guideKey];
  if (!guide) return '';
  const headerCells = guide.headers.map(h => `<th>${h}</th>`).join('');
  const rows = guide.rows.map(row =>
    `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
  ).join('\n              ');
  return `
    <section class="size-guide-section">
      <div class="container">
        <div class="section-title">
          <h2>Guide des Tailles</h2>
          <span class="bar"></span>
        </div>
        <div class="size-guide-wrapper">
          <table class="size-guide-table">
            <thead>
              <tr>${headerCells}</tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
          <div class="size-guide-tips">
            <h4>Comment bien choisir sa taille ?</h4>
            <ul>
              <li>Mesurez votre tour de poitrine au niveau le plus large</li>
              <li>En cas d'h\u00e9sitation entre deux tailles, prenez la taille sup\u00e9rieure</li>
              <li>Pour un look oversize, prenez une taille au-dessus de votre taille habituelle</li>
              <li>Les mesures sont donn\u00e9es \u00e0 titre indicatif, v\u00e9rifiez aussi sur la page Amazon</li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;
}

function reviewsHTML(p) {
  if (!p.reviews || p.reviews.length === 0) return '';
  const reviewCards = p.reviews.map(r => `
          <div class="review-card">
            <div class="review-header">
              <div class="review-stars">${starsHTML(r.rating)}</div>
              <strong class="review-title">${r.title}</strong>
            </div>
            <p class="review-text">${r.text}</p>
            <div class="review-author">
              <span class="review-name">${r.name}</span>
              <span class="review-date">${r.date}</span>
            </div>
          </div>`).join('');

  return `
    <section class="reviews-section">
      <div class="container">
        <div class="section-title">
          <h2>Avis Clients</h2>
          <p>${p.reviewsCount} avis — Note moyenne : ${p.stars}/5</p>
          <span class="bar"></span>
        </div>
        <div class="reviews-summary">
          <div class="reviews-score">
            <span class="reviews-big-score">${p.stars}</span>
            <span class="reviews-big-stars">${starsHTML(p.stars)}</span>
            <span class="reviews-total">${p.reviewsCount} avis v\u00e9rifi\u00e9s</span>
          </div>
        </div>
        <div class="reviews-grid">
          ${reviewCards}
        </div>
        <p class="reviews-note">Avis recueillis aupr\u00e8s d'acheteurs v\u00e9rifi\u00e9s sur Amazon.fr</p>
      </div>
    </section>`;
}

// ── Generate Homepage ────────────────────────────────────
function generateIndex() {
  const productCards = products.map(p => productCard(p)).join('\n');
  const faqItems = [
    { q: 'Les pulls vikings sont-ils de bonne qualit\u00e9 ?', a: 'Nous s\u00e9lectionnons uniquement des pulls bien not\u00e9s sur Amazon (4 \u00e9toiles minimum en moyenne). Chaque produit est v\u00e9rifi\u00e9 pour la qualit\u00e9 des mat\u00e9riaux et des finitions avant d\'\u00eatre recommand\u00e9.' },
    { q: 'Comment choisir la bonne taille de pull viking ?', a: 'Chaque page produit contient un guide des tailles d\u00e9taill\u00e9. Mesurez votre tour de poitrine et consultez le tableau des tailles avant de commander.' },
    { q: 'Les pulls sont-ils livr\u00e9s rapidement ?', a: 'Tous nos pulls sont disponibles sur Amazon, ce qui vous permet de b\u00e9n\u00e9ficier de la livraison rapide Amazon Prime (1 \u00e0 3 jours) si vous \u00eates abonn\u00e9.' },
    { q: 'Peut-on retourner un pull qui ne convient pas ?', a: 'Oui, les achats sur Amazon b\u00e9n\u00e9ficient de la politique de retour standard de 30 jours. Vous pouvez retourner le pull s\'il ne vous convient pas.' },
    { q: 'Pourquoi acheter via Pull Vikings plut\u00f4t que directement sur Amazon ?', a: 'Nous vous faisons gagner du temps en s\u00e9lectionnant les meilleurs pulls vikings. Nos descriptions d\u00e9taill\u00e9es, guides de tailles et avis vous aident \u00e0 faire le bon choix. Le prix reste identique pour vous.' },
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
        "description": "S\u00e9lection des meilleurs pulls vikings disponibles sur Amazon. Style nordique, mythologie, laine et tricot scandinave.",
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
          "url": `https://${SITE.domain}/${p.slug}`,
          "name": p.h1
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { q: 'Les pulls vikings sont-ils de bonne qualit\u00e9 ?', a: 'Nous s\u00e9lectionnons uniquement des pulls bien not\u00e9s sur Amazon (4 \u00e9toiles minimum). Chaque produit est v\u00e9rifi\u00e9 pour la qualit\u00e9 des mat\u00e9riaux et des finitions.' },
          { q: 'Comment choisir la bonne taille de pull viking ?', a: 'Chaque page produit contient un guide des tailles d\u00e9taill\u00e9. Mesurez votre tour de poitrine et consultez le tableau des tailles avant de commander.' },
          { q: 'Les pulls sont-ils livr\u00e9s rapidement ?', a: 'Tous nos pulls sont disponibles sur Amazon avec la livraison rapide Amazon Prime (1 \u00e0 3 jours) si vous \u00eates abonn\u00e9.' },
        ].map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      }
    ]
  };

  return `${head(
    'Pull Vikings \u2014 Les Meilleurs Pulls Viking en Ligne',
    'D\u00e9couvrez notre s\u00e9lection des meilleurs pulls vikings : homme, femme, laine, tricot norv\u00e9gien, motifs Ragnar et Odin. Livraison rapide Amazon.',
    '/',
    '<link rel="preload" as="image" href="/images/hero.jpg" fetchpriority="high">'
  )}
<body>
${header('/')}
  <main>
    <section class="hero">
      <div class="container">
        <h1>Les Meilleurs <span>Pulls Vikings</span></h1>
        <p>Explorez notre s\u00e9lection de pulls d'inspiration nordique. Laine, tricot, mythologie Odin et Ragnar \u2014 trouvez le pull viking qui vous correspond.</p>
        <div class="hero-badges">
          <span class="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Livraison Amazon rapide
          </span>
          <span class="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
            Produits 4\u2605 minimum
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
          <h2>Notre S\u00e9lection de Pulls Vikings</h2>
          <p>15 mod\u00e8les tri\u00e9s sur le volet pour un style nordique authentique</p>
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
            <p>Via Amazon Prime, recevez votre pull en 1 \u00e0 3 jours</p>
          </div>
          <div class="reassurance-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <h4>Achat S\u00e9curis\u00e9</h4>
            <p>Paiement et protection Amazon garantis</p>
          </div>
          <div class="reassurance-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <h4>Retour 30 Jours</h4>
            <p>Satisfait ou rembours\u00e9 selon la politique Amazon</p>
          </div>
          <div class="reassurance-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
            <h4>Avis V\u00e9rifi\u00e9s</h4>
            <p>S\u00e9lection bas\u00e9e sur les notes et avis Amazon</p>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section" id="faq">
      <div class="container">
        <div class="section-title">
          <h2>Questions Fr\u00e9quentes</h2>
          <p>Tout ce que vous devez savoir sur nos pulls vikings</p>
          <span class="bar"></span>
        </div>
        <div class="faq-list">
          ${faqItems}
        </div>
      </div>
    </section>

    <section class="seo-content" id="guide">
      <div class="container">
        <div class="section-title">
          <h2>Le Pull Viking : Guide Complet</h2>
          <span class="bar"></span>
          <p class="section-subtitle">Histoire, symboles, styles et conseils d'entretien</p>
        </div>

        <div class="seo-intro">
          <div class="seo-intro-text">
            <p>Le pull viking s'inscrit dans une tradition textile scandinave vieille de plusieurs si\u00e8cles. Inspir\u00e9s par le tricot norv\u00e9gien n\u00e9 au XIX\u00e8me si\u00e8cle dans les villages de p\u00eacheurs, les pulls vikings modernes m\u00ealent h\u00e9ritage nordique et tendances actuelles.</p>
          </div>
        </div>

        <div class="seo-symbols">
          <h3 class="seo-section-heading">Les symboles vikings</h3>
          <div class="symbol-grid">
            <div class="symbol-card">
              <div class="symbol-icon">&#9776;</div>
              <h4>Valknut</h4>
              <p>Trois triangles entrelac\u00e9s repr\u00e9sentant Odin et les guerriers du Valhalla.</p>
            </div>
            <div class="symbol-card">
              <div class="symbol-icon">&#10038;</div>
              <h4>Yggdrasil</h4>
              <p>L'Arbre-Monde reliant les neuf royaumes de la cosmologie nordique.</p>
            </div>
            <div class="symbol-card">
              <div class="symbol-icon">&#10023;</div>
              <h4>Vegvisir</h4>
              <p>Boussole magique guidant les navigateurs \u00e0 travers les temp\u00eates.</p>
            </div>
            <div class="symbol-card">
              <div class="symbol-icon">&#9681;</div>
              <h4>Fenrir</h4>
              <p>Le loup g\u00e9ant incarnant la force brute et le destin in\u00e9luctable.</p>
            </div>
          </div>
        </div>

        <div class="seo-grid">
          <div class="seo-block">
            <div class="seo-block-icon">&#128085;</div>
            <h3>Comment porter un pull viking ?</h3>
            <ul>
              <li>Jean brut + boots cuir = look nordique casual</li>
              <li>Sous une veste en cuir pour un style guerrier urbain</li>
              <li>Pantalon cargo + accessoires cuir vieilli</li>
              <li>Laine + chemise dessous = chic scandinave</li>
              <li>Capuche viking + jogging = sport ou cocooning</li>
            </ul>
          </div>
          <div class="seo-block">
            <div class="seo-block-icon">&#9989;</div>
            <h3>Comment choisir son pull viking ?</h3>
            <ul>
              <li><strong>Mati\u00e8re</strong> — M\u00e9rinos (douceur), polyester (3D), coton (quotidien)</li>
              <li><strong>Coupe</strong> — Regular, cintr\u00e9e ou oversize</li>
              <li><strong>Motifs</strong> — Jacquard, impression 3D ou symboles discrets</li>
              <li><strong>Usage</strong> — Sport (zip), hiver (laine), f\u00eates (No\u00ebl)</li>
              <li><strong>Taille</strong> — Consultez le guide, les coupes varient</li>
            </ul>
          </div>
          <div class="seo-block">
            <div class="seo-block-icon">&#129526;</div>
            <h3>Entretien de votre pull</h3>
            <ul>
              <li>Lavage 30\u00b0C programme d\u00e9licat</li>
              <li>Retourner avant lavage (prot\u00e8ge les motifs)</li>
              <li>S\u00e9chage \u00e0 plat, jamais au s\u00e8che-linge</li>
              <li>Ranger pli\u00e9, pas sur cintre</li>
              <li>Polyester 3D = facile / Laine = soin particulier</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>

${footer()}
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</body>
</html>`;
}

// ── Generate Product Page ────────────────────────────────
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
        "name": p.productName,
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
          { "@type": "ListItem", "position": 2, "name": p.h1, "item": `https://${SITE.domain}/${p.slug}` }
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
    `${p.h1} \u2014 Guide & Achat Amazon | Pull Vikings`,
    p.metaDesc,
    `/${p.slug}`
  )}
<body>
${header()}
  <main>
    <div class="container">
      <nav class="breadcrumb" aria-label="Fil d'Ariane">
        <a href="/">Accueil</a><span>\u203a</span><a href="/#produits">Pulls Vikings</a><span>\u203a</span>${p.h1}
      </nav>
    </div>

    <section class="product-page">
      <div class="container">
        <div class="product-layout">
          <div class="product-gallery">
            <img src="/images/${p.img}" alt="${p.h1}" width="600" height="600">
            ${p.discount ? `<span class="gallery-badge">${p.discount}</span>` : ''}
          </div>
          <div class="product-info">
            <h1>${p.h1}</h1>
            <div class="product-meta">
              <span class="stars">${starsHTML(p.stars)}</span>
              <span class="reviews-count">${p.reviewsCount} avis</span>
              <span class="availability">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                En stock
              </span>
            </div>
            <div class="price-box">
              <span class="price">${p.price} \u20ac</span>
              ${p.oldPrice ? `<span class="old-price">${p.oldPrice} \u20ac</span>` : ''}
              ${p.discount ? `<span class="discount">${p.discount}</span>` : ''}
              <small class="tax-note">Prix indicatif constat\u00e9 sur Amazon \u2014 peut varier</small>
            </div>
            <p class="product-desc">${p.desc}</p>
            <ul class="product-features">
              ${featuresLi}
            </ul>
            <a href="${link}" class="btn-amazon" target="_blank" rel="nofollow noopener sponsored">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
              Acheter sur Amazon
            </a>
            <p class="amazon-note">Vous serez redirig\u00e9 vers Amazon.fr pour finaliser votre achat</p>
            <div class="product-trust">
              <span class="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                Paiement s\u00e9curis\u00e9
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
            <h2>Description compl\u00e8te</h2>
            <p>${p.desc}</p>
            <p>Ce ${p.h1.toLowerCase()} fait partie de notre s\u00e9lection des meilleurs v\u00eatements d'inspiration viking disponibles sur Amazon. Nous avons choisi ce mod\u00e8le pour sa qualit\u00e9, ses avis positifs et son design nordique authentique.</p>
          </div>
          <div class="details-specs">
            <h3>Caract\u00e9ristiques</h3>
            <table>
              ${specRows}
            </table>
          </div>
        </div>
      </div>
    </section>

${sizeGuideHTML(p.sizeGuide)}

${reviewsHTML(p)}

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

  <div class="sticky-cta" id="stickyCta">
    <span class="sticky-price">${p.price} \u20ac${p.oldPrice ? ` <span class="sticky-old">${p.oldPrice} \u20ac</span>` : ''}</span>
    <a href="${link}" class="btn-amazon" target="_blank" rel="nofollow noopener sponsored">
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
      Acheter sur Amazon
    </a>
  </div>
${footer()}
  <script>
  (function(){
    var cta=document.getElementById('stickyCta'),btn=document.querySelector('.btn-amazon');
    if(!cta||!btn)return;
    var last=0;
    function check(){
      var r=btn.getBoundingClientRect();
      var show=r.bottom<0||r.top>window.innerHeight;
      if(show!==last){cta.classList.toggle('visible',show);last=show}
      requestAnimationFrame(check);
    }
    check();
  })();
  </script>
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</body>
</html>`;
}

// ── Build ────────────────────────────────────────────────
const outDir = __dirname;

// Index
fs.writeFileSync(path.join(outDir, 'index.html'), generateIndex());
console.log('\u2713 index.html');

// Product pages
for (const p of products) {
  fs.writeFileSync(path.join(outDir, `${p.slug}.html`), generateProduct(p));
  console.log(`\u2713 ${p.slug}.html`);
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
    <loc>https://${SITE.domain}/${p.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
console.log('\u2713 sitemap.xml');

// Robots.txt
fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: https://${SITE.domain}/sitemap.xml\n`);
console.log('\u2713 robots.txt');

console.log(`\nDone! ${products.length + 1} pages generated.`);
