import React from 'react';
import { /*render, waitFor, */ act } from '@testing-library/react-native';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

export const mountReactHook = (hook) => {
    const Component = ({ children }) => children(hook());
    const componentHook = {};
    let componentMount;

    act(() => {
        componentMount = shallow(
            <Component>
                {(hookValues) => {
                    Object.assign(componentHook, hookValues);
                    return null;
                }}
            </Component>
        );
    });
    return { componentMount, componentHook };
};
