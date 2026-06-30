'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create an Emotion cache with a custom key.
// `prepend: true` inserts MUI styles before any other styles, giving
// them the correct specificity without relying on injection order.
function createEmotionCache() {
    return createCache({ key: 'mui', prepend: true });
}

const theme = createTheme();

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const [{ cache, flush }] = React.useState(() => {
        const cache = createEmotionCache();
        cache.compat = true;

        const prevInsert = cache.insert;
        let inserted: string[] = [];

        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };

        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };

        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) return null;

        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }

        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: styles }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}
