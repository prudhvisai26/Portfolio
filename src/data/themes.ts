export interface Theme{
    id: string;
    name: string;
    tagline: string;
    description: string;
    icon: string;
    route: string;
    image: string;
    colors:{
        primary: string;
        secondary: string;
        accent: string;
        glow: string;
    }
}



export const themes:Theme[]=[
    {
        id: "got",
        name: "Game of Thrones" , 
        tagline: "Winter is Coming",
        description: "Dracarys",
        icon: "🐉",
        route: "/got",
        image:"",
        colors:{
            primary: "#8B0000" ,
            secondary: "#1a1a2e",
            accent: "#ffd700",
            glow: "rgba(255, 0, 0, 0.5)",
        }
    },
    {
        id: "harrypotter",
        name: "Harry Potter",
        tagline: "Magic Awaits",
        description: "Expecto Patronam",
        icon: "⚡",
        route: "/harrypotter",
        image:"",
        colors:{
            primary: "#4A148C",     // deep purple
            secondary: "#1a237e",   // dark blue
            accent: "#FFD700",      // gold
            glow: "rgba(74, 20, 140, 0.6)",
        }
    },
    {
        id: "onepiece",
        name: "One Piece",
        tagline: "Set Sail for Adventure",
        description: "King of the Pirates",
        icon: "🏴‍☠️",
        route: "/onepiece",
        image:"",
        colors:{
             primary: "#E65100",     // orange
            secondary: "#01579B",   // ocean blue
            accent: "#FFD700",      // gold
            glow: "rgba(230, 81, 0, 0.6)",
        }
    },
];