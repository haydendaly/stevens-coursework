import { useColor } from '../functions/providers/ColorContext';
import { mountReactHook } from './mockHook';
import { waitFor, act } from '@testing-library/react-native';

const green = {
    primary: "#ffffff",
    primaryText: "#465448",
    highlight: "#004509",
    inactive: "#687c6b",
    background: "#9fd984",
    shadow: "#444"
};

const colorSchemes = [
    'green',
    'blue',
    'yellow',
    'pink',
    'lavender',
    'periwinkle',
    'original',
    'dark2',
    'dark3',
    'dark1'
];

describe('Color Tests', () => {
    let setupComponent;
    let hook;

    beforeEach(() => {
        setupComponent = mountReactHook(useColor);
        hook = setupComponent.componentHook;
    });

    it('Has initial color', async () => {
        expect(hook.color).toEqual(green);
    });

    it('Has color schemes', async () => {
        expect(Object.keys(hook.colorSchemes)).toEqual(colorSchemes);
    });

    // it('Changes color', async () => {
    //     await act(async () => {
    //         hook.setName('dark3');
    //         await waitFor(() => {});
    //     });

    //     expect(hook.color).toEqual(hook.colorSchemes['dark3']);
    // });
});
