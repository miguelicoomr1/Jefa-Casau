/**
 * Catálogo DEMO de productos. Todos los precios y datos técnicos son
 * orientativos y deben sustituirse por el catálogo real de Refrigeración Casau.
 * Estructura pensada para poder reemplazar este archivo sin tocar la interfaz.
 */

const products = [
    {
        id: 1, brand: "Daikin", model: "Sensira 25", type: "Split",
        frigories: 2500, area: 25, price: 799, installation: 250,
        energyClass: "A++", refrigerant: "R32", seer: "6.5 (demo)", scop: "4.0 (demo)",
        noise: "20 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-01.jpg",
        description: "Equipo split demo para dormitorios y estancias pequeñas.",
        features: ["Modo silencioso", "Filtro de aire", "Control por mando"]
    },
    {
        id: 2, brand: "Mitsubishi Electric", model: "MSZ Demo 35", type: "Split",
        frigories: 3500, area: 35, price: 1099, installation: 280,
        energyClass: "A+++", refrigerant: "R32", seer: "8.5 (demo)", scop: "5.1 (demo)",
        noise: "19 dB(A) (demo)", wifi: true,
        image: "assets/products/producto-02.jpg",
        description: "Equipo split demo con WiFi integrado para salones medianos.",
        features: ["WiFi integrado", "Modo económico", "Filtro purificador"]
    },
    {
        id: 3, brand: "LG", model: "Dualcool Demo 45", type: "Split",
        frigories: 4500, area: 45, price: 1299, installation: 280,
        energyClass: "A++", refrigerant: "R32", seer: "7.2 (demo)", scop: "4.6 (demo)",
        noise: "21 dB(A) (demo)", wifi: true,
        image: "assets/products/producto-03.jpg",
        description: "Split demo de alta potencia para salones y espacios abiertos.",
        features: ["WiFi integrado", "Modo turbo", "Bajo nivel sonoro"]
    },
    {
        id: 4, brand: "Panasonic", model: "Etherea Demo 25", type: "Split",
        frigories: 2500, area: 25, price: 899, installation: 250,
        energyClass: "A+++", refrigerant: "R32", seer: "8.0 (demo)", scop: "4.9 (demo)",
        noise: "19 dB(A) (demo)", wifi: true,
        image: "assets/products/producto-04.jpg",
        description: "Diseño cuidado y alta eficiencia para dormitorios.",
        features: ["Diseño premium", "Filtro nanoe", "WiFi integrado"]
    },
    {
        id: 5, brand: "Daikin", model: "Multi+2 Demo", type: "Multisplit",
        frigories: 5000, area: 50, price: 1899, installation: 420,
        energyClass: "A++", refrigerant: "R32", seer: "6.8 (demo)", scop: "4.2 (demo)",
        noise: "22 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-05.jpg",
        description: "Sistema multisplit demo para climatizar dos estancias con una sola unidad exterior.",
        features: ["2 unidades interiores", "Ahorro de espacio exterior"]
    },
    {
        id: 6, brand: "Fujitsu", model: "Multi+3 Demo", type: "Multisplit",
        frigories: 7000, area: 70, price: 2599, installation: 520,
        energyClass: "A+", refrigerant: "R32", seer: "6.2 (demo)", scop: "4.0 (demo)",
        noise: "23 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-06.jpg",
        description: "Sistema multisplit demo de 3 unidades para vivienda completa.",
        features: ["3 unidades interiores", "Control independiente por estancia"]
    },
    {
        id: 7, brand: "Mitsubishi Heavy Industries", model: "Conductos Demo 60", type: "Conductos",
        frigories: 6000, area: 60, price: 2899, installation: 650,
        energyClass: "A+", refrigerant: "R32", seer: "6.0 (demo)", scop: "3.8 (demo)",
        noise: "28 dB(A) en conducto (demo)", wifi: false,
        image: "assets/products/producto-07.jpg",
        description: "Equipo de conductos demo para climatización integrada de vivienda.",
        features: ["Instalación oculta en falso techo", "Reja de impulsión discreta"]
    },
    {
        id: 8, brand: "Toshiba", model: "Conductos Demo 90", type: "Conductos",
        frigories: 9000, area: 90, price: 3799, installation: 780,
        energyClass: "A", refrigerant: "R32", seer: "5.8 (demo)", scop: "3.6 (demo)",
        noise: "30 dB(A) en conducto (demo)", wifi: true,
        image: "assets/products/producto-08.jpg",
        description: "Solución de conductos demo para viviendas y locales de gran superficie.",
        features: ["Alta capacidad", "Control centralizado WiFi"]
    },
    {
        id: 9, brand: "Samsung", model: "Cassette Demo 60", type: "Cassette",
        frigories: 6000, area: 60, price: 2450, installation: 620,
        energyClass: "A+", refrigerant: "R32", seer: "6.4 (demo)", scop: "3.9 (demo)",
        noise: "27 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-09.jpg",
        description: "Cassette de techo demo indicado para locales comerciales.",
        features: ["Distribución de aire en 4 vías", "Diseño integrado en techo"]
    },
    {
        id: 10, brand: "Hitachi", model: "Suelo-Techo Demo 70", type: "Suelo/techo",
        frigories: 7000, area: 70, price: 2699, installation: 640,
        energyClass: "A+", refrigerant: "R32", seer: "6.1 (demo)", scop: "3.7 (demo)",
        noise: "29 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-10.jpg",
        description: "Unidad suelo-techo demo para locales, oficinas y comercios.",
        features: ["Instalación versátil", "Adecuado para reformas"]
    },
    {
        id: 11, brand: "Haier", model: "Portátil Demo 2100", type: "Portátil",
        frigories: 2100, area: 20, price: 449, installation: 0,
        energyClass: "A", refrigerant: "R290", seer: "—", scop: "—",
        noise: "52 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-11.jpg",
        description: "Equipo portátil demo sin instalación fija, ideal como solución rápida.",
        features: ["Sin obra", "Fácil de mover entre estancias"]
    },
    {
        id: 12, brand: "General", model: "Comercial Demo 12000", type: "Comercial",
        frigories: 12000, area: 120, price: 4599, installation: 950,
        energyClass: "A", refrigerant: "R410A", seer: "5.4 (demo)", scop: "3.4 (demo)",
        noise: "32 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-12.jpg",
        description: "Equipo de alta capacidad demo para naves y locales comerciales grandes.",
        features: ["Alta capacidad frigorífica", "Uso comercial/industrial ligero"]
    },
    {
        id: 13, brand: "Bosch", model: "Split Compact Demo 20", type: "Split",
        frigories: 2000, area: 18, price: 699, installation: 230,
        energyClass: "A++", refrigerant: "R32", seer: "6.6 (demo)", scop: "4.1 (demo)",
        noise: "20 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-13.jpg",
        description: "Equipo compacto demo para habitaciones pequeñas y despachos.",
        features: ["Formato compacto", "Bajo consumo"]
    },
    {
        id: 14, brand: "Gree", model: "Split Demo 30 WiFi", type: "Split",
        frigories: 3000, area: 30, price: 949, installation: 260,
        energyClass: "A+++", refrigerant: "R32", seer: "8.2 (demo)", scop: "5.0 (demo)",
        noise: "19 dB(A) (demo)", wifi: true,
        image: "assets/products/producto-14.jpg",
        description: "Split demo de alta eficiencia energética con control WiFi.",
        features: ["Alta eficiencia A+++", "WiFi integrado"]
    },
    {
        id: 15, brand: "Hisense", model: "Multi+4 Demo", type: "Multisplit",
        frigories: 9000, area: 90, price: 3299, installation: 640,
        energyClass: "A+", refrigerant: "R32", seer: "6.0 (demo)", scop: "3.8 (demo)",
        noise: "23 dB(A) (demo)", wifi: false,
        image: "assets/products/producto-15.jpg",
        description: "Sistema multisplit demo de 4 unidades para viviendas grandes.",
        features: ["4 unidades interiores", "Gestión independiente por zona"]
    }
];

/**
 * Marcas de ejemplo mostradas en la tienda y en aerotermia.
 * No implica distribución oficial: ver aviso en la interfaz.
 */
const brandList = [
    "Daikin", "Mitsubishi Electric", "Mitsubishi Heavy Industries", "Fujitsu", "General",
    "Panasonic", "Toshiba", "LG", "Samsung", "Hitachi", "Haier", "Midea", "Gree",
    "Hisense", "Bosch", "Daitsu", "Carrier", "Baxi", "Ferroli", "Ariston",
    "Saunier Duval", "Vaillant", "Viessmann", "Kosner", "Mundoclima"
];
