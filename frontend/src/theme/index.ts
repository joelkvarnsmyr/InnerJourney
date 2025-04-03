import { extendTheme } from '@chakra-ui/react';

// Definiera färger enligt styrdokumentet
const colors = {
    // Basfärger
    light: {
        background: '#E6F0FA', // Ljusblå bakgrund för Light Mode
        card: '#FFFFFF', // Vita kort
    },
    dark: {
        background: '#1A2A44', // Mörkblå bakgrund för Dark Mode
        card: '#2A3B5A', // Mörkgrå kort
    },
    // Accentfärger
    accent: {
        gradientStart: '#FF6F61', // Start av varm gradient
        gradientEnd: '#FF9F43', // Slut av varm gradient
        green: '#00A676', // Dämpad grön för subtila accenter
    },
    // Textfärger
    text: {
        primary: '#1A2A44', // Mörkblå för primär text
        secondary: '#6B7280', // Grå för sekundär text
    },
};

// Definiera teman
const themes = {
    clean: {
        background: colors.light.background,
        card: colors.light.card,
        text: colors.text.primary,
        accent: colors.accent,
    },
    technical: {
        background: colors.dark.background,
        card: colors.dark.card,
        text: colors.text.primary,
        accent: colors.accent.green,
        fonts: {
            heading: "'Roboto Mono', monospace",
            body: "'Roboto Mono', monospace",
        },
    },
    professional: {
        background: '#F3F4F6', // Ljusgrå bakgrund
        card: '#E5E7EB', // Ljusgrå kort
        text: colors.text.primary,
        accent: colors.accent.green,
    },
};

// Definiera globala stilar
const styles = {
    global: {
        body: {
            bg: 'clean.background',
            color: 'text.primary',
        },
    },
};

// Definiera typsnitt
const fonts = {
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
};

// Definiera komponentstilar
const components = {
    Button: {
        baseStyle: {
            borderRadius: 'md', // Rundade hörn
        },
        variants: {
            solid: {
                bgGradient: 'linear(to-r, accent.gradientStart, accent.gradientEnd)',
                color: 'white',
                _hover: {
                    bgGradient: 'linear(to-r, accent.gradientEnd, accent.gradientStart)',
                },
            },
        },
    },
    Card: {
        baseStyle: {
            bg: 'clean.card',
            boxShadow: 'sm',
            borderRadius: 'md',
        },
    },
    Input: {
        baseStyle: {
            field: {
                borderRadius: 'md',
                borderColor: 'gray.300',
                _focus: {
                    borderColor: 'accent.gradientStart',
                    boxShadow: '0 0 0 1px #FF6F61',
                },
            },
        },
    },
};

// Skapa temat
const theme = extendTheme({
    colors: {
        clean: themes.clean,
        technical: themes.technical,
        professional: themes.professional,
        text: colors.text,
        accent: colors.accent,
    },
    fonts,
    styles,
    components,
});

export default theme;