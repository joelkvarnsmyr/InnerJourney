// src/theme/NavbarItem/index.tsx
import React, { type ReactNode } from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import type NavbarItemType from '@theme/NavbarItem';
import type { WrapperProps } from '@docusaurus/types';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher'; // Uppdaterad sökväg

type Props = WrapperProps<typeof NavbarItemType>;

export default function NavbarItemWrapper(props: Props): ReactNode {
    if (props.type === 'custom-language-switcher') {
        return <LanguageSwitcher />;
    }

    return <NavbarItem {...props} />;
}