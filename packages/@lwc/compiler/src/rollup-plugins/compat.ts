import * as babel from '@babel/core';
import * as presetCompat from 'babel-preset-compat';

import { BABEL_CONFIG_BASE } from '../babel-plugins';
import { NormalizedOutputConfig } from "../compiler/options";

const BABEL_CONFIG_CONFIG = {
    ...BABEL_CONFIG_BASE,
    presets: [
        [presetCompat, { proxy: true }],
    ],
};

export default function({ sourcemap }: NormalizedOutputConfig) {
    const config = Object.assign({}, BABEL_CONFIG_CONFIG, { sourceMaps: sourcemap });

    return {
        name: "lwc-compat",

        transform(src: string) {
            const { code, map } = babel.transform(src, config);
            return { code, map };
        }
    };
}